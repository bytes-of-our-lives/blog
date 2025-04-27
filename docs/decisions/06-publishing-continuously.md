# Publish Continuously from the `main` Branch (with Meaningful Release Tags)

We've chosen Hugo to power our blog, and we want a smooth, low-friction way to publish content frequently and
collaboratively. Yet we also feel it's important to highlight significant milestones and changes clearly; whether it's
our initial launch, a major theme refresh, or quarterly summaries. Balancing everyday simplicity with meaningful
traceability isn't trivial.

## Context

Publishing strategies fall broadly into two camps: continuous frictionless deployments directly from the `main` branch,
or carefully versioned releases tied explicitly to Git tags. The continuous approach is agile and low overhead, ideal
for fast, iterative publishing—perfect for a blog. However, it lacks clear markers for significant updates, making it
harder for future authors or maintainers to quickly grasp major project milestones.

The tagged-release method (using GitHub Releases) provides clear, documented checkpoints and nice UI features like
built-in changelogs. However, requiring manual tags for every publication can feel heavy, slow down authors, and
discourage regular content updates. We wanted something in between: a solution that enables frictionless daily
publishing while clearly marking important milestones.

Moreover, tags are any arbitrary Git refs, so we would like to come up with some guidelines for tagging milestones in
this project.

## Decision

We will adopt a hybrid publishing workflow:

- **Continuous deployment from `main`**: Every merge into `main` automatically triggers a Hugo build and deploys to our
  hosting (currently GitHub Pages). Routine articles go live immediately.
- **Explicit milestone tags**: Occasionally, we'll manually create Git tags and GitHub Releases for meaningful
  milestones. These tagged releases might reflect major blog events like initial launch (`Launch`), significant theme
  changes, or seasonal round-ups (`New theme 🎭`, `2025 Wrapped`, etc.).

Releases will be tagged and named without a schema at this point. For example, the upcoming release marking the launch
of the blog may be tagged as `launch` or `milestone/first-launch`. This decision doesn’t lay any restriction on other
tags while offering a format for [tagging milestones](#tagging-milestones).

### Rationale

This hybrid approach offers the best of both worlds:

- Continuous publishing maintains agility, allowing authors to quickly share posts and updates without added overhead.
- Explicit milestone tags give us clear markers, helpful changelogs, and a structured history for significant updates,
  facilitating better long-term maintenance and clarity.

### Tagging Milestones

To distinguish formal content milestones from routine development history, we tag releases using the `milestone/NN-slug`
format. The `milestone/` prefix clearly scopes the reference, and the zero-padded sequence number maintains logical and
lexicographical order, that is immediately obvious to viewers. Richer context is provided in the associated GitHub
Release notes, keeping tags clean and durable.

Why does this work so well?

- 🔢 Establishes chronological order.
- 🧠 Human-readable without being noisy or bloated.
- 🔖 Distinguishes milestones from regular branch names or other Git tags.
- 🧹 GitHub Release notes carry the rich context — the tag stays clean.

For example:

| Tag                           | Meaning                   |
|-------------------------------|---------------------------|
| `milestone/01-initial-launch` | First live deployment     |
| `milestone/02-theme-redesign` | New theme rollout         |
| `milestone/03-50th-post`      | Celebrating 50 posts      |
| `milestone/04-Q3-wrapup`      | Quarterly retrospective   |
| `milestone/05-2025-wrapped`   | End of year retrospective |

## Consequences

- Authors benefit from the ease of publishing regularly, reducing friction in everyday blogging.
- Maintainers can easily identify and communicate major site milestones through GitHub Releases, improving traceability
  and historical context.
- We introduce a small manual overhead: team members must remember to occasionally tag meaningful releases.
- Without clear discipline, there is a slight risk of milestone tagging becoming inconsistent or overlooked.

## Revisit When

- Authors frequently skip milestone tagging, resulting in outdated or confusing historical context in GitHub Releases.
- Milestones become so frequent or infrequent that their value as meaningful checkpoints diminishes significantly.
- We decide to switch hosting or tooling that makes either continuous deployment or manual tagging notably easier or
  harder.
