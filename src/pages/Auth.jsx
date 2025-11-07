import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [mode, setMode] = useState('signin'); // or 'signup'
  const [form, setForm] = useState({email:'', password:'', name:''});
  const navigate = useNavigate?.() ?? null;

  function submit(e) {
    e?.preventDefault?.();
    // no backend: simulate success and redirect to home
    alert(`${mode === 'signin' ? 'Signed in' : 'Account created'} (simulated)`);
    try { if (navigate) navigate('/'); else window.location.href = '/'; } catch(e){ window.location.href = '/'; }
  }

  return (
    <div style={{maxWidth:520, margin:'24px auto', padding:16, border:'1px solid #eee', borderRadius:8}}>
      <h3>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h3>
      <form onSubmit={submit}>
        {mode === 'signup' && (
          <div style={{marginBottom:8}}>
            <input placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} style={{width:'100%', padding:8}} />
          </div>
        )}
        <div style={{marginBottom:8}}>
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} style={{width:'100%', padding:8}} />
        </div>
        <div style={{marginBottom:12}}>
          <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} style={{width:'100%', padding:8}} />
        </div>
        <div style={{display:'flex', gap:8}}>
          <button type="submit" style={{padding:'8px 12px', background:'#007bff', color:'#fff', border:0}}>{mode === 'signin' ? 'Sign in' : 'Create account'}</button>
          <button type="button" onClick={()=>setMode(mode === 'signin' ? 'signup' : 'signin')} style={{padding:'8px 12px'}}>Switch to {mode === 'signin' ? 'Sign up' : 'Sign in'}</button>
        </div>
      </form>
    </div>
  );
}