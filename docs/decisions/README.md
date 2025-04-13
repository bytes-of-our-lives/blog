# 🧠 Decision Records

This folder contains lightweight, human-readable records of key decisions we’ve made about how this blog is built,
maintained, and published.

We write these documents to help our **future selves and fellow authors** understand _why_ things are the way they
are—especially decisions that aren't obvious from the code or config alone.

Think of this as our internal changelog for things like:

- Publishing workflows (e.g. why we push from `main`, not tags)
- Linting and style enforcement (e.g. Vale rules vs. Grammarly)
- Theme customizations, plugin choices, or content structure norms
- Anything we debated, researched, or had options around

## Why Bother?

Because memory is short, and Slack is ephemeral. Writing it down means we won’t have to re-litigate the same questions
six months from now.

These docs also help new collaborators onboard faster, and give us a clear trail when we want to revisit or improve
something later.

## Format

Each file is named like this: `NNN-kebab-case-title.md`.

Where:

- `NNN` is a running number (just increment it)
- The rest is a short, readable summary (e.g., `001-publish-from-main.md`)

Inside each file, we use a simple Markdown structure:

```markdown
# Decision: Short human-readable title

Possibly a longer description of the debated decision, complementing the title.

## Context

What led to this decision? Any goals, constraints, or background?

## Decision

**The choice we made**, written clearly and explicitly.

## Rationale

Why this option? What were the tradeoffs? What did we rule out?

## Consequences (optional)

What changes as a result of this decision? What are the implications for the project?

## Revisit When (optional)

What might cause us to revisit or change this?
```

## Tone & Style

These are conversational, not bureaucratic. Write like you’re explaining things to a thoughtful teammate who missed the
meeting – not a future compliance officer.

Skip the ceremony: no “Status: Accepted”, no timestamps, no metadata. If it matters, use Git to remember those.

## 🪄 GPT Prompt (for back-filling or generating new decisions)

If you're revisiting an old conversation, reflecting on a technical choice, or just made a decision worth writing
down — use the prompt below. It's designed for ChatGPT and will help you generate a consistent, well-structured decision
file for this folder, without overthinking the format. Just drop it into the chat along with the relevant context.

```text
We’re creating informal, human-first decision documents for our Hugo-based blog.
These are inspired by the ADR (Architecture Decision Record) approach but intentionally lightweight, conversational,
and practical.

Each decision will live in `/docs/decisions/` in our GitHub repo, versioned alongside our content and automation.
These docs should help future maintainers and authors understand why things are the way they are,
especially when those choices aren't obvious or could be revisited later.

From the conversation above, extract one or more decisions we made (even implicitly), and for each:

- Write a Markdown file named like `NNN-kebab-case-summary.md` (e.g. `001-publish-from-main.md`).
- Use a short title starting with “Decision:” followed by a human-readable summary.
- Include a longer description ONLY if needed (i.e. the title is insufficient to fully describe a complex debate), but keep it concise.
- Structure with Markdown headings like:
  - `## Context` — What led us here? Any constraints, goals, or prior experiences that mattered?
  - `## Decision` — The choice we made, written boldly and clearly.
  - `## Rationale` — Why this option over others? Highlight tradeoffs, discussions, and rejected paths.
  - `## Consequences` (optional) — The positive or negative implications of this decision.
  - `## Revisit When` (optional) — What might cause us to rethink this?

Write like you're talking to a thoughtful teammate who wasn’t in the room. Be concise, but don’t be afraid to capture nuance if it helps future-you understand our logic.

Avoid ADR boilerplate like:
- “Status: Accepted”
- Dates, authors, or version numbers (Git has that covered)
- CLI tooling or number-tracking utilities
- Avoid documentation bloat

Assume the team:
- Is tech-savvy
- Is working async
- Cares about maintainability and clarity
- Has a shared sense of ownership (no rigid approvals)
- Uses GitHub Actions, Vale, Hugo, and Markdown files for most workflows

Please generate one file per decision, and return only the file contents.
```
