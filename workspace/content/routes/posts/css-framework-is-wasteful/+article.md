---
date: "2021-02-26T17:38:25+07:00"
title: CSS Framework Is Wasteful
description: Do you really need a CSS framework? Here's why I think I don't
tags: [coding, css, framework]
---

I'm not here to argue or shame anyone, this is just my thoughts and what I see from my experiences. If there's anything you think is missing or feel should be here, please understand that it was specifically done to spite you personally<sub>/s</sub>

There's a lot of definitions on what is actually *wasteful* means, here's what Google says on their translator

> wasteful. **adj**. (of a person, action, or process) using or expending something of value carelessly, extravagantly, or to no purpose

Personally, *redundant* fits closer to what I actually feel, I'll explain this on the next section. But, wasteful still holds true in some aspects of it. Before I continue, I'm going to state the next sentences as a disclaimer. I am, by no means, saying that the teams or individuals working on these projects are "bad" per se, in fact it's amazing that they're able to build such software used by people around the world. Then again, just like anything in the world, it's not meant as a one-size-fits-all type, and **it's definitely not my type**.

## The Good?

Let's start of by discussing the good, advantages that you and/or your team would get by using a CSS framework. A definite answer is of course a smoother experience in the developer experience (DX) as there's no need for someone to maintain and make sure the styles and class names stays consistent between each person working on the project. Not to mention, you can even work on different projects with absolutely no correlation whatsoever, and would still understand and could replicate or write the same style rules because your organization uses one CSS framework.

## The Other

There's probably a lot more advantages that you think should be mentioned here, but really, I can't think of any other reason to use a framework other than that, with the exception of organization with legacy projects that is already using one. Other than that, I could never imagine using one, especially if it's a new (modern) project.

Yes, I've tried using them, I wouldn't say "not my type" if I haven't tried it once, it wouldn't be fair.

Let's review a bit, what is HTML and CSS? What is the relationship between the two and how do they play with each other. I'm sure you've heard that **HTML is not for styling** somewhere, if you haven't, now you have. It's one of the basic things about web development. Take a look at this HTML snippet

```html
<div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
  <div class="relative py-3 sm:max-w-xl sm:mx-auto">
    <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
      <div class="max-w-md mx-auto">
        <div>
          <img src="/img/logo.svg" class="h-7 sm:h-8" />
        </div>
        <div class="divide-y divide-gray-200">
          <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <p>An advanced online playground</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

Exactly, my first thoughts was, "aren't you just rewriting CSS as HTML classes?" You're even learning how to use those classes, why not just learn plain CSS and write them directly. This is just not right, HTML5 already gives us a lot of semantic tags which we can use and directly select in CSS without needing to add classes to differentiate between tags. This will reduce the footprint of both HTML and CSS output, resulting in smaller bundles and lightweight apps.

To keep things simple, this is the biggest reason why it's not my type. It promotes ugly HTML markups, and I don't like my HTML cluttered with a lot of unnecessary stuff. CSS can already do **A LOT** of stuff, and I mean a lot. If you learn and understand their advance selectors, they can be your most powerful tools on the Front-End, even with "dirty" inefficient HTML tags. Imagine what you can do with the correct HTML tags and advanced CSS (hint: you can write [The Holy Grail Layout](https://css-tricks.com/the-holy-grail-layout-with-css-grid/) in a couple of lines).

Hence, why I think it's *redundant* for me. Seriously, go take a look at my projects in GitHub (this site for example), especially since I'm already using Svelte which scopes CSS to just its component. There's no denying that there will be some duplicate lines between components, but if it means that every component is self-contained with maintainable code and predictable result (pure component in terms of styling), then I'll gladly pay that small price of duplicating some declaration lines.

There's a lot of other things I could mention, but the point is made. I recommend you read the DEV post on my reference below if you're still not sure whether to use any or none. If you do and are enjoying yourself, then good for you.

***
Reference(s):

- <https://dev.to/jaredcwhite/why-tailwind-isn-t-for-me-5c90>
