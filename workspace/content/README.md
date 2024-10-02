# Workspace for Alchemauss content

Home to the articles that make up the content of [website](../website)

## Writing

Consider each directory as its own route, and the `+article.md` file as the contents of the page. There's a couple of rules to follow when writing a post:

- Follow [the semantics of Aubade](https://aubade.mauss.dev/docs/semantics)
- Follow the [default](https://github.com/markdownlint/markdownlint/blob/main/docs/RULES.md) and [specified](.markdownlint.yaml) `markdownlint` rules
- Have a front matter with at least a `title` property
- When specifying a `date` property, use the [simplified ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format) format wrapped in double quotes

Use your own metadata by adding this template to the front matter when you're writing your own post.

```yaml
---
author:
  name: Kimi no Na wa
  img: /assets/profile/USERNAME.(jpg|png)
  link: https://social.media/USERNAME
---
```

- `name:` is the name of the author
- `img:` is the path to the author's avatar image in the [`assets/profile`](../website/static/assets/profile) directory
- `link:` is the link to the author's profile or any other social link

***

<h3 align="center"><pre>Alchemauss Content</pre></h3>
