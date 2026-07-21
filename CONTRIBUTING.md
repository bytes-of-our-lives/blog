# 📝 Contributing to Bytes of our Lives

We take an article from an initial idea to a published page through a small, explicit GitHub workflow. The originating
Issue remains the lifecycle record while branches and Pull Requests come and go.

## Prerequisites

To write and preview an article locally, install:

- [Git](https://git-scm.com/downloads) for version control.
- [Go](https://go.dev/doc/install) for Hugo Modules.
- The [extended edition of Hugo](https://gohugo.io/installation/) for site generation.

## Article Lifecycle

### 1. Capture the Idea

Open an Issue whose title begins with a present-progressive verb and describes the intended outcome, such as
“Explaining why reliable estimates fail”. Its body should capture:

- The intended audience.
- The problem, question, or thesis.
- What readers should understand or be able to do afterwards.
- An optional early outline.

Assign the Issue to the responsible author, add it to the [Articles Project][articles], and set its Project Status to
Ideation. The Issue owns identity, context, assignee, and terminal outcome; Project Status owns the current phase.

### 2. Draft the Article

Create a branch named `article/<topic-slug>`, for example:

```shell
git switch -c article/reliable-time-estimates
```

Push the branch after the first meaningful draft commit and link it from the Issue so collaborators can discover the
work before a Pull Request exists:

```shell
git push --set-upstream origin article/reliable-time-estimates
```

Create the article as a Hugo leaf bundle:

```shell
hugo new content posts/reliable-time-estimates/index.md
```

This produces the canonical layout:

```text
content/posts/reliable-time-estimates/
├── index.md
└── diagram.png
```

Keep images and other article-specific assets beside `index.md`. Set the Project Status to Drafting when work begins.
When pausing work, handing it off, or encountering a blocker, comment on the Issue with the next action. Reassign the
Issue when responsibility changes.

New articles start with `draft: true`. Preview drafts locally with:

```shell
hugo server --buildDrafts
```

Replace the generated title with the article's _F.R.I.E.N.D.S_-style title. Hugo watches the repository and reloads the
local site as the article changes.

### 3. Request Review

Before requesting review:

1. Confirm the `draft` flag is intentional; set `draft: false` to publish, or keep it `true` only to merge without
   publishing yet.
2. Run local production-mode validation with `hugo --environment production --minify`.
3. Open a Pull Request to `main` and set the Project Status to In review.

The Pull Request title begins with an imperative verb describing what the repository will do after merge, such as
“Publish The One About Reliable Time Estimates”. Its body should:

- Link the originating Issue with `Tracks #N`.
- Explain the intended shape of the article and any non-obvious choices.
- Identify useful review focus and meaningful scope exclusions.
- Record that the production build passed locally.

Use `Tracks` instead of an auto-closing keyword: the Issue stays open until deployment succeeds.

Request feedback from another author. Conversations may happen synchronously, but decisions and next actions needed by
asynchronous collaborators must be captured on the Issue or Pull Request.

### 4. Publish and Verify

After approval, merge the Pull Request into `main` and set the Project Status to Publishing. This starts the GitHub
Pages deployment but does not by itself prove that the article is live.

The author monitors the deployment. When it succeeds:

1. Open the live article and verify it renders correctly.
2. Add the live URL to the Issue.
3. Set the Project Status to Published and close the Issue as completed.
4. Remove the article branch if GitHub did not remove it automatically.

If deployment fails, keep the Issue open in Publishing while a follow-up change repairs it.

### 5. Abandon or Revive Work

When the team decides not to continue an unpublished article, record the reason on the Issue and set the Project Status
to Abandoned. If the branch contains material worth retaining, open a draft Pull Request and close it as not planned so
the diff remains discoverable; otherwise, record that discarding the draft is intentional. Then remove the branch and
close the Issue as not planned.

An idea can be revived by reopening its Issue when the original context still applies. Start any new draft or review on
a fresh branch and Pull Request.

## Naming Conventions

Naming makes artefacts recognizable; explicit links and GitHub state remain authoritative.

| Artefact      | Convention                                   | Example                                       |
|---------------|----------------------------------------------|-----------------------------------------------|
| Article title | _F.R.I.E.N.D.S_ episode style                | The One About Reliable Time Estimates         |
| Directory     | Stable, lowercase topic slug                 | `reliable-time-estimates`                     |
| Issue         | Present-progressive verb and desired outcome | Explaining why reliable estimates fail        |
| Branch        | `article/<topic-slug>`                       | `article/reliable-time-estimates`             |
| Pull Request  | Imperative repository capability             | Publish The One About Reliable Time Estimates |

The `article/` prefix describes the semantic change independently of Hugo's `content/` directory. Other site content,
such as landing pages or author profiles, can use conventions appropriate to those changes.

## Front Matter

The repository's [default archetype][archetype] is the source of truth for required front matter. A newly generated
article, with the archetype's templates already resolved, looks like:

```yaml
---
date: 2026-07-21T12:00:00+03:00
draft: true
title: The One About Reliable Time Estimates
---
```

Add optional metadata only when the site templates consume it or the project has explicitly reserved it. When required
metadata changes, update the archetype and this guide together.

## Writing Style

- Aim for a conversational, tech-savvy tone.
- Keep advice practical, clear, and honest.
- Use Markdown and Hugo shortcodes where they improve the article.
- Prefer clarity over cleverness.

For the reasoning behind this workflow, read [the article lifecycle decision][lifecycle].

[archetype]: ./archetypes/default.md
[articles]: https://github.com/orgs/bytes-of-our-lives/projects/2
[lifecycle]: ./docs/decisions/08-async-content-lifecycle-with-github.md
