import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MessagesClient from "./MessagesClient";

export const dynamic = "force-dynamic";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default async function MessagesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[MessagesPage] Failed to fetch messages:", error.message);
  }

  const messages: ContactMessage[] = (data as ContactMessage[]) || [];

  return <MessagesClient initialMessages={messages} />;
}
