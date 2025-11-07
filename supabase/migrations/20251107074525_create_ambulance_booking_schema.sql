/*
  # AmbuQuick Database Schema
  
  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `booking_type` (text) - 'standard' or 'sos'
      - `patient_name` (text)
      - `contact_number` (text)
      - `pickup_location` (text)
      - `destination` (text)
      - `ambulance_type` (text) - 'basic', 'advanced', 'icu', 'neonatal'
      - `status` (text) - 'pending', 'assigned', 'enroute', 'arrived', 'completed', 'cancelled'
      - `ambulance_id` (uuid, nullable)
      - `eta_minutes` (integer, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `ambulances`
      - `id` (uuid, primary key)
      - `vehicle_number` (text)
      - `driver_name` (text)
      - `driver_phone` (text)
      - `ambulance_type` (text)
      - `current_lat` (numeric)
      - `current_lng` (numeric)
      - `is_available` (boolean)
      - `created_at` (timestamptz)
      
  2. Security
    - Enable RLS on both tables
    - Public read access for simulation purposes
*/

CREATE TABLE IF NOT EXISTS ambulances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_number text NOT NULL,
  driver_name text NOT NULL,
  driver_phone text NOT NULL,
  ambulance_type text NOT NULL DEFAULT 'basic',
  current_lat numeric NOT NULL DEFAULT 0,
  current_lng numeric NOT NULL DEFAULT 0,
  is_available boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_type text NOT NULL DEFAULT 'standard',
  patient_name text NOT NULL,
  contact_number text NOT NULL,
  pickup_location text NOT NULL,
  destination text NOT NULL,
  ambulance_type text NOT NULL DEFAULT 'basic',
  status text NOT NULL DEFAULT 'pending',
  ambulance_id uuid REFERENCES ambulances(id),
  eta_minutes integer DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ambulances ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to ambulances"
  ON ambulances FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert to bookings"
  ON bookings FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read access to bookings"
  ON bookings FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public update to bookings"
  ON bookings FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

INSERT INTO ambulances (vehicle_number, driver_name, driver_phone, ambulance_type, current_lat, current_lng, is_available) VALUES
  ('AMB-001', 'Rajesh Kumar', '+91-9876543210', 'basic', 28.7041, 77.1025, true),
  ('AMB-002', 'Priya Sharma', '+91-9876543211', 'advanced', 28.7141, 77.1125, true),
  ('AMB-003', 'Amit Patel', '+91-9876543212', 'icu', 28.6941, 77.0925, true),
  ('AMB-004', 'Sunita Reddy', '+91-9876543213', 'neonatal', 28.7241, 77.1225, true),
  ('AMB-005', 'Vikram Singh', '+91-9876543214', 'basic', 28.6841, 77.0825, true);
