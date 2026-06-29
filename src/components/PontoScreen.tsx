import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Navigation, 
  ClipboardList, 
  Camera, 
  MapPinOff, 
  AlertCircle, 
  Fingerprint, 
  AlertTriangle, 
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  X,
  Upload,
  FileText,
  Check,
  AlertOctagon
} from 'lucide-react';
import { CheckInLog } from '../types';

interface PontoScreenProps {
  logs: CheckInLog[];
  onAddLog: (log: CheckInLog) => void;
  isCheckedIn: boolean;
  onSetCheckedIn: (status: boolean) => void;
  onBack: () => void;
}

interface OccurrenceType {
  id: string;
  title: string;
  date: string;
  period: string;
  status: 'pending' | 'approved' | 'critical' | 'submitted';
  badge: string;
  color: string;
  description: string;
  justificationText: string;
  attachedFile: string | null;
}

export default function PontoScreen({ logs, onAddLog, isCheckedIn, onSetCheckedIn, onBack }: PontoScreenProps) {
  // Sub-view Router: 'menu' | 'ponto_docente' | 'ocorrencias'
  const [currentView, setCurrentView] = useState<'menu' | 'ponto_docente' | 'ocorrencias'>('menu');

  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsAcquired, setGpsAcquired] = useState(true);
  const [sessionTimer, setSessionTimer] = useState<number>(0);
  
  // Custom Toast States
  const [showConfirmToast, setShowConfirmToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Interactive Occurrences State using requested design system coordinates
  const [occurrences, setOccurrences] = useState<OccurrenceType[]>([
    {
      id: 'occ-1',
      title: 'Esquecimento de Marcação',
      date: '31/05/2026',
      period: 'Noite',
      status: 'pending',
      badge: 'Atenção (Falta Saída)',
      color: '#e17100', // Atenção: e17100
      description: 'Não foi localizada a marcação de saída para a jornada letiva de Sistemas Distribuídos Avançados.',
      justificationText: '',
      attachedFile: null
    },
    {
      id: 'occ-2',
      title: 'Entrada com Atraso Excedente',
      date: '25/05/2026',
      period: 'Tarde',
      status: 'approved',
      badge: 'Validado',
      color: '#0066cc', // Azul: 0066cc
      description: 'Check-in efetuado fora do limite de tolerância regulamentar de 15 minutos.',
      justificationText: 'Consulta médica agendada no período da tarde, atestado anexado.',
      attachedFile: 'atestado_clinico_central.pdf'
    },
    {
      id: 'occ-3',
      title: 'Ausência de Marcações (Falta)',
      date: '18/05/2026',
      period: 'Manhã',
      status: 'critical',
      badge: 'Crítico',
      color: '#e7000b', // Crítico: e7000b
      description: 'Nenhuma atividade de check-in ou check-out detectada para o expediente previsto.',
      justificationText: '',
      attachedFile: null
    },
    {
      id: 'occ-4',
      title: 'Discrepância de Geolocalização',
      date: '12/05/2026',
      period: 'Noite',
      status: 'pending',
      badge: 'Alerta de Sinal',
      color: '#f54900', // Alerta: f54900
      description: 'O ponto foi registrado em área divergente da cerca virtual (geofencing) do campus.',
      justificationText: '',
      attachedFile: null
    }
  ]);

  // Justification Modal States
  const [selectedOcc, setSelectedOcc] = useState<OccurrenceType | null>(null);
  const [inputReason, setInputReason] = useState('');
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [simulatedFile, setSimulatedFile] = useState<string | null>(null);

  // Live real clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('pt-BR'));
      setCurrentDate(now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Shift stopwatch simulator
  useEffect(() => {
    let watch: number;
    if (isCheckedIn) {
      watch = window.setInterval(() => {
        setSessionTimer(prev => prev + 1);
      }, 1000);
    } else {
      setSessionTimer(0);
    }
    return () => clearInterval(watch);
  }, [isCheckedIn]);

  const formatStopwatch = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const simulateGpsAcquire = () => {
    setGpsLoading(true);
    setGpsAcquired(false);
    setTimeout(() => {
      setGpsLoading(false);
      setGpsAcquired(true);
    }, 1500);
  };

  const handleRegisterPonto = (type: 'check-in' | 'check-out') => {
    if (!gpsAcquired) {
      alert('Aguarde a aquisição do sinal GPS do câmpus para registrar.');
      return;
    }

    const now = new Date();
    const newLog: CheckInLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + ' - ' + now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      type: type,
      status: 'valid',
      location: 'Câmpus Paulista • Prédio Central (Sala 402)',
      method: 'Biometria Facial'
    };

    onAddLog(newLog);
    onSetCheckedIn(type === 'check-in');
    
    // Trigger success feedback
    setToastMessage(type === 'check-in' ? 'Check-in efetuado com sucesso!' : 'Check-out efetuado com sucesso!');
    setShowConfirmToast(true);
    setTimeout(() => setShowConfirmToast(false), 3000);
  };

  // Justification Drag and Drop Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileName = e.dataTransfer.files[0].name;
      setSimulatedFile(fileName);
    }
  };

  const handleBrowseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSimulatedFile(e.target.files[0].name);
    }
  };

  const handleSendJustification = () => {
    if (!selectedOcc) return;
    if (!inputReason.trim()) {
      alert('Por favor, informe a justificativa por escrito.');
      return;
    }

    // Update occurrences state
    setOccurrences(prev => prev.map(o => {
      if (o.id === selectedOcc.id) {
        return {
          ...o,
          status: 'submitted',
          badge: 'Em Análise',
          color: '#e17100', // Em análise sob Atenção
          justificationText: inputReason,
          attachedFile: simulatedFile || 'documento_comprovante_justificado.pdf'
        };
      }
      return o;
    }));

    // Toast
    setToastMessage('Justificativa enviada com sucesso para homologação!');
    setShowConfirmToast(true);
    setTimeout(() => setShowConfirmToast(false), 3000);

    // Reset Modal Form
    setSelectedOcc(null);
    setInputReason('');
    setSimulatedFile(null);
  };

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-[#0066cc]/10 via-white to-[#f8fafc]" id="ponto_screen_modulo">
      {/* Integrated Clean, Elevated Card Header Style */}
      <header className="bg-white border-b border-[#e2e8f0] pb-5 pt-4 px-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] relative select-none shrink-0 z-30">
        {/* Left accent line like in image_1.png profile card */}
        <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#0066cc]"></div>
        
        {/* Decorative subtle pulse spot in top right */}
        <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#0066cc]/5 rounded-full blur-xl"></div>

        {/* Back button and Centered Title row */}
        <div className="flex items-center justify-between mb-3 relative">
          <button 
            onClick={() => {
              if (currentView === 'ponto_docente' || currentView === 'ocorrencias') {
                setCurrentView('menu');
              } else {
                onBack();
              }
            }}
            className="p-1.5 -ml-1 text-[#0f172b] hover:bg-slate-50 active:scale-95 transition-all text-slate-700 flex items-center justify-center shrink-0 cursor-pointer"
            id="btn_back_ponto"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <ChevronLeft className="w-5.5 h-5.5 stroke-[2.5]" />
          </button>
          
          <h1 className="text-sm font-extrabold text-[#0f172b] tracking-tight absolute left-1/2 -translate-x-1/2 whitespace-nowrap select-none font-sans">
            {currentView === 'menu' ? 'Ponto Eletrônico' : currentView === 'ponto_docente' ? 'Ponto Docente' : 'Ocorrências do Ponto'}
          </h1>
          
          <div className="w-9"></div> {/* Spacer balance */}
        </div>

        {/* Description Text block in matching dark blue/grey typography for perfect legibility */}
        <div className="pl-6.5 pr-2">
          <p className="text-[11px] text-[#5c6f84] font-medium leading-relaxed font-sans select-none">
            {currentView === 'menu' 
              ? 'Acesse as ferramentas de registro diário de jornada e consulte ajustes acadêmicos'
              : currentView === 'ponto_docente' 
                ? 'Registro em tempo real com validação biométrica e coordenadas educacionais'
                : 'Acompanhe eventuais faltas de registros, atrasos excedentes ou ausências a tratar'
            }
          </p>
        </div>
      </header>

      {/* Dynamic Action Feedbacks */}
      {showConfirmToast && (
        <div className="fixed top-18 left-6 right-6 bg-[#0066cc] text-white px-4 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2 border border-white/10 animate-fade-in-down">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Scroller Area matching Assinaturas flex layout */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 space-y-5 pt-4">

      {/* VIEW 1: CATEGORY SELECTION MENU */}
      {currentView === 'menu' && (
        <div className="space-y-5 animate-fade-in">
          {/* Cards Split Container */}
          <div className="px-5 space-y-3.5">
            {/* Card: Ponto Docente */}
            <button
              onClick={() => setCurrentView('ponto_docente')}
              className="w-full bg-white border border-[#e2e8f0] hover:border-[#0066cc]/40 rounded-[22px] p-4.5 flex items-center gap-4 text-left transition-all active:scale-98 cursor-pointer shadow-3xs group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0 transition-colors group-hover:bg-[#dbeafe]">
                <Fingerprint className="w-5.5 h-5.5 stroke-[1.6]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-black text-[#0f172b] tracking-tight">
                  Ponto Docente
                </h4>
                <p className="text-[10px] text-[#64748b] mt-1 leading-snug font-medium">
                  Registro de entrada e saída do ponto
                </p>
              </div>
            </button>

            {/* Card: Ocorrências do Ponto */}
            <button
              onClick={() => setCurrentView('ocorrencias')}
              className="w-full bg-white border border-[#e2e8f0] hover:border-[#0066cc]/40 rounded-[22px] p-4.5 flex items-center gap-4 text-left transition-all active:scale-98 cursor-pointer shadow-3xs group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0 transition-colors group-hover:bg-[#dbeafe]">
                <AlertTriangle className="w-5.5 h-5.5 stroke-[1.6]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-black text-[#0f172b] tracking-tight">
                  Ocorrências do Ponto
                </h4>
                <p className="text-[10px] text-[#64748b] mt-1 leading-snug font-medium">
                  Histórico e justificativas de ocorrências
                </p>
              </div>
            </button>
          </div>

        </div>
      )}

      {/* VIEW 2: PONTO DOCENTE REGISTER PAGE */}
      {currentView === 'ponto_docente' && (
        <div className="space-y-5 animate-fade-in pb-12">
          <div className="px-5">
            <p className="text-xs text-slate-500 font-medium font-sans">Registro em tempo real com validação biométrica e coordenadas educacionais</p>
          </div>

          {/* Visual Live GPS Box */}
          <div className="mx-5 bg-white border border-[#e2e8f0] rounded-3xl p-5 shadow-sm text-center relative overflow-hidden">
            <span className="text-xs text-slate-400 capitalize block leading-none">{currentDate}</span>
            <span className="text-3xl font-black text-[#0f172b] tracking-tight block mt-2 font-mono">{currentTime || '14:20:00'}</span>

            {/* GPS Geofenced indicator */}
            <div className={`mt-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold ${
              gpsLoading 
                ? 'bg-slate-100 text-slate-500 border border-slate-200 animate-pulse'
                : gpsAcquired
                  ? 'bg-[#0066cc]/8 text-[#0066cc] border border-[#0066cc]/15'
                  : 'bg-[#e7000b]/8 text-[#e7000b] border border-[#e7000b]/15'
            }`}>
              {gpsLoading ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-ping"></div>
                  <span>Rastreando Câmpus...</span>
                </>
              ) : gpsAcquired ? (
                <>
                  <Navigation className="w-3.5 h-3.5 fill-[#0066cc] text-[#0066cc]" />
                  <span>Dentro do limite escolar • GPS Preciso</span>
                </>
              ) : (
                <>
                  <MapPinOff className="w-3.5 h-3.5" />
                  <span>Sinal de Localização Ausente</span>
                </>
              )}
            </div>

            {/* Fake Map visual preview */}
            <div className="mt-4 bg-slate-50 border border-slate-100 rounded-2xl p-3.5 relative overflow-hidden flex flex-col items-center justify-center h-28">
              <div className="absolute inset-0 opacity-12 bg-[radial-gradient(#0066cc_1.5px,transparent_1.5px)] [background-size:12px_12px]"></div>
              
              {/* Signal radius circles */}
              <div className="relative w-12 h-12 rounded-full bg-[#0066cc]/10 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#0066cc]/20 animate-ping opacity-60"></div>
                <MapPin className="w-6 h-6 text-[#0066cc] drop-shadow-sm" />
              </div>
              
              <p className="text-[10px] font-bold text-slate-600 z-10 mt-1">Câmpus Paulista • Prédio Central</p>
              <p className="text-[9px] text-[#0066cc] font-mono z-10 font-bold">-23.55052, -46.63331 • Tolerância 20m</p>
            </div>

            {/* Stopwatch display when checked in */}
            {isCheckedIn && (
              <div className="mt-4 p-3 bg-[#0066cc]/5 rounded-2xl border border-[#0066cc]/20 text-center animate-pulse-soft">
                <p className="text-[9px] font-bold text-[#0066cc] uppercase tracking-wider">Jornada técnica atual</p>
                <p className="text-xl font-bold font-mono text-slate-800 mt-1">{formatStopwatch(sessionTimer)}</p>
              </div>
            )}

            {/* Big Action Buttons */}
            <div className="mt-5 grid grid-cols-2 gap-3.5">
              <button
                onClick={() => handleRegisterPonto('check-in')}
                disabled={isCheckedIn || gpsLoading}
                className={`py-3.5 px-4 rounded-xl text-xs font-bold tracking-tight transition-all active:scale-95 shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer ${
                  isCheckedIn 
                    ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    : 'bg-[#0066cc] text-white hover:bg-[#0055b3]'
                }`}
              >
                <Clock className="w-4 h-4 shrink-0" />
                Entrada (Check-in)
              </button>

              <button
                onClick={() => handleRegisterPonto('check-out')}
                disabled={!isCheckedIn || gpsLoading}
                className={`py-3.5 px-4 rounded-xl text-xs font-bold tracking-tight transition-all active:scale-95 shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer ${
                  !isCheckedIn 
                    ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    : 'bg-[#0066cc] text-white hover:bg-[#0052a3]'
                }`}
              >
                <Clock className="w-4 h-4 rotate-180 shrink-0" />
                Saída (Check-out)
              </button>
            </div>

            {/* Refresh GPS manual trigger */}
            <button 
              onClick={simulateGpsAcquire}
              className="mt-3.5 text-[10px] font-bold text-slate-400 hover:text-slate-600 underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              Seu sinal está fraco? Recalibrar Geolocalização
            </button>
          </div>

          {/* Point History Log */}
          <div className="mx-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Histórico Recente de Marcações</h3>
              <span className="text-[10px] font-bold text-slate-500 font-mono">Maio/Junho 2026</span>
            </div>

            <div className="bg-white border border-[#e2e8f0] rounded-3xl overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {logs.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    Nenhuma batida registrada neste dispositivo ainda.
                  </div>
                ) : (
                  logs.map((log) => {
                    let statusColor = "bg-[#0066cc]/8 text-[#0066cc] border-[#0066cc]/15";
                    let statusLabel = "Válido";
                    
                    if (log.status === 'warning') {
                      statusColor = "bg-[#e17100]/8 text-[#e17100] border-[#e17100]/15";
                      statusLabel = "Atenção (Sem Aula)";
                    } else if (log.status === 'alert') {
                      statusColor = "bg-[#f54900]/8 text-[#f54900] border-[#f54900]/15";
                      statusLabel = "Atrasado";
                    } else if (log.status === 'critical') {
                      statusColor = "bg-[#e7000b]/8 text-[#e7000b] border-[#e7000b]/15";
                      statusLabel = "Inconsistente";
                    }

                    const isCheckIn = log.type === 'check-in';

                    return (
                      <div key={log.id} className="p-4 flex items-start justify-between gap-3 hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-start gap-3">
                          {/* Icon using color system */}
                          <div className={`w-8.5 h-8.5 rounded-full border flex items-center justify-center shrink-0 ${
                            isCheckIn 
                              ? 'bg-[#0066cc]/5 border-[#0066cc]/10 text-[#0066cc]' 
                              : 'bg-slate-100 border-slate-200 text-[#0f172b]'
                          }`}>
                            <Clock className={`w-4 h-4 ${!isCheckIn && 'rotate-180'}`} />
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className="text-xs font-bold text-[#0f172b]">
                                {isCheckIn ? 'Check-in Realizado' : 'Check-out Realizado'}
                              </p>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${statusColor}`}>
                                {statusLabel}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-mono mt-1">{log.timestamp}</p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5 flex items-center gap-0.5">
                              <MapPin className="w-3 h-3 text-slate-300" />
                              {log.location}
                            </p>
                          </div>
                        </div>

                        <div className="text-right text-[10px] text-slate-400 font-medium shrink-0 font-mono text-[9px]">
                          <span>{log.method}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            
            {/* Compliance details according to MTE Ordinance */}
            <div className="mt-4 p-3.5 bg-slate-100 border border-slate-200 rounded-2xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-black text-[#0f172b] uppercase tracking-wider font-mono">Portaria MTE 671/2021</p>
                <p className="text-[9.5px] text-slate-500 font-semibold leading-relaxed mt-0.5">
                  Este sistema atende integralmente à legislação trabalhista nacional de controle de ponto portátil REP-P da SysClass Sistemas Ltda.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: OCORRÊNCIAS DO PONTO LIST & JUSTIFICATIONS */}
      {currentView === 'ocorrencias' && (
        <div className="space-y-4 animate-fade-in pb-12">
          {/* Screen Info Info */}
          <div className="px-5">
            <p className="text-xs text-slate-500 font-medium pr-5">Acompanhe eventuais faltas de registros, atrasos excedentes ou ausências a tratar</p>
          </div>

          {/* List of occurrences */}
          <div className="px-5 space-y-3">
            {occurrences.map((occ) => {
              const bgBadgeColor = `${occ.color}10`;
              const isResolved = occ.status === 'approved' || occ.status === 'submitted';
              
              return (
                <div 
                  key={occ.id} 
                  className={`border border-[#e2e8f0] bg-white rounded-3xl p-4.5 flex flex-col justify-between gap-3 shadow-3xs hover:border-slate-300 transition-all text-left relative overflow-hidden`}
                >
                  {/* Color bar indicator on the left side based on requested schema */}
                  <div className="absolute top-0 bottom-0 left-0 w-1" style={{ backgroundColor: occ.color }}></div>

                  <div className="space-y-1 pl-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-extrabold text-[#0f172b] leading-tight flex-1">
                        {occ.title}
                      </span>
                      <span 
                        className="text-[8px] font-extrabold px-2 py-0.5 rounded border tracking-wider font-sans uppercase shrink-0"
                        style={{ backgroundColor: bgBadgeColor, textColor: occ.color, borderColor: `${occ.color}25`, color: occ.color }}
                      >
                        {occ.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[9px] text-slate-400 font-mono mt-1">
                      <span>Ref: {occ.date}</span>
                      <span>•</span>
                      <span>Turno: {occ.period}</span>
                    </div>

                    <p className="text-[10.5px] text-[#64748b] font-medium leading-relaxed mt-2">
                      {occ.description}
                    </p>
                  </div>

                  {/* Attachment indicator if exists */}
                  {occ.attachedFile && (
                    <div className="mx-1 p-2 bg-slate-50 rounded-xl border border-slate-200/65 flex items-center justify-between text-[10px] text-slate-600 font-mono">
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{occ.attachedFile}</span>
                      </div>
                      <span className="text-[8px] font-bold text-[#0066cc] bg-[#0066cc]/10 px-1 py-0.5 rounded">Anexado</span>
                    </div>
                  )}

                  {/* Write Out the action buttons exactly following colors */}
                  <div className="pt-2 pl-1 flex items-center justify-between border-t border-slate-100/80 mt-1">
                    <div>
                      {occ.justificationText ? (
                        <p className="text-[9.5px] italic text-slate-500 line-clamp-1">
                          " {occ.justificationText} "
                        </p>
                      ) : (
                        <span className="text-[9px] font-bold text-[#e17100] flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Requer Tratamento
                        </span>
                      )}
                    </div>

                    {!isResolved ? (
                      <button
                        onClick={() => setSelectedOcc(occ)}
                        className="py-1.5 px-3 bg-[#0066cc] hover:bg-[#0052a3] text-white rounded-xl text-[9px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shadow-3xs"
                      >
                        Justificar Ficha
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 text-[9px] font-bold text-[#0066cc]">
                        <Check className="w-3.5 h-3.5" />
                        <span>Tratada</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      </div>

      {/* MODAL: SUBMIT OCCURRENCE JUSTIFICATION WITH FILE UPLOAD */}
      {selectedOcc && (
        <div className="fixed inset-0 bg-[#0f172b]/40 backdrop-blur-xs flex items-center justify-center p-5 z-50">
          <div className="bg-white rounded-3xl p-5 w-full max-w-[330px] shadow-2xl border border-[#e2e8f0] text-left space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-1.5 pt-0.5">
                <AlertCircle className="w-4 h-4 text-[#e17100]" />
                <span className="text-[10px] font-mono font-extrabold text-[#0f172b] uppercase tracking-wider">
                  Tratamento de Ocorrência
                </span>
              </div>
              <button 
                onClick={() => {
                  setSelectedOcc(null);
                  setInputReason('');
                  setSimulatedFile(null);
                }}
                className="p-1 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-full cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Occ recap */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[8px] font-bold block text-[#64748b] tracking-wider uppercase font-mono">Ocorrência selecionada</span>
              <p className="text-[11px] font-extrabold text-[#0f172b]">{selectedOcc.title}</p>
              <p className="text-[9px] text-[#64748b] font-medium leading-normal">{selectedOcc.description}</p>
            </div>

            {/* Textarea */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase block font-mono">Motivo da Justificativa</label>
              <textarea
                value={inputReason}
                onChange={(e) => setInputReason(e.target.value)}
                placeholder="Informe detalhadamente o evento ou inconsistência técnica ocorrida para análise da diretoria..."
                className="w-full h-18 text-[11px] p-2.5 border border-[#e2e8f0] rounded-xl focus:outline-none focus:border-[#0066cc] bg-white text-[#0f172b] resize-none font-sans font-medium"
              />
            </div>

            {/* File Upload Box (Interactive with drag&drop constraint) */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase block font-mono">Anexar Comprovante (Opcional)</label>
              
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  isDraggingFile 
                    ? 'border-[#0066cc] bg-[#0066cc]/4' 
                    : simulatedFile 
                      ? 'border-[#0066cc]/40 bg-[#0066cc]/4' 
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <input 
                  type="file" 
                  id="justification_file_upload_input"
                  onChange={handleBrowseFile}
                  className="hidden" 
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                />
                
                <label 
                  htmlFor="justification_file_upload_input"
                  className="absolute inset-0 cursor-pointer"
                />

                {simulatedFile ? (
                  <div className="space-y-1 flex flex-col items-center z-10 pointer-events-none">
                    <FileText className="w-7 h-7 text-[#0066cc]" />
                    <p className="text-[10px] font-bold text-[#0f172b] max-w-[220px] truncate">{simulatedFile}</p>
                    <p className="text-[8px] font-semibold text-slate-400">Clique para substituir</p>
                  </div>
                ) : (
                  <div className="space-y-1 flex flex-col items-center z-10 pointer-events-none">
                    <Upload className="w-7 h-7 text-slate-300" />
                    <p className="text-[10.5px] font-bold text-slate-600">Arraste ou clique para anexar</p>
                    <p className="text-[8.5px] font-medium text-slate-400 leading-tight">Suporta PDF, JPEG, PNG até 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Action Block */}
            <div className="pt-2 grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  setSelectedOcc(null);
                  setInputReason('');
                  setSimulatedFile(null);
                }}
                className="py-2.5 border border-[#e2e8f0] text-slate-600 rounded-xl text-[10.5px] font-bold text-center cursor-pointer hover:bg-slate-50 transition-all font-sans"
              >
                Cancelar
              </button>
              
              <button
                onClick={handleSendJustification}
                className="py-2.5 bg-[#0066cc] text-white rounded-xl text-[10.5px] font-bold text-center cursor-pointer hover:bg-[#0066cc]/90 transition-all flex items-center justify-center gap-1 shadow-3xs font-sans"
              >
                <Check className="w-3.5 h-3.5" />
                Desejo Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline Custom Icon to avoid importing external packages
function AlertSquareCustom(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m12 8 4 4-4 4" />
      <path d="M8 12h8" />
    </svg>
  );
}
