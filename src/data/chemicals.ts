import { EXPANDED_SALTS } from './saltsData';

export interface NFPAData {
  health: number; // 0-4
  flammability: number; // 0-4
  instability: number; // 0-4
  special?: 'OX' | 'W' | 'ACID' | 'ALK' | 'COR' | 'NONE';
  specialText?: string;
}

export interface ChemicalReagent {
  id: string;
  nombre: string;
  formula: string;
  formulaHtml?: string;
  categoria: 'acidos' | 'bases' | 'sales' | 'elementos' | 'indicadores' | 'organicos';
  subcategoria?: string;
  molarMass?: number;
  state: 'sólido' | 'líquido' | 'gas' | 'acuoso';
  purityGrade?: string;
  color?: string;
  nfpa: NFPAData;
  hazardClass: string;
  unNumber: string;
  kemlerCode: string;
  adrTunnelCode: string; // e.g. "(E)", "(D/E)", "(B/E)"
  tunnelDescription: string;
  ppe: string[];
  storage: {
    temperature: string;
    ventilation: string;
    incompatibles: string[];
    conditions: string;
  };
  contexto: {
    agricultura?: string;
    industria?: string;
    mineralogia?: string;
    general: string;
  };
}

export const CATEGORIES = [
  { id: 'all', label: 'Todos los Reactivos' },
  { id: 'acidos', label: 'Ácidos' },
  { id: 'bases', label: 'Bases' },
  { id: 'sales', label: 'Sales' },
  { id: 'elementos', label: 'Elementos Neutros' },
  { id: 'indicadores', label: 'Indicadores' },
  { id: 'organicos', label: 'Compuestos Orgánicos' },
] as const;

export const CHEMICAL_DATABASE: ChemicalReagent[] = [
  // ==========================================
  // ÁCIDOS (7)
  // ==========================================
  {
    id: 'HCl',
    nombre: 'Ácido clorhídrico',
    formula: 'HCl',
    categoria: 'acidos',
    molarMass: 36.46,
    state: 'líquido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'ACID', specialText: 'Ácido Corrosivo' },
    hazardClass: 'Clase 8: Materias Corrosivas (Líquido ácido inorgánico)',
    unNumber: 'UN 1789',
    kemlerCode: '80 (Materia corrosiva)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Paso prohibido por túneles de categoría E (máxima restricción)',
    ppe: ['Gafas de estanqueidad química (EN 166)', 'Guantes de nitrilo o butilo (>0.4 mm)', 'Pantalla facial antisalpicaduras', 'Delantal resistente a ácidos', 'Campana de extracción obligatoria'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Ventilación mecánica forzada continua y sistema de absorción de vapores',
      incompatibles: ['Bases fuertes', 'Metales reactivos (libera H₂)', 'Oxidantes fuertes (KMnO₄, NaOCl)', 'Cianuros', 'Sulfuros'],
      conditions: 'Almacenar en armarios ventilados para ácidos, recipientes de HDPE con cubeto de retención estanco.'
    },
    contexto: {
      industria: 'Decapado de aceros, síntesis de cloruros inorgánicos y purificación de sílice.',
      agricultura: 'Ajuste de pH en fertirriego y descalcificación de tuberías de goteo.',
      general: 'Ácido monoprótico fuerte, disociación completa en disolución acuosa con desprendimiento de calor.'
    }
  },
  {
    id: 'H2SO4',
    nombre: 'Ácido sulfúrico',
    formula: 'H₂SO₄',
    categoria: 'acidos',
    molarMass: 98.08,
    state: 'líquido',
    nfpa: { health: 3, flammability: 0, instability: 2, special: 'W', specialText: 'Reacciona violentamente con agua' },
    hazardClass: 'Clase 8: Materias Corrosivas (Ácido mineral deshidratante)',
    unNumber: 'UN 1830',
    kemlerCode: '80 (Materia corrosiva)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido el paso en túneles de categoría E',
    ppe: ['Gafas panorámicas estancas', 'Guantes de fluoroeastómero (Viton) o neopreno pesado', 'Pantalla facial completa', 'Traje de protección química tipo 3/4', 'Respirador con filtro B/P3'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Área seca y ventilada, alejada de fuentes de calor',
      incompatibles: ['Agua directa (adición violenta exotérmica)', 'Bases fuertes', 'Compuestos orgánicos reductores', 'Cloratos', 'Percloratos'],
      conditions: 'Depósitos de acero al carbono pasivado o PVDF con cubeto de contención de al menos el 110% de capacidad.'
    },
    contexto: {
      agricultura: 'Producción masiva de superfosfato y sulfato de potasio (K₂SO₄) para nutrición vegetal libre de cloruros.',
      industria: 'Electrolito de baterías de plomo-ácido, refinación de petróleo y sulfatación química.',
      mineralogia: 'Lixiviación ácida para extracción hidrometalúrgica de minerales de cobre y uranio.',
      general: 'Ácido diprótico fuerte de inmensa capacidad deshidratante que carboniza carbohidratos al contacto.'
    }
  },
  {
    id: 'HNO3',
    nombre: 'Ácido nítrico',
    formula: 'HNO₃',
    categoria: 'acidos',
    molarMass: 63.01,
    state: 'líquido',
    nfpa: { health: 4, flammability: 0, instability: 0, special: 'OX', specialText: 'Agente Oxidante Potente' },
    hazardClass: 'Clase 8: Materias Corrosivas (Subriesgo 5.1: Materias comburentes)',
    unNumber: 'UN 2031',
    kemlerCode: '85 (Materia corrosiva y comburente)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido el tránsito en túneles categoría E',
    ppe: ['Pantalla facial completa con gafas químicas', 'Guantes de butilo espesor >0.7 mm', 'Mandil y manguitos de polietileno clorado', 'Semimáscara con filtro NO-P3 para vapores nitrosos'],
    storage: {
      temperature: '< 20 °C, protegido de luz solar directa',
      ventilation: 'Extracción continua a baja altura (los vapores de NO₂ son más densos que el aire)',
      incompatibles: ['Materias orgánicas combustibles (alcoholes, celulosa, aceites)', 'Bases', 'Metales en polvo', 'Sulfuros'],
      conditions: 'Recipientes de vidrio topacio o acero inoxidable austenítico 304L/316L, aislado de reactivos orgánicos.'
    },
    contexto: {
      agricultura: 'Materia prima para fertilizantes nitrogenados de rápida absorción foliar y radicular (KNO₃, Ca(NO₃)₂).',
      industria: 'Fabricación de polímeros (poliuretano, nailon), grabado químico y pasivación de aceros.',
      general: 'Oxidante enérgico que emite vapores pardo-rojizos tóxicos de dióxido de nitrógeno ($NO_2$).'
    }
  },
  {
    id: 'CH3COOH',
    nombre: 'Ácido acético',
    formula: 'CH₃COOH',
    categoria: 'acidos',
    molarMass: 60.05,
    state: 'líquido',
    nfpa: { health: 3, flammability: 2, instability: 1, special: 'NONE' },
    hazardClass: 'Clase 8: Materias Corrosivas (Subriesgo 3: Líquido inflamable, glacial)',
    unNumber: 'UN 2789',
    kemlerCode: '83 (Materia corrosiva e inflamable)',
    adrTunnelCode: '(D/E)',
    tunnelDescription: 'Prohibido en túneles D (cuando se transporte en cisterna) y E',
    ppe: ['Gafas estancas', 'Guantes de goma butílica', 'Respirador con filtro para vapores orgánicos y ácidos (A-E)', 'Bata de laboratorio ignífuga'],
    storage: {
      temperature: '17 °C - 25 °C (solidifica a <16.6 °C como hielo acético)',
      ventilation: 'Almacén antideflagrante ventilado',
      incompatibles: ['Ácido crómico', 'Ácido nítrico concentrado', 'Peróxidos', 'Bases fuertes'],
      conditions: 'Envases de polietileno de alta densidad (HDPE) con conexión a tierra antiestática.'
    },
    contexto: {
      industria: 'Síntesis de acetato de vinilo para pinturas y adhesivos, producción de anhídrido acético y ésteres aromáticos.',
      agricultura: 'Desinfectante ecológico de sustratos y herbicida de contacto selectivo en agricultura biológica.',
      general: 'Ácido carboxílico débil; ácido acético glacial al 99.8% genera riesgo simultáneo de corrosión e ignición.'
    }
  },
  {
    id: 'H3PO4',
    nombre: 'Ácido fosfórico',
    formula: 'H₃PO₄',
    categoria: 'acidos',
    molarMass: 98.00,
    state: 'líquido',
    nfpa: { health: 3, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 8: Materias Corrosivas',
    unNumber: 'UN 1805',
    kemlerCode: '80 (Materia corrosiva)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas de seguridad con protección lateral y antisalpicaduras', 'Guantes de nitrilo', 'Bata resistente a salpicaduras ácidas'],
    storage: {
      temperature: '15 °C - 30 °C',
      ventilation: 'Ventilación estándar de laboratorio',
      incompatibles: ['Bases fuertes', 'Metales reactivos (ataca aluminio y hierro dulce desprendiendo hidrógeno)'],
      conditions: 'Contenedores de polietileno, polipropileno o acero inoxidable 316.'
    },
    contexto: {
      agricultura: 'Fuente primordial de fósforo soluble ($P_2O_5$) en fertirriego intensivo para el desarrollo radicular y floración.',
      industria: 'Acidulante en la industria de bebidas (E338), fosfatado preventivo contra la corrosión de metales.',
      general: 'Ácido triprótico moderadamente fuerte con tres constantes de disociación sucesivas ($pK_{a1}=2.15$, $pK_{a2}=7.20$, $pK_{a3}=12.35$).'
    }
  },
  {
    id: 'C6H8O7',
    nombre: 'Ácido cítrico',
    formula: 'C₆H₈O₇',
    categoria: 'acidos',
    molarMass: 192.12,
    state: 'sólido',
    nfpa: { health: 1, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado como mercancía peligrosa para transporte (Irritante Ocular Cat. 2)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Tránsito libre sin restricción ADR',
    ppe: ['Gafas de seguridad estándar', 'Guantes de nitrilo desechables', 'Mascarilla autofiltrante FFP1 contra polvo'],
    storage: {
      temperature: 'Ambiente (< 30 °C)',
      ventilation: 'Ambiente seco para evitar apelmazamiento higroscópico',
      incompatibles: ['Agentes oxidantes fuertes', 'Bases concentradas', 'Nitritos'],
      conditions: 'Sacos sellados en tarimas aisladas del suelo.'
    },
    contexto: {
      agricultura: 'Quelatante natural de micronutrientes (hierro, zinc, manganeso) mejorando su disponibilidad en suelos calcáreos.',
      industria: 'Conservante alimentario (E330), agente desincrustante y tampón de pH farmacéutico.',
      general: 'Ácido tricarboxílico orgánico intermedio clave en el ciclo de Krebs biológico celular.'
    }
  },
  {
    id: 'H2CO3',
    nombre: 'Ácido carbónico',
    formula: 'H₂CO₃',
    categoria: 'acidos',
    molarMass: 62.03,
    state: 'acuoso',
    nfpa: { health: 0, flammability: 0, instability: 1, special: 'NONE' },
    hazardClass: 'No regulado (Solución de gas disuelto $CO_2(aq) \\rightleftharpoons H_2CO_3$)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción de transporte',
    ppe: ['Gafas protectoras de montura universal', 'Guantes de látex o nitrilo'],
    storage: {
      temperature: '< 10 °C para mantener equilibrio de solubilidad de gas',
      ventilation: 'Recipientes herméticos presurizados',
      incompatibles: ['Bases que consumen el protón formando bicarbonatos o carbonatos'],
      conditions: 'Almacenar bajo presión de dióxido de carbono; a presión atmosférica se descompone en $H_2O$ y $CO_2$.'
    },
    contexto: {
      mineralogia: 'Meteorización de rocas carbonatadas; génesis de formaciones kársticas, estalactitas y estalagmitas por disolución de $CaCO_3$.',
      general: 'Ácido diprótico débil inestable en fase pura, responsable del sistema tampón bicarbonato vital en la sangre humana.'
    }
  },

  // ==========================================
  // BASES — Exclusivamente Hidróxidos (-OH)
  // ==========================================
  {
    id: 'LiOH',
    nombre: 'Hidróxido de litio',
    formula: 'LiOH',
    categoria: 'bases',
    molarMass: 23.95,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'ALK', specialText: 'Álcali Cáustico Fuerte' },
    hazardClass: 'Clase 8: Materias Corrosivas (Sólido básico inorgánico)',
    unNumber: 'UN 2680',
    kemlerCode: '80 (Materia corrosiva)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles de categoría E',
    ppe: ['Gafas herméticas y pantalla facial', 'Guantes de goma de butilo o nitrilo grueso', 'Delantal resistente a álcalis', 'Mascarilla contra polvo cáustico'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Zona seca, recipiente hermético contra CO₂ atmosférico',
      incompatibles: ['Ácidos fuertes', 'Aluminio y zinc', 'Compuestos orgánicos halogenados'],
      conditions: 'Bidones plásticos estancos sellados.'
    },
    contexto: {
      industria: 'Capturador de dióxido de carbono en misiones espaciales y submarinos (2LiOH + CO₂ ➔ Li₂CO₃ + H₂O) y fabricación de grasas lubricantes de litio.',
      general: 'Base fuerte que se disocia completamente en Li⁺ y OH⁻; tiene la menor masa molar entre los hidróxidos metálicos.'
    }
  },
  {
    id: 'NaOH',
    nombre: 'Hidróxido de sodio',
    formula: 'NaOH',
    categoria: 'bases',
    molarMass: 40.00,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'ALK', specialText: 'Álcali Cáustico Fuerte' },
    hazardClass: 'Clase 8: Materias Corrosivas (Sólido básico inorgánico)',
    unNumber: 'UN 1823',
    kemlerCode: '80 (Materia corrosiva)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas herméticas y pantalla facial completa', 'Guantes de nitrilo resistente o neopreno', 'Delantal resistente a cáusticos', 'Protección respiratoria contra nieblas alcalinas'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Lugar seco, cerrado herméticamente contra humedad y $CO_2$ del aire (delicuescente)',
      incompatibles: ['Ácidos fuertes (neutralización altamente violenta exotérmica)', 'Aluminio, zinc y estaño (libera hidrógeno gaseoso inflamable)', 'Compuestos halogenados orgánicos'],
      conditions: 'Bidones plásticos sellados con cubetos estancos de polietileno.'
    },
    contexto: {
      industria: 'Saponificación de grasas para jabones, regeneración de resinas de intercambio iónico y tratamiento de aguas residuales.',
      agricultura: 'Corrección de suelos ultra-ácidos y desinfección de instalaciones ganaderas.',
      general: 'Base fuerte que se disocia al 100% en iones $Na^+$ y $OH^-$, hidrolizando tejidos orgánicos de inmediato.'
    }
  },
  {
    id: 'KOH',
    nombre: 'Hidróxido de potasio',
    formula: 'KOH',
    categoria: 'bases',
    molarMass: 56.11,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'ALK', specialText: 'Álcali Cáustico' },
    hazardClass: 'Clase 8: Materias Corrosivas',
    unNumber: 'UN 1813',
    kemlerCode: '80 (Materia corrosiva)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido el paso en túneles categoría E',
    ppe: ['Protección ocular panorámica (EN166)', 'Guantes de goma de butilo o nitrilo grueso', 'Delantal de vinilo/neopreno', 'Calzado de seguridad antiálcalis'],
    storage: {
      temperature: 'Ambiente seco (< 25 °C)',
      ventilation: 'Ambiente controlado con baja humedad relativa',
      incompatibles: ['Ácidos fuertes', 'Anhídridos', 'Metales ligeros (aluminio)', 'Materiales orgánicos halogenados'],
      conditions: 'Envases estancos de HDPE etiquetados con advertencia cáustica.'
    },
    contexto: {
      agricultura: 'Precursor fundamental para la fabricación de fertilizantes líquidos de potasio neutros o alcalinos y jabones potásicos insecticidas.',
      industria: 'Electrolito en baterías alcalinas de níquel-cadmio y acumuladores recargables.',
      general: 'Más soluble en agua que el NaOH y con mayor basicidad; excelente donador de potasio soluble ($K^+$).'
    }
  },
  {
    id: 'Ca(OH)2',
    nombre: 'Hidróxido de calcio',
    formula: 'Ca(OH)₂',
    categoria: 'bases',
    molarMass: 74.09,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 8: Materias Corrosivas (Irritación cutánea / Lesiones oculares graves)',
    unNumber: 'UN 3262',
    kemlerCode: '80 (Materia corrosiva)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles categoría E',
    ppe: ['Gafas herméticas antipolvo', 'Guantes de trabajo recubiertos de nitrilo', 'Mascarilla de partículas FFP2', 'Ropa de trabajo de manga larga'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Zona seca sin corrientes de aire',
      incompatibles: ['Ácidos fuertes', 'Sales de amonio (desprende gas amoníaco)', 'Metales reactivos'],
      conditions: 'Almacenar protegido del anhídrido carbónico atmosférico para evitar su recarbonatación a $CaCO_3$.'
    },
    contexto: {
      agricultura: 'Enmienda de encalado agrícola para neutralizar la acidez de suelos de cultivo y elevar el pH optimizando la asimilación de nutrientes.',
      industria: 'Tratamiento de fangos, purificación del jugo de caña de azúcar y fabricación de morteros tradicionales de cal.',
      general: 'Conocido como cal apagada o hidratada; disolución acuosa saturada conocida como agua de cal.'
    }
  },
  {
    id: 'Mg(OH)2',
    nombre: 'Hidróxido de magnesio',
    formula: 'Mg(OH)₂',
    categoria: 'bases',
    molarMass: 58.32,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado para transporte ADR (Sustancia de baja peligrosidad)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción de túneles',
    ppe: ['Gafas de montura universal contra polvo', 'Guantes de nitrilo estándar', 'Mascarilla antipolvo sencilla'],
    storage: {
      temperature: '15 °C - 30 °C',
      ventilation: 'Almacén general seco',
      incompatibles: ['Ácidos fuertes'],
      conditions: 'Contenedores cerrados para evitar la absorción de dióxido de carbono.'
    },
    contexto: {
      industria: 'Retardante de llama ecológico no halogenado para plásticos y polímeros (desprende vapor de agua a >330 °C).',
      agricultura: 'Aporte de magnesio no corrosivo para suelos arenosos lixiviados.',
      general: 'Base poco soluble ($K_{ps} = 5.61 \\times 10^{-12}$), conocida popularmente en suspensión como leche de magnesia.'
    }
  },
  {
    id: 'Sr(OH)2',
    nombre: 'Hidróxido de estroncio',
    formula: 'Sr(OH)₂',
    categoria: 'bases',
    molarMass: 121.63,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'ALK', specialText: 'Álcali cáustico' },
    hazardClass: 'Clase 8: Materias Corrosivas (Sólido corrosivo inorgánico)',
    unNumber: 'UN 3262',
    kemlerCode: '80 (Materia corrosiva)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas estancas de protección', 'Guantes de nitrilo o butilo', 'Pantalla facial', 'Delantal resistente a cáusticos'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Seco y ventilado',
      incompatibles: ['Ácidos fuertes', 'Aluminio'],
      conditions: 'Envases plásticos herméticamente sellados.'
    },
    contexto: {
      industria: 'Estabilizador para plásticos de PVC y refinación de azúcar de remolacha por formación de disacarato de estroncio insoluble.',
      general: 'Base fuerte alcalinotérrea moderadamente soluble en agua caliente ($K_{ps} = 3.2 \\times 10^{-4}$ a 25 °C).'
    }
  },
  {
    id: 'Ba(OH)2',
    nombre: 'Hidróxido de bario (Barita cáustica)',
    formula: 'Ba(OH)₂',
    categoria: 'bases',
    molarMass: 171.34,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'ALK', specialText: 'Cáustico y tóxico' },
    hazardClass: 'Clase 8: Materias Corrosivas (Subriesgo Clase 6.1 Tóxico)',
    unNumber: 'UN 2923',
    kemlerCode: '86 (Materia corrosiva y tóxica)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles categoría E',
    ppe: ['Gafas herméticas integrales', 'Guantes de barrera química', 'Pantalla facial completa', 'Mascarilla FFP3'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Armario de seguridad química con extracción',
      incompatibles: ['Ácidos fuertes', 'Dióxido de carbono (precipita BaCO₃)', 'Sulfatos'],
      conditions: 'Bidones plásticos estancos etiquetados con peligro de corrosión y toxicidad.'
    },
    contexto: {
      industria: 'Reactivo para titulación acidimétrica en química analítica (agua de barita libre de carbonatos) y síntesis de jabones de bario para lubricantes.',
      general: 'Base fuerte altamente alcalina y soluble en agua caliente; extremadamente venenosa por iones Ba²⁺ y cáustica por iones OH⁻.'
    }
  },
  {
    id: 'NH4OH',
    nombre: 'Hidróxido de amonio',
    formula: 'NH₄OH',
    categoria: 'bases',
    molarMass: 35.05,
    state: 'acuoso',
    nfpa: { health: 3, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 8: Materias Corrosivas (Solución acuosa amoniacal, tóxico acuático)',
    unNumber: 'UN 2672',
    kemlerCode: '80 (Materia corrosiva)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles categoría E',
    ppe: ['Gafas integrales estancas', 'Guantes de butilo o nitrilo reforzado', 'Máscara con filtro K contra vapores de amoníaco', 'Campana de gases activa'],
    storage: {
      temperature: '< 20 °C (la presión de vapor de $NH_3$ sube rápidamente con la temperatura)',
      ventilation: 'Ventilación forzada a gran altura (el amoníaco es más liviano que el aire)',
      incompatibles: ['Ácidos', 'Hipoclorito de sodio (forma cloraminas tóxicas/explosivas)', 'Metales pesados como cobre y plata (forma complejos solubles)'],
      conditions: 'Bidones de polietileno con tapón desgasificador de seguridad.'
    },
    contexto: {
      agricultura: 'Fertilizante amoniacal directo y regulador de nitrógeno en fermentaciones microbianas.',
      industria: 'Agente limpiador desengrasante, manufactura de fibras de rayón y pretratamiento de aguas residuales ácidas.',
      general: 'Equilibrio dinámico en disolución acuosa: $NH_3(aq) + H_2O \\rightleftharpoons NH_4^+ + OH^-$, con constante de basicidad $K_b = 1.8 \\times 10^{-5}$.'
    }
  },
  {
    id: 'Cu(OH)2',
    nombre: 'Hidróxido de cobre(II)',
    formula: 'Cu(OH)₂',
    categoria: 'bases',
    molarMass: 97.56,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 9: Materias y objetos peligrosos diversos (Peligroso para el medio ambiente acuático)',
    unNumber: 'UN 3077',
    kemlerCode: '90 (Materia peligrosa para el medio ambiente)',
    adrTunnelCode: '(-)',
    tunnelDescription: 'Exento de restricción de túneles bajo ADR marginal 3077',
    ppe: ['Gafas de seguridad', 'Guantes de nitrilo', 'Mascarilla con filtro de partículas P2'],
    storage: {
      temperature: 'Ambiente fresco',
      ventilation: 'Zona ventilada y techada',
      incompatibles: ['Ácidos fuertes', 'Amoníaco (forma complejo tetraamincobre(II) azul zafiro intenso)'],
      conditions: 'Evitar vertidos al alcantarillado por toxicidad sobre organismos acuáticos.'
    },
    contexto: {
      agricultura: 'Fungicida y bactericida cúprico de referencia en viticultura, olivicultura y frutales para el control del mildiu y repilo.',
      industria: 'Colorante cerámico azul-verdoso y catalizador en síntesis orgánicas.',
      mineralogia: 'Se descompone con calor leve (>80 °C) en óxido cúprico negro ($CuO$) y agua.',
      general: 'Precipitado gelatinoso azul brillante de baja solubilidad acuosa ($K_{ps} = 2.2 \\times 10^{-20}$), soluble en amoníaco concentrado formando un complejo azurita.'
    }
  },
  {
    id: 'Fe(OH)3',
    nombre: 'Hidróxido de hierro(III)',
    formula: 'Fe(OH)₃',
    categoria: 'bases',
    molarMass: 106.87,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado (Precipitado insoluble de oxihidróxido férrico)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción de transporte',
    ppe: ['Gafas de laboratorio', 'Guantes estándar de nitrilo', 'Bata común'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Normal',
      incompatibles: ['Ácidos minerales concentrados (lo solubilizan formando sales férricas)'],
      conditions: 'Almacenar en recipientes plásticos secos.'
    },
    contexto: {
      mineralogia: 'Base mineralógica de la limonita y goethita ($FeO(OH)$); confiere los tonos ocres y rojizos a los suelos ferralíticos.',
      industria: 'Adsorbente de metales pesados (arsénico, cadmio) en potabilización de aguas y pigmento ocre inorgánico.',
      general: 'Precipitado pardo gelatinoso de bajísimo producto de solubilidad ($K_{ps} \\approx 2.79 \\times 10^{-39}$).'
    }
  },

  // ==========================================
  // SALES — 11 Familias Estructuradas + Sales Clásicas
  // ==========================================
  ...EXPANDED_SALTS,
  {
    id: 'CuSO4',
    nombre: 'Sulfato de cobre(II)',
    formula: 'CuSO₄',
    categoria: 'sales',
    subcategoria: 'otras_sales',
    molarMass: 159.61,
    state: 'sólido',
    nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 9: Materias peligrosas para el medio ambiente (Nocivo por ingestión, peligroso acuático agudo y crónico)',
    unNumber: 'UN 3077',
    kemlerCode: '90 (Materia peligrosa para el medio ambiente)',
    adrTunnelCode: '(-)',
    tunnelDescription: 'Sin restricción de túneles bajo exención UN 3077',
    ppe: ['Gafas de protección herméticas', 'Guantes de nitrilo químico', 'Mascarilla FFP2', 'Bata o buzo protector'],
    storage: {
      temperature: '< 30 °C',
      ventilation: 'Área seca y ventilada',
      incompatibles: ['Hierro y zinc metálicos (desplazamiento galvánico redox)', 'Hidrazina', 'Bases fuertes (precipita hidróxido)'],
      conditions: 'Recipientes impermeables aislados de cursos fluviales o red de desagües.'
    },
    contexto: {
      agricultura: 'Ingrediente clave del histórico caldo bordelés (combinado con $Ca(OH)_2$) para erradicar plagas de hongos criptogámicos.',
      industria: 'Baños de galvanoplastia para cobreado electrolítico y alguicida en balsas de riego.',
      mineralogia: 'Cristaliza como calcantita pentahidratada ($CuSO_4 \\cdot 5H_2O$) con tonalidad azul ultramar brillante.',
      general: 'Sal cúprica soluble anhidra blanca o pentahidratada azulada utilizada como reactivo de referencia en química analítica.'
    }
  },
  {
    id: 'AgNO3',
    nombre: 'Nitrato de plata',
    formula: 'AgNO₃',
    categoria: 'sales',
    subcategoria: 'otras_sales',
    molarMass: 169.87,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 0, special: 'OX', specialText: 'Oxidante / Cauterio' },
    hazardClass: 'Clase 5.1: Materias Comburentes (Subriesgo Clase 8: Corrosivo)',
    unNumber: 'UN 1493',
    kemlerCode: '58 (Materia comburente y corrosiva)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles categoría E',
    ppe: ['Gafas estancas de seguridad', 'Guantes de nitrilo resistente (mancha la piel de negro por plata coloidal)', 'Bata de laboratorio', 'Mascarilla antipolvo P2'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Zona oscura y ventilada',
      incompatibles: ['Materiales orgánicos combustibles', 'Cloruros, bromuros y yoduros (forma precipitados fotosensibles inmediatos)', 'Amoníaco en exceso (riesgo de plata fulminante)'],
      conditions: 'Frascos de vidrio topacio estancos protegidos rigurosamente de la luz.'
    },
    contexto: {
      industria: 'Plataformas de espejos ópticos, argentometría cuantitativa (método de Mohr/Volhard) y fotografía analógica clásica.',
      general: 'Agente oxidante corrosivo y antiséptico cáustico tópico (lápices de nitrato de plata para hemostasia).'
    }
  },
  {
    id: 'FeCl3',
    nombre: 'Cloruro de hierro(III)',
    formula: 'FeCl₃',
    categoria: 'sales',
    subcategoria: 'otras_sales',
    molarMass: 162.20,
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 1, special: 'NONE' },
    hazardClass: 'Clase 8: Materias Corrosivas (Ácido por hidrólisis)',
    unNumber: 'UN 3260',
    kemlerCode: '80 (Materia corrosiva)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles categoría E',
    ppe: ['Gafas de seguridad estancas', 'Guantes de nitrilo o goma', 'Pantalla facial para soluciones', 'Delantal protector'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Zona seca (altamente higroscópico y delicuescente)',
      incompatibles: ['Metales activos (corrosión acelerada)', 'Bases fuertes (precipita hidróxido férrico pardo)'],
      conditions: 'Contenedores de polietileno o fibra de vidrio resistente a cloruros.'
    },
    contexto: {
      industria: 'Coagulante primario en depuradoras de aguas residuales urbanas y grabado químico de placas de circuitos impresos (PCB).',
      general: 'En disolución acuosa experimenta una marcada hidrólisis ácida: $Fe^{3+} + 3H_2O \\rightleftharpoons Fe(OH)_3 + 3H^+$, alcanzando pH < 2.'
    }
  },
  {
    id: 'MgSO4',
    nombre: 'Sulfato de magnesio',
    formula: 'MgSO₄',
    categoria: 'sales',
    subcategoria: 'otras_sales',
    molarMass: 120.37,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Tránsito libre',
    ppe: ['Gafas de laboratorio estándar', 'Guantes comunes'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Almacén seco',
      incompatibles: ['Oxidantes muy enérgicos'],
      conditions: 'Sacos sellados antihumedad.'
    },
    contexto: {
      agricultura: 'Conocido como sal de Epsom o kieserita; corrector de clorosis magnésica en cultivos leñosos y hortícolas con total solubilidad.',
      industria: 'Curtido de pieles, baños terapéuticos de flotación y agente desecante en síntesis orgánica anhidra.',
      general: 'Nutriente esencial bivalente que forma el átomo central de coordinación del anillo porfirínico de la clorofila vegetal.'
    }
  },
  {
    id: 'K2SO4',
    nombre: 'Sulfato de potasio',
    formula: 'K₂SO₄',
    categoria: 'sales',
    subcategoria: 'otras_sales',
    molarMass: 174.26,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado como mercancía peligrosa (Fertilizante agronómico)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación por todas las categorías de túneles',
    ppe: ['Gafas de seguridad industriales', 'Guantes de nitrilo estándar', 'Mascarilla antipolvo FFP1'],
    storage: {
      temperature: 'Ambiente (< 35 °C)',
      ventilation: 'Zona seca para evitar terrones',
      incompatibles: ['Nitrato de calcio o sales solubles de bario en la misma cuba de mezcla (precipitan sulfatos insolubles)'],
      conditions: 'Almacenamiento paletizado cubierto.'
    },
    contexto: {
      agricultura: 'El fertilizante potásico estrella para agricultura intensiva y tecnificada. Proporciona un 50-52% de $K_2O$ y 18% de azufre ($S$) completamente libre de cloruros ($Cl^-$), indispensable para cultivos sensibles a la salinidad (cítricos, frutos rojos, aguacates, tabaco, viña y hortalizas bajo invernadero).',
      industria: 'Fabricación de vidrio de alta resistencia óptica y reactivo de digestión Kjeldahl.',
      general: 'Sal neutra obtenida típicamente por el proceso Mannheim a partir de $H_2SO_4$ y sales de potasio.'
    }
  },

  // ==========================================
  // ELEMENTOS NEUTROS (19)
  // ==========================================
  {
    id: 'Al',
    nombre: 'Aluminio',
    formula: 'Al',
    categoria: 'elementos',
    molarMass: 26.98,
    state: 'sólido',
    nfpa: { health: 1, flammability: 1, instability: 1, special: 'W', specialText: 'En polvo reacciona con agua/álcalis' },
    hazardClass: 'Clase 4.3 (si es polvo no recubierto: Materias que desprenden gases inflamables en contacto con el agua)',
    unNumber: 'UN 1396',
    kemlerCode: '423 (Sólido que reacciona con agua emitiendo gases inflamables)',
    adrTunnelCode: '(D/E)',
    tunnelDescription: 'Prohibido en túneles D y E cuando es polvo pirofórico o reactivo',
    ppe: ['Gafas con protección lateral', 'Guantes mecánicos ignífugos', 'Calzado disipativo antiestático'],
    storage: {
      temperature: 'Ambiente seco',
      ventilation: 'Zona con venteo anti-deflagración si se manipula en polvo',
      incompatibles: ['Ácidos fuertes', 'Bases fuertes (libera $H_2$ copiosamente)', 'Oxidantes fuertes', 'Halógenos'],
      conditions: 'Contenedores herméticamente purgados con gas inerte para polvo metálico.'
    },
    contexto: {
      mineralogia: 'La oxidación del aluminio genera **Alúmina ($Al_2O_3$)**, matriz del mineral **corindón**. Si cristaliza con impurezas de cromo ($Cr^{3+}$) produce el deslumbrante color rojo del **Rubí**; si contiene trazas coordinadas de hierro ($Fe^{2+}$) y titanio ($Ti^{4+}$), forma el azul profundo del **Zafiro**.',
      industria: 'Aleaciones aeroespaciales ligeras, conductores eléctricos de alta capacidad y perfiles estructurales de construcción.',
      general: 'Metal anfótero ligero con película pasivante microscópica de óxido que le confiere resistencia a la corrosión ambiental.'
    }
  },
  {
    id: 'Ba',
    nombre: 'Bario',
    formula: 'Ba',
    categoria: 'elementos',
    molarMass: 137.33,
    state: 'sólido',
    nfpa: { health: 3, flammability: 2, instability: 2, special: 'W', specialText: 'Reacciona violentamente con agua' },
    hazardClass: 'Clase 4.3: Materias que en contacto con el agua desprenden gases inflamables (Tóxico)',
    unNumber: 'UN 1400',
    kemlerCode: '423',
    adrTunnelCode: '(D/E)',
    tunnelDescription: 'Restricción en túneles D/E',
    ppe: ['Guantes resistentes al fuego y disolventes', 'Pantalla facial completa', 'Traje ignífugo'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Almacén bajo atmósfera protectora de argón o queroseno anhidro',
      incompatibles: ['Agua', 'Humedad ambiental', 'Ácidos', 'Oxígeno puro'],
      conditions: 'Sumergido bajo aceite mineral inerte en frascos metálicos herméticos.'
    },
    contexto: {
      industria: 'Getter de vacío en tubos catódicos de electrones y bujías para motores de combustión.',
      general: 'Metal alcalinotérreo blanco plateado altamente reactivo que arde con llama verde esmeralda característica.'
    }
  },
  {
    id: 'B',
    nombre: 'Boro',
    formula: 'B',
    categoria: 'elementos',
    molarMass: 10.81,
    state: 'sólido',
    nfpa: { health: 1, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado en forma amorfa común',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas de seguridad', 'Guantes estándar', 'Mascarilla FFP2 para polvo'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Oxidantes fuertes', 'Halógenos'],
      conditions: 'Envases sellados.'
    },
    contexto: {
      agricultura: 'Micronutriente crítico en la síntesis de paredes celulares vegetales, polinización y fecundación floral.',
      industria: 'Vidrio borosilicatado de choque térmico (Pyrex), semiconductores tipo P y barras de control en reactores nucleares (alta sección de captura de neutrones térmicos por $^{10}B$).',
      general: 'Metaloide semiconductor con redes icosaédricas $B_{12}$ fascinantes.'
    }
  },
  {
    id: 'Ca',
    nombre: 'Calcio',
    formula: 'Ca',
    categoria: 'elementos',
    molarMass: 40.08,
    state: 'sólido',
    nfpa: { health: 3, flammability: 2, instability: 2, special: 'W', specialText: 'Reacciona exotérmicamente con agua' },
    hazardClass: 'Clase 4.3: Materias que en contacto con el agua desprenden gases inflamables',
    unNumber: 'UN 1401',
    kemlerCode: '423',
    adrTunnelCode: '(D/E)',
    tunnelDescription: 'Restricción en túneles D y E',
    ppe: ['Guantes resistentes al calor y químicos secos', 'Gafas de seguridad estancas', 'Bata ignífuga'],
    storage: {
      temperature: 'Seco y fresco',
      ventilation: 'Área libre de condensación',
      incompatibles: ['Agua', 'Humedad', 'Ácidos', 'Alcoholes'],
      conditions: 'Almacenar en recipientes herméticamente sellados con gas inerte o aceite mineral.'
    },
    contexto: {
      industria: 'Agente desoxidante y desulfurante en metalurgia del acero y reductor para extracción de uranio y torio.',
      general: 'Metal alcalinotérreo blando que reacciona con agua produciendo hidróxido de calcio e hidrógeno: $Ca + 2H_2O \\rightarrow Ca(OH)_2 + H_2\\uparrow$.'
    }
  },
  {
    id: 'C',
    nombre: 'Carbono',
    formula: 'C',
    categoria: 'elementos',
    molarMass: 12.01,
    state: 'sólido',
    nfpa: { health: 0, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 4.2 si es carbón vegetal activado autocalentable (UN 1362)',
    unNumber: 'UN 1362 (Activado) / No reg. (Grafito)',
    kemlerCode: '40',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Túneles E para carbón activo susceptible de combustión espontánea',
    ppe: ['Gafas de seguridad', 'Guantes estándar', 'Mascarilla antipolvo FFP2'],
    storage: {
      temperature: 'Ambiente ventilado',
      ventilation: 'Buena ventilación para dispersar posibles gases de adsorción',
      incompatibles: ['Oxidantes fuertes (ozono, permanganatos, ácido nítrico concentrado)'],
      conditions: 'Almacenes secos alejados de disolventes volátiles.'
    },
    contexto: {
      mineralogia: 'Se presenta en alótropos asombrosos: grafito laminar superconductor y lubricante, y diamante cúbico con la máxima dureza 10 de Mohs.',
      industria: 'Filtros de carbón activo para purificación de aire y agua, fibras de carbono de alta resistencia y electrodos de baterías.',
      general: 'Elemento tetravalente base insustituible de la química orgánica y de todas las formas de vida biológica terrestres.'
    }
  },
  {
    id: 'Co',
    nombre: 'Cobalto',
    formula: 'Co',
    categoria: 'elementos',
    molarMass: 58.93,
    state: 'sólido',
    nfpa: { health: 2, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 9: Materias peligrosas diversas (Tóxico y sensibilizante si es polvo)',
    unNumber: 'UN 3077 (Polvo) / No reg. (Bloque)',
    kemlerCode: '90',
    adrTunnelCode: '(-)',
    tunnelDescription: 'Sin restricción para formas sólidas compactas',
    ppe: ['Guantes de nitrilo', 'Gafas de seguridad', 'Mascarilla FFP3 si hay riesgo de inhalación de partículas finas'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Estándar',
      incompatibles: ['Ácidos minerales (lo atacan lentamente)', 'Oxidantes fuertes'],
      conditions: 'Recipientes etiquetados contra inhalación prolongada.'
    },
    contexto: {
      industria: 'Cátodos de baterías de iones de litio (NMC/LCO), superaleaciones para turbinas de aviones a reacción y pigmento azul de cobalto cerámico.',
      general: 'Metal de transición ferromagnético con punto de Curie a 1,115 °C; átomo central de la vitamina B12 (cobalamina).'
    }
  },
  {
    id: 'Cu',
    nombre: 'Cobre',
    formula: 'Cu',
    categoria: 'elementos',
    molarMass: 63.55,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado en piezas o hilo (Clase 9 si es polvo microfino tóxico acuático)',
    unNumber: 'UN 3077 (Polvo fino) / No reg.',
    kemlerCode: '90',
    adrTunnelCode: '(-)',
    tunnelDescription: 'Libre circulación para hilo y chatarra compacta',
    ppe: ['Guantes de protección mecánica', 'Gafas de montura universal'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco para evitar pátina verdosa de cardenillo ($Cu_2CO_3(OH)_2$)',
      incompatibles: ['Ácidos oxidantes fuertes (ácido nítrico)', 'Acetileno (forma acetiluros explosivos)', 'Amoníaco'],
      conditions: 'Almacén general cubierto.'
    },
    contexto: {
      industria: 'Conductores eléctricos primarios de redes eléctricas, bobinados de motores, microelectrónica y fontanería.',
      general: 'Uno de los pocos metales con color intrínseco no plateado, excelente conductividad térmica y eléctrica solo superada por la plata.'
    }
  },
  {
    id: 'Au',
    nombre: 'Oro',
    formula: 'Au',
    categoria: 'elementos',
    molarMass: 196.97,
    state: 'sólido',
    nfpa: { health: 0, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado (Metal noble inerte)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción',
    ppe: ['Guantes textiles para no transferir huellas lipídicas a superficies ópticas'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seguridad física y control de accesos',
      incompatibles: ['Agua regia ($HNO_3 + 3HCl$)', 'Disoluciones de cianuros alcalinos en presencia de oxígeno'],
      conditions: 'Caja fuerte o depósito blindado de alta seguridad.'
    },
    contexto: {
      industria: 'Contactos y microconectores eléctricos anticorrosivos en electrónica espacial y médica; reflectores térmicos infrarrojos de satélites.',
      general: 'Metal noble de máxima maleabilidad y ductilidad; su inalterabilidad química y brillo dorado se deben a efectos relativistas sobre sus orbitales 6s.'
    }
  },
  {
    id: 'I',
    nombre: 'Yodo',
    formula: 'I',
    categoria: 'elementos',
    molarMass: 126.90, // Molecular I2 = 253.8 g/mol
    state: 'sólido',
    nfpa: { health: 3, flammability: 0, instability: 0, special: 'COR', specialText: 'Vapores violetas corrosivos' },
    hazardClass: 'Clase 8: Materias Corrosivas (Subriesgo 6.1: Tóxico)',
    unNumber: 'UN 3495',
    kemlerCode: '86 (Materia corrosiva y tóxica)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles categoría E',
    ppe: ['Gafas estancas', 'Guantes de nitrilo resistente o butilo', 'Máscara con filtro para vapores halógenos tipo B-P3', 'Campana de gases obligatoria'],
    storage: {
      temperature: '< 20 °C',
      ventilation: 'Armario cerrado y ventilado (sublima con facilidad emitiendo vapor violeta denso)',
      incompatibles: ['Amoníaco (produce triyoduro de nitrógeno $NI_3$, explosivo al tacto)', 'Metales en polvo', 'Reductores fuertes'],
      conditions: 'Envases herméticos de vidrio oscuro con cierre de teflón.'
    },
    contexto: {
      industria: 'Desinfectantes yodóforos (povidona yodada), contrastes radiológicos y lámparas halógenas.',
      general: 'Halógeno sólido brillante gris violáceo que sublima a temperatura ambiente sin pasar por el estado líquido a presión atmosférica normal.'
    }
  },
  {
    id: 'Fe',
    nombre: 'Hierro',
    formula: 'Fe',
    categoria: 'elementos',
    molarMass: 55.85,
    state: 'sólido',
    nfpa: { health: 0, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 4.1 si es polvo de hierro pirofórico o reactivo (UN 3089)',
    unNumber: 'UN 3089 (Polvo metálico) / No reg. (Bloque)',
    kemlerCode: '40',
    adrTunnelCode: '(E) para polvo / Sin restricción para perfiles',
    tunnelDescription: 'Restricción en túneles E solo si se transporta polvo fino inflamable',
    ppe: ['Guantes de protección mecánica', 'Gafas de montura universal'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Lugar seco para impedir la oxidación a herrumbre ($Fe_2O_3 \\cdot nH_2O$)',
      incompatibles: ['Ácidos fuertes', 'Oxidantes fuertes', 'Agua salina'],
      conditions: 'Almacén techado con humedad relativa controlada.'
    },
    contexto: {
      industria: 'Pilar estructural de la civilización moderna a través del acero, aleaciones ferro-carbono y maquinaria pesada.',
      general: 'Elemento más estable en términos de energía de enlace nuclear por nucleón ($^{56}Fe$), etapa final de la fusión estelar.'
    }
  },
  {
    id: 'Li',
    nombre: 'Litio',
    formula: 'Li',
    categoria: 'elementos',
    molarMass: 6.94,
    state: 'sólido',
    nfpa: { health: 3, flammability: 3, instability: 2, special: 'W', specialText: 'Reacciona violentamente con agua/humedad' },
    hazardClass: 'Clase 4.3: Materias que en contacto con el agua desprenden gases inflamables',
    unNumber: 'UN 1415',
    kemlerCode: 'X423 (Reacciona peligrosamente con agua, emitiendo gases inflamables)',
    adrTunnelCode: '(D/E)',
    tunnelDescription: 'Prohibido en túneles categoría D y E',
    ppe: ['Gafas estancas', 'Guantes ignífugos de barrera química seca', 'Pantalla facial completa', 'Traje ignífugo antiestático', 'Extintor Clase D obligatorio'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Zona seca purgada con gas inerte (argón)',
      incompatibles: ['Agua', 'Humedad', 'Nitrógeno gaseoso (forma nitruro de litio $Li_3N$ espontáneamente)', 'Dióxido de carbono (reacciona con calor)', 'Halógenos'],
      conditions: 'Sumergido bajo aceite mineral anhidro o parafina en contenedores herméticos de acero inoxidable.'
    },
    contexto: {
      industria: 'Pilar de la transición energética en baterías de iones de litio y aleaciones ultraligeras para fuselajes aeronáuticos.',
      general: 'Metal menos denso conocido ($0.534 \\text{ g/cm}^3$, flota en agua y aceite) y con el potencial de electrodo más negativo (-3.04 V).'
    }
  },
  {
    id: 'Mg',
    nombre: 'Magnesio',
    formula: 'Mg',
    categoria: 'elementos',
    molarMass: 24.31,
    state: 'sólido',
    nfpa: { health: 1, flammability: 2, instability: 1, special: 'W', specialText: 'No extinguir con agua si arde' },
    hazardClass: 'Clase 4.1: Sólidos inflamables (cintas, virutas o polvo)',
    unNumber: 'UN 1869',
    kemlerCode: '40 (Materia sólida inflamable)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E para cintas y virutas',
    ppe: ['Gafas protectoras de soldador (su combustión emite intensa radiación UV cegadora)', 'Guantes de cuero ignífugo', 'Extintor de polvo Clase D (arena seca o fundente de cloruros)'],
    storage: {
      temperature: 'Ambiente seco',
      ventilation: 'Zona bien ventilada sin humedad',
      incompatibles: ['Agua (descompone el vapor de agua a alta temperatura generando hidrógeno combustible)', 'Oxidantes', 'Ácidos'],
      conditions: 'Almacenar en bidones metálicos estancos lejos de chispas y llama abierta.'
    },
    contexto: {
      industria: 'Aleaciones ultraligeras automotrices y aeroespaciales (Magnesio-Aluminio), pirotecnia de destello blanco y ánodos de sacrificio.',
      general: 'Arde en aire a más de 3,100 °C emitiendo un resplandor blanco deslumbrante que requiere protección retiniana.'
    }
  },
  {
    id: 'Ni',
    nombre: 'Níquel',
    formula: 'Ni',
    categoria: 'elementos',
    molarMass: 58.69,
    state: 'sólido',
    nfpa: { health: 2, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 9 (Sospechoso de provocar cáncer / Sensibilizante cutáneo en polvo)',
    unNumber: 'UN 3077 (Polvo) / No reg. (Chapa)',
    kemlerCode: '90',
    adrTunnelCode: '(-)',
    tunnelDescription: 'Libre circulación para barras y planchas macizas',
    ppe: ['Guantes de barrera que eviten el contacto dérmico prolongado (dermatitis de contacto por níquel)', 'Gafas de seguridad'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Estándar',
      incompatibles: ['Monóxido de carbono (forma níquel tetracarbonilo $Ni(CO)_4$ extremadamente tóxico)', 'Ácidos minerales'],
      conditions: 'Almacén general.'
    },
    contexto: {
      industria: 'Fabricación de acero inoxidable austenítico serie 300, superaleaciones Inconel y catalizador de hidrogenación de aceites vegetales (níquel Raney).',
      general: 'Metal de transición dúctil resistente a la corrosión por álcalis calientes y con comportamiento ferromagnético.'
    }
  },
  {
    id: 'P',
    nombre: 'Fósforo',
    formula: 'P',
    categoria: 'elementos',
    molarMass: 30.97,
    state: 'sólido',
    nfpa: { health: 4, flammability: 4, instability: 2, special: 'W', specialText: 'Fósforo blanco es pirofórico espontáneo' },
    hazardClass: 'Clase 4.2: Materias que pueden experimentar inflamación espontánea (Fósforo blanco UN 1381) / Clase 4.1 (Fósforo rojo UN 1338)',
    unNumber: 'UN 1338 (Rojo) / UN 1381 (Blanco)',
    kemlerCode: '40 (Rojo) / 46 (Blanco pirofórico)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido el paso en túneles E',
    ppe: ['Traje químico ignífugo completo', 'Guantes estancos resistentes al fuego', 'Pantalla facial', 'Equipo de respiración autónoma si hay combustión'],
    storage: {
      temperature: '< 25 °C',
      ventilation: 'Zona de contención especial',
      incompatibles: ['Oxidantes fuertes', 'Halógenos', 'Azufre', 'Bases (libera gas fosfina $PH_3$ letal)'],
      conditions: 'Fósforo blanco debe mantenerse sumergido en agua permanentemente; fósforo rojo en bidones estancos herméticos.'
    },
    contexto: {
      agricultura: 'Elemento macronutriente primario indispensable en el ADN, ARN y ciclo del ATP biológico.',
      industria: 'Cerillas de seguridad, retardantes de llama y semiconductores dopados con fósforo.',
      general: 'Posee alótropos dramáticamente opuestos: el fósforo blanco ($P_4$) es céreo, hiper-tóxico y arde espontáneamente al contacto con el aire a 30 °C; el fósforo rojo es polimérico y mucho más estable.'
    }
  },
  {
    id: 'K',
    nombre: 'Potasio',
    formula: 'K',
    categoria: 'elementos',
    molarMass: 39.10,
    state: 'sólido',
    nfpa: { health: 3, flammability: 3, instability: 2, special: 'W', specialText: 'Reacciona violentamente con agua liberando H₂ que arde con llama violeta' },
    hazardClass: 'Clase 4.3: Materias que en contacto con el agua desprenden gases inflamables',
    unNumber: 'UN 2257',
    kemlerCode: 'X423 (Reacciona peligrosamente con agua emitiendo gases inflamables)',
    adrTunnelCode: '(D/E)',
    tunnelDescription: 'Prohibición estricta en túneles D y E',
    ppe: ['Gafas estancas de seguridad', 'Guantes resistentes a hidrocarburos y álcalis secos', 'Pantalla facial completa', 'Delantal ignífugo', 'Extintor Clase D'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Almacén ventilado y rigurosamente seco',
      incompatibles: ['Agua', 'Humedad ambiental', 'Oxígeno (forma superóxido $KO_2$ explosivo al corte si envejece)', 'Halógenos', 'Ácidos'],
      conditions: 'Sumergido bajo queroseno o aceite mineral completamente anhidro en botes metálicos con precinto hermético.'
    },
    contexto: {
      agricultura: 'Macronutriente vital que regula la apertura estomática, presión osmótica y síntesis de azúcares y proteínas en plantas.',
      industria: 'Aleación líquida sodio-potasio (NaK) para refrigeración de reactores nucleares de neutrones rápidos.',
      general: 'Metal blando que se corta fácilmente con bisturí; reacciona instantáneamente con agua ardiendo con una llama violeta característica.'
    }
  },
  {
    id: 'Na',
    nombre: 'Sodio',
    formula: 'Na',
    categoria: 'elementos',
    molarMass: 22.99,
    state: 'sólido',
    nfpa: { health: 3, flammability: 3, instability: 2, special: 'W', specialText: 'Reacción muy violenta y explosiva con agua' },
    hazardClass: 'Clase 4.3: Materias que en contacto con el agua desprenden gases inflamables',
    unNumber: 'UN 1428',
    kemlerCode: 'X423 (Reacciona peligrosamente con agua emitiendo gases inflamables)',
    adrTunnelCode: '(D/E)',
    tunnelDescription: 'Prohibido en túneles D y E',
    ppe: ['Gafas panorámicas estancas', 'Guantes de cuero seco o neopreno pesado', 'Pantalla facial protectora', 'Ropa ignífuga', 'Calzado antiestático'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Zona protegida de humedad y goteo de condensación',
      incompatibles: ['Agua', 'Soluciones acuosas', 'Ácidos', 'Compuestos halogenados orgánicos (reacción de Wurtz incontrolable)'],
      conditions: 'Bajo queroseno o hidrocarburos parafínicos secos en bidones metálicos estancos.'
    },
    contexto: {
      industria: 'Refrigerante térmico líquido en plantas nucleares de sales y sodio fundido; síntesis de amida sódica y reducción de titanio (proceso Kroll).',
      general: 'Metal alcalino blando que reacciona violentamente con agua: $2Na + 2H_2O \\rightarrow 2NaOH + H_2\\uparrow + \\Delta H$, incendiando con frecuencia el gas hidrógeno desprendido con llama amarilla.'
    }
  },
  {
    id: 'Sr',
    nombre: 'Estroncio',
    formula: 'Sr',
    categoria: 'elementos',
    molarMass: 87.62,
    state: 'sólido',
    nfpa: { health: 2, flammability: 2, instability: 1, special: 'W', specialText: 'Reacciona con agua' },
    hazardClass: 'Clase 4.3: Materias que en contacto con el agua desprenden gases inflamables',
    unNumber: 'UN 3131',
    kemlerCode: '423',
    adrTunnelCode: '(D/E)',
    tunnelDescription: 'Restricción en túneles D y E',
    ppe: ['Gafas herméticas', 'Guantes resistentes a productos químicos secos', 'Bata de laboratorio'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Agua', 'Humedad', 'Ácidos', 'Oxidantes'],
      conditions: 'Bajo aceite mineral inerte para evitar la formación espontánea de nitruro y óxido.'
    },
    contexto: {
      mineralogia: 'Se extrae principalmente de la celestina ($SrSO_4$) y la estroncianita ($SrCO_3$).',
      industria: 'Pirotecnia militar y civil para producir destellos de color rojo carmesí intenso; imanes de ferrita de estroncio.',
      general: 'Metal alcalinotérreo amarillento muy reactivo; químicamente similar al calcio pero con radio iónico más expandido.'
    }
  },
  {
    id: 'S',
    nombre: 'Azufre',
    formula: 'S',
    categoria: 'elementos',
    molarMass: 32.06,
    state: 'sólido',
    nfpa: { health: 2, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 4.1: Materias sólidas inflamables (UN 1350 / UN 2448 fundido)',
    unNumber: 'UN 1350',
    kemlerCode: '40 (Materia sólida inflamable)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas antipolvo', 'Guantes de cuero o nitrilo', 'Mascarilla antipolvo FFP2', 'Ropa disipativa antiestática'],
    storage: {
      temperature: '< 35 °C',
      ventilation: 'Zona bien ventilada para evitar acumulación de nubes de polvo explosivas',
      incompatibles: ['Agentes comburentes (cloratos, nitratos, permanganatos)', 'Carbón', 'Metales en polvo'],
      conditions: 'Almacenar en naves secas con instalación eléctrica antideflagrante.'
    },
    contexto: {
      agricultura: 'Fungicida natural de contacto y acaricida clásico; enmienda acidificante para corregir suelos sódicos alcalinos.',
      industria: 'Producción de ácido sulfúrico ($H_2SO_4$), vulcanización del caucho para neumáticos y pólvora negra.',
      general: 'Sólido amarillo cristalino con anillos octatómicos $S_8$; arde con llama azul tenue desprendiendo gas sofocante de dióxido de azufre ($SO_2$).'
    }
  },
  {
    id: 'O2',
    nombre: 'Oxígeno',
    formula: 'O₂',
    categoria: 'elementos',
    molarMass: 32.00,
    state: 'gas',
    nfpa: { health: 0, flammability: 0, instability: 0, special: 'OX', specialText: 'Gas Comburente Acelerador de Combustión' },
    hazardClass: 'Clase 2: Gases (2.2 Gas comburente a presión / líquido criogénico UN 1073)',
    unNumber: 'UN 1072 (Gas) / UN 1073 (Líquido)',
    kemlerCode: '25 (Gas comburente)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles categoría E',
    ppe: ['Gafas de seguridad', 'Guantes de cuero limpios exentos absolutamente de grasa o aceites', 'Calzado antiestático'],
    storage: {
      temperature: '< 50 °C',
      ventilation: 'Área abierta o ventilación continua al exterior',
      incompatibles: ['Grasas, aceites y lubricantes minerales (ignición espontánea violenta por compresión adiabática)', 'Gases inflamables (acetileno, propano)', 'Materiales orgánicos combustibles'],
      conditions: 'Botellas fijadas verticalmente con cadena en jaula ventilada, caperuza de válvula colocada.'
    },
    contexto: {
      mineralogia: 'Reacciona exotérmicamente con aluminio ($4Al + 3O_2 \\rightarrow 2Al_2O_3$), formando óxido de aluminio (alúmina/corindón), mineral que con trazas de cromo cristaliza como rubí y con hierro y titanio como zafiro.',
      industria: 'Oxicorte de metales pesados, descarburación de arrabio en convertidores siderúrgicos LD y soporte vital aeroespacial y médico.',
      general: 'Gas diatómico paramagnético esencial para la respiración celular y las reacciones de combustión y oxidación planetarias.'
    }
  },
  {
    id: 'H2',
    nombre: 'Hidrógeno',
    formula: 'H₂',
    categoria: 'elementos',
    molarMass: 2.016,
    state: 'gas',
    nfpa: { health: 0, flammability: 4, instability: 0, special: 'W', specialText: 'Gas extremadamente inflamable' },
    hazardClass: 'Clase 2: Gases (2.1 Gas inflamable comprimido)',
    unNumber: 'UN 1049',
    kemlerCode: '23 (Gas inflamable)',
    adrTunnelCode: '(B/D)',
    tunnelDescription: 'Prohibido en túneles de categoría B en cisternas y D/E',
    ppe: ['Gafas de seguridad estancas', 'Guantes antiestáticos de cuero', 'Calzado disipativo antiestático', 'Ropa ignífuga'],
    storage: {
      temperature: '< 50 °C',
      ventilation: 'Ventilación forzada continua sin fuentes de ignición o chispas eléctricas',
      incompatibles: ['Oxidantes fuertes (oxígeno, cloro, flúor)', 'Halógenos', 'Metales finamente divididos'],
      conditions: 'Botellas de gas comprimido con válvula antirretorno y arrestallamas, fijadas firmemente en exterior o armario antideflagrante.'
    },
    contexto: {
      industria: 'Síntesis industrial de amoníaco por proceso Haber-Bosch ($N_2 + 3H_2 \\rightarrow 2NH_3$), hidrogenación catalítica de aceites vegetales, refino de petróleo y combustible aeroespacial criogénico.',
      general: 'El elemento químico más ligero y abundante del universo; gas diatómico incoloro e inodoro con amplios límites de inflamabilidad en aire (4% - 75% v/v).'
    }
  },
  {
    id: 'N2',
    nombre: 'Nitrógeno',
    formula: 'N₂',
    categoria: 'elementos',
    molarMass: 28.01,
    state: 'gas',
    nfpa: { health: 0, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 2: Gases (2.2 Gas no inflamable no tóxico comprimido)',
    unNumber: 'UN 1066 (Gas comprimido) / UN 1977 (Líquido criogénico)',
    kemlerCode: '20 (Gas asfixiante / no inflamable)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Restricción en túneles categoría E por riesgo de desplazamiento de oxígeno en espacios confinados',
    ppe: ['Gafas de seguridad', 'Guantes criogénicos (si se manipula líquido a -196 °C)', 'Calzado de seguridad'],
    storage: {
      temperature: '< 50 °C',
      ventilation: 'Área bien ventilada para prevenir asfixia por desplazamiento de oxígeno',
      incompatibles: ['Metales alcalinos fundidos (litio a alta temperatura formando nitruro)', 'Materiales combustibles a baja temperatura'],
      conditions: 'Botellas con ojiva verde oscuro, fijadas verticalmente, con sensor de oxígeno ambiental en el recinto.'
    },
    contexto: {
      industria: 'Atmósferas inertes protectoras en tratamientos térmicos de metales, envasado de alimentos al vacío (MAP) y síntesis química.',
      general: 'Gas diatómico inerte que constituye el 78% de la atmósfera terrestre; el nitrógeno líquido hierve a -196 °C y se emplea en criogenia y congelación rápida.'
    }
  },

  // ==========================================
  // INDICADORES (8)
  // ==========================================
  {
    id: 'Bromotimol',
    nombre: 'Azul de Bromotimol',
    formula: 'C₂₇H₂₈Br₂O₅S',
    categoria: 'indicadores',
    molarMass: 624.38,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado como producto peligroso de transporte',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas de seguridad', 'Guantes desechables de nitrilo'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Estándar',
      incompatibles: ['Oxidantes fuertes'],
      conditions: 'Frasco de vidrio oscuro cerrado.'
    },
    contexto: {
      general: 'Indicador de pH con viraje idóneo en el rango fisiológico neutro: **Amarillo a pH < 6.0**, **Verde a pH 7.0**, y **Azul a pH > 7.6**; ampliamente usado en monitoreo de fotosíntesis y respiración biológica.'
    }
  },
  {
    id: 'RojoCresol',
    nombre: 'Rojo de Cresol',
    formula: 'C₂₁H₁₇NaO₅S',
    categoria: 'indicadores',
    molarMass: 404.41,
    state: 'sólido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas de laboratorio', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Oxidantes enérgicos'],
      conditions: 'Envase opaco protegido de luz directa.'
    },
    contexto: {
      general: 'Indicador diprótico con dos zonas de viraje: rango ácido (rojo a naranja-amarillo a pH 0.2 - 1.8) y rango básico (**Amarillo a pH 7.2 a Rojo-Púrpura a pH 8.8**); también usado como marcador de electroforesis en geles de agarosa.'
    }
  },
  {
    id: 'Tornasol',
    nombre: 'Tornasol',
    formula: 'C₇H₇O₄N / C₁₃H₂₂O₆',
    categoria: 'indicadores',
    molarMass: 330.0,
    state: 'sólido',
    nfpa: { health: 0, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado (Extracto vegetal natural de líquenes)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción de transporte',
    ppe: ['Gafas de montura universal', 'Guantes estándar'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco',
      incompatibles: ['Agentes blanqueadores (hipoclorito, dióxido de azufre)'],
      conditions: 'Cajas herméticas para evitar humedad sobre las tiras de papel.'
    },
    contexto: {
      general: 'El indicador colorimétrico más antiguo de la historia de la química: **Rojo intenso en medio ácido (pH < 4.5)** y **Azul violáceo en medio alcalino (pH > 8.3)**, extraído tradicionalmente de líquenes como *Roccella tinctoria*.'
    }
  },
  {
    id: 'NaranjaMetilo',
    nombre: 'Naranja de Metilo',
    formula: 'C₁₄H₁₄N₃NaO₃S',
    categoria: 'indicadores',
    molarMass: 327.33,
    state: 'sólido',
    nfpa: { health: 2, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 6.1: Materias Tóxicas (Tóxico por ingestión)',
    unNumber: 'UN 3143',
    kemlerCode: '60 (Materia tóxica)',
    adrTunnelCode: '(E)',
    tunnelDescription: 'Prohibido en túneles E',
    ppe: ['Gafas de seguridad estancas', 'Guantes de nitrilo', 'Bata', 'Mascarilla antipolvo P2'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Estándar',
      incompatibles: ['Oxidantes fuertes'],
      conditions: 'Armario de productos químicos catalogados con cierre.'
    },
    contexto: {
      general: 'Colorante azoico utilizado en valoraciones de ácidos fuertes con bases débiles; su zona de viraje es nítida: **Rojo a pH < 3.1** y **Amarillo anaranjado a pH > 4.4**.'
    }
  },
  {
    id: 'Fenolftaleina',
    nombre: 'Fenolftaleína',
    formula: 'C₂₀H₁₄O₄',
    categoria: 'indicadores',
    molarMass: 318.32,
    state: 'sólido',
    nfpa: { health: 2, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado en baja concentración en disolución alcohólica (<1%), sólido clasificado como Carc. Cat 1B',
    unNumber: 'UN 1987 (si disuelto en etanol >24%) / No reg.',
    kemlerCode: '33 / N/A',
    adrTunnelCode: '(D/E) si solución alcohólica inflamable',
    tunnelDescription: 'Restricción en D/E por inflamabilidad del vehículo disolvente',
    ppe: ['Gafas de seguridad', 'Guantes de nitrilo', 'Evitar inhalación del polvo'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Lugar fresco protegido de la luz',
      incompatibles: ['Oxidantes fuertes', 'Álcalis muy concentrados (a pH > 12 se vuelve incolora por reordenamiento carbinólico)'],
      conditions: 'Frasco de vidrio bien cerrado.'
    },
    contexto: {
      general: 'El indicador más representativo de neutralizaciones ácido-base: **Incoloro en medios ácidos y neutros (pH < 8.2)** y **Rosa fucsia brillante en medios básicos (pH 8.2 - 10.0)**.'
    }
  },
  {
    id: 'AzulTimol',
    nombre: 'Azul de Timol',
    formula: 'C₂₇H₃₀O₅S',
    categoria: 'indicadores',
    molarMass: 466.60,
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
      ventilation: 'Seco',
      incompatibles: ['Oxidantes fuertes'],
      conditions: 'Envase opaco cerrado.'
    },
    contexto: {
      general: 'Indicador sulfonaftaleína con dos rangos útiles: primer viraje ácido de **Rojo a Amarillo (pH 1.2 - 2.8)** y segundo viraje alcalino de **Amarillo a Azul oscuro (pH 8.0 - 9.6)**.'
    }
  },
  {
    id: 'IndicadorUniversal',
    nombre: 'Indicador Universal',
    formula: 'Mezcla multi-indicador',
    categoria: 'indicadores',
    molarMass: 0,
    state: 'líquido',
    nfpa: { health: 1, flammability: 2, instability: 0, special: 'NONE' },
    hazardClass: 'Clase 3 si contiene disolvente etanólico inflamable (UN 1170)',
    unNumber: 'UN 1170',
    kemlerCode: '33 (Líquido muy inflamable)',
    adrTunnelCode: '(D/E)',
    tunnelDescription: 'Prohibido en túneles D y E en cisternas',
    ppe: ['Gafas de seguridad', 'Guantes de nitrilo'],
    storage: {
      temperature: '15 °C - 25 °C',
      ventilation: 'Zona alejada de chispas o llamas',
      incompatibles: ['Oxidantes fuertes'],
      conditions: 'Frasco ámbar dosificador con tapón cuentagotas hermético.'
    },
    contexto: {
      general: 'Solución combinada calibrada (rojo de metilo, fenolftaleína, azul de bromotimol y azul de timol) que genera un espectro continuo de color según el pH: Rojo (pH 1-3), Naranja (pH 4-5), Amarillo (pH 6), Verde (pH 7 neutro), Azul (pH 8-9) y Púrpura (pH 10-14).'
    }
  },
  {
    id: 'JabonLiquido',
    nombre: 'Jabón Líquido',
    formula: 'C₁₂H₂₅SO₄Na',
    categoria: 'indicadores',
    molarMass: 288.38,
    state: 'líquido',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado (Tensioactivo aniónico - Lauril sulfato de sodio acuoso)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas de seguridad contra salpicaduras oculares', 'Guantes estándar'],
    storage: {
      temperature: '10 °C - 30 °C',
      ventilation: 'Normal',
      incompatibles: ['Ácidos fuertes (lo hidrolizan)', 'Sales insolubles de calcio y magnesio (precipitan espuma en aguas duras)'],
      conditions: 'Envases dosificadores de polipropileno.'
    },
    contexto: {
      general: 'Tensioactivo micelar anfipático con pH neutro o ligeramente alcalino (6.5 - 7.5); en ensayos de laboratorio actúa reduciendo la tensión superficial y como detector cualitativo de dureza cálcica y magnésica en aguas.'
    }
  },

  // ==========================================
  // COMPUESTOS ORGÁNICOS (8)
  // ==========================================
  {
    id: 'Azucar',
    nombre: 'Azúcar (Sacarosa)',
    formula: 'Cₓ(H₂O)ᵧ — C₁₂H₂₂O₁₁',
    categoria: 'organicos',
    molarMass: 342.30,
    state: 'sólido',
    nfpa: { health: 0, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado (Riesgo de explosión de polvo combustible si suspensión fina en aire)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Gafas de seguridad', 'Guantes comunes'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Seco y libre de plagas',
      incompatibles: ['Ácido sulfúrico concentrado (deshidratación violenta exotérmica dejando columna de carbón esponjoso)', 'Oxidantes fuertes (clorato potásico, percloratos)'],
      conditions: 'Sacos sellados aislados de la humedad.'
    },
    contexto: {
      general: 'Disacárido formado por glucosa y fructosa; ante ácidos concentrados deshidratantes como $H_2SO_4$, se descompone violentamente: $C_{12}H_{22}O_{11} \\rightarrow 12C + 11H_2O$ con copiosa emisión de vapor y carbón elemental.'
    }
  },
  {
    id: 'Almendra',
    nombre: 'Almendra',
    formula: 'C₁₈H₃₂O₂ + C₁₂(H₂O)₁₁',
    categoria: 'organicos',
    molarMass: 280.0,
    state: 'sólido',
    nfpa: { health: 0, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado (Materia alimentaria orgánica oleaginosa rica en ácido linoleico y glucósidos)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Libre circulación',
    ppe: ['Guantes de higiene alimentaria'],
    storage: {
      temperature: '< 15 °C',
      ventilation: 'Seco, atmósfera controlada para evitar enranciamiento de lípidos',
      incompatibles: ['Oxidantes fuertes', 'Ácidos concentrados'],
      conditions: 'Envases estancos al vacío o purgados con nitrógeno.'
    },
    contexto: {
      general: 'Matriz compleja rica en triglicéridos insaturados, proteínas de reserva y trazas de amigdalina (glucósido cianogénico en almendras amargas); susceptible a combustión y extracción de aceites esenciales.'
    }
  },
  {
    id: 'Leche',
    nombre: 'Leche',
    formula: 'C₃H₅(OCOR)₃ + R-CH(NH₂)-COOH',
    categoria: 'organicos',
    molarMass: 0,
    state: 'líquido',
    nfpa: { health: 0, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado (Emulsión de lípidos en solución coloidal de caseína y lactosa)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción',
    ppe: ['Guantes higiénicos de nitrilo'],
    storage: {
      temperature: '2 °C - 4 °C (refrigeración estricta)',
      ventilation: 'Ambiente limpio e higiénico',
      incompatibles: ['Ácidos (provocan desestabilización coloidal y cuajado instantáneo de la caseína al alcanzar su punto isoeléctrico pH 4.6)'],
      conditions: 'Tanques isotérmicos de acero inoxidable alimentario 316.'
    },
    contexto: {
      general: 'Emulsión biológica trifásica (grasa globular, micelas proteicas de fosfocaseína y fase acuosa con sales de calcio y lactosa); se desnaturaliza por acidificación liberando el suero proteico.'
    }
  },
  {
    id: 'Cereza',
    nombre: 'Cereza',
    formula: '(C₆H₁₀O₅)ₙ + C₁₂(H₂O)₁₁',
    categoria: 'organicos',
    molarMass: 0,
    state: 'sólido',
    nfpa: { health: 0, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado (Fruta fresca rica en pectina, azúcares y antocianinas)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción',
    ppe: ['Guantes de manipulación limpia'],
    storage: {
      temperature: '0 °C - 2 °C',
      ventilation: 'Cámaras frigoríficas de humedad alta controlada',
      incompatibles: ['Ácidos o bases concentradas'],
      conditions: 'Cajas ventiladas.'
    },
    contexto: {
      general: 'Rica en antocianinas que actúan como indicadores naturales de pH (rojo vivo en medio ácido, azul-violáceo en medio alcalino) y ácido málico.'
    }
  },
  {
    id: 'Chocolate',
    nombre: 'Chocolate',
    formula: 'C₁₈H₃₂O₂ + Cₓ(H₂O)ᵧ',
    categoria: 'organicos',
    molarMass: 0,
    state: 'sólido',
    nfpa: { health: 0, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado (Suspensión de manteca de cacao, teobromina, carbohidratos y sólidos de cacao)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción',
    ppe: ['Guantes higiénicos'],
    storage: {
      temperature: '14 °C - 18 °C',
      ventilation: 'Humedad relativa < 50% para evitar fatiga de floración grasa o azúcar (bloom)',
      incompatibles: ['Oxidantes fuertes', 'Ácidos concentrados'],
      conditions: 'Lugar fresco, oscuro y desodorizado.'
    },
    contexto: {
      general: 'Sistema coloidal de polimorfismo cristalino complejo (fase $\\beta_V$ ideal a 34 °C de punto de fusión); contiene el alcaloide teobromina ($C_7H_8N_4O_2$).'
    }
  },
  {
    id: 'Salmon',
    nombre: 'Salmón',
    formula: 'R-CH(NH₂)-COOH (Proteína)',
    categoria: 'organicos',
    molarMass: 0,
    state: 'sólido',
    nfpa: { health: 0, flammability: 0, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado (Tejido muscular proteico animal rico en ácidos grasos omega-3 y astaxantina)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción',
    ppe: ['Guantes de nitrilo higiénicos'],
    storage: {
      temperature: '-18 °C (congelado) o 0 °C (fresco con hielo en escamas)',
      ventilation: 'Cadena de frío continua certificada',
      incompatibles: ['Ácidos fuertes (desnaturalizan las cadenas de mioglobina)', 'Bases cáusticas'],
      conditions: 'Cajas isotérmicas de poliestireno expandido.'
    },
    contexto: {
      general: 'Estructura proteica rica en enlaces peptídicos $-\\text{CO}-\\text{NH}-$, colágeno y pigmento carotenoide antioxidante astaxantina.'
    }
  },
  {
    id: 'Madera',
    nombre: 'Madera',
    formula: '(C₆H₁₀O₅)ₙ — Celulosa',
    categoria: 'organicos',
    molarMass: 162.14, // Monómero glucano
    state: 'sólido',
    nfpa: { health: 0, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado (Sólido combustible natural celulósico con lignina)',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción',
    ppe: ['Guantes de trabajo mecánico', 'Gafas protectoras si hay serrín'],
    storage: {
      temperature: 'Ambiente',
      ventilation: 'Zona aireada protegida de la lluvia para evitar pudrición fúngica',
      incompatibles: ['Ácidos fuertes minerales (hidrólisis y carbonización)', 'Fuentes de ignición', 'Oxidantes'],
      conditions: 'Apilamiento ventilado sobre listones.'
    },
    contexto: {
      general: 'Biopolímero compuesto de microfibrillas de celulosa (40-50%), hemicelulosa (25-35%) y red aromática de lignina (20-30%); reacciona con ácidos concentrados deshidratándose a carbón amorfo.'
    }
  },
  {
    id: 'Papel',
    nombre: 'Papel',
    formula: '(C₆H₁₀O₅)ₙ — Celulosa',
    categoria: 'organicos',
    molarMass: 162.14,
    state: 'sólido',
    nfpa: { health: 0, flammability: 1, instability: 0, special: 'NONE' },
    hazardClass: 'No regulado',
    unNumber: 'No regulado',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    tunnelDescription: 'Sin restricción',
    ppe: ['Guantes convencionales'],
    storage: {
      temperature: 'Ambiente seco',
      ventilation: 'Seco y alejado de fuentes de llama',
      incompatibles: ['Ácido nítrico concentrado (forma nitrocelulosa combustible)', 'Ácido sulfúrico'],
      conditions: 'Bobinas o palets en naves cubiertas con rociadores automáticos.'
    },
    contexto: {
      general: 'Lámina delgada de fibras entrelazadas de celulosa purificada mediante procesos Kraft o al sulfito; sufre carbonización inmediata ante ácidos deshidratantes concentrados.'
    }
  }
];
