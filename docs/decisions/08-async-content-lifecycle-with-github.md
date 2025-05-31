# Asynchronous Content Lifecycle via GitHub Issues & Pull‑Requests

Our distributed author team needs a lightweight yet dependable way to shepherd blog‑post from vague ideas to published
articles, without resorting to extra tooling.
We already live in GitHub for code, reviews, and CI/CD, so it makes sense to treat written content with the same rigour
and visibility.
The challenge is to find a convention that keeps progress transparent, avoids stale drafts, and feels natural to
engineers who think in commits.

## Context

Tooling already in place: The site is built with Hugo, deployed via GitHub Pages (see [04-hosting-on-github-pages.md])
and published automatically on merge to main (see [06-publishing-continuously.md]).

Author workflow: Everyone works asynchronously, using Git and Pull‑Requests for collaboration; English is our shared
language.
Because our whole stack already lives in GitHub, the natural answer is to treat writing like code: Issues capture
intent, branches hold work in progress, Pull Requests drive peer review, and `main` is what the world sees.

Naming ethos: Post titles mimic _F.R.I.E.N.D.S_ episodes (e.g. “The One with George Stephanopoulos”), providing a
humorous but uniform naming scheme that guides content focus.

[04-hosting-on-github-pages.md]: ./04-hosting-on-github-pages.md

[06-publishing-continuously.md]: ./06-publishing-continuously.md

What we don’t want—at least today—are extra lifecycle labels, bots that shuffle cards, or scripts that comment “Now
live!” when a post is published. Manual is fine as long as the path is familiar.

## Decision

Each post will flow through three GitHub artefacts, tracked on the Projects board:

| Phase                 | Artifact     | Naming Convention                       | Project Column           |
|-----------------------|--------------|-----------------------------------------|--------------------------|
| Ideation & outline    | Issue        | Present-participle verb + TOPIC         | Ideation / Drafting      |
| Drafting & edits      | Branch       | Prefixed by `article/`                  | In Progress (Issue card) |
| Peer review & publish | Pull Request | Publish or imperative-mood verb + TOPIC | In Review → Published    |

For example, an Issue might be titled “Writing about George Stephanopoulos” following the present-participle verb
convention.
The corresponding branch could be named `article/george-stephanopoulos`, and the Pull Request would be titled “Publish
about George Stephanopoulos” or "Publish The One with George Stephanopoulos".

Cards are moved manually by the author or reviewer; no automation touches them for now.

### Naming details

To keep things simple and consistent, we use the abovementioned naming conventions for each artefact. This section
complements the table above with more details.

Blog posts have two identifiers: a human-readable title (e.g. “The One with George Stephanopoulos”) and a file name (
e.g. `george-stephanopoulos.md`).
The title follows the _F.R.I.E.N.D.S_ episode style, using the format “The One with/about/when _TOPIC..._”.
The file name is derived from the title, shorter and avoids special characters, making it convenient for URLs and file
systems, while remaining relevant to the content.

Issues **always** start with a _present‑participle_ verb that reflects the author’s ongoing effort, followed by the
topic.
Here are some examples:

- "Writing about reliable time estimates"
- "Thinking about zero‑downtime deploys"
- "Sharing thoughts on time estimates"
- "Evaluating the impact of AI on software development"
- "Ranting about the state of devops"
- "Discussing Golang concurrency primitives"

Branches **always** start with `article/` followed by a slug version of the topic: short, lowercase, and hyphenated,
like the file name.

Pull Requests **always** start with an _imperative-mood_ verb that reflects the action of making the content live, such
as _Publish_, followed by the topic.

Here are some examples of Pull Requests titles that match the Issues above:

- "Publish about reliable time estimates"
- "Blog about zero‑downtime deploys"
- "Publish thoughts on time estimates"
- "Evaluate the impact of AI on software development"
- "Rant about the state of devops"
- "Discuss Golang concurrency primitives"

The imperative mood helps differentiate the review stage from the ideation phase, making it clear that the content is
ready for publication, while the present‑participle verb in Issues indicates ongoing work. We avoid repeating the full
episode‑style title inside the PR title unless clarity demands it.

### Rationale

- Zero extra ceremony: We reuse GitHub primitives we already like; no new labels, bots, or external tools.
- Traceability: Commits, PR, and Issue titles form a breadcrumb trail reviewers and future editors can grep.
- Instant clarity: The naming convention provides immediate insight into the post’s status and content focus, making it
  easy to understand at a glance; be it in the Issues list, the Projects board, or the commit history.
- Future‑proof: By laying conventions today, we set a foundation that can scale as our content grows, without needing to
  overhaul our workflow.

## Consequences

This decision contributes:

- Authors learn straightforward rules for naming Issues, branches, Pull-Requests, and file names.
- The workflow mirrors our existing Git habits, making it intuitive for engineers.
- Manual board updates require discipline, but the process is straightforward and transparent.
- The repo remains tidy without extra labels or bots, keeping the focus on content.

This decision has the following downsides:

- Manual updates to the Projects board require discipline; forgetting to move cards can lead to confusion about the
  status of articles.
- PR titles differ from final post titles, so searching may get tricky; users can fall back to commit history.
- Choosing the right verb for atypical posts (e.g. recording a podcast episode) requires more thought.
- Non-technical contributors still need to understand GitHub Issues and Pull Requests.

To facilitate project management, we’ve created a [GitHub Project][articles] to track the lifecycle of articles.

[articles]: https://github.com/orgs/bytes-of-our-lives/projects/2

## Revisit When

- Card‑drag fatigue sets in, and we’re ready to automate board transitions.
- We start scheduling posts or need embargo dates.
- Searchability pain pushes us to embed the episode‑style title directly into PR titles.
