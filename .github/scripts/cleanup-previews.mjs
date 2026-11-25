import assert from 'node:assert/strict';

const required = (name) => {
  assert(process.env[name], `${name} must be configured`);
  return process.env[name];
};

const repository = required('GITHUB_REPOSITORY');
const account = required('CLOUDFLARE_ACCOUNT_ID');
const project = required('CLOUDFLARE_PAGES_PROJECT');
const prNumber = required('PREVIEW_PR');
assert(/^\d+$/.test(prNumber), 'PREVIEW_PR must be a pull request number');

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
    const result = await cloudflare(`/deployments?env=preview&per_page=100&page=${page}`);
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

const pull = await github(`pulls/${prNumber}`);
assert.equal(pull.base.repo.full_name, repository);
assert.equal(pull.state, 'closed', 'Only closed pull requests can be retired');
const branch = `pr-${prNumber}`;
const site = (await cloudflare('')).result;
const canonicalId = site.canonical_deployment?.id;
const previews = (await listCloudflare())
  .filter((deployment) => deployment.deployment_trigger.metadata.branch === branch)
  .sort((a, b) => b.created_on.localeCompare(a.created_on));
console.log(JSON.stringify({ branch, previews: previews.map(({ id, aliases, url }) => ({ id, aliases, url })) }, null, 2));

// Delete the current aliased revision first, so branch-head deletion is exercised.
for (const deployment of previews) {
  assert.equal(deployment.environment, 'preview');
  assert.notEqual(deployment.id, canonicalId, 'Production deployment must be retained');
  await cloudflare(`/deployments/${deployment.id}?force=true`, 'DELETE');
  console.log(`Deleted Cloudflare deployment ${deployment.id}`);
}
const remaining = (await listCloudflare()).filter((deployment) => deployment.deployment_trigger.metadata.branch === branch);
assert.equal(remaining.length, 0, 'Cloudflare still lists retired previews');

const records = await listGithub(`deployments?environment=preview&ref=${encodeURIComponent(pull.head.ref)}`);
for (const deployment of records) {
  assert.equal(deployment.environment, 'preview');
  assert.equal(deployment.ref, pull.head.ref);
  await github(`deployments/${deployment.id}/statuses`, 'POST', {
    state: 'inactive',
    auto_inactive: false,
  });
  await github(`deployments/${deployment.id}`, 'DELETE');
  console.log(`Deleted GitHub deployment ${deployment.id}`);
}
assert.equal((await listGithub(`deployments?environment=preview&ref=${encodeURIComponent(pull.head.ref)}`)).length, 0);
const summary = `Retired PR #${prNumber}: ${previews.length} Cloudflare deployments and ${records.length} GitHub deployment records.\n`;
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) {
  const { appendFile } = await import('node:fs/promises');
  await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
}
