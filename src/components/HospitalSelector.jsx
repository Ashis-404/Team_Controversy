import React, { useEffect, useState } from 'react';
import { haversineDistance, estimateETAKm } from '../utils/location';
import { useToast } from './Toaster';

export default function HospitalSelector({ userPos, onSelect }) {
  const [hospitals, setHospitals] = useState([]);
  const [selected, setSelected] = useState(null);
  const toast = useToast();

  useEffect(()=> {
    fetch('/static/hospitals.json').then(r=> r.json()).then(setHospitals);
  },[]);

  function pick(h) {
    setSelected(h);
    const dist = haversineDistance([userPos.lat, userPos.lng], [h.lat, h.lng]);
    const eta = estimateETAKm(dist);
    toast.push(`Ambulance assigned! ETA: ${eta} mins`);
    if (onSelect) onSelect({...h, distanceKm: dist.toFixed(2), eta});
  }

  return (
    <div style={{padding:12, border:'1px solid #eee', borderRadius:8}}>
      <h4>Nearby Hospitals Available</h4>
      {hospitals.map(h=> {
        const dist = userPos ? haversineDistance([userPos.lat, userPos.lng], [h.lat, h.lng]) : null;
        const eta = dist ? estimateETAKm(dist) : null;
        return (
          <div key={h.id} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', alignItems:'center', borderBottom:'1px solid #fafafa'}}>
            <div>
              <div style={{fontWeight:600}}>{h.name}</div>
              <div style={{fontSize:12, color:'#666'}}>{dist ? `${dist.toFixed(2)} km • ETA ${eta} mins` : h.contact}</div>
            </div>
            <button onClick={()=> pick(h)} style={{background:'#007bff', color:'#fff', border:0, padding:'6px 10px', borderRadius:6}}>Select Hospital</button>
          </div>
        );
      })}
    </div>
  );
}