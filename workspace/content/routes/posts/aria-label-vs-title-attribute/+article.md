---
date: "2023-11-03T18:00:00+07:00"
title: "ARIA: aria-label vs. title attribute"
description: What's the difference, and which one should you use?
tags: [accessibility, html]
---

The title attribute and aria-label can both provide accessible labels — screen readers will typically read either. At first glance, they seem interchangeable. But they serve different purposes, and the choice depends on your intent.

The title attribute adds a native browser tooltip on hover. If you want a tooltip and don't plan to build your own, using title is convenient. However, it comes with limitations: it can't be styled, it doesn't always zoom properly, and support across assistive tech can be inconsistent.

aria-label, on the other hand, is purpose-built for accessibility. It's consistently supported by screen readers and preferred when you want to label an element without showing visible text.

**My recommendation**: use `aria-label` for accessibility, and build your own tooltip using CSS based on its value. This gives you full control over styling, positioning, and behavior — something the native title tooltip doesn't offer. Here's a simple example to get you started:

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

This approach ensures both accessibility and a better user experience. For more advanced use cases, you can extend the styling or add JavaScript for richer interactions.
