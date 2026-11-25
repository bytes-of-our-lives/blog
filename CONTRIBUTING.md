# 📝 Contributing to Bytes of our Lives

We take an article from an initial idea to a published page through a small, explicit GitHub workflow. The originating
Issue remains the durable coordination record while branches and Pull Requests come and go.

Authors and agents choose how to draft, revise, check, and prepare a Pull Request within the agreed scope.
The responsible author owns the article’s claims and voice.
Ask the author when a choice would change their meaning or publication intent.

## Prerequisites

To write and preview an article locally, you need:

- [Git](https://git-scm.com/downloads) for version control.
- [Go](https://go.dev/doc/install) for Hugo Modules.
- The [extended edition of Hugo](https://gohugo.io/installation/) for site generation.
- GitHub repository write access to push an article branch.

## Article Lifecycle

### Article Ideas

Use the organization's `Article` [Issue Type][issue-types] for every new article.
Describe who the article is for, the question it answers, and what readers should take away.

Assign the Issue to the responsible author.
To see the articles together, use a saved board view in [repository Issues][articles] filtered to `type:Article` and grouped by [Status][issue-statuses].

New ideas start in `Backlog`.
GitHub can move an Issue to `Todo` when a person is assigned and to `In progress` when a draft Pull Request is linked.
For an existing Issue without a status, choose the one that reflects the work underway.

### Drafting

Link the `article/<topic-slug>` branch in the Issue’s Development section from the first meaningful draft so another author can find the work before review.

Create the article as a Hugo leaf bundle:

```shell
hugo new content posts/reliable-time-estimates/index.md
```

After adding an article-specific image, the canonical layout looks like:

```text
content/posts/reliable-time-estimates/
├── index.md
└── diagram.png
```

Keep images and other article-specific assets beside `index.md`.
Use `In progress` while drafting.
When work pauses, is blocked, or changes hands, record the next action on the Issue.
Paused and blocked articles keep their current status.
Reassign the Issue when responsibility changes.

New articles start with `draft: true`. Preview drafts locally with:

```shell
hugo server --buildDrafts
```

Add `--buildFuture` (or `-F`) when the article's `date` is intentionally in the future; `--buildDrafts` alone still
hides future-dated content.

`draft: true` keeps an article out of the production site; it does not make the article confidential. Branches, pull
requests, commit history, and hosted pull request previews are public, and those previews intentionally render draft
and future-dated content. Keep confidential, embargoed, legally sensitive, or secret material outside this repository
until it is safe to disclose.

Replace the generated title with the article's _F.R.I.E.N.D.S_-style title. Hugo watches the repository and reloads the
local site as the article changes.

### Peer Review

Before requesting review:

1. Keep `draft: true` while the article should stay out of the production build.
2. Confirm the author-curated `date` is intentional; an unintended future date silently keeps the article off the live
   site.
3. Verify that production output includes or withholds the article as intended.
4. Open a Pull Request to `main` and link it to the Issue.
   GitHub can move the Issue to `In review` when the linked Pull Request is ready for review.

For an article intended to go live, this local smoke test checks that Hugo generates its page.

```shell
hugo --environment production --minify --cleanDestinationDir
test -f public/posts/reliable-time-estimates/index.html
```

Adjust the output path for the article's slug. A successful Hugo process alone is insufficient because Hugo can omit
draft or future-dated content without failing the build. This is a local smoke test; the required Pull Request build
remains the merge gate.

The Pull Request title begins with an imperative verb describing what the repository will do after merge, such as
“Publish The One About Reliable Time Estimates”. Its body should:

- Link the originating Issue in the Pull Request’s Development section.
- Explain the intended shape of the article and any non-obvious choices.
- Identify useful review focus and meaningful scope exclusions.
- Record that the local production smoke test passed.

Obtain one approving review from an author other than the Pull Request author. This is a collaboration invariant even
if repository rules do not enforce it. Conversations may happen synchronously, but decisions and next actions needed
by asynchronous collaborators must be captured on the Issue or Pull Request.

### Publication

GitHub Pages tracks deployment in the [Live Site workflow](./.github/workflows/publish.yml).
The article Issue stays open after merge, including while a draft or future-dated article is waiting to go live.
Once the article is available as intended, post an image on the Issue showing what readers can see, such as a screenshot of the live article.
Then close the Issue as completed (`Done`).

### Abandoned Ideas

If the team drops an article, close its Issue as `Not planned` with a brief reason and a link to any draft worth keeping.

## Naming Conventions

Naming makes artefacts recognizable; explicit links and GitHub state remain authoritative.

| Artefact      | Convention                                   | Example                                       |
|---------------|----------------------------------------------|-----------------------------------------------|
| Article title | _F.R.I.E.N.D.S_ episode style                | The One About Reliable Time Estimates         |
| Directory     | Stable, lowercase topic slug                 | `reliable-time-estimates`                     |
| Issue         | `Article` type; present-progressive outcome  | Explaining why reliable estimates fail        |
| Branch        | `article/<topic-slug>`                       | `article/reliable-time-estimates`             |
| Pull Request  | Imperative repository capability             | Publish The One About Reliable Time Estimates |

The `article/` prefix describes the semantic change independently of Hugo's `content/` directory. Other site content,
such as landing pages or author profiles, can use conventions appropriate to those changes.

## Front Matter

The [default archetype][archetype] marks new articles with `draft: true`.
Omit `draft` when the article is ready to publish, as in this example.

```yaml
---
authors:
  - daniel-orbach
date: 2026-07-21T12:00:00+03:00
title: The One About Reliable Time Estimates
---
```

Each entry in `authors` is the stable slug of an author term under `content/authors/`. Hugo uses this taxonomy to
generate the authors index, each author profile, article-to-author links, and machine-readable authorship metadata.
Use an array even for a single author so co-authored articles require no schema change. Choose an existing author term
or add its branch bundle before requesting review; do not put presentation-only profile data in article front matter.

`date` is editorial metadata: it controls the date displayed on the article and its chronological ordering. The author
may choose it independently of draft creation, review, or deployment time; Git and GitHub retain those operational
timestamps. The archetype's generated value is only a starting point, so review it before requesting publication.
A future `date` is fine when it is deliberate. Because Hugo excludes future-dated content from normal builds, an
unintended future date silently keeps the article off the live site until that date passes.

Add optional metadata only when the site templates consume it or the project has explicitly reserved it. When required
metadata changes, update the archetype and this guide together.

## Writing Style

- Aim for a conversational, tech-savvy tone.
- Keep advice practical, clear, and honest.
- Use Markdown and Hugo shortcodes where they improve the article.
- Prefer clarity over cleverness.

The [article lifecycle decision][lifecycle] describes the original workflow with the Articles Project.

## Maintaining the Site

### Hugo Dependencies

The deployment workflow intentionally installs the latest stable Hugo release. This keeps the toolchain current and
makes deprecation warnings visible while there is still time to address them. Treat those warnings as compatibility
signals: review them during routine maintenance rather than waiting for a build to break.

Themes and other Hugo Modules are imported through [`hugo.yaml`](./hugo.yaml), while their selected versions are
recorded in `go.mod` and `go.sum`. To upgrade a module, replace `MODULE_PATH` below with its import path from `hugo.yaml`
and run:

```bash
hugo mod get MODULE_PATH@latest
hugo mod tidy
hugo mod graph
go mod verify
hugo --environment production --minify --renderToMemory
```

The targeted command keeps routine upgrades independently reviewable. To intentionally refresh every direct and
indirect Hugo Module dependency, replace the first command with `hugo mod get -u`, then run the same reconciliation and
validation steps.

Use `hugo mod tidy`, not `go mod tidy`. A theme may be referenced only by Hugo configuration, so the Go command can
mistake it for an unused module and remove it.

Dependabot checks GitHub Actions weekly. It intentionally does not target the `gomod` ecosystem: Dependabot's Go
updater does not preserve modules referenced only by Hugo configuration and can remove the selected theme while tidying
the Go module graph.

Hugo Module discovery and upgrades therefore remain maintainer-owned. Pull requests are still built with the latest
stable Hugo to surface compatibility problems. Maintainers review upstream release notes and module diffs, run the
checks above, and preview representative pages before merging an upgrade.

[archetype]: ./archetypes/default.md
[articles]: https://github.com/bytes-of-our-lives/blog/issues
[issue-statuses]: https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issue-statuses
[issue-types]: https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/managing-issue-types-in-an-organization
[lifecycle]: ./docs/decisions/08-async-content-lifecycle-with-github.md
