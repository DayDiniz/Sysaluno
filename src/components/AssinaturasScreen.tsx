import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Fingerprint, 
  FileText, 
  CheckCircle, 
  ShieldCheck, 
  Lock, 
  Calendar, 
  User, 
  Clock, 
  Check, 
  X, 
  AlertCircle 
} from 'lucide-react';

export interface Documento {
  id: string;
  name: string;
  date: string;
  category: string;
  status: 'pending' | 'signed';
  signatureDate?: string;
  hash?: string;
}

interface AssinaturasScreenProps {
  onBack: () => void;
  onDocumentSigned?: (docName: string) => void;
}

export default function AssinaturasScreen({ onBack, onDocumentSigned }: AssinaturasScreenProps) {
  // Tabs State
  const [activeTab, setActiveTab] = useState<'pending' | 'signed'>('pending');

  // Document List State
  const [documentos, setDocumentos] = useState<Documento[]>([
    {
      id: 'doc_1',
      name: 'Pactuação de Carga Horária 2026/2',
      date: '08/06/2026',
      category: 'Recursos Humanos',
      status: 'pending'
    },
    {
      id: 'doc_2',
      name: 'Plano de Ensino IA-812 • IA Avançada',
      date: '05/06/2026',
      category: 'Acadêmico',
      status: 'pending'
    },
    {
      id: 'doc_3',
      name: 'Roteiro de Pesquisa e Extensão',
      date: '01/06/2026',
      category: 'Pesquisa',
      status: 'pending'
    },
    {
      id: 'doc_4',
      name: 'Termo de Propriedade Intelectual',
      date: '20/05/2026',
      category: 'Jurídico',
      status: 'signed',
      signatureDate: '21/05/2026 14:32',
      hash: 'SHA256: 8a7c...f3b2'
    },
    {
      id: 'doc_5',
      name: 'Contrato de Prestação de Serviços Docente',
      date: '10/05/2026',
      category: 'Recursos Humanos',
      status: 'signed',
      signatureDate: '12/05/2026 09:15',
      hash: 'SHA256: 4e91...a12b'
    }
  ]);

  // Signature Overlay State
  const [showSignPanel, setShowSignPanel] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Documento | null>(null);
  
  // Validation Simulation states
  const [isFingerprintScanned, setIsFingerprintScanned] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [isSigningProgress, setIsSigningProgress] = useState(false);
  const [signFinished, setSignFinished] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const pendingDocs = documentos.filter(d => d.status === 'pending');
  const signedDocs = documentos.filter(d => d.status === 'signed');

  const handleOpenSignature = (doc: Documento) => {
    setSelectedDoc(doc);
    setIsFingerprintScanned(false);
    setBiometricStatus('idle');
    setValidationError(null);
    setSignFinished(false);
    setShowSignPanel(true);
  };

  const handleCloseSignature = () => {
    if (isSigningProgress) return;
    setShowSignPanel(false);
    setSelectedDoc(null);
  };

  // Simulates the physical fingerprint scanning holding/press effect or touch click
  const handleScanBiometrics = () => {
    if (biometricStatus !== 'idle') return;
    setBiometricStatus('scanning');
    setValidationError(null);

    setTimeout(() => {
      setBiometricStatus('success');
      setIsFingerprintScanned(true);
    }, 1500);
  };

  // Confirm Signature submit
  const handleConfirmSignature = () => {
    if (!selectedDoc) return;
    
    // Validations
    if (!isFingerprintScanned) {
      setValidationError('Por favor, valide sua biometria digital.');
      return;
    }

    setValidationError(null);
    setIsSigningProgress(true);

    // Simulate cryptographic signature generation
    setTimeout(() => {
      setIsSigningProgress(false);
      setSignFinished(true);

      // Perform state update
      setDocumentos(prev => prev.map(d => {
        if (d.id === selectedDoc.id) {
          return {
            ...d,
            status: 'signed',
            signatureDate: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}),
            hash: 'SHA256: ' + Math.random().toString(16).substr(2, 4) + '...' + Math.random().toString(16).substr(2, 4)
          };
        }
        return d;
      }));

      // Trigger callback if defined
      if (onDocumentSigned) {
        onDocumentSigned(selectedDoc.name);
      }

      // Close after beautiful layout animation display
      setTimeout(() => {
        setShowSignPanel(false);
        setSelectedDoc(null);
      }, 1500);

    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-[#0066cc]/10 via-white to-[#f8fafc]" id="central_assinaturas_modulo">
      {/* Integrated Clean, Elevated Card Header Style */}
      <header className="bg-white border-b border-[#e2e8f0] pb-5 pt-4 px-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] relative select-none shrink-0 z-30">
        {/* Left accent line like in image_1.png profile card */}
        <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#0066cc]"></div>
        
        {/* Decorative subtle pulse spot in top right */}
        <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#0066cc]/5 rounded-full blur-xl"></div>

        {/* Back button and Centered Title row */}
        <div className="flex items-center justify-between mb-3 relative">
          <button 
            onClick={onBack}
            className="p-1.5 -ml-1 text-[#0f172b] hover:bg-slate-50 active:scale-95 transition-all text-slate-700 flex items-center justify-center shrink-0 cursor-pointer"
            id="btn_back_assinaturas"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <ChevronLeft className="w-5.5 h-5.5 stroke-[2.5]" />
          </button>
          
          <h1 className="text-sm font-extrabold text-[#0f172b] tracking-tight absolute left-1/2 -translate-x-1/2 whitespace-nowrap select-none font-sans">
            Assinaturas
          </h1>
          
          <div className="w-9"></div> {/* Spacer balance */}
        </div>

        {/* Description Text block in matching dark blue/grey typography for perfect legibility */}
        <div className="pl-6.5 pr-2">
          <p className="text-[11px] text-[#5c6f84] font-medium leading-relaxed font-sans select-none">
            Consulte, valide e assine digitalmente seus pactos de carga horária e planos de ensino
          </p>
        </div>
      </header>

      {/* 2. Filtro de Estados (Tabs Superiores) */}
      <div className="p-4" id="tabs_container_assinaturas">
        <div className="bg-slate-100 p-1 rounded-xl flex items-center justify-between gap-1.5 border border-slate-200/50">
          <button
            onClick={() => setActiveTab('pending')}
            className={`w-1/2 py-2.5 rounded-lg text-xs font-bold transition-all relative flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-white text-[#0f172b] shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            style={{ minHeight: '44px' }}
          >
            Pendentes
            {pendingDocs.length > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-extrabold bg-[#e7000b] text-white animate-pulse">
                {pendingDocs.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('signed')}
            className={`w-1/2 py-2.5 rounded-lg text-xs font-bold transition-all relative flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'signed'
                ? 'bg-white text-[#0f172b] shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            style={{ minHeight: '44px' }}
          >
            Assinados
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-slate-200 text-slate-600">
              {signedDocs.length}
            </span>
          </button>
        </div>
      </div>

      {/* 3. Listagem de Documentos (Cards) */}
      <div className="flex-1 px-5 pb-24 overflow-y-auto no-scrollbar space-y-4">
        {activeTab === 'pending' ? (
          pendingDocs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#0066cc]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800">Tudo assinado!</h3>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">Nenhuma assinatura pendente no momento.</p>
              </div>
            </div>
          ) : (
            pendingDocs.map((doc) => (
              <div 
                key={doc.id}
                className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[9.5px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {doc.category}
                  </span>
                  
                  <h3 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2">
                    {doc.name}
                  </h3>
                  
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1 pt-1.5 border-t border-slate-50">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Emissão: {doc.date}
                    </span>
                    <span className="flex items-center gap-1 font-extrabold text-[#e17100] bg-[#e17100]/8 px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">
                      <Clock className="w-3 h-3 text-[#e17100]" />
                      Aguardando
                    </span>
                  </div>
                </div>

                {/* Card Button */}
                <button
                  onClick={() => handleOpenSignature(doc)}
                  className="mt-3.5 w-full bg-[#0066cc] hover:bg-[#0052a3] text-white py-2 px-4 rounded-xl text-[11px] font-extrabold transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Visualizar e Assinar
                </button>
              </div>
            ))
          )
        ) : (
          signedDocs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-[10px] text-slate-400">Nenhum documento assinado recentemente.</p>
            </div>
          ) : (
            signedDocs.map((doc) => (
              <div 
                key={doc.id}
                className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-3xs relative overflow-hidden"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[9.5px] font-mono font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                      {doc.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[8px] font-extrabold text-[#0066cc] bg-[#0066cc]/8 px-2 py-0.5 rounded uppercase tracking-wider">
                      <Check className="w-2.5 h-2.5 stroke-[3]" /> Confirmado
                    </span>
                  </div>
                  
                  <h3 className="text-xs font-bold text-slate-800 leading-snug">
                    {doc.name}
                  </h3>
                  
                  <div className="text-[10px] space-y-1 text-slate-400 font-mono mt-1 pt-1.5 border-t border-slate-50">
                    <p className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Assinado em: <span className="text-slate-600 font-bold">{doc.signatureDate}</span>
                    </p>
                    {doc.hash && (
                      <p className="flex items-center gap-1 font-mono text-[9px] text-[#0066cc]">
                        <Lock className="w-3 h-3 text-[#0066cc]" />
                        {doc.hash}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )
        )}
      </div>

      {/* 4. O Fluxo de Assinatura (Simulação de Modal/Overlay) */}
      {showSignPanel && selectedDoc && (
        <div className="absolute inset-0 z-50 bg-[#0f172b]/65 backdrop-blur-xs flex flex-col justify-end select-none">
          {/* Backdrop closer clicker */}
          <div className="absolute inset-0 -z-10" onClick={handleCloseSignature} />
          
          {/* Custom Panel styled as requested */}
          <div className="bg-white rounded-t-3xl max-h-[92%] overflow-y-auto pb-6 shadow-2xl flex flex-col no-scrollbar border-t border-slate-100">
            {/* Drag Handle Bar Indicator */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto my-3.5 shrink-0"></div>

            <div className="px-6 pb-4 border-b border-slate-100 flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold font-mono text-[#0f172b] uppercase tracking-wider">
                  Assinatura Eletrônica Governamental
                </span>
                <h3 className="text-sm font-extrabold text-slate-800 leading-tight mt-1 truncate">
                  {selectedDoc.name}
                </h3>
                <p className="text-[10px] text-slate-400 mt-1">Validação de autoria e integridade funcional.</p>
              </div>
              <button 
                onClick={handleCloseSignature}
                disabled={isSigningProgress}
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 active:scale-90 transition-all cursor-pointer shrink-0 ml-4"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Error or Finished view */}
            {signFinished ? (
              <div className="py-12 px-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066cc] animate-bounce">
                  <ShieldCheck className="w-10 h-10 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800">Documento Assinado!</h4>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-[240px] mx-auto">
                    A chave criptográfica foi gerada e enviada ao servidor acadêmico da instituição.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-5 space-y-5">
                {/* Document Information / Preview scroll */}
                <div className="bg-[#F8FAFC] border border-slate-200/60 rounded-xl p-3 text-[10px] text-slate-500 leading-relaxed max-h-24 overflow-y-auto no-scrollbar">
                  <p className="font-bold text-slate-700">Preâmbulo e Termos de Concordância:</p>
                  <p className="mt-1">
                    Ao confirmar este procedimento de assinatura, declaro-me ciente e concordo plenamente com os termos estabelecidos no documento intitulado <span className="font-bold text-slate-700">"{selectedDoc.name}"</span>, conferindo validade jurídica equivalente à assinatura de próprio punho segundo o Decreto-Lei 10.543/20.
                  </p>
                </div>

                {/* Biometric fingerprint area */}
                <div className="flex flex-col items-center justify-center py-2 relative">
                  {/* Outer Pulsing Fingerprint Circle */}
                  <button 
                    onClick={handleScanBiometrics}
                    disabled={isSigningProgress || biometricStatus === 'scanning'}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      biometricStatus === 'scanning' 
                        ? 'bg-slate-50 text-slate-300'
                        : biometricStatus === 'success'
                        ? 'bg-[#0066cc]/8 border border-[#0066cc]/20 text-[#0066cc] shadow-[0_4px_16px_rgba(0,102,204,0.15)]'
                        : 'bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-400 active:scale-95'
                    }`}
                  >
                    {/* Pulsating Ring */}
                    {biometricStatus === 'scanning' && (
                      <div className="absolute inset-0 rounded-full border-2 border-[#0066cc] animate-ping opacity-70"></div>
                    )}
                    {biometricStatus === 'idle' && (
                      <div className="absolute inset-2 rounded-full border border-[#0f172b]/10 animate-pulse"></div>
                    )}
                    
                    <Fingerprint className={`w-10 h-10 stroke-[1.25] ${
                      biometricStatus === 'scanning' 
                        ? 'text-[#0f172b]' 
                        : biometricStatus === 'success'
                        ? 'text-[#0066cc]' 
                        : 'text-slate-400'
                    }`} />
                  </button>

                  <p className="text-[10px] font-bold text-slate-500 mt-2.5">
                    {biometricStatus === 'scanning' ? (
                      <span className="text-[#0f172b] animate-pulse">Verificando sensores...</span>
                    ) : biometricStatus === 'success' ? (
                      <span className="text-[#0066cc] flex items-center gap-1 font-bold">
                        <Check className="w-3.5 h-3.5" /> Biometria validada
                      </span>
                    ) : (
                      <span>Toque na digital para validar</span>
                    )}
                  </p>
                </div>

                {/* Validation Info Errors */}
                {validationError && (
                  <div className="bg-red-50 border border-red-100 px-3.5 py-2.5 rounded-xl flex items-start gap-2.5 text-red-700 text-[10px] font-bold animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0 text-[#e7000b]" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Sign Button */}
                <button
                  onClick={handleConfirmSignature}
                  disabled={isSigningProgress || !isFingerprintScanned}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSigningProgress
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      : !isFingerprintScanned
                      ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                      : 'bg-[#0066cc] hover:bg-[#0052a3] text-white active:scale-95 font-extrabold shadow-sm'
                  }`}
                >
                  {isSigningProgress ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-400/30 border-t-slate-800 rounded-full animate-spin shrink-0"></div>
                      Assinando digitalmente...
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 shrink-0" />
                      Confirmar Assinatura
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
