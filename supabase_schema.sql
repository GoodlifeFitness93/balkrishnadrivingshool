-- SQL Schema to create the enquiries table for Balkrishna Driving School
-- Run this in the Supabase SQL Editor

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    course TEXT NOT NULL,
    preferred_batch TEXT NOT NULL,
    message TEXT,
    course_source TEXT,
    offer_id UUID NULL,
    status TEXT DEFAULT 'new'
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
-- Policy for anonymous insertions (any public visitor submitting the form)
CREATE POLICY "Allow anonymous insert" 
ON public.enquiries 
FOR INSERT 
WITH CHECK (true);

-- Ensure anon cannot select, update, or delete
-- (Since RLS is enabled and no select/update/delete policies are defined, they are disabled by default for anon)
