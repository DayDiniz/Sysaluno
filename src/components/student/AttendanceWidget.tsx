import React from 'react';
import { AttendanceMonthly } from '../../types';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface AttendanceWidgetProps {
  data: AttendanceMonthly[];
}

export const AttendanceWidget: React.FC<AttendanceWidgetProps> = ({ data }) => {
  // Média total
  const avgAttendance = Math.round(
    data.reduce((acc, curr) => acc + curr.percentage, 0) / (data.length || 1)
  );

  const isSafe = avgAttendance >= 75;

  return (
    <section className="mt-6 mb-24 px-6">
      <div className="p-5 rounded-3xl bg-white border border-[#e2e8f0] shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Assiduidade no semestre
            </h3>
            <p className="text-sm font-bold text-[#0f172b] mt-0.5">
              Frequência geral: <span className={isSafe ? "text-[#009966]" : "text-[#e7000b]"}>{avgAttendance}%</span>
            </p>
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            isSafe
              ? 'bg-[#009966]/10 text-[#009966] border border-[#009966]/20'
              : 'bg-[#e7000b]/10 text-[#e7000b] border border-[#e7000b]/20'
          }`}>
            {isSafe ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Regular (&gt;75%)</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Risco de reprovação</span>
              </>
            )}
          </div>
        </div>

        {/* Gráfico de barras minimalista em tons de azul sutil */}
        <div className="grid grid-cols-4 gap-3 pt-2">
          {data.map((item, idx) => {
            const height = Math.min(Math.max(item.percentage, 15), 100);
            const isCurrent = idx === data.length - 1;

            return (
              <div key={item.month} className="flex flex-col items-center">
                <div className="text-2xs font-mono font-bold text-slate-500 mb-1.5">
                  {item.percentage}%
                </div>
                
                {/* Track da barra */}
                <div className="w-full h-24 bg-slate-100 rounded-xl p-1 flex flex-col justify-end relative overflow-hidden group">
                  <div
                    style={{ height: `${height}%` }}
                    className={`w-full rounded-lg transition-all duration-700 ease-out ${
                      isCurrent
                        ? 'bg-gradient-to-t from-blue-600 to-blue-400 shadow-sm shadow-blue-500/20'
                        : 'bg-blue-300 group-hover:bg-blue-400'
                    }`}
                  />
                </div>

                <span className={`text-xs mt-2 font-semibold ${isCurrent ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-400">
          <span>Mínimo exigido pela instituição: 75%</span>
          <span>Aulas computadas até ontem</span>
        </div>
      </div>
    </section>
  );
};
