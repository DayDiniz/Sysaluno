import React from 'react';
import { Bell, LogOut } from 'lucide-react';

interface StudentHeaderProps {
  onOpenNotifications: () => void;
  onLogout: () => void;
  unreadCount: number;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  onOpenNotifications,
  onLogout,
  unreadCount
}) => {
  return (
    <header className="px-6 pt-5 pb-4 flex items-center justify-between bg-white relative z-20">
      {/* Logo SysClass idêntico ao portal de referência */}
      <div className="flex items-center">
        <h1 className="text-2xl font-black italic tracking-tighter cursor-pointer select-none">
          <span className="text-[#0f172b]">Sys</span>
          <span className="text-[#0066cc]">Class</span>
        </h1>
        <span className="ml-2 px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-3xs font-bold uppercase tracking-wider">
          Aluno
        </span>
      </div>

      {/* Botões redondos brancos de ação no topo */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenNotifications}
          className="relative w-10 h-10 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center text-[#0f172b] shadow-2xs hover:bg-slate-50 transition-all active:scale-95"
          aria-label="Notificações"
        >
          <Bell className="w-4 h-4 text-slate-700 stroke-[2]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#0066cc] text-white text-3xs font-extrabold flex items-center justify-center ring-2 ring-white shadow-xs">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={onLogout}
          className="w-10 h-10 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-rose-600 transition-all active:scale-95"
          title="Sair"
        >
          <LogOut className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
    </header>
  );
};

