export const sectionWrap =
  'max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12';
export const sectionWrapNarrow =
  'max-w-5xl mx-auto w-full px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12';
export const sectionY = 'py-14 sm:py-16 md:py-24';
export const logoSrc = '/logo/logo%20trtkat.svg';
export const heroPhoneSrc = '/images/hero-phone.png';

const NAV_OFFSET_MOBILE = 64;
const NAV_OFFSET_DESKTOP = 80;
const SCROLL_DURATION_MS = 420;

function navOffset() {
  return window.matchMedia('(min-width: 768px)').matches ? NAV_OFFSET_DESKTOP : NAV_OFFSET_MOBILE;
}

export function smoothScrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const target = el.getBoundingClientRect().top + window.scrollY - navOffset();
  const start = window.scrollY;
  const distance = target - start;
  if (Math.abs(distance) < 2) return;

  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1);
    const eased = 1 - (1 - progress) ** 3;
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export function homeHref(hash?: string) {
  return hash ? `/${hash}` : '/';
}
