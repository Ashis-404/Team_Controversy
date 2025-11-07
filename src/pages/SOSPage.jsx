import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SOSPage() {
  const navigate = useNavigate?.() ?? null;

  function goHome() {
    // prefer react-router navigation if available, fallback to history/back or root
    try {
      if (navigate) {
        navigate('/');
        return;
      }
    } catch(e) {}
    if (window.history && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  }

  return (
    <div style={{padding:16}}>
      <h2>SOS Mode</h2>
      <p style={{color:'#b00'}}>SOS active — UI flashing and heartbeat animation running</p>
      <div style={{marginTop:12}}>
        <button onClick={goHome} style={{padding:'8px 12px', background:'#007bff', color:'#fff', border:0, borderRadius:6}}>Back to Home</button>
      </div>
    </div>
  );
}