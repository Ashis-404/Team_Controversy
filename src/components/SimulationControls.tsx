import { useState } from 'react';
import { Settings, Zap, Moon, Sun, Wifi, WifiOff } from 'lucide-react';

interface SimulationControlsProps {
  onSimulateArrival: () => void;
  onToggleTheme: () => void;
  isDarkTheme: boolean;
}

export default function SimulationControls({
  onSimulateArrival,
  onToggleTheme,
  isDarkTheme,
}: SimulationControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [networkDelay, setNetworkDelay] = useState(false);

  const toggleNetworkDelay = () => {
    setNetworkDelay(!networkDelay);
    if (!networkDelay) {
      setTimeout(() => setNetworkDelay(false), 3000);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300 z-50 animate-float"
      >
        <Settings className={`w-6 h-6 ${isOpen ? 'animate-spin-slow' : ''}`} />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl p-6 w-80 z-50 animate-slide-up-fade border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              Demo Controls
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <button
              onClick={onSimulateArrival}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              🚑 Simulate Arrival
            </button>

            <button
              onClick={toggleNetworkDelay}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                networkDelay
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                  : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
              }`}
            >
              {networkDelay ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
              {networkDelay ? 'Network Delayed' : 'Simulate Network Delay'}
            </button>

            <button
              onClick={onToggleTheme}
              className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              {isDarkTheme ? 'Day Mode' : 'Night Mode'}
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              These controls are for demonstration purposes only
            </p>
          </div>
        </div>
      )}

      {networkDelay && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full shadow-xl z-50 animate-bounce-in flex items-center gap-2">
          <WifiOff className="w-5 h-5" />
          <span className="font-semibold">Network Delay Simulated</span>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slide-up-fade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          50% {
            transform: translate(-50%, 5px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0);
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

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slide-up-fade {
          animation: slide-up-fade 0.3s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </>
  );
}
