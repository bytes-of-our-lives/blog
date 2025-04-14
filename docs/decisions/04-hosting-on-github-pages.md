# GitHub Pages for Blog Hosting (Initially)

With Hugo selected for static-site generation, our next key decision was identifying the right hosting solution. We
needed a straightforward, low-maintenance hosting platform that aligns with our Git-first workflow and avoids
introducing unnecessary complexity.

## Context

We explored several options for hosting static websites:

- **GitHub Pages:** Built directly into GitHub, offering simple, no-frills static-site hosting tightly integrated with
  our existing GitOps workflow.
- **Cloud Storage (e.g. AWS S3, Google Cloud Storage, Azure Blob Storage):** Reliable, highly customisable hosting
  platforms, but requiring additional configuration and complexity (DNS, CDN, SSL handling).
- **Netlify/Vercel:** Specialised hosting services offering advanced features like automatic previews and integrated
  build pipelines, but adding an external dependency and additional complexity to our stack.

Our practical criteria for hosting were:

- **Custom Domain Support**: We want our blog to live at a branded domain (e.g. blog.com) rather than a generic
  subdomain provided by the hosting platform.
- **Unified Management:** We reside on GitHub for all our workflows. Switching context to another platform introduces
  unnecessary complexity.
- **Minimal Overhead:** We prefer a simple setup without complex configurations, reducing ongoing maintenance tasks.
- **Familiarity:** Code-defined hosting setup, avoiding hidden complexity or proprietary configurations.

## Decision

We chose **GitHub Pages** as our initial hosting platform.

### Rationale

- **Free Hosting**: GitHub Pages allows us to host our site without any cost, making it a practical choice while we're
  still growing the blog and avoiding unnecessary expenses.
- **Unified Workflow:** GitHub Pages keeps hosting directly within GitHub, simplifying management and eliminating the
  context switching required by external services.
- **Ease of Use:** Minimal setup is required because GitHub Pages isn't configurable. Simply generate the static site
  and call the official action to deploy it.
- **Familiarity:** We are familiar with GitHub Pages (i.e. their documentation and setup), meaning fewer surprises and
  easier debugging.
- **Minimal Dependencies:** Staying on GitHub reduces external dependencies and vendor lock-in, keeping our stack lean
  and easy to manage.

## Consequences

- We benefit from a straightforward and low-overhead publishing process, simplifying maintenance and management.
- Advanced capabilities provided by dedicated static hosting services (like automated preview environments or custom
  redirects) may require manual workarounds or additional tooling.
- Future requirements such as detailed analytics, redirects, or advanced CDN features may force us to migrate completely
  to dedicated hosting solutions like Netlify or cloud storage.

## Revisit When

- We outgrow the simplicity of GitHub Pages due to increasing needs for customisation, redirects, security headers, or
  advanced CDN and caching features.
- The benefits of dedicated static hosting platforms significantly outweigh our current preference for simplicity and
  unified GitHub management (e.g. branch previews).
- Reliability or performance concerns arise with GitHub Pages, negatively impacting our blog's availability or user
  experience.
