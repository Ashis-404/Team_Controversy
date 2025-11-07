import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingPage({ onAmbulanceUpdate }) {
  const navigate = useNavigate?.() ?? null;

  function goHome() {
    try { if (navigate) { navigate('/'); return; } } catch(e){}
    window.location.href = '/';
  }

  function assignAmbulance() {
    // simulate ambulance assignment and notify header
    const msg = 'Ambulance assigned! ETA 5 mins';
    onAmbulanceUpdate && onAmbulanceUpdate(msg);
    // also trigger a toast via window (App will show toast)
    const evt = new CustomEvent('app:ambulance-update', { detail: msg });
    window.dispatchEvent(evt);
  }

  return (
    <div style={{padding:16}}>
      <h2>Booking</h2>
      <div style={{margin:'12px 0'}}>
        <button onClick={assignAmbulance} style={{padding:'8px 12px', background:'#28a745', color:'#fff', border:0, borderRadius:6}}>Assign Ambulance (simulate)</button>
      </div>
      <div style={{marginTop:12, display:'flex', gap:8}}>
        <button onClick={goHome} style={{padding:'8px 12px', background:'#007bff', color:'#fff', border:0, borderRadius:6}}>Back to Home</button>
      </div>
    </div>
  );
}