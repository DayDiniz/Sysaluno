import React from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Filter } from 'lucide-react';
import { StudentClassItem } from '../../../types';

interface StudentAgendaTabProps {
  classes: StudentClassItem[];
  onClassClick: (item: StudentClassItem) => void;
}

export const StudentAgendaTab: React.FC<StudentAgendaTabProps> = ({ classes, onClassClick }) => {
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

  return (
    <div className="px-6 py-6 pb-28">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#0f172b]">Agenda Semanal</h2>
        <button className="p-2 rounded-xl bg-white border border-[#e2e8f0] text-slate-600 shadow-2xs">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
        {days.map((day, i) => (
          <button
            key={day}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-center transition-all ${
              i === 2 // Qua ativo hoje
                ? 'bg-[#009966] text-white font-bold shadow-md shadow-[#009966]/20'
                : 'bg-white border border-[#e2e8f0] text-slate-600 font-medium'
            }`}
          >
            <div className="text-3xs uppercase opacity-70">Jun</div>
            <div className="text-sm font-bold">{22 + i}</div>
            <div className="text-3xs mt-0.5">{day}</div>
          </button>
        ))}
      </div>

      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
        Disciplinas de Quarta-feira
      </h3>

      <div className="space-y-3">
        {classes.map((item) => (
          <div
            key={item.id}
            onClick={() => onClassClick(item)}
            className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs cursor-pointer hover:border-[#009966] transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold text-[#009966]">{item.time}</span>
              <span className="text-3xs font-semibold text-slate-400">{item.code}</span>
            </div>
            <h4 className="text-sm font-bold text-[#0f172b]">{item.discipline}</h4>
            <p className="text-xs text-slate-500 mt-1">Prof. {item.professor} • {item.room}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
