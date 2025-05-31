# 📝 Contributing to Bytes of our Lives

Welcome! If you're writing for this blog, here's how we take an idea from spark to published post — using a workflow
that's transparent, async, and built around GitHub.

## Prerequisites

To contribute and preview content locally, you’ll need:

- [Git](https://git-scm.com/downloads) (for version control)
- [Go](https://go.dev/doc/install) (for Hugo modules support)
- [Hugo](https://gohugo.io/getting-started/installing/) (extended version recommended)

Make sure these are installed and available in your terminal before starting.

## Content Lifecycle

1. **Ideation**
    - Open a new GitHub Issue to pencil-down and grow your idea.
    - Use a **present-participle** verb in the title (see [Naming Conventions](#naming-conventions) below).
    - Outline your concept, goals, and any early thoughts.

2. **Drafting**
    - Create a branch named `article/your-topic-slug`.
    - Draft your post in `content/posts/` directory.
    - Use Hugo front-matter and Markdown.
    - Read [Writing Tips](#writing-tips) for more guidance.

3. **Peer Review**
    - Open a Pull Request (PR) from your branch to `main`.
    - Title the PR with the **imperative verb** (see [Naming Conventions](#naming-conventions) below).
    - Request feedback from other authors.
    - Feedback comes both _asynchronously_, as comments on GitHub.
    - Feedback also comes _synchronously_, as personal conversations.

4. **Publication**
    - Once approved, merge your changeset into `main`.
    - The entire site is automatically rebuilt and deployed.
    - Post the link to your new article on the Issue and close as completed.

## Naming Conventions

Content is made of several artefacts that follow a consistent naming scheme to keep things organised and clear:

- **Article Title:** Use a human-readable, FRIENDS-style episode title (i.e. “The One with/about/when ...”).
- **Filename:** Use a short, lowercase, hyphenated slug based on the topic.
- **Issues:** Start with a present-participle verb (e.g. "Writing", "Thinking", "Discussing") followed by the topic.
  This signals ongoing work or ideation.
- **Branches:** Always start with `article/` followed by the slug.
- **PRs:** Start with an imperative-mood verb (e.g., "Publish", "Blog about") followed by the topic.
  This signals the content is ready for review or publication.

**Examples:**

| Slug                      | Issue                                       | Pull Request                              |
|---------------------------|---------------------------------------------|-------------------------------------------|
| reliable-time-estimates   | Writing about reliable time estimates       | Publish about reliable time estimates     |
| zero-downtime-deploys     | Thinking about zero-downtime deploys        | Blog about zero-downtime deploys          |
| dump-of-time-estimates    | Sharing thoughts on time estimates          | Publish thoughts on time estimates        |
| ai-on-software-dev        | Evaluating the impact of AI on software dev | Evaluate the impact of AI on software dev |
| state-of-devops           | Ranting about the state of devops           | Rant about the state of devops            |
| go-concurrency-primitives | Discussing Golang concurrency primitives    | Discuss Golang concurrency primitives     |

## Communication

We trust authors to communicate, however, feels most natural, whether that's in person, over chat, or by video call. Use
GitHub Issues and Pull Requests to capture context, decisions, and progress so everyone can stay in sync asynchronously
but don't feel limited to GitHub for real conversation.

## Writing Tips

Writing for the blog should become intuitive, over time. Here are some guidelines to help you get started:

- Aim for a conversational, tech-savvy tone.
- Use Markdown and Hugo shortcodes as needed.
- Keep posts practical, clear, and honest.

### Hugo Markdown

Hugo uses front-matter (in YAML format) to define metadata for each post.

Here's a basic example:

```yaml
---
title: "Your Post Title"
date: 2023-10-01
draft: false
tags: [ "tag1", "tag2" ]
categories: [ "category1", "category2" ]
author: "Your Name"
image: "images/your-image.jpg"
summary: "A brief summary of your post"
---
```

Hugo pages are written in Markdown, which allows for rich formatting. You can also use Hugo shortcodes for additional
functionality (like embedding videos or creating callouts).

## Hugo Page Structure

You can write posts in two ways:

- **Single File (Article as a File):**
  Place a Markdown file directly in `content/posts/`:
  ```
  content/posts/my-first-post.md
  ```

- **Leaf Bundle (Article as a Folder):**
  For posts with images or attachments, create a folder (a "leaf bundle") with an `index.md` inside:
  ```
  content/posts/my-first-post/
    ├── index.md
    └── diagram.png
  ```
  This lets you keep related assets together.
  See [Hugo: Page Bundles](https://gohugo.io/content-management/page-bundles/) for details.

Both patterns are supported—choose whichever fits your article.

## Local Preview

Before opening a Pull Request, preview your changes locally to ensure everything renders as expected. Run `hugo serve`
from the project root and visit the provided local URL in your browser. Hugo will watch for changes and automatically
reload the site as you edit your content.

Reviewers are also encouraged to use `hugo serve` locally to view new or modified articles in context, since live
previews for PRs aren’t yet available. This helps ensure formatting, images, and shortcodes render correctly before
publication.

---

For more on our workflow and decision-making, see [`/docs/decisions`](./docs/decisions).

Happy writing!
