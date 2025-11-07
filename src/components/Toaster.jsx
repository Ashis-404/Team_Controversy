import React, { useState, useEffect, createContext, useContext } from 'react';
const ToastContext = createContext();
export function useToast() { return useContext(ToastContext); }
export function ToastProvider({children}) {
  const [toasts, setToasts] = useState([]);
  function push(text, ttl=4000) {
    const id = Date.now();
    setToasts(t => [...t, {id, text}]);
    setTimeout(()=> setToasts(t => t.filter(x => x.id !== id)), ttl);
  }
  return (
    <ToastContext.Provider value={{push}}>
      {children}
      <div style={{position:'fixed', right:16, top:16, zIndex:9999}}>
        {toasts.map(t=> (
          <div key={t.id} style={{marginBottom:8, background:'#222', color:'#fff', padding:'8px 12px', borderRadius:6, boxShadow:'0 2px 6px rgba(0,0,0,0.3)'}}>
            {t.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}