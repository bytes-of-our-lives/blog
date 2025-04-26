# Manage Themes Using Hugo Modules

When setting up the foundation for our blog, we faced a critical decision: how should we integrate external themes and
dependencies? Hugo offers multiple approaches, and while they all work, the choice has a big impact on how smooth (or
painful) future updates and customisations become. We needed something that wouldn't feel like an obstacle course every
time we wanted to tweak or upgrade our design.

## Context

Initially, we had two solid options:

- **Git Submodules:** A classic Git feature where you embed another repository within your own. Git-native, but
  notorious for its confusion and clumsiness.
- **Hugo Modules:** A Hugo-native dependency system based on Go modules. It provides clean version management, easy
  updates, and built-in tooling from Hugo itself. However, it requires Go installed on our machines and some familiarity
  with Go-based workflows.

We considered:

- Ease of use and clarity for authors, especially for the current team composition.
- Smooth dependency upgrades without manual overhead.
- Keeping our blog project friendly and low-maintenance in the long run.

## Decision

We chose to manage our Hugo themes and other dependencies using **Hugo Modules**.

We haven't yet decided if we will vendor modules (`hugo mod vendor`) or keep fetching them live. Both options are
viable, and the decision will be based on practical experience as we move forward.

### Rationale

- **Cleaner Dependency Management:** Updates are as simple as editing the config file and running a quick command. No
  Git wrangling required.
- **Consistency with Hugo Ecosystem:** Embracing Hugo modules keeps our tooling consistent with Hugo-native workflows.
- **Flexibility for Growth:** Modules allow us to easily integrate not just themes, but other reusable content or
  shortcodes if our needs expand.

## Consequences

- We benefit from reduced Git friction, saving maintainers from manual submodule headaches.
- Authors need Go installed locally, unless we vendor our modules using `hugo mod vendor`.
- Slight learning curve for anyone unfamiliar with Go modules.
- Future maintainers unfamiliar with Hugo Modules can start with the [official Hugo Modules documentation][hugo-mod] for
  clear and practical guidance.

[hugo-mod]: https://gohugo.io/hugo-modules

### Common Workflows

- Update all theme modules to latest versions:
  ```shell
  hugo mod get -u
  ```

- Require a new theme:
  ```shell
  hugo mod get github.com/example/new-theme
  ```

## Revisit When

- Team-wide adoption of Go tools becomes cumbersome or impractical due to changes in our team's composition or toolset
  preferences.
- Hugo introduces a simpler, Hugo-native solution that entirely replaces the advantages of modules.

