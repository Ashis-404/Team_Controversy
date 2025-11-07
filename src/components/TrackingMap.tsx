import { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, User, Clock, CheckCircle } from 'lucide-react';
import type { Booking, Ambulance } from '../lib/types';
import { STATUS_LABELS } from '../lib/constants';

interface TrackingMapProps {
  booking: Booking;
  ambulance: Ambulance | null;
  onComplete: () => void;
  onCancel: () => void;
}

export default function TrackingMap({ booking, ambulance, onComplete, onCancel }: TrackingMapProps) {
  const [ambulancePosition, setAmbulancePosition] = useState({ x: 10, y: 80 });
  const [eta, setEta] = useState(booking.eta_minutes || 5);
  const [currentStatus, setCurrentStatus] = useState(booking.status);

  useEffect(() => {
    if (currentStatus === 'completed') return;

    const statusFlow: typeof currentStatus[] = ['pending', 'assigned', 'enroute', 'arrived'];
    const currentIndex = statusFlow.indexOf(currentStatus);

    if (currentIndex < statusFlow.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatus(statusFlow[currentIndex + 1]);
        if (statusFlow[currentIndex + 1] === 'arrived') {
          setEta(0);
          setAmbulancePosition({ x: 50, y: 50 });
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStatus]);

  useEffect(() => {
    if (currentStatus === 'enroute' && eta > 0) {
      const interval = setInterval(() => {
        setAmbulancePosition((prev) => ({
          x: Math.min(prev.x + 2, 50),
          y: Math.max(prev.y - 2, 50),
        }));
        setEta((prev) => Math.max(prev - 0.5, 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentStatus, eta]);

  const getStatusColor = () => {
    switch (currentStatus) {
      case 'pending':
        return 'from-yellow-500 to-yellow-600';
      case 'assigned':
        return 'from-blue-500 to-blue-600';
      case 'enroute':
        return 'from-green-500 to-green-600';
      case 'arrived':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className={`bg-gradient-to-r ${getStatusColor()} p-6 rounded-2xl shadow-lg mb-6 text-white animate-slide-down`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Navigation className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{STATUS_LABELS[currentStatus]}</h2>
                <p className="text-white/90">Booking ID: {booking.id.slice(0, 8)}</p>
              </div>
            </div>
            {currentStatus === 'arrived' ? (
              <button
                onClick={onComplete}
                className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors duration-300 flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Complete Trip
              </button>
            ) : currentStatus !== 'completed' ? (
              <button
                onClick={onCancel}
                className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300"
              >
                Cancel Booking
              </button>
            ) : null}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
              <div className="relative bg-gradient-to-br from-blue-100 to-green-100 h-96 md:h-[500px]">
                <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-bounce-slow">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-gray-900">ETA: {Math.ceil(eta)} min</span>
                </div>

                <div
                  className="absolute w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-1000 ease-linear animate-pulse"
                  style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                >
                  <MapPin className="w-6 h-6 text-white" />
                </div>

                <div
                  className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-1000 ease-linear animate-ambulance-move"
                  style={{
                    left: `${ambulancePosition.x}%`,
                    top: `${ambulancePosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <span className="text-3xl">🚑</span>
                </div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d={`M ${ambulancePosition.x}% ${ambulancePosition.y}% Q ${(ambulancePosition.x + 50) / 2}% ${(ambulancePosition.y + 50) / 2}% 50% 50%`}
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray="10,5"
                    fill="none"
                    className="animate-dash"
                  />
                </svg>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">Tracking Live Location</span>
                  </div>
                  <p className="text-sm text-white/90">{booking.pickup_location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {ambulance && (
              <div className="bg-white rounded-2xl shadow-xl p-6 animate-slide-left">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Driver Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold text-gray-900">{ambulance.driver_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vehicle</p>
                    <p className="font-semibold text-gray-900">{ambulance.vehicle_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold text-gray-900 capitalize">{ambulance.ambulance_type}</p>
                  </div>
                  <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2 mt-4">
                    <Phone className="w-5 h-5" />
                    {ambulance.driver_phone}
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl p-6 animate-slide-left animation-delay-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                Trip Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Patient</p>
                  <p className="font-semibold text-gray-900">{booking.patient_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-semibold text-gray-900">{booking.contact_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pickup</p>
                  <p className="font-semibold text-gray-900 text-sm">{booking.pickup_location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Destination</p>
                  <p className="font-semibold text-gray-900 text-sm">{booking.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold text-gray-900 capitalize">{booking.ambulance_type}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }

        @keyframes ambulance-move {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          50% {
            transform: translate(-50%, -50%) rotate(5deg);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-left {
          animation: slide-left 0.5s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-dash {
          animation: dash 20s linear infinite;
        }

        .animate-ambulance-move {
          animation: ambulance-move 1s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
}
