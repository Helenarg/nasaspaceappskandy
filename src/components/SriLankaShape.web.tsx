import React from 'react';

export default function SriLankaShape() {
  return (
    <div style={{ width: 280, height: 420, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width="280" height="420" viewBox="0 0 280 450" style={{ overflow: 'visible', position: 'absolute' }}>
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path 
          d="
            M 120,20 Q 150,15 160,40 Q 130,55 115,40 Q 110,30 120,20 Z
            M 95,45 Q 105,40 110,50 Q 100,55 95,45 Z
            M 130,65 
            Q 160,80 170,120 
            Q 185,150 205,180 
            Q 240,230 235,280 
            Q 220,340 170,390 
            Q 110,430 60,390 
            Q 25,350 25,290 
            Q 25,220 40,160 
            Q 45,130 70,120 
            Q 100,105 110,85 
            Q 120,70 130,65 Z
            M 20,135 Q 45,125 55,140 Q 35,150 20,135 Z
          " 
          fill="none" 
          stroke="#00FFFF" 
          strokeWidth="2.5" 
          strokeDasharray="6,8"
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
}
