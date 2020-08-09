---
title: Complete Regular Expression (RegExp) Cheat Sheet
date:updated: 2020-08-09
---

> Work in Progress

## Flags

Global and multi line modifier is often used in unison because they complement each other so nicely. Learn when should you use global, multi line, both, or none.

### Global

When capturing multiple matches, make sure to enable the global option. `g` modifier allows the expression to continue matching strings rather than returning after the first match.

```javascript
const expression = /match this expression/g;
```

Enabling this flag is useful when you're doing search and replace to cover all the possible matches. Disabling this flag is also useful when you're certain there's only one result or just want the first result if there's a possibility of multiple matches.

### Multi line

When using `^` or `$` to match the start and end of string, make sure to enable the multiline option. `m` modifier enables regex to match end lines `\n` as the start and end of string.

```javascript
const expression = /^match this expression$/m;
```

Unless you're not using `^` or `$`, enabling this modifier will most certainly be handy and solves your problem, if there's any.
