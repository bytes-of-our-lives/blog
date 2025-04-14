# Enforce Consistent Writing Style with Vale

As our blog grows, we foresee that maintaining consistency across posts, especially with multiple authors, will
become increasingly important. We want an automated, lightweight way to preserve a unified voice without sacrificing
author freedom or introducing cumbersome processes.

## Context

Our Hugo-based blog uses Markdown extensively and is maintained by a small, async team of trusted, tech-savvy authors.
From the outset, we recognise that inconsistencies in tone, style, and phrasing are likely to emerge.

We explored several options to proactively enforce consistency:

- **Manual reviews:** Effective but tedious and inconsistent.
- **LanguageTool and Grammarly:** Powerful grammar-checking but lacking deep integration with Markdown and Hugo
  shortcodes. Though privacy isn't much of a concern, the limited configurability is a troubling issue.
- **Custom scripts or CI pipelines:** Possible but potentially fragile and complex.
- **Vale:** An open-source, syntax-aware linter for prose that supports Markdown and is highly customisable with
  static files of rules.

We want a tool that integrates seamlessly into our existing Git-based workflow, runs locally and via CI, is easily
customisable without becoming burdensome — and ideally comes with fair, opinionated presets that reduce setup friction.

## Decision

We are adopting **Vale** as our primary tool to enforce a consistent writing style across the blog.

Vale will run locally as a pre-commit hook and in GitHub Actions for CI checks. Configuration files will live in the
`.vale/` directory of the repository, with rules tailored specifically for our tone: conversational, witty, and
tech-savvy.

### Rationale

- Vale natively supports Markdown, making it ideal for our Hugo-based workflow. It can be configured to ignore
  Hugo-specific syntax like shortcodes and custom Markdown blocks, ensuring it doesn’t lint where it shouldn't.
- It’s fast, straightforward to customise, and runs offline.
- Integrating Vale into GitHub Actions is straightforward, providing immediate, actionable feedback.
- Alternatives like LanguageTool or Grammarly are rejected due to integration complexity and configurability.

## Consequences

- Authors will get immediate feedback on style issues before committing, reducing manual review overhead.
- We'll maintain a consistent voice without restricting author creativity.
- There is a small upfront and ongoing effort required to tune Vale rules and keep them relevant to our evolving style.
- While Vale runs in CI and provides style enforcement, the final responsibility for clarity and polish lies with
  authors. CI may block certain style violations, but it won't catch issues of tone, grammar, or coherence.
- At this stage, we’re not integrating grammar-focused tools like LanguageTool or Grammarly into CI. For clarity and
  overall writing quality, authors are encouraged to use LLM-powered tools like GitHub Copilot and Gemini during
  drafting and review.

## Revisit When

- Vale rules require frequent, extensive maintenance that outweighs their benefit.
- We introduce new tools or integrations that handle both grammar and style more seamlessly and comprehensively.
- Our workflow significantly changes—for example, adopting a CMS or other external authoring tool incompatible with
  Vale.
