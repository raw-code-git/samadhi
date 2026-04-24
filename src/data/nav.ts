export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Stays', href: '/stays', description: 'Boutique resorts' },
  { label: 'Dining', href: '/dining', description: 'Restaurants & bars' },
  { label: 'Offers', href: '/offers', description: 'Seasonal packages' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_SECTIONS = [
  {
    title: 'Stays',
    links: [
      { label: 'Villa Samadhi — Kuala Lumpur', href: '/stays/villa-samadhi' },
      { label: 'Japamala — Tioman Island', href: '/stays/japamala' },
    ],
  },
  {
    title: 'Dining',
    links: [
      { label: 'Tamarind Hill', href: '/dining/tamarind-hill' },
      { label: 'Tamarind Springs', href: '/dining/tamarind-springs' },
      { label: 'FOOK', href: '/dining/fook' },
      { label: 'Than', href: '/dining/than' },
      { label: 'Barra', href: '/dining/barra' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Offers', href: '/offers' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];
