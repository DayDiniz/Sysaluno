import React from 'react';
import { BookOpen, FileText, CreditCard, HelpCircle, Settings, LogOut, Shield, User, ChevronRight } from 'lucide-react';

interface StudentMenuTabProps {
  onLogout: () => void;
}

export const StudentMenuTab: React.FC<StudentMenuTabProps> = ({ onLogout }) => {
  const menuGroups = [
    {
      title: 'Acadêmico',
      items: [
        { icon: BookOpen, label: 'Histórico Escolar', desc: 'Grade curricular e disciplinas cursadas' },
        { icon: FileText, label: 'Documentos e Declarações', desc: 'Matrícula, passe estudantil e IR' },
      ]
    },
    {
      title: 'Financeiro',
      items: [
        { icon: CreditCard, label: 'Boleto e Mensalidades', desc: 'Pagamentos via Pix e Cartão' },
      ]
    },
    {
      title: 'Suporte & Configurações',
      items: [
        { icon: HelpCircle, label: 'Central de Ajuda (FAQ)', desc: 'Secretaria virtual e chamados' },
        { icon: Settings, label: 'Preferências do App', desc: 'Notificações e biometria' },
      ]
    }
  ];

  return (
    <div className="px-6 py-6 pb-28 space-y-6">
      <div className="flex items-center gap-4 p-4 rounded-3xl bg-white border border-[#e2e8f0] shadow-2xs">
        <div className="w-12 h-12 rounded-2xl bg-[#009966]/10 text-[#009966] flex items-center justify-center font-bold text-lg">
          LH
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#0f172b]">Lucas Henrique Silva</h3>
          <p className="text-xs text-slate-500 font-mono">RA: 202409118 • Ativo</p>
        </div>
      </div>

      {menuGroups.map((group, gIdx) => (
        <div key={gIdx}>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 px-1">
            {group.title}
          </h4>
          <div className="bg-white rounded-3xl border border-[#e2e8f0] divide-y divide-slate-100 overflow-hidden shadow-2xs">
            {group.items.map((item, iIdx) => {
              const Icon = item.icon;
              return (
                <button
                  key={iIdx}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-100 text-[#0f172b]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0f172b]">{item.label}</div>
                      <div className="text-3xs text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={onLogout}
        className="w-full p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-[#e7000b] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Sair da conta estudantil</span>
      </button>
    </div>
  );
};
