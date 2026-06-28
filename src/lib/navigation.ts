export const sectionWrap =
  'max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12';
export const sectionWrapNarrow =
  'max-w-5xl mx-auto w-full px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12';
export const sectionY = 'py-14 sm:py-16 md:py-24';
export const logoSrc = '/logo/logo%20trtkat.svg';

export function homeHref(hash?: string) {
  return hash ? `/${hash}` : '/';
}
