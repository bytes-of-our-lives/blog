# Use Cloudflare Pages for Pull Request Previews

Our pull request workflow proves that proposed changes can build, but reviewers still need to render the blog locally
to inspect the result. We need an online preview for each pull request without exposing unmerged work through the
production site or turning preview delivery into a migration away from GitHub Pages.

## Context

The [existing hosting decision][production-hosting] keeps the public site on GitHub Pages. Its publishing workflow
builds GitHub's pull request merge candidate with the same Hugo and Go setup used for production, then deliberately
skips artifact upload and deployment. This protects production while catching build failures before merge, but it does
not let reviewers inspect navigation, layout, links, or an article in the context of the generated site.

A preview service must:

- Give each pull request a stable URL that follows its latest revision.
- Keep unmerged changes isolated from the production GitHub Pages site.
- Preserve GitHub Actions as the authority for the Hugo build instead of maintaining a second build environment.
- Surface the preview URL and deployment status in the pull request's normal GitHub experience.
- Add little cost or operational overhead for the blog's current scale.
- Keep deployment credentials unavailable to untrusted pull request code.

We considered extending the production GitHub Pages deployment to host previews under separate paths. GitHub Pages
provides one site for the repository, however, so emulating concurrent previews would couple unmerged content,
routing, and cleanup to the production artifact. That would weaken the boundary established by the existing publishing
decisions.

Cloudflare Pages supports both Git integration and [Direct Upload][direct-upload]. Its GitHub integration would remove
the need for a Cloudflare credential in GitHub Actions and would manage builds, checks, and pull request comments.
However, Cloudflare would then become another build authority with its own Hugo and Go configuration. Direct Upload
instead accepts the site already built by GitHub Actions and creates branch-specific [preview deployments][previews].

We also compared Cloudflare's two official GitHub Actions. [`cloudflare/pages-action`][pages-action] is archived and
deprecated in favour of [`cloudflare/wrangler-action`][wrangler-action]. Wrangler Action supports Pages Direct Upload,
returns the deployment and branch-alias URLs, and can create native GitHub Deployment records.

## Decision

We will use **Cloudflare Pages Direct Upload for pull request previews** while retaining **GitHub Pages for production
hosting**.

A standalone GitHub Actions workflow will build the pull request merge candidate and upload the generated site to a
dedicated Cloudflare Pages project with Wrangler Action. Each pull request will use a stable branch identifier derived
from its number so subsequent revisions update one review URL without affecting other pull requests.

The preview workflow owns its Hugo build rather than reusing the production workflow's output. Hugo generates
environment-specific URLs from the deployment's base URL, so an artifact built for GitHub Pages is not also a valid
Cloudflare preview artifact. Keeping preview delivery separate also prevents preview-only behaviour from changing the
production publishing path.

Cloudflare serves both an immutable deployment URL and the pull request's mutable branch alias from the origin root.
The preview build will therefore use the origin root as Hugo's base URL instead of embedding either Cloudflare host.
Runtime resources and internal links will resolve against whichever deployment served the document, keeping immutable
deployments independent from later branch-alias updates. Absolute canonical and social metadata are not authoritative
in preview artifacts; the production build remains responsible for generating them with the published site's URL.

Wrangler Action will receive the workflow's `GITHUB_TOKEN` so the Cloudflare result appears as a native GitHub
Deployment with its URL and status. Cloudflare configuration and its least-privileged API token will live in a
dedicated GitHub Environment. The workflow will use that Environment for secrets and variables without creating an
extra [placeholder Deployment][environment-without-deployment]; Wrangler Action owns the Deployment that represents
the actual preview.

Cloudflare does not currently exchange GitHub Actions identity tokens for temporary API credentials. The deployment
therefore requires a stored API token scoped to Pages in the preview account. Pull requests from forks do not receive
repository or Environment secrets, and supporting previews for untrusted fork code is outside this decision.

### Rationale

- **Production remains simple:** GitHub Pages and the existing `main` publishing workflow are unchanged.
- **One build authority:** GitHub Actions retains the repository's current Hugo and Go setup instead of duplicating it
  in Cloudflare.
- **Native review experience:** GitHub Deployments place the preview URL and status where reviewers already work.
- **Isolated previews:** A dedicated Pages project and branch alias keep every pull request separate from production and
  from other reviews.
- **Low operating cost:** Cloudflare Pages' [free allowance][limits] comfortably covers the blog's expected preview
  volume.
- **Supported integration:** Wrangler Action is the maintained Cloudflare action for Pages deployments.

## Consequences

- Preview delivery adds a Cloudflare account, a dedicated Pages project, and a scoped API token as external operational
  dependencies.
- The Direct Upload project cannot later switch to Cloudflare Git integration; reconsidering that model requires a new
  Pages project.
- Pull request previews consume GitHub Actions time and build independently from the existing production validation.
- The production and preview builds intentionally produce separate artifacts: production uses its published URL while
  previews use root-relative URLs that resolve within either Cloudflare deployment host.
- Canonical URLs, social metadata, and feed links in preview artifacts may be relative and are not suitable for
  indexing. Production continues to generate authoritative absolute URLs.
- Only pull requests whose code is trusted to run with the preview Environment can receive deployments.
- Cloudflare preview URLs are public by default, and immutable historical deployments can outlive their review.
  Restricting preview access is tracked in bytes-of-our-lives/blog#28, while retiring stale previews is tracked in
  bytes-of-our-lives/blog#29. Neither blocks the functional preview capability in bytes-of-our-lives/blog#27.
- A Cloudflare outage can prevent or delay review previews without affecting the production blog.

## Revisit When

- GitHub Pages supports isolated per-pull-request previews without coupling them to production.
- Cloudflare supports GitHub Actions workload identity federation, removing the stored deployment credential.
- Pull requests from untrusted forks need previews.
- Maintaining a separate preview build becomes more costly than allowing Cloudflare to own the build.
- Cloudflare's pricing, limits, reliability, or Direct Upload support no longer suit the blog.
- Production hosting moves away from GitHub Pages and one platform can own both production and previews more simply.

[direct-upload]: https://developers.cloudflare.com/pages/get-started/direct-upload/
[environment-without-deployment]: https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments#using-environments-without-deployments
[limits]: https://developers.cloudflare.com/pages/platform/limits/
[pages-action]: https://github.com/cloudflare/pages-action
[previews]: https://developers.cloudflare.com/pages/configuration/preview-deployments/
[production-hosting]: ./04-hosting-on-github-pages.md
[wrangler-action]: https://github.com/cloudflare/wrangler-action
