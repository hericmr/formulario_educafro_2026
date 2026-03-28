import { createClient } from '@supabase/supabase-js';

// Usando as novas variáveis configuradas no Netlify como banco principal
const supabaseUrl = (import.meta.env && import.meta.env.VITE_SUPABASE_URL_2) || 'https://czpkifgudgdpvrvvqaoz.supabase.co';
const supabaseKey = (import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY_2) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6cGtpZmd1ZGdkcHZydnZxYW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzODI3MzksImV4cCI6MjA4NTk1ODczOX0.ud_MYn1zMibj07HL3WlkgJT8qzH6-goWUkPqSODEpnU';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Mantemos o array apenas para compatibilidade de importação, mas agora só com o novo banco
export const allSupabaseClients = [supabase];
