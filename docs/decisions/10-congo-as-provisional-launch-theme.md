# Use Congo as a Provisional Launch Theme

[Issue #7][theme-issue] asks us to choose the theme for the blog's first launch. The blog needs a presentation that
makes long-form technical articles pleasant to read without making their content depend on one presentation layer. We
also have very little published material and limited experience maintaining a real Hugo publication, so choosing a
permanent visual system now would imply confidence we have not earned.

## Context

The theme is responsible for presentation. Hugo and this repository remain responsible for article identity, dates,
authors, taxonomies, page resources, feeds, and publication behaviour. This boundary keeps articles portable when a
theme is upgraded or replaced.

We reached this decision through two provisional themes:

- **Hyde** gave the initial site a deliberately small, low-configuration scaffold. It helped prove the Hugo and GitHub
  Pages path, but was not intended to settle the launch experience.
- **PaperMod** replaced Hyde with a responsive, content-focused scaffold in [Pull Request #20][papermod-pr]. The first
  real article then exposed malformed breadcrumb JSON-LD when a local production build had no `baseURL`. Correcting one
  path operation required overriding an entire upstream partial, which was too much site-owned surface for a
  presentation dependency. [Pull Request #26][papermod-smoke-test] proposed accommodating that PaperMod-specific
  behaviour in the local smoke test.

For the first launch, a theme must:

- Render long essays, code, tables, footnotes, blockquotes, and page-bundle images well on mobile and desktop.
- Use standard Hugo content and front matter instead of requiring theme-specific shortcodes or publication fields.
- Preserve Hugo's support for drafts, future dates, taxonomies, RSS, sitemaps, canonical URLs, and subpath deployments.
- Work as a versioned Hugo Module and build cleanly with the repository's current-Hugo validation.
- Provide accessible, lightweight defaults without introducing Node or another mandatory authoring toolchain.
- Leave room for two or three authors without treating every article as the work of one global site author.

The serious alternatives were:

- **[Ananke][ananke]**, as the conservative maintenance and accessibility control. Its lower feature surface is
  attractive, but its current presentation is less suited to the reading experience we want than Congo's.
- **[Typo][typo]**, as a minimalist editorial option. Its smaller project and validation surface would require more
  repository-owned acceptance testing.
- **[Blowfish][blowfish]**, as a richer technical-blog theme. Its large set of integrations, shortcodes, and dynamic
  features creates more opportunities for theme-specific configuration and content coupling than we currently need.
- **[Hextra][hextra]**, as a strong documentation and blog hybrid. Its sidebar-oriented information architecture fits a
  knowledge base better than a publication of independent essays.
- **PaperMod**, retained with a local structured-data override. This would preserve the current look but accept the
  maintenance seam that triggered the evaluation.

[Congo v2.14.0][congo-release] passed the repository experiment with Hugo v0.164.0. It rendered the article under both
a GitHub Pages subpath and a local build without `baseURL`, produced valid structured data, and worked at 390px and
1440px in light and dark appearances without overflow or console errors. The article content did not need
Congo-specific changes.

The experiment also exposed three limits:

- Congo models one global site author. The repository instead needs article-to-author relationships.
- Congo's table of contents is expanded on mobile, where a long article's outline can consume the first reading screen.
- Upstream maintenance is active but not sufficient as our only compatibility signal. At the time of this decision,
  v2.14.0 was the latest release, and newer [current-Hugo workflow runs][congo-current-hugo-run] were failing because
  the example site contains raw HTML rejected by Hugo's `security.allowContent` policy. The failure is in the example
  content rather than the layouts used by this blog, but its persistence is a reason to retain our own current-Hugo
  build gate.

## Decision

**We will use Congo v2 as the provisional theme for the first launch and treat the first representative articles as an
evaluation period, not as confirmation of a permanent visual system.**

The repository will:

- Import a pinned Congo v2 release through [Hugo Modules][theme-modules].
- Keep article content in standard Markdown and Hugo front matter, with no Congo-specific publication semantics.
- Model `authors` as a [Hugo taxonomy][hugo-taxonomies] whose terms are addressable content pages and whose values
  support co-authorship.
- Use a narrow site-owned schema partial to derive article authors from those terms while Congo only supplies their
  presentation.
- Keep the homepage introduction in `content/_index.md` so it survives another theme change.
- Enable Congo's breadcrumbs, taxonomy links, recent articles, and appearance switcher, while leaving the expanded
  table of contents disabled.

### Rationale

Congo provided the strongest reading experience among the candidates that respected the repository's content
boundary. It gives the first launch useful presentation headroom without requiring us to enable its optional search,
diagram, analytics, comment, or social features.

The authorship adapter is an accepted compromise because the content model remains Hugo-owned and portable. It is not a
theme fork and copies no Congo source, but it is still an integration seam: the partial shadows Congo's structured-data
partial and must be checked when upgrading the theme. Ananke remains the fallback if that seam grows or Congo stops
tracking current Hugo.

## Consequences

- The blog gains a responsive, feature-rich launch presentation while retaining ordinary Hugo content.
- Authors become first-class site pages through Hugo's taxonomy graph rather than a second registry in theme data.
- Published articles must name at least one existing author term; the build rejects missing authors.
- The site owns one complete structured-data partial. It emits the required website, publisher, article, and author
  metadata, but does not currently reproduce Congo's separate `BreadcrumbList` JSON-LD.
- Congo upgrades remain maintainer-owned. Each upgrade must reconcile the Hugo Module graph, run strict current-Hugo
  builds, inspect the schema integration, and preview representative pages.
- Congo's optional features remain off until a demonstrated publishing or reader need justifies their maintenance and
  portability cost.
- This decision selects the first-launch scaffold, not final branding. We should avoid deep Tailwind or template
  customisation during the evaluation period.

## Revisit When

- A small corpus of representative articles exists, especially articles with multiple authors, code, tables, images,
  footnotes, long headings, and enough sections to justify a table of contents.
- We are about to invest in deep Congo-specific styling, templates, shortcodes, or front matter.
- The site-owned schema adapter needs to grow, or Congo provides a narrow extension point that lets us delete it.
- Congo fails the latest stable Hugo release, accumulates unresolved deprecations, or its maintenance cadence no longer
  fits the repository's upgrade policy.
- Real readers or authors expose accessibility, navigation, performance, or content-discovery problems.
- The publication's visual identity becomes clear enough to evaluate a theme against concrete branding requirements.

[ananke]: https://github.com/theNewDynamic/gohugo-theme-ananke
[blowfish]: https://github.com/nunocoracao/blowfish
[congo-current-hugo-run]: https://github.com/jpanther/congo/actions/runs/30178691323
[congo-release]: https://github.com/jpanther/congo/releases/tag/v2.14.0
[hextra]: https://github.com/imfing/hextra
[hugo-taxonomies]: https://gohugo.io/content-management/taxonomies/
[papermod-pr]: https://github.com/bytes-of-our-lives/blog/pull/20
[papermod-smoke-test]: https://github.com/bytes-of-our-lives/blog/pull/26
[theme-issue]: https://github.com/bytes-of-our-lives/blog/issues/7
[theme-modules]: ./07-hugo-modules-for-themes.md
[typo]: https://github.com/tomfran/typo
