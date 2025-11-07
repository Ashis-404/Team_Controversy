import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import BookingPage from './pages/BookingPage';
import SOSPage from './pages/SOSPage';
import Auth from './pages/Auth';
import Home from './pages/Home';
import { ToastProvider, useToast } from './components/Toaster';
import ChatPopup from './components/ChatPopup';
import AmbuAssist from './components/AmbuAssist';

// small helper component to listen to window events and show toast
function ToastListener({ onUpdate }) {
  const toast = useToast();
  useEffect(() => {
    function h(e) {
      const msg = e?.detail || 'Ambulance update';
      toast.push(msg);
      onUpdate && onUpdate(msg);
    }
    window.addEventListener('app:ambulance-update', h);
    return () => window.removeEventListener('app:ambulance-update', h);
  }, [toast, onUpdate]);
  return null;
}

function InnerApp({
  ambulanceUpdate,
  setAmbulanceUpdate,
  lang,
  setLang,
  chatOpen,
  setChatOpen,
  assistOpen,
  setAssistOpen,
}) {
  const navigate = useNavigate();

  // expose fallback for any legacy code
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.appBackToHome = () => {
      navigate('/');
      setAmbulanceUpdate('');
    };
  }, [navigate, setAmbulanceUpdate]);

  function handleBookingUpdate(msg) {
    setAmbulanceUpdate(msg);
    window.dispatchEvent(new CustomEvent('app:ambulance-update', { detail: msg }));
  }

  return (
    <>
      <Header
        title="Project Bolt"
        ambulanceUpdate={ambulanceUpdate}
        lang={lang}
        onLangChange={setLang}
        onOpenChat={() => setChatOpen(true)}
        onOpenAssist={() => setAssistOpen(true)}
        onOpenSOS={() => navigate('/sos')}
      />

      <ToastListener onUpdate={setAmbulanceUpdate} />

      <main style={{ padding: 12 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/booking"
            element={
              <BookingPage
                onAmbulanceUpdate={(m) => {
                  handleBookingUpdate(m);
                }}
              />
            }
          />
          <Route path="/sos" element={<SOSPage />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>

      {/* global chat + AmbuAssist — mounted so header buttons open them */}
      <ChatPopup open={chatOpen} onClose={() => setChatOpen(false)} />
      <AmbuAssist
        open={assistOpen}
        onClose={() => setAssistOpen(false)}
        onDispatch={(resp) => {
          handleBookingUpdate(resp);
        }}
      />
    </>
  );
}

export default function App() {
  const [ambulanceUpdate, setAmbulanceUpdate] = useState('');
  const [lang, setLang] = useState('en');
  const [chatOpen, setChatOpen] = useState(false);
  const [assistOpen, setAssistOpen] = useState(false);

  return (
    <ToastProvider>
      <Router>
        <InnerApp
          ambulanceUpdate={ambulanceUpdate}
          setAmbulanceUpdate={setAmbulanceUpdate}
          lang={lang}
          setLang={setLang}
          chatOpen={chatOpen}
          setChatOpen={setChatOpen}
          assistOpen={assistOpen}
          setAssistOpen={setAssistOpen}
        />
      </Router>
    </ToastProvider>
  );
}