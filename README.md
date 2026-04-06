# Awesome TollGate

A curated directory of TollGate-related projects and resources, rendered from markdown files.

## Adding a Project

1. Create a markdown file in `public/projects/<slug>.md` with frontmatter:

```yaml
---
name: My Project
description: Short description shown on the card
image: /assets/projects/my-project.png  # optional, shows TollGate logo placeholder if omitted
tags: [tag1, tag2]
links:
  - label: Repository
    url: https://github.com/...
  - label: Documentation
    url: https://docs.example.com
  - label: Website
    url: https://example.com
---

Full markdown body for the detail page...
```

That's it — projects are auto-detected from `*.md` files at build time (no manifest to maintain).

### Notes

- The first 3 links are shown on the overview card; all links appear on the detail page
- If no `image` is provided, a TollGate logo placeholder is shown
- The markdown body supports GitHub-flavored markdown (tables, code blocks, etc.)

## Development

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

Output goes to `build/`, ready for static hosting.

## Deployment

### GitHub Pages

Pushes to `main` auto-deploy via the GitHub Actions workflow.

### Cloudflare Pages

```bash
npm run deploy:preview
npm run deploy:production
```

## Tech Stack

- React 18 + React Router
- Styled Components
- react-markdown + remark-gfm

## License

MIT
