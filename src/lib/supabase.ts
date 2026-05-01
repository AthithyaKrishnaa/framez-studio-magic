import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://svvqvzhpwcxfftlvzkox.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2dnF2emhwd2N4ZmZ0bHZ6a294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MDg5MzUsImV4cCI6MjA5MzE4NDkzNX0.3yiE8I-tdV2nxc4psMFeQwVleapZcksBZZlX3E2fxcs";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const ADMIN_EMAIL = "admin@framezstudio.com";

// ─── Database row types ────────────────────────────────────────────────────────

export interface ContactRow {
  id: string;
  name: string;
  email: string | null;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  category: string;
  quantity: number;
  customization?: string;
}

export interface OrderRow {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  items: OrderItem[];
  address: string;
  message: string | null;
  status: "pending" | "confirmed" | "in-progress" | "shipped" | "delivered" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface ProfileRow {
  id: string;
  name: string | null;
  phone: string | null;
  created_at: string;
}
