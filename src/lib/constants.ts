import type { AmbulanceType } from './types';

export const AMBULANCE_TYPES: { value: AmbulanceType; label: string; description: string }[] = [
  { value: 'basic', label: 'Basic', description: 'Basic life support with essential equipment' },
  { value: 'advanced', label: 'Advanced', description: 'Advanced life support with monitoring' },
  { value: 'icu', label: 'ICU', description: 'Intensive care unit with ventilator' },
  { value: 'neonatal', label: 'Neonatal', description: 'Specialized care for newborns' },
];

export const STATUS_LABELS = {
  pending: 'Confirming Booking',
  assigned: 'Ambulance Assigned',
  enroute: 'Ambulance En Route',
  arrived: 'Ambulance Arrived',
  completed: 'Trip Completed',
  cancelled: 'Booking Cancelled',
};

export const DEFAULT_LOCATION = {
  lat: 28.7041,
  lng: 77.1025,
};
