import { createBrowserClient } from "@supabase/ssr";

function sanitizeSupabaseUrl(url: string | undefined): string {
  if (!url) return "";
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
}

const DEFAULT_SUPABASE_URL = "https://nnmcwzillidcsnwuiodl.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ubWN3emlsbGlkY3Nud3Vpb2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MDgyNzAsImV4cCI6MjEwNDA4NDI3MH0.E6ak74TpBbpms-vp3LPgp590lIllHEYGfRz8odStAAE";

export function createClient() {
  const supabaseUrl =
    sanitizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) || DEFAULT_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  return createBrowserClient(supabaseUrl, supabaseKey);
}
