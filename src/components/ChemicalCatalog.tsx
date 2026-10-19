import React, { useState, useMemo } from 'react';
import { CHEMICAL_DATABASE, CATEGORIES, ChemicalReagent } from '../data/chemicals';
import { SALTS_FAMILIES } from '../data/saltsData';
import { Search, Plus, Check, Info, Layers } from 'lucide-react';

interface ChemicalCatalogProps {
  onSelectReagent: (reagent: ChemicalReagent) => void;
  selectedIds: string[];
  onOpenDetails: (reagent: ChemicalReagent) => void;
}

export const ChemicalCatalog: React.FC<ChemicalCatalogProps> = ({
  onSelectReagent,
  selectedIds,
  onOpenDetails,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSaltsFamily, setActiveSaltsFamily] = useState<string>('all_sales');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredReagents = useMemo(() => {
    return CHEMICAL_DATABASE.filter((chem) => {
      const matchesCategory = activeCategory === 'all' || chem.categoria === activeCategory;
      const matchesSaltsFamily =
        activeCategory !== 'sales' ||
        activeSaltsFamily === 'all_sales' ||
        chem.subcategoria === activeSaltsFamily;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        chem.nombre.toLowerCase().includes(q) ||
        chem.formula.toLowerCase().includes(q) ||
        chem.id.toLowerCase().includes(q);
      return matchesCategory && matchesSaltsFamily && matchesSearch;
    });
  }, [activeCategory, activeSaltsFamily, searchQuery]);

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'acidos':
        return { border: 'border-red-500/30', badge: 'text-red-400 bg-red-500/10', dot: 'bg-red-400' };
      case 'bases':
        return { border: 'border-blue-500/30', badge: 'text-blue-400 bg-blue-500/10', dot: 'bg-blue-400' };
      case 'sales':
        return { border: 'border-amber-500/30', badge: 'text-amber-400 bg-amber-500/10', dot: 'bg-amber-400' };
      case 'elementos':
        return { border: 'border-emerald-500/30', badge: 'text-emerald-400 bg-emerald-500/10', dot: 'bg-emerald-400' };
      case 'indicadores':
        return { border: 'border-purple-500/30', badge: 'text-purple-400 bg-purple-500/10', dot: 'bg-purple-400' };
      case 'organicos':
        return { border: 'border-orange-500/30', badge: 'text-orange-400 bg-orange-500/10', dot: 'bg-orange-400' };
      default:
        return { border: 'border-cyan-500/30', badge: 'text-cyan-400 bg-cyan-500/10', dot: 'bg-cyan-400' };
    }
  };

  return (
    <div className="bg-[#0b111a] border border-slate-800 rounded-xl p-4 flex flex-col h-full shadow-lg">
      {/* Search and Category Filter Toolbar */}
      <div className="mb-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Catálogo de Reactivos Oficial
            </span>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              {filteredReagents.length} de {CHEMICAL_DATABASE.length}
            </span>
          </div>

          <span className="text-[11px] text-slate-400">
            Haz clic para agregar a la secuencia
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por fórmula (LiCH₃COO, Na₃BO₃, BaS, Al...) o nombre..."
            className="w-full bg-[#070b12] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Main Category Filter Tabs */}
        <div className="flex flex-wrap gap-1 pt-1 overflow-x-auto pb-1 text-xs font-mono">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (cat.id !== 'sales') {
                    setActiveSaltsFamily('all_sales');
                  }
                }}
                className={`px-2.5 py-1 rounded-md transition whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold shadow-sm'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Sub-filter for bases to emphasize "solo son OH" */}
        {activeCategory === 'bases' && (
          <div className="px-2.5 py-1.5 rounded-lg bg-blue-950/30 border border-blue-500/30 text-[11px] font-mono text-blue-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>Bases puras: Exclusivamente Hidróxidos metálicos y alcalinos (-OH)</span>
          </div>
        )}

        {/* Sub-filter for 11 Families of Salts */}
        {activeCategory === 'sales' && (
          <div className="space-y-1 pt-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
              <Layers className="w-3 h-3" /> 11 Familias de Sales (Li, Na, K, Mg, Ca, Sr, Ba):
            </div>
            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1 text-[11px] font-mono">
              {SALTS_FAMILIES.map((fam) => {
                const isFamActive = activeSaltsFamily === fam.id;
                return (
                  <button
                    key={fam.id}
                    onClick={() => setActiveSaltsFamily(fam.id)}
                    className={`px-2 py-0.5 rounded text-[10px] transition whitespace-nowrap border ${
                      isFamActive
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-bold'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border-slate-800'
                    }`}
                  >
                    {fam.label}
                  </button>
                );
              })}
              <button
                onClick={() => setActiveSaltsFamily('otras_sales')}
                className={`px-2 py-0.5 rounded text-[10px] transition whitespace-nowrap border ${
                  activeSaltsFamily === 'otras_sales'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-bold'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border-slate-800'
                }`}
              >
                Otras Sales (CuSO₄, AgNO₃, FeCl₃...)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reactants Grid (Scrollable) */}
      <div className="flex-1 overflow-y-auto pr-1 max-h-[520px] space-y-1.5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-2">
          {filteredReagents.map((chem) => {
            const isSelected = selectedIds.includes(chem.id);
            const theme = getCategoryTheme(chem.categoria);

            return (
              <div
                key={chem.id}
                className={`relative group rounded-lg border p-2.5 transition-all flex flex-col justify-between cursor-pointer select-none ${
                  isSelected
                    ? 'bg-cyan-950/30 border-cyan-500/70 shadow-[0_0_12px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/40'
                    : 'bg-[#080d14] hover:bg-[#0f1724] border-slate-800/90 hover:border-slate-700'
                }`}
                onClick={() => onSelectReagent(chem)}
              >
                {/* Header row: Formula and Quick info button */}
                <div className="flex items-start justify-between gap-1">
                  <span className="font-mono font-bold text-sm tracking-wide text-white group-hover:text-cyan-300 transition">
                    {chem.formula}
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Ver Ficha Técnica"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetails(chem);
                      }}
                      className="p-1 rounded text-slate-500 hover:text-cyan-400 hover:bg-slate-800 transition"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                    {isSelected ? (
                      <span className="w-4 h-4 rounded-full bg-cyan-500 text-black flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-slate-800/80 text-slate-400 flex items-center justify-center text-[10px] opacity-60 group-hover:opacity-100">
                        <Plus className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Chemical Name */}
                <span className="text-[11px] text-slate-300 truncate mt-1 block font-medium" title={chem.nombre}>
                  {chem.nombre}
                </span>

                {/* Subtitle row: State and ADR UN */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2 pt-1.5 border-t border-slate-800/60">
                  <span className="capitalize">{chem.state}</span>
                  <span className="truncate max-w-[90px] text-[9px] text-slate-400">
                    {chem.unNumber !== 'No regulado' ? chem.unNumber : 'Exento'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredReagents.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            No se encontraron reactivos para el filtro aplicado.
          </div>
        )}
      </div>
    </div>
  );
};
