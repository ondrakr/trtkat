import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import sitemap from 'vite-plugin-sitemap';

const SITE_URL = 'https://www.trtkat.cz';
import { SITEMAP_PATHS } from './sitemap.routes';

function waitlistDevApi() {
  return {
    name: 'waitlist-dev-api',
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use('/api/waitlist', (req, res, next) => {
        if (req.method !== 'POST') {
          next();
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const parsed = JSON.parse(body) as { email?: string };
            const email = typeof parsed.email === 'string' ? parsed.email.trim().toLowerCase() : '';
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'invalid_email' }));
              return;
            }

            console.log('[dev waitlist]', email);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true }));
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'invalid_email' }));
          }
        });
      });

      server.middlewares.use('/api/cookie-consent', (req, res, next) => {
        if (req.method !== 'POST') {
          next();
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const parsed = JSON.parse(body) as { visitorId?: string; analytics?: boolean; marketing?: boolean };
            console.log('[dev cookie-consent]', parsed);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true }));
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'invalid_body' }));
          }
        });
      });
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
  const base = process.env.VITE_BASE ?? (isGithubPages ? '/trtkat/' : '/');
  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      waitlistDevApi(),
      sitemap({
        hostname: SITE_URL,
        outDir: 'dist',
        changefreq: 'weekly',
        priority: 1,
        generateRobotsTxt: false,
        dynamicRoutes: SITEMAP_PATHS.filter((path) => path !== '/'),
      }),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-')) {
              return 'recharts';
            }
            if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run')) {
              return 'router';
            }
            if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
              return 'react-vendor';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
