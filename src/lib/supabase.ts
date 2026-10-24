import { createClient } from "@supabase/supabase-js";

const url = (import.meta.env.VITE_SUPABASE_URL ?? "").trim();
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();

export const isSupabaseConfigured = Boolean(url && anonKey);

export const freqPhone = (import.meta.env.VITE_FREQ_PHONE ?? "").trim();

export function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);

export async function signInWithGoogle(): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart the dev server.",
    );
  }
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/dashboard",
    },
  });
  if (error) throw error;
}
