# 🧠 Decision Records

This folder contains lightweight, Markdown-based records of important decisions we've made about how we build, publish,
and maintain this blog.

These documents are written for **future teammates and maintainers** — including our future selves—so we can understand
the reasoning behind decisions that aren’t obvious from code or config alone.

They’re not formal, they’re not bureaucratic, and they don’t require ceremony. Just enough structure to stay consistent
and useful.

## Why Bother?

Because memory is short, Git commits lack context, and Slack scrolls away. Writing it down means we won’t have to
re-litigate the same questions later.

We work with a small async team of trusted authors, and we want to capture the decisions we make together. These docs
give us a clear trail when we want to revisit or improve something later.

## Authoring New Decisions

All decisions follow the format and tone defined in
[`001-markdown-decision-records.md`](./001-markdown-decision-records.md).

If you're drafting a new record or back-filling an old one, you can use the [ChatGPT prompt](#chatgpt-prompt) below to
generate a clean starting point. Just drop it into the chat with the relevant context or conversation.

**Remember** to update the index below with the new filename and a short description of the decision. This helps us
keep track of what’s been documented and makes it easier to find specific decisions later.

---

# Index of Decisions

This section should be updated whenever a new decision file is added:

1. [Capture project decisions using Markdown-based records](./001-markdown-decision-records.md)

---

# Prompt Library 📚🪄

## ChatGPT Prompt

This is the prompt we use to generate new decision records with ChatGPT. It is designed to extract a single decision
from a conversation and format it according to our guidelines.

```markdown
We’re maintaining a set of informal, Markdown-based decision records for our Hugo blog project, stored under
/docs/decisions/. These records are meant to help our async team of trusted, tech-savvy authors understand **why** we
made certain calls—especially when those decisions aren’t obvious from the repo itself.

These documents should feel like a clear, helpful explanation from one teammate to another—not like bureaucratic
templates. They’re practical, conversational, and tightly written.

Please extract **a single decision** from the conversation above and return the following:
• A **Markdown file** containing the decision in the format described below.
• A **short filename**, like `001-markdown-decision-records.md`, that captures the essence of the decision in just a few
words. Avoid bloated or overly descriptive filenames.

# Format Instructions

Each file should include:

- A **concise, natural-language title** (H1) that reflects both the problem-space and the chosen approach. Do **not**
  prefix with “Decision:”. The title should be readable and expressive on its own.
- A short **intro paragraph** that sets up the problem-space and state of mind behind the decision, **without stating
  the decision yet**. It helps future readers orient themselves before diving into details.
- A `## Context` section that:
    - Names the problem clearly.
    - Includes relevant trade-offs and considered alternatives, when applicable.
    - Adds enough depth to inform a future teammate, without repeating anything or introducing bloat.
    - Uses a **conversational tone**, not a formal report. Keep it honest and grounded in our actual workflow.
- A `## Decision` section that:
    - States the decision clearly and directly.
    - Describes the chosen approach, including any formats, folder locations, or expectations.
    - Optionally includes a `### Rationale` subsection that explains the reasoning and rejected paths.
    - Merge `Decision` and `Rationale` if the logic is short and tightly connected.
- A `## Consequences` section focused on **practical implications for maintainers or authors**. Do not just restate the
  decision. Instead, outline actual gains, trade-offs, or potential risks to look out for.
- A `## Revisit` When section with **concrete signals** that should prompt re-evaluation. Avoid obvious or generic
  statements like “if this becomes a problem.” Be specific to our blog’s needs and workflow.

# Tone Guidelines

- Be helpful and clear, not formal or bureaucratic.
- Write like you’re explaining this to a smart teammate who missed the meeting.
- Avoid rigid boilerplate like status markers, dates, or CLI-driven numbering schemes.
- Markdown is our native language — use it naturally and cleanly.

⚠️ Only return the filename and Markdown file content — nothing else.
```
