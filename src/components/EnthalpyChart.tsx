import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Zap, Activity, Flame, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface EnthalpyChartProps {
  enthalpyText?: string;
  reactionTitle: string;
  reactionType: string;
}

export const EnthalpyChart: React.FC<EnthalpyChartProps> = ({ enthalpyText, reactionTitle, reactionType }) => {
  // Parse delta H kJ/mol from text or default
  const deltaHVal = useMemo(() => {
    if (!enthalpyText) return -57.3;
    const match = enthalpyText.match(/([+-]?\d+\.?\d*)\s*kJ\/mol/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }
    if (enthalpyText.includes('Exotérmica') || enthalpyText.includes('exotérmica')) {
      return -120.5;
    }
    return -50.0;
  }, [enthalpyText]);

  // Generate smooth reaction coordinate energy profile data
  // X: 0 to 100 (Progress of reaction %)
  // Y: Energy in kJ/mol
  const chartData = useMemo(() => {
    const isExothermic = deltaHVal <= 0;
    const activationEnergy = Math.max(35, Math.abs(deltaHVal) * 0.35 + 25);
    const finalEnergy = deltaHVal;

    const points = [];
    for (let i = 0; i <= 100; i += 5) {
      // Gaussian / bell-like barrier peaking around x = 30
      let energy = 0;
      if (i <= 35) {
        // Ascent to activation energy peak
        const progress = i / 35;
        energy = activationEnergy * Math.sin(progress * (Math.PI / 2));
      } else {
        // Descent from peak to final products energy
        const progress = (i - 35) / 65;
        // smooth cosine transition
        const dropFactor = (1 - Math.cos(progress * Math.PI)) / 2;
        energy = activationEnergy + (finalEnergy - activationEnergy) * dropFactor;
      }

      points.push({
        progress: i,
        energia: Math.round(energy * 10) / 10,
        reactantes: 0,
        productos: finalEnergy,
      });
    }
    return points;
  }, [deltaHVal]);

  return (
    <div className="bg-[#0b111a] border border-cyan-500/30 rounded-xl p-5 shadow-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block font-bold">
              Perfil Termodinámico & Cinética
            </span>
            <h4 className="text-sm font-bold text-white">Curva Teórica de Entalpía y Energía de Activación</h4>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 font-mono text-xs flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-slate-400">ΔH°:</span>
          <span className={`font-bold ${deltaHVal <= 0 ? 'text-amber-400' : 'text-blue-400'}`}>
            {enthalpyText || `${deltaHVal} kJ/mol`}
          </span>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-64 w-full bg-[#070b12] border border-slate-800 rounded-lg p-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="progress"
              stroke="#64748b"
              fontSize={10}
              tickFormatter={(val) => `${val}%`}
              strokeDasharray="3 3"
            />
            <YAxis stroke="#64748b" fontSize={10} unit=" kJ" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-[#0b111a] border border-cyan-500/40 p-2.5 rounded-lg shadow-xl font-mono text-xs text-slate-200">
                      <span className="text-cyan-400 font-bold block mb-1">Avance de Reacción: {data.progress}%</span>
                      <div>Energía Potencial: <span className="text-amber-300 font-bold">{data.energia} kJ/mol</span></div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {data.progress === 0 ? 'Estado Inicial (Reactantes)' : data.progress === 35 ? 'Complejo Activado (Transición)' : data.progress === 100 ? 'Estado Final (Productos)' : 'Progreso de colisión iónica'}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" label={{ value: 'H = 0 (Referencia Reactantes)', fill: '#94a3b8', fontSize: 10, position: 'insideTopRight' }} />
            <Area
              type="monotone"
              dataKey="energia"
              stroke="#22d3ee"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#energyGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Thermochemical Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 font-mono text-xs">
        <div className="bg-[#070b12] border border-slate-800 rounded-lg p-2.5">
          <span className="text-[10px] text-slate-400 block mb-0.5 uppercase">Tipo de Proceso:</span>
          <span className="text-cyan-300 font-bold">
            {deltaHVal <= 0 ? 'Exotérmico (Libera Calor)' : 'Endotérmico (Absorbe Calor)'}
          </span>
        </div>
        <div className="bg-[#070b12] border border-slate-800 rounded-lg p-2.5">
          <span className="text-[10px] text-slate-400 block mb-0.5 uppercase">Complejo Activado (Ea):</span>
          <span className="text-amber-300 font-bold">
            ~{Math.max(35, Math.abs(deltaHVal) * 0.35 + 25).toFixed(1)} kJ/mol
          </span>
        </div>
        <div className="bg-[#070b12] border border-slate-800 rounded-lg p-2.5">
          <span className="text-[10px] text-slate-400 block mb-0.5 uppercase">Estado de Entalpía (ΔH°):</span>
          <span className="text-emerald-300 font-bold">
            {deltaHVal} kJ/mol
          </span>
        </div>
      </div>
    </div>
  );
};
