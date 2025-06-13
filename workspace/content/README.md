# The Atelier's Content

each directory represents a route; the `+article.md` file inside holds the page content.

writing guidelines:

- follow [Aubade's semantics](https://aubade.mauss.dev/docs/semantics)
- comply with the [default](https://github.com/markdownlint/markdownlint/blob/main/docs/RULES.md) and [project](.markdownlint.yaml) `markdownlint` rules
- front matter must include at least a `title` property
- when adding a `date`, use the [simplified ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format) format in double quotes

use this front matter block if you're writing your own post:

```yaml
---
author:
  name: <your_name>
  img: /assets/profile/<filename>
  link: <your_social_link>
---
```
