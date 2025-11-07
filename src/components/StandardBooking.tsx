import { useState } from 'react';
import { MapPin, User, Phone, Navigation, Ambulance } from 'lucide-react';
import { AMBULANCE_TYPES } from '../lib/constants';
import type { BookingFormData, AmbulanceType } from '../lib/types';

interface StandardBookingProps {
  onSubmit: (data: BookingFormData) => void;
  onBack: () => void;
}

export default function StandardBooking({ onSubmit, onBack }: StandardBookingProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    patient_name: '',
    contact_number: '',
    pickup_location: '',
    destination: '',
    ambulance_type: 'basic',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <button
          onClick={onBack}
          className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 transition-colors duration-300"
        >
          <span className="text-xl">←</span> Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Ambulance className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Standard Booking</h2>
                <p className="text-blue-100 mt-1">Fill in the details below</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Patient Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.patient_name}
                  onChange={(e) => handleChange('patient_name', e.target.value)}
                  onFocus={() => setFocusedField('patient_name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                    focusedField === 'patient_name'
                      ? 'border-blue-500 shadow-lg shadow-blue-100'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  placeholder="Enter patient name"
                />
              </div>

              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  Contact Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.contact_number}
                  onChange={(e) => handleChange('contact_number', e.target.value)}
                  onFocus={() => setFocusedField('contact_number')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                    focusedField === 'contact_number'
                      ? 'border-blue-500 shadow-lg shadow-blue-100'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>

              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Pickup Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.pickup_location}
                  onChange={(e) => handleChange('pickup_location', e.target.value)}
                  onFocus={() => setFocusedField('pickup_location')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                    focusedField === 'pickup_location'
                      ? 'border-blue-500 shadow-lg shadow-blue-100'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  placeholder="Enter pickup address"
                />
              </div>

              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  Destination
                </label>
                <input
                  type="text"
                  required
                  value={formData.destination}
                  onChange={(e) => handleChange('destination', e.target.value)}
                  onFocus={() => setFocusedField('destination')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                    focusedField === 'destination'
                      ? 'border-blue-500 shadow-lg shadow-blue-100'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  placeholder="Enter destination address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Ambulance className="w-4 h-4 text-blue-600" />
                  Ambulance Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {AMBULANCE_TYPES.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleChange('ambulance_type', type.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                        formData.ambulance_type === type.value
                          ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-100 scale-105'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="font-bold text-gray-900 mb-1">{type.label}</div>
                      <div className="text-xs text-gray-600">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
