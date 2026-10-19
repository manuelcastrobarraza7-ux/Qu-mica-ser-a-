import React, { useState, useMemo } from 'react';
import { CHEMICAL_DATABASE, ChemicalReagent } from '../data/chemicals';
import { Beaker, Calculator, ShieldAlert, AlertTriangle, CheckCircle2, Info, ArrowRight, RefreshCw, Droplet, Scale } from 'lucide-react';

interface DilutionCalculatorProps {
  initialReagent?: ChemicalReagent;
}

export const DilutionCalculator: React.FC<DilutionCalculatorProps> = ({ initialReagent }) => {
  const [calcType, setCalcType] = useState<'liquid' | 'solid'>('liquid');
  const [selectedReagentId, setSelectedReagentId] = useState<string>(initialReagent?.id || 'HCl');
  
  // Liquid dilution states
  const [c1, setC1] = useState<string>('12.0'); // Stock concentration (M or %)
  const [c1Unit, setC1Unit] = useState<'M' | 'percent' | 'normality'>('M');
  const [c2, setC2] = useState<string>('0.1'); // Target concentration (M)
  const [v2, setV2] = useState<string>('500'); // Target final volume (mL)
  const [stockPurity, setStockPurity] = useState<string>('37'); // For concentrated acids like HCl 37%
  const [stockDensity, setStockDensity] = useState<string>('1.19'); // g/mL

  // Solid preparation states
  const [solidPurity, setSolidPurity] = useState<string>('99.0'); // % purity of solid reagent
  const [targetMolarity, setTargetMolarity] = useState<string>('0.5'); // M
  const [targetVolumeSolid, setTargetVolumeSolid] = useState<string>('250'); // mL

  // Current selected reagent object
  const currentReagent = useMemo(() => {
    return CHEMICAL_DATABASE.find(c => c.id === selectedReagentId) || CHEMICAL_DATABASE[0];
  }, [selectedReagentId]);

  // Update default C1 when reagent changes if it's a known acid/base
  const handleReagentChange = (id: string) => {
    setSelectedReagentId(id);
    const reg = CHEMICAL_DATABASE.find(c => c.id === id);
    if (!reg) return;

    if (reg.id === 'HCl') {
      setC1('12.0');
      setC1Unit('M');
      setStockPurity('37');
      setStockDensity('1.19');
      setCalcType('liquid');
    } else if (reg.id === 'H2SO4') {
      setC1('18.0');
      setC1Unit('M');
      setStockPurity('98');
      setStockDensity('1.84');
      setCalcType('liquid');
    } else if (reg.id === 'NaOH') {
      setC1('10.0');
      setC1Unit('M');
      setStockPurity('98');
      setStockDensity('1.50');
      setCalcType('solid');
    } else if (reg.id === 'KNO3' || reg.id === 'NaCl' || reg.id === 'CuSO4') {
      setCalcType('solid');
    } else {
      if (reg.state === 'líquido') {
        setCalcType('liquid');
        setC1('5.0');
      } else {
        setCalcType('solid');
      }
    }
  };

  // Calculations for Liquid Dilution: C1 * V1 = C2 * V2 => V1 = (C2 * V2) / C1
  const liquidResult = useMemo(() => {
    const numC1 = parseFloat(c1) || 0;
    const numC2 = parseFloat(c2) || 0;
    const numV2 = parseFloat(v2) || 0;

    if (numC1 <= 0 || numC2 <= 0 || numV2 <= 0) {
      return { v1: 0, vWater: 0, isValid: false, error: 'Los valores deben ser mayores a cero.' };
    }

    if (numC2 > numC1) {
      return { v1: 0, vWater: 0, isValid: false, error: 'La concentración final (C₂) no puede ser mayor que la concentración stock (C₁).' };
    }

    const v1Val = (numC2 * numV2) / numC1; // in mL (since V2 is in mL)
    const vWaterVal = numV2 - v1Val;

    return {
      v1: v1Val,
      vWater: vWaterVal > 0 ? vWaterVal : 0,
      isValid: true,
      error: null
    };
  }, [c1, c2, v2]);

  // Calculations for Solid Preparation: m = (C * V * PM) / (1000 * (purity / 100))
  const solidResult = useMemo(() => {
    const molarity = parseFloat(targetMolarity) || 0;
    const volumeMl = parseFloat(targetVolumeSolid) || 0;
    const purity = parseFloat(solidPurity) || 100;
    const molarMass = currentReagent.molarMass || 58.44; // default NaCl if undefined

    if (molarity <= 0 || volumeMl <= 0 || purity <= 0) {
      return { massNeeded: 0, isValid: false, error: 'Los valores deben ser mayores a cero.' };
    }

    // m (g) = (M * V_L * MM) / (purity fraction)
    const volumeL = volumeMl / 1000;
    const pureMass = molarity * volumeL * molarMass;
    const actualMassNeeded = pureMass / (purity / 100);

    return {
      massNeeded: actualMassNeeded,
      pureMass,
      molarMassUsed: molarMass,
      isValid: true,
      error: null
    };
  }, [targetMolarity, targetVolumeSolid, solidPurity, currentReagent]);

  const isAcidOrCorrosive = currentReagent.categoria === 'acidos' || currentReagent.categoria === 'bases' || currentReagent.nfpa.special === 'ACID' || currentReagent.nfpa.special === 'ALK';

  return (
    <div className="bg-[#0b111a] border border-cyan-500/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden my-4">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block font-bold">
              Módulo de Cálculo Analítico
            </span>
            <h3 className="text-base font-bold text-white">Calculadora de Diluciones & Preparación de Soluciones</h3>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center bg-[#070b12] border border-slate-800 rounded-lg p-1 font-mono text-xs">
          <button
            onClick={() => setCalcType('liquid')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
              calcType === 'liquid'
                ? 'bg-cyan-500 text-black font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" /> Dilución Líquida (C1·V1 = C2·V2)
          </button>
          <button
            onClick={() => setCalcType('solid')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
              calcType === 'solid'
                ? 'bg-cyan-500 text-black font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" /> Solución desde Sólido
          </button>
        </div>
      </div>

      {/* Reagent Selector Bar */}
      <div className="bg-[#070b12] border border-slate-800 rounded-xl p-4 mb-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div>
          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            Reactivo Base / Soluto:
          </label>
          <select
            value={selectedReagentId}
            onChange={(e) => handleReagentChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs font-mono focus:border-cyan-500 focus:outline-none"
          >
            {CHEMICAL_DATABASE.map((chem) => (
              <option key={chem.id} value={chem.id}>
                {chem.formula} - {chem.nombre} ({chem.state})
              </option>
            ))}
          </select>
        </div>

        <div className="font-mono text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-400">Masa Molar (PM):</span>
            <span className="text-cyan-300 font-bold">{currentReagent.molarMass ? `${currentReagent.molarMass} g/mol` : 'No especificada'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Categoría / Estado:</span>
            <span className="text-slate-200 capitalize">{currentReagent.categoria} / {currentReagent.state}</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 flex items-center gap-2.5">
          <div className={`w-3 h-3 rounded-full shrink-0 ${
            currentReagent.nfpa.health >= 3 ? 'bg-red-500 animate-pulse' : 'bg-amber-500'
          }`} />
          <div className="text-[11px] font-mono leading-tight">
            <span className="text-slate-300 block font-bold">NFPA Salud: {currentReagent.nfpa.health} | Inflamabilidad: {currentReagent.nfpa.flammability}</span>
            <span className="text-slate-400 text-[10px] truncate block">{currentReagent.hazardClass}</span>
          </div>
        </div>
      </div>

      {/* Main Calculation Inputs & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Parameters */}
        <div className="lg:col-span-7 space-y-4">
          {calcType === 'liquid' ? (
            <div className="bg-[#070b12] border border-slate-800 rounded-xl p-4 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                  Parámetros de Dilución Líquida (C1 · V1 = C2 · V2)
                </span>
                <span className="text-[10px] text-slate-400">Conservación de Moles</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Concentración Stock (C1):</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.1"
                      value={c1}
                      onChange={(e) => setC1(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none"
                    />
                    <select
                      value={c1Unit}
                      onChange={(e) => setC1Unit(e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 text-cyan-300 rounded-lg px-2 py-2 focus:outline-none"
                    >
                      <option value="M">M (mol/L)</option>
                      <option value="percent">% w/w</option>
                      <option value="normality">N (eq/L)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Concentración Final Deseada (C2):</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      step="0.01"
                      value={c2}
                      onChange={(e) => setC2(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none"
                    />
                    <span className="text-cyan-300 font-bold">M</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-slate-400 block mb-1">Volumen Final Deseado (V2):</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      step="10"
                      value={v2}
                      onChange={(e) => setV2(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none"
                    />
                    <span className="text-cyan-300 font-bold">mL</span>
                  </div>
                </div>

                {currentReagent.id === 'HCl' || currentReagent.id === 'H2SO4' ? (
                  <div>
                    <label className="text-slate-400 block mb-1">Pureza Stock (%) / Densidad:</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={stockPurity}
                        onChange={(e) => setStockPurity(e.target.value)}
                        className="w-1/2 bg-slate-900 border border-slate-700 text-white rounded-lg px-2 py-2 focus:outline-none"
                        title="Pureza %"
                      />
                      <input
                        type="number"
                        step="0.01"
                        value={stockDensity}
                        onChange={(e) => setStockDensity(e.target.value)}
                        className="w-1/2 bg-slate-900 border border-slate-700 text-white rounded-lg px-2 py-2 focus:outline-none"
                        title="Densidad g/mL"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="bg-[#070b12] border border-slate-800 rounded-xl p-4 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                  Parámetros de Preparación desde Sólido (m = C · V · PM / 1000)
                </span>
                <span className="text-[10px] text-slate-400">Gravimetría y Estequiometría</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Molaridad Deseada (C):</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      step="0.05"
                      value={targetMolarity}
                      onChange={(e) => setTargetMolarity(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none"
                    />
                    <span className="text-cyan-300 font-bold">M</span>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Volumen Final Deseado (V):</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      step="50"
                      value={targetVolumeSolid}
                      onChange={(e) => setTargetVolumeSolid(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none"
                    />
                    <span className="text-cyan-300 font-bold">mL</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-slate-400 block mb-1">Pureza del Reactivo Sólido (%):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={solidPurity}
                    onChange={(e) => setSolidPurity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Masa Molar (Calculada):</label>
                  <div className="bg-slate-900 border border-slate-700 text-cyan-300 rounded-lg px-3 py-2 font-bold">
                    {currentReagent.molarMass || 58.44} g/mol
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Critical Safety Warning Card for Acids/Bases */}
          {isAcidOrCorrosive && (
            <div className="bg-amber-950/20 border border-amber-500/40 rounded-xl p-4 text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Protocolo Crítico de Seguridad (Ácidos & Bases Fuertes)</span>
              </div>
              <p className="text-slate-200 font-sans leading-relaxed text-xs">
                <strong>Regla de Oro de Laboratorio:</strong> Vierta siempre el ácido concentrado sobre el agua destilada agitando suavemente. <span className="text-red-400 font-bold underline">NUNCA vierta agua sobre el ácido concentrado</span>, ya que la reacción altamente exotérmica puede generar ebullición instantánea y salpicaduras corrosivas graves.
              </p>
            </div>
          )}
        </div>

        {/* Right 5 Cols: Results & Step-by-Step Protocol */}
        <div className="lg:col-span-5 bg-[#070b12] border border-slate-800 rounded-xl p-4 flex flex-col justify-between font-mono text-xs space-y-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-cyan-400 block font-bold mb-3">
              Resultado del Cálculo & Protocolo de Preparación
            </span>

            {calcType === 'liquid' ? (
              liquidResult.isValid ? (
                <div className="space-y-3">
                  <div className="bg-slate-900 border border-cyan-500/40 rounded-lg p-3 text-center">
                    <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Volumen de Solución Stock (V1) a medir:</span>
                    <span className="text-2xl font-extrabold text-cyan-400 font-mono">
                      {liquidResult.v1.toFixed(2)} mL
                    </span>
                  </div>

                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-center">
                    <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Agua Destilada a adicionar (V_agua):</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">
                      ~{liquidResult.vWater.toFixed(2)} mL
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Para aforar exactamente a {v2} mL en matraz aforado</span>
                  </div>
                </div>
              ) : (
                <div className="bg-red-950/30 border border-red-500/40 rounded-lg p-3 text-red-300 text-center">
                  {liquidResult.error}
                </div>
              )
            ) : (
              solidResult.isValid ? (
                <div className="space-y-3">
                  <div className="bg-slate-900 border border-cyan-500/40 rounded-lg p-3 text-center">
                    <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Masa de {currentReagent.formula} a pesar:</span>
                    <span className="text-2xl font-extrabold text-cyan-400 font-mono">
                      {solidResult.massNeeded.toFixed(3)} g
                    </span>
                  </div>

                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-center">
                    <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Volumen final de disolución:</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">
                      {targetVolumeSolid} mL
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Con pureza del {solidItemPurityText(solidPurity)}%</span>
                  </div>
                </div>
              ) : (
                <div className="bg-red-950/30 border border-red-500/40 rounded-lg p-3 text-red-300 text-center">
                  {solidResult.error}
                </div>
              )
            )}
          </div>

          {/* Step by step protocol */}
          <div className="border-t border-slate-800 pt-3 space-y-2 text-slate-300 font-sans text-xs">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
              Pasos de Preparación en Laboratorio:
            </span>
            <ol className="list-decimal pl-4 space-y-1.5 text-slate-300">
              {calcType === 'liquid' ? (
                <>
                  <li>Equípese con EPP obligatorio: Gafas estancas, guantes y bata de laboratorio.</li>
                  <li>Mida aprox. el 50% del volumen final ({Number(v2) / 2} mL) de agua destilada en un vaso de precipitados limpio.</li>
                  <li>Mida con pipeta calibrada exactamente <strong className="text-cyan-300">{liquidResult.v1.toFixed(2)} mL</strong> de {currentReagent.nombre} ({currentReagent.formula}).</li>
                  {isAcidOrCorrosive && (
                    <li className="text-amber-300 font-semibold">Vierta lentamente el ácido sobre el agua bajo campana de extracción.</li>
                  )}
                  <li>Transfiera a un matraz aforado de {v2} mL y complete con agua destilada hasta la línea de aforo. Homogenice por inversión.</li>
                </>
              ) : (
                <>
                  <li>Equípese con EPP obligatorio: Gafas de seguridad y guantes de nitrilo.</li>
                  <li>Pese exactamente <strong className="text-cyan-300">{solidResult.massNeeded.toFixed(3)} g</strong> de {currentReagent.nombre} ({currentReagent.formula}) en balanza analítica.</li>
                  <li>Disuelva el soluto en un vaso de precipitados con ~70% del volumen final ({targetVolumeSolid} mL) de agua destilada.</li>
                  <li>Agite con varilla de vidrio hasta disolución completa.</li>
                  <li>Transfiera cuantitativamente al matraz aforado y afore hasta la marca.</li>
                </>
              )}
            </ol>
          </div>

          {/* EPP Reminder */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-bold">
              EPP Recomendado para {currentReagent.formula}:
            </span>
            <div className="flex flex-wrap gap-1">
              {currentReagent.ppe.slice(0, 3).map((p, i) => (
                <span key={i} className="bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded text-[10px]">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function solidItemPurityText(purity: string) {
  return purity;
}
