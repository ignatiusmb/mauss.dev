---
date: "2023-11-03T18:00:00+07:00"
title: Accessibility! aria-label vs. title attribute
description: What's the difference and which one should you choose between these two.
tags: [accessibility, html]
---

The title attribute is read by screen readers, but so does aria-label. They seem to serve the same purpose, so what's the difference?

Title allows you to add a native tooltip on hover, so if you're not planning to make you own tooltip but needs or wants your element to have one, then add a title attribute. On the other hand, aria labels are supported by default and are used by screen readers. It's not to say that title isn't read by screen readers, but aria is the preferred choice for accessibility support.

My recommendation is to use `aria-label` and roll your own tooltip based on the contents of the label using CSS attribute selectors and pseudo-elements. It will be better than relying on the `title` tooltip from browsers that cannot be styled or doesn't zoom with the rest of the elements in some cases. For more complex stuff, you may need to implement a custom one based on your needs and specifications.

```css
/* arrow pointing to the element */
[aria-label]::before {
  content: '';
  opacity: 0;
  pointer-events: none;
  position: absolute;

  /* customize this yourself */
  bottom: -0.2rem;
  left: 2.5rem;
  border-right: 0.5rem solid transparent;
  border-bottom: 0.5rem solid rgb(48, 64, 81);
  border-left: 0.5rem solid transparent;
  transition: opacity 0.2s;
}
/* tooltip text container */
[aria-label]::after {
  content: attr(aria-label);
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  position: absolute;

  /* customize this yourself */
  bottom: 0;
  left: 0;
  display: flex;
  padding: 0.25rem 0.375rem;
  border-radius: 0.25rem;
  transition: opacity 0.2s;
  transform: translateY(100%);
  background-color: rgb(48, 64, 81);
  color: white;
}
/* only show the tooltip on hover */
[aria-label]:hover::after,
[aria-label]:hover::before {
  opacity: 1;
  pointer-events: auto;
}
```

***
Reference(s):

- <https://stackoverflow.com/questions/27953425/what-is-the-difference-between-aria-label-and-title-attributes>
- <https://dev.opera.com/articles/ux-accessibility-aria-label/#accessible-name-calculation>
