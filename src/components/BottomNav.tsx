import React from 'react';
import { Home, Clock, CalendarRange, PenTool } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'inicio' | 'ponto' | 'horários' | 'menu';
  onChangeTab: (tab: 'inicio' | 'ponto' | 'horários' | 'menu') => void;
  unreadNotificationsCount: number;
}

export default function BottomNav({ activeTab, onChangeTab, unreadNotificationsCount }: BottomNavProps) {
  const tabs = [
    {
      id: 'inicio' as const,
      label: 'Início',
      icon: Home,
    },
    {
      id: 'ponto' as const,
      label: 'Ponto',
      icon: Clock,
    },
    {
      id: 'horários' as const,
      label: 'Horários',
      icon: CalendarRange,
    },
    {
      id: 'menu' as const,
      label: 'Assinaturas',
      icon: PenTool,
    },
  ];

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 h-[68px] bg-[#fffefe] border-t border-[#e2e8f0]/60 px-3 pb-2 pt-1 flex items-center justify-around z-40 select-none shadow-[0_-5px_15px_rgba(0,0,0,0.02)] rounded-b-[38px]"
      id="bottom_navigation_bar"
    >
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className="flex flex-col items-center justify-center flex-1 h-12 rounded-xl transition-all relative active:scale-95 cursor-pointer"
            id={`bottom_tab_btn_${tab.id}`}
            style={{ minHeight: '44px' }} // Touch target size
          >
            <div className={`p-1.5 rounded-lg transition-all ${
              isActive 
                ? 'text-[#0066cc]' 
                : 'text-slate-400 hover:text-slate-600'
            }`}>
              <IconComponent 
                className={`w-4.5 h-4.5 ${isActive ? 'stroke-[2.5] fill-[#0066cc]/8' : 'stroke-[2]'}`} 
              />
            </div>
            
            <span className={`text-[10px] font-bold tracking-tight transition-all leading-none ${
              isActive 
                ? 'text-[#0066cc] font-extrabold' 
                : 'text-slate-400 font-medium'
            }`}>
              {tab.label}
            </span>

            {/* Sutil indicator point or bar below the active tab */}
            {isActive && (
              <span className="absolute bottom-0.5 w-4 h-[2px] rounded-full bg-[#0066cc]"></span>
            )}
            
            {/* Red pulse notification bubble on Menu if documents/confirmations pending */}
            {tab.id === 'menu' && unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-5 w-2 h-2 rounded-full bg-[#e7000b] border border-white"></span>
            )}
          </button>
        );
      })}
    </div>
  );
}
