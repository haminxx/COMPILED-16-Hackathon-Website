/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_FREQ_PHONE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
