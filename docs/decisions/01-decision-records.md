# Capture project decisions using Markdown-based records

As our blog project was born, we started making decisions that weren’t obvious from the repo: Should we publish from
`main` or tags? What tools enforce our style? How are drafts handled? These decisions tend to happen in chats, commits,
or in our heads — and they disappear unless we consciously record them. We needed a low-friction way to capture these
choices without creating process overhead.

## Context

Our blog is managed by a small, async team of trusted authors. We work directly with GitHub, Hugo, and Markdown, and we
tend to prefer lightweight workflows over structured tooling.

We considered formal documentation methods, including:

- [ADR tools](https://adr.github.io/) that generate numbered decisions with strict formatting
- GitHub Issues or Discussions with labels
- External documentation tools like Notion or Google Docs

However, each of these either felt too rigid, external to our workflow, or not durable enough to support long-term
clarity. We wanted something that:

- Lives with the repo
- Can be versioned and reviewed via PRs
- Feels natural to write
- Doesn’t slow us down

## Decision

**We’ll document important decisions in plain Markdown files under `/docs/decisions`, using a simple, consistent
structure.**

Each file:

- Has a short, descriptive filename like `01-recording-decisions.md`
- Begins with a title that combines the problem-space and chosen approach
- Opens with a paragraph introducing the problem, without stating the decision
- Includes a `## Context` section with relevant background and explored options
- Uses a `## Decision` section to declare the final call
- Includes a `### Rationale` subsection when nuance is needed
- Optionally includes `## Consequences` and `## Revisit When` sections

This format allows us to write like ourselves: thoughtful, casual, and precise — without forcing ceremony or overhead.

### Rationale

- Markdown fits our existing workflows and doesn't require new tools
- Writing decisions like this creates shared memory without slowing us down
- It’s future-friendly: decisions are easy to read, diff, and trace in Git
- We avoid repeating the same debates and enable new contributors to ramp up faster

## Consequences

- We introduce a low, manual overhead to write and maintain these files
- As authors, we now have a consistent place to reference previous decisions
- This encourages clarity and thoughtful debate at the moment, knowing we’ll capture the outcome
- These records will shape the "culture of the repo" as it grows, without needing a formal handbook

## Revisit When

- We stop writing these files, and the folder becomes stale or ignored
- We adopt a new workflow that centralizes docs or integrates better with GitHub (e.g., custom GitHub apps or
  docs-as-code automation)
- Decisions start spanning multiple repos or becoming too complex for this format to capture well