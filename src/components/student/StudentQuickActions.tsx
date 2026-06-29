import React from 'react';
import { Clock, Sparkles, CheckSquare } from 'lucide-react';

interface StudentQuickActionsProps {
  onPresenceClick: () => void;
  onTutorClick: () => void;
  onSpaceClick: () => void;
}

export const StudentQuickActions: React.FC<StudentQuickActionsProps> = ({
  onPresenceClick,
  onTutorClick,
  onSpaceClick
}) => {
  return (
    <section className="mt-4 px-6">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
        Ações rápidas
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {/* Card 1: Registrar ponto */}
        <button
          onClick={onPresenceClick}
          className="group p-3.5 rounded-2xl bg-white border border-[#e2e8f0] text-[#0f172b] shadow-2xs hover:border-[#0066cc] hover:shadow-sm flex flex-col justify-between min-h-[110px] text-left active:scale-95 transition-all duration-200 relative overflow-hidden"
        >
          <div className="w-9 h-9 rounded-full bg-[#0066cc]/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Clock className="w-4 h-4 text-[#0066cc] stroke-[2.2]" />
          </div>
          
          <div>
            <span className="text-xs font-bold leading-tight tracking-tight block text-[#0f172b]">
              Registrar ponto
            </span>
            <span className="text-3xs text-slate-400 font-medium block mt-0.5 leading-none">
              Check-in/out
            </span>
          </div>
        </button>

        {/* Card 2: Disponibilidade / Horários */}
        <button
          onClick={onTutorClick}
          className="group p-3.5 rounded-2xl bg-white border border-[#e2e8f0] text-[#0f172b] shadow-2xs hover:border-[#0066cc] hover:shadow-sm flex flex-col justify-between min-h-[110px] text-left active:scale-95 transition-all duration-200"
        >
          <div className="w-9 h-9 rounded-full bg-[#0066cc]/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4 text-[#0066cc] stroke-[2.2]" />
          </div>
          
          <div>
            <span className="text-xs font-bold leading-tight tracking-tight block text-[#0f172b]">
              Tutor IA
            </span>
            <span className="text-3xs text-slate-400 font-medium block mt-0.5 leading-none">
              IA Didática
            </span>
          </div>
        </button>

        {/* Card 3: Carga horária / Turmas */}
        <button
          onClick={onSpaceClick}
          className="group p-3.5 rounded-2xl bg-white border border-[#e2e8f0] text-[#0f172b] shadow-2xs hover:border-[#0066cc] hover:shadow-sm flex flex-col justify-between min-h-[110px] text-left active:scale-95 transition-all duration-200"
        >
          <div className="w-9 h-9 rounded-full bg-[#0066cc]/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <CheckSquare className="w-4 h-4 text-[#0066cc] stroke-[2.2]" />
          </div>
          
          <div>
            <span className="text-xs font-bold leading-tight tracking-tight block text-[#0f172b]">
              Locar espaço
            </span>
            <span className="text-3xs text-slate-400 font-medium block mt-0.5 leading-none">
              Salas e Labs
            </span>
          </div>
        </button>
      </div>
    </section>
  );
};

