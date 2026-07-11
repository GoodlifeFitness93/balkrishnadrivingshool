-- SQL Database Extensions for Balkrishna Driving School Admin Panel
-- Run this in your Supabase SQL Editor

-- =========================================================================
-- 1. Create Tables
-- =========================================================================

-- Offers Table
CREATE TABLE IF NOT EXISTS public.offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    discount_text TEXT NOT NULL,
    banner_image_url TEXT NULL,
    urgency_text TEXT NULL,
    cta_text TEXT NOT NULL DEFAULT 'Claim This Offer',
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Alter enquiries to link to offers
ALTER TABLE public.enquiries DROP CONSTRAINT IF EXISTS fk_enquiries_offer;
ALTER TABLE public.enquiries 
ADD CONSTRAINT fk_enquiries_offer 
FOREIGN KEY (offer_id) REFERENCES public.offers(id) 
ON DELETE SET NULL;

-- Trainees Table
CREATE TABLE IF NOT EXISTS public.trainees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_number TEXT UNIQUE NULL, -- Will be filled by trigger
    full_name TEXT NOT NULL,
    photo_url TEXT NULL,
    guardian_relation TEXT NOT NULL, -- e.g. Son, Wife, Daughter
    guardian_name TEXT NOT NULL,
    permanent_address TEXT NOT NULL,
    temporary_address TEXT NULL,
    date_of_birth DATE NOT NULL,
    date_of_enrollment DATE NOT NULL,
    learners_licence_number TEXT NOT NULL,
    learners_licence_expiry DATE NOT NULL,
    test_competence_date DATE NULL,
    driving_licence_number TEXT NULL,
    driving_licence_issue_date DATE NULL,
    driving_licence_authority TEXT NULL,
    course_assigned TEXT NOT NULL,
    training_period_from DATE NOT NULL,
    training_period_to DATE NOT NULL,
    remarks TEXT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
    status_changed_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Training Sessions Table
CREATE TABLE IF NOT EXISTS public.training_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainee_id UUID NOT NULL REFERENCES public.trainees(id) ON DELETE CASCADE,
    session_date DATE NOT NULL,
    hours_from TIME NOT NULL,
    hours_to TIME NOT NULL,
    vehicle_class TEXT NOT NULL,
    instructor_name TEXT NOT NULL,
    trainee_signed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Slots Table
CREATE TABLE IF NOT EXISTS public.slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    capacity INT NOT NULL DEFAULT 4,
    booked_count INT NOT NULL DEFAULT 0,
    is_closed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT unique_slot_time UNIQUE (slot_date, start_time)
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot_id UUID NOT NULL REFERENCES public.slots(id) ON DELETE CASCADE,
    trainee_id UUID NOT NULL REFERENCES public.trainees(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'booked',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Attendance Table
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    trainee_id UUID NOT NULL REFERENCES public.trainees(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('present', 'absent')),
    marked_by UUID NOT NULL, -- Authenticated user ID (admin)
    marked_at TIMESTAMPTZ DEFAULT now()
);

-- Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- Seed Settings values
INSERT INTO public.settings (key, value) VALUES
('school_licence_number', ''),
('operating_hours_start', '07:00'),
('operating_hours_end', '19:00'),
('closed_weekday', 'sunday')
ON CONFLICT (key) DO NOTHING;

-- =========================================================================
-- 2. Trigger for Enrollment Number Generation (BKS-YYYY-XXXX)
-- =========================================================================

CREATE OR REPLACE FUNCTION public.generate_enrollment_number()
RETURNS TRIGGER AS $$
DECLARE
  current_year INT;
  next_seq INT;
BEGIN
  current_year := EXTRACT(YEAR FROM NEW.date_of_enrollment);
  
  -- Query max sequence for the current year
  SELECT COALESCE(MAX(SUBSTRING(enrollment_number FROM 10 FOR 4)::INT), 0)
  INTO next_seq
  FROM public.trainees
  WHERE enrollment_number LIKE 'BKS-' || current_year || '-%';
  
  next_seq := next_seq + 1;
  NEW.enrollment_number := 'BKS-' || current_year || '-' || LPAD(next_seq::TEXT, 4, '0');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_generate_enrollment_number ON public.trainees;
CREATE TRIGGER tr_generate_enrollment_number
BEFORE INSERT ON public.trainees
FOR EACH ROW
EXECUTE FUNCTION public.generate_enrollment_number();

-- =========================================================================
-- 3. Atomic Slot Booking RPC Function
-- =========================================================================

CREATE OR REPLACE FUNCTION public.book_slot(p_slot_id UUID, p_trainee_id UUID)
RETURNS UUID AS $$
DECLARE
  v_slot_id UUID;
  v_booking_id UUID;
BEGIN
  -- 1. Try to atomically increment the booking count on slots
  UPDATE public.slots
  SET booked_count = booked_count + 1
  WHERE id = p_slot_id 
    AND booked_count < capacity 
    AND is_closed = false
  RETURNING id INTO v_slot_id;

  -- 2. If no slot updated (meaning slot is full, closed or does not exist), fail
  IF v_slot_id IS NULL THEN
    RAISE EXCEPTION 'SLOT_FULL';
  END IF;

  -- 3. Create booking record
  v_booking_id := gen_random_uuid();
  INSERT INTO public.bookings (id, slot_id, trainee_id, status, created_at)
  VALUES (v_booking_id, p_slot_id, p_trainee_id, 'booked', now());

  RETURN v_booking_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =========================================================================
-- 4. Row Level Security (RLS) Configuration
-- =========================================================================

-- Enable RLS on all tables
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- 4.1 Offers policies: 
-- Public read for active offers only
DROP POLICY IF EXISTS "Public select active offers" ON public.offers;
CREATE POLICY "Public select active offers" ON public.offers
    FOR SELECT TO public
    USING (is_enabled = true AND now() BETWEEN start_at AND end_at);

-- Full access for authenticated admins
DROP POLICY IF EXISTS "Admin full access offers" ON public.offers;
CREATE POLICY "Admin full access offers" ON public.offers
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4.2 Enquiries policies updates:
-- Allow authenticated admins to do everything
DROP POLICY IF EXISTS "Admin full access enquiries" ON public.enquiries;
CREATE POLICY "Admin full access enquiries" ON public.enquiries
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4.3 Trainees policies: Admin only
DROP POLICY IF EXISTS "Admin full access trainees" ON public.trainees;
CREATE POLICY "Admin full access trainees" ON public.trainees
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4.4 Training Sessions policies: Admin only
DROP POLICY IF EXISTS "Admin full access training_sessions" ON public.training_sessions;
CREATE POLICY "Admin full access training_sessions" ON public.training_sessions
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4.5 Slots policies: Admin only
DROP POLICY IF EXISTS "Admin full access slots" ON public.slots;
CREATE POLICY "Admin full access slots" ON public.slots
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4.6 Bookings policies: Admin only
DROP POLICY IF EXISTS "Admin full access bookings" ON public.bookings;
CREATE POLICY "Admin full access bookings" ON public.bookings
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4.7 Attendance policies: Admin only
DROP POLICY IF EXISTS "Admin full access attendance" ON public.attendance;
CREATE POLICY "Admin full access attendance" ON public.attendance
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4.8 Settings policies: Admin only
DROP POLICY IF EXISTS "Admin full access settings" ON public.settings;
CREATE POLICY "Admin full access settings" ON public.settings
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- =========================================================================
-- 5. Supabase Realtime Setup
-- =========================================================================

-- Re-create realtime publication if needed, adding tables to enable notifications
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE 
      public.attendance, 
      public.bookings, 
      public.slots, 
      public.training_sessions;
  ELSE
    CREATE PUBLICATION supabase_realtime FOR TABLE 
      public.attendance, 
      public.bookings, 
      public.slots, 
      public.training_sessions;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
