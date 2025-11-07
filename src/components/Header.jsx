import React from 'react';

export default function Header({ title = 'Home', ambulanceUpdate }) {
  return (
    <header style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:12, background:'#fff', borderBottom:'1px solid #eee'}}>
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <div style={{fontWeight:700}}>{title}</div>
        {ambulanceUpdate && (
          <div style={{background:'#ffefc2', color:'#6a4b00', padding:'6px 10px', borderRadius:20, fontSize:13}}>
            🚑 {ambulanceUpdate}
          </div>
        )}
      </div>
      <nav>
        <a href="/auth" style={{marginRight:12}}>Sign in</a>
      </nav>
    </header>
  );
}