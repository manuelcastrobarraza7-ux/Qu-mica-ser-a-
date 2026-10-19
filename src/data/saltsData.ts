import { ChemicalReagent } from './chemicals';

export const SALTS_FAMILIES = [
  { id: 'all_sales', label: 'Todas las Sales' },
  { id: 'acetatos', label: '1. Acetatos (CH₃COO⁻)' },
  { id: 'boratos', label: '2. Boratos (BO₃³⁻ / BO₂⁻ / Bórax)' },
  { id: 'carbonatos', label: '3. Carbonatos (CO₃²⁻)' },
  { id: 'bicarbonatos', label: '4. Bicarbonatos (HCO₃⁻)' },
  { id: 'cloruros', label: '5. Cloruros (Cl⁻)' },
  { id: 'cromatos', label: '6. Cromatos (CrO₄²⁻)' },
  { id: 'yodatos', label: '7. Yodatos (IO₃⁻)' },
  { id: 'nitratos', label: '8. Nitratos (NO₃⁻)' },
  { id: 'percloratos', label: '9. Percloratos (ClO₄⁻)' },
  { id: 'fosfatos', label: '10. Fosfatos (PO₄³⁻)' },
  { id: 'sulfuros', label: '11. Sulfuros (S²⁻)' },
] as const;

export const EXPANDED_SALTS: ChemicalReagent[] = [
  // ========================================================
  // 1. ACETATOS (CH₃COO⁻) - 7 sales
  // ========================================================
  {
    id: 'LiCH3COO',
    nombre: 'Acetato de litio',
    formula: 'LiCH₃COO',
    categoria: 'sales',
    subcategoria: 'acetatos',
    molarMass: 65.99,
    state: 'sólido',
    nfpa: { health: 1, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado como mercancía peligrosa (Sustancia de baja peligrosidad)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Tránsito libre sin restricción ADR',
    ppe: ['Gafas de laboratorio', 'Guantes estándar de nitrilo', 'Bata'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Zona seca, recipiente hermético (delicuescente)',
      incompatibles: ['Oxidantes fuertes', 'Ácidos minerales concentrados'],
      conditions: 'Almacenar en frascos plásticos bien cerrados.'
    },
    contexto: {
      industria: 'Tampón químico para electroforesis en gel (LB buffer) y precursor en síntesis farmacéutica.',
      general: 'Sal blanca cristalina muy soluble en agua, formada por la neutralización de ácido acético e hidróxido de litio.'
    }
  },
  {
    id: 'NaCH3COO',
    nombre: 'Acetato de sodio',
    formula: 'NaCH₃COO',
    categoria: 'sales',
    subcategoria: 'acetatos',
    molarMass: 82.03,
    state: 'sólido',
    nfpa: { health: 1, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Tránsito libre',
    ppe: ['Gafas de seguridad', 'Guantes comunes'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Lugar seco',
      incompatibles: ['Oxidantes enérgicos', 'Ácidos fuertes'],
      conditions: 'Sacos antihumedad.'
    },
    contexto: {
      industria: 'Componente de calentadores de manos químicos (cristalización exotérmica de solución sobresaturada) y saborizante alimentario E262.',
      general: 'Sal de ácido débil y base fuerte con hidrólisis ligeramente básica (pH ~8.9 en disolución 0.1 M).'
    }
  },
  {
    id: 'KCH3COO',
    nombre: 'Acetato de potasio',
    formula: 'KCH₃COO',
    categoria: 'sales',
    subcategoria: 'acetatos',
    molarMass: 98.14,
    state: 'sólido',
    nfpa: { health: 1, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Tránsito libre',
    ppe: ['Gafas de seguridad', 'Guantes de nitrilo'],
    storage: {
      temperature: 'Ambiente seco',
      ventilation: 'Ambiente de baja humedad relativa (higroscópico y delicuescente)',
      incompatibles: ['Oxidantes fuertes'],
      conditions: 'Recipientes herméticamente precintados.'
    },
    contexto: {
      agricultura: 'Fertilizante foliar de potasio orgánico de absorción ultrarrápida sin cloruros ni sulfatos.',
      industria: 'Agente extintor en fuegos de cocinas industriales (Clase K) y descongelante de pistas de aterrizaje aeroportuarias ecológico.',
      general: 'Sal delicuescente altamente soluble que absorbe rápidamente agua del aire formando solución acuosa espesa.'
    }
  },
  {
    id: 'Mg(CH3COO)2',
    nombre: 'Acetato de magnesio',
    formula: 'Mg(CH₃COO)₂',
    categoria: 'sales',
    subcategoria: 'acetatos',
    molarMass: 142.39,
    state: 'sólido',
    nfpa: { health: 1, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas de montura universal', 'Guantes estándar'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Seco',
      incompatibles: ['Oxidantes fuertes'],
      conditions: 'Frascos plásticos bien cerrados.'
    },
    contexto: {
      industria: 'Mordiente en tintorería textil y descongelante de carreteras no corrosivo para el hormigón armado.',
      general: 'Se presenta comúnmente como tetrahidrato Mg(CH₃COO)₂·4H₂O cristalino monoclínico incoloro.'
    }
  },
  {
    id: 'Ca(CH3COO)2',
    nombre: 'Acetato de calcio',
    formula: 'Ca(CH₃COO)₂',
    categoria: 'sales',
    subcategoria: 'acetatos',
    molarMass: 158.17,
    state: 'sólido',
    nfpa: { health: 1, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción',
    ppe: ['Gafas de seguridad', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Normal',
      incompatibles: ['Ácidos fuertes', 'Oxidantes'],
      conditions: 'Sacos o bidones secos.'
    },
    contexto: {
      industria: 'Conocido históricamente como acetato de cal; gelifica con alcohol etílico formando "hielo enlatado" inflamable (Sterno combustible de catering).',
      general: 'Sal con solubilidad retrógrada: es más soluble en agua fría que en agua caliente.'
    }
  },
  {
    id: 'Sr(CH3COO)2',
    nombre: 'Acetato de estroncio',
    formula: 'Sr(CH₃COO)₂',
    categoria: 'sales',
    subcategoria: 'acetatos',
    molarMass: 205.71,
    state: 'sólido',
    nfpa: { health: 1, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas de laboratorio', 'Guantes de nitrilo'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Estándar',
      incompatibles: ['Oxidantes fuertes'],
      conditions: 'Recipientes cerrados.'
    },
    contexto: {
      industria: 'Formulaciones pirotécnicas de destello rojo brillante y catalizador en síntesis de poliésteres.',
      general: 'Sal blanca cristalina de estroncio soluble en agua, emite una intensa llama de color carmesí.'
    }
  },
  {
    id: 'Ba(CH3COO)2',
    nombre: 'Acetato de bario',
    formula: 'Ba(CH₃COO)₂',
    categoria: 'sales',
    subcategoria: 'acetatos',
    molarMass: 255.42,
    state: 'sólido',
    nfpa: { health: 3, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 6.1: Materias Tóxicas (Tóxico por ingestión e inhalación)',
    unNumber: 'UN 1564',
    kemlerCode: '60 (Materia tóxica)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas herméticas', 'Guantes de nitrilo resistente', 'Mascarilla FFP3 contra polvos tóxicos', 'Bata'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Armario bajo llave para sustancias tóxicas',
      incompatibles: ['Ácidos minerales (sulfúrico provoca precipitado de BaSO₄)', 'Oxidantes'],
      conditions: 'Recipiente hermético etiquetado con calavera de toxicidad aguda.'
    },
    contexto: {
      industria: 'Mordiente para impresión sobre tejidos e intermediario para la preparación de titanato de bario ferroeléctrico.',
      general: 'Sal de bario tóxica que bloquea los canales de potasio celulares requiriendo estricto protocolo de contención.'
    }
  },

  // ========================================================
  // 2. BORATOS (BO₃³⁻ / BO₂⁻ / Tetraborato) - 7 sales
  // ========================================================
  {
    id: 'Li3BO3',
    nombre: 'Borato de litio',
    formula: 'Li₃BO₃',
    categoria: 'sales',
    subcategoria: 'boratos',
    molarMass: 79.63,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Tránsito libre',
    ppe: ['Gafas de laboratorio', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Ácidos fuertes'],
      conditions: 'Contenedor hermético.'
    },
    contexto: {
      industria: 'Fundente para espectrometría de fluorescencia de rayos X (XRF) y electrolito sólido para baterías de litio avanzadas.',
      general: 'Sal inorgánica refractaria con excelente conductividad catiónica de iones litio a alta temperatura.'
    }
  },
  {
    id: 'Na3BO3',
    nombre: 'Borato de sodio (Ortoborato / Bórax)',
    formula: 'Na₃BO₃ / Na₂B₄O₇',
    categoria: 'sales',
    subcategoria: 'boratos',
    molarMass: 101.83,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado para transporte (Tóxico para la reproducción Cat. 1B bajo GHS a nivel industrial)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción',
    ppe: ['Gafas de seguridad', 'Guantes de nitrilo', 'Mascarilla antipolvo FFP2'],
    storage: {
      temperature: 'Ambiente fresco',
      ventilation: 'Zona ventilada',
      incompatibles: ['Ácidos fuertes (libera ácido bórico H₃BO₃)'],
      conditions: 'Sacos cerrados en lugar seco.'
    },
    contexto: {
      industria: 'Conocido en forma de tetraborato como bórax; fundente para soldadura de metales, vidrio borosilicato y detergente.',
      agricultura: 'Fuente clásica de micronutriente boro para corregir deficiencias en cultivos de remolacha y olivar.',
      general: 'Sal básica amortiguadora con hidrólisis fuertemente tamponada en torno a pH 9.2.'
    }
  },
  {
    id: 'K3BO3',
    nombre: 'Borato de potasio',
    formula: 'K₃BO₃',
    categoria: 'sales',
    subcategoria: 'boratos',
    molarMass: 176.12,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Tránsito libre',
    ppe: ['Gafas de seguridad', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Lugar seco',
      incompatibles: ['Ácidos'],
      conditions: 'Envase cerrado herméticamente.'
    },
    contexto: {
      agricultura: 'Fertilizante dual boro-potasio de alta solubilidad para aspersión foliar en floración.',
      general: 'Sólido blanco inodoro con fuerte basicidad en disolución acuosa.'
    }
  },
  {
    id: 'Mg3(BO3)2',
    nombre: 'Borato de magnesio',
    formula: 'Mg₃(BO₃)₂',
    categoria: 'sales',
    subcategoria: 'boratos',
    molarMass: 190.54,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas antipolvo', 'Guantes comunes'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Estándar',
      incompatibles: ['Ácidos fuertes'],
      conditions: 'Almacén general.'
    },
    contexto: {
      mineralogia: 'Base del mineral kotoíta en yacimientos de skarn metamórfico.',
      industria: 'Retardante de llama inorgánico cerámico y dosímetro termoluminiscente de radiación.',
      general: 'Estructura cristalina ortorrómbica con enlaces covalentes B-O de gran rigidez térmica.'
    }
  },
  {
    id: 'Ca3(BO3)2',
    nombre: 'Borato de calcio',
    formula: 'Ca₃(BO₃)₂',
    categoria: 'sales',
    subcategoria: 'boratos',
    molarMass: 237.86,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción',
    ppe: ['Gafas de seguridad', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Normal',
      incompatibles: ['Ácidos'],
      conditions: 'Recipientes secos.'
    },
    contexto: {
      mineralogia: 'Relacionado mineralógicamente con la colemanita y ulexita de yacimientos evaporíticos.',
      industria: 'Esmaltes cerámicos sin plomo, fibra de vidrio aislante y agentes ignífugos.',
      general: 'Polvo blanco poco soluble en agua pero reactivo frente a ácidos débiles.'
    }
  },
  {
    id: 'Sr3(BO3)2',
    nombre: 'Borato de estroncio',
    formula: 'Sr₃(BO₃)₂',
    categoria: 'sales',
    subcategoria: 'boratos',
    molarMass: 380.48,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas antipolvo', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Ácidos'],
      conditions: 'Envases sellados.'
    },
    contexto: {
      industria: 'Fósforos luminiscentes activados por europio (SrB₄O₇:Eu²⁺) para iluminación LED de alta fidelidad cromática.',
      general: 'Material óptico no lineal con gran ventana de transparencia en el espectro ultravioleta profundo.'
    }
  },
  {
    id: 'Ba3(BO3)2',
    nombre: 'Borato de bario',
    formula: 'Ba₃(BO₃)₂ / BaB₂O₄',
    categoria: 'sales',
    subcategoria: 'boratos',
    molarMass: 529.61,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 6.1: Materias Tóxicas (Sales solubles de bario)',
    unNumber: 'UN 1564',
    kemlerCode: '60 (Materia tóxica)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas estancas', 'Guantes de nitrilo', 'Mascarilla P2 contra polvo de bario'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Almacén ventilado y cerrado',
      incompatibles: ['Ácidos fuertes'],
      conditions: 'Envases estancos etiquetados con advertencia toxicológica.'
    },
    contexto: {
      industria: 'En su forma metaborato (BBO, β-BaB₂O₄) es el cristal óptico no lineal más importante del mundo para duplicación armónica de láseres UV.',
      general: 'Sal de bario con alta polarizabilidad electrónica e insolubilidad relativa.'
    }
  },

  // ========================================================
  // 3. CARBONATOS (CO₃²⁻) - 7 sales
  // ========================================================
  {
    id: 'Li2CO3',
    nombre: 'Carbonato de litio',
    formula: 'Li₂CO₃',
    categoria: 'sales',
    subcategoria: 'carbonatos',
    molarMass: 73.89,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado para transporte (Nocivo por ingestión Cat. 4 bajo GHS)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas de laboratorio', 'Guantes de nitrilo', 'Mascarilla antipolvo FFP2'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Ácidos fuertes (libera efervescencia de CO₂)'],
      conditions: 'Almacén general cerrado.'
    },
    contexto: {
      industria: 'La materia prima central de la industria de baterías de iones de litio y esmaltes cerámicos de bajo coeficiente de dilatación.',
      general: 'Presenta solubilidad retrógrada: su solubilidad decrece a medida que aumenta la temperatura del agua.'
    }
  },
  {
    id: 'Na2CO3',
    nombre: 'Carbonato de sodio (Ceniza de sosa)',
    formula: 'Na₂CO₃',
    categoria: 'sales',
    subcategoria: 'carbonatos',
    molarMass: 105.99,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado (Irritante ocular Cat. 2)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción',
    ppe: ['Gafas de seguridad', 'Guantes de goma o nitrilo'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco para prevenir hidratación higroscópica',
      incompatibles: ['Ácidos fuertes', 'Aluminio en contacto con solución caliente'],
      conditions: 'Sacos sellados en tarimas.'
    },
    contexto: {
      industria: 'Fabricación masiva de vidrio silíceo (proceso Solvay), desulfuración de gases y detergentes.',
      general: 'Sal alcalina fuerte en agua con pH ~11.5 en disolución al 1%.'
    }
  },
  {
    id: 'K2CO3',
    nombre: 'Carbonato de potasio (Potasa)',
    formula: 'K₂CO₃',
    categoria: 'sales',
    subcategoria: 'carbonatos',
    molarMass: 138.21,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Tránsito libre',
    ppe: ['Gafas estancas', 'Guantes de nitrilo'],
    storage: {
      temperature: 'Ambiente seco',
      ventilation: 'Estricto control de humedad (altamente delicuescente)',
      incompatibles: ['Ácidos fuertes', 'Metales reactivos'],
      conditions: 'Bidones plásticos con anillo de cierre hermético.'
    },
    contexto: {
      agricultura: 'Fertilizante potásico alcalinizante de uso en suelos muy ácidos y neutralizante biológico.',
      industria: 'Fabricación de tubos de rayos catódicos, vidrio óptico fino y jabones blandos de potasa.',
      general: 'Sal blanca translúcida muy higroscópica que se licúa al aire si no está perfectamente sellada.'
    }
  },
  {
    id: 'MgCO3',
    nombre: 'Carbonato de magnesio (Magnesita)',
    formula: 'MgCO₃',
    categoria: 'sales',
    subcategoria: 'carbonatos',
    molarMass: 84.31,
    state: 'sólido',
    nfpa: { health: 0, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas antipolvo', 'Guantes comunes'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Normal',
      incompatibles: ['Ácidos (efervescencia)'],
      conditions: 'Almacén general.'
    },
    contexto: {
      mineralogia: 'Mineral magnesita, fuente geológica primordial de óxido de magnesio refractario.',
      industria: 'Tiza deportiva para escalada y gimnasia (absorbe sudoración dérmica) y aditivo antiapelmazante E504.',
      general: 'Sal insoluble en agua ($K_{ps} = 3.5 \\times 10^{-8}$) pero fácilmente soluble en disoluciones ácidas.'
    }
  },
  {
    id: 'SrCO3',
    nombre: 'Carbonato de estroncio',
    formula: 'SrCO₃',
    categoria: 'sales',
    subcategoria: 'carbonatos',
    molarMass: 147.63,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas de seguridad', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Estándar',
      incompatibles: ['Ácidos fuertes'],
      conditions: 'Contenedores sellados.'
    },
    contexto: {
      mineralogia: 'Se encuentra en la naturaleza como el mineral estroncianita.',
      industria: 'Fabricación de imanes permanentes de ferrita de estroncio y colorante rojo vivo en fuegos artificiales.',
      general: 'Polvo fino blanco prácticamente insoluble en agua pura ($K_{ps} = 5.6 \\times 10^{-10}$).'
    }
  },
  {
    id: 'BaCO3',
    nombre: 'Carbonato de bario (Witherita)',
    formula: 'BaCO₃',
    categoria: 'sales',
    subcategoria: 'carbonatos',
    molarMass: 197.34,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 6.1: Materias Tóxicas (Tóxico por ingestión)',
    unNumber: 'UN 1564',
    kemlerCode: '60 (Materia tóxica)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas estancas', 'Guantes de nitrilo resistente', 'Mascarilla FFP3 contra polvo tóxico', 'Bata'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Zona ventilada bajo control de acceso',
      incompatibles: ['Ácidos minerales (libera sales de bario solubles tóxicas y CO₂)'],
      conditions: 'Envases estancos etiquetados con pictograma de peligro tóxico.'
    },
    contexto: {
      mineralogia: 'Mineral witherita, mena secundaria de bario.',
      industria: 'Eliminación de sulfatos en la industria cerámica para evitar eflorescencias de sales en ladrillos y tejas.',
      general: 'Aunque es poco soluble en agua pura, los jugos gástricos ácidos del estómago lo disuelven de inmediato produciendo intoxicación por iones Ba²⁺.'
    }
  },

  // ========================================================
  // 4. BICARBONATOS / HIDROGENOCARBONATOS (HCO₃⁻) - 7 sales
  // ========================================================
  {
    id: 'LiHCO3',
    nombre: 'Bicarbonato de litio',
    formula: 'LiHCO₃',
    categoria: 'sales',
    subcategoria: 'bicarbonatos',
    molarMass: 67.96,
    state: 'acuoso',
    nfpa: { health: 1, flammability: 0, instability: 1, special: 'NONE' },
    hazardClass: 'No regulado (Existe predominantemente en disolución acuosa)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas de laboratorio', 'Guantes comunes'],
    storage: {
      temperature: '< 20 °C',
      ventilation: 'Recipientes presurizados con CO₂ para evitar descomposición a Li₂CO₃',
      incompatibles: ['Ácidos fuertes', 'Bases fuertes'],
      conditions: 'Solución acuosa estabilizada bajo presión.'
    },
    contexto: {
      industria: 'Intermedio de purificación de sales de litio por carbonatación presurizada de espodumeno.',
      general: 'Sal inestable como sólido seco que se descompone térmicamente con pérdida de CO₂ y agua.'
    }
  },
  {
    id: 'NaHCO3',
    nombre: 'Bicarbonato de sodio',
    formula: 'NaHCO₃',
    categoria: 'sales',
    subcategoria: 'bicarbonatos',
    molarMass: 84.01,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Tránsito libre',
    ppe: ['Gafas de seguridad', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Lugar seco',
      incompatibles: ['Ácidos fuertes'],
      conditions: 'Sacos antihumedad.'
    },
    contexto: {
      agricultura: 'Fungicida preventivo para oídio en viña y hortalizas mediante alteración del pH foliar.',
      industria: 'Neutralizante de derrames ácidos de laboratorio, agente leudante en panadería (polvo de hornear) y extintores de polvo BC.',
      general: 'Tampón anfótero por excelencia capaz de actuar como ácido débil o base débil neutralizando ambos extremos.'
    }
  },
  {
    id: 'KHCO3',
    nombre: 'Bicarbonato de potasio',
    formula: 'KHCO₃',
    categoria: 'sales',
    subcategoria: 'bicarbonatos',
    molarMass: 100.12,
    state: 'sólido',
    nfpa: { health: 0, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción',
    ppe: ['Gafas de seguridad', 'Guantes comunes'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Lugar seco',
      incompatibles: ['Ácidos'],
      conditions: 'Envase cerrado.'
    },
    contexto: {
      agricultura: 'Fungicida ecológico de contacto registrado en agricultura orgánica contra oídio y sarna sin dejar residuos nocivos.',
      industria: 'Extintor de incendios Purple-K de ultra-alta eficacia en fuegos de hidrocarburos.',
      general: 'Sólido blanco monoclínico soluble en agua con pH ligeramente alcalino (~8.3).'
    }
  },
  {
    id: 'Mg(HCO3)2',
    nombre: 'Bicarbonato de magnesio',
    formula: 'Mg(HCO₃)₂',
    categoria: 'sales',
    subcategoria: 'bicarbonatos',
    molarMass: 146.34,
    state: 'acuoso',
    nfpa: { health: 0, flammability: 0, instability: 1, special: 'NONE' },
    hazardClass: 'No regulado (Solución acuosa inestable)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción',
    ppe: ['Gafas de seguridad'],
    storage: {
      temperature: '< 15 °C',
      ventilation: 'Hermético bajo CO₂',
      incompatibles: ['Calor (precipita MgCO₃)'],
      conditions: 'Solo estable en disolución acuosa.'
    },
    contexto: {
      mineralogia: 'Causa primordial de la dureza temporal del agua potable en macizos kársticos dolomíticos.',
      general: 'Al calentar la disolución a más de 50 °C se descompone precipitando carbonato de magnesio insoluble y desprendiendo CO₂.'
    }
  },
  {
    id: 'Ca(HCO3)2',
    nombre: 'Bicarbonato de calcio',
    formula: 'Ca(HCO₃)₂',
    categoria: 'sales',
    subcategoria: 'bicarbonatos',
    molarMass: 162.11,
    state: 'acuoso',
    nfpa: { health: 0, flammability: 0, instability: 1, special: 'NONE' },
    hazardClass: 'No regulado (Fase acuosa)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Tránsito libre',
    ppe: ['Gafas de protección'],
    storage: {
      temperature: '< 15 °C',
      ventilation: 'Presión de CO₂ requerida',
      incompatibles: ['Calor', 'Bases (precipitan CaCO₃ de inmediato)'],
      conditions: 'Solo existe en disolución acuosa diluida.'
    },
    contexto: {
      mineralogia: 'El compuesto responsable del modelado kárstico planetario: al gotear en cuevas y evaporarse el CO₂, se regenera el CaCO₃ formando estalactitas y estalagmitas.',
      general: 'No puede aislarse como sólido puro porque la evaporación del disolvente fuerza la reacción inversa hacia carbonato de calcio.'
    }
  },
  {
    id: 'Sr(HCO3)2',
    nombre: 'Bicarbonato de estroncio',
    formula: 'Sr(HCO₃)₂',
    categoria: 'sales',
    subcategoria: 'bicarbonatos',
    molarMass: 209.66,
    state: 'acuoso',
    nfpa: { health: 1, flammability: 0, instability: 1, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas de seguridad', 'Guantes estándar'],
    storage: {
      temperature: '< 15 °C',
      ventilation: 'Recipientes presurizados',
      incompatibles: ['Calor', 'Ácidos'],
      conditions: 'Fase acuosa refrigerada.'
    },
    contexto: {
      mineralogia: 'Intermedio de lixiviación acuosa en la génesis de vetas hidrotermales de celestina y estroncianita.',
      general: 'Especie soluble transitoria en aguas subterráneas ricas en CO₂ en contacto con minerales de estroncio.'
    }
  },
  {
    id: 'Ba(HCO3)2',
    nombre: 'Bicarbonato de bario',
    formula: 'Ba(HCO₃)₂',
    categoria: 'sales',
    subcategoria: 'bicarbonatos',
    molarMass: 259.36,
    state: 'acuoso',
    nfpa: { health: 2, flammability: 0, instability: 1, special: 'NONE' },
    hazardClass: 'Clase 6.1 (Solución acuosa tóxica por bario iónico)',
    unNumber: 'UN 3287 (Líquido tóxico inorgánico N.E.P.)',
    kemlerCode: '60',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas estancas', 'Guantes de nitrilo resistente'],
    storage: {
      temperature: '< 15 °C',
      ventilation: 'Zona controlada',
      incompatibles: ['Sulfatos (precipita BaSO₄ de inmediato)', 'Calor'],
      conditions: 'Frascos plásticos rotulados con toxicidad.'
    },
    contexto: {
      industria: 'Reactivo para purificación ultra-fina de disoluciones de azúcares y separación de aniones sulfato.',
      general: 'Sal inestable fuera de disolución acuosa saturada con dióxido de carbono; tóxica por cationes Ba²⁺.'
    }
  },

  // ========================================================
  // 5. CLORUROS (Cl⁻) - 7 sales
  // ========================================================
  {
    id: 'LiCl',
    nombre: 'Cloruro de litio',
    formula: 'LiCl',
    categoria: 'sales',
    subcategoria: 'cloruros',
    molarMass: 42.39,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado para transporte (Nocivo por ingestión Cat. 4)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas de laboratorio', 'Guantes de nitrilo'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Zona extremadamente seca (una de las sales más higroscópicas conocidas)',
      incompatibles: ['Oxidantes fuertes', 'Ácidos concentrados'],
      conditions: 'Envases herméticos con desecante de gel de sílice.'
    },
    contexto: {
      industria: 'Deshumidificadores industriales de aire por absorción química y electrolito para obtención de litio metálico.',
      general: 'Posee un marcado carácter covalente parcial debido al altísimo poder polarizante del diminuto catión Li⁺.'
    }
  },
  {
    id: 'MgCl2',
    nombre: 'Cloruro de magnesio',
    formula: 'MgCl₂',
    categoria: 'sales',
    subcategoria: 'cloruros',
    molarMass: 95.21,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Tránsito libre',
    ppe: ['Gafas de seguridad', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Lugar seco (delicuescente)',
      incompatibles: ['Oxidantes enérgicos'],
      conditions: 'Sacos multicapa estancos.'
    },
    contexto: {
      agricultura: 'Corrección rápida de deficiencias de magnesio en fertirriego y coagulante tradicional del tofu (nigari).',
      industria: 'Supresor de polvo en caminos de tierra y agente de deshielo a temperaturas de hasta -15 °C.',
      general: 'Cristaliza como hexahidrato MgCl₂·6H₂O; electrolito principal del agua marina tras el NaCl.'
    }
  },
  {
    id: 'CaCl2',
    nombre: 'Cloruro de calcio',
    formula: 'CaCl₂',
    categoria: 'sales',
    subcategoria: 'cloruros',
    molarMass: 110.98,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 1, special: 'NONE' },
    hazardClass: 'No regulado (Irritante ocular Cat. 2)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas de seguridad', 'Guantes de nitrilo'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Ambiente seco',
      incompatibles: ['Agua directa (disolución fuertemente exotérmica)', 'Ácidos fuertes'],
      conditions: 'Recipientes estancos protegidos de la humedad atmosférica.'
    },
    contexto: {
      agricultura: 'Tratamiento foliar para prevenir el "bitter pit" (mancha amarga) en manzanas y podredumbre apical en tomates.',
      industria: 'Desecante en tubos de secado químico, acelerador de fraguado de hormigón y descongelante vial a baja temperatura.',
      general: 'Su disolución en agua es fuertemente exotérmica (ΔH_sol = -82.8 kJ/mol).'
    }
  },
  {
    id: 'SrCl2',
    nombre: 'Cloruro de estroncio',
    formula: 'SrCl₂',
    categoria: 'sales',
    subcategoria: 'cloruros',
    molarMass: 158.53,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado (Lesiones oculares graves Cat. 1 bajo GHS)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Tránsito libre',
    ppe: ['Gafas herméticas de protección ocular', 'Guantes de nitrilo'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Oxidantes fuertes'],
      conditions: 'Envase bien cerrado.'
    },
    contexto: {
      industria: 'Ingrediente desensibilizante en dentífricos para dientes sensibles y emisor de luz roja en bengalas pirotécnicas.',
      general: 'Sal neutra blanca cristalina que arde con llama roja escarlata brillante.'
    }
  },
  {
    id: 'BaCl2',
    nombre: 'Cloruro de bario',
    formula: 'BaCl₂',
    categoria: 'sales',
    subcategoria: 'cloruros',
    molarMass: 208.23,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 6.1: Materias Tóxicas (Tóxico por ingestión e inhalación)',
    unNumber: 'UN 1564',
    kemlerCode: '60 (Materia tóxica)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas herméticas', 'Guantes de nitrilo resistente', 'Mascarilla FFP3 contra polvo tóxico', 'Bata'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Armario de sustancias tóxicas cerrado bajo llave',
      incompatibles: ['Sulfatos (precipitación inmediata de BaSO₄)', 'Oxidantes fuertes'],
      conditions: 'Contenedor etiquetado con señal de peligro toxicológico.'
    },
    contexto: {
      industria: 'Reactivo analítico estándar para precipitación y cuantificación gravimétrica de sulfatos en aguas y salmueras.',
      general: 'Sal inorgánica soluble altamente venenosa que altera la función miocárdica y neuromuscular.'
    }
  },

  // ========================================================
  // 6. CROMATOS (CrO₄²⁻) - 7 sales
  // ========================================================
  {
    id: 'Li2CrO4',
    nombre: 'Cromato de litio',
    formula: 'Li₂CrO₄',
    categoria: 'sales',
    subcategoria: 'cromatos',
    molarMass: 129.87,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'OX', specialText: 'Oxidante / Cromo hexavalente' },
    hazardClass: 'Clase 6.1: Materias Tóxicas (Carcinógeno Cat 1A, Mutágeno, Tóxico acuático)',
    unNumber: 'UN 3288',
    kemlerCode: '60 (Materia tóxica sólida)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles categoría E',
    ppe: ['Gafas estancas', 'Guantes de nitrilo o viton', 'Mascarilla FFP3 con filtro para polvo carcinógeno', 'Bata'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Armario de productos tóxicos ventilado',
      incompatibles: ['Reductores', 'Materiales orgánicos combustibles'],
      conditions: 'Frasco precintado herméticamente.'
    },
    contexto: {
      industria: 'Inhibidor de corrosión en sistemas de refrigeración por absorción de bromuro de litio.',
      general: 'Sal amarilla cristalina de cromo hexavalente Cr(VI) con fuerte poder oxidante.'
    }
  },
  {
    id: 'Na2CrO4',
    nombre: 'Cromato de sodio',
    formula: 'Na₂CrO₄',
    categoria: 'sales',
    subcategoria: 'cromatos',
    molarMass: 161.97,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 6.1: Materias Tóxicas (Subriesgo 5.1 Comburente y 8 Corrosivo)',
    unNumber: 'UN 3288',
    kemlerCode: '658 (Materia tóxica, comburente y corrosiva)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas integrales estancas', 'Guantes de barrera química', 'Protección respiratoria FFP3'],
    storage: {
      temperature: 'Ambiente fresco',
      ventilation: 'Ventilación localizada obligatoria',
      incompatibles: ['Reductores fuertes', 'Disolventes inflamables', 'Ácidos concentrados'],
      conditions: 'Envases estancos de alta seguridad.'
    },
    contexto: {
      industria: 'Inhibidor de corrosión en circuitos cerrados de refrigeración y pigmento amarillo para recubrimientos industriales.',
      general: 'Sólido amarillo brillante higroscópico muy soluble en agua.'
    }
  },
  {
    id: 'K2CrO4',
    nombre: 'Cromato de potasio',
    formula: 'K₂CrO₄',
    categoria: 'sales',
    subcategoria: 'cromatos',
    molarMass: 194.19,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 6.1 / Clase 9 (Carcinógeno, sensibilizante dérmico y peligroso acuático)',
    unNumber: 'UN 3077 / UN 3288',
    kemlerCode: '90 / 60',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas estancas', 'Guantes de nitrilo resistente', 'Mascarilla P3', 'Campana de gases'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Zona ventilada',
      incompatibles: ['Agentes reductores', 'Glicerina', 'Sulfuros'],
      conditions: 'Frascos de vidrio oscuro o polietileno de seguridad.'
    },
    contexto: {
      industria: 'Indicador clásico de punto final en la volumetría de precipitación de cloruros (método de Mohr).',
      general: 'Cristales rómbicos amarillos limón inalterables al aire; tóxico por cromo hexavalente.'
    }
  },
  {
    id: 'MgCrO4',
    nombre: 'Cromato de magnesio',
    formula: 'MgCrO₄',
    categoria: 'sales',
    subcategoria: 'cromatos',
    molarMass: 140.30,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 6.1: Materias Tóxicas',
    unNumber: 'UN 3288',
    kemlerCode: '60',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas protectoras', 'Guantes de nitrilo', 'Mascarilla FFP3'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Reductores', 'Ácidos'],
      conditions: 'Envase hermético.'
    },
    contexto: {
      industria: 'Inhibidor de corrosión y pasivante en tratamiento de superficies de aleaciones ligeras.',
      general: 'Sólido amarillo cristalino soluble en agua.'
    }
  },
  {
    id: 'CaCrO4',
    nombre: 'Cromato de calcio',
    formula: 'CaCrO₄',
    categoria: 'sales',
    subcategoria: 'cromatos',
    molarMass: 156.07,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 6.1: Materias Tóxicas (Carcinógeno Cat 1A)',
    unNumber: 'UN 3077 / UN 3288',
    kemlerCode: '60',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas estancas', 'Guantes químicos', 'Respirador P3'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Controlada',
      incompatibles: ['Reductores orgánicos'],
      conditions: 'Almacén de productos químicos catalogados.'
    },
    contexto: {
      industria: 'Despolarizador en baterías térmicas aeroespaciales e imprimación anticorrosiva de aviación.',
      general: 'Pigmento amarillo poco soluble en agua; fuertemente tóxico por acumulación.'
    }
  },
  {
    id: 'SrCrO4',
    nombre: 'Cromato de estroncio',
    formula: 'SrCrO₄',
    categoria: 'sales',
    subcategoria: 'cromatos',
    molarMass: 203.61,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 9: Materias peligrosas diversas (Carcinógeno Cat 1B, tóxico acuático agudo)',
    unNumber: 'UN 3077',
    kemlerCode: '90',
    adrTunnelCode: '(-)',
    tunnelDescription: 'Exento bajo UN 3077 para transporte terrestre',
    ppe: ['Gafas estancas', 'Guantes de nitrilo', 'Mascarilla FFP3'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Agentes reductores'],
      conditions: 'Recipientes estancos.'
    },
    contexto: {
      industria: 'El pigmento anticorrosivo aeroespacial de referencia mundial para imprimaciones epoxi de fuselajes de aluminio.',
      general: 'Polvo amarillo brillante con muy baja solubilidad en agua que libera lentamente iones cromato pasivantes.'
    }
  },
  {
    id: 'BaCrO4',
    nombre: 'Cromato de bario (Amarillo de bario)',
    formula: 'BaCrO₄',
    categoria: 'sales',
    subcategoria: 'cromatos',
    molarMass: 253.32,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 6.1: Materias Tóxicas',
    unNumber: 'UN 1564',
    kemlerCode: '60 (Materia tóxica)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas herméticas', 'Guantes de nitrilo', 'Mascarilla P3'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Zona ventilada',
      incompatibles: ['Ácidos fuertes (lo disuelven)', 'Reductores'],
      conditions: 'Frascos estancos.'
    },
    contexto: {
      industria: 'Fusibles pirotécnicos retardadores de combustión y pigmento cerámico amarillo resistente a altas temperaturas.',
      general: 'Sal prácticamente insoluble en agua pura ($K_{ps} = 1.17 \\times 10^{-10}$); doble toxicidad por bario y cromo hexavalente.'
    }
  },

  // ========================================================
  // 7. YODATOS (IO₃⁻) - 7 sales
  // ========================================================
  {
    id: 'LiIO3',
    nombre: 'Yodato de litio',
    formula: 'LiIO₃',
    categoria: 'sales',
    subcategoria: 'yodatos',
    molarMass: 181.84,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 1, special: 'OX', specialText: 'Comburente fuerte' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1479',
    kemlerCode: '50 (Materia comburente)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas de seguridad', 'Guantes de nitrilo', 'Ropa antiestática de algodón'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Zona ventilada lejos de materiales inflamables',
      incompatibles: ['Reductores', 'Azufre', 'Fósforo', 'Compuestos orgánicos'],
      conditions: 'Frascos sellados.'
    },
    contexto: {
      industria: 'Cristal piezoeléctrico y cristal óptico no lineal para generadores de segundo armónico en láseres infrarrojos.',
      general: 'Sal blanca cristalina hexagonal con fuerte actividad óptica y oxidante.'
    }
  },
  {
    id: 'NaIO3',
    nombre: 'Yodato de sodio',
    formula: 'NaIO₃',
    categoria: 'sales',
    subcategoria: 'yodatos',
    molarMass: 197.89,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1479',
    kemlerCode: '50',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas estancas', 'Guantes de nitrilo', 'Bata'],
    storage: {
      temperature: 'Ambiente fresco',
      ventilation: 'Almacén ignífugo',
      incompatibles: ['Materiales orgánicos', 'Agentes reductores', 'Ácidos fuertes'],
      conditions: 'Envases plásticos cerrados.'
    },
    contexto: {
      industria: 'Desinfectante antiséptico, reactivo de síntesis orgánica y aditivo alimentario para yodación de sal común en climas húmedos.',
      general: 'Agente oxidante moderadamente fuerte más estable térmicamente que el yoduro sódico.'
    }
  },
  {
    id: 'KIO3',
    nombre: 'Yodato de potasio',
    formula: 'KIO₃',
    categoria: 'sales',
    subcategoria: 'yodatos',
    molarMass: 214.00,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 1, special: 'OX', specialText: 'Comburente' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1479',
    kemlerCode: '50',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas de laboratorio', 'Guantes de nitrilo'],
    storage: {
      temperature: '< 30 °C',
      ventilation: 'Zona seca alejada de fuentes de calor',
      incompatibles: ['Polvos metálicos', 'Azufre', 'Carbón', 'Ácidos minerales'],
      conditions: 'Contenedores estancos.'
    },
    contexto: {
      industria: 'Yodación de sal de mesa recomendada por la OMS por su alta resistencia a la oxidación frente al aire tropical.',
      general: 'Cristales blancos monoclínicos inodoros con propiedades oxidantes en medio ácido.'
    }
  },
  {
    id: 'Mg(IO3)2',
    nombre: 'Yodato de magnesio',
    formula: 'Mg(IO₃)₂',
    categoria: 'sales',
    subcategoria: 'yodatos',
    molarMass: 374.11,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1479',
    kemlerCode: '50',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas de seguridad', 'Guantes de nitrilo'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Reductores', 'Combustibles'],
      conditions: 'Frasco sellado.'
    },
    contexto: {
      industria: 'Suplemento de micronutrientes en piensos ganaderos y catalizador de polimerización.',
      general: 'Sal blanca cristalina moderadamente soluble en agua.'
    }
  },
  {
    id: 'Ca(IO3)2',
    nombre: 'Yodato de calcio (Lautarita)',
    formula: 'Ca(IO₃)₂',
    categoria: 'sales',
    subcategoria: 'yodatos',
    molarMass: 389.88,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1479',
    kemlerCode: '50',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas de seguridad', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Materiales combustibles'],
      conditions: 'Sacos antihumedad.'
    },
    contexto: {
      mineralogia: 'Se encuentra en la naturaleza en los caliches del desierto de Atacama como el mineral lautarita.',
      agricultura: 'Fuente primordial de yodo en la nutrición animal para ganado lechero y aves.',
      general: 'Sal poco soluble en agua que libera lentamente yodo bioasimilable.'
    }
  },
  {
    id: 'Sr(IO3)2',
    nombre: 'Yodato de estroncio',
    formula: 'Sr(IO₃)₂',
    categoria: 'sales',
    subcategoria: 'yodatos',
    molarMass: 437.42,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1479',
    kemlerCode: '50',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas protectoras', 'Guantes de nitrilo'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Reductores', 'Azufre'],
      conditions: 'Envases sellados.'
    },
    contexto: {
      industria: 'Formulaciones pirotécnicas oxidantes de alta pureza lumínica.',
      general: 'Polvo blanco cristalino muy poco soluble en agua fría.'
    }
  },
  {
    id: 'Ba(IO3)2',
    nombre: 'Yodato de bario',
    formula: 'Ba(IO₃)₂',
    categoria: 'sales',
    subcategoria: 'yodatos',
    molarMass: 487.13,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes (Subriesgo Clase 6.1 Tóxico)',
    unNumber: 'UN 1479',
    kemlerCode: '56 (Materia comburente y tóxica)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas estancas', 'Guantes químicos', 'Mascarilla P3'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Armario cerrado bajo llave',
      incompatibles: ['Reductores', 'Sustancias combustibles'],
      conditions: 'Recipiente estanco de seguridad.'
    },
    contexto: {
      industria: 'Reactivo para preparación de ácido yódico y separaciones analíticas.',
      general: 'Prácticamente insoluble en agua ($K_{ps} = 1.5 \\times 10^{-9}$); combina toxicidad de bario con riesgo oxidante.'
    }
  },

  // ========================================================
  // 8. NITRATOS (NO₃⁻) - 7 sales
  // ========================================================
  {
    id: 'LiNO3',
    nombre: 'Nitrato de litio',
    formula: 'LiNO₃',
    categoria: 'sales',
    subcategoria: 'nitratos',
    molarMass: 68.95,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 1, special: 'OX', specialText: 'Comburente oxidante' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 2722',
    kemlerCode: '50 (Materia comburente)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas estancas', 'Guantes de nitrilo', 'Bata antiestática'],
    storage: {
      temperature: '< 30 °C',
      ventilation: 'Zona seca (muy delicuescente)',
      incompatibles: ['Orgánicos', 'Reductores', 'Ácidos fuertes'],
      conditions: 'Contenedores herméticamente sellados.'
    },
    contexto: {
      industria: 'Almacenamiento de energía térmica en sales fundidas eutécticas para centrales termosolares y fuegos artificiales rojos.',
      general: 'Sal delicuescente con elevada solubilidad y bajo punto de fusión relativo (261 °C).'
    }
  },
  {
    id: 'NaNO3',
    nombre: 'Nitrato de sodio (Salitre de Chile)',
    formula: 'NaNO₃',
    categoria: 'sales',
    subcategoria: 'nitratos',
    molarMass: 84.99,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1498',
    kemlerCode: '50',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas de seguridad', 'Guantes de nitrilo', 'Mascarilla antipolvo P2'],
    storage: {
      temperature: '< 30 °C',
      ventilation: 'Almacén ignífugo y seco',
      incompatibles: ['Materiales orgánicos (azúcar, harina, serrín)', 'Azufre', 'Reductores'],
      conditions: 'Palets no combustibles aislados de materias inflamables.'
    },
    contexto: {
      agricultura: 'Fertilizante nitrogenado histórico de asimilación rápida (nitrógeno nítrico soluble).',
      industria: 'Sales fundidas térmicas para concentración solar y conservante cárnico E251.',
      general: 'Cristaliza en el sistema trigonal tipo calcita; altamente soluble en agua.'
    }
  },
  {
    id: 'KNO3',
    nombre: 'Nitrato de potasio (Nitro / Salitre potásico)',
    formula: 'KNO₃',
    categoria: 'sales',
    subcategoria: 'nitratos',
    molarMass: 101.10,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 1, special: 'OX', specialText: 'Comburente oxidante' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1486',
    kemlerCode: '50 (Materia comburente)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido el paso en túneles de categoría E',
    ppe: ['Gafas de seguridad estancas', 'Guantes de nitrilo', 'Bata ignífuga', 'Mascarilla antipolvo P2'],
    storage: {
      temperature: '< 35 °C',
      ventilation: 'Zona seca, fresca y bien ventilada',
      incompatibles: ['Materiales orgánicos combustibles (carbón, azúcar)', 'Azufre', 'Reductores fuertes', 'Ácidos concentrados'],
      conditions: 'Almacén ignífugo exclusivo para comburentes, suelo impermeable y alejado de fuentes de ignición.'
    },
    contexto: {
      agricultura: 'Fertilizante hidrosoluble de élite en fertirriego (13-0-45). Aporta nitrógeno nítrico de asimilación directa y potasio libre de cloro, vital para cultivos sensibles a la salinidad (tomate, cítricos, fresas, viña).',
      industria: 'Ingrediente oxidante de la pólvora negra tradicional (75% KNO₃, 15% C, 10% S), sales térmicas para centrales termosolares y conservante alimentario E252.',
      general: 'Sal comburente muy soluble en agua caliente (316 g/L a 20 °C, 2460 g/L a 100 °C), fundamental en la síntesis de ácido nítrico y en formulaciones agrícolas de alta gama.'
    }
  },
  {
    id: 'Mg(NO3)2',
    nombre: 'Nitrato de magnesio',
    formula: 'Mg(NO₃)₂',
    categoria: 'sales',
    subcategoria: 'nitratos',
    molarMass: 148.31,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1474',
    kemlerCode: '50',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas de seguridad', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco (delicuescente)',
      incompatibles: ['Materiales combustibles', 'Reductores'],
      conditions: 'Sacos sellados antihumedad.'
    },
    contexto: {
      agricultura: 'Fertilizante soluble premium de magnesio y nitrógeno nítrico para fertirriego sin sulfatos ni cloruros.',
      industria: 'Agente deshidratante en la concentración de ácido nítrico mediante destilación extractiva.',
      general: 'Se comercializa habitualmente como hexahidrato Mg(NO₃)₂·6H₂O de disolución endotérmica.'
    }
  },
  {
    id: 'Ca(NO3)2',
    nombre: 'Nitrato de calcio (Nitro de Noruega)',
    formula: 'Ca(NO₃)₂',
    categoria: 'sales',
    subcategoria: 'nitratos',
    molarMass: 164.09,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1454',
    kemlerCode: '50',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas de protección', 'Guantes de nitrilo'],
    storage: {
      temperature: '< 30 °C',
      ventilation: 'Almacén seco (extremadamente higroscópico)',
      incompatibles: ['Sulfatos solubles (precipita yeso CaSO₄)', 'Combustibles'],
      conditions: 'Sacos aluminizados herméticos.'
    },
    contexto: {
      agricultura: 'Fertilizante calcio-nitrógeno por excelencia en fertirriego e hidroponía; refuerza la pared celular de los frutos previniendo fisiopatías.',
      industria: 'Coagulante de látex de caucho y acelerador de fraguado de hormigón en climas fríos.',
      general: 'Sal muy higroscópica que aporta calcio catiónico 100% soluble a las plantas.'
    }
  },
  {
    id: 'Sr(NO3)2',
    nombre: 'Nitrato de estroncio',
    formula: 'Sr(NO₃)₂',
    categoria: 'sales',
    subcategoria: 'nitratos',
    molarMass: 211.63,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1507',
    kemlerCode: '50',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas de seguridad', 'Guantes de nitrilo', 'Mascarilla antipolvo FFP2'],
    storage: {
      temperature: 'Ambiente fresco',
      ventilation: 'Zona ignífuga',
      incompatibles: ['Materiales orgánicos', 'Azufre', 'Reductores'],
      conditions: 'Bidones estancos.'
    },
    contexto: {
      industria: 'Componente primordial de bengalas de emergencia marítima, pirotecnia militar y proyectiles trazadores de color rojo.',
      general: 'Comburente clásico que emite una longitud de onda de 660 nm (rojo carmín intenso).'
    }
  },
  {
    id: 'Ba(NO3)2',
    nombre: 'Nitrato de bario',
    formula: 'Ba(NO₃)₂',
    categoria: 'sales',
    subcategoria: 'nitratos',
    molarMass: 261.34,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes (Subriesgo Clase 6.1 Tóxico)',
    unNumber: 'UN 1446',
    kemlerCode: '56 (Materia comburente y tóxica)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas estancas', 'Guantes químicos de viton/nitrilo', 'Mascarilla FFP3', 'Bata'],
    storage: {
      temperature: 'Ambiente fresco',
      ventilation: 'Armario bajo llave ventilado para sustancias tóxicas/comburentes',
      incompatibles: ['Sustancias inflamables', 'Ácidos concentrados', 'Reductores'],
      conditions: 'Envases estancos certificados ONU.'
    },
    contexto: {
      industria: 'Pirotecnia de destello verde esmeralda y composición incendiaria Baratol en aplicaciones de ingeniería.',
      general: 'Comburente enérgico con doble peligro por toxicidad sistémica severa.'
    }
  },

  // ========================================================
  // 9. PERCLORATOS (ClO₄⁻) - 7 sales
  // ========================================================
  {
    id: 'LiClO4',
    nombre: 'Perclorato de litio',
    formula: 'LiClO₄',
    categoria: 'sales',
    subcategoria: 'percloratos',
    molarMass: 106.39,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 2, special: 'OX', specialText: 'Oxidante extremo' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1481',
    kemlerCode: '50 (Materia comburente)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas de estanqueidad', 'Guantes de nitrilo resistente', 'Pantalla facial', 'Ropa ignífuga'],
    storage: {
      temperature: '< 25 °C',
      ventilation: 'Almacén ignífugo aislado',
      incompatibles: ['Materiales orgánicos', 'Glicerina', 'Sulfuros', 'Ácidos fuertes'],
      conditions: 'Contenedores sellados exentos de rozamiento mecánico.'
    },
    contexto: {
      industria: 'Generadores de oxígeno químico en submarinos y naves espaciales (libera O₂ puro por descomposición térmica) y electrolito de baterías de litio.',
      general: 'Tiene el contenido porcentual de oxígeno más alto en peso (~60%) entre los percloratos inorgánicos comunes.'
    }
  },
  {
    id: 'NaClO4',
    nombre: 'Perclorato de sodio',
    formula: 'NaClO₄',
    categoria: 'sales',
    subcategoria: 'percloratos',
    molarMass: 122.44,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 2, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1502',
    kemlerCode: '50',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas de seguridad', 'Guantes de nitrilo', 'Bata'],
    storage: {
      temperature: 'Ambiente fresco',
      ventilation: 'Seco (higroscópico)',
      incompatibles: ['Reductores', 'Materiales combustibles'],
      conditions: 'Envase hermético.'
    },
    contexto: {
      industria: 'Precursor de obtención electroquímica para todos los demás percloratos comerciales.',
      general: 'Sal blanca cristalina extraordinariamente soluble en agua (209 g en 100 ml a 20 °C).'
    }
  },
  {
    id: 'KClO4',
    nombre: 'Perclorato de potasio',
    formula: 'KClO₄',
    categoria: 'sales',
    subcategoria: 'percloratos',
    molarMass: 138.55,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 2, special: 'OX', specialText: 'Oxidante enérgico' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1489',
    kemlerCode: '50',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas panorámicas', 'Guantes de nitrilo', 'Ropa disipativa antiestática', 'Mascarilla P2'],
    storage: {
      temperature: '< 30 °C',
      ventilation: 'Área libre de chispas y fricción',
      incompatibles: ['Metales en polvo', 'Azufre', 'Carbón', 'Ácido sulfúrico concentrado'],
      conditions: 'Bidones plásticos protegidos de impactos mecánicos.'
    },
    contexto: {
      industria: 'Oxidante en propulsores de cohetes espaciales de combustible sólido, pirotecnia regulada y fulminantes.',
      general: 'A diferencia de los otros percloratos alcalinos, es muy poco soluble en agua fría (1.5 g/100 ml).'
    }
  },
  {
    id: 'Mg(ClO4)2',
    nombre: 'Perclorato de magnesio (Anhidrona)',
    formula: 'Mg(ClO₄)₂',
    categoria: 'sales',
    subcategoria: 'percloratos',
    molarMass: 223.21,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 2, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1475',
    kemlerCode: '50',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas estancas', 'Guantes de nitrilo', 'Bata'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Rigurosamente seco (potente desecante)',
      incompatibles: ['Materia orgánica', 'Alcoholes', 'Ácidos'],
      conditions: 'Frascos de vidrio con precinto de parafina.'
    },
    contexto: {
      industria: 'Uno de los agentes desecantes químicos más eficaces del mundo (Anhidrona) para análisis elemental de gases.',
      general: 'Absorbe hasta el 60% de su peso en agua liberando calor de hidratación.'
    }
  },
  {
    id: 'Ca(ClO4)2',
    nombre: 'Perclorato de calcio',
    formula: 'Ca(ClO₄)₂',
    categoria: 'sales',
    subcategoria: 'percloratos',
    molarMass: 238.98,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 2, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1455',
    kemlerCode: '50',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas protectoras', 'Guantes químicos'],
    storage: {
      temperature: 'Ambiente fresco',
      ventilation: 'Seco',
      incompatibles: ['Reductores', 'Combustibles'],
      conditions: 'Envase estanco.'
    },
    contexto: {
      mineralogia: 'Detectado en el suelo marciano por la sonda Phoenix y el rover Curiosity, donde baja el punto de congelación del agua permitiendo salmueras líquidas a -70 °C.',
      general: 'Sal blanca delicuescente con tremendo poder higroscópico y oxidante.'
    }
  },
  {
    id: 'Sr(ClO4)2',
    nombre: 'Perclorato de estroncio',
    formula: 'Sr(ClO₄)₂',
    categoria: 'sales',
    subcategoria: 'percloratos',
    molarMass: 286.52,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 2, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes',
    unNumber: 'UN 1508',
    kemlerCode: '50',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas estancas', 'Guantes de nitrilo', 'Mascarilla P2'],
    storage: {
      temperature: '< 30 °C',
      ventilation: 'Almacén ignífugo',
      incompatibles: ['Sustancias orgánicas', 'Fósforo'],
      conditions: 'Bidones cerrados.'
    },
    contexto: {
      industria: 'Oxidante de élite para pirotecnia de llama roja escarlata de altísima saturación cromática.',
      general: 'Sal cristalina soluble higroscópica que aporta simultáneamente oxígeno y el cromóforo de estroncio.'
    }
  },
  {
    id: 'Ba(ClO4)2',
    nombre: 'Perclorato de bario',
    formula: 'Ba(ClO₄)₂',
    categoria: 'sales',
    subcategoria: 'percloratos',
    molarMass: 336.23,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 2, special: 'OX' },
    hazardClass: 'Clase 5.1: Materias Comburentes (Subriesgo Clase 6.1 Tóxico)',
    unNumber: 'UN 1447',
    kemlerCode: '56 (Materia comburente y tóxica)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas estancas', 'Guantes de viton', 'Mascarilla FFP3', 'Traje de protección'],
    storage: {
      temperature: 'Ambiente fresco',
      ventilation: 'Zona de alta seguridad y ventilación continua',
      incompatibles: ['Reductores', 'Disolventes inflamables', 'Ácidos'],
      conditions: 'Envase blindado homologado ONU.'
    },
    contexto: {
      industria: 'Desecante de gases y formulaciones especiales de pirotecnia militar verde.',
      general: 'Doble peligrosidad crítica por su potente carácter comburente y toxicidad sistémica por bario.'
    }
  },

  // ========================================================
  // 10. FOSFATOS (PO₄³⁻) - 7 sales
  // ========================================================
  {
    id: 'Li3PO4',
    nombre: 'Fosfato de litio',
    formula: 'Li₃PO₄',
    categoria: 'sales',
    subcategoria: 'fosfatos',
    molarMass: 115.79,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas de laboratorio', 'Guantes comunes'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Normal',
      incompatibles: ['Ácidos fuertes (lo disuelven formando H₃PO₄)'],
      conditions: 'Almacén general.'
    },
    contexto: {
      industria: 'Precursor de cátodos de baterías de litio-ferrofosfato (LiFePO₄) y esmaltes cerámicos de alta rigidez dieléctrica.',
      general: 'Sal blanca prácticamente insoluble en agua pura ($K_{ps} = 3.2 \\times 10^{-9}$).'
    }
  },
  {
    id: 'Na3PO4',
    nombre: 'Fosfato trisódico (TSP)',
    formula: 'Na₃PO₄',
    categoria: 'sales',
    subcategoria: 'fosfatos',
    molarMass: 163.94,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado (Corrosivo dérmico suave en disolución alcalina)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Tránsito libre',
    ppe: ['Gafas de seguridad', 'Guantes de nitrilo'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Ácidos fuertes', 'Aluminio'],
      conditions: 'Sacos sellados.'
    },
    contexto: {
      industria: 'Desengrasante industrial para limpieza profunda de paredes previas a pintar y ablandador de aguas de calderas.',
      general: 'En disolución acuosa se hidroliza fuertemente generando pH muy básico (~12).'
    }
  },
  {
    id: 'K3PO4',
    nombre: 'Fosfato tripotásico',
    formula: 'K₃PO₄',
    categoria: 'sales',
    subcategoria: 'fosfatos',
    molarMass: 212.27,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Tránsito libre',
    ppe: ['Gafas de seguridad', 'Guantes de nitrilo'],
    storage: {
      temperature: 'Ambiente seco',
      ventilation: 'Control de humedad (muy delicuescente)',
      incompatibles: ['Ácidos fuertes'],
      conditions: 'Bidones cerrados herméticamente.'
    },
    contexto: {
      agricultura: 'Fertilizante hidrosoluble de alto contenido P-K para fases de enraizamiento y floración.',
      industria: 'Catalizador de transesterificación para producción de biodiésel y emulsionante alimentario E340.',
      general: 'Sal blanca delicuescente con fuerte basicidad acuosa.'
    }
  },
  {
    id: 'Mg3(PO4)2',
    nombre: 'Fosfato de magnesio',
    formula: 'Mg₃(PO₄)₂',
    categoria: 'sales',
    subcategoria: 'fosfatos',
    molarMass: 262.86,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas antipolvo', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Normal',
      incompatibles: ['Ácidos'],
      conditions: 'Sacos secos.'
    },
    contexto: {
      mineralogia: 'Se encuentra en la naturaleza como el mineral bobierrita.',
      industria: 'Suplemento nutricional alimentario de magnesio y fósforo (E343) y cerámica dental biocristalina.',
      general: 'Sal inorgánica blanca insoluble en agua pura pero asimilable en medio biológico ácido.'
    }
  },
  {
    id: 'Ca3(PO4)2',
    nombre: 'Fosfato de calcio (Fosforita)',
    formula: 'Ca₃(PO₄)₂',
    categoria: 'sales',
    subcategoria: 'fosfatos',
    molarMass: 310.18,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción',
    ppe: ['Gafas de seguridad', 'Guantes comunes'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Ácido sulfúrico (se transforma en superfosfato soluble)'],
      conditions: 'Almacén general.'
    },
    contexto: {
      mineralogia: 'Base mineral del apatito y de la masa inorgánica del esqueleto óseo y esmalte dental de los vertebrados.',
      agricultura: 'Roca fosfórica base para la fabricación de fertilizantes superfosfatos simples y triples tras tratamiento con H₂SO₄.',
      general: 'Sal blanca insoluble en agua ($K_{ps} = 2.07 \\times 10^{-33}$).'
    }
  },
  {
    id: 'Sr3(PO4)2',
    nombre: 'Fosfato de estroncio',
    formula: 'Sr₃(PO₄)₂',
    categoria: 'sales',
    subcategoria: 'fosfatos',
    molarMass: 450.80,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas antipolvo', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Estándar',
      incompatibles: ['Ácidos fuertes'],
      conditions: 'Envase sellado.'
    },
    contexto: {
      industria: 'Fósforos emisores de luz para tubos fluorescentes y recubrimientos cerámicos biomédicos para implantes óseos.',
      general: 'Polvo blanco inodoro de muy baja solubilidad acuosa.'
    }
  },
  {
    id: 'Ba3(PO4)2',
    nombre: 'Fosfato de bario',
    formula: 'Ba₃(PO₄)₂',
    categoria: 'sales',
    subcategoria: 'fosfatos',
    molarMass: 601.93,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 6.1: Materias Tóxicas (Sales de bario)',
    unNumber: 'UN 1564',
    kemlerCode: '60',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas estancas', 'Guantes de nitrilo', 'Mascarilla P2'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Controlada',
      incompatibles: ['Ácidos fuertes'],
      conditions: 'Frascos plásticos etiquetados con toxicidad.'
    },
    contexto: {
      industria: 'Vidrios ópticos especiales de bario con alto índice de refracción y cerámicas electrónicas.',
      general: 'Sal blanca densa insoluble en agua ($K_{ps} = 3.4 \\times 10^{-23}$); tóxica por ingestión en medio ácido estomacal.'
    }
  },

  // ========================================================
  // 11. SULFUROS (S²⁻) - 7 sales
  // ========================================================
  {
    id: 'Li2S',
    nombre: 'Sulfuro de litio',
    formula: 'Li₂S',
    categoria: 'sales',
    subcategoria: 'sulfuros',
    molarMass: 45.95,
    state: 'sólido',
    nfpa: { health: 3, flammability: 2, instability: 2, special: 'W', specialText: 'Reacciona con agua liberando gas H₂S tóxico' },
    hazardClass: 'Clase 8: Materias Corrosivas (Subriesgo Clase 4.3 y 6.1)',
    unNumber: 'UN 2923',
    kemlerCode: '86 (Materia corrosiva y tóxica)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles categoría E',
    ppe: ['Gafas estancas', 'Guantes químicos de butilo/neopreno', 'Máscara con filtro B contra H₂S', 'Traje químico'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Atmósfera anhidra purgada con gas inerte (argón)',
      incompatibles: ['Agua', 'Humedad (desprende sulfuro de hidrógeno H₂S altamente letal)', 'Ácidos', 'Oxidantes'],
      conditions: 'En caja seca (glovebox) en recipientes sellados al vacío.'
    },
    contexto: {
      industria: 'Material clave de cátodo y electrolito sólido sulfurado para baterías de litio-azufre (Li-S) de ultra-alta densidad energética teórica (2,600 Wh/kg).',
      general: 'Cristaliza en estructura antifluorita; hidrólisis violenta con vapor de agua liberando H₂S de olor a huevos podridos.'
    }
  },
  {
    id: 'Na2S',
    nombre: 'Sulfuro de sodio',
    formula: 'Na₂S',
    categoria: 'sales',
    subcategoria: 'sulfuros',
    molarMass: 78.04,
    state: 'sólido',
    nfpa: { health: 3, flammability: 2, instability: 1, special: 'W', specialText: 'Libera H₂S con ácidos' },
    hazardClass: 'Clase 8: Materias Corrosivas (Sólido corrosivo e hidrolizable)',
    unNumber: 'UN 1849',
    kemlerCode: '80 (Materia corrosiva)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas herméticas', 'Guantes de nitrilo o goma pesada', 'Pantalla facial', 'Filtro para gases ácidos/sulfhídrico'],
    storage: {
      temperature: 'Ambiente fresco',
      ventilation: 'Zona bien ventilada protegida de la humedad',
      incompatibles: ['Ácidos (desprendimiento inmediato y masivo de gas H₂S tóxico)', 'Oxidantes', 'Metales'],
      conditions: 'Bidones herméticos de polietileno con junta estanca.'
    },
    contexto: {
      industria: 'Pelambre químico de cueros en curtidurías, deslignificación de madera en el proceso Kraft papelero y precipitación de metales pesados.',
      general: 'Sal delicuescente amarillenta fuertemente cáustica e hidrolizada en agua ($S^{2-} + H_2O \\rightarrow HS^- + OH^-$).'
    }
  },
  {
    id: 'K2S',
    nombre: 'Sulfuro de potasio',
    formula: 'K₂S',
    categoria: 'sales',
    subcategoria: 'sulfuros',
    molarMass: 110.26,
    state: 'sólido',
    nfpa: { health: 3, flammability: 3, instability: 2, special: 'W' },
    hazardClass: 'Clase 4.2: Materias que pueden experimentar inflamación espontánea (Subriesgo 8 Corrosivo)',
    unNumber: 'UN 1382',
    kemlerCode: '48 (Materia sólida inflamable o autocalentable y corrosiva)',
    adrTunnelCode: '(D/E)',
    tunnelDescription: 'Prohibido en túneles D y E',
    ppe: ['Gafas integrales', 'Guantes de protección química pesada', 'Traje ignífugo', 'Respirador con filtro B'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Almacén ignífugo ventilado',
      incompatibles: ['Agua', 'Aire húmedo', 'Ácidos', 'Oxidantes'],
      conditions: 'Recipientes metálicos con cierre hermético bajo gas protector.'
    },
    contexto: {
      industria: 'Ingrediente activo del "hígado de azufre" usado para pátinas oscurecedoras y envejecimiento artístico de bronces y plata.',
      general: 'Sólido higroscópico marrón-rojizo pirofórico que puede autocalentarse en contacto con aire húmedo.'
    }
  },
  {
    id: 'MgS',
    nombre: 'Sulfuro de magnesio',
    formula: 'MgS',
    categoria: 'sales',
    subcategoria: 'sulfuros',
    molarMass: 56.37,
    state: 'sólido',
    nfpa: { health: 2, flammability: 1, instability: 2, special: 'W' },
    hazardClass: 'Clase 4.3: Materias que en contacto con el agua desprenden gases tóxicos/inflamables',
    unNumber: 'UN 3134',
    kemlerCode: '462',
    adrTunnelCode: '(D/E)',
    tunnelDescription: 'Restricción en túneles D y E',
    ppe: ['Gafas estancas', 'Guantes de nitrilo resistente', 'Máscara con filtro H₂S'],
    storage: {
      temperature: 'Ambiente seco',
      ventilation: 'Zona seca sin humedad',
      incompatibles: ['Agua', 'Humedad', 'Ácidos'],
      conditions: 'Envase sellado herméticamente.'
    },
    contexto: {
      mineralogia: 'Se encuentra en meteoritos condríticos de enstatita como el mineral niningerita.',
      industria: 'Desulfuración metalúrgica en acería y semiconductor de banda ancha.',
      general: 'Estructura tipo halita (NaCl) que se descompone con agua liberando gas sulfhídrico.'
    }
  },
  {
    id: 'CaS',
    nombre: 'Sulfuro de calcio (Oldhamita)',
    formula: 'CaS',
    categoria: 'sales',
    subcategoria: 'sulfuros',
    molarMass: 72.14,
    state: 'sólido',
    nfpa: { health: 2, flammability: 1, instability: 1, special: 'W' },
    hazardClass: 'Clase 4.3: Materias que en contacto con el agua desprenden gases inflamables/tóxicos',
    unNumber: 'UN 3134',
    kemlerCode: '462',
    adrTunnelCode: '(D/E)',
    tunnelDescription: 'Restricción en túneles D y E',
    ppe: ['Gafas de seguridad', 'Guantes de nitrilo', 'Mascarilla antipolvo P2'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Lugar seco',
      incompatibles: ['Ácidos fuertes (libera H₂S copiosamente)', 'Humedad'],
      conditions: 'Recipiente hermético.'
    },
    contexto: {
      mineralogia: 'Presente en meteoritos como oldhamita; componente del sulfocal (caldo sulfocálcico fitosanitario en agricultura).',
      industria: 'Fósforos luminiscentes fosforescentes y depilatorios cosméticos.',
      general: 'Polvo blanco que amarillea con el aire por oxidación parcial a polisulfuros y tiosulfatos.'
    }
  },
  {
    id: 'SrS',
    nombre: 'Sulfuro de estroncio',
    formula: 'SrS',
    categoria: 'sales',
    subcategoria: 'sulfuros',
    molarMass: 119.68,
    state: 'sólido',
    nfpa: { health: 2, flammability: 1, instability: 1, special: 'W' },
    hazardClass: 'Clase 4.3: Reacciona con agua desprendiendo gases tóxicos',
    unNumber: 'UN 3134',
    kemlerCode: '462',
    adrTunnelCode: '(D/E)',
    tunnelDescription: 'Restricción en túneles D y E',
    ppe: ['Gafas estancas', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Ácidos', 'Humedad'],
      conditions: 'Envases sellados.'
    },
    contexto: {
      industria: 'Pigmentos fosforescentes duraderos de resplandor verde-azulado y pantallas electroluminiscentes.',
      general: 'Sólido blanco cúbico que emite luz en la oscuridad tras ser excitado por radiación UV.'
    }
  },
  {
    id: 'BaS',
    nombre: 'Sulfuro de bario',
    formula: 'BaS',
    categoria: 'sales',
    subcategoria: 'sulfuros',
    molarMass: 169.39,
    state: 'sólido',
    nfpa: { health: 3, flammability: 1, instability: 1, special: 'W' },
    hazardClass: 'Clase 4.3: Materias que en contacto con el agua desprenden gases tóxicos (Subriesgo 6.1)',
    unNumber: 'UN 1399 / UN 3134',
    kemlerCode: '462 (Sólido reactivo con agua, tóxico)',
    adrTunnelCode: '(D/E)',
    tunnelDescription: 'Restricción en túneles D y E',
    ppe: ['Gafas herméticas', 'Guantes de nitrilo resistente', 'Mascarilla FFP3 con filtro B', 'Bata'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Zona seca ventilada bajo control',
      incompatibles: ['Ácidos (desprende H₂S letal)', 'Humedad', 'Oxidantes'],
      conditions: 'Bidones estancos herméticos.'
    },
    contexto: {
      industria: 'Precursor fundamental para la fabricación de litopón (pigmento blanco BaSO₄ + ZnS) e intermedio de reducción de la baritina (BaSO₄) con carbón.',
      general: 'Sal inorgánica densa fuertemente tóxica con hidrólisis alcalina y sulfhídrica en solución acuosa.'
    }
  }
];
