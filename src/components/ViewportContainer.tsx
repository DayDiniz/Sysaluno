import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface ViewportContainerProps {
  children: React.ReactNode;
}

export default function ViewportContainer({ children }: ViewportContainerProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 flex justify-center items-center bg-slate-950 font-sans selection:bg-[#0066cc]/20">
      {/* Phone Mockup Frame */}
      <div 
        id="phone_view_container"
        className="w-full max-w-[430px] h-[870px] bg-gradient-to-b from-[#0066cc]/12 via-white to-slate-50 rounded-[48px] shadow-2xl border-[11px] border-slate-900 overflow-hidden flex flex-col relative"
      >
        {/* Dynamic Status Bar */}
        <div className="h-11 bg-white/95 backdrop-blur-md px-6 pt-3 flex justify-between items-center z-40 select-none border-b border-[#e2e8f0] shrink-0 text-slate-800 text-xs font-semibold">
          <span className="font-medium tracking-tight h-4 flex items-center">
            {time || '14:20'}
          </span>
          
          {/* Dynamic Speaker / Camera cutout notch */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-28 h-[18px] bg-slate-950 rounded-full flex items-center justify-center">
            <div className="w-10 h-1 bg-neutral-800 rounded-full mr-2"></div>
            <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full border border-neutral-800"></div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-800">
            <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
            <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] scale-90 origin-right">98%</span>
              <Battery className="w-4 h-4 stroke-[2]" />
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-b from-[#0066cc]/10 via-white to-[#f8fafc]">
          {children}
        </div>
      </div>
    </div>
  );
}
