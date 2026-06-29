import React, { useState } from 'react';
import { StudentProfile, StudentClassItem, AttendanceMonthly } from './types';
import { StudentNavTab } from './components/student/StudentBottomNav';
import { StudentHeader } from './components/student/StudentHeader';
import { StudentProfileCard } from './components/student/StudentProfileCard';
import { StudentQuickActions } from './components/student/StudentQuickActions';
import { NextClassWidget } from './components/student/NextClassWidget';
import { DailyAgenda } from './components/student/DailyAgenda';
import { AttendanceWidget } from './components/student/AttendanceWidget';
import { StudentBottomNav } from './components/student/StudentBottomNav';
import { PresenceModal } from './components/student/modals/PresenceModal';
import { AiTutorModal } from './components/student/modals/AiTutorModal';
import { SpaceRentModal } from './components/student/modals/SpaceRentModal';
import { ClassRatingModal } from './components/student/modals/ClassRatingModal';
import { StudentNotificationsModal } from './components/student/modals/StudentNotificationsModal';
import { StudentAgendaTab } from './components/student/tabs/StudentAgendaTab';
import { StudentGradesTab } from './components/student/tabs/StudentGradesTab';
import { StudentMenuTab } from './components/student/tabs/StudentMenuTab';
import { StudentWeeklySchedule } from './components/student/StudentWeeklySchedule';
import { Clock, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

export default function App() {
  // Navigation State (4 abas)
  const [activeTab, setActiveTab] = useState<StudentNavTab>('inicio');

  // Modais Controlers
  const [isPresenceOpen, setIsPresenceOpen] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isSpaceOpen, setIsSpaceOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isNotifsOpen, setIsNotifsOpen] = useState(false);

  const [ratingTargetClass, setRatingTargetClass] = useState<StudentClassItem | null>(null);

  // B. Card de Perfil e Progresso
  const [studentProfile] = useState<StudentProfile>({
    name: 'Lucas Henrique Silva',
    course: 'Engenharia de Software',
    semester: '4º Período',
    cr: 8.9,
    ra: '202409118',
    email: 'lucas.henrique@sysclass.edu.br',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&fit=crop'
  });

  // D. Widget de Próxima Aula & E. Agenda do Dia com Avaliação
  const [dailyClasses, setDailyClasses] = useState<StudentClassItem[]>([
    {
      id: 'c1',
      discipline: 'Engenharia de Software & Arquitetura',
      code: 'ES-401',
      professor: 'Fernanda Lins',
      time: '08:00 - 09:40',
      room: 'Sala 104',
      block: 'Bloco A',
      status: 'encerrada',
      rating: undefined // Pendente de avaliação ★
    },
    {
      id: 'c2',
      discipline: 'Banco de Dados Avançado',
      code: 'BD-402',
      professor: 'Ricardo Almeida',
      time: '10:00 - 11:40',
      room: 'Sala 201',
      block: 'Bloco B',
      status: 'proxima',
      timeUntil: '15 min'
    },
    {
      id: 'c3',
      discipline: 'Inteligência Artificial Aplicada',
      code: 'IA-405',
      professor: 'Marcos Vinicius',
      time: '19:00 - 20:40',
      room: 'Anfiteatro Tecnológico',
      block: 'Bloco C',
      status: 'futura'
    }
  ]);

  // F. Progresso de Assiduidade (mensal no semestre atual)
  const [attendanceData] = useState<AttendanceMonthly[]>([
    { month: 'Mar', percentage: 95, attended: 38, total: 40 },
    { month: 'Abr', percentage: 88, attended: 35, total: 40 },
    { month: 'Mai', percentage: 92, attended: 37, total: 40 },
    { month: 'Jun', percentage: 90, attended: 36, total: 40 },
  ]);

  const nextClassItem = dailyClasses.find(c => c.status === 'proxima') || dailyClasses[1];

  const handleRateSubmit = (classId: string, rating: number, _comment: string) => {
    setDailyClasses(prev => prev.map(c => {
      if (c.id === classId) return { ...c, rating };
      return c;
    }));
  };

  const handlePresenceSuccess = () => {
    // Transforma a aula próxima em 'agora' se desejar, ou apenas computa
    setDailyClasses(prev => prev.map(c => {
      if (c.status === 'proxima') return { ...c, status: 'agora' };
      return c;
    }));
  };

  return (
    <div className="min-h-screen bg-[#0c111d] py-4 sm:py-8 px-2 sm:px-4 flex items-center justify-center font-sans antialiased selection:bg-[#009966]/20 selection:text-[#009966]">
      {/* 1. ESTRUTURA DO VIEWPORT MOBILE: Smartphone moderno de 440px */}
      <div className="w-full max-w-[440px] bg-[#F8FAFC] min-h-[860px] max-h-[92vh] sm:rounded-[42px] rounded-3xl shadow-2xl shadow-black/60 border-4 border-slate-800/80 overflow-y-auto relative flex flex-col no-scrollbar">
        
        {/* Speaker / Dynamic Island notch simulation on desktop */}
        <div className="sticky top-0 z-40 bg-[#F8FAFC]/95 backdrop-blur-md pt-2">
          <div className="w-24 h-4 bg-slate-200/80 rounded-full mx-auto mb-1 hidden sm:block" />
        </div>

        {/* A. Header de Identificação */}
        <StudentHeader
          unreadCount={2}
          onOpenNotifications={() => setIsNotifsOpen(true)}
          onLogout={() => alert("Sessão encerrada com segurança.")}
        />

        {/* Mapeamento das 4 Abas inferiores */}
        <main className="flex-1 pb-24">
          {activeTab === 'inicio' && (
            <div className="space-y-1 animate-fade-in">
              {/* B. Card de Perfil e Progresso */}
              <StudentProfileCard profile={studentProfile} />

              {/* C. Grid de Ações Rápidas (3 cards idênticos ao padrão) */}
              <StudentQuickActions
                onPresenceClick={() => setIsPresenceOpen(true)}
                onTutorClick={() => setActiveTab('horarios')}
                onSpaceClick={() => setActiveTab('assinaturas')}
              />

              {/* Grade Semanal de Aulas conforme print */}
              <StudentWeeklySchedule
                classes={dailyClasses}
                onClassClick={() => setIsPresenceOpen(true)}
                onRateClass={(item) => { setRatingTargetClass(item); setIsRatingOpen(true); }}
              />
            </div>
          )}

          {activeTab === 'ponto' && (
            <div className="p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-[#0f172b]">Controle de Ponto</h2>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0066cc] text-xs font-bold">Check-in</span>
              </div>
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center">
                <Clock className="w-12 h-12 text-[#0066cc] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">Registrar Presença</h3>
                <p className="text-xs text-slate-500 mb-6">Confirme sua localização na sala de aula para validar sua presença na disciplina atual.</p>
                <button
                  onClick={() => setIsPresenceOpen(true)}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#0066cc] hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Fazer Check-in Agora
                </button>
              </div>
              
              <div className="mt-8">
                <AttendanceWidget data={attendanceData} />
              </div>
            </div>
          )}

          {activeTab === 'horarios' && (
            <StudentAgendaTab
              classes={dailyClasses}
              onClassClick={() => setIsPresenceOpen(true)}
            />
          )}

          {activeTab === 'assinaturas' && (
            <div className="p-6 animate-fade-in space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-black text-[#0f172b]">Assinaturas e Locações</h2>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              </div>
              <p className="text-xs text-slate-500 mb-4">Gerencie termos acadêmicos pendentes e solicite reserva de salas e laboratórios.</p>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Termo de Compromisso de Estágio</h4>
                    <p className="text-2xs text-rose-600 font-bold mt-0.5">Assinatura Pendente • Vence hoje</p>
                  </div>
                </div>
                <button onClick={() => alert("Documento assinado digitalmente com certificado Gov.br/ICP-Brasil.")} className="px-3 py-1.5 bg-[#0f172b] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-slate-800 active:scale-95 transition-all">
                  Assinar
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0066cc]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Locação de Sala / Laboratório</h4>
                    <p className="text-2xs text-slate-500 mt-0.5">Reserve espaços de estudo ou bancadas</p>
                  </div>
                </div>
                <button onClick={() => setIsSpaceOpen(true)} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 active:scale-95 transition-all">
                  Reservar
                </button>
              </div>
            </div>
          )}
        </main>

        {/* 3. BARRA DE NAVEGAÇÃO INFERIOR (4 ABAS) */}
        <StudentBottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* --- Modais do Aluno --- */}
        <PresenceModal
          isOpen={isPresenceOpen}
          onClose={() => setIsPresenceOpen(false)}
          currentClass={nextClassItem}
          onSuccess={handlePresenceSuccess}
        />

        <AiTutorModal
          isOpen={isTutorOpen}
          onClose={() => setIsTutorOpen(false)}
          courseName={nextClassItem ? nextClassItem.discipline : "Engenharia de Software"}
        />

        <SpaceRentModal
          isOpen={isSpaceOpen}
          onClose={() => setIsSpaceOpen(false)}
          onBookSuccess={(name, slot) => {
            alert(`Sua reserva em "${name}" para o horário (${slot}) foi confirmada!`);
          }}
        />

        <ClassRatingModal
          isOpen={isRatingOpen}
          onClose={() => setIsRatingOpen(false)}
          classItem={ratingTargetClass}
          onSubmitRating={handleRateSubmit}
        />

        <StudentNotificationsModal
          isOpen={isNotifsOpen}
          onClose={() => setIsNotifsOpen(false)}
        />
      </div>
    </div>
  );
}
