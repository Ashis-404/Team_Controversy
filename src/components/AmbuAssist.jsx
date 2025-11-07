import React, { useState } from 'react';
export default function AmbuAssist({open, onClose, onDispatch}) {
  const qs = [
    {id:'conscious', q:'Is the patient conscious?', type:'yesno'},
    {id:'bleeding', q:'Is bleeding visible?', type:'yesno'},
    {id:'location', q:'Can you share your exact location?', type:'text'}
  ];
  const [answers, setAnswers] = useState({});
  if(!open) return null;
  function setAns(id, v) { setAnswers(a=>({...a, [id]: v })); }
  function finish() {
    // simple rule-based response
    let resp = "Dispatching basic ambulance...";
    if(answers.conscious === 'no' || answers.bleeding === 'yes') resp = "Dispatching ICU ambulance...";
    onDispatch && onDispatch(resp);
    onClose && onClose();
  }
  return (
    <div style={{position:'fixed', left:16, bottom:16, width:360, zIndex:10000}}>
      <div style={{background:'#fff', borderRadius:10, boxShadow:'0 12px 40px rgba(0,0,0,0.12)', overflow:'hidden'}}>
        <div style={{padding:10, background:'#222', color:'#fff'}}>AmbuAssist</div>
        <div style={{padding:10}}>
          {qs.map(q=> (
            <div key={q.id} style={{marginBottom:8}}>
              <div style={{fontWeight:600}}>{q.q}</div>
              {q.type==='yesno' ? (
                <div style={{marginTop:6}}>
                  <button onClick={()=>setAns(q.id,'yes')} style={{marginRight:6}}>Yes</button>
                  <button onClick={()=>setAns(q.id,'no')}>No</button>
                </div>
              ) : (
                <input onChange={e=>setAns(q.id,e.target.value)} style={{width:'100%', padding:8, marginTop:6}} />
              )}
            </div>
          ))}
          <div style={{display:'flex', gap:8}}>
            <button onClick={finish} style={{background:'#007bff', color:'#fff', padding:'8px 12px'}}>Submit</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}