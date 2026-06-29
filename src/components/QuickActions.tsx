import React from 'react';
import { CalendarClock, CheckSquare, Clock } from 'lucide-react';

interface QuickActionsProps {
  onActionSelect: (actionType: 'ponto' | 'disponibilidade' | 'carga') => void;
}

export default function QuickActions({ onActionSelect }: QuickActionsProps) {
  const actions = [
    {
      id: 'ponto',
      title: 'Registrar ponto',
      subtitle: 'Check-in/out',
      icon: Clock,
      color: 'hover:border-[#0066cc]/40 dark:hover:border-[#0066cc]/40',
      iconColor: 'text-[#0066cc]',
      bgIcon: 'bg-[#0066cc]/5 border-[#0066cc]/10'
    },
    {
      id: 'disponibilidade',
      title: 'Disponibilidade',
      subtitle: 'Informar horários',
      icon: CalendarClock,
      color: 'hover:border-[#0f172b]/40',
      iconColor: 'text-[#0f172b]',
      bgIcon: 'bg-[#0f172b]/5 border-[#0f172b]/10'
    },
    {
      id: 'carga',
      title: 'Carga horária',
      subtitle: 'Confirmar turmas',
      icon: CheckSquare,
      color: 'hover:border-[#0066cc]/40',
      iconColor: 'text-[#0066cc]',
      bgIcon: 'bg-[#0066cc]/5 border-[#0066cc]/10'
    }
  ];

  return (
    <div className="mt-6 px-5">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Ações rápidas</h3>
      
      {/* 3 buttons displayed side-by-side in horizontal scrollable line */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1.5 -mx-5 px-5 select-none">
        {actions.map((act) => {
          const IconComponent = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => onActionSelect(act.id as 'ponto' | 'disponibilidade' | 'carga')}
              className={`flex-1 min-w-[120px] aspect-[4/3] bg-white border border-[#e2e8f0] rounded-2xl p-3.5 flex flex-col justify-between text-left transition-all active:scale-95 shadow-xs cursor-pointer ${act.color}`}
            >
              <div className={`w-8.5 h-8.5 rounded-xl border flex items-center justify-center shrink-0 ${act.bgIcon}`}>
                <IconComponent className={`w-4 h-4 ${act.iconColor} stroke-[2]`} />
              </div>
              
              <div className="mt-2">
                <p className="text-xs font-bold text-[#0f172b] tracking-tight leading-none">
                  {act.title}
                </p>
                <p className="text-[10px] text-slate-400 font-medium mt-1 leading-none">
                  {act.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
