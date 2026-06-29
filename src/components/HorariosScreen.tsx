import React, { useState } from 'react';
import { 
  CalendarClock, 
  Clock, 
  Save, 
  CheckCircle, 
  ArrowLeft, 
  Users, 
  MapPin, 
  Check, 
  X, 
  AlertTriangle,
  ChevronLeft
} from 'lucide-react';
import { WeeklyAvailability, ClassSchedule } from '../types';

interface HorariosScreenProps {
  availability: WeeklyAvailability;
  onUpdateAvailability: (newAvail: WeeklyAvailability) => void;
  schedules: ClassSchedule[];
  onBack: () => void;
}

export default function HorariosScreen({ 
  availability, 
  onUpdateAvailability, 
  schedules,
  onBack
}: HorariosScreenProps) {
  // Navigation State
  const [currentView, setCurrentView] = useState<'menu' | 'disponibilidade' | 'meus_horarios'>('menu');
  const [activeDayTab, setActiveDayTab] = useState<'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex'>('Seg');
  
  // Save Feedback state
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  const daysOfWeekLabels: { key: keyof WeeklyAvailability; label: string }[] = [
    { key: 'Seg', label: 'Segunda-feira' },
    { key: 'Ter', label: 'Terça-feira' },
    { key: 'Qua', label: 'Quarta-feira' },
    { key: 'Qui', label: 'Quinta-feira' },
    { key: 'Sex', label: 'Sexta-feira' }
  ];

  const handleToggleSlot = (day: keyof WeeklyAvailability, period: 'morning' | 'afternoon' | 'night') => {
    const updated = {
      ...availability,
      [day]: {
        ...availability[day],
        [period]: !availability[day][period]
      }
    };
    onUpdateAvailability(updated);
  };

  const handleSaveAvailability = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 2500);
    }, 1200);
  };

  const countSelectedSlots = () => {
    let count = 0;
    (Object.keys(availability) as Array<keyof WeeklyAvailability>).forEach((d) => {
      if (availability[d].morning) count++;
      if (availability[d].afternoon) count++;
      if (availability[d].night) count++;
    });
    return count;
  };

  // Filter schedules by day
  const filteredSchedules = schedules.filter(s => s.dayOfWeek === activeDayTab);

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-[#0066cc]/10 via-white to-[#f8fafc]" id="horarios_screen_modulo">
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
              if (currentView === 'disponibilidade' || currentView === 'meus_horarios') {
                setCurrentView('menu');
              } else {
                onBack();
              }
            }}
            className="p-1.5 -ml-1 text-[#0f172b] hover:bg-slate-50 active:scale-95 transition-all text-slate-700 flex items-center justify-center shrink-0 cursor-pointer"
            id="btn_back_horarios"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <ChevronLeft className="w-5.5 h-5.5 stroke-[2.5]" />
          </button>
          
          <h1 className="text-sm font-extrabold text-[#0f172b] tracking-tight absolute left-1/2 -translate-x-1/2 whitespace-nowrap select-none font-sans">
            {currentView === 'menu' ? 'Horários & Câmpus' : currentView === 'disponibilidade' ? 'Disponibilidade' : 'Meus Horários'}
          </h1>
          
          <div className="w-9"></div> {/* Spacer balance */}
        </div>

        {/* Description Text block in matching dark blue/grey typography for perfect legibility */}
        <div className="pl-6.5 pr-2">
          <p className="text-[11px] text-[#5c6f84] font-medium leading-relaxed font-sans select-none">
            {currentView === 'menu' 
              ? 'Gerencie seus períodos letivos propostos e visualize sua grade semanal completa'
              : currentView === 'disponibilidade' 
                ? 'Configure seus dias e horários para oferta acadêmica do semestre 2026.2'
                : 'Confira sua grade horária completa homologada pela diretoria de ensino'
            }
          </p>
        </div>
      </header>

      {/* Toast Feedback */}
      {showSaveToast && (
        <div className="fixed top-18 left-6 right-6 bg-[#0066cc] text-white px-4 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2 border border-white/10 animate-fade-in-down">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="text-[11px] font-bold">Disponibilidade salva com sucesso no sistema acadêmico!</span>
        </div>
      )}

      {/* Scroller Area matching Assinaturas flex layout */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 space-y-5 pt-4">

      {/* VIEW: MAIN SELECTION MENU */}
      {currentView === 'menu' && (
        <div className="space-y-5 animate-fade-in">
          {/* Cards Container */}
          <div className="px-5 space-y-3.5">
            {/* Card: Disponibilidade */}
            <button
              onClick={() => setCurrentView('disponibilidade')}
              className="w-full bg-white border border-[#e2e8f0] hover:border-[#0066cc]/40 rounded-[22px] p-4.5 flex items-center gap-4 text-left transition-all active:scale-98 cursor-pointer shadow-3xs group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0 transition-colors group-hover:bg-[#dbeafe]">
                <CalendarClock className="w-5.5 h-5.5 stroke-[1.6]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-black text-[#0f172b] tracking-tight">
                  Disponibilidade
                </h4>
                <p className="text-[10px] text-[#64748b] mt-1 leading-snug font-medium">
                  Gerencie sua disponibilidade semanal e por data
                </p>
              </div>
            </button>

            {/* Card: Meus Horários */}
            <button
              onClick={() => setCurrentView('meus_horarios')}
              className="w-full bg-white border border-[#e2e8f0] hover:border-[#0066cc]/40 rounded-[22px] p-4.5 flex items-center gap-4 text-left transition-all active:scale-98 cursor-pointer shadow-3xs group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0 transition-colors group-hover:bg-[#dbeafe]">
                <Clock className="w-5.5 h-5.5 stroke-[1.6]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-black text-[#0f172b] tracking-tight">
                  Meus Horários
                </h4>
                <p className="text-[10px] text-[#64748b] mt-1 leading-snug font-medium">
                  Visualize seu quadro de horários completo
                </p>
              </div>
            </button>
          </div>


        </div>
      )}

      {/* VIEW: DISPONIBILIDADE FORM */}
      {currentView === 'disponibilidade' && (
        <div className="space-y-4 animate-fade-in py-1">

          {/* Quick Header Summary */}
          <div className="mx-5 bg-white border border-[#e2e8f0] p-5 rounded-3xl relative overflow-hidden shadow-3xs">
            <div className="absolute top-0 bottom-0 right-0 w-24 opacity-5 bg-[radial-gradient(#0f172b_1px,transparent_1px)] [background-size:10px_10px]"></div>
            
            <h4 className="text-xs font-bold text-[#0066cc] uppercase tracking-wider flex items-center gap-1 leading-none">
              Alocação Semestre 2026.2
            </h4>
            <p className="text-base font-extrabold text-[#0f172b] mt-1.5 tracking-tight">
              {countSelectedSlots() * 4}h <span className="text-xs font-semibold text-slate-500">alocadas na semana</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal font-medium">
              Selecione os turnos em que você deseja ministrar aulas. O setor pedagógico utilizará este quadro no ensalamento das turmas.
            </p>
          </div>

          {/* Day Scheduler Grid */}
          <div className="mx-5 space-y-3.5">
            {daysOfWeekLabels.map((dayLabel) => {
              const dayObj = availability[dayLabel.key];
              
              return (
                <div key={dayLabel.key} className="bg-white border border-[#e2e8f0] rounded-2.5xl p-4 shadow-3xs">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-extrabold text-[#0f172b]">{dayLabel.label}</span>
                    <span className="text-[9px] font-extrabold text-[#0066cc] font-mono uppercase bg-[#0066cc]/8 px-2 py-0.5 rounded-md border border-[#0066cc]/10">
                      {dayLabel.key}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {/* Turno Manhã */}
                    <button
                      onClick={() => handleToggleSlot(dayLabel.key, 'morning')}
                      className={`py-2 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                        dayObj.morning
                          ? 'bg-[#0066cc]/6 border-[#0066cc] text-[#0066cc]'
                          : 'bg-slate-50 border-[#e2e8f0] text-[#64748b] hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-extrabold">Manhã</span>
                      <span className="text-[8px] font-medium opacity-65 mt-0.5 font-mono">08h - 12h</span>
                    </button>

                    {/* Turno Tarde */}
                    <button
                      onClick={() => handleToggleSlot(dayLabel.key, 'afternoon')}
                      className={`py-2 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                        dayObj.afternoon
                          ? 'bg-[#0066cc]/6 border-[#0066cc] text-[#0066cc]'
                          : 'bg-slate-50 border-[#e2e8f0] text-[#64748b] hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-extrabold">Tarde</span>
                      <span className="text-[8px] font-medium opacity-65 mt-0.5 font-mono">13h - 17h</span>
                    </button>

                    {/* Turno Noite */}
                    <button
                      onClick={() => handleToggleSlot(dayLabel.key, 'night')}
                      className={`py-2 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                        dayObj.night
                          ? 'bg-[#0066cc]/6 border-[#0066cc] text-[#0066cc]'
                          : 'bg-slate-50 border-[#e2e8f0] text-[#64748b] hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-extrabold">Noite</span>
                      <span className="text-[8px] font-medium opacity-65 mt-0.5 font-mono">18h - 22h</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="px-5 pt-1.5 pb-12">
            <button
              onClick={handleSaveAvailability}
              disabled={isSaving}
              className="w-full bg-[#0066cc] text-white py-3.5 px-4 rounded-xl text-xs font-extrabold tracking-tight hover:bg-[#0052a3] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  <span>Salvando no Sistema...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Salvar Disponibilidade</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* VIEW: MEUS HORÁRIOS SHEET */}
      {currentView === 'meus_horarios' && (
        <div className="space-y-4 animate-fade-in py-1">

          {/* Day Selection Tabs Header */}
          <div className="px-5">
            <div className="flex bg-slate-100/80 p-1 rounded-2xl border border-slate-200/50 justify-between">
              {(['Seg', 'Ter', 'Qua', 'Qui', 'Sex'] as const).map((day) => {
                const isActive = activeDayTab === day;
                const dailyCount = schedules.filter(s => s.dayOfWeek === day).length;
                return (
                  <button
                    key={day}
                    onClick={() => setActiveDayTab(day)}
                    className={`flex-1 text-center py-2 rounded-xl text-[11px] font-black tracking-tight transition-all cursor-pointer flex flex-col items-center justify-center relative ${
                      isActive 
                        ? 'bg-white text-[#0f172b] shadow-2xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>{day}</span>
                    {dailyCount > 0 && (
                      <span className={`w-3.5 h-3.5 rounded-full text-[8px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isActive ? 'bg-[#0066cc] text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {dailyCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Classes Cards List for Selected Day */}
          <div className="px-5 space-y-3 pb-12">
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-white border ${item.confirmed ? 'border-[#e2e8f0]' : 'border-[#e17100]/30'} rounded-2.5xl p-4.5 space-y-3 shadow-3xs relative overflow-hidden`}
                >
                  {/* Left accent bar */}
                  <div className={`absolute top-0 bottom-0 left-0 w-1 ${item.confirmed ? 'bg-[#0066cc]' : 'bg-[#e17100]'}`}></div>

                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black text-slate-400 font-mono tracking-wider uppercase block">
                        {item.code}
                      </span>
                      <h4 className="text-[13px] font-black text-[#0f172b] tracking-tight pr-4">
                        {item.discipline}
                      </h4>
                    </div>
                    {/* Confirmation Badge according to color design system */}
                    <span className={`text-[8px] font-mono leading-none px-2 py-1 rounded-md font-extrabold uppercase shrink-0 border ${
                      item.confirmed 
                        ? 'bg-[#0066cc]/8 text-[#0066cc] border-[#0066cc]/10' 
                        : 'bg-[#e17100]/8 text-[#e17100] border-[#e17100]/10 font-extrabold uppercase shrink-0 border'
                    }`}>
                      {item.confirmed ? 'Confirmado' : 'Proposta'}
                    </span>
                  </div>

                  {/* Class Info grid */}
                  <div className="grid grid-cols-2 gap-y-2 pt-1.5 text-[10px] text-slate-500 font-semibold font-sans">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.time}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.studentsCount} Alunos</span>
                    </div>

                    <div className="col-span-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0066cc]" />
                      <span className="text-slate-600">{item.room} • {item.location}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-50/70 border border-dashed border-[#e2e8f0] rounded-2.5xl py-10 px-5 text-center flex flex-col items-center justify-center space-y-2">
                <Clock className="w-7 h-7 text-slate-300" />
                <h5 className="text-xs font-extrabold text-[#0f172b]">Nenhuma aula alocada</h5>
                <p className="text-[10px] text-slate-400 max-w-[210px] leading-relaxed">
                  Não existem disciplinas cadastradas ou homologadas para você neste dia da semana.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
