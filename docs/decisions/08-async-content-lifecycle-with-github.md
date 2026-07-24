# Manage the Article Lifecycle with GitHub Issues and Pull Requests

Our informal Issue → branch → Pull Request → merge workflow does not define how an article moves from an initial idea
to publication, how contributors discover its current state, or what happens when work is abandoned. We need a shared
lifecycle that supports asynchronous collaboration without adding enough ceremony to discourage writing.

## Context

Earlier decisions established a Git-first publishing model: articles are authored in Markdown with Hugo, reviewed in
GitHub, merged into `main`, and deployed through GitHub Pages. This decision coordinates article work within that
existing architecture rather than reconsidering the publishing stack.

The workflow must:

- Preserve enough context for another author to continue work asynchronously.
- Make an article's owner, state, and next action visible.
- Maintain a durable relationship between the original idea, draft, review, and published article.
- Account for paused or abandoned ideas instead of leaving drafts indefinitely active.
- Keep routine maintenance low for a small, trusted author team.

We considered encoding the phase in labels, an organization-level Issue Field, relying on automated Project
transitions, and an external editorial tracker or CMS. An Issue Field would keep the phase attached to the Issue across
Projects and make it searchable outside the Project. This workflow has one required Articles Project, however, so that
portability does not currently offset organization-wide configuration, migration, and another manually maintained
field. Labels do not enforce a single current phase. Depending on automation or external tooling would introduce
operational coupling that is not justified by the team's current scale.

## Decision

We will manage each article through a GitHub Issue, its item in the [Articles Project][articles], a short-lived branch,
and a Pull Request. Each artefact owns a distinct part of the lifecycle state:

- The Issue uses the organization's `Article` [Issue Type][issue-types] and owns identity, durable context, the
  responsible author through its assignee, and the terminal outcome.
- The Project item's Status field owns the current lifecycle phase, using the values in the table below.
- The branch and Pull Request contain the draft and review without duplicating lifecycle state.

This split keeps one authority for each property without encoding phases in Issue labels or body text. Project Status
is the declared editorial phase; it does not override native GitHub or Pages facts such as whether a Pull Request is
merged or a deployment succeeded.

### Lifecycle

An article moves through these semantic states:

| State       | Transition trigger                                      | Author responsibility                         |
|-------------|---------------------------------------------------------|-----------------------------------------------|
| Ideation    | An Issue captures a viable article idea                 | Record the audience, thesis, and outcome      |
| Drafting    | Work begins on an `article/` branch                      | Keep Issue context and Project Status current |
| In review   | A Pull Request is ready for peer review                  | Link the Issue and surface review focus       |
| Publishing  | The approved Pull Request is merged into `main`          | Monitor the deployment                        |
| Published   | The Pages deployment succeeds and the article is live    | Link the live article and close the Issue     |
| Abandoned   | The team decides not to continue before publication      | Record why, close open work, and close Issue  |

The Issue remains open until the article is either published or abandoned. A merge starts publication but does not
prove it succeeded. If deployment fails, the article remains in Publishing while a follow-up change repairs it.
Published always pairs with an Issue closed as completed; Abandoned always pairs with an Issue closed as not planned.

The following invariants make disagreement detectable:

- In review requires an open Pull Request that is ready for review and an open Issue.
- Publishing requires a Pull Request merged into `main`, an open Issue, and publication still awaiting repair or live
  verification.
- Published requires live verification after a successful Pages deployment from a `main` commit containing the
  article changes introduced by the Pull Request, plus an Issue closed as completed.
- Abandoned requires the decision not to continue, no open publication Pull Request, and an Issue closed as not
  planned.

GitHub and Pages own those underlying facts. If they contradict Project Status, the Status is stale; the responsible
author reconciles it to the verified facts. The author checks Status when review starts, when a Pull Request merges,
after each deployment result, and before closing or reopening the Issue.

The Issue assignee is the responsible author. When pausing work, handing it off, or encountering a blocker, that author
records the next action on the Issue so another contributor can continue asynchronously. Project Status options use the
state names in the table; the terminal state is set before closing the Issue as completed or not planned.

The Articles Project contains automatic workflows that may perform some Status transitions. These workflows reduce
routine updates but do not own the lifecycle: the responsible author verifies and corrects Project Status, and the
process remains usable when automation is disabled or fails.

Paused or blocked work retains its semantic phase. The Issue records that work is paused, why, and the next action;
the lifecycle deliberately avoids a separate Paused status unless dormant work becomes difficult to discover.

An abandoned idea may be revived by reopening its Issue when the original context still applies. Its archived Project
item is restored, or re-added if it was removed, and its Project Status returns to Ideation before moving to Drafting
when work resumes. Any new draft or review starts from a new branch and Pull Request.

### Artifact Relationships

- The **Issue** owns the article's identity, assignee, durable problem-space context, and terminal outcome.
- The **Project item** owns the current lifecycle phase through its Status field.
- The **branch** stores the working draft. Its link is recorded on the Issue while drafting, and it is removed after
  publication or intentional discard.
- The **Pull Request** proposes publication, links the Issue, and contains review-specific context.
- The **live article URL** is terminal evidence of successful publication and is added to the Issue before closure.

The Issue links the pushed branch through GitHub's Development relationship while drafting. Once review starts, the
Pull Request provides the durable association between its head branch and the Issue. Branch names provide useful
context, but branches have no independent backlink.

The repository setting [**Auto-close issues with merged linked pull requests**][auto-close-issues] is disabled. Pull
Requests use a supported closing keyword such as `Closes #N` to create the native relationship, while the Issue
remains open across merge and is closed manually only after live verification. Re-enabling automatic closure would
break the Publishing phase and requires revisiting this decision.

GitHub remains the system of record even when authors discuss an article in person or over chat. Any outcome needed by
an asynchronous collaborator is recorded on the Issue or Pull Request.

### Naming and Content Conventions

Article titles use the _F.R.I.E.N.D.S_ episode style, such as “The One About Reliable Time Estimates”. The directory
name uses a stable, lowercase, hyphenated topic slug such as `reliable-time-estimates`.

Issues use the `Article` type, begin with a present-progressive verb, and describe the intended outcome, for example,
“Explaining why reliable estimates fail”. Their bodies capture the intended audience, problem or thesis, and desired
outcome; an early outline is optional.

Article branches use `article/<topic-slug>`. The prefix describes the semantic change independently of Hugo's
`content/` directory and distinguishes articles from other site content.

Pull Request titles begin with an imperative verb that describes what the repository will do after merge, for example,
“Publish The One About Reliable Time Estimates”. Their bodies link the originating Issue with `Closes #N`, explain the
chosen shape of the article, identify useful review focus or exclusions, and include local smoke-test proof. One author
other than the Pull Request author approves publication. Repository rules may enforce stricter requirements, but this
peer approval remains part of the collaboration process.

The `date` front-matter value is an author-curated display and ordering choice, not the operational publication time.
Git and GitHub retain draft, review, merge, and deployment history. Authors review the generated value before
publication; a future date is a deliberate choice, and Hugo keeps future-dated content out of normal production builds
until that date passes.

Commit-message formatting is intentionally outside this decision. The small, trusted team can align on commits during
review without making them part of the article lifecycle contract.

Detailed commands and examples live in the [contribution guide][contributing].

### Rationale

- **Low ceremony:** The workflow reuses GitHub primitives the team already understands without adding an external
  service or lifecycle automation.
- **Explicit ownership:** Each property has one owner: the Issue holds context, assignee, and outcome, while the Project
  Status field holds the current phase. Branches and Pull Requests remain transient.
- **Appropriate scope:** Project Status matches the single editorial board used today. An organization-level Issue
  Field is deferred until its cross-Project visibility solves an observed need.
- **Durable traceability:** Explicit links connect the idea, review, and deployed result more reliably than naming
  conventions alone.
- **Operational honesty:** Publication is complete only after the generated site is successfully deployed and verified.
- **Optional automation:** Existing Project workflows can reduce routine updates without becoming a prerequisite for
  the lifecycle.

## Consequences

- Authors must select the `Article` Issue Type, add the Issue to the Articles Project, and maintain the assignee, next
  action when work pauses, and Project Status manually.
- Authors need permission to add Project items and edit Project Status independently of their repository permissions.
- Repository administrators must keep automatic closure of merged linked Issues disabled; closing keywords provide
  native relationships, while authors close Article Issues after live verification.
- An article has no recorded lifecycle phase until it belongs to the Articles Project.
- Project items remain present through terminal closure and may be archived, but removing one discards its phase.
- Reviewers can reconstruct an article's history without searching across disconnected artefacts.
- Publishing failures remain visible rather than allowing a merged Pull Request to masquerade as a live article.
- Non-technical contributors still need familiarity with GitHub Issues and Pull Requests.
- The naming contract adds consistency, but GitHub state and explicit links—not grammar—remain authoritative.
- Paused and blocked work remains in its semantic phase, so discovering inactivity depends on the Issue's explicit
  next-action comment rather than another Project column.
- The workflow's ceremony is justified only while the team actively uses the Articles Project as its editorial view.

## Revisit When

- Manual Project updates are routinely forgotten or no longer describe the article's real phase.
- Automatic closure of merged linked Issues is re-enabled.
- Paused or blocked articles become difficult to distinguish from active work.
- The team stops using the Articles Project as its editorial view.
- Article Issues need one consistent phase across multiple Projects or must be searchable by phase outside a Project.
- The number of concurrent articles makes ownership or next actions difficult to discover.
- Scheduled or embargoed publication requires states beyond this lifecycle.
- Non-technical authors need an editorial interface that GitHub cannot provide comfortably.
- Article formats expand enough that the `article/` branch prefix no longer describes the work accurately.

[articles]: https://github.com/orgs/bytes-of-our-lives/projects/2
[auto-close-issues]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-auto-closing-issues
[contributing]: ../../CONTRIBUTING.md
[issue-types]: https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/managing-issue-types-in-an-organization
