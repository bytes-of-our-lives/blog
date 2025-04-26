# 🧠 Decision Records

This folder contains lightweight, Markdown-based records of important decisions we've made about how we build, publish,
and maintain this blog.

These documents are written for **future teammates and maintainers**, including our future selves, so we can understand
the reasoning behind decisions that aren’t obvious from code or config alone.

They’re not formal, they’re not bureaucratic, and they don’t require ceremony. Just enough structure to stay consistent
and useful.

## Why Bother?

Because memory is short, Git commits lack context, and Slack scrolls away. Writing it down means we won’t have to
re-litigate the same questions later.

We work with a small async team of trusted authors, and we want to capture the decisions we make together. These docs
give us a clear trail when we want to revisit or improve something later.

## Authoring New Decisions

All decisions follow the format and tone defined in [the first decision record](./01-decision-records.md). When you’re
ready to add a new decision, create a new Markdown file in this folder and name it something like
`00-kebab-case-identifier.md`. Do read the referenced decision record first, as it contains important instructions on
how to write these documents.

If you're drafting a new record or backfilling an old one, you can use [this ChatGPT prompt][chatgpt-prompt] to generate
a clean starting point; it is ready to be dropped into a chat with the relevant context or conversation.

[chatgpt-prompt]: prompts.md#extracting-a-decision-record

**Remember** to update the index below with the new filename and a short description of the decision. This helps us
keep track of what’s been documented and makes it easier to find specific decisions later.

---

# Index of Decisions

This section should be updated whenever a new decision file is added:

1. [Capture project decisions using Markdown-based records](./01-decision-records.md)
2. [Power Our Blog Using a Static-Site Generator](./02-git-first-blogging.md)
