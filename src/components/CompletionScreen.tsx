import { CheckCircle, Home, Star } from 'lucide-react';
import type { Booking } from '../lib/types';

interface CompletionScreenProps {
  booking: Booking;
  onBackToHome: () => void;
}

export default function CompletionScreen({ booking, onBackToHome }: CompletionScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-12 text-white text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm p-6 rounded-full mb-6 animate-bounce-in">
              <CheckCircle className="w-20 h-20" />
            </div>
            <h2 className="text-4xl font-bold mb-3">Trip Completed Successfully!</h2>
            <p className="text-green-100 text-lg">The patient has been safely transported</p>
          </div>

          <div className="p-8 md:p-12">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 mb-8 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Booking Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Booking ID</span>
                  <span className="font-semibold text-gray-900">{booking.id.slice(0, 13)}...</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Patient Name</span>
                  <span className="font-semibold text-gray-900">{booking.patient_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Booking Type</span>
                  <span className="font-semibold text-gray-900 uppercase">{booking.booking_type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ambulance Type</span>
                  <span className="font-semibold text-gray-900 capitalize">{booking.ambulance_type}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-yellow-600" />
                <h3 className="font-bold text-gray-900 text-lg">Rate Your Experience</h3>
              </div>
              <div className="flex gap-2 justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="text-4xl hover:scale-125 transition-transform duration-200 hover:drop-shadow-lg"
                  >
                    ⭐
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center">Your feedback helps us improve our service</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={onBackToHome}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </button>
              <button className="bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
                Download Receipt
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Thank you for using AmbuQuick. We hope for a speedy recovery! 🏥
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">Emergency Hotline: 102 | 108</p>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
