# Creepy Society

Minimal comic site built with Next.js App Router, Tailwind CSS and MDX.

## Content model

```
/content/stories/<slug>/
  story.mdx        # panels + text
  archive.json     # citations
  cover.jpg        # thumbnail shown on homepage
```

Panel images live in `public/stories/<slug>` and are served with the Next.js `<Image>` component.

Each story should include a `cover.jpg` thumbnail in its folder. The `copy-content` script copies it to `public/stories/<slug>/cover.jpg` so the homepage carousel can load it. A resolution around 800px wide works well; the build will automatically create smaller sizes as needed.

Scarecrow story demonstrates using the Next.js `<Image>` component and a panel image stored in `public/stories/scarecrow/scarecrow.jpg`.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the scarecrow story.

## Testing

```bash
npm test          # currently prints a placeholder
npm run lint
npm run build
```

## Deployment

### Vercel

1. [Install the Vercel CLI](https://vercel.com/docs/cli) or connect this repo in the Vercel dashboard.
2. Set the build command to `npm run build`.
3. Deploy with `vercel` or push to the connected Git repository.

Story assets in `/content` are copied into the `public/` directory during `npm run build`, allowing the `<Image>` component to serve them with Vercel's image optimization.

### Previewing locally

```bash
npm run build
npm start
```
