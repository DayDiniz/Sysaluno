import React from 'react';
import { Bell, X, Check, AlertCircle, Info, ShieldAlert } from 'lucide-react';

interface StudentNotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentNotificationsModal: React.FC<StudentNotificationsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const notifs = [
    {
      id: '1',
      title: 'Material complementar IA disponibilizado',
      description: 'O Prof. Ricardo publicou o PDF "Redes Neurais Convolucionais" na disciplina IA-812.',
      time: '10 min atrás',
      type: 'info'
    },
    {
      id: '2',
      title: 'Lembrete: Chamada em Aberto',
      description: 'A lista de presença de Sistemas Distribuídos encerra em 15 minutos.',
      time: '45 min atrás',
      type: 'alert'
    },
    {
      id: '3',
      title: 'Aprovação de Auxílio Locação',
      description: 'Sua solicitação para uso da Cabine Focus B2 foi liberada pela portaria.',
      time: 'Ontem',
      type: 'success'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm max-h-[80vh] bg-white rounded-3xl p-5 shadow-2xl border border-[#e2e8f0] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#0f172b]" />
            <h3 className="text-sm font-bold text-[#0f172b]">Notificações acadêmicas</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {notifs.map(n => (
            <div key={n.id} className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#e2e8f0]">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold text-[#0f172b]">{n.title}</h4>
                <span className="text-3xs font-mono text-slate-400 shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0f172b] text-xs font-bold transition-colors"
        >
          Marcar todas como lidas
        </button>
      </div>
    </div>
  );
};
