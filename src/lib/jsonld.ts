import type { CollectionEntry } from 'astro:content';
import { SITE_NAME, SITE_URL } from '../consts';

type PropertyEntry = CollectionEntry<'properties'>;
type OfferEntry = CollectionEntry<'offers'>;

const abs = (path: string) => new URL(path, SITE_URL).toString();

export function organizationLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': abs('/#organization'),
    name: SITE_NAME,
    url: SITE_URL,
    logo: abs('/favicon.svg'),
    sameAs: [
      'https://www.facebook.com/SamadhiRetreatsGroup/',
      'https://www.linkedin.com/company/samadhi-retreats-',
    ],
  };
}

export function websiteLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs('/#website'),
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': abs('/#organization') },
  };
}

export function lodgingBusinessLD(property: PropertyEntry) {
  const { name, tagline, shortDescription, location, heroImage, phone } = property.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': abs(`/stays/${property.slug}#lodging`),
    name,
    description: `${tagline} ${shortDescription}`,
    url: abs(`/stays/${property.slug}`),
    image: heroImage.src,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.country,
    },
    ...(location.lat && location.lng
      ? { geo: { '@type': 'GeoCoordinates', latitude: location.lat, longitude: location.lng } }
      : {}),
  };
}

export function restaurantLD(property: PropertyEntry) {
  const { name, tagline, shortDescription, location, cuisine, heroImage, hours, phone } = property.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': abs(`/dining/${property.slug}#restaurant`),
    name,
    description: `${tagline} ${shortDescription}`,
    url: abs(`/dining/${property.slug}`),
    image: heroImage.src,
    servesCuisine: cuisine,
    telephone: phone,
    openingHours: hours,
    menu: abs(`/dining/${property.slug}/menu`),
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.country,
    },
  };
}

export function offerLD(offer: OfferEntry) {
  const { title, summary, priceFromMYR, validFrom, validTo } = offer.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    '@id': abs(`/offers/${offer.slug}#offer`),
    name: title,
    description: summary,
    url: abs(`/offers/${offer.slug}`),
    ...(priceFromMYR
      ? { price: priceFromMYR, priceCurrency: 'MYR', priceSpecification: { '@type': 'PriceSpecification', minPrice: priceFromMYR, priceCurrency: 'MYR' } }
      : {}),
    validFrom: validFrom.toISOString(),
    validThrough: validTo.toISOString(),
  };
}

export function breadcrumbLD(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.href),
    })),
  };
}
