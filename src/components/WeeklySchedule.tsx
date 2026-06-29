import React, { useState } from 'react';
import { MapPin, Users, Clock, CheckCircle2, Bookmark, FlameKindling, FileBadge, Play } from 'lucide-react';
import { ClassSchedule } from '../types';

interface WeeklyScheduleProps {
  schedules: ClassSchedule[];
  onClassClick?: (schedule: ClassSchedule) => void;
}

export default function WeeklySchedule({ schedules, onClassClick }: WeeklyScheduleProps) {
  const [selectedDay, setSelectedDay] = useState<'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex'>('Seg');

  const days: { key: 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex'; label: string; date: string }[] = [
    { key: 'Seg', label: 'Seg', date: '08/06' },
    { key: 'Ter', label: 'Ter', date: '09/06' },
    { key: 'Qua', label: 'Qua', date: '10/06' },
    { key: 'Qui', label: 'Qui', date: '11/06' },
    { key: 'Sex', label: 'Sex', date: '12/06' }
  ];

  const activeSchedules = schedules.filter(s => s.dayOfWeek === selectedDay);

  return (
    <div className="mt-6 px-5 pb-4">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Grade semanal de aulas</h3>
        <span className="text-[10px] font-bold text-[#0066cc] bg-[#0066cc]/8 px-2 py-0.5 rounded-full">
          {activeSchedules.length} aulas hoje
        </span>
      </div>

      {/* Horizontal Seletor de Dias da Semana */}
      <div className="flex bg-slate-100 p-1 rounded-2xl mb-4 text-slate-700">
        {days.map((day) => {
          const isActive = selectedDay === day.key;
          return (
            <button
              key={day.key}
              onClick={() => setSelectedDay(day.key)}
              className={`flex-1 py-2.5 rounded-xl text-center transition-all cursor-pointer ${
                isActive 
                  ? 'bg-white shadow-xs text-[#0f172b] font-bold' 
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <span className="block text-xs leading-none">{day.label}</span>
              <span className="block text-[8px] opacity-60 mt-1 font-mono tracking-tighter">{day.date}</span>
            </button>
          );
        })}
      </div>

      {/* Verical dynamic Schedule List */}
      <div id="weekly_schedule_list" className="space-y-3.5">
        {activeSchedules.length === 0 ? (
          <div className="bg-white border border-[#e2e8f0]/80 rounded-2xl py-12 text-center px-4">
            <div className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300 mb-2">
              <span className="text-xs">💤</span>
            </div>
            <p className="text-xs font-bold text-[#0f172b]">Sem aulas programadas</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Aproveite para planejar seus conteúdos de sala.</p>
          </div>
        ) : (
          activeSchedules.map((item) => (
            <div 
              key={item.id}
              onClick={onClassClick ? () => onClassClick(item) : undefined}
              className={`bg-white border border-[#e2e8f0] rounded-2xl p-4 transition-all shadow-2xs group relative overflow-hidden ${
                onClassClick ? 'hover:border-slate-300 active:scale-[0.99] cursor-pointer' : ''
              }`}
            >
              {/* Status color bar */}
              <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                item.confirmed ? 'bg-[#0066cc]' : 'bg-[#e7000b]'
              }`}></div>

              <div className="flex justify-between items-start gap-2 pl-1.5">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tight block">
                    {item.code}
                  </span>
                  <h4 className="text-xs font-bold text-[#0f172b] mt-0.5 leading-snug group-hover:text-[#0066cc] transition-colors">
                    {item.discipline}
                  </h4>
                  
                  {/* Subject tags */}
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {item.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold font-mono bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                      <MapPin className="w-3 h-3 text-[#0066cc] shrink-0" />
                      {item.room}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                      <Users className="w-3 h-3 text-slate-300 shrink-0" />
                      {item.studentsCount} inscritos
                    </span>
                  </div>
                </div>

                {/* Confirm indicator / quick action */}
                <div className="text-right shrink-0">
                  <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                    item.confirmed 
                      ? 'bg-[#0066cc]/8 text-[#0066cc] border-[#0066cc]/15' 
                      : 'bg-[#e7000b]/8 text-[#e7000b] border-[#e7000b]/15'
                  }`}>
                    {item.confirmed ? 'Confirmado' : 'Pendente'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
