import React, { useState } from 'react';
import { SpaceOption } from '../../../types';
import { PlusCircle, X, Users, Wifi, Monitor, CheckCircle2, Clock, Calendar } from 'lucide-react';

interface SpaceRentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSuccess: (spaceName: string, time: string) => void;
}

export const SpaceRentModal: React.FC<SpaceRentModalProps> = ({
  isOpen,
  onClose,
  onBookSuccess
}) => {
  const [selectedSpace, setSelectedSpace] = useState<string>('1');
  const [selectedSlot, setSelectedSlot] = useState<string>('14:00 - 15:30');
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);

  if (!isOpen) return null;

  const spaces: SpaceOption[] = [
    {
      id: '1',
      name: 'Cabine Focus Individual B2',
      type: 'Cabine Focus',
      capacity: 1,
      availableSlots: ['14:00 - 15:30', '16:00 - 17:30', '19:00 - 20:30'],
      equipment: ['Isolamento acústico', 'Monitor 4K USB-C', 'Wi-Fi 6E']
    },
    {
      id: '2',
      name: 'Lab de Inovação & Redes III',
      type: 'Laboratório IA',
      capacity: 6,
      availableSlots: ['13:00 - 15:00', '15:30 - 17:30'],
      equipment: ['Lousa digital Smart', '6 iMacs M3', 'Projetor Laser']
    },
    {
      id: '3',
      name: 'Sala Colaborativa 405',
      type: 'Sala de Estudo',
      capacity: 8,
      availableSlots: ['10:00 - 12:00', '14:00 - 16:00', '18:00 - 20:00'],
      equipment: ['Mesa redonda', 'TV 65" HDMI', 'Quadro branco grande']
    }
  ];

  const currSpace = spaces.find(s => s.id === selectedSpace) || spaces[0];

  const handleConfirm = () => {
    setBooking(true);
    setTimeout(() => {
      setBooking(false);
      setBooked(true);
      setTimeout(() => {
        onBookSuccess(currSpace.name, selectedSlot);
        onClose();
        setBooked(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#e2e8f0] relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <PlusCircle className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Módulo de Retorno ao Aluno</span>
          </div>
          <h3 className="text-lg font-bold text-[#0f172b]">Locar espaço acadêmico</h3>
          <p className="text-xs text-slate-500">Reserve cabines de foco, salas de estudo ou laboratórios gratuitamente com sua cota estudantil.</p>
        </div>

        {!booked ? (
          <div className="space-y-4">
            {/* Seletor de espaço */}
            <div>
              <label className="text-2xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Selecione o ambiente</label>
              <div className="space-y-2">
                {spaces.map(sp => (
                  <div
                    key={sp.id}
                    onClick={() => { setSelectedSpace(sp.id); setSelectedSlot(sp.availableSlots[0]); }}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      selectedSpace === sp.id
                        ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600/30'
                        : 'border-[#e2e8f0] hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0f172b]">{sp.name}</span>
                      <span className="text-3xs px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-600">{sp.type}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-3xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3 text-slate-400" /> Máx. {sp.capacity} pessoa{sp.capacity > 1 ? 's' : ''}</span>
                      <span>•</span>
                      <span>{sp.equipment[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Horários disponíveis hoje */}
            <div>
              <label className="text-2xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Horários disponíveis para hoje</label>
              <div className="flex flex-wrap gap-2">
                {currSpace.availableSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                      selectedSlot === slot
                        ? 'bg-[#0f172b] text-white font-bold shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Clock className="w-3 h-3 inline mr-1" />
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Equipamentos inclusos */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
              <div className="text-3xs font-semibold text-slate-500 uppercase mb-1.5">Incluso no agendamento:</div>
              <div className="flex flex-wrap gap-1.5">
                {currSpace.equipment.map((eq, i) => (
                  <span key={i} className="text-3xs bg-white border border-slate-200 px-2 py-0.5 rounded-md font-medium text-slate-700">
                    ✓ {eq}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={booking}
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/25 active:scale-98 transition-all"
            >
              {booking ? 'Confirmando reserva na portaria...' : `Confirmar locação para ${selectedSlot}`}
            </button>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center text-center animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mb-3 shadow-lg shadow-blue-600/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-base font-bold text-[#0f172b]">Espaço locado com sucesso!</h4>
            <p className="text-xs text-slate-500 mt-1">Sua chave de acesso digital foi enviada para o seu e-mail institucional.</p>
          </div>
        )}
      </div>
    </div>
  );
};
