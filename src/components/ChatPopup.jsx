import React, { useState } from 'react';

const BOT_PRE = [
  "We’ve alerted the nearest hospital.",
  "Help is on the way!",
  "Please stay calm and provide any first-aid if possible."
];

export default function ChatPopup({ open, onClose }) {
  const [messages, setMessages] = useState(BOT_PRE.map(t => ({ from: 'bot', text: t })));
  const [text, setText] = useState('');
  if (!open) return null;
  function send() {
    if (!text) return;
    setMessages(m => [...m, { from: 'user', text }]);
    // bot echo
    setTimeout(() => setMessages(m => [...m, { from: 'bot', text: "Support: We'll update you shortly." }]), 800);
    setText('');
  }
  return (
    <div style={{ position: 'fixed', right: 16, bottom: 16, width: 320, zIndex: 10000, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
      <div style={{ background: '#fff', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: 8, background: '#007bff', color: '#fff' }}>Chat with Support <button onClick={onClose} style={{ float: 'right' }}>X</button></div>
        <div style={{ maxHeight: 240, overflow: 'auto', padding: 8, background: '#f7f7f7' }}>
          {messages.map((m, i) => <div key={i} style={{ margin: '6px 0', textAlign: m.from === 'bot' ? 'left' : 'right' }}><div style={{ display: 'inline-block', background: m.from === 'bot' ? '#eee' : '#007bff', color: m.from === 'bot' ? '#000' : '#fff', padding: '6px 10px', borderRadius: 8 }}>{m.text}</div></div>)}
        </div>
        <div style={{ display: 'flex', padding: 8, gap: 8 }}>
          <input value={text} onChange={e => setText(e.target.value)} style={{ flex: 1, padding: 8 }} placeholder="Type..." />
          <button onClick={send} style={{ padding: '8px 12px' }}>Send</button>
        </div>
      </div>
    </div>
  );
}