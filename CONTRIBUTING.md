# 📝 Contributing to Bytes of our Lives

We take an article from an initial idea to a published page through a small, explicit GitHub workflow. The originating
Issue remains the durable coordination record while branches and Pull Requests come and go.

The [article lifecycle decision][lifecycle] owns the policy and invariants. This guide is its operational summary. A
policy change starts in the decision record and updates this guide in the same change.

## Prerequisites

To write and preview an article locally, you need:

- [Git](https://git-scm.com/downloads) for version control.
- [Go](https://go.dev/doc/install) for Hugo Modules.
- The [extended edition of Hugo](https://gohugo.io/installation/) for site generation.
- GitHub repository write access and permission to add items to the [Articles Project][articles] and edit its Status.

## Article Lifecycle

### 1. Capture the Idea

Open an Issue with the organization's `Article` [Issue Type][issue-types]. Its title begins with a present-progressive
verb and describes the intended outcome, such as “Explaining why reliable estimates fail”. Its body should capture:

- The intended audience.
- The problem, question, or thesis.
- What readers should understand or be able to do afterwards.
- An optional early outline.

Assign the Issue to the responsible author, add it to the [Articles Project][articles], and set its Project Status to
Ideation. The Issue owns identity, context, assignee, and terminal outcome; Project Status owns the current phase.
Keep the Project item through terminal closure; archive it instead of removing it when clearing active views.

The Project includes automatic workflows that may apply some Status changes. Treat them as a convenience: the
responsible author still verifies every transition and corrects the Status when automation does not run as expected.
GitHub owns native facts such as whether a Pull Request is open or merged, and Pages owns deployment results. If one
of those facts disagrees with Project Status, the Status is stale and the responsible author corrects it.

### 2. Draft the Article

Create a branch named `article/<topic-slug>`, for example:

```shell
git switch -c article/reliable-time-estimates
```

Push the branch after the first meaningful draft commit and link it through the Issue's Development section so
collaborators can discover the work before a Pull Request exists:

```shell
git push --set-upstream origin article/reliable-time-estimates
```

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

Keep images and other article-specific assets beside `index.md`. Set the Project Status to Drafting when work begins.
When pausing work, handing it off, or encountering a blocker, comment on the Issue with the next action. Reassign the
Issue when responsibility changes. Paused or blocked work retains its current semantic phase; the Issue comment makes
the pause and its next action explicit without adding another Project Status.

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
2. Confirm the author-curated `date` is intentional; an unintended future date silently keeps the article off the live
   site.
3. Run the local production smoke test below and verify the expected article output exists.
4. Open a Pull Request to `main` and set the Project Status to In review.

Build the site with production settings and confirm the expected article output exists. The smoke test only checks that
the file was generated, so it needs no base URL:

```shell
hugo --environment production --minify --cleanDestinationDir
test -f public/posts/reliable-time-estimates/index.html
```

Adjust the output path for the article's slug. A successful Hugo process alone is insufficient because Hugo can omit
draft or future-dated content without failing the build. This is a local smoke test; the required Pull Request build
remains the merge gate.

The Pull Request title begins with an imperative verb describing what the repository will do after merge, such as
“Publish The One About Reliable Time Estimates”. Its body should:

- Link the originating Issue with a supported closing keyword such as `Closes #N`.
- Explain the intended shape of the article and any non-obvious choices.
- Identify useful review focus and meaningful scope exclusions.
- Record that the local production smoke test passed.

This repository disables [**Auto-close issues with merged linked pull requests**][auto-close-issues]. The closing
keyword therefore creates GitHub's native Issue/Pull Request relationship without closing the Issue at merge. The
author closes the Issue manually only after live verification. Re-enabling that repository setting would violate this
workflow.

Obtain one approving review from an author other than the Pull Request author. This is a collaboration invariant even
if repository rules do not enforce it. Conversations may happen synchronously, but decisions and next actions needed
by asynchronous collaborators must be captured on the Issue or Pull Request.

### 4. Publish and Verify

After peer approval, merge the Pull Request into `main` and set the Project Status to Publishing. This starts the
GitHub Pages deployment but does not by itself prove that the article is live.

The author monitors the deployment. Publication evidence is a successful Pages deployment from a `main` commit that
contains the article changes introduced by the Pull Request, followed by live verification. A later successful
deployment is valid evidence if the first run containing those changes failed or was superseded. When that evidence
exists:

1. Open the live article and verify it renders correctly.
2. Add the live URL to the Issue.
3. Set the Project Status to Published and close the Issue as completed.
4. Remove the article branch if GitHub did not remove it automatically.

If deployment fails, keep the Issue open in Publishing while a follow-up change repairs it.

### 5. Abandon or Revive Work

When the team decides not to continue an unpublished article, record the reason on the Issue and set the Project Status
to Abandoned. If the branch contains material worth retaining, open a draft Pull Request, add a final comment that the
work was abandoned but retained for its history, and close it without merging so the diff remains discoverable.
Otherwise, record that discarding the draft is intentional. Then remove the branch and close the Issue as not planned;
Pull Requests do not have Issue close reasons.

An idea can be revived by reopening its Issue when the original context still applies. Restore its archived Project
item, or re-add it if it was removed, and return the Project Status to Ideation. Move it to Drafting when work resumes,
and start any new draft or review on a fresh branch and Pull Request.

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

The repository's [default archetype][archetype] is the source of truth for required front matter. A newly generated
article, with the archetype's templates already resolved, looks like:

```yaml
---
date: 2026-07-21T12:00:00+03:00
draft: true
title: The One About Reliable Time Estimates
---
```

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

For the reasoning behind this workflow, read [the article lifecycle decision][lifecycle].

[archetype]: ./archetypes/default.md
[articles]: https://github.com/orgs/bytes-of-our-lives/projects/2
[auto-close-issues]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-auto-closing-issues
[issue-types]: https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/managing-issue-types-in-an-organization
[lifecycle]: ./docs/decisions/08-async-content-lifecycle-with-github.md
