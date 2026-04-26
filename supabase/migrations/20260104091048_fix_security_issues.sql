/*
  # Fix Database Security Issues

  ## Changes Made
  
  ### 1. Remove Unused Indexes
  Removing indexes that are not currently being used to reduce maintenance overhead:
  - `idx_whatsapp_conversations_phone` - Phone number lookup index
  - `idx_whatsapp_conversations_last_message` - Last message timestamp index  
  - `idx_whatsapp_messages_conversation` - Conversation message lookup index
  - `idx_whatsapp_messages_sid` - Message SID lookup index
  
  Note: These can be added back when the system is actively processing messages
  and performance monitoring shows they would be beneficial.
  
  ### 2. Fix Function Search Path Security Issue
  Update the `update_whatsapp_conversation_timestamp` function to have an
  immutable search path to prevent potential security vulnerabilities:
  - Set explicit search path to 'public'
  - Ensures function behavior is predictable and secure
  
  ## Security Improvements
  - Eliminates mutable search path vulnerability in trigger function
  - Reduces database maintenance overhead by removing unused indexes
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_whatsapp_conversations_phone;
DROP INDEX IF EXISTS idx_whatsapp_conversations_last_message;
DROP INDEX IF EXISTS idx_whatsapp_messages_conversation;
DROP INDEX IF EXISTS idx_whatsapp_messages_sid;

-- Recreate function with fixed search path
CREATE OR REPLACE FUNCTION update_whatsapp_conversation_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;