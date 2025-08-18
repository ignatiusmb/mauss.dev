---
date: 2025-08-14
title: The Essence of Svelte
series:
  title: the-essence
  type: collection
description: a sleek language
---

<section data-info="note">

work in progress. expect changes, edits, and occasional rewrite.

</section>

[Svelte](https://svelte.dev/) is [a language](https://gist.github.com/Rich-Harris/0f910048478c2a6505d1c32185b61934) for building user interfaces based on HTML, CSS, and JavaScript. its syntax extends and leverages the platform's native features, letting developers write less and achieve more. components defined in `*.svelte` files are compiled into supercharged HTML with scoped CSS and highly optimized JavaScript.

[SvelteKit](https://svelte.dev/docs/kit/introduction) is the meta-framework that provides a filesystem-based router, server-side rendering, and a [range of features](https://svelte.dev/docs/kit/introduction#SvelteKit-vs-Svelte) for building full-stack applications with Svelte. it is the recommended way to build a Svelte application — you *can* build without it, but there's rarely a reason to unless you have a highly specific use case.

## the building blocks

components are the building blocks of Svelte applications, written into [`.svelte` files](https://svelte.dev/docs/svelte/svelte-files). you can have a single top-level `<script>`, a single top-level `<style>` tag, and any arbitrary amount of HTML markup. the conventional order is `<script>` for logic, then the markup, and finally `<style>` for styling. this order minimizes the cognitive load when reading the code and the hoops you have to jump through to understand the component. formatting is usually delegated to Prettier via [`prettier-plugin-svelte`](https://github.com/sveltejs/prettier-plugin-svelte).

### script

the top-level `<script>` tag is where you can write any JavaScript code that powers the component, e.g. import other modules and define reactive states using [runes](#runes).

of course, i don't think i need to mention this, but you need to know JavaScript to write the logic inside the `<script>` tag of a Svelte component.

### style

the top-level `<style>` tag is where you can write any CSS code that styles the markup in the component, without having to worry about clobbering global styles or conflicting with other components.

> [Love it or loathe it, you must at least *learn* it](https://svelte.dev/blog/the-zen-of-just-writing-css)

Svelte automatically scopes styles to the component, so you can write pure CSS without inventing unique class names or following BEM conventions.

```svelte
<h1>The Essence of Svelte</h1>

<style>
  h1 {
    color: oklch(0.7767 0.1098 168.82);
  }
</style>
```

### markup

any valid HTML is a valid markup. Svelte augments the markup using curly braces `{}` syntax to interpolate JavaScript *expressions*. an expression is any valid JavaScript code that evaluates to a value, such as a variable, a function call, or an arithmetic operation.

when you see curly braces `{}` in the markup of a Svelte component, you're in Svelte's logic land. these curly braces can start with a hash `#` to denote the start of an `if/each/key/await/snippet` block, or an at `@` symbol to use various tags such as `@html`, `@render`, or `@const`. a Svelte block handles control flow and reactivity in the markup. it starts with a hash `#`, ends with a slash `/`, and optionally additional conditions with a colon `:`.

### runes

Svelte's reactivity is based on the concept of [runes](https://svelte.dev/docs/svelte/what-are-runes). a rune is a *keyword* — like the dynamic `import()` — which is prefixed by a dollar sign `$` and look like function calls. they are part of the language and acts as compiler directives to tell Svelte how to handle the code. as such, you can use them in `.svelte` and even `.svelte.js` / `.svelte.ts` files.

to create a reactive variable, declare it as `let count = $state(0)`. to derive a value from a reactive variable, declare it as `let doubled = $derived(count * 2)`. any changes to `count` will automatically be reflected in the markup, and `doubled` will always be updated accordingly.

## idiomatic syntax

Svelte has a few idiomatic syntaxes that you should know to write Svelte code effectively. these syntaxes are not just for aesthetics, but also for performance and readability.

### string interpolation

when possible, always prefer Svelte's string interpolation over JavaScript's template literals. Svelte's interpolation is evaluated and compiled into direct string concatenation or DOM operations at build time, which avoids the runtime overhead of template literal parsing. it also keeps the markup visually closer to the final HTML, making it easier to scan and understand.

```svelte
<!-- do this -->
<a href="/posts/{post.slug}">{post.title}</a>

<!-- instead of this -->
<a href={`/posts/${post.slug}`}>{post.title}</a>
```

## behind the scenes

> should it really be *that* complicated?

that was my first reaction when i first came across React. in the chaotic mess of the web ecosystem, Svelte stands out and truly feels like a breath of fresh air. i'll leave you with a talk and the quote that changed my whole perspective at the time, which is also [the turning point for Svelte](https://svelte.dev/blog/svelte-3-rethinking-reactivity) as a language.

![!YouTube](AdNJ3fydeao "Rich Harris - Rethinking reactivity")

> Frameworks are not tools for organizing your code, they are tools for organizing your mind
