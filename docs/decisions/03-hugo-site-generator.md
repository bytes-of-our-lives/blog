# Hugo as Our Static-Site Generator

With our blog workflow firmly rooted in GitOps, the next critical choice is selecting the right static-site generator.
We need a tool that matches our Git-first approach, offers simplicity, facilitates local authoring and customisation,
and fits our team's technical preferences.

## Context

We evaluated several popular static-site generators:

- **Hugo:** A Go-based static-site generator known for its incredible build speed, simplicity, powerful content
  organisation, native Markdown support, rich theme ecosystem, and excellent local authoring experience.
- **Next.js:** A powerful React-based framework offering hybrid static-site and server-side rendering, suitable for
  dynamic sites but introducing more complexity in authoring and styling.
- **Gatsby:** React-based static-site generator with a rich plugin ecosystem and GraphQL integration, but higher
  complexity and slower local development experiences.
- **Jekyll:** Ruby-based static-site generator popular with GitHub Pages, but slower builds and limited extensibility
  for complex themes and customisations.

Our key criteria were:

- **Local Authoring Experience:** Smooth local editing with live hot reload previews for instant feedback.
- **Technical Familiarity:** Tools that align closely with our team's existing skills in Go and Markdown.
- **Simplicity:** Minimal configuration, intuitive structure, and fewer moving parts.
- **Customisation and Themes:** Easy separation between content (articles, posts) and their presentation (layouts,
  themes), enabling flexible styling and metadata (e.g. is-draft, dates, keywords, etc.).
- **Advanced Integrations:** We want to be able to add things like client-side search and user analytics (e.g. Google
  Analytics or Plausible) with minimal configuration and no need for a complex front-end framework.
- **Content Organisation**: Our content should be structured in a way that supports filtering by tags, grouping into
  series, and surfacing related or featured posts without requiring additional build logic or database-like complexity.

## Decision

We choose **Hugo** as our static-site generator.

### Rationale

- **Fast Local Development:** Hugo provides rapid local authoring with built-in live previews, enhancing immediate
  feedback during content creation.
- **Content-Presentation Decoupling:** Hugo naturally separates content organisation from layout and presentation,
  simplifying content management and future theming changes.
- **Rich Theming Support:** A large ecosystem of existing themes and straightforward customisation meets our design and
  branding needs without extensive front-end complexity.
- **Client-Side Enhancements:** Hugo easily integrates with common client-side enhancements like _Lunr.js_ for search
  and _Google Analytics_ for monitoring engagement.
- **Shortcodes for Custom Content Blocks**: Hugo provides a simple way to include reusable HTML snippets inside Markdown
  without actually writing raw HTML. This helps us keep our content clean and readable while still supporting custom
  elements like callouts, warnings, or series navigation.

## Consequences

- Our team experiences a streamlined authoring process with rapid previews and minimal setup.
- Hugo reinforces our Go-based tooling preference, making custom enhancements straightforward.
- Advanced dynamic features available out-of-the-box with frameworks like Next.js require external solutions or plugins
  in Hugo.
- A later decision record will address our deployment approach, choosing between platforms like GitHub Actions,
  Vercel, Netlify, or similar services.

## Revisit When

- Our requirements evolve significantly towards dynamic or interactive client-side functionalities that Hugo struggles
  to support.
- Authoring or content organisation needs to become overly complex, making React-based solutions like Next.js or Gatsby
  potentially more attractive.
- The available theme ecosystem or ease of customisation in Hugo no longer meets our design and branding ambitions.
