import React from 'react';
import { StudentProfile } from '../../types';
import { GraduationCap, ArrowRight } from 'lucide-react';

interface StudentProfileCardProps {
  profile: StudentProfile;
}

export const StudentProfileCard: React.FC<StudentProfileCardProps> = ({ profile }) => {
  return (
    <div className="relative pt-2 pb-4 bg-gradient-to-b from-slate-200 via-slate-100/60 to-[#F8FAFC]">
      <div className="mx-5 p-5 rounded-[28px] bg-white border border-[#e2e8f0] shadow-md relative overflow-hidden transition-all duration-300">
        
        {/* Top Section */}
        <div className="flex items-start gap-4 relative z-10">
          {/* Avatar com indicador azul de status */}
          <div className="relative shrink-0">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-20 h-20 rounded-2xl object-cover border border-slate-200/80 shadow-xs"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0066cc] border-2 border-white flex items-center justify-center shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {/* Badge de Título/Período */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[#0066cc] text-3xs font-extrabold uppercase tracking-wider mb-1.5">
              <GraduationCap className="w-3.5 h-3.5 shrink-0 stroke-[2.2]" />
              <span>{profile.semester} • GRADUAÇÃO</span>
            </div>

            {/* Nome */}
            <h2 className="text-lg font-bold text-[#0f172b] tracking-tight truncate leading-snug">
              {profile.name}
            </h2>

            {/* Curso */}
            <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
              {profile.course}
            </p>

            {/* E-mail */}
            <p className="text-xs text-slate-400 font-mono mt-1.5 flex items-center gap-1 truncate">
              <span className="text-slate-300">@</span>
              <span className="truncate">{profile.email}</span>
            </p>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="my-4 border-t border-slate-100" />

        {/* Footer Section: Rendimento Acadêmico & Botão Ação */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">
              Rendimento Acadêmico
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm font-black text-[#0f172b]">
                CR: {profile.cr.toFixed(1)}
              </span>
              <span className="text-3xs font-bold text-[#009966] bg-[#009966]/10 px-1.5 py-0.5 rounded">
                Top 5%
              </span>
            </div>
          </div>

          <button
            onClick={() => alert(`Carteira Estudantil Digital\nRA: ${profile.ra}\nNome: ${profile.name}\nSituação: Regular`)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#0f172b] text-xs font-bold shadow-2xs hover:bg-slate-50 transition-all active:scale-95"
          >
            <span>Carteira</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

      </div>
    </div>
  );
};

