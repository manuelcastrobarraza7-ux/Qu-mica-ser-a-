import React, { useState } from 'react';
import { ChemicalReagent } from '../data/chemicals';
import { analyzeReactionChain, ReactionResult } from '../data/reactions';
import { SafetyCard } from './SafetyCard';
import { DilutionCalculator } from './DilutionCalculator';
import { EnthalpyChart } from './EnthalpyChart';
import { Sparkles, Trash2, ArrowRight, BookOpen, Layers, Lightbulb, Zap, Loader2, Brain, Calculator } from 'lucide-react';

interface ReactionWorkspaceProps {
  selectedReagents: ChemicalReagent[];
  onRemoveReagent: (index: number) => void;
  onClearWorkspace: () => void;
  onLoadPreset: (reagentIds: string[]) => void;
}

export const ReactionWorkspace: React.FC<ReactionWorkspaceProps> = ({
  selectedReagents,
  onRemoveReagent,
  onClearWorkspace,
  onLoadPreset,
}) => {
  const [reactionResult, setReactionResult] = useState<ReactionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [useHighThinking, setUseHighThinking] = useState<boolean>(false);
  const [aiCustomInsight, setAiCustomInsight] = useState<string | null>(null);
  const [showDilutionCalculator, setShowDilutionCalculator] = useState<boolean>(false);

  const handleExecuteReaction = async () => {
    if (selectedReagents.length === 0) return;

    setIsAnalyzing(true);
    setAiCustomInsight(null);

    // 1. Instant local scientific analysis
    const validReagents = selectedReagents.filter((r): r is ChemicalReagent => Boolean(r && r.id));
    if (validReagents.length === 0) return;
    const reagentIds = validReagents.map((r) => r.id);
    const localResult = analyzeReactionChain(reagentIds);
    setReactionResult(localResult);

    // 2. Call backend Gemini endpoint for deep explanation
    try {
      const response = await fetch('/api/analyze-reaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reactants: reagentIds,
          useHighThinking,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.analysis) {
          setAiCustomInsight(data.analysis);
        }
      }
    } catch (err) {
      console.warn('Backend reaction analysis call completed with local engine fallback:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Workspace Chain Container */}
      <div className="bg-[#0b111a] border border-cyan-500/20 rounded-xl p-4 shadow-xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Workspace Title & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Espacio de Trabajo & Secuencia de Reacción
            </h3>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              {selectedReagents.length} en cadena
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono text-slate-300 hover:text-white select-none">
              <input
                type="checkbox"
                checked={useHighThinking}
                onChange={(e) => setUseHighThinking(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <Brain className={`w-3.5 h-3.5 ${useHighThinking ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span className="text-[11px]">Razonamiento Profundo (Gemini 4 Argon)</span>
            </label>

            {selectedReagents.length > 0 && (
              <button
                onClick={onClearWorkspace}
                className="text-[11px] font-mono text-slate-400 hover:text-red-400 px-2 py-1 rounded hover:bg-slate-800/80 transition flex items-center gap-1"
                title="Limpiar secuencia"
              >
                <Trash2 className="w-3 h-3" /> Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Reaction Sequence Visualizer */}
        <div className="min-h-[70px] bg-[#070b12] border border-slate-800 rounded-lg p-3 flex flex-wrap items-center gap-2 font-mono text-sm mb-3">
          {selectedReagents.length === 0 ? (
            <span className="text-slate-500 text-xs italic">
              Selecciona reactivos del catálogo o pulsa uno de los protocolos rápidos abajo...
            </span>
          ) : (
            selectedReagents
              .filter((r): r is ChemicalReagent => Boolean(r && r.id))
              .map((reagent, idx, arr) => (
                <React.Fragment key={`${reagent.id}-${idx}`}>
                  <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-700 text-cyan-300 px-2.5 py-1 rounded-md text-xs shadow-sm group">
                    <span className="font-bold text-white">{reagent.formula}</span>
                    <span className="text-[10px] text-slate-400 font-sans hidden sm:inline">({reagent.nombre})</span>
                    <button
                      onClick={() => onRemoveReagent(idx)}
                      className="text-slate-500 hover:text-red-400 ml-1 text-xs font-bold leading-none"
                      title="Quitar de la secuencia"
                    >
                      ✕
                    </button>
                  </div>
                  {idx < arr.length - 1 && (
                    <span className="text-cyan-400 font-extrabold text-xs">+</span>
                  )}
                </React.Fragment>
              ))
          )}
        </div>

        {/* Quick Example Sequence Chips */}
        <div className="mb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
            Protocolos de Ensayo Rápidos (Ejemplos Oficiales):
          </span>
          <div className="flex flex-wrap gap-1.5 text-xs font-mono">
            <button
              onClick={() => onLoadPreset(['HCl', 'NaOH'])}
              className="px-2 py-1 rounded bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition"
            >
              Neutralización HCl + NaOH
            </button>
            <button
              onClick={() => onLoadPreset(['H2SO4', 'KNO3', 'KOH'])}
              className="px-2 py-1 rounded bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 hover:text-cyan-200 border border-cyan-500/40 transition font-medium"
            >
              Cadena K₂SO₄ + KNO₃ (Fertilizantes)
            </button>
            <button
              onClick={() => onLoadPreset(['Al', 'O2'])}
              className="px-2 py-1 rounded bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition"
            >
              Síntesis Alúmina Al + O₂ (Gemas)
            </button>
            <button
              onClick={() => onLoadPreset(['CuSO4', 'NaOH'])}
              className="px-2 py-1 rounded bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition"
            >
              Precipitado Cu(OH)₂
            </button>
            <button
              onClick={() => onLoadPreset(['H2SO4', 'Azucar'])}
              className="px-2 py-1 rounded bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition"
            >
              Deshidratación Azúcar + H₂SO₄
            </button>
            <button
              onClick={() => onLoadPreset(['Fenolftaleina', 'NaOH'])}
              className="px-2 py-1 rounded bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition"
            >
              Viraje Fenolftaleína
            </button>
          </div>
        </div>

        {/* Action Trigger Button & Dilution Calculator Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExecuteReaction}
            disabled={selectedReagents.length === 0 || isAnalyzing}
            className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 ${
              selectedReagents.length === 0
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/20 active:scale-[0.99]'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Simulando Reacción & Analizando Iones...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                <span>Reaccionar & Analizar Secuencia</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowDilutionCalculator(prev => !prev)}
            className={`px-4 py-2.5 rounded-lg font-mono font-semibold text-xs uppercase tracking-wider transition flex items-center gap-2 border ${
              showDilutionCalculator
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-700'
            }`}
          >
            <Calculator className="w-4 h-4 text-cyan-400" />
            <span>Calculadora Diluciones ($C_1V_1$)</span>
          </button>
        </div>
      </div>

      {/* Dilution Calculator Viewport */}
      {showDilutionCalculator && (
        <div className="animate-fadeIn">
          <DilutionCalculator initialReagent={selectedReagents[0]} />
        </div>
      )}

      {/* Results Viewport */}
      {reactionResult && (
        <div className="space-y-4">
          {/* Reaction Header Card */}
          <div className="bg-[#0b111a] border border-cyan-500/30 rounded-xl p-4 shadow-lg">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-0.5">
                  Resultado de la Simulación Química
                </span>
                <h3 className="text-lg font-bold text-white">{reactionResult.title}</h3>
              </div>
              {reactionResult.enthalpy && (
                <div className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-right">
                  <span className="text-[9px] font-mono text-slate-400 uppercase block">Termodinámica</span>
                  <span className="text-xs font-mono font-bold text-amber-400">{reactionResult.enthalpy}</span>
                </div>
              )}
            </div>

            {/* Stoichiometric & Net Ionic Equations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 font-mono text-xs">
              <div className="bg-[#070b12] border border-slate-800 rounded-lg p-2.5">
                <span className="text-[10px] uppercase text-slate-400 block mb-1">Ecuación Estequiométrica:</span>
                <span className="text-cyan-300 font-bold block">{reactionResult.balancedEquation}</span>
              </div>
              {reactionResult.ionicEquationNet && (
                <div className="bg-[#070b12] border border-slate-800 rounded-lg p-2.5">
                  <span className="text-[10px] uppercase text-slate-400 block mb-1">Ecuación Iónica Neta:</span>
                  <span className="text-emerald-300 font-bold block">{reactionResult.ionicEquationNet}</span>
                </div>
              )}
            </div>

            {/* Spectator ions if any */}
            {reactionResult.spectatorIons && reactionResult.spectatorIons.length > 0 && (
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                <span>Iones espectadores (no participan en la entalpía neta):</span>
                <div className="flex gap-1">
                  {reactionResult.spectatorIons.map((ion, i) => (
                    <span key={i} className="bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded text-[10px]">
                      {ion}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Multi-Step Ionic Mechanics */}
          <div className="bg-[#0b111a] border border-slate-800 rounded-xl p-4 shadow-lg">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Secuencia Mecanística & Pasos de Intercambio Iónico
            </h4>
            <div className="space-y-3">
              {reactionResult.steps.map((st) => (
                <div key={st.stepNumber} className="bg-[#070b12] border border-slate-800/80 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center border border-cyan-500/40">
                      {st.stepNumber}
                    </span>
                    <span className="text-xs font-bold text-white font-mono">{st.title}</span>
                  </div>
                  <div className="font-mono text-xs text-cyan-300 bg-slate-900/60 p-2 rounded mb-2 border border-slate-800">
                    {st.equation}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{st.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Professor IA Module (Detailed Didactic Teaching & Real World Context) */}
          <div className="bg-[#0b111a] border border-cyan-500/20 rounded-xl p-5 shadow-lg relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block font-semibold">
                    Módulo del Profesor IA
                  </span>
                  <h4 className="text-sm font-bold text-white">Explicación Didáctica & Contexto Científico</h4>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <p className="font-medium text-slate-200">
                {reactionResult.explicacionProfesor.introduccion}
              </p>

              <div className="bg-[#070b12] border border-slate-800 rounded-lg p-3">
                <span className="text-[10px] font-mono uppercase text-cyan-400 block mb-1 font-bold flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Mecanismo Iónico Detallado:
                </span>
                <p className="text-slate-300">{reactionResult.explicacionProfesor.mecanismoIónico}</p>
              </div>

              {/* Agriculture context if applicable */}
              {reactionResult.explicacionProfesor.agricultura && (
                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-3">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1 font-bold flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5" /> Contexto Agrícola (Nutrición de Precisión Libre de Cloruros):
                  </span>
                  <p className="text-slate-200">{reactionResult.explicacionProfesor.agricultura}</p>
                </div>
              )}

              {/* Mineralogy / Gemology context if applicable */}
              {reactionResult.explicacionProfesor.mineralogia && (
                <div className="bg-purple-950/20 border border-purple-500/30 rounded-lg p-3">
                  <span className="text-[10px] font-mono uppercase text-purple-400 block mb-1 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Mineralogía & Génesis de Gemas (Rubí y Zafiro):
                  </span>
                  <p className="text-slate-200">{reactionResult.explicacionProfesor.mineralogia}</p>
                </div>
              )}

              {/* Industry context if applicable */}
              {reactionResult.explicacionProfesor.industria && (
                <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-3">
                  <span className="text-[10px] font-mono uppercase text-blue-400 block mb-1 font-bold">
                    Aplicación Industrial & Control de Procesos:
                  </span>
                  <p className="text-slate-200">{reactionResult.explicacionProfesor.industria}</p>
                </div>
              )}

              {/* Live Gemini AI Analysis if returned */}
              {aiCustomInsight && (
                <div className="bg-cyan-950/30 border border-cyan-500/40 rounded-lg p-3 mt-3">
                  <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold block mb-1 flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-cyan-400" /> Ampliación Neuronal del Profesor IA (En Tiempo Real):
                  </span>
                  <div className="text-slate-200 text-xs whitespace-pre-line leading-relaxed font-mono">
                    {aiCustomInsight}
                  </div>
                </div>
              )}

              <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                {reactionResult.explicacionProfesor.conclusion}
              </p>
            </div>
          </div>

          {/* Enthalpy & Energy Profile Chart */}
          <EnthalpyChart
            enthalpyText={reactionResult.enthalpy}
            reactionTitle={reactionResult.title}
            reactionType={reactionResult.type}
          />

          {/* Safety & Logistics Card */}
          <SafetyCard
            productName={reactionResult.safetyInfo.productoPrincipal}
            hazardClass={reactionResult.safetyInfo.hazardClass}
            unNumber={reactionResult.safetyInfo.unNumber}
            kemlerCode={reactionResult.safetyInfo.kemlerCode}
            adrTunnelCode={reactionResult.safetyInfo.adrTunnelCode}
            tunnelReason={reactionResult.safetyInfo.tunnelReason}
            nfpa={reactionResult.safetyInfo.nfpa}
            ppe={reactionResult.safetyInfo.ppe}
            storage={reactionResult.safetyInfo.almacenamiento}
            stability={reactionResult.safetyInfo.estabilidad}
          />
        </div>
      )}
    </div>
  );
};
