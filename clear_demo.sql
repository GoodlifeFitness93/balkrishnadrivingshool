-- SQL Purge Script: Demo Data Clean Up
-- Balkrishna Driving School, Solapur
-- Run this in your Supabase SQL editor.
-- Contains ONLY DELETE statements to purge demo records safely.
-- Targets entries starting with 'Demo ' and custom relative dates.

-- 1. Purge attendance records associated with demo trainees
DELETE FROM public.attendance 
WHERE trainee_id IN (SELECT id FROM public.trainees WHERE full_name LIKE 'Demo %');

-- 2. Purge training sessions associated with demo trainees
DELETE FROM public.training_sessions 
WHERE trainee_id IN (SELECT id FROM public.trainees WHERE full_name LIKE 'Demo %');

-- 3. Purge bookings associated with demo trainees
DELETE FROM public.bookings 
WHERE trainee_id IN (SELECT id FROM public.trainees WHERE full_name LIKE 'Demo %');

-- 4. Purge demo trainees
DELETE FROM public.trainees 
WHERE full_name LIKE 'Demo %';

-- 5. Purge demo enquiries
DELETE FROM public.enquiries 
WHERE full_name LIKE 'Demo %';

-- 6. Purge demo offers
DELETE FROM public.offers 
WHERE title LIKE 'Demo %';

-- 7. Clean slots created for demo dates that do not contain any remaining production bookings
DELETE FROM public.slots 
WHERE slot_date IN (
  CURRENT_DATE,
  CURRENT_DATE - INTERVAL '1 day',
  CURRENT_DATE - INTERVAL '2 days',
  CURRENT_DATE - INTERVAL '3 days',
  CURRENT_DATE - INTERVAL '4 days',
  CURRENT_DATE - INTERVAL '5 days',
  CURRENT_DATE - INTERVAL '6 days',
  CURRENT_DATE - INTERVAL '7 days',
  CURRENT_DATE - INTERVAL '10 days',
  CURRENT_DATE - INTERVAL '12 days',
  CURRENT_DATE - INTERVAL '13 days',
  CURRENT_DATE - INTERVAL '14 days',
  CURRENT_DATE - INTERVAL '15 days',
  CURRENT_DATE + INTERVAL '1 day',
  CURRENT_DATE + INTERVAL '2 days',
  CURRENT_DATE + INTERVAL '3 days'
)
AND id NOT IN (
  SELECT DISTINCT slot_id 
  FROM public.bookings b 
  JOIN public.trainees t ON b.trainee_id = t.id 
  WHERE t.full_name NOT LIKE 'Demo %'
);
