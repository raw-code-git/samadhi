import { defineCollection, reference, z } from 'astro:content';

const image = z.object({
  src: z.string(),
  alt: z.string(),
  source: z.enum(['picsum', 'unsplash', 'local']).default('picsum'),
  credit: z.string().optional(),
  focal: z.tuple([z.number(), z.number()]).optional(),
});

const properties = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    type: z.enum(['resort', 'dining']),
    cuisine: z.string().optional(),
    tagline: z.string(),
    shortDescription: z.string(),
    location: z.object({
      city: z.string(),
      region: z.string(),
      country: z.string(),
      lat: z.number().optional(),
      lng: z.number().optional(),
      address: z.string().optional(),
    }),
    hours: z.string().optional(),
    phone: z.string().optional(),
    partOf: reference('properties').optional(),
    related: z.array(reference('properties')).default([]),
    heroImage: image,
    cardImage: image,
    ogImage: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    rooms: z
      .array(
        z.object({
          name: z.string(),
          beds: z.string(),
          sizeSqm: z.number().optional(),
          priceFromMYR: z.number().optional(),
          image: image.optional(),
        }),
      )
      .default([]),
    signatureDishes: z
      .array(
        z.object({
          name: z.string(),
          description: z.string(),
          image: image.optional(),
        }),
      )
      .default([]),
    order: z.number().default(100),
    featured: z.boolean().default(false),
  }),
});

const offers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    priceFromMYR: z.number().optional(),
    priceLabel: z.string().optional(),
    validFrom: z.date(),
    validTo: z.date(),
    properties: z.array(reference('properties')),
    terms: z.array(z.string()).default([]),
    inclusions: z.array(z.string()).default([]),
    heroImage: image,
    cardImage: image,
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const menus = defineCollection({
  type: 'content',
  schema: z.object({
    property: reference('properties'),
    currency: z.string().default('MYR'),
    intro: z.string().optional(),
    sections: z.array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        items: z.array(
          z.object({
            name: z.string(),
            description: z.string().optional(),
            price: z.number().optional(),
            dietary: z.array(z.enum(['v', 'vg', 'gf', 'n', 's'])).default([]),
            signature: z.boolean().default(false),
          }),
        ),
      }),
    ),
  }),
});

const gallery = defineCollection({
  type: 'data',
  schema: z.object({
    images: z.array(
      z.object({
        id: z.string(),
        src: z.string(),
        alt: z.string(),
        source: z.enum(['picsum', 'unsplash', 'local']).default('picsum'),
        property: reference('properties'),
        tags: z.array(z.string()).default([]),
        orientation: z.enum(['portrait', 'landscape', 'square']).default('landscape'),
        featured: z.boolean().default(false),
      }),
    ),
  }),
});

export const collections = { properties, offers, menus, gallery };
