import { createClient } from '@supabase/supabase-js';

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? 'https://mlyzaxzohgobjkxcrjml.supabase.co';
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? 'sb_publishable_FnM3LGjsUiGuCm1vkVTYMA_mtfCLu6P';

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
