export interface Database {
  public: {
    Tables: {
      ambulances: {
        Row: {
          id: string;
          vehicle_number: string;
          driver_name: string;
          driver_phone: string;
          ambulance_type: AmbulanceType;
          current_lat: number;
          current_lng: number;
          is_available: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['ambulances']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['ambulances']['Insert']>;
      };
      bookings: {
        Row: {
          id: string;
          booking_type: BookingType;
          patient_name: string;
          contact_number: string;
          pickup_location: string;
          destination: string;
          ambulance_type: AmbulanceType;
          status: BookingStatus;
          ambulance_id: string | null;
          eta_minutes: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>;
      };
    };
  };
}

export type AmbulanceType = 'basic' | 'advanced' | 'icu' | 'neonatal';
export type BookingType = 'standard' | 'sos';
export type BookingStatus = 'pending' | 'assigned' | 'enroute' | 'arrived' | 'completed' | 'cancelled';

export interface Ambulance {
  id: string;
  vehicle_number: string;
  driver_name: string;
  driver_phone: string;
  ambulance_type: AmbulanceType;
  current_lat: number;
  current_lng: number;
  is_available: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  booking_type: BookingType;
  patient_name: string;
  contact_number: string;
  pickup_location: string;
  destination: string;
  ambulance_type: AmbulanceType;
  status: BookingStatus;
  ambulance_id: string | null;
  eta_minutes: number | null;
  created_at: string;
  updated_at: string;
}

export interface BookingFormData {
  patient_name: string;
  contact_number: string;
  pickup_location: string;
  destination: string;
  ambulance_type: AmbulanceType;
}
