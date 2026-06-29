import React from 'react';
import { Award, BookOpen, TrendingUp, CheckCircle } from 'lucide-react';

export const StudentGradesTab: React.FC = () => {
  const disciplines = [
    { name: 'Banco de Dados Avançado', p1: 9.2, p2: 8.8, media: 9.0, status: 'Aprovado' },
    { name: 'Engenharia de Software', p1: 8.5, p2: 9.0, media: 8.75, status: 'Aprovado' },
    { name: 'Inteligência Artificial', p1: 9.5, p2: '-', media: 9.5, status: 'Parcial' },
    { name: 'Redes de Computadores II', p1: 8.0, p2: 8.2, media: 8.1, status: 'Aprovado' },
  ];

  return (
    <div className="px-6 py-6 pb-28">
      <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0f172b] to-slate-800 text-white mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xs text-slate-400 font-semibold uppercase tracking-wider">Coeficiente de Rendimento</div>
            <div className="text-3xl font-extrabold text-[#009966] mt-1">8.9</div>
            <div className="text-xs text-slate-300 mt-0.5">Top 5% da turma no 4º Período</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
            <Award className="w-8 h-8 text-amber-400" />
          </div>
        </div>
      </div>

      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
        Boletim Letivo 2026.1
      </h3>

      <div className="space-y-3">
        {disciplines.map((d, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-[#0f172b]">{d.name}</h4>
                <div className="flex gap-3 text-xs text-slate-500 font-mono mt-2">
                  <span>P1: <strong className="text-slate-800">{d.p1}</strong></span>
                  <span>P2: <strong className="text-slate-800">{d.p2}</strong></span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-bold font-mono text-[#009966]">{d.media}</span>
                <div className="text-3xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                  {d.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
