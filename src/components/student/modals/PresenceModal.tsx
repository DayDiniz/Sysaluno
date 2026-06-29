import React, { useState } from 'react';
import { QrCode, MapPin, CheckCircle2, ShieldAlert, X, Sparkles, Navigation } from 'lucide-react';
import { StudentClassItem } from '../../../types';

interface PresenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentClass: StudentClassItem;
  onSuccess: () => void;
}

export const PresenceModal: React.FC<PresenceModalProps> = ({
  isOpen,
  onClose,
  currentClass,
  onSuccess
}) => {
  const [step, setStep] = useState<'options' | 'scanning' | 'geo' | 'success'>('options');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSimulateCheckIn = (type: 'qr' | 'geo') => {
    setLoading(true);
    if (type === 'qr') setStep('scanning');
    else setStep('geo');

    setTimeout(() => {
      setLoading(false);
      setStep('success');
      setTimeout(() => {
        onSuccess();
        onClose();
        setStep('options');
      }, 1800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-[#e2e8f0] relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-[#009966]/10 text-[#009966] text-xs font-bold uppercase tracking-wider mb-2">
            Ponto Eletrônico Discente
          </span>
          <h3 className="text-lg font-bold text-[#0f172b]">
            Registrar presença
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {currentClass.discipline} • {currentClass.room}
          </p>
        </div>

        {step === 'options' && (
          <div className="space-y-3.5">
            <button
              onClick={() => handleSimulateCheckIn('qr')}
              className="w-full p-4 rounded-2xl bg-[#0f172b] hover:bg-slate-800 text-white flex items-center gap-4 transition-all active:scale-98 shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <QrCode className="w-6 h-6 text-[#009966]" />
              </div>
              <div className="text-left flex-1">
                <div className="text-sm font-bold">Ler QR Code do Professor</div>
                <div className="text-xs text-slate-300 font-normal">Escaneie o código exibido na lousa</div>
              </div>
            </button>

            <button
              onClick={() => handleSimulateCheckIn('geo')}
              className="w-full p-4 rounded-2xl bg-white hover:bg-slate-50 border border-[#009966] text-[#0f172b] flex items-center gap-4 transition-all active:scale-98 shadow-xs"
            >
              <div className="w-12 h-12 rounded-xl bg-[#009966]/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#009966]" />
              </div>
              <div className="text-left flex-1">
                <div className="text-sm font-bold text-[#009966]">Check-in Georreferenciado</div>
                <div className="text-xs text-slate-500 font-normal">Validar com GPS na sala de aula</div>
              </div>
            </button>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-800">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>O registro só é computado dentro do raio de 50 metros da sala alocada.</span>
            </div>
          </div>
        )}

        {(step === 'scanning' || step === 'geo') && (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#009966]/20 border-t-[#009966] animate-spin" />
              {step === 'scanning' ? (
                <QrCode className="w-10 h-10 text-[#009966] animate-pulse" />
              ) : (
                <Navigation className="w-10 h-10 text-[#009966] animate-bounce" />
              )}
            </div>
            <h4 className="text-sm font-bold text-[#0f172b]">
              {step === 'scanning' ? 'Sincronizando com QR Code...' : 'Verificando coordenadas GPS...'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">Conectando com o totem da sala</p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8 flex flex-col items-center justify-center text-center animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-[#009966] text-white flex items-center justify-center mb-3 shadow-lg shadow-[#009966]/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-base font-bold text-[#0f172b]">Presença confirmada!</h4>
            <p className="text-xs text-slate-500 mt-1">Sua assiduidade de hoje foi computada com sucesso.</p>
          </div>
        )}
      </div>
    </div>
  );
};
