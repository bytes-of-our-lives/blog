---
authors: [daniel-orbach]
date: 2026-07-29T12:00:00+03:00
draft: true
title: "The One Where iCloud and Git Stop Fighting Over Your Obsidian Vault"
---

{{< lead >}}
iCloud keeps my Obsidian vault available on my MacBook and iPhone. Git keeps its history inspectable and recoverable.
Keeping Git's database outside iCloud lets each tool do its job without asking a file-sync service to understand Git
internals.
{{< /lead >}}

## Version the Vault Before Handing It to an Agent

I use Obsidian on a MacBook and an iPhone. iCloud makes that pleasantly uneventful: I write mostly on the MacBook,
sometimes write on the phone, and expect the same notes to appear on both.

I also let AI agents work in the vault. That changes the risk profile.

An agent can reorganize, rewrite, or delete more notes in one command than I would touch manually in an afternoon. Git
gives me a diff before I accept the work, a commit when I do, and a known route back when the result is wrong. It limits
the blast radius without making the agent less useful.

iCloud and Git answer different questions:

- iCloud answers: *Where is the current version of this file?*
- Git answers: *What changed, why did it change, and how do I get the previous version back?*

I did not arrive at this setup after losing a vault. I saw enough warnings about putting a Git repository inside a
cloud-synced directory and decided not to produce my own incident report.

The concern is well founded. The [Git FAQ][git-faq] warns against using a cloud service to synchronize repository
state. Git updates objects, refs, indexes, and lock files as parts of repository operations. A general-purpose sync
service sees individual filesystem changes, not the transaction they collectively represent. If it propagates a
partial state, the result can range from stale locks to missing objects and broken refs.

The obvious setup puts all of that state in the vault:

```text
iCloud Drive/
└── Obsidian/
    └── MyVault/
        ├── .obsidian/
        ├── notes/
        └── .git/
            ├── objects/
            ├── refs/
            ├── index
            └── logs/
```

Git is behaving correctly. iCloud is behaving correctly. They simply disagree about what those files mean.

## Separate the Working Tree from the Git Directory

A Git repository does not require its database to live in a `.git` directory beside the checked-out files.

Git supports a [gitfile][repository-layout]: a small `.git` text file that points to the real Git directory elsewhere.
The vault remains the **working tree**, while the object database, refs, index, and logs live outside iCloud.
`git init --separate-git-dir` creates this layout using Git's documented mechanism.

The resulting boundary looks like this:

```text
iCloud Drive/
└── Obsidian/
    └── MyVault/
        ├── .obsidian/
        ├── notes/
        ├── attachments/
        └── .git              # A small pointer file

~/Git/
└── obsidian-vault.git/
    ├── objects/
    ├── refs/
    ├── index
    └── logs/
```

Normal vault content still passes through iCloud. Git's internal database does not.

This does not turn iCloud into a Git-aware filesystem, nor does it guarantee that a file cannot change while Git is
reading it. It removes the most consequential shared state from the sync boundary: the repository database itself.
That is the pragmatic trade I wanted, and it has worked reliably for me.

I use one Mac for Git: the iPhone edits and views notes, iCloud delivers them, and the MacBook commits and pushes them.

> **More than one Mac requires more setup.** iCloud syncs the `.git` pointer file along with the vault, but
> `--separate-git-dir` writes an absolute path to a repository that exists only on the local Mac. Every Mac running Git
> therefore needs its own external repository at a path compatible with that shared pointer, and those repositories
> must exchange history through the Git remote rather than iCloud. It is possible, but one Mac keeps the boundary
> trivial.

> **A working tree is not the same thing as `git worktree`.** A working tree is any checked-out directory managed by
> Git. The `git worktree` command creates additional working trees. This setup uses the former concept immediately and
> the latter command in [Inspect Revisions Without Making iCloud Replay Them](#inspect-revisions-without-making-icloud-replay-them).

## Create the Backup Repository

First, keep the vault available offline. Obsidian's [iCloud guidance][obsidian-icloud] recommends **Keep Downloaded** on
current macOS versions. An offloaded file is unavailable to both Obsidian and Git; no repository layout changes that.

For readability, the examples use three shell variables from here on: the vault path, the external Git directory, and
the private GitHub repository. Their values are illustrative; use paths and a repository name appropriate to your
machine and account.

```shell
VAULT="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Obsidian/MyVault"
VAULT_GIT_DIR="$HOME/Git/obsidian-vault.git"
REPO="OWNER/obsidian-vault"
```

### Decide What Belongs in History

Back up the notes, attachments, plugins, and settings you would want to restore. Ignore transient interface state and
operating-system debris.

Put a `.gitignore` like this at the vault root as a useful starting point, not a universal answer:

```gitignore
# Obsidian interface state
.obsidian/workspace.json
.obsidian/workspace-mobile.json
.obsidian/workspaces.json

# Obsidian trash and macOS metadata
.trash/
.DS_Store
```

Obsidian's own [data-storage documentation][obsidian-storage] identifies the workspace files as frequently changing
layout state and suggests ignoring them when managing a vault with Git. Inspect the rest of `.obsidian/` rather than
blindly excluding it; plugin configuration and other settings may be exactly what you want the backup to preserve.

### Initialize the Separated Repository

> **Existing repositories are moved, not replaced.** If Git already recognizes the vault, inspect its history, remotes,
> working tree, and destination first. Reinitializing with `--separate-git-dir` moves the existing Git database to the
> external path while preserving its history and configuration.

```shell
# The destination's parent directory must already exist.
mkdir -p "$(dirname "$VAULT_GIT_DIR")"

git init \
    --initial-branch=main \
    --separate-git-dir="$VAULT_GIT_DIR" \
    "$VAULT"
```

The [`--separate-git-dir` option][git-init] initializes the real repository at `$VAULT_GIT_DIR` and writes a `.git`
pointer file at the vault root.

Review any uncommitted changes before creating the next snapshot:

```shell
git -C "$VAULT" add -A
git -C "$VAULT" status --short
git -C "$VAULT" diff --cached
git -C "$VAULT" commit -m "Initial backup commit of Obsidian vault"
```

If the repository does not already have a remote, create a private GitHub repository and push:

```shell
gh repo create "$REPO" \
    --description "Versioned backup of my Obsidian vault." \
    --disable-wiki \
    --private \
    --source="$VAULT" \
    --push
```

The GitHub CLI follows the gitfile when it inspects `--source`, so the vault behaves like an ordinary local repository
even though its database lives elsewhere.

### Verify the Boundary

```console
$ file "$VAULT/.git"
.../MyVault/.git: ASCII text
# A pointer file, not a directory.

$ git -C "$VAULT" rev-parse --absolute-git-dir
/Users/you/Git/obsidian-vault.git
# The Git directory resolves outside iCloud.

$ git -C "$VAULT" remote -v
origin  git@github.com:OWNER/obsidian-vault.git (fetch)
origin  git@github.com:OWNER/obsidian-vault.git (push)

$ git -C "$VAULT" status --short
# No output: the working tree is clean.
```

### Back Up on Your Own Schedule

I live in the terminal, so I commit when a coherent set of changes is ready. Sometimes I ask an agent to review the
diff and commit it for me.

That policy is deliberately boring. Run it manually, schedule it, wrap it in a script, or have an agent propose a
commit. The repository layout does not impose a backup cadence.

Remember that an iPhone edit enters Git history only after it reaches the MacBook and a commit is pushed. iCloud handles
delivery; the commit and remote push create the versioned, off-device backup.

## Give the Setup to an Agent

Knowing the right terms is usually enough for a capable coding agent to adapt the procedure to an existing machine.
The important part is making it inspect before acting.

```text
Read this article first:
https://bytes-of-our-lives.github.io/blog/posts/icloud-git-obsidian-vault/

Inspect my existing Obsidian vault, Git state, ignore rules, and remotes. Do not
modify anything yet.

I want the vault to remain in iCloud while Git's repository database lives
outside iCloud, using Git's documented gitfile mechanism and
`git init --separate-git-dir`.

Before making changes, report:
- the resolved vault path;
- whether Git already recognizes it;
- the current Git directory, if any;
- which files appear to be device-specific interface state;
- the proposed external Git directory;
- whether a remote already exists; and
- the exact migration or initialization plan.

Wait for my approval. Preserve existing history and vault content. If a GitHub
remote must be created, use `gh repo create --private`. After the approved
change, verify that the vault's `.git` is a file, the resolved Git directory is
outside iCloud, the intended files are committed, and the remote is pushed.

Do not switch branches in the iCloud working tree merely to inspect another
revision. Use a linked worktree outside iCloud instead.
```

The prompt is plan-first because repository discovery is cheap and reconstructing carelessly replaced history is not.

## Inspect Revisions Without Making iCloud Replay Them

Once the vault is versioned, it is tempting to switch its working tree to an old commit or another branch for
inspection. Do not do that casually.

A checkout may replace many files in the live vault. iCloud will reasonably interpret those replacements as new local
changes and begin synchronizing them to connected devices. Switching back rewrites the files again. Git may be doing
exactly what you asked while iCloud creates a great deal of work you did not intend.

Instead, use an ordinary detached worktree outside iCloud:

```shell
# Replace main with any commit, tag, or branch you want to inspect.
git -C "$VAULT" worktree add --detach "$HOME/Git/obsidian-review" main

# The live vault stays untouched; remove the review worktree when finished.
git -C "$VAULT" worktree remove "$HOME/Git/obsidian-review"
```

This is the same separation principle applied one more time: keep operations that can rewrite many checked-out files
away from the directory whose job is to synchronize them.

## A Small Boundary with a Large Payoff

iCloud remains responsible for making current notes available on Apple devices. Git records how those notes change.
The private remote keeps that history off the MacBook. AI agents can work quickly without making their first draft the
only draft.

The setup needs no Obsidian plugin and prescribes no scheduler. Its useful part is the boundary: the vault is synced,
the Git database is not, and each tool remains responsible for the state it actually understands.

[git-faq]: https://git-scm.com/docs/gitfaq#Documentation/gitfaq.txt-HowdoIsyncaworkingtreeacrosssystems
[git-init]: https://git-scm.com/docs/git-init#Documentation/git-init.txt---separate-git-dirltgit-dirgt
[obsidian-icloud]: https://obsidian.md/help/sync-notes#iCloud
[obsidian-storage]: https://obsidian.md/help/data-storage
[repository-layout]: https://git-scm.com/docs/gitrepository-layout
