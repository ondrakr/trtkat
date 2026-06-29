import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { Analytics } from './components/Analytics';
import { CookieConsent } from './components/CookieConsent';
import { LEGAL_PAGES, LEGACY_LEGAL_REDIRECTS } from './legal/registry';

const LandingPage = lazy(() => import('./pages/LandingPage').then((m) => ({ default: m.LandingPage })));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage').then((m) => ({ default: m.BlogIndexPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })));
const LegalDocumentPage = lazy(() =>
  import('./components/LegalDocumentPage').then((m) => ({ default: m.LegalDocumentPage })),
);
const LegalRoutePage = lazy(() => import('./pages/LegalRoutePage').then((m) => ({ default: m.LegalRoutePage })));
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage').then((m) => ({ default: m.ComingSoonPage })));
const AdminRoutes = lazy(() => import('./admin/AdminRoutes').then((m) => ({ default: m.AdminRoutes })));

function PageFallback() {
  return <div className="app-shell min-h-[50vh]" aria-hidden="true" />;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Analytics />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route element={<SiteLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            {LEGAL_PAGES.map((page) => (
              <Route
                path={`/${page.slug}`}
                element={<LegalDocumentPage slug={page.slug} locale="cs" />}
              />
            ))}
            <Route path="/en/:slug" element={<LegalRoutePage locale="en" />} />
            {Object.entries(LEGACY_LEGAL_REDIRECTS).map(([from, to]) => (
              <Route path={from} element={<Navigate to={to} replace />} />
            ))}
            <Route path="/ziskat-aplikaci" element={<ComingSoonPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
      <CookieConsent />
    </BrowserRouter>
  );
}
