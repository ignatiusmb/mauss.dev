---
date: 2025-08-14
title: The Essence of Semantic Versioning
series:
  title: the-essence
  type: collection
description: a contract in numbers
---

Semantic Versioning (SemVer) is a versioning scheme used in software development to communicate the scope of changes between releases. the official specification lives at [semver.org](https://semver.org/).

## what and why

SemVer uses `MAJOR`, `MINOR`, and `PATCH` which starts from `0` and increments depending on the *type* of change. i say "software" here, but it can really be used for anything that changes over time, including physical products, documents, or even ideas.

it is written as `MAJOR.MINOR.PATCH`. let's take `1.2.4` for our example. the version number is incremented based on the following rules:

- `MAJOR` is incremented if the new release breaks how the software was used previously, and `MINOR` and `PATCH` are reset to `0`. for example, `1.2.4 -> 2.0.0`.
- `MINOR` is incremented if the new release adds something new while keeping the previous behavior intact, and `PATCH` is reset to `0`. for example, `1.2.4 -> 1.3.0`.
- `PATCH` is incremented if the new release fixes a bug or changes something without affecting how the software is used. for example, `1.2.4 -> 1.2.5`.

for most stable software, the version starts at `1.0.0` and `MAJOR.MINOR.PATCH` works beautifully. however, for software in early development, it's best to start at `0.1.0` (or `0.0.1` for rapid prototyping). in the case of a `MAJOR` version zero, the "MAJOR" is shifted to the first non-zero digit, and the rules are slightly different:

- `MAJOR` is incremented when it's considered stable and less likely to change in a breaking way.
- `MINOR` becomes the new "MAJOR" version; breaking changes will increment this version.
- `PATCH` is incremented for both bug fixes and new features without breaking changes.

## as the user

presuming the package follows SemVer faithfully, then you will only need to double-check the changelog or release notes to make sure you account for the breaking changes in the new `MAJOR` version.

## as the author

use SemVer to set expectations for your users. only change the `MAJOR` when you must break compatibility; otherwise, prefer `MINOR` and `PATCH` updates to keep upgrades smooth.
