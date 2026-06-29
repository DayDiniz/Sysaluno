import React from 'react';
import { Home, Clock, Calendar, PenTool } from 'lucide-react';

export type StudentNavTab = 'inicio' | 'ponto' | 'horarios' | 'assinaturas';

interface StudentBottomNavProps {
  activeTab: StudentNavTab;
  onTabChange: (tab: StudentNavTab) => void;
}

export const StudentBottomNav: React.FC<StudentBottomNavProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'ponto', label: 'Ponto', icon: Clock },
    { id: 'horarios', label: 'Horários', icon: Calendar },
    { id: 'assinaturas', label: 'Assinaturas', icon: PenTool, hasAlert: true },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[440px] mx-auto z-50 pointer-events-none">
      <div className="pointer-events-auto bg-white border-t border-[#e2e8f0] px-4 py-2 pb-5 flex items-center justify-around shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center py-1.5 px-3 relative group transition-all active:scale-95"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? 'text-[#0066cc] stroke-[2.2]' : 'text-slate-400 stroke-[1.8] group-hover:text-slate-600'
                  }`}
                />
                {'hasAlert' in tab && tab.hasAlert && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-[#f54900] ring-2 ring-white" />
                )}
              </div>

              <span
                className={`text-3xs mt-1 tracking-tight transition-colors ${
                  isActive ? 'font-extrabold text-[#0066cc]' : 'font-semibold text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {tab.label}
              </span>

              {/* Tracinho azul inferior sob o texto da aba ativa idêntico ao print */}
              {isActive && (
                <span className="w-5 h-0.5 bg-[#0066cc] rounded-full mt-0.5 animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

