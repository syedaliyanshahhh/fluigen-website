// @ts-check
import { writeFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import { siteUrl } from './src/site.config.ts';
import { indexable, unlistedPaths } from './src/lib/indexing.ts';

// Cloudflare Pages response headers (dist/_headers). Hashed build assets are
// cached for a year; on any build that isn't indexable, every response also
// carries X-Robots-Tag: noindex, so even non-HTML files stay out of search.
function cloudflareHeaders() {
  return {
    name: 'cloudflare-headers',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const rules = [
          ...(indexable ? [] : ['/*', '  X-Robots-Tag: noindex']),
          '/_astro/*',
          '  Cache-Control: public, max-age=31536000, immutable',
          '/fonts/*',
          '  Cache-Control: public, max-age=2592000',
        ];
        await writeFile(new URL('_headers', dir), rules.join('\n') + '\n');
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
  // /about is served as about.html, so links and canonical URLs have no
  // trailing slash and Cloudflare never has to redirect /about to /about/.
  build: { format: 'file' },
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !unlistedPaths.includes(new URL(page).pathname),
    }),
    cloudflareHeaders(),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
