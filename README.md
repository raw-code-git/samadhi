# Samadhi Retreats — Redesign (Mock)

A static redesign of the Samadhi Retreats website, addressing the two
things the current site does poorly: **mobile ergonomics** and **image
load time**. Built with Astro + Tailwind CSS, deploys to any static host.

## Run

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in ./dist
npm run preview    # serve ./dist
npm run check      # type-check
```

Requires Node 20+.

## What's in the box

**24 routes**: home, stays (index + 2 detail), dining (index + 5 detail + 5 menus), offers (index + 3 detail), gallery, about, contact, book, 404. All cross-linked through the content graph — no manually-maintained link tables.

**Content model (all in `src/content/`):**

- `properties/*.md` — seven properties (Villa Samadhi, Japamala, Tamarind Hill, Tamarind Springs, FOOK, Than, Barra). `type: 'resort' | 'dining'`. Restaurants carry a `partOf:` reference to their parent resort.
- `offers/*.md` — three seasonal packages, each with a list of properties it applies to.
- `menus/*.md` — five restaurant menus, sections × items, each item with price + dietary flags + signature flag.
- `gallery/images.json` — a single tagged gallery, each image references a property.

Zod schemas in `src/content/config.ts` enforce alt text on every image, required references, and a consistent shape across collections.

**Design system:** brand palette (sand/cream/terracotta/clay/olive/forest/gold/ink) and type scale (Cormorant display serif + Inter Variable sans) in `tailwind.config.mjs`. CSS custom properties mirror the tokens in `src/styles/globals.css`. Shared primitives: `Button`, `Chip`, `Divider`, `Prose`, `Container`, `Section`.

**Image pipeline** (`src/lib/images.ts` + `src/components/media/`):

- Variant-aware sizes/widths presets (hero/card/gallery/inline/thumb).
- `SmartImage` renders a `srcset` with explicit width/height and an aspect-locked wrapper → **zero CLS**.
- Gallery and card images are `loading="lazy"`, `decoding="async"`, with an earthy gradient placeholder that fades to the image on load.
- `Hero` is `loading="eager"`, `fetchpriority="high"`, and `BaseLayout` injects a matching `<link rel="preload" as="image">` so the LCP image starts downloading in the head.

**Mobile-first:** sticky header with transparent-over-hero variant, off-canvas drawer with focus management (Esc/outside click), sticky booking CTA on property and offer pages (hides on scroll-down), safe-area insets respected, all touch targets ≥ 44 px.

**SEO:** per-page `<SEO>` with title template, OG + Twitter, canonical. Full JSON-LD graph via `src/lib/jsonld.ts`:
- Home → `Organization` + `WebSite`
- Stay detail → `LodgingBusiness`
- Dining detail → `Restaurant` with `menu` URL
- Menu page → `Menu` with `hasMenuSection` / `hasMenuItem`
- Offer detail → `Offer`
- All detail pages → `BreadcrumbList`

Sitemap is auto-generated (excludes `/book` and `/404`); `robots.txt` allows everything else.

## Swap-in points for the client

### 1. Real booking backend

One file, one TODO:

- **File:** `src/components/booking/BookingForm.astro`
- **Marker:** `// TODO: integrate real booking backend` at the form's `submit` handler
- **What's already done:** 3-step form (dates + guests / contact / review), localStorage draft, URL prefill (`?propertyId=`, `?offerId=`, `?checkIn=`, `?checkOut=`, `?guests=`), validation, and a confirmation screen. Replace the `localStorage.removeItem(...)` block with a `fetch()` to the reservations API and render the server's confirmation response.
- **Contact form:** `src/pages/contact.astro` has the same pattern — one `// TODO: integrate real contact endpoint`.

### 2. Real imagery

All remote image URLs are built through **`src/lib/images.ts`**. Every image in the content collections carries a `source` flag:

```
source: 'picsum' | 'unsplash' | 'local'
```

- **Current state:** every image uses `source: 'picsum'` with a readable seed (e.g. `villa-samadhi-hero`). Picsum deterministically returns a real photo per seed — zero broken images during the demo.
- **Swap to Unsplash / CDN:** change `source: 'unsplash'` and put the Unsplash photo ID in `src:`. `buildImageUrl` will format the Unsplash URL with `auto=format&fit=crop&w=…&q=…`.
- **Swap to local assets:** drop files into `public/images/<property-slug>/` and set `source: 'local'` with `src: '/images/<property-slug>/hero.jpg'`. For local files, you can also swap `SmartImage` over to Astro's `<Image />` component (in `src/components/media/SmartImage.astro`) to get per-build AVIF/WebP optimization.

### 3. Content

Every page is data-driven. To edit copy or add a property:

- Edit the relevant markdown file under `src/content/properties/` / `offers/` / `menus/`.
- Add a new property: create a new `.md` file with the frontmatter fields from the zod schema (`src/content/config.ts`). The filename becomes the slug (so the URL).
- New offers and menus pick up automatically — no code changes.
- Gallery images: edit `src/content/gallery/images.json`. Each entry references a property by slug; the filter chips on `/gallery` update automatically from the properties collection.

### 4. Domain + deploy

Before deploying, update `site` in `astro.config.mjs` (currently `https://samadhi-mock.example`) and the same URL in `public/robots.txt`. JSON-LD `@id`s and canonical URLs are derived from `SITE_URL` in `src/consts.ts`.

## Performance notes

- **LCP** is the hero image; preloaded with the exact WebP `imagesrcset` the browser will pick (no AVIF/WebP double-preload).
- **CLS** is zero — every image sits inside an `aspect-[x/y]` wrapper with explicit `width`/`height`.
- **JS** is per-island only. Gallery's lightbox and the mobile drawer are small scripts that only load on the pages that use them.
- **Fonts** import only the Latin subsets (Cormorant 400/500/600 + Inter Variable weight axis). Cyrillic, Greek, Vietnamese subsets are not shipped.

## Planning document

The design decisions and commit sequence are documented in `/root/.claude/plans/please-first-plan-the-abundant-blanket.md`.
