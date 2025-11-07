import { Ambulance, Heart, PhoneCall, Zap } from 'lucide-react';

interface HomePageProps {
  onModeSelect: (mode: 'standard' | 'sos') => void;
}

export default function HomePage({ onModeSelect }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Ambulance className="w-16 h-16 text-red-600" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Ambu<span className="text-red-600">Quick</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Emergency medical response at your fingertips. Every second counts.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <button
            onClick={() => onModeSelect('standard')}
            className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 md:p-12 overflow-hidden border-2 border-transparent hover:border-blue-500 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <PhoneCall className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Standard Booking</h2>
              <p className="text-gray-600 text-lg mb-6">
                Schedule an ambulance with complete details for planned or non-critical transport
              </p>
              <ul className="text-left space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  Choose ambulance type
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  Set pickup & destination
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  Track in real-time
                </li>
              </ul>
              <div className="mt-8 text-blue-600 font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                Book Now
                <span className="text-2xl">→</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => onModeSelect('sos')}
            className="group relative bg-gradient-to-br from-red-600 to-red-700 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 md:p-12 overflow-hidden transform hover:scale-105 animate-pulse-soft"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 text-white">
              <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">SOS Emergency</h2>
              <p className="text-red-50 text-lg mb-6">
                One-tap emergency booking for critical situations. Immediate dispatch with auto-location
              </p>
              <ul className="text-left space-y-3 text-red-50">
                <li className="flex items-center gap-2">
                  <Heart className="w-5 h-5 animate-pulse" />
                  Instant booking
                </li>
                <li className="flex items-center gap-2">
                  <Heart className="w-5 h-5 animate-pulse" />
                  Auto-location detection
                </li>
                <li className="flex items-center gap-2">
                  <Heart className="w-5 h-5 animate-pulse" />
                  Priority dispatch
                </li>
              </ul>
              <div className="mt-8 bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg group-hover:bg-red-50 transition-colors duration-300 inline-block">
                SOS
              </div>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: PhoneCall, title: 'Book', desc: 'Choose mode & enter details' },
              { icon: Ambulance, title: 'Assign', desc: 'Nearest ambulance dispatched' },
              { icon: Zap, title: 'Track', desc: 'Real-time location tracking' },
              { icon: Heart, title: 'Arrive', desc: 'Help reaches you quickly' },
            ].map((step, idx) => (
              <div key={idx} className="text-center group hover:transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-red-50 to-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300">
                  <step.icon className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        @keyframes pulse-soft {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4);
          }
          50% {
            box-shadow: 0 0 0 20px rgba(220, 38, 38, 0);
          }
        }

        .animate-pulse-soft {
          animation: pulse-soft 2s infinite;
        }
      `}</style>
    </div>
  );
}
