import { createClient } from '@supabase/supabase-js';

// املأ القيم التالية من إعدادات Supabase الخاصة بك
const supabaseUrl = 'https://eqfamovqsfzifoujidqz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxZmFtb3Zxc2Z6aWZvdWppZHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNDM5NTIsImV4cCI6MjA2MzYxOTk1Mn0.nTD1l48O9XbIT5ljOInwf7yM3rSj3WRD34Mkwz-qQtU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);