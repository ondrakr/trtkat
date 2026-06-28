/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_STORE_URL?: string;
  readonly VITE_GOOGLE_PLAY_URL?: string;
  readonly VITE_GA4_MEASUREMENT_ID?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
