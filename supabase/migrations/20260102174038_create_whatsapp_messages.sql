/*
  # WhatsApp Integration Schema

  ## Purpose
  This migration creates the database structure for storing WhatsApp conversations
  and message history for the VIP concierge chatbot.

  ## New Tables
  
  ### `whatsapp_conversations`
  - `id` (uuid, primary key) - Unique conversation identifier
  - `phone_number` (text) - User's WhatsApp phone number (with country code)
  - `user_name` (text) - User's display name from WhatsApp
  - `last_message_at` (timestamptz) - Timestamp of last message
  - `session_data` (jsonb) - Store session-specific data (language preference, context)
  - `created_at` (timestamptz) - Conversation start time
  - `updated_at` (timestamptz) - Last update time

  ### `whatsapp_messages`
  - `id` (uuid, primary key) - Unique message identifier
  - `conversation_id` (uuid, foreign key) - Links to whatsapp_conversations
  - `message_sid` (text) - Twilio message SID (unique identifier)
  - `direction` (text) - 'inbound' or 'outbound'
  - `content` (text) - Message content
  - `from_number` (text) - Sender phone number
  - `to_number` (text) - Recipient phone number
  - `status` (text) - Message status (sent, delivered, read, failed)
  - `created_at` (timestamptz) - Message timestamp

  ## Security
  - Enable RLS on all tables
  - Only system/service role can access these tables (no public access)
  - Internal use only for WhatsApp bot operations
*/

-- Create whatsapp_conversations table
CREATE TABLE IF NOT EXISTS whatsapp_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL,
  user_name text,
  last_message_at timestamptz DEFAULT now(),
  session_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index on phone_number for fast lookups
CREATE INDEX IF NOT EXISTS idx_whatsapp_conversations_phone 
  ON whatsapp_conversations(phone_number);

-- Create index on last_message_at for sorting
CREATE INDEX IF NOT EXISTS idx_whatsapp_conversations_last_message 
  ON whatsapp_conversations(last_message_at DESC);

-- Create whatsapp_messages table
CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES whatsapp_conversations(id) ON DELETE CASCADE,
  message_sid text UNIQUE,
  direction text NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  content text NOT NULL,
  from_number text NOT NULL,
  to_number text NOT NULL,
  status text DEFAULT 'sent',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_conversation 
  ON whatsapp_messages(conversation_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_sid 
  ON whatsapp_messages(message_sid);

-- Enable Row Level Security
ALTER TABLE whatsapp_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;

-- Create policies (service role only - no public access)
-- These tables should only be accessed by edge functions with service role

-- Conversations policies
CREATE POLICY "Service role can manage conversations"
  ON whatsapp_conversations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Messages policies
CREATE POLICY "Service role can manage messages"
  ON whatsapp_messages
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_whatsapp_conversation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_whatsapp_conversations_timestamp ON whatsapp_conversations;
CREATE TRIGGER update_whatsapp_conversations_timestamp
  BEFORE UPDATE ON whatsapp_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_whatsapp_conversation_timestamp();