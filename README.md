# [Alchemauss](https://mauss.dev)

Personal website, handcrafted with ❤️ using these tools

|              Framework              |                 Library                  |               Parser               |
| :---------------------------------: | :--------------------------------------: | :--------------------------------: |
| [SvelteKit](https://kit.svelte.dev) | [Syv](https://github.com/ignatiusmb/syv) | [Aubade](https://aubade.mauss.dev) |

## Contributing

Contributions are welcome! Here's a quick guide for getting started

```bash
# 1. Fork and clone this repository to your machine
#  ; Because this uses git submodules, we need to add this flag
git clone --recurse-submodules <url>

# 2. Initialize git submodules using the following
#  ; You can skip this step if you cloned with the flag above
git submodule update --init

# 3. Install the dependencies and run the development server
pnpm install

# 4. Run the development server
pnpm dev
```

### Content

Content is managed as a submodule in [alchemauss/content](https://github.com/alchemauss/content), any changes made to the content should be placed there ([open a new PR](https://github.com/alchemauss/content/compare)).

```bash
# Update to the latest version using
git submodule update --remote --merge
```

---

<h3 align="center"><pre><a href="https://mauss.dev">Alchemauss</a> | <a href="LICENSE">MIT License</a></pre></h3>
