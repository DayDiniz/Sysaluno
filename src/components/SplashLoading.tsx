import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, RotateCw } from 'lucide-react';

interface SplashLoadingProps {
  onComplete?: () => void;
  replayKey?: number;
  standalone?: boolean;
}

export default function SplashLoading({ onComplete, replayKey = 0, standalone = false }: SplashLoadingProps) {
  const [stage, setStage] = useState<'typing' | 'capFalling' | 'completed'>('typing');
  const [internalKey, setInternalKey] = useState(0);

  useEffect(() => {
    // Reset stages on key changes
    setStage('typing');
    
    // Stage transitions:
    // 1. Text reveals from 0s to 1.8s
    const capTimer = setTimeout(() => {
      setStage('capFalling');
    }, 1800);

    // 2. Cap falls and settles by 3.6s
    const completeTimer = setTimeout(() => {
      setStage('completed');
      if (onComplete && !standalone) {
        onComplete();
      }
    }, 4200);

    return () => {
      clearTimeout(capTimer);
      clearTimeout(completeTimer);
    };
  }, [replayKey, internalKey, onComplete, standalone]);

  const handleReplay = () => {
    setInternalKey(prev => prev + 1);
  };

  return (
    <div 
      className="absolute inset-0 bg-[#0b111e] flex flex-col justify-between p-6 overflow-hidden select-none z-50 font-sans"
      id="splash_container"
    >
      {/* Top bar with faint control utilities */}
      <div className="flex justify-between items-center w-full z-10 pt-4">
        <span className="text-[9px] font-mono font-bold tracking-widest text-[#0066cc]/50 uppercase">
          SYSCLASS ENGINE v4.2
        </span>
        
        {standalone ? (
          <button
            onClick={handleReplay}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-300 hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCw className="w-3 h-3 text-[#0066cc]" />
            Replay
          </button>
        ) : (
          <button
            onClick={onComplete}
            className="text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-white transition-colors cursor-pointer bg-white/5 border border-white/10 px-3 py-1 rounded-full active:scale-95"
          >
            Pular
          </button>
        )}
      </div>

      {/* Main Core Animation Box */}
      <div className="flex-grow flex flex-col justify-center items-center relative">
        
        {/* Glow effect matching the video atmosphere */}
        <div className="absolute w-72 h-72 bg-[#0066cc]/10 rounded-full blur-3xl -z-10 animate-pulse" />

        {/* Branding Container containing both text and falling cap */}
        <div className="relative flex flex-col items-center justify-center pt-10 select-none pb-4" key={`${replayKey}-${internalKey}`}>
          
          {/* Falling Graduation Cap with physical landing properties */}
          <div 
            className="absolute top-[-36px] left-[52%] -translate-x-1/2 z-25 pointer-events-none"
            style={{
              animation: 'cap-fall 1.8s cubic-bezier(0.175, 0.885, 0.32, 1.2) forwards',
              animationDelay: '1.6s',
              opacity: 0, // starts hidden, handled by keyframe
            }}
          >
            <svg 
              viewBox="0 0 120 120" 
              className="w-24 h-24 drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] select-none pointer-events-none"
            >
              <defs>
                {/* 3D Gradients for Cap Surface */}
                <linearGradient id="capTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#434c5e" />
                  <stop offset="50%" stopColor="#252b37" />
                  <stop offset="100%" stopColor="#141820" />
                </linearGradient>
                <linearGradient id="capBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1f2533" />
                  <stop offset="100%" stopColor="#0d1016" />
                </linearGradient>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffe47e" />
                  <stop offset="40%" stopColor="#e5aa17" />
                  <stop offset="100%" stopColor="#a07100" />
                </linearGradient>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.5"/>
                </filter>
              </defs>

              {/* Skull Cap / Base under the main diamond */}
              <path d="M 35,53 Q 60,65 85,53 L 85,67 Q 60,82 35,67 Z" fill="url(#capBaseGrad)" />
              <path d="M 35,67 Q 60,82 85,67 L 85,71 Q 60,86 35,71 Z" fill="#080a0f" />
              
              {/* Main Flat Top Diamond board (Mortarboard) */}
              <polygon points="60,26 112,46 60,66 8,46" fill="url(#capTopGrad)" stroke="#4b5563" strokeWidth="0.5" />
              
              {/* Lower lip shadow highlighting thickness */}
              <polygon points="8,46 60,66 60,70 8,50" fill="#0a0c12" />
              <polygon points="112,46 60,66 60,70 112,50" fill="#2d3443" />

              {/* Center button */}
              <ellipse cx="60" cy="46" rx="3.5" ry="2" fill="url(#goldGrad)" />

              {/* Tassel String & Pendant */}
              {/* Curved line swaying back leftward */}
              <path 
                d="M 60,46 Q 38,48 24,63" 
                stroke="url(#goldGrad)" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
                fill="none" 
                className="animate-tassel-sway"
                style={{ transformOrigin: '60px 46px' }}
              />
              {/* Tassel Fringe / Pendant dropping down */}
              <path 
                d="M 24,63 L 21,79 Q 23.5,82 25.5,79 L 28,63 Z" 
                fill="url(#goldGrad)" 
                className="animate-tassel-hang"
                style={{ transformOrigin: '24px 63px' }}
              />
            </svg>
          </div>

          {/* Lettering container with typewriter mask reveal */}
          <div className="flex items-center justify-center font-sans">
            <h1 
              className="text-[44px] font-black italic tracking-tighter uppercase select-none relative"
              style={{
                color: '#ffffff',
                WebkitTextStroke: '0.5px rgba(255,255,255,0.05)'
              }}
            >
              <span className="text-[#ffffff]">Sys</span>
              <span className="text-[#0066cc]">Class</span>
              
              {/* Slider Reveal Mask that creates the text emergence effect */}
              <div 
                className="absolute inset-y-0 right-0 bg-[#0b111e] z-10"
                style={{
                  animation: 'reveal-text 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                  animationDelay: '0.2s',
                  width: '100%',
                }}
              />
            </h1>
          </div>
          
        </div>
      </div>

      {/* Corporate Institutional footer matching design layout */}
      <div className="text-center pb-4 shrink-0 flex flex-col items-center space-y-1.5">
        <p className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-widest leading-none">
          © SysClass Educacional S.A.
        </p>
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] animate-ping" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        </div>
      </div>

      {/* Embedded dynamic CSS animation injections for portability */}
      <style>{`
        @keyframes reveal-text {
          0% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
        @keyframes cap-fall {
          0% {
            transform: translate(-50%, -240px) scale(1.15) rotate(-38deg);
            opacity: 0;
          }
          45% {
            transform: translate(-50%, -6px) scale(0.98) rotate(-16deg);
            opacity: 1;
          }
          60% {
            transform: translate(-50%, -18px) scale(1.01) rotate(6deg);
          }
          75% {
            transform: translate(-50%, -11px) scale(0.99) rotate(-8deg);
          }
          90% {
            transform: translate(-50%, -15px) scale(1) rotate(4deg);
          }
          100% {
            transform: translate(-50%, -14px) scale(1) rotate(-6deg);
            opacity: 1;
          }
        }
        @keyframes tassel-sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes tassel-hang {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(-5deg) translateY(0.5px); }
        }
        .animate-tassel-sway {
          animation: tassel-sway 3s ease-in-out infinite alternate;
          animation-delay: 2.2s;
        }
        .animate-tassel-hang {
          animation: tassel-hang 2.5s ease-in-out infinite alternate;
          animation-delay: 2.3s;
        }
        .animate-pulse-soft {
          animation: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
