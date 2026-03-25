import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Starlight auto-adds @astrojs/sitemap which crashes on Astro 4.16.x.
// Registering a no-op integration with the same name prevents Starlight
// from adding its own broken copy. Sitemap can be added properly later.
const sitemapShim = { name: '@astrojs/sitemap', hooks: {} };

export default defineConfig({
  site: 'https://docs.hs108.in',
  integrations: [
    sitemapShim,
    starlight({
      title: 'hs108 / Docs',
      description: 'Brand documentation, design tokens, typography, and component reference for hs108 Design Studio.',
      customCss: [
        './src/styles/tokens.css',
        './src/styles/custom.css',
      ],
      components: {
        Header: './src/components/Header.astro',
      },
      social: {},
      sidebar: [
        { label: 'Introduction', link: '/' },
        {
          label: 'Design Tokens',
          items: [
            { label: 'Overview', link: '/tokens/overview' },
            { label: 'Colors', link: '/tokens/colors' },
            { label: 'Spacing & Layout', link: '/tokens/spacing' },
          ],
        },
        {
          label: 'Typography',
          items: [
            { label: 'Overview', link: '/typography/overview' },
            { label: 'Type Scale', link: '/typography/scale' },
            { label: 'Usage', link: '/typography/usage' },
          ],
        },
        {
          label: 'Components',
          items: [
            { label: 'Overview', link: '/components/overview' },
            { label: 'Buttons', link: '/components/buttons' },
            { label: 'Tags', link: '/components/tags' },
            { label: 'Cards', link: '/components/cards' },
          ],
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://docs.hs108.in/og.png' },
        },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        },
      ],
    }),
  ],
});
