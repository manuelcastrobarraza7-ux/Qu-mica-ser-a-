import React, { useState, useMemo } from 'react';
import { 
  PERIODIC_ELEMENTS, 
  PeriodicElement, 
  ELEMENT_CATEGORIES, 
  searchElements 
} from '../data/periodicTable';
import { ChemicalReagent, CHEMICAL_DATABASE } from '../data/chemicals';
import { 
  Atom, 
  Search, 
  Sparkles, 
  Compass, 
  Plus, 
  X, 
  ArrowRight,
  Maximize2,
  Grid,
  LayoutGrid,
  Info
} from 'lucide-react';

interface PeriodicTableSectionProps {
  onAddReagentToWorkspace?: (reagent: ChemicalReagent) => void;
  onNavigateToWorkspace?: () => void;
}

export const PeriodicTableSection: React.FC<PeriodicTableSectionProps> = ({
  onAddReagentToWorkspace,
  onNavigateToWorkspace,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectingElement, setInspectingElement] = useState<PeriodicElement | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Filter matching set for dimming non-matches in full table
  const matchingZSet = useMemo(() => {
    const results = searchElements(searchQuery, selectedCategory);
    return new Set(results.map(e => e.z));
  }, [searchQuery, selectedCategory]);

  const filteredElementsList = useMemo(() => {
    return searchElements(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  // Color mapping helper
  const getCategoryTheme = (cat: PeriodicElement['category']) => {
    switch (cat) {
      case 'alkali_metal':
        return {
          border: 'border-rose-500/50',
          bg: 'bg-rose-950/30 hover:bg-rose-900/50 text-rose-300',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          text: 'text-rose-400',
          dot: 'bg-rose-400'
        };
      case 'alkaline_earth':
        return {
          border: 'border-orange-500/50',
          bg: 'bg-orange-950/30 hover:bg-orange-900/50 text-orange-300',
          badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
          text: 'text-orange-400',
          dot: 'bg-orange-400'
        };
      case 'transition_metal':
        return {
          border: 'border-amber-500/50',
          bg: 'bg-amber-950/30 hover:bg-amber-900/50 text-amber-300',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          text: 'text-amber-400',
          dot: 'bg-amber-400'
        };
      case 'post_transition':
        return {
          border: 'border-emerald-500/50',
          bg: 'bg-emerald-950/30 hover:bg-emerald-900/50 text-emerald-300',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          text: 'text-emerald-400',
          dot: 'bg-emerald-400'
        };
      case 'metalloid':
        return {
          border: 'border-teal-500/50',
          bg: 'bg-teal-950/30 hover:bg-teal-900/50 text-teal-300',
          badge: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
          text: 'text-teal-400',
          dot: 'bg-teal-400'
        };
      case 'reactive_nonmetal':
        return {
          border: 'border-cyan-500/50',
          bg: 'bg-cyan-950/30 hover:bg-cyan-900/50 text-cyan-300',
          badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
          text: 'text-cyan-400',
          dot: 'bg-cyan-400'
        };
      case 'noble_gas':
        return {
          border: 'border-purple-500/50',
          bg: 'bg-purple-950/30 hover:bg-purple-900/50 text-purple-300',
          badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
          text: 'text-purple-400',
          dot: 'bg-purple-400'
        };
      case 'lanthanide':
        return {
          border: 'border-pink-500/50',
          bg: 'bg-pink-950/30 hover:bg-pink-900/50 text-pink-300',
          badge: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
          text: 'text-pink-400',
          dot: 'bg-pink-400'
        };
      case 'actinide':
        return {
          border: 'border-violet-500/50',
          bg: 'bg-violet-950/30 hover:bg-violet-900/50 text-violet-300',
          badge: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
          text: 'text-violet-400',
          dot: 'bg-violet-400'
        };
      default:
        return {
          border: 'border-slate-700',
          bg: 'bg-slate-900/60 hover:bg-slate-800 text-slate-300',
          badge: 'bg-slate-800 text-slate-300 border-slate-700',
          text: 'text-slate-400',
          dot: 'bg-slate-400'
        };
    }
  };

  const handleTransferToHub = (el: PeriodicElement) => {
    if (!el.reagentId || !onAddReagentToWorkspace) return;
    const reagent = CHEMICAL_DATABASE.find(c => c.id === el.reagentId);
    if (reagent) {
      onAddReagentToWorkspace(reagent);
      if (onNavigateToWorkspace) {
        onNavigateToWorkspace();
      }
    }
  };

  // Group elements into main table and f-block (lanthanides and actinides)
  const mainTableElements = useMemo(() => {
    return PERIODIC_ELEMENTS.filter(e => e.category !== 'lanthanide' && e.category !== 'actinide');
  }, []);

  const lanthanides = useMemo(() => {
    return PERIODIC_ELEMENTS.filter(e => e.category === 'lanthanide');
  }, []);

  const actinides = useMemo(() => {
    return PERIODIC_ELEMENTS.filter(e => e.category === 'actinide');
  }, []);

  // Quick lookup map: "period-group" -> element
  const gridMap = useMemo(() => {
    const map = new Map<string, PeriodicElement>();
    mainTableElements.forEach(e => {
      map.set(`${e.period}-${e.group}`, e);
    });
    return map;
  }, [mainTableElements]);

  return (
    <div className="space-y-6">
      {/* Control Deck */}
      <div className="bg-[#0b111a] border border-cyan-500/20 rounded-xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Atom className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  Módulo de Estructura Atómica IUPAC
                </span>
                <span className="bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.2 text-[10px] font-mono rounded font-bold">
                  118 Elementos Ordenados
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white font-mono tracking-tight">
                Tabla Periódica Completa & Canónica
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-[#070b12] border border-slate-700 p-0.5 rounded-lg text-xs font-mono">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded flex items-center gap-1.5 transition ${
                  viewMode === 'table' ? 'bg-cyan-500 text-black font-bold shadow' : 'text-slate-400 hover:text-white'
                }`}
                title="Vista Canónica de 18 Columnas IUPAC"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tabla 18-Col</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 rounded flex items-center gap-1.5 transition ${
                  viewMode === 'cards' ? 'bg-cyan-500 text-black font-bold shadow' : 'text-slate-400 hover:text-white'
                }`}
                title="Vista en Cuadrícula de Fichas"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fichas ({filteredElementsList.length})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar símbolo (Fe), nombre o Z..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-7 py-1.5 text-xs bg-[#070b12] border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
          {ELEMENT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 text-[11px] font-mono rounded border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-black font-bold border-cyan-400 shadow-sm shadow-cyan-500/30'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: CANONICAL 18-COLUMN IUPAC TABLE */}
      {viewMode === 'table' && (
        <div className="bg-[#0b111a] border border-slate-800 rounded-xl p-4 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Estructura Canónica Oficial IUPAC (18 Grupos × 7 Períodos + Bloque f)
            </span>
            <span className="text-[11px] text-slate-500 hidden md:inline">
              ← Desplaza horizontalmente para explorar los 18 grupos →
            </span>
          </div>

          {/* 18-Column Scrollable Canvas */}
          <div className="overflow-x-auto pb-4 custom-scrollbar">
            <div className="min-w-[1050px] space-y-4">
              
              {/* Main 7 Periods Grid */}
              <div 
                className="grid gap-1.5 font-mono"
                style={{
                  gridTemplateColumns: '32px repeat(18, minmax(52px, 1fr))',
                  gridTemplateRows: '24px repeat(7, minmax(64px, auto))'
                }}
              >
                {/* Column Headers (Groups 1 to 18) */}
                <div className="text-[10px] text-slate-500 flex items-center justify-center font-bold">P\G</div>
                {Array.from({ length: 18 }, (_, i) => i + 1).map((grp) => (
                  <div key={`grp-${grp}`} className="text-[10px] text-slate-500 font-bold text-center flex items-center justify-center">
                    {grp}
                  </div>
                ))}

                {/* 7 Periods */}
                {Array.from({ length: 7 }, (_, r) => r + 1).map((period) => (
                  <React.Fragment key={`period-${period}`}>
                    {/* Period Row Label */}
                    <div className="text-xs text-cyan-400/70 font-bold flex items-center justify-center bg-slate-900/40 rounded border border-slate-800/60">
                      {period}
                    </div>

                    {/* 18 Columns for this Period */}
                    {Array.from({ length: 18 }, (_, c) => c + 1).map((group) => {
                      // Check for Lanthanides placeholder at Period 6, Group 3
                      if (period === 6 && group === 3) {
                        return (
                          <div 
                            key="lanthanide-placeholder"
                            className="rounded border border-pink-500/40 bg-pink-950/20 text-pink-300 p-1 flex flex-col justify-center items-center text-center cursor-default text-[9px] leading-tight"
                            title="Serie de los Lantánidos (Z = 57 a 71, desglosada abajo)"
                          >
                            <span className="font-bold text-[10px]">57-71</span>
                            <span className="font-extrabold">La-Lu</span>
                            <span className="text-[8px] opacity-75">Lantánidos</span>
                          </div>
                        );
                      }

                      // Check for Actinides placeholder at Period 7, Group 3
                      if (period === 7 && group === 3) {
                        return (
                          <div 
                            key="actinide-placeholder"
                            className="rounded border border-violet-500/40 bg-violet-950/20 text-violet-300 p-1 flex flex-col justify-center items-center text-center cursor-default text-[9px] leading-tight"
                            title="Serie de los Actínidos (Z = 89 a 103, desglosada abajo)"
                          >
                            <span className="font-bold text-[10px]">89-103</span>
                            <span className="font-extrabold">Ac-Lr</span>
                            <span className="text-[8px] opacity-75">Actínidos</span>
                          </div>
                        );
                      }

                      const el = gridMap.get(`${period}-${group}`);
                      if (!el) {
                        // Empty slot in periodic table layout
                        return <div key={`empty-${period}-${group}`} className="pointer-events-none" />;
                      }

                      const isMatch = matchingZSet.has(el.z);
                      const isInspecting = inspectingElement?.z === el.z;
                      const theme = getCategoryTheme(el.category);

                      return (
                        <button
                          key={el.z}
                          onClick={() => setInspectingElement(el)}
                          className={`rounded border p-1 text-left flex flex-col justify-between transition-all group relative ${
                            theme.bg
                          } ${theme.border} ${
                            !isMatch ? 'opacity-25 grayscale-[60%] hover:opacity-100 hover:grayscale-0' : 'opacity-100'
                          } ${
                            isInspecting ? 'ring-2 ring-cyan-400 shadow-lg scale-105 z-10 bg-cyan-950/60' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between text-[9px] leading-none">
                            <span className="font-bold text-slate-400 group-hover:text-white">{el.z}</span>
                            {el.isReagentInHub && (
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" title="Disponible en reactivos del laboratorio" />
                            )}
                          </div>

                          <div className="my-0.5 text-center">
                            <span className="text-base font-extrabold text-white block group-hover:scale-110 transition-transform">
                              {el.symbol}
                            </span>
                            <span className="text-[9px] font-sans text-slate-300 truncate block">
                              {el.name}
                            </span>
                          </div>

                          <div className="text-[8px] text-slate-400 text-center leading-none">
                            {el.atomicMass.toFixed(1)}
                          </div>
                        </button>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>

              {/* F-Block: Separate Lanthanides & Actinides Series */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold pl-9">
                  Elementos de Transición Interna (Bloque f)
                </span>

                {/* Lanthanide Row (Z=57 to 71) */}
                <div 
                  className="grid gap-1.5 font-mono"
                  style={{
                    gridTemplateColumns: '110px repeat(15, minmax(52px, 1fr))'
                  }}
                >
                  <div className="flex items-center justify-end pr-2 text-[10px] font-bold text-pink-400">
                    Lantánidos (4f)
                  </div>
                  {lanthanides.map((el) => {
                    const isMatch = matchingZSet.has(el.z);
                    const isInspecting = inspectingElement?.z === el.z;
                    const theme = getCategoryTheme(el.category);

                    return (
                      <button
                        key={el.z}
                        onClick={() => setInspectingElement(el)}
                        className={`rounded border p-1 text-left flex flex-col justify-between transition-all group min-h-[58px] ${
                          theme.bg
                        } ${theme.border} ${
                          !isMatch ? 'opacity-25 grayscale-[60%] hover:opacity-100 hover:grayscale-0' : 'opacity-100'
                        } ${
                          isInspecting ? 'ring-2 ring-cyan-400 shadow-lg scale-105 z-10' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between text-[9px] leading-none">
                          <span className="font-bold text-slate-400 group-hover:text-white">{el.z}</span>
                        </div>
                        <div className="text-center my-0.5">
                          <span className="text-sm font-extrabold text-white block group-hover:scale-110 transition-transform">
                            {el.symbol}
                          </span>
                          <span className="text-[8px] font-sans text-slate-300 truncate block">
                            {el.name}
                          </span>
                        </div>
                        <div className="text-[8px] text-slate-400 text-center leading-none">
                          {el.atomicMass.toFixed(1)}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Actinide Row (Z=89 to 103) */}
                <div 
                  className="grid gap-1.5 font-mono"
                  style={{
                    gridTemplateColumns: '110px repeat(15, minmax(52px, 1fr))'
                  }}
                >
                  <div className="flex items-center justify-end pr-2 text-[10px] font-bold text-violet-400">
                    Actínidos (5f)
                  </div>
                  {actinides.map((el) => {
                    const isMatch = matchingZSet.has(el.z);
                    const isInspecting = inspectingElement?.z === el.z;
                    const theme = getCategoryTheme(el.category);

                    return (
                      <button
                        key={el.z}
                        onClick={() => setInspectingElement(el)}
                        className={`rounded border p-1 text-left flex flex-col justify-between transition-all group min-h-[58px] ${
                          theme.bg
                        } ${theme.border} ${
                          !isMatch ? 'opacity-25 grayscale-[60%] hover:opacity-100 hover:grayscale-0' : 'opacity-100'
                        } ${
                          isInspecting ? 'ring-2 ring-cyan-400 shadow-lg scale-105 z-10' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between text-[9px] leading-none">
                          <span className="font-bold text-slate-400 group-hover:text-white">{el.z}</span>
                        </div>
                        <div className="text-center my-0.5">
                          <span className="text-sm font-extrabold text-white block group-hover:scale-110 transition-transform">
                            {el.symbol}
                          </span>
                          <span className="text-[8px] font-sans text-slate-300 truncate block">
                            {el.name}
                          </span>
                        </div>
                        <div className="text-[8px] text-slate-400 text-center leading-none">
                          {el.atomicMass.toFixed(0)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: CARDS GRID (For quick filtering and inspection) */}
      {viewMode === 'cards' && (
        <div className="bg-[#0b111a] border border-slate-800 rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
            <span>Elementos encontrados: <strong className="text-cyan-400">{filteredElementsList.length}</strong></span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredElementsList.map((el) => {
              const theme = getCategoryTheme(el.category);
              return (
                <button
                  key={el.z}
                  onClick={() => setInspectingElement(el)}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all group relative ${
                    theme.bg
                  } ${theme.border}`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="font-bold text-slate-400">{el.z}</span>
                    <span className="text-[10px] text-slate-500">M: {el.atomicMass.toFixed(1)}</span>
                  </div>

                  <div className="my-2 text-center">
                    <span className="text-2xl font-black font-mono text-white block group-hover:scale-105 transition-transform">
                      {el.symbol}
                    </span>
                    <span className="text-xs font-medium text-slate-300 block">{el.name}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400 capitalize">{el.state}</span>
                    {el.isReagentInHub && (
                      <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded font-bold">
                        LAB
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* DETAILED ELEMENT MODAL */}
      {inspectingElement && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0b111a] border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Close Button */}
            <button
              onClick={() => setInspectingElement(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-6 pb-4 border-b border-slate-800">
              <div className="w-20 h-20 rounded-xl bg-cyan-950/50 border-2 border-cyan-500/50 flex flex-col items-center justify-center font-mono shrink-0 shadow-lg shadow-cyan-500/10">
                <span className="text-xs text-cyan-400 font-bold self-start pl-2">{inspectingElement.z}</span>
                <span className="text-3xl font-extrabold text-white leading-none">{inspectingElement.symbol}</span>
                <span className="text-[10px] text-slate-400 mt-1">{inspectingElement.atomicMass.toFixed(3)}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${getCategoryTheme(inspectingElement.category).badge}`}>
                    {inspectingElement.categoryLabel}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    Bloque {inspectingElement.block.toUpperCase()} • Período {inspectingElement.period} • Grupo {inspectingElement.group}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 capitalize">
                    {inspectingElement.state}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white font-mono">{inspectingElement.name}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Configuración Electrónica: <strong className="text-cyan-300 font-mono">{inspectingElement.electronConfig}</strong>
                </p>
              </div>
            </div>

            {/* Scientific Properties Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5 font-mono text-xs">
              <div className="bg-[#070b12] border border-slate-800 rounded-lg p-2.5">
                <span className="text-[10px] text-slate-500 uppercase block mb-0.5">Electronegatividad</span>
                <span className="text-white font-bold">{inspectingElement.electronegativity ?? 'N/D'} (Pauling)</span>
              </div>
              <div className="bg-[#070b12] border border-slate-800 rounded-lg p-2.5">
                <span className="text-[10px] text-slate-500 uppercase block mb-0.5">Pto. Fusión</span>
                <span className="text-white font-bold">
                  {inspectingElement.meltingPoint ? `${(inspectingElement.meltingPoint - 273.15).toFixed(1)} °C` : 'N/D'}
                </span>
              </div>
              <div className="bg-[#070b12] border border-slate-800 rounded-lg p-2.5">
                <span className="text-[10px] text-slate-500 uppercase block mb-0.5">Pto. Ebullición</span>
                <span className="text-white font-bold">
                  {inspectingElement.boilingPoint ? `${(inspectingElement.boilingPoint - 273.15).toFixed(1)} °C` : 'N/D'}
                </span>
              </div>
              <div className="bg-[#070b12] border border-slate-800 rounded-lg p-2.5">
                <span className="text-[10px] text-slate-500 uppercase block mb-0.5">1ª Ionización</span>
                <span className="text-white font-bold">
                  {inspectingElement.ionizationEnergy ? `${inspectingElement.ionizationEnergy} kJ/mol` : 'N/D'}
                </span>
              </div>
            </div>

            {/* Astrophysical & Nucleosynthesis Origin */}
            <div className="space-y-3 text-xs mb-6">
              <div className="bg-purple-950/20 border border-purple-500/30 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-purple-400 font-mono font-bold text-[11px] mb-1 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Origen Cósmico & Nucleosíntesis Estelar
                </div>
                <p className="text-slate-200 leading-relaxed font-sans">{inspectingElement.cosmicOrigin}</p>
              </div>

              {/* Technological & Real World Application */}
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold text-[11px] mb-1 uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" /> Aplicaciones Tecnológicas, Industriales & Vida Real
                </div>
                <p className="text-slate-200 leading-relaxed font-sans">{inspectingElement.realWorldApp}</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="text-[11px] text-slate-400 font-mono">
                Año de Descubrimiento: <strong className="text-white">{inspectingElement.yearDiscovered}</strong>
              </div>

              {inspectingElement.isReagentInHub ? (
                <button
                  onClick={() => {
                    handleTransferToHub(inspectingElement);
                    setInspectingElement(null);
                  }}
                  className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold rounded-lg shadow-md shadow-cyan-500/20 flex items-center gap-2 transition active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir al Laboratorio ({inspectingElement.symbol})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-[11px] font-mono text-slate-500 italic">
                  Elemento de referencia teórica
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
