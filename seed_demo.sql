-- SQL Seed Script: Dynamic Demo Data Setup (PostgreSQL PL/pgSQL Transaction)
-- Balkrishna Driving School, Solapur
-- Run this in your Supabase SQL editor.
-- Creates 20 trainees, 20 enquiries, 12 slots, 21 bookings, attendance history, and training sessions.
-- Uses relative date arithmetic so database stats remain current.
-- Demo data is identifiable by name prefixes ('Demo %') and mobile numbers starting with '99999'.

DO $$
DECLARE
  v_offer_live_id UUID;
  v_offer_expired_id UUID;
  v_offer_scheduled_id UUID;
  v_trainee_ids UUID[];
  v_slot_ids UUID[];
  v_booking_ids UUID[];
BEGIN

  -- 1. Seed Offers (One active with structured JSON, one expired, one scheduled)
  INSERT INTO public.offers (title, description, discount_text, urgency_text, cta_text, start_at, end_at, is_enabled) VALUES
  (
    'Demo Monsoon Driving Special', 
    '{"course_name":"Premium Sedan / SUV Driving Package","original_fee":"8500","discount_val":"1500","savings":"1500","benefits":["20 Days Intensive Practical Training","Dedicated Personal Trainer & Dual-Control Car","RTO Learners Permit & License Prep Support","Wet Weather & Night Simulation Training"],"marketing_text":"Master wet-weather driving and night navigation with our custom heavy-rain driving module in Solapur. Limited batches.","why_us_badge":"Monsoon Special Offer"}', 
    '15% OFF REGULAR COURSE', 
    'Offer ends soon. Only 5 slots left!', 
    'Claim Monsoon Discount', 
    CURRENT_DATE - INTERVAL '10 days', 
    CURRENT_DATE + INTERVAL '10 days', 
    true
  )
  RETURNING id INTO v_offer_live_id;

  INSERT INTO public.offers (title, description, discount_text, urgency_text, cta_text, start_at, end_at, is_enabled) VALUES
  (
    'Demo Summer Vacation Course', 
    'Special student package for college students during vacations. Includes learner permit assistance.', 
    '₹1,500 FLAT OFF', 
    'Campaign expired on June 30', 
    'Register Now', 
    CURRENT_DATE - INTERVAL '60 days', 
    CURRENT_DATE - INTERVAL '10 days', 
    true
  )
  RETURNING id INTO v_offer_expired_id;

  INSERT INTO public.offers (title, description, discount_text, urgency_text, cta_text, start_at, end_at, is_enabled) VALUES
  (
    'Demo Independence Day Special', 
    'Celebrate freedom on the road. Flat discount on combined two-wheeler and four-wheeler packages.', 
    '₹2,000 PACKAGE SAVINGS', 
    'Launches soon', 
    'Pre-Register Offer', 
    CURRENT_DATE + INTERVAL '10 days', 
    CURRENT_DATE + INTERVAL '30 days', 
    true
  )
  RETURNING id INTO v_offer_scheduled_id;

  -- 2. Seed 20 Enquiries
  INSERT INTO public.enquiries (full_name, phone, course, preferred_batch, message, course_source, status, created_at, offer_id) VALUES
  ('Demo Amit Deshmukh', '9999900001', 'Four-Wheeler', 'Morning', 'I want to learn car driving on weekends only.', 'direct', 'new', CURRENT_TIMESTAMP - INTERVAL '2 hours', null),
  ('Demo Priya Kulkarni', '9999900002', 'Two-Wheeler', 'Evening', 'Do you teach gearless scooters for ladies?', 'direct', 'new', CURRENT_TIMESTAMP - INTERVAL '5 hours', null),
  ('Demo Aditya Shinde', '9999900003', 'Four-Wheeler', 'Morning', 'Interested in Monsoon special offer car package.', 'Monsoon Driving Special', 'contacted', CURRENT_TIMESTAMP - INTERVAL '1 day', v_offer_live_id),
  ('Demo Snehal Patil', '9999900004', 'Two-Wheeler', 'Morning', 'Please call me after 5 PM.', 'direct', 'enrolled', CURRENT_TIMESTAMP - INTERVAL '3 days', null),
  ('Demo Amit Jadhav', '9999900005', 'Heavy Motor Vehicle', 'Evening', 'Need commercial truck license training.', 'direct', 'closed', CURRENT_TIMESTAMP - INTERVAL '5 days', null),
  ('Demo Rahul Joshi', '9999900006', 'Four-Wheeler', 'Morning', 'Can I get weekend slots?', 'direct', 'new', CURRENT_TIMESTAMP - INTERVAL '6 hours', null),
  ('Demo Deepa Nair', '9999900007', 'Two-Wheeler', 'Evening', 'Want to learn ladies scooter.', 'direct', 'new', CURRENT_TIMESTAMP - INTERVAL '8 hours', null),
  ('Demo Vikrant Patil', '9999900008', 'Four-Wheeler', 'Morning', 'Monsoon offer query.', 'Monsoon Driving Special', 'contacted', CURRENT_TIMESTAMP - INTERVAL '1 day', v_offer_live_id),
  ('Demo Ashutosh Shinde', '9999900009', 'Two-Wheeler', 'Morning', 'Interested in driving courses.', 'direct', 'enrolled', CURRENT_TIMESTAMP - INTERVAL '4 days', null),
  ('Demo Sandeep Chavan', '9999900010', 'Heavy Motor Vehicle', 'Evening', 'Heavy truck license info.', 'direct', 'closed', CURRENT_TIMESTAMP - INTERVAL '6 days', null),
  ('Demo Meenal Kulkarni', '9999900011', 'Four-Wheeler', 'Morning', 'Need learning license assistance.', 'direct', 'new', CURRENT_TIMESTAMP - INTERVAL '10 hours', null),
  ('Demo Yogesh Jadhav', '9999900012', 'Two-Wheeler', 'Evening', 'Looking for personal trainer.', 'direct', 'new', CURRENT_TIMESTAMP - INTERVAL '12 hours', null),
  ('Demo Sneha Bhosale', '9999900013', 'Four-Wheeler', 'Morning', 'What are the charges?', 'direct', 'contacted', CURRENT_TIMESTAMP - INTERVAL '2 days', null),
  ('Demo Prasad Mane', '9999900014', 'Two-Wheeler', 'Morning', 'I want to enroll.', 'direct', 'enrolled', CURRENT_TIMESTAMP - INTERVAL '4 days', null),
  ('Demo Varun Jagtap', '9999900015', 'Heavy Motor Vehicle', 'Evening', 'HMV batch timings.', 'direct', 'closed', CURRENT_TIMESTAMP - INTERVAL '7 days', null),
  ('Demo Shraddha Shah', '9999900016', 'Four-Wheeler', 'Morning', 'Is license help included?', 'direct', 'new', CURRENT_TIMESTAMP - INTERVAL '14 hours', null),
  ('Demo Gaurav Naik', '9999900017', 'Two-Wheeler', 'Evening', 'Scooter batch slots.', 'direct', 'new', CURRENT_TIMESTAMP - INTERVAL '18 hours', null),
  ('Demo Komal Lokhande', '9999900018', 'Four-Wheeler', 'Morning', 'Monsoon special package details.', 'Monsoon Driving Special', 'contacted', CURRENT_TIMESTAMP - INTERVAL '3 days', v_offer_live_id),
  ('Demo Sushant Pawar', '9999900019', 'Two-Wheeler', 'Morning', 'Want two-wheeler course.', 'direct', 'enrolled', CURRENT_TIMESTAMP - INTERVAL '5 days', null),
  ('Demo Neha Salunkhe', '9999900020', 'Heavy Motor Vehicle', 'Evening', 'Truck training package.', 'direct', 'closed', CURRENT_TIMESTAMP - INTERVAL '8 days', null);

  -- 3. Seed 20 Trainees and capture their generated UUIDs into an array
  WITH t_ins AS (
    INSERT INTO public.trainees (full_name, guardian_relation, guardian_name, permanent_address, temporary_address, date_of_birth, date_of_enrollment, learners_licence_number, learners_licence_expiry, course_assigned, training_period_from, training_period_to, remarks, status) VALUES
    ('Demo Abhishek Sharma', 'Son of', 'Rajesh Sharma', '102, Bhavani Peth, Solapur', null, '2004-05-12', CURRENT_DATE - INTERVAL '20 days', 'MH13-LL-202600123', CURRENT_DATE + INTERVAL '160 days', 'Four-Wheeler', CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE, '9822345678', 'active'),
    ('Demo Neeta Deshpande', 'Daughter of', 'Milind Deshpande', '45, Rupa Bhavani Temple Road, Solapur', null, '2005-09-20', CURRENT_DATE - INTERVAL '20 days', 'MH13-LL-202600124', CURRENT_DATE + INTERVAL '160 days', 'Two-Wheeler', CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE, '9422045612', 'active'),
    ('Demo Vikram Rathod', 'Son of', 'Hanumant Rathod', 'Galli No. 3, Shastri Nagar, Solapur', null, '1998-11-05', CURRENT_DATE - INTERVAL '19 days', 'MH13-LL-202600125', CURRENT_DATE + INTERVAL '161 days', 'Auto-Rickshaw', CURRENT_DATE - INTERVAL '19 days', CURRENT_DATE + INTERVAL '1 day', '8888432109', 'active'),
    ('Demo Sayali Gaikwad', 'Wife of', 'Prashant Gaikwad', 'Flat 4A, Orchid Heights, Bhavani Peth, Solapur', null, '2000-03-15', CURRENT_DATE - INTERVAL '19 days', 'MH13-LL-202600126', CURRENT_DATE + INTERVAL '161 days', 'Four-Wheeler', CURRENT_DATE - INTERVAL '19 days', CURRENT_DATE + INTERVAL '1 day', '7709321567', 'active'),
    ('Demo Rohan Mane', 'Son of', 'Dilip Mane', 'Vasant Vihar, Solapur Road, Solapur', null, '2003-07-18', CURRENT_DATE - INTERVAL '18 days', 'MH13-LL-202600127', CURRENT_DATE + INTERVAL '162 days', 'Four-Wheeler', CURRENT_DATE - INTERVAL '18 days', CURRENT_DATE + INTERVAL '2 days', '9158321094', 'active'),
    ('Demo Megha Jagtap', 'Daughter of', 'Suhas Jagtap', 'Bhavani Peth, Solapur', null, '2006-12-25', CURRENT_DATE - INTERVAL '18 days', 'MH13-LL-202600128', CURRENT_DATE + INTERVAL '162 days', 'Two-Wheeler', CURRENT_DATE - INTERVAL '18 days', CURRENT_DATE + INTERVAL '2 days', '8421094567', 'active'),
    ('Demo Sachin Bhosale', 'Son of', 'Ganpat Bhosale', '110, MIDC Road, Solapur', null, '1995-02-28', CURRENT_DATE - INTERVAL '17 days', 'MH13-LL-202600129', CURRENT_DATE + INTERVAL '163 days', 'Heavy Motor Vehicle', CURRENT_DATE - INTERVAL '17 days', CURRENT_DATE + INTERVAL '3 days', '9850231456', 'active'),
    ('Demo Ashwini Tamboli', 'Daughter of', 'Ibrahim Tamboli', 'Siddheshwar Colony, Solapur', null, '2001-08-30', CURRENT_DATE - INTERVAL '17 days', 'MH13-LL-202600130', CURRENT_DATE + INTERVAL '163 days', 'Two-Wheeler', CURRENT_DATE - INTERVAL '17 days', CURRENT_DATE + INTERVAL '3 days', '9673451298', 'active'),
    ('Demo Nitin Kadam', 'Son of', 'Pandurang Kadam', 'Jule Solapur, Solapur', null, '1992-06-14', CURRENT_DATE - INTERVAL '16 days', 'MH13-LL-202600131', CURRENT_DATE + INTERVAL '164 days', 'Tempo/LCV', CURRENT_DATE - INTERVAL '16 days', CURRENT_DATE + INTERVAL '4 days', '9503456712', 'active'),
    ('Demo Pooja Waghmare', 'Daughter of', 'Balasaheb Waghmare', 'Civil Lines, Solapur', null, '2002-10-09', CURRENT_DATE - INTERVAL '16 days', 'MH13-LL-202600132', CURRENT_DATE + INTERVAL '164 days', 'Four-Wheeler', CURRENT_DATE - INTERVAL '16 days', CURRENT_DATE + INTERVAL '4 days', '9975432109', 'active'),
    ('Demo Harish Chincholi', 'Son of', 'Shivaji Chincholi', 'Bhavani Peth, Solapur', null, '2004-01-01', CURRENT_DATE - INTERVAL '15 days', 'MH13-LL-202600133', CURRENT_DATE + INTERVAL '165 days', 'Four-Wheeler', CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE + INTERVAL '5 days', '9421360787', 'active'),
    ('Demo Deepali Patil', 'Wife of', 'Sanjay Patil', 'Samrat Chowk, Solapur', null, '1996-04-18', CURRENT_DATE - INTERVAL '15 days', 'MH13-LL-202600134', CURRENT_DATE + INTERVAL '165 days', 'Two-Wheeler', CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE + INTERVAL '5 days', '8484920194', 'active'),
    ('Demo Gaurav Koli', 'Son of', 'Anandrao Koli', 'Modikhana, Solapur', null, '2005-11-23', CURRENT_DATE - INTERVAL '14 days', 'MH13-LL-202600135', CURRENT_DATE + INTERVAL '166 days', 'Four-Wheeler', CURRENT_DATE - INTERVAL '14 days', CURRENT_DATE + INTERVAL '6 days', '9172456701', 'completed'),
    ('Demo Shruti Shah', 'Daughter of', 'Abhay Shah', 'Navi Peth, Solapur', null, '2003-09-08', CURRENT_DATE - INTERVAL '14 days', 'MH13-LL-202600136', CURRENT_DATE + INTERVAL '166 days', 'Two-Wheeler', CURRENT_DATE - INTERVAL '14 days', CURRENT_DATE + INTERVAL '6 days', '9890234567', 'completed'),
    ('Demo Karan Naik', 'Son of', 'Vishwas Naik', 'Gold Finch Peth, Solapur', null, '1999-12-31', CURRENT_DATE - INTERVAL '13 days', 'MH13-LL-202600137', CURRENT_DATE + INTERVAL '167 days', 'Four-Wheeler', CURRENT_DATE - INTERVAL '13 days', CURRENT_DATE + INTERVAL '7 days', '8308456123', 'completed'),
    ('Demo Swati Lokhande', 'Wife of', 'Sunil Lokhande', 'Murarji Peth, Solapur', null, '1997-02-14', CURRENT_DATE - INTERVAL '13 days', 'MH13-LL-202600138', CURRENT_DATE + INTERVAL '167 days', 'Two-Wheeler', CURRENT_DATE - INTERVAL '13 days', CURRENT_DATE + INTERVAL '7 days', '9420785612', 'dropped'),
    ('Demo Sandip Gurav', 'Son of', 'Mallikarjun Gurav', 'Guruwar Peth, Solapur', null, '2001-06-25', CURRENT_DATE - INTERVAL '12 days', 'MH13-LL-202600139', CURRENT_DATE + INTERVAL '168 days', 'Four-Wheeler', CURRENT_DATE - INTERVAL '12 days', CURRENT_DATE + INTERVAL '8 days', '7350431256', 'dropped'),
    ('Demo Monika Shinde', 'Daughter of', 'Devidas Shinde', 'Ganga Nagar, Solapur', null, '2004-10-31', CURRENT_DATE - INTERVAL '12 days', 'MH13-LL-202600140', CURRENT_DATE + INTERVAL '168 days', 'Two-Wheeler', CURRENT_DATE - INTERVAL '12 days', CURRENT_DATE + INTERVAL '8 days', '9881234567', 'dropped'),
    ('Demo Ramesh Pawar', 'Son of', 'Tukaram Pawar', 'Kumtha Naka, Solapur', null, '1990-03-24', CURRENT_DATE - INTERVAL '11 days', 'MH13-LL-202600141', CURRENT_DATE + INTERVAL '169 days', 'Heavy Motor Vehicle', CURRENT_DATE - INTERVAL '11 days', CURRENT_DATE + INTERVAL '9 days', '9921456789', 'active'),
    ('Demo Anjali Salunkhe', 'Daughter of', 'Vikas Salunkhe', 'Bhavani Peth, Solapur', null, '2005-08-11', CURRENT_DATE - INTERVAL '11 days', 'MH13-LL-202600142', CURRENT_DATE + INTERVAL '169 days', 'Two-Wheeler', CURRENT_DATE - INTERVAL '11 days', CURRENT_DATE + INTERVAL '9 days', '9422360787', 'active')
    RETURNING id
  )
  SELECT array_agg(id) INTO v_trainee_ids FROM t_ins;

  -- 4. Seed Slots on past, present, and future dates relative to CURRENT_DATE
  WITH s_ins AS (
    INSERT INTO public.slots (slot_date, start_time, end_time, capacity, booked_count, is_closed) VALUES
    (CURRENT_DATE - INTERVAL '2 days', '08:00:00', '09:00:00', 4, 0, false),
    (CURRENT_DATE - INTERVAL '2 days', '09:00:00', '10:00:00', 4, 0, false),
    (CURRENT_DATE - INTERVAL '1 day', '08:00:00', '09:00:00', 4, 0, false),
    (CURRENT_DATE - INTERVAL '1 day', '09:00:00', '10:00:00', 4, 0, false),
    (CURRENT_DATE, '08:00:00', '09:00:00', 4, 0, false),
    (CURRENT_DATE, '09:00:00', '10:00:00', 4, 0, false),
    (CURRENT_DATE, '10:00:00', '11:00:00', 4, 0, false),
    (CURRENT_DATE, '17:00:00', '18:00:00', 4, 0, false),
    (CURRENT_DATE + INTERVAL '1 day', '08:00:00', '09:00:00', 4, 0, false),
    (CURRENT_DATE + INTERVAL '1 day', '09:00:00', '10:00:00', 4, 0, false),
    (CURRENT_DATE + INTERVAL '2 days', '08:00:00', '09:00:00', 4, 0, false),
    (CURRENT_DATE + INTERVAL '2 days', '09:00:00', '10:00:00', 4, 0, false)
    ON CONFLICT (slot_date, start_time) DO UPDATE SET capacity = EXCLUDED.capacity
    RETURNING id
  )
  SELECT array_agg(id) INTO v_slot_ids FROM s_ins;

  -- 5. Seed 21 Bookings linking trainees to the active slots
  WITH b_ins AS (
    INSERT INTO public.bookings (slot_id, trainee_id, status) VALUES
    (v_slot_ids[1], v_trainee_ids[1], 'booked'),
    (v_slot_ids[1], v_trainee_ids[2], 'booked'),
    (v_slot_ids[2], v_trainee_ids[3], 'booked'),
    (v_slot_ids[2], v_trainee_ids[4], 'booked'),
    
    (v_slot_ids[3], v_trainee_ids[1], 'booked'),
    (v_slot_ids[3], v_trainee_ids[5], 'booked'),
    (v_slot_ids[4], v_trainee_ids[2], 'booked'),
    (v_slot_ids[4], v_trainee_ids[6], 'booked'),
    
    (v_slot_ids[5], v_trainee_ids[1], 'booked'),
    (v_slot_ids[5], v_trainee_ids[7], 'booked'),
    (v_slot_ids[5], v_trainee_ids[8], 'booked'),
    (v_slot_ids[6], v_trainee_ids[2], 'booked'),
    (v_slot_ids[6], v_trainee_ids[9], 'booked'),
    (v_slot_ids[7], v_trainee_ids[10], 'booked'),
    (v_slot_ids[8], v_trainee_ids[11], 'booked'),
    
    (v_slot_ids[9], v_trainee_ids[1], 'booked'),
    (v_slot_ids[9], v_trainee_ids[12], 'booked'),
    (v_slot_ids[10], v_trainee_ids[2], 'booked'),
    (v_slot_ids[10], v_trainee_ids[13], 'booked'),
    
    (v_slot_ids[11], v_trainee_ids[14], 'booked'),
    (v_slot_ids[12], v_trainee_ids[15], 'booked')
    RETURNING id
  )
  SELECT array_agg(id) INTO v_booking_ids FROM b_ins;

  -- 6. Seed Attendance records (present/absent) linked to the bookings
  INSERT INTO public.attendance (booking_id, trainee_id, attendance_date, status, marked_by) VALUES
  (v_booking_ids[1], v_trainee_ids[1], CURRENT_DATE - 2, 'present', '00000000-0000-0000-0000-000000000000'),
  (v_booking_ids[2], v_trainee_ids[2], CURRENT_DATE - 2, 'present', '00000000-0000-0000-0000-000000000000'),
  (v_booking_ids[3], v_trainee_ids[3], CURRENT_DATE - 2, 'absent', '00000000-0000-0000-0000-000000000000'),
  (v_booking_ids[4], v_trainee_ids[4], CURRENT_DATE - 2, 'present', '00000000-0000-0000-0000-000000000000'),
  
  (v_booking_ids[5], v_trainee_ids[1], CURRENT_DATE - 1, 'present', '00000000-0000-0000-0000-000000000000'),
  (v_booking_ids[6], v_trainee_ids[5], CURRENT_DATE - 1, 'present', '00000000-0000-0000-0000-000000000000'),
  (v_booking_ids[7], v_trainee_ids[2], CURRENT_DATE - 1, 'absent', '00000000-0000-0000-0000-000000000000'),
  (v_booking_ids[8], v_trainee_ids[6], CURRENT_DATE - 1, 'present', '00000000-0000-0000-0000-000000000000'),
  
  (v_booking_ids[9], v_trainee_ids[1], CURRENT_DATE, 'present', '00000000-0000-0000-0000-000000000000'),
  (v_booking_ids[10], v_trainee_ids[7], CURRENT_DATE, 'present', '00000000-0000-0000-0000-000000000000'),
  (v_booking_ids[11], v_trainee_ids[8], CURRENT_DATE, 'absent', '00000000-0000-0000-0000-000000000000');

  -- 7. Seed Training Sessions (15 sessions for Abhishek Sharma to populate Form 15 logbook)
  INSERT INTO public.training_sessions (trainee_id, session_date, hours_from, hours_to, vehicle_class, instructor_name, trainee_signed) VALUES
  (v_trainee_ids[1], CURRENT_DATE - INTERVAL '15 days', '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),
  (v_trainee_ids[1], CURRENT_DATE - INTERVAL '14 days', '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),
  (v_trainee_ids[1], CURRENT_DATE - INTERVAL '13 days', '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),
  (v_trainee_ids[1], CURRENT_DATE - INTERVAL '12 days', '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),
  (v_trainee_ids[1], CURRENT_DATE - INTERVAL '10 days', '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),
  (v_trainee_ids[1], CURRENT_DATE - INTERVAL '9 days', '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),
  (v_trainee_ids[1], CURRENT_DATE - INTERVAL '8 days', '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),
  (v_trainee_ids[1], CURRENT_DATE - INTERVAL '7 days', '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),
  (v_trainee_ids[1], CURRENT_DATE - INTERVAL '6 days', '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),
  (v_trainee_ids[1], CURRENT_DATE - INTERVAL '5 days', '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),
  (v_trainee_ids[1], CURRENT_DATE - INTERVAL '4 days', '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),
  (v_trainee_ids[1], CURRENT_DATE - INTERVAL '3 days', '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),
  (v_trainee_ids[1], CURRENT_DATE - INTERVAL '2 days', '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),
  (v_trainee_ids[1], CURRENT_DATE - INTERVAL '1 day', '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),
  (v_trainee_ids[1], CURRENT_DATE, '08:00:00', '09:00:00', 'Four-Wheeler', 'Prabhu Sir', true),

  -- Sessions for Neeta Deshpande (v_trainee_ids[2])
  (v_trainee_ids[2], CURRENT_DATE - INTERVAL '10 days', '09:00:00', '10:00:00', 'Two-Wheeler', 'Jadhav Sir', true),
  (v_trainee_ids[2], CURRENT_DATE - INTERVAL '8 days', '09:00:00', '10:00:00', 'Two-Wheeler', 'Jadhav Sir', true),
  (v_trainee_ids[2], CURRENT_DATE - INTERVAL '6 days', '09:00:00', '10:00:00', 'Two-Wheeler', 'Jadhav Sir', true),
  (v_trainee_ids[2], CURRENT_DATE - INTERVAL '4 days', '09:00:00', '10:00:00', 'Two-Wheeler', 'Jadhav Sir', true),
  (v_trainee_ids[2], CURRENT_DATE - INTERVAL '2 days', '09:00:00', '10:00:00', 'Two-Wheeler', 'Jadhav Sir', true);

  -- 8. Synchronize booked_counts on slots dynamically based on active bookings count
  UPDATE public.slots s
  SET booked_count = (SELECT COUNT(*) FROM public.bookings b WHERE b.slot_id = s.id);

END $$;
