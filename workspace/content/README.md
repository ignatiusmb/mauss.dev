# the atelier's content

this workspace holds the markdown sources for [mauss.dev](https://mauss.dev). each directory maps to a route on the site, with a `+article.md` file containing the page content.

## writing guidelines

the content follows [Aubade's structure](https://aubade.mauss.dev/docs/overview#structure) and is linted using the [project rules](./.markdownlint.yaml). front matter must include both `date` and `title` properties. the date should be a [simplified ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format) string wrapped in quotes.

```yaml
date: '2025-08-26T18:00:00+07:00'
title: <title_here>
```
