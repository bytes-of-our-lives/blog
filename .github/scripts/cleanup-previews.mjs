import assert from 'node:assert/strict';

const required = (name) => {
  assert(process.env[name], `${name} must be configured`);
  return process.env[name];
};

const repository = required('GITHUB_REPOSITORY');
const account = required('CLOUDFLARE_ACCOUNT_ID');
const project = required('CLOUDFLARE_PAGES_PROJECT');

async function request(url, token, method = 'GET', body) {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'blog-preview-cleanup',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const result = response.status === 204 ? null : await response.json();
  assert(response.ok && result?.success !== false,
    `${method} ${url}: HTTP ${response.status}: ${JSON.stringify(result?.errors ?? result)}`);
  return result;
}

const github = (path, method, body) => request(
  `https://api.github.com/repos/${repository}/${path}`,
  required('GITHUB_TOKEN'), method, body,
);
const cloudflare = (path, method) => request(
  `https://api.cloudflare.com/client/v4/accounts/${account}/pages/projects/${encodeURIComponent(project)}${path}`,
  required('CLOUDFLARE_API_TOKEN'), method,
);

async function listCloudflare() {
  const deployments = [];
  for (let page = 1; ; page++) {
    const result = await cloudflare(`/deployments?env=preview&per_page=25&page=${page}`);
    deployments.push(...result.result);
    if (result.result.length === 0 ||
        page >= (result.result_info?.total_pages ?? Infinity) ||
        deployments.length >= (result.result_info?.total_count ?? Infinity)) return deployments;
  }
}

async function listGithub(path) {
  const items = [];
  for (let page = 1; ; page++) {
    const batch = await github(`${path}&per_page=100&page=${page}`);
    items.push(...batch);
    if (batch.length < 100) return items;
  }
}

const openPulls = (await listGithub('pulls?state=open'))
  .filter((pull) => pull.head.repo?.full_name === repository);
const openBranches = new Set(openPulls.map((pull) => `pr-${pull.number}`));
const openRefs = new Set(openPulls.map((pull) => pull.head.ref));
const records = await listGithub('deployments?environment=preview');
const site = (await cloudflare('')).result;
const canonicalId = site.canonical_deployment?.id;
const previews = (await listCloudflare())
  .sort((a, b) => b.created_on.localeCompare(a.created_on));
console.log(JSON.stringify({ previews: previews.map(({ id, aliases, url }) => ({ id, aliases, url })) }, null, 2));

// Retain the last successful revision for each open pull request.
const retained = new Map();
for (const deployment of previews) {
  const branch = deployment.deployment_trigger.metadata.branch;
  if (openBranches.has(branch) && !retained.has(branch) &&
      deployment.latest_stage.status === 'success') {
    retained.set(branch, deployment);
  }
}
const retainedIds = new Set([...retained.values()].map((deployment) => deployment.id));
const retainedUrls = new Set([...retained.values()].flatMap((deployment) => [
  deployment.url, ...(deployment.aliases ?? []).map((alias) => `https://${alias}`),
]));
let removedCloudflare = 0;
// Delete retired branch heads first, including their active aliases.
for (const deployment of previews) {
  assert.equal(deployment.environment, 'preview');
  assert.notEqual(deployment.id, canonicalId, 'Production deployment must be retained');
  if (retainedIds.has(deployment.id)) continue;
  await cloudflare(`/deployments/${deployment.id}?force=true`, 'DELETE');
  console.log(`Deleted Cloudflare deployment ${deployment.id}`);
  removedCloudflare++;
}
const remaining = await listCloudflare();
assert.deepEqual(new Set(remaining.map((deployment) => deployment.id)), retainedIds);

const retainedRefs = new Set();
const retainedRecords = new Set();
let removedGithub = 0;
for (const deployment of records) {
  assert.equal(deployment.environment, 'preview');
  if (openRefs.has(deployment.ref) && !retainedRefs.has(deployment.ref)) {
    const statuses = await github(`deployments/${deployment.id}/statuses?per_page=100`);
    if (statuses.some((status) => status.state === 'success' && retainedUrls.has(status.environment_url))) {
      retainedRefs.add(deployment.ref);
      retainedRecords.add(deployment.id);
      continue;
    }
  }
  await github(`deployments/${deployment.id}/statuses`, 'POST', {
    state: 'inactive',
    auto_inactive: false,
  });
  await github(`deployments/${deployment.id}`, 'DELETE');
  console.log(`Deleted GitHub deployment ${deployment.id}`);
  removedGithub++;
}
assert.deepEqual(new Set((await listGithub('deployments?environment=preview')).map((deployment) => deployment.id)), retainedRecords);
assert.equal((await cloudflare('')).result.canonical_deployment?.id, canonicalId);
const summary = `Removed ${removedCloudflare} Cloudflare deployments and ${removedGithub} GitHub deployment records. Retained ${retainedIds.size} current previews and ${retainedRecords.size} GitHub records for ${openPulls.length} open pull requests.\n`;
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) {
  const { appendFile } = await import('node:fs/promises');
  await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
}
