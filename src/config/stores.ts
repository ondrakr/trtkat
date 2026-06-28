/** Skrytá landing stránka pro tlačítka stažení — není v navigaci ani sitemapě. */
export const DOWNLOAD_PAGE_PATH = '/ziskat-aplikaci';

export const APP_STORE_URL =
  import.meta.env.VITE_APP_STORE_URL ?? DOWNLOAD_PAGE_PATH;

export const GOOGLE_PLAY_URL =
  import.meta.env.VITE_GOOGLE_PLAY_URL ?? DOWNLOAD_PAGE_PATH;
