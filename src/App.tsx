import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import StandardBooking from './components/StandardBooking';
import SOSBooking from './components/SOSBooking';
import TrackingMap from './components/TrackingMap';
import CompletionScreen from './components/CompletionScreen';
import SimulationControls from './components/SimulationControls';
import { supabase } from './lib/supabase';
import type { Booking, Ambulance, BookingFormData } from './lib/types';

type AppView = 'home' | 'standard' | 'sos' | 'tracking' | 'completed';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [assignedAmbulance, setAssignedAmbulance] = useState<Ambulance | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleModeSelect = (mode: 'standard' | 'sos') => {
    if (mode === 'standard') {
      setCurrentView('standard');
    } else {
      setCurrentView('sos');
    }
  };

  const createBooking = async (formData: BookingFormData, bookingType: 'standard' | 'sos') => {
    try {
      const { data: availableAmbulances } = await supabase
        .from('ambulances')
        .select('*')
        .eq('is_available', true)
        .eq('ambulance_type', formData.ambulance_type)
        .limit(1)
        .maybeSingle();

      let selectedAmbulance = availableAmbulances;

      if (!selectedAmbulance) {
        const { data: anyAmbulance } = await supabase
          .from('ambulances')
          .select('*')
          .limit(1)
          .maybeSingle();
        selectedAmbulance = anyAmbulance;
      }

      const { data: booking, error } = await supabase
        .from('bookings')
        .insert({
          booking_type: bookingType,
          patient_name: formData.patient_name,
          contact_number: formData.contact_number,
          pickup_location: formData.pickup_location,
          destination: formData.destination,
          ambulance_type: formData.ambulance_type,
          status: 'pending',
          ambulance_id: selectedAmbulance?.id || null,
          eta_minutes: Math.floor(Math.random() * 10) + 3,
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentBooking(booking);
      setAssignedAmbulance(selectedAmbulance);
      setCurrentView('tracking');
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const handleStandardBookingSubmit = (formData: BookingFormData) => {
    createBooking(formData, 'standard');
  };

  const handleSOSConfirm = () => {
    const emergencyData: BookingFormData = {
      patient_name: 'Emergency Patient',
      contact_number: '+91-Emergency',
      pickup_location: 'Auto-detected location (28.7041°N, 77.1025°E)',
      destination: 'Nearest Hospital',
      ambulance_type: 'basic',
    };
    createBooking(emergencyData, 'sos');
  };

  const handleCompleteTrip = async () => {
    if (!currentBooking) return;

    try {
      await supabase
        .from('bookings')
        .update({ status: 'completed' })
        .eq('id', currentBooking.id);

      setCurrentView('completed');
    } catch (error) {
      console.error('Error completing trip:', error);
    }
  };

  const handleCancelBooking = async () => {
    if (!currentBooking) return;

    try {
      await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', currentBooking.id);

      setCurrentView('home');
      setCurrentBooking(null);
      setAssignedAmbulance(null);
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setCurrentBooking(null);
    setAssignedAmbulance(null);
  };

  const handleSimulateArrival = async () => {
    if (!currentBooking) return;

    try {
      const { data } = await supabase
        .from('bookings')
        .update({ status: 'arrived', eta_minutes: 0 })
        .eq('id', currentBooking.id)
        .select()
        .single();

      if (data) {
        setCurrentBooking(data);
      }
    } catch (error) {
      console.error('Error simulating arrival:', error);
    }
  };

  const handleToggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    document.title = 'AmbuQuick - Emergency Response System';
  }, []);

  return (
    <div className={isDarkTheme ? 'dark-theme' : ''}>
      {currentView === 'home' && <HomePage onModeSelect={handleModeSelect} />}

      {currentView === 'standard' && (
        <StandardBooking onSubmit={handleStandardBookingSubmit} onBack={handleBackToHome} />
      )}

      {currentView === 'sos' && <SOSBooking onConfirm={handleSOSConfirm} onBack={handleBackToHome} />}

      {currentView === 'tracking' && currentBooking && (
        <>
          <TrackingMap
            booking={currentBooking}
            ambulance={assignedAmbulance}
            onComplete={handleCompleteTrip}
            onCancel={handleCancelBooking}
          />
          <SimulationControls
            onSimulateArrival={handleSimulateArrival}
            onToggleTheme={handleToggleTheme}
            isDarkTheme={isDarkTheme}
          />
        </>
      )}

      {currentView === 'completed' && currentBooking && (
        <CompletionScreen booking={currentBooking} onBackToHome={handleBackToHome} />
      )}

      <style>{`
        .dark-theme {
          filter: invert(1) hue-rotate(180deg);
        }

        .dark-theme img,
        .dark-theme video {
          filter: invert(1) hue-rotate(180deg);
        }
      `}</style>
    </div>
  );
}

export default App;
