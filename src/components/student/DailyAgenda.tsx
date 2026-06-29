import React from 'react';
import { StudentClassItem } from '../../types';
import { Star, CheckCircle2, Clock, Calendar, ChevronRight } from 'lucide-react';

interface DailyAgendaProps {
  classes: StudentClassItem[];
  onRateClass: (item: StudentClassItem) => void;
  onClassClick: (item: StudentClassItem) => void;
}

export const DailyAgenda: React.FC<DailyAgendaProps> = ({
  classes,
  onRateClass,
  onClassClick
}) => {
  return (
    <section className="mt-6 px-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Agenda letiva de hoje
        </h3>
        <span className="text-xs font-medium text-[#009966]">
          {classes.length} disciplinas
        </span>
      </div>

      <div className="space-y-3">
        {classes.map((item) => {
          const isEncerrada = item.status === 'encerrada';
          const isAgora = item.status === 'agora' || item.status === 'proxima';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl bg-white border transition-all duration-200 ${
                isAgora
                  ? 'border-[#009966] ring-1 ring-[#009966]/20 shadow-sm'
                  : 'border-[#e2e8f0] shadow-2xs hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0" onClick={() => onClassClick(item)}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.time}
                    </span>
                    {isAgora && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#009966]/15 text-[#009966] text-2xs font-bold uppercase tracking-wider animate-pulse">
                        Em andamento
                      </span>
                    )}
                    {isEncerrada && (
                      <span className="inline-flex items-center gap-1 text-2xs text-slate-400 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-[#009966]" />
                        Concluída
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-[#0f172b] tracking-tight truncate cursor-pointer hover:text-[#009966] transition-colors">
                    {item.discipline}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {item.block} • {item.room}
                  </p>
                </div>

                {/* Termômetro Pedagógico (Botão Avaliar Aula ★) */}
                {isEncerrada && (
                  <div className="shrink-0 pt-1">
                    {item.rating ? (
                      <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-xl text-amber-700 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{item.rating}.0</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onRateClass(item)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#e17100] text-white text-xs font-bold shadow-xs hover:shadow-sm active:scale-95 transition-all"
                      >
                        <span>Avaliar aula</span>
                        <Star className="w-3.5 h-3.5 fill-white" />
                      </button>
                    )}
                  </div>
                )}

                {!isEncerrada && (
                  <button
                    onClick={() => onClassClick(item)}
                    className="shrink-0 p-2 text-slate-400 hover:text-[#0f172b] rounded-lg hover:bg-slate-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
