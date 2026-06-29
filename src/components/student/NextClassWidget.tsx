import React, { useState, useEffect } from 'react';
import { Clock, MapPin, ChevronRight, AlertCircle } from 'lucide-react';
import { StudentClassItem } from '../../types';

interface NextClassWidgetProps {
  nextClass: StudentClassItem;
  onClassClick: (item: StudentClassItem) => void;
}

export const NextClassWidget: React.FC<NextClassWidgetProps> = ({
  nextClass,
  onClassClick
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60); // 15 minutos em segundos

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    if (mins === 0 && secs === 0) return "Começando agora";
    return `${mins} min e ${secs < 10 ? '0' : ''}${secs}s`;
  };

  return (
    <section className="mt-6 px-6">
      <div
        onClick={() => onClassClick(nextClass)}
        className="group relative p-5 rounded-3xl bg-[#0f172b] text-white shadow-lg shadow-[#0f172b]/15 overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-300"
      >
        {/* Glow animado no background */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl group-hover:bg-[#009966]/30 transition-colors duration-500" />
        
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide">
            <Clock className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Próxima aula</span>
          </div>

          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30">
            ⏳ {formatCountdown(secondsRemaining)}
          </span>
        </div>

        <div className="relative z-10 mb-4">
          <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
            {nextClass.discipline}
          </h4>
          <p className="text-xs text-slate-300 font-medium mt-0.5">
            Prof. {nextClass.professor} • <span className="font-mono text-slate-400">{nextClass.code}</span>
          </p>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between relative z-10 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#e17100]" />
            <span className="font-semibold text-white">{nextClass.block}</span>
            <span>-</span>
            <span>{nextClass.room}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>Ver detalhes</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};
