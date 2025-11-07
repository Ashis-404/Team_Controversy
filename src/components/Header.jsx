import React from 'react';
import { t } from '../i18n';

export default function Header({ title = 'Home', ambulanceUpdate, lang = 'en', onLangChange, onOpenChat, onOpenAssist, onOpenSOS }) {
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

      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <select value={lang} onChange={e => onLangChange?.(e.target.value)} style={{padding:6}}>
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="bn">বাংলা</option>
        </select>

        <button onClick={onOpenChat} style={{padding:'6px 10px'}}> {t('chatSupport', lang)} </button>
        <button onClick={onOpenAssist} style={{padding:'6px 10px'}}> {t('ambuAssist', lang)} </button>
        <button onClick={onOpenSOS} style={{padding:'6px 10px', background:'#ff4b4b', color:'#fff'}}>SOS</button>
      </div>
    </header>
  );
}