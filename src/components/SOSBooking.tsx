import { useState, useEffect } from 'react';
import { Zap, AlertCircle, CheckCircle } from 'lucide-react';

interface SOSBookingProps {
  onConfirm: () => void;
  onBack: () => void;
}

export default function SOSBooking({ onConfirm, onBack }: SOSBookingProps) {
  const [countdown, setCountdown] = useState(3);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (isConfirming && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isConfirming && countdown === 0) {
      onConfirm();
    }
  }, [isConfirming, countdown, onConfirm]);

  const handleSOSTap = () => {
    setIsConfirming(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center p-4">
      {!isConfirming ? (
        <div className="text-center animate-fade-in-scale">
          <button
            onClick={onBack}
            className="mb-8 text-white/90 hover:text-white font-semibold flex items-center gap-2 transition-colors duration-300 mx-auto"
          >
            <span className="text-xl">←</span> Back to Home
          </button>

          <div className="mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 animate-ping-slow">
                <div className="w-64 h-64 bg-white/20 rounded-full" />
              </div>
              <div className="absolute inset-0 animate-ping-slower">
                <div className="w-64 h-64 bg-white/10 rounded-full" />
              </div>
              <button
                onClick={handleSOSTap}
                className="relative w-64 h-64 bg-white text-red-600 rounded-full shadow-2xl hover:shadow-red-900/50 transform hover:scale-110 transition-all duration-300 flex flex-col items-center justify-center group"
              >
                <Zap className="w-24 h-24 mb-4 group-hover:animate-bounce" />
                <span className="text-3xl font-bold">SOS</span>
                <span className="text-lg mt-2">EMERGENCY</span>
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto text-white">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-lg mb-2">Emergency Protocol</h3>
                <ul className="space-y-2 text-sm text-white/90">
                  <li>• Your location will be auto-detected</li>
                  <li>• Nearest ambulance will be dispatched immediately</li>
                  <li>• Emergency contact will be notified</li>
                  <li>• Priority dispatch activated</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-white/80 mt-6 text-lg">Tap the button for immediate assistance</p>
        </div>
      ) : (
        <div className="text-center animate-pulse-in">
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 animate-spin-slow">
              <div className="w-full h-full border-8 border-white/30 border-t-white rounded-full" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-7xl font-bold">{countdown || <CheckCircle className="w-20 h-20 animate-bounce" />}</div>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white mb-4">Emergency Initiated</h2>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 text-white text-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span>Detecting location...</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white text-lg mt-3">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse animation-delay-200" />
              <span>Finding nearest ambulance...</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white text-lg mt-3">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse animation-delay-400" />
              <span>Preparing dispatch...</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes ping-slower {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in-scale {
          animation: fade-in-scale 0.5s ease-out;
        }

        .animate-pulse-in {
          animation: pulse-in 0.3s ease-out;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-ping-slower {
          animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
}
