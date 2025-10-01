---
date: 2025-07-16
theme: guide
title: Crafting a Minimal SVG-to-Favicon Generator
description: a technical dive into the process of building a self-contained favicon generator
tags: [devlog, javascript, typescript, svelte]
---

lately, ideas have been pouring in faster than i can manage, and i feel the urge to chase and iterate on all of them. i know it's unrealistic to think i have the time or energy for everything, but i try anyway. *\*cue the pile of unfinished side projects watching me start another one\**

naming things is still as hard as ever. and now that i'm delved into a bit of *graphic design*, making a logo (favicon) feels like the "naming things" equivalent of a software project. it's a hard thing that you need to do right — hopefully only once.

## how to favicon

a favicon has to be simple, recognizable, and convey the essence of the project in a small size, literally. it needs be eligible and visually discernible with the smallest size being `32x32` (or `16x16`) in the miniscule browser tab, and it has to look good in larger sizes as well. it is a separate rabbit hole that i've already fallen into and spent far too much time in, but let's set that aside for now and assume we have the SVG logo we want to use as our favicon, what now?

the first thing that comes up when i tried to learn *the way* to do favicons is [How to Favicon](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs) by Evil Martians. it's an amazing and comprehensive post that's been updated since it was first published in 2021, nice!

the *only* problem i experienced after going through all the steps and generating the set of files is that *i wasn't happy with the logo*. it's more of a *me-problem*, i know. i tend to ruminate too much on the things i do and want, and i end up needing to redo the whole process again, multiple times.

obviously, this wouldn't be a problem if i was satisfied with the logo i had, but i'm also learning to make my own logo as i go along, and i keep ~~changing my mind~~ iterating on the design. i can't possibly do the whole song and dance with [GIMP](https://www.gimp.org/) (great software, btw) every time i updated the SVG, it's tedious!

and then, i remembered that i'm a software developer, and i can spend (definitely more than 8) hours to *automate* the repetitive process instead of the (barely) 5 minutes it takes to do manually. hey, it's a long-term investment, right? *\*copium\**

## breaking it down

a good first step when encountering a problem is to break it down into smaller, manageable parts. in the case of setting up the favicon of a website, once the `<link>` tags and `.webmanifest` file are set up, the only repeatable tasks when the icon changes is the icon files itself.

once that's done, i need to figure out what i'm working with and what the end result should be. in this case, i wanted the *original* logo to be in SVG format because ~~i like coding my logo~~ it's scalable and will look good in any size. the output should be a set of favicon files i've already defined, which are:

- `favicon.ico`
- `apple-touch-icon.png`
- `favicon-x192.png`
- `favicon-x512.png`
- `maskable.png`

## building the thing

before i can start writing any code, i need the scaffolding first. for standalone projects, i usually unzip [ignatiusmb/starter](/atelier#ignatiusmb-starter). however, i imagine this as an extension of Alkamauss, so i decided to make it a part of [the digital garden monorepo](https://github.com/ignatiusmb/mauss.dev), which means it's as easy as creating a new directory in the workspace and adding a (also *minimal*) `package.json` file and the necessary framework files. hooray for monorepos.

### bind for you

Svelte usually have a declarative way of doing things, i like not having to deal with many mutable variables, fewer things to name and manage, y'know? however, working with `<input type="file">` is always a bit tricky, and this time is no exception.

i ended up using [`bind:files`](https://svelte.dev/docs/svelte/bind#input-bind:files) to manage the file input. yep, that's the special `bind:` directive just for file inputs. once the file is uploaded, `files` will immediately be a `FileList` object with the uploaded file(s), which is just one in this case.

### rasterization

after having access to the uploaded SVG file from `bind:files`, the next step is to rasterize it into PNG files. by leveraging the [`canvas`](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) API, i can draw the SVG onto a canvas and then export it as a PNG file. this is done by creating a `Blob` from the SVG string, then creating an `Image` object from the `Blob` URL, and finally drawing it onto the canvas.

```typescript
async function png(raw: string, image: number, size: number): Promise<Blob> {
  const svg = new Blob([raw], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(svg);

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);
  const offset = (size - image) / 2;

  return await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, offset, offset, image, image);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => resolve(blob!), 'image/png');
    };
    img.onerror = () => resolve(new Blob());
    img.src = url;
  });
}
```

the bulk of the work is done by the detached `canvas` element and calling `canvas.toBlob()`. with this function, i've *technically* completed 80% of the work, which covers generating 4 out of the 5 image files needed. of course, the first 80% only takes 20% of the time, and the remaining 20% takes 80% of the time (*subtle foreshadowing*). **Pareto principle** at its finest, right?

### ICOnize

all that's left is to generate the `favicon.ico` file. but, what is an `.ico` file anyway? can't i just change the extension from `.png` to `.ico`? haha, if only it was that easy. file extensions are just a convention, which is different from the actual file format.

i remember back in the day, Wikipedia wasn't considered a reliable source and i had to find "proper" articles to cite. today, i can confidently read the [ICO file format](https://en.wikipedia.org/wiki/ICO_(file_format)) and learn that it's basically a container for multiple images, which can contain both PNG and BMP images, and is most commonly associated with Windows icons because.. well, it was developed by Microsoft.

using the `.ico` file created with GIMP as the control, it converts the image to BMP and wraps it in the ICO container. while we *usually* want a BMP image in the container for Windows icons, almost all browsers support PNG in ICO these days. PNG also takes up less space, i can reuse the `png()` function, and quality won't matter that much when the image is crammed into a `32x32` box. the only downside is that the resulting ICO will not have a preview image in Windows Explorer, but when will i ever work with `.ico` files again outside of favicons? `¯\_(ツ)_/¯`

doing low-level binary encoding is not something i usually do, but i survived uni and reading the Wiki article is easier than trying to decipher the lecturer's notes and slides. utilizing the fact that i'm only embedding **one PNG image**, i can hardcode the `ICONDIR` and most of the `ICONDIRENTRY` structures.

```typescript
async function ico(raw: string, size: number): Promise<Blob> {
  const blob = await png(raw, size, size);
  const offset = 6 + 16 * 1; // header + one entry

  const buffer = new Uint8Array(await blob.arrayBuffer());
  const header = new Uint8Array([0x00, 0x00, 0x01, 0x00, 0x01, 0x00]);
  const entry = new Uint8Array([
    size,
    size,
    0x00,
    0x00,
    0x01,
    0x00,
    0x20,
    0x00,
    // image size
    (size >> (8 * 0)) & 0xff,
    (size >> (8 * 1)) & 0xff,
    (size >> (8 * 2)) & 0xff,
    (size >> (8 * 3)) & 0xff,
    // offset
    (offset >> (8 * 0)) & 0xff,
    (offset >> (8 * 1)) & 0xff,
    (offset >> (8 * 2)) & 0xff,
    (offset >> (8 * 3)) & 0xff,
  ]);

  const bytes = new Uint8Array(header.length + entry.length + buffer.length);
  bytes.set(header, 0);
  bytes.set(entry, header.length);
  bytes.set(buffer, header.length + entry.length);
  return new Blob([bytes], { type: 'image/x-icon' });
}
```

it's essentially a wrapper around the `png()` function, double-checking the `.ico` file in a hex editor like [HexEd.it](https://hexed.it/) shows that it has the correct header and the image data is in the right place. all set, on to the next one!

### serving the blobs

notice that both `png()` and `ico()` function returns a (promised) `Blob`, which is a binary representation of the image data. this makes it convenient to generate the download links from the generated files, all it needs is an `<a>` tag with a `href` pointing to the `Blob` URL and a `download` attribute. this is how the download links are generated:

```svelte
{#each [/* the generated file objects */] as { name, blob }}
  <a href={URL.createObjectURL(blob)} download={name}>{name}</a>
{/each}
```

the `{#each}` block is just Svelte's syntax for iterating over an array. what matters is that the `href` is set to the string returned by `URL.createObjectURL(blob)`, which creates a temporary URL that points to the `Blob` data, and the `download` attribute is set to the desired filename which also allows the user to download the file when they click the link.

### that's it.. right?

*technically*, it's done. the project is feature-complete, it's usable, and it meets all the MVP checkboxes i set for myself at the beginning. i should be done, i should've stopped here and moved on. but *i didn't*. `ಠ_ಠ`

### ZIP-em-up

all the files are generated and can be downloaded individually, but it'll be (another) hassle to click and download them each of them one-by-one. it would be much better if they were zipped up nicely in a single download, but not a button that downloads all of them and spills the files all over the Downloads directory.

now, any sane person would've used a library and be done with it. but, as you can probably guess by now, i seem to enjoy pain a bit much by doing things the hard way. so, i implemented my own ZIP archiver, without compression! i don't hate myself that much, please.

after another few hours down the rabbit hole and reading the [ZIP file format](https://en.wikipedia.org/wiki/ZIP_(file_format)) specs, i managed to cram the bulk of it in about 100 lines of code inside the `zip()` function, excluding the couple of helper functions. it's more or less the same with the ICO encoding, but with a few more metadata to deal with.

### self-contained

as a bonus convenience, i decided to try out the [`bundleStrategy: 'inline'`](https://svelte.dev/docs/kit/configuration#output) option from SvelteKit to make the whole app self-contained in a single HTML file. for a generator app that relies on JavaScript, it wouldn't make sense to do progressive enhancement as none of the features would work without JavaScript. i need the app to essentially be a [single-page app](https://svelte.dev/docs/kit/single-page-apps) (SPA).

with the new `bundleStrategy` option, SvelteKit also has a *new* way of creating SPAs, which is to set the `router.type` to `'hash'` in the `svelte.config.js` file. it disables SSR and prerendering, fully relying on client-side rendering (CSR). we're also inlining everything, which will generate a fully self-contained HTML file that can be opened in any browser, directly with the `file:` protocol without needing a server.

the final HTML file is about `132 KB` in size, including the fonts. what surprises me was that using non-variable fonts resulted in a larger file size.

## it's live!

the app is live at [favicon.mauss.dev](https://favicon.mauss.dev) and you can try it out right now. feel free to download and take it with you wherever you go, it is self-contained in a single HTML file after all. no tracking and definitely no ads, *pinky promise*. the source code is linked below at the end of my [reflections](#reflections).

i initially wrote "SVG only" in the input label, but it does seem to work with other image formats as well. though, i'm 99% certain that the results won't be as crisp as an SVG file. some extra features i didn't mention in the previous section are mostly UX stuff, like drag-and drop support and checkboxes to toggle the sizes to generate.

## reflections

i didn't expect to learn as much as i did with this project, especially from what i thought and consider a *simple* one. it was intimidating when i saw the specs, it looked complicated and i only had a vague idea of where to start. but, i made it through and here i am writing this post. we really can do anything we set our minds to, take one step at a time, as long as we're moving forward, we'll get there eventually.

this is just a personal quirk — i like setting arbitrary constraints for myself. for example, only using the platform APIs and not relying on any third-party libraries. it made me think outside the box and force myself to come up with solutions that i wouldn't have learned otherwise. oh, please do not take this as a recommendation, i would've used a library if i didn't have the luxury of time and the desire to learn. there are many times i was pressed for time and just needed to get things done, and i would've used a library in those cases.

i hope you enjoyed reading this post as much as i did writing it. visit the app or download it! also check out [the source code on GitHub](https://github.com/ignatiusmb/mauss.dev/tree/master/workspace/favicon) if you're interested, which includes the source code for this site as well. [i'm available anywhere here](/about#elsewhere), hope to see you around.
