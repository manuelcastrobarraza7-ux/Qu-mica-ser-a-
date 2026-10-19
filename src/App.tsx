import React, { useState } from 'react';
import { CHEMICAL_DATABASE, ChemicalReagent } from './data/chemicals';
import { ChemicalCatalog } from './components/ChemicalCatalog';
import { ReactionWorkspace } from './components/ReactionWorkspace';
import { ProfessorChat } from './components/ProfessorChat';
import { ChemicalGame } from './components/ChemicalGame';
import { ReagentDetailModal } from './components/ReagentDetailModal';
import { PeriodicTableSection } from './components/PeriodicTableSection';
import { 
  FlaskConical, 
  Bot, 
  Gamepad2, 
  FileText, 
  ShieldAlert, 
  Truck, 
  Sparkles, 
  Info,
  CheckCircle2,
  AlertOctagon,
  Atom
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'workspace' | 'periodic' | 'professor' | 'regulations'>('workspace');
  const [selectedReagents, setSelectedReagents] = useState<ChemicalReagent[]>(() => {
    return [
      CHEMICAL_DATABASE.find(c => c.id === 'H2SO4'),
      CHEMICAL_DATABASE.find(c => c.id === 'KNO3'),
      CHEMICAL_DATABASE.find(c => c.id === 'KOH'),
    ].filter((c): c is ChemicalReagent => Boolean(c));
  });
  const [inspectingReagent, setInspectingReagent] = useState<ChemicalReagent | null>(null);
  const [showGameModal, setShowGameModal] = useState<boolean>(false);

  const handleSelectReagent = (reagent: ChemicalReagent) => {
    if (!reagent) return;
    setSelectedReagents(prev => [...prev.filter(Boolean), reagent]);
  };

  const handleRemoveReagent = (index: number) => {
    setSelectedReagents(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearWorkspace = () => {
    setSelectedReagents([]);
  };

  const handleLoadPreset = (reagentIds: string[]) => {
    const matched = reagentIds
      .map(id => CHEMICAL_DATABASE.find(c => c.id === id))
      .filter((c): c is ChemicalReagent => Boolean(c));
    setSelectedReagents(matched);
  };

  const selectedIds = selectedReagents.filter(Boolean).map(r => r.id);

  return (
    <div className="min-h-screen bg-[#080d14] text-slate-100 flex flex-col font-sans">
      {/* 3-Zone Clean Top Bar Contract */}
      <header className="border-b border-slate-800 bg-[#0a1019]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('workspace');
            }}
            className="flex items-center gap-2.5 text-slate-100 hover:text-cyan-400 transition whitespace-nowrap shrink-0 group"
          >
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 transition">
              <FlaskConical className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-base tracking-wider uppercase font-mono">
              Espiquumeyria <span className="text-cyan-400 text-xs font-normal">Hub</span>
            </span>
          </a>

          {/* Zone 2: 4 single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-medium text-slate-400">
            <button
              onClick={() => setActiveTab('workspace')}
              className={`hover:text-white transition whitespace-nowrap shrink-0 flex items-center gap-1.5 pb-0.5 ${
                activeTab === 'workspace' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : ''
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" /> Laboratorio & Fichas
            </button>
            <button
              onClick={() => setActiveTab('periodic')}
              className={`hover:text-white transition whitespace-nowrap shrink-0 flex items-center gap-1.5 pb-0.5 ${
                activeTab === 'periodic' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : ''
              }`}
            >
              <Atom className="w-3.5 h-3.5" /> Tabla Periódica
            </button>
            <button
              onClick={() => setActiveTab('professor')}
              className={`hover:text-white transition whitespace-nowrap shrink-0 flex items-center gap-1.5 pb-0.5 ${
                activeTab === 'professor' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : ''
              }`}
            >
              <Bot className="w-3.5 h-3.5" /> Profesor IA
            </button>
            <button
              onClick={() => setActiveTab('regulations')}
              className={`hover:text-white transition whitespace-nowrap shrink-0 flex items-center gap-1.5 pb-0.5 ${
                activeTab === 'regulations' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : ''
              }`}
            >
              <Truck className="w-3.5 h-3.5" /> Normativa ADR Túneles
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowGameModal(true)}
              className="px-3.5 py-1.5 text-xs font-mono font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Simulacro Emergencia</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab bar */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 px-2 py-2 text-[11px] font-mono bg-[#070b12]">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`flex items-center gap-1 py-1 px-2 rounded ${
              activeTab === 'workspace' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            <FlaskConical className="w-3 h-3" /> Lab
          </button>
          <button
            onClick={() => setActiveTab('periodic')}
            className={`flex items-center gap-1 py-1 px-2 rounded ${
              activeTab === 'periodic' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Atom className="w-3 h-3" /> Tabla
          </button>
          <button
            onClick={() => setActiveTab('professor')}
            className={`flex items-center gap-1 py-1 px-2 rounded ${
              activeTab === 'professor' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Bot className="w-3 h-3" /> IA
          </button>
          <button
            onClick={() => setActiveTab('regulations')}
            className={`flex items-center gap-1 py-1 px-2 rounded ${
              activeTab === 'regulations' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Truck className="w-3 h-3" /> ADR
          </button>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* TAB 1: WORKSPACE & LAB */}
        {activeTab === 'workspace' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 5 Cols: Chemical Catalog */}
            <div className="lg:col-span-5 h-full">
              <ChemicalCatalog
                onSelectReagent={handleSelectReagent}
                selectedIds={selectedIds}
                onOpenDetails={(r) => setInspectingReagent(r)}
              />
            </div>

            {/* Right 7 Cols: Workspace & Reaction Analyzer */}
            <div className="lg:col-span-7">
              <ReactionWorkspace
                selectedReagents={selectedReagents}
                onRemoveReagent={handleRemoveReagent}
                onClearWorkspace={handleClearWorkspace}
                onLoadPreset={handleLoadPreset}
              />
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE PERIODIC TABLE */}
        {activeTab === 'periodic' && (
          <PeriodicTableSection
            onAddReagentToWorkspace={(reagent) => handleSelectReagent(reagent)}
            onNavigateToWorkspace={() => setActiveTab('workspace')}
          />
        )}

        {/* TAB 3: PROFESSOR IA CHAT */}
        {activeTab === 'professor' && (
          <div className="max-w-4xl mx-auto">
            <ProfessorChat />
          </div>
        )}

        {/* TAB 3: ADR LOGISTICS & TUNNEL RESTRICTIONS */}
        {activeTab === 'regulations' && (
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-[#0b111a] border border-cyan-500/20 rounded-xl p-5 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
                    Manual Técnico de Transporte ADR & Códigos de Restricción de Túneles
                  </h2>
                  <p className="text-xs text-slate-400">
                    Acuerdo europeo relativo al transporte internacional de mercancías peligrosas por carretera (Capítulo 8.6)
                  </p>
                </div>
              </div>
            </div>

            {/* Tunnel Categories Table */}
            <div className="bg-[#0b111a] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-amber-400" /> Clasificación Oficial de Túneles ADR (A hasta E)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs font-mono">
                <div className="bg-[#080d14] border border-slate-800 rounded-lg p-3">
                  <span className="text-sm font-bold text-emerald-400 block mb-1">CATEGORÍA A</span>
                  <span className="text-[10px] uppercase text-slate-400 block mb-1">Sin Restricción</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                    Ninguna restricción para el transporte de mercancías peligrosas. Tránsito libre.
                  </p>
                </div>

                <div className="bg-[#080d14] border border-slate-800 rounded-lg p-3">
                  <span className="text-sm font-bold text-cyan-400 block mb-1">CATEGORÍA B</span>
                  <span className="text-[10px] uppercase text-slate-400 block mb-1">Explosión Muy Grave</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                    Restricción para mercancías susceptibles de provocar una explosión muy grave en el túnel.
                  </p>
                </div>

                <div className="bg-[#080d14] border border-slate-800 rounded-lg p-3">
                  <span className="text-sm font-bold text-blue-400 block mb-1">CATEGORÍA C</span>
                  <span className="text-[10px] uppercase text-slate-400 block mb-1">Explosión o Fuga Tóxica</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                    Restricción para materias susceptibles de provocar una explosión muy grave o emisión masiva de gas tóxico.
                  </p>
                </div>

                <div className="bg-[#080d14] border border-slate-800 rounded-lg p-3">
                  <span className="text-sm font-bold text-amber-400 block mb-1">CATEGORÍA D</span>
                  <span className="text-[10px] uppercase text-slate-400 block mb-1">Incendio Severo / Fuga</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                    Restricción para explosiones, fugas tóxicas o incendios graves en cisternas de materias inflamables o corrosivas.
                  </p>
                </div>

                <div className="bg-[#080d14] border border-red-500/40 rounded-lg p-3">
                  <span className="text-sm font-bold text-red-400 block mb-1">CATEGORÍA E</span>
                  <span className="text-[10px] uppercase text-slate-400 block mb-1">Máxima Restricción</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                    Restricción para <strong>TODAS</strong> las mercancías peligrosas que requieran señalización naranja ADR.
                  </p>
                </div>
              </div>
            </div>

            {/* Segregation Matrix */}
            <div className="bg-[#0b111a] border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Matriz de Incompatibilidad & Segregación Espiquumeyria
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Para el almacenamiento y transporte conjunto en el mismo vehículo o nave, aplican las reglas estrictas de segregación:
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/30 flex items-start gap-2 text-slate-200">
                  <span className="text-red-400 font-bold shrink-0">ÁCIDOS vs BASES:</span>
                  <span className="font-sans">
                    Incompatibilidad absoluta. Su mezcla inadvertida en una balsa de contención genera una violenta reacción exotérmica con proyección de vapores cáusticos y sobrepresión.
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 flex items-start gap-2 text-slate-200">
                  <span className="text-amber-400 font-bold shrink-0">COMBURENTES (KNO₃, HNO₃) vs ORGÁNICOS (Azúcar, Madera):</span>
                  <span className="font-sans">
                    Separación mínima de 3 metros o muro cortafuegos RF-120. Los agentes oxidantes ceden oxígeno acelerando catastróficamente cualquier conato de incendio.
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-500/30 flex items-start gap-2 text-slate-200">
                  <span className="text-blue-400 font-bold shrink-0">METALES REACTIVOS (Na, K, Li, Al polvo) vs AGUA:</span>
                  <span className="font-sans">
                    Extintores de agua prohibidos taxativamente. Desprenden gas hidrógeno inflamable ($H_2$) que estalla al contacto con chispas. Utilizar extintor Clase D (polvo seco de cloruro sódico o grafito).
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Reagent Detail Modal */}
      {inspectingReagent && (
        <ReagentDetailModal
          reagent={inspectingReagent}
          onClose={() => setInspectingReagent(null)}
          onAddToSequence={handleSelectReagent}
          isAlreadySelected={selectedIds.includes(inspectingReagent.id)}
        />
      )}

      {/* Emergency Protocol Game Modal */}
      {showGameModal && (
        <ChemicalGame onClose={() => setShowGameModal(false)} />
      )}

      {/* Quiet Technical Footer */}
      <footer className="border-t border-slate-800 bg-[#070b12] py-4 mt-auto text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">Espiquumeyria Chemical Safety Hub</span>
            <span aria-hidden="true">·</span>
            <span>Estándares NFPA 704 & ADR 8.6</span>
            <span aria-hidden="true">·</span>
            <span>Gemini Neural Architecture</span>
          </div>
          <div>
            <span>{CHEMICAL_DATABASE.length} Reactivos Catalogados • 11 Familias de Sales • Bases OH</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
