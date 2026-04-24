export type ImageSource = 'picsum' | 'unsplash' | 'local';

export type ImageVariant = 'hero' | 'card' | 'gallery' | 'inline' | 'thumb' | 'og';

export const IMG_SIZES: Record<ImageVariant, string> = {
  hero: '100vw',
  card: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  gallery: '(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw',
  inline: '(min-width: 768px) 720px, 100vw',
  thumb: '96px',
  og: '1200px',
};

export const IMG_WIDTHS: Record<ImageVariant, number[]> = {
  hero: [640, 960, 1280, 1600, 1920, 2400],
  card: [320, 480, 640, 800],
  gallery: [320, 480, 640, 800, 1200],
  inline: [480, 720, 960, 1200],
  thumb: [96, 192],
  og: [1200],
};

export const ASPECT: Record<'hero' | 'card' | 'offer' | 'gallery-landscape' | 'gallery-portrait' | 'gallery-square', [number, number]> = {
  hero: [16, 9],
  card: [4, 3],
  offer: [3, 2],
  'gallery-landscape': [3, 2],
  'gallery-portrait': [3, 4],
  'gallery-square': [1, 1],
};

export function buildImageUrl(
  src: string,
  source: ImageSource,
  width: number,
  height?: number,
  quality: number = 75,
): string {
  if (source === 'local') return src;
  if (source === 'picsum') {
    const h = height ?? Math.round(width * 0.66);
    return `https://picsum.photos/seed/${encodeURIComponent(src)}/${width}/${h}`;
  }
  const q = quality;
  return `https://images.unsplash.com/${src}?auto=format&fit=crop&w=${width}&q=${q}`;
}

export function buildSrcset(
  src: string,
  source: ImageSource,
  variant: ImageVariant,
  aspect?: [number, number],
): string {
  const widths = IMG_WIDTHS[variant];
  return widths
    .map((w) => {
      const h = aspect ? Math.round((w * aspect[1]) / aspect[0]) : undefined;
      return `${buildImageUrl(src, source, w, h)} ${w}w`;
    })
    .join(', ');
}

export function buildLQIP(src: string, source: ImageSource): string | undefined {
  if (source === 'local') return undefined;
  if (source === 'picsum') {
    return `https://picsum.photos/seed/${encodeURIComponent(src)}/20/14?blur=2`;
  }
  return `https://images.unsplash.com/${src}?w=20&q=20&blur=20`;
}

export type HeroImageInput = { src: string; source: ImageSource; alt: string };

export function buildHero(input: HeroImageInput) {
  const srcset = buildSrcset(input.src, input.source, 'hero', ASPECT.hero);
  const sizes = IMG_SIZES.hero;
  const fallback = buildImageUrl(input.src, input.source, 1600, 900);
  return {
    srcset,
    sizes,
    fallback,
    preload: { imagesrcset: srcset, imagesizes: sizes },
  };
}

export function fallbackFor(src: string, source: ImageSource, variant: ImageVariant, aspect?: [number, number]) {
  const widths = IMG_WIDTHS[variant];
  const w = widths[Math.min(widths.length - 1, Math.floor(widths.length / 2))];
  const h = aspect ? Math.round((w * aspect[1]) / aspect[0]) : undefined;
  return buildImageUrl(src, source, w, h);
}
