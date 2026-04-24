# Samadhi Retreats — Redesign (Mock)

A static redesign of the Samadhi Retreats website focused on mobile performance and fast image loading. Built with Astro + Tailwind CSS.

## Status

Scaffold in place. See `/root/.claude/plans/please-first-plan-the-abundant-blanket.md` for the full plan and commit sequence.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # type-check
npm run build      # static output to ./dist
npm run preview    # serve ./dist
```

Requires Node 20+.

## Swap-in points for the client

1. **Booking backend** — `src/components/booking/BookingForm.astro` contains a single `// TODO: integrate real booking backend` marker at the submit handler. Replace the mock with a real API call; everything else is wired.
2. **Real imagery** — all Unsplash URLs are built via `src/lib/images.ts`. Each image in the content collections carries `source: 'unsplash' | 'local'`. To switch a property to locally-hosted assets, drop files into `public/images/<property-slug>/` and change `source` to `local` (and `src` to the local path) in the corresponding content file.
3. **Content** — every page is driven by markdown/JSON in `src/content/`. Edit those files to change copy; no component changes needed.
