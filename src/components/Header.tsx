import React, { useState } from 'react';
import { Bell, Check, X, ShieldAlert, CircleCheck, AlertTriangle, LogOut } from 'lucide-react';
import { NotificationItem } from '../types';

interface HeaderProps {
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
  onClearAll: () => void;
  onActionClick?: (action: 'assinaturas') => void;
  onLogout?: () => void;
}

export default function Header({ notifications, onMarkRead, onClearAll, onActionClick, onLogout }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="px-5 py-4 bg-white/95 backdrop-blur-md flex items-center justify-between sticky top-0 z-30 border-b border-[#e2e8f0]">
        <div>
          <h1 className="tracking-tight flex items-center gap-1.5">
            <div className="flex items-center text-lg italic font-black select-none tracking-tight">
              <span className="text-[#0f172b]">Sys</span>
              <span className="text-[#0066cc]">Class</span>
            </div>
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            id="btn_notifications_trigger"
            onClick={() => setIsOpen(true)}
            className="relative p-2.5 rounded-full bg-white hover:bg-slate-50 transition-all border border-[#e2e8f0] text-slate-700 active:scale-95 cursor-pointer flex items-center justify-center"
            aria-label="Notificações"
            style={{ width: '40px', height: '40px' }}
          >
            <Bell className="w-4.5 h-4.5 stroke-[2]" />
            {unreadCount > 0 && (
              <span 
                id="notifications_badge" 
                className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] flex items-center justify-center bg-[#0066cc] text-white text-[9px] font-extrabold rounded-full px-1 border-2 border-[#F8FAFC]"
              >
                {unreadCount}
              </span>
            )}
          </button>

          {onLogout && (
            <button
              id="btn_logout"
              onClick={onLogout}
              className="p-2.5 rounded-full bg-white hover:bg-red-50 hover:text-[#e7000b] hover:border-red-200 transition-all border border-[#e2e8f0] text-slate-500 active:scale-95 cursor-pointer flex items-center justify-center"
              aria-label="Sair"
              style={{ width: '40px', height: '40px' }}
              title="Sair do aplicativo"
            >
              <LogOut className="w-4.5 h-4.5 stroke-[2]" />
            </button>
          )}
        </div>
      </header>

      {/* Notifications Slide-Up Drawer */}
      {isOpen && (
        <div className="absolute inset-0 z-50 bg-[#0f172b]/60 backdrop-blur-xs flex flex-col justify-end">
          {/* Backdrop Click Dismiss */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />
          
          <div className="bg-white rounded-t-[32px] max-h-[85%] overflow-hidden flex flex-col shadow-2xl border-t border-slate-100 pb-6">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-[#0f172b]">Notificações</h3>
                <p className="text-xs text-slate-500 font-medium">{unreadCount} pendentes no momento</p>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button 
                    onClick={onClearAll}
                    className="text-xs font-semibold text-[#0066cc] hover:bg-blue-50 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Limpar tudo
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 max-h-[400px] no-scrollbar">
              {notifications.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 mb-3 text-slate-300">
                    <Bell className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-[#0f172b]">Nenhuma notificação</p>
                  <p className="text-xs text-slate-400 mt-0.5">Tudo limpo por aqui por enquanto.</p>
                </div>
              ) : (
                notifications.map((notif) => {
                  let icon = <Bell className="w-4 h-4 text-[#0066cc]" />;
                  let bgIconClass = "bg-blue-50 border-blue-100";
                  
                  if (notif.type === 'attention') {
                    icon = <AlertTriangle className="w-4 h-4 text-[#e17100]" />;
                    bgIconClass = "bg-amber-50 border-amber-100";
                  } else if (notif.type === 'alert') {
                    icon = <AlertTriangle className="w-4 h-4 text-[#f54900]" />;
                    bgIconClass = "bg-orange-50 border-orange-100";
                  } else if (notif.type === 'critical') {
                    icon = <ShieldAlert className="w-4 h-4 text-[#e7000b]" />;
                    bgIconClass = "bg-red-50 border-red-100";
                  }

                  return (
                    <div 
                      key={notif.id}
                      onClick={() => {
                        if (notif.type === 'attention' && onActionClick) {
                          onActionClick('assinaturas');
                          setIsOpen(false);
                        }
                      }}
                      className={`p-4 rounded-2xl border transition-all flex gap-3 ${
                        notif.type === 'attention' ? 'cursor-pointer hover:border-[#0066cc]/30 hover:bg-slate-50/20' : ''
                      } ${
                        notif.read 
                          ? 'bg-slate-50/50 border-slate-100 opacity-60' 
                          : 'bg-white border-[#e2e8f0] shadow-xs'
                      }`}
                    >
                      <div className={`w-8.5 h-8.5 rounded-full border flex items-center justify-center shrink-0 ${bgIconClass}`}>
                        {icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className={`text-xs font-bold leading-normal truncate ${notif.read ? 'text-[#0f172b]/70' : 'text-[#0f172b]'}`}>
                            {notif.title}
                          </h4>
                          <span className="text-[9px] font-medium text-slate-400 whitespace-nowrap pt-0.5">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                          {notif.description}
                        </p>
                        
                        {!notif.read && (
                          <button
                            onClick={() => onMarkRead(notif.id)}
                            className="text-[10px] font-bold text-[#0066cc] hover:underline mt-2 flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3 h-3" />
                            Marcar como lida
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
