import React from 'react';
import { ChemicalReagent } from '../data/chemicals';
import { SafetyCard } from './SafetyCard';
import { X, Plus, Check } from 'lucide-react';

interface ReagentDetailModalProps {
  reagent: ChemicalReagent | null;
  onClose: () => void;
  onAddToSequence: (reagent: ChemicalReagent) => void;
  isAlreadySelected: boolean;
}

export const ReagentDetailModal: React.FC<ReagentDetailModalProps> = ({
  reagent,
  onClose,
  onAddToSequence,
  isAlreadySelected,
}) => {
  if (!reagent) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#080d14]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b111a] border border-cyan-500/30 rounded-2xl max-w-2xl w-full p-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold font-mono text-cyan-400">{reagent.formula}</span>
            <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {reagent.categoria}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {reagent.molarMass ? `${reagent.molarMass} g/mol` : ''}
            </span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">{reagent.nombre}</h2>
        </div>

        {/* Context description */}
        <div className="bg-[#070b12] border border-slate-800 rounded-lg p-3 text-xs leading-relaxed text-slate-300 mb-4 space-y-1.5">
          <p className="font-semibold text-slate-200">{reagent.contexto.general}</p>
          {reagent.contexto.agricultura && (
            <p className="text-emerald-300">
              <strong className="text-emerald-400">Agricultura:</strong> {reagent.contexto.agricultura}
            </p>
          )}
          {reagent.contexto.mineralogia && (
            <p className="text-purple-300">
              <strong className="text-purple-400">Mineralogía:</strong> {reagent.contexto.mineralogia}
            </p>
          )}
          {reagent.contexto.industria && (
            <p className="text-blue-300">
              <strong className="text-blue-400">Industria:</strong> {reagent.contexto.industria}
            </p>
          )}
        </div>

        {/* Safety & Logistics Card */}
        <SafetyCard
          productName={`${reagent.nombre} (${reagent.formula})`}
          hazardClass={reagent.hazardClass}
          unNumber={reagent.unNumber}
          kemlerCode={reagent.kemlerCode}
          adrTunnelCode={reagent.adrTunnelCode}
          tunnelReason={reagent.tunnelDescription}
          nfpa={reagent.nfpa}
          ppe={reagent.ppe}
          storage={reagent.storage.conditions}
          stability={`Incompatibles: ${reagent.storage.incompatibles.join(', ')}`}
          className="mb-4"
        />

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono transition"
          >
            Cerrar
          </button>

          <button
            onClick={() => {
              onAddToSequence(reagent);
              onClose();
            }}
            className={`px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider transition flex items-center gap-1.5 ${
              isAlreadySelected
                ? 'bg-slate-800 text-slate-400 hover:text-white'
                : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-md'
            }`}
          >
            {isAlreadySelected ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Añadir de nuevo a la cadena</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar a la Secuencia</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
