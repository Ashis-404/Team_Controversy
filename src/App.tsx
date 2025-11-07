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

  // Notification state for header
  const [ambulanceUpdate, setAmbulanceUpdate] = useState<string>('');

  // Use an untyped handle to bypass TS `never` issues from a missing Database schema
  const sb = supabase as any;

  const handleModeSelect = (mode: 'standard' | 'sos') => {
    if (mode === 'standard') {
      setCurrentView('standard');
    } else {
      setCurrentView('sos');
    }
  };

  const createBooking = async (formData: BookingFormData, bookingType: 'standard' | 'sos') => {
    try {
      const { data: availableAmbulances } = await sb
        .from('ambulances')
        .select('*')
        .eq('is_available', true)
        .eq('ambulance_type', formData.ambulance_type)
        .limit(1)
        .maybeSingle();

      let selectedAmbulance: any = availableAmbulances;

      if (!selectedAmbulance) {
        const { data: anyAmbulance } = await sb
          .from('ambulances')
          .select('*')
          .limit(1)
          .maybeSingle();
        selectedAmbulance = anyAmbulance;
      }

      const { data: booking, error } = await sb
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

      const typedBooking = booking as unknown as Booking;
      setCurrentBooking(typedBooking);
      setAssignedAmbulance((selectedAmbulance || null) as Ambulance | null);

      // update header notification (ETA from booking if available)
      setAmbulanceUpdate(
        typedBooking?.eta_minutes != null
          ? `Ambulance assigned • ETA ${typedBooking.eta_minutes} mins`
          : 'Ambulance assigned'
      );

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
      await sb
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
      await sb
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', currentBooking.id);

      setCurrentView('home');
      setCurrentBooking(null);
      setAssignedAmbulance(null);
      setAmbulanceUpdate('');
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setCurrentBooking(null);
    setAssignedAmbulance(null);
    setAmbulanceUpdate('');
  };

  const handleSimulateArrival = async () => {
    if (!currentBooking) return;

    try {
      const { data } = await sb
        .from('bookings')
        .update({ status: 'arrived', eta_minutes: 0 })
        .eq('id', currentBooking.id)
        .select()
        .single();

      if (data) {
        setCurrentBooking(data as unknown as Booking);
        // arrival notification
        setAmbulanceUpdate('Ambulance has reached');
        // small vibration attempt for mobile
        if (navigator?.vibrate) navigator.vibrate?.([200, 100, 200]);
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
    // expose fallback for components that didn't receive onBack prop
    // some older components may call window.appBackToHome()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.appBackToHome = handleBackToHome;
  }, []);

  return (
    <div className={isDarkTheme ? 'dark-theme' : ''}>
      {/* Simple header showing notification + quick controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderBottom: '1px solid #eee', background: '#fff' }}>
        <div style={{ fontWeight: 700 }}>AmbuQuick</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {ambulanceUpdate ? (
            <div style={{ background: '#ffefc2', color: '#6a4b00', padding: '6px 10px', borderRadius: 20, fontSize: 13 }}>
              🚑 {ambulanceUpdate}
            </div>
          ) : null}
          {/* Back to home for convenience */}
          <button onClick={handleBackToHome} style={{ padding: '6px 10px' }}>Back to Home</button>
        </div>
      </div>

      {/* Main content */}
      <div>
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
      </div>

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
