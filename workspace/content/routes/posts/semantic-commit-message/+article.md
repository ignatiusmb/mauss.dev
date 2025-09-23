---
date: "2020-10-13T17:38:25+07:00"
theme: guide
title: Semantic Commit Message
description: a practical guide to writing semantic commits
tags: [git, workflow]
---

i try to always open pull requests (PRs) and "squash and merge" it, with the PR title as the commit message. that way, the commit messages in the branch can be anything since it's short-lived, and the PR title will be what ends up in the main branch. which makes this more of a PR title guide, but you get the idea.

```
<type>: <subject>

[optional body]

[optional footer]
```

subject line is **lowercase**, **imperative**, and has **no period**. keep it concise, **ideally 50 characters or less**. if more context is needed, add it in the body (wrapped at 72 characters). the footer is also optional; we can reference an issue or pull request there.

```
feat: add syntax highlighting
├──┘  └──────────┬──────────┘
│                │
│                └── summary in present tense and imperative form
│
└────── type: feat | fix | chore | docs | breaking
```

commit messages are lowercase for consistency and readability. they're labels, not sentences.

these are the rules for the types of commits i use, ordered by priority:

```bash
feat -> user-facing feature. new functionality or enhancement
fix -> user-facing bug fix. existing functionality change
docs -> documentation updates. no user-facing code change
chore -> internal changes. build, ci, or any non-user-facing change

# optional, usually for semver-based projects
breaking -> breaks backward compatibility for existing users or dependents
```

i keep mine minimal, which makes the history easier to scan and spot changes at a glance. the limited scope helps weigh changes when bisecting for bugs, making it easier to decide whether it might've introduced a bug or not.

ultimately, commit types are a team agreement. as long as you're consistent with the team, it should be fine.
