import React, { useState } from 'react';
import { StudentClassItem } from '../../types';
import { Clock, MapPin, Users, Star, ChevronRight } from 'lucide-react';

interface StudentWeeklyScheduleProps {
  classes: StudentClassItem[];
  onClassClick: (item: StudentClassItem) => void;
  onRateClass: (item: StudentClassItem) => void;
}

export const StudentWeeklySchedule: React.FC<StudentWeeklyScheduleProps> = ({
  classes,
  onClassClick,
  onRateClass
}) => {
  const [selectedDay, setSelectedDay] = useState<'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex'>('Seg');

  const weekDays = [
    { id: 'Seg', label: 'Seg', sub: '08/06', count: 2 },
    { id: 'Ter', label: 'Ter', sub: '09/06', count: 1 },
    { id: 'Qua', label: 'Qua', sub: '10/06', count: 2 },
    { id: 'Qui', label: 'Qui', sub: '11/06', count: 1 },
    { id: 'Sex', label: 'Sex', sub: '12/06', count: 1 },
  ] as const;

  // Lista de disciplinas por dia simulando grade real do aluno
  const getDayClasses = (day: string): StudentClassItem[] => {
    if (day === 'Seg') return classes;
    if (day === 'Ter') return [
      {
        id: 'ter_1',
        discipline: 'Sistemas Distribuídos e Redes Cloud',
        code: 'EC-701',
        professor: 'Ricardo Almeida',
        time: '08:00 - 11:40',
        room: 'Sala 402',
        block: 'Prédio Central',
        status: 'proxima'
      }
    ];
    if (day === 'Qua') return [
      {
        id: 'qua_1',
        discipline: 'Inteligência Artificial Aplicada',
        code: 'IA-405',
        professor: 'Marcos Vinicius',
        time: '14:00 - 15:40',
        room: 'Lab 03',
        block: 'Anfiteatro Tech',
        status: 'futura'
      },
      {
        id: 'qua_2',
        discipline: 'Engenharia de Software Avançada',
        code: 'ES-401',
        professor: 'Fernanda Lins',
        time: '16:00 - 17:40',
        room: 'Sala 104',
        block: 'Bloco A',
        status: 'futura'
      }
    ];
    return [
      {
        id: `${day}_1`,
        discipline: 'Sistemas Operacionais & Kernel',
        code: 'SO-302',
        professor: 'Carlos Eduardo',
        time: '08:00 - 09:40',
        room: 'Sala 205',
        block: 'Bloco B',
        status: 'futura'
      }
    ];
  };

  const currentClasses = getDayClasses(selectedDay);

  return (
    <section className="mt-6 px-6 pb-6">
      {/* Cabeçalho da Seção idêntico ao padrão */}
      <div className="flex items-center justify-between mb-3.5 px-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Grade semanal de aulas
        </h3>
        <span className="px-2.5 py-1 rounded-full bg-[#0066cc]/10 text-[#0066cc] text-xs font-bold tracking-tight">
          2 aulas hoje
        </span>
      </div>

      {/* Seletor de Dias da Semana idêntico ao mockup */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {weekDays.map((day) => {
          const isActive = selectedDay === day.id;
          return (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 ${
                isActive
                  ? 'bg-white border border-slate-200 shadow-sm text-[#0f172b] scale-[1.02]'
                  : 'bg-slate-100/70 text-slate-400 hover:bg-slate-200/50 hover:text-slate-600 border border-transparent'
              }`}
            >
              <span className={`text-xs font-extrabold tracking-tight ${isActive ? 'text-[#0f172b]' : ''}`}>
                {day.label}
              </span>
              <span className={`text-3xs font-mono mt-0.5 ${isActive ? 'text-slate-500 font-bold' : 'text-slate-400'}`}>
                {day.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cards de Disciplina com borda azul esquerda (border-l-4 border-[#0066cc]) */}
      <div className="space-y-3.5">
        {currentClasses.map((item) => {
          const isEncerrada = item.status === 'encerrada';
          const isAgora = item.status === 'agora' || item.status === 'proxima';

          return (
            <div
              key={item.id}
              onClick={() => onClassClick(item)}
              className="p-5 rounded-[24px] bg-white border border-[#e2e8f0] border-l-4 border-l-[#0066cc] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer relative group text-left"
            >
              {/* Top Row: Código & Pill Badge */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-black tracking-wider text-slate-400 uppercase">
                  {item.code}
                </span>

                {isAgora ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0066cc]/10 text-[#0066cc] text-2xs font-bold tracking-tight uppercase animate-pulse">
                    Em andamento
                  </span>
                ) : isEncerrada ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-2xs font-bold tracking-tight uppercase">
                    Concluída
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-2xs font-bold tracking-tight uppercase">
                    Confirmado
                  </span>
                )}
              </div>

              {/* Título da Disciplina */}
              <h4 className="text-base font-bold text-[#0f172b] tracking-tight mb-2 leading-snug group-hover:text-[#0066cc] transition-colors">
                {item.discipline}
              </h4>

              {/* Horário */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-3">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{item.time}</span>
              </div>

              {/* Pill Localização (Sala/Prédio) */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 text-slate-700 text-xs font-bold mb-3.5">
                <MapPin className="w-3.5 h-3.5 text-[#0066cc] shrink-0 stroke-[2.2]" />
                <span>{item.block} • {item.room}</span>
              </div>

              {/* Linha Inferior: Professor / Inscritos & Ação */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Users className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
                  <span>38 inscritos <span className="text-slate-300">•</span> Prof. {item.professor}</span>
                </div>

                {isEncerrada && !item.rating ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRateClass(item);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-2xs font-bold shadow-2xs transition-all"
                  >
                    <span>Avaliar</span>
                    <Star className="w-3 h-3 fill-white" />
                  </button>
                ) : item.rating ? (
                  <div className="flex items-center gap-1 text-amber-600 font-bold text-2xs bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    <span>{item.rating}.0</span>
                  </div>
                ) : (
                  <span className="text-2xs font-bold text-[#0066cc] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Detalhes <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
