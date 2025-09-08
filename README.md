# Creepy Society

Minimal static comic site built with Next.js App Router, Tailwind CSS and MDX.

## Content model

```
/content/stories/<slug>/
  story.mdx        # panels + text
  archive.json     # citations
  /panels/*        # optional art assets
```

Sample story uses an inline placeholder instead of an image.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the sample story.

## Testing

```bash
npm test          # currently prints a placeholder
npm run lint
npm run build
```

## Deployment

`npm run build` exports the site to the `out/` directory.
Upload this folder to any static host such as Vercel or Cloudflare Pages.
Use `npm start` to preview the static build locally.
