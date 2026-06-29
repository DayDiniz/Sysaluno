import React from 'react';
import { Award, GraduationCap, MapPin, AtSign, Fingerprint, LogOut, Camera } from 'lucide-react';
import { TeacherProfile } from '../types';

interface ProfileCardProps {
  profile: TeacherProfile;
  onLogout?: () => void;
  onProfileClick?: () => void;
}

export default function ProfileCard({ profile, onLogout, onProfileClick }: ProfileCardProps) {
  return (
    <div id="teacher_profile_card" className="relative overflow-hidden bg-white border border-[#e2e8f0] rounded-3xl p-5 mx-5 shadow-sm">
      {/* Absolute colored accent line on left */}
      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#0066cc]"></div>

      {/* Decorative subtle pulse spot in top right */}
      <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#0066cc]/5 rounded-full blur-xl"></div>

      <div className="flex items-start gap-4">
        {/* Profile Avatar Image/Placeholder - Clickable to navigate to profile edit */}
        <div 
          onClick={onProfileClick}
          className="relative shrink-0 group cursor-pointer"
          title="Clique para editar seu perfil"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-200 hover:border-[#0066cc] flex items-center justify-center text-white overflow-hidden shadow-sm transition-all duration-300 group-hover:scale-105 active:scale-95 relative">
            {profile.avatarUrl ? (
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#0f172b]">
                <span className="text-xl font-semibold tracking-tight text-white">RA</span>
              </div>
            )}
            
            {/* Elegant hover overlay to signify edit action */}
            <div className="absolute inset-0 bg-[#0f172b]/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Camera className="w-4 h-4 text-[#0066cc]" />
              <span className="text-[8px] font-bold text-white uppercase mt-1">Editar</span>
            </div>
          </div>
          
          {/* Neon notification point for interactivity */}
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#0066cc] text-white rounded-full flex items-center justify-center border-2 border-white shadow-xs">
            <span className="block w-1.5 h-1.5 rounded-full bg-white" />
          </span>
        </div>

        {/* Text information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span 
              onClick={onProfileClick}
              className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0066cc] uppercase bg-[#0066cc]/8 px-2 py-0.5 rounded-md border border-[#0066cc]/15 cursor-pointer hover:bg-[#0066cc]/15 transition-colors"
            >
              <GraduationCap className="w-3 h-3" />
              {profile.title}
            </span>
          </div>

          <h2 
            onClick={onProfileClick}
            className="text-[#0f172b] font-bold text-base tracking-tight mt-1 truncate cursor-pointer hover:text-[#0066cc] transition-colors"
            title="Clique para editar seu perfil"
          >
            {profile.name}
          </h2>

          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            {profile.department}
          </p>

          <div className="mt-2.5 flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <AtSign className="w-3 h-3 text-slate-300" />
              <span className="truncate">{profile.email}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Internal Micro Stats summary */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-left">
        <div>
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">Atuação Acadêmica</p>
          <p className="text-xs font-bold text-slate-800 mt-0.5">6 Turmas Ativas</p>
        </div>

        {onLogout && (
          <button 
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-[#e7000b] hover:bg-red-50 hover:border-red-200 transition-all text-xs font-bold active:scale-95 cursor-pointer"
            id="btn_profile_logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        )}
      </div>
    </div>
  );
}
