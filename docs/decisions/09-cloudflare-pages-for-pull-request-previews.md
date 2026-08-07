# Use Cloudflare Pages for Pull Request Previews

GitHub Actions validates proposed changes, but reviewers otherwise need to render the blog locally. We need an online
preview for each pull request without changing how production is published.

## Context

The [hosting decision][production-hosting] puts production on GitHub Pages, and [continuous
publishing][production-publishing] updates it from `main`. GitHub Pages exposes one site per repository, so using it
for concurrent previews would mix unmerged work with the production path. Cloudflare Pages [Direct
Upload][direct-upload] can host an artifact already built by GitHub Actions, preserving one build authority while
keeping previews isolated.

## Decision

We will keep production on GitHub Pages and use Cloudflare Pages Direct Upload for pull request previews. A separate
GitHub Actions workflow builds the pull request merge candidate and uploads it to a dedicated Pages project. The
deprecated [Pages Action][pages-action] points users to [Wrangler Action][wrangler-action], which gives each pull
request a stable alias derived from its number and exposes the result as a GitHub Deployment.

Preview builds include draft and future-dated content. They use `/` as Hugo's base URL so links and resources resolve
from both the stable alias and immutable deployment URL. Preview metadata is not authoritative for production.

[Preview deployments][previews] are public and excluded from normal search indexing. This follows the public-repository
disclosure boundary established in [the Git-first blogging decision][git-first]; confidential or embargoed material
stays outside the repository. Deployments run only for trusted same-repository pull requests. Because Cloudflare does
not support GitHub Actions workload identity federation for Pages Direct Upload, a GitHub Environment stores a
Pages-scoped API token [without creating an extra Deployment][environment-without-deployment].

## Consequences

- Preview delivery adds Cloudflare and a stored scoped credential, but preview failures cannot affect production.
- The current [Pages limits][limits] accommodate the expected preview volume.
- Preview and production use separate builds and artifacts.
- Forks and other untrusted pull requests do not receive hosted previews.
- Deployment records may outlive a review; cleanup after closure or merge is tracked in bytes-of-our-lives/blog#29.

## Revisit When

- Private or embargoed review, or previews for untrusted forks, becomes necessary.
- Cloudflare supports temporary GitHub Actions credentials, or GitHub Pages gains isolated pull request previews.
- Production hosting moves and one platform can own both paths more simply.

[direct-upload]: https://developers.cloudflare.com/pages/get-started/direct-upload/
[environment-without-deployment]: https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments#using-environments-without-deployments
[git-first]: ./02-git-first-blogging.md
[limits]: https://developers.cloudflare.com/pages/platform/limits/
[pages-action]: https://github.com/cloudflare/pages-action
[previews]: https://developers.cloudflare.com/pages/configuration/preview-deployments/
[production-hosting]: ./04-hosting-on-github-pages.md
[production-publishing]: ./06-publishing-continuously.md
[wrangler-action]: https://github.com/cloudflare/wrangler-action
