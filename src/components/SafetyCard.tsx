import React from 'react';
import { NFPADiamond } from './NFPADiamond';
import { NFPAData } from '../data/chemicals';
import { ShieldAlert, Truck, AlertTriangle, Eye, Warehouse, Info } from 'lucide-react';

interface SafetyCardProps {
  productName: string;
  hazardClass: string;
  unNumber: string;
  kemlerCode: string;
  adrTunnelCode: string;
  tunnelReason: string;
  nfpa: NFPAData;
  ppe: string[];
  storage: string;
  stability: string;
  className?: string;
}

export const SafetyCard: React.FC<SafetyCardProps> = ({
  productName,
  hazardClass,
  unNumber,
  kemlerCode,
  adrTunnelCode,
  tunnelReason,
  nfpa,
  ppe,
  storage,
  stability,
  className = '',
}) => {
  // Extract numerical UN for the orange ADR plate
  const cleanUn = unNumber.replace(/[^0-9]/g, '') || '----';
  const cleanKemler = kemlerCode.split(' ')[0] || '--';

  return (
    <div className={`bg-[#0d1420] border border-cyan-500/20 rounded-xl p-5 shadow-xl relative overflow-hidden ${className}`}>
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="border-b border-slate-800 pb-3 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold block">
              Ficha de Seguridad Técnica & Logística
            </span>
            <h4 className="text-base font-bold text-white tracking-tight">{productName}</h4>
          </div>
        </div>

        {/* Hazard Class Badge */}
        <div className="text-right">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Clasificación GHS / ADR</span>
          <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-md inline-block">
            {hazardClass}
          </span>
        </div>
      </div>

      {/* Main Grid: NFPA Diamond, Orange ADR Placard, and Tunnel Restriction */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {/* Col 1: NFPA 704 Diamond */}
        <div className="bg-[#080d14] border border-slate-800 rounded-lg p-3 flex flex-col items-center justify-center">
          <NFPADiamond data={nfpa} size={110} />
          <div className="w-full mt-2 grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
            <div>Salud: <span className="text-blue-400 font-bold">{nfpa.health}</span></div>
            <div>Inflam.: <span className="text-red-400 font-bold">{nfpa.flammability}</span></div>
            <div>React.: <span className="text-yellow-400 font-bold">{nfpa.instability}</span></div>
            <div>Esp.: <span className="text-white font-bold">{nfpa.special || 'N/A'}</span></div>
          </div>
        </div>

        {/* Col 2: Official Orange ADR Identification Plate */}
        <div className="bg-[#080d14] border border-slate-800 rounded-lg p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase text-slate-400 mb-2 flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-amber-500" /> Panel Naranja ADR Oficial
          </span>
          {/* Orange Hazard Placard */}
          <div className="w-40 bg-[#f97316] border-2 border-black rounded p-1 shadow-md text-black font-mono font-extrabold text-center select-none">
            {/* Top row: Kemler Number */}
            <div className="text-xl tracking-widest border-b-2 border-black pb-0.5">
              {cleanKemler}
            </div>
            {/* Bottom row: UN Number */}
            <div className="text-xl tracking-widest pt-0.5">
              {cleanUn}
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-mono text-center">
            {unNumber !== 'No regulado' ? `${unNumber} • Peligro ${kemlerCode}` : 'Exento de número ONU'}
          </p>
        </div>

        {/* Col 3: Tunnel Restriction Codes (ADR) */}
        <div className="bg-[#080d14] border border-slate-800 rounded-lg p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-cyan-400" /> Código de Túnel ADR
              </span>
              <span className="text-xs font-mono font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded">
                {adrTunnelCode}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {tunnelReason}
            </p>
          </div>

          <div className="mt-3 p-2 rounded bg-slate-900/80 border border-slate-800 text-[10px] text-slate-400 leading-tight">
            <span className="text-cyan-400 font-semibold block mb-0.5 flex items-center gap-1">
              <Info className="w-3 h-3" /> Clave de Túneles (ADR 8.6):
            </span>
            <strong>Cat. B/C/D/E:</strong> Categorías crecientes de restricción. (E) prohíbe el paso en túneles con carga peligrosa en cualquier volumen.
          </div>
        </div>
      </div>

      {/* PPE Checklist */}
      <div className="mb-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-emerald-400" /> Equipo de Protección Personal Requerido (EPP)
        </span>
        <div className="flex flex-wrap gap-1.5">
          {ppe.map((item, idx) => (
            <span
              key={idx}
              className="text-xs bg-slate-900/90 border border-slate-800 text-slate-200 px-2.5 py-1 rounded-md font-mono flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Storage and Stability Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
        <div className="bg-[#080d14] border border-slate-800/80 rounded-lg p-2.5">
          <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1 mb-1">
            <Warehouse className="w-3.5 h-3.5 text-cyan-400" /> Almacenamiento & Segregación
          </span>
          <p className="text-slate-300 leading-relaxed">{storage}</p>
        </div>

        <div className="bg-[#080d14] border border-slate-800/80 rounded-lg p-2.5">
          <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1 mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-yellow-400" /> Estabilidad & Incompatibilidades
          </span>
          <p className="text-slate-300 leading-relaxed">{stability}</p>
        </div>
      </div>
    </div>
  );
};
