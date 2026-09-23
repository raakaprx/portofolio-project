-- ============================================================
-- Migration: contact_messages table
-- Run this in your Supabase SQL editor (Dashboard > SQL Editor)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  email      text NOT NULL,
  message    text NOT NULL,
  is_read    boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read
  ON public.contact_messages (is_read);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_messages"
  ON public.contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "auth_select_messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth_update_messages"
  ON public.contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "auth_delete_messages"
  ON public.contact_messages
  FOR DELETE
  TO authenticated
  USING (true);
