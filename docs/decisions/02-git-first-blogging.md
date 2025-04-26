# Power Our Blog Using a Static-Site Generator

As our team set out to build a tech blog, we faced a foundational choice: How should we publish and manage our content
without getting bogged down in tooling or overhead?

## Context

Our small, asynchronous team of trusted authors needed a publishing workflow that matched our existing development
culture — spontaneous, lightweight, and deeply integrated with familiar tools like GitHub. We considered several
approaches:

- Managed CMS platforms (e.g., WordPress, Ghost), which handle hosting and publishing but add complexity, cost, and less
  direct control.
- Blogging platforms like Medium, which simplify content publishing but severely limit flexibility, ownership, and
  control over content.
- Static-site generators combined with Git-based workflows, allowing tight integration with version control, lightweight
  content management, and straightforward deployment.

We sought a solution that:

- Integrates seamlessly with GitHub, leveraging familiar workflows.
- Enables intuitive collaboration, versioning, and feedback on articles.
- Provides high performance, security, and easy scalability without backend maintenance.
- Avoids the need for separate hosting, databases, or content management layers, allowing us to focus purely on writing
  and reviewing content in Git.

## Decision

We decided to power our blog using a GitHub repository with a GitOps-style workflow, explicitly ruling out CMS-based
solutions and external blogging platforms.

### Rationale

- **Git-Based Workflow:** Leveraging GitHub provides version control, easy collaboration, and familiar review processes,
  aligning perfectly with our existing practices as developers.
- **Ownership and Control:** Avoiding external blogging platforms ensures full ownership and control over our content,
  preserving flexibility and independence.
- **Scalability and Performance:** static-site hosting platforms inherently eliminate the need for dynamic backend
  infrastructure.

## Consequences

- Adopting a Git-based workflow mandates authors to be comfortable with Markdown, Git, and PR-driven processes, which
  may limit participation from less technical contributors.
- We will need to further explore and evaluate specific static-site generators (e.g., Hugo, Next.js, Gatsby, Jekyll) in
  subsequent decision records to determine the best fit.
- We must also evaluate and choose a deployment platform (e.g., GitHub Actions, Vercel, Netlify) to complement our
  GitOps workflow, another critical decision to be captured separately.

## Revisit When

- Our blog requires dynamic or real-time features that Git-based static-site generation cannot easily support.
- The team's technical composition significantly changes, increasing the necessity of simpler publishing workflows or
  tools.
- Evaluations of static-site generators or deployment platforms significantly influence our workflow direction or
  tooling complexity.
