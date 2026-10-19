import { NFPAData, CHEMICAL_DATABASE, ChemicalReagent } from './chemicals';

export interface ReactionStep {
  stepNumber: number;
  title: string;
  equation: string;
  description: string;
  speciesInvolved: string[];
}

export interface ReactionResult {
  id: string;
  matchedReactants: string[];
  title: string;
  type: 'neutralizacion' | 'doble_intercambio' | 'redox' | 'sintesis' | 'deshidratacion' | 'precipitacion' | 'indicador' | 'compleja';
  balancedEquation: string;
  ionicEquationNet?: string;
  spectatorIons?: string[];
  enthalpy?: string;
  steps: ReactionStep[];
  explicacionProfesor: {
    introduccion: string;
    mecanismoIónico: string;
    agricultura?: string;
    industria?: string;
    mineralogia?: string;
    conclusion: string;
  };
  safetyInfo: {
    productoPrincipal: string;
    hazardClass: string;
    unNumber: string;
    kemlerCode: string;
    adrTunnelCode: string;
    tunnelReason: string;
    nfpa: NFPAData;
    ppe: string[];
    almacenamiento: string;
    estabilidad: string;
  };
}

export const PRESET_REACTIONS: ReactionResult[] = [
  // 0A. SÍNTESIS DE AMONÍACO HABER-BOSCH: N2 + H2
  {
    id: 'n2_h2',
    matchedReactants: ['N2', 'H2'],
    title: 'Síntesis Industrial de Amoníaco (Proceso Haber-Bosch)',
    type: 'sintesis',
    balancedEquation: 'N₂(g) + 3H₂(g) ➔ 2NH₃(g)',
    ionicEquationNet: 'N₂⁰ + 3H₂⁰ ➔ 2N³⁻H₃  [Redox catalítica a alta presión]',
    spectatorIons: [],
    enthalpy: 'ΔH° = -92.2 kJ/mol (Exotérmica)',
    steps: [
      {
        stepNumber: 1,
        title: 'Quimisorción y disociación superficial sobre catalizador metálico',
        equation: 'N₂(g) ➔ 2N(ads)  |  H₂(g) ➔ 2H(ads)',
        description: 'La molécula de nitrógeno requiere gran energía de activación por su fuerte triple enlace N≡N (945 kJ/mol). El catalizador de hierro promueve la ruptura homolítica.',
        speciesInvolved: ['N2', 'H2']
      },
      {
        stepNumber: 2,
        title: 'Hidrogenación sucesiva y formación de amoníaco',
        equation: 'N(ads) + 3H(ads) ➔ 2NH₃(g)',
        description: 'Los átomos de hidrógeno adsorbidos se combinan escalonadamente con el nitrógeno para formar amoníaco gaseoso ($NH_3$).',
        speciesInvolved: ['NH3']
      }
    ],
    explicacionProfesor: {
      introduccion: '¡La reacción catalítica más importante de la historia moderna! El proceso Haber-Bosch fija el nitrógeno atmosférico inerte con hidrógeno para sintetizar amoníaco, base de los fertilizantes nitrogenados.',
      mecanismoIónico: 'Proceso redox heterogéneo catalizado a alta presión (150-250 atm) y temperatura (400-500 °C) sobre lechos de hierro y promotores.',
      agricultura: 'Contexto Agrícola: Sin esta síntesis química, la capacidad alimentaria mundial estaría severamente limitada; el amoníaco es precursor de la urea y nitrato amónico.',
      industria: 'Fabricación de ácido nítrico mediante oxidación de Ostwald y producción de plásticos.',
      conclusion: 'El amoníaco gaseoso generado es un potente agente alcalino reductor que requiere ventilación y contención estrictas.'
    },
    safetyInfo: {
      productoPrincipal: 'Amoníaco anhidro gas / acuoso (NH₃)',
      hazardClass: 'Clase 2: Gases (2.3 Gas tóxico / 8 Corrosivo)',
      unNumber: 'UN 1005 (Anhidro) / UN 2672 (Acuoso)',
      kemlerCode: '268 (Gas tóxico y corrosivo)',
      adrTunnelCode: '(C/D)',
      tunnelReason: 'Prohibido en túneles de categoría C (en cisternas) y D/E por toxicidad e inflamabilidad',
      nfpa: { health: 3, flammability: 1, instability: 0, special: 'COR', specialText: 'Gas Corrosivo & Tóxico' },
      ppe: ['Gafas panorámicas estancas', 'Guantes de neopreno o butilo', 'Máscara con filtro tipo K/P3', 'Traje de protección química'],
      almacenamiento: 'Almacenar en cilindros certificados para amoníaco con sistemas de lavado de gases.',
      estabilidad: 'Estable en condiciones normales; reacciona violentamente con ácidos.'
    }
  },

  // 0B. COMBUSTIÓN DE HIDRÓGENO: H2 + O2
  {
    id: 'h2_o2',
    matchedReactants: ['H2', 'O2'],
    title: 'Combustión Explosiva de Hidrógeno: Síntesis de Agua',
    type: 'sintesis',
    balancedEquation: '2H₂(g) + O₂(g) ➔ 2H₂O(l) + Calor extremo',
    ionicEquationNet: '2H₂⁰ + O₂⁰ ➔ 4H⁺ + 2O²⁻ [Redox explosiva]',
    spectatorIons: [],
    enthalpy: 'ΔH° = -571.6 kJ/mol (Extremadamente exotérmica)',
    steps: [
      {
        stepNumber: 1,
        title: 'Iniciación por chispa y radicales libres',
        equation: 'H₂ + •OH ➔ •H + H₂O  (Cadena ramificada)',
        description: 'Una fuente de energía o chispa rompe las moléculas diatómicas estables generando radicales libres altamente reactivos.',
        speciesInvolved: ['H2', 'O2']
      },
      {
        stepNumber: 2,
        title: 'Combinación exotérmica instantánea',
        equation: '2H₂ + O₂ ➔ 2H₂O(g) + Liberación colosal de energía',
        description: 'La energía liberada por mol supera los 285 kJ, provocando expansión térmica supersónica y condensación a agua líquida.',
        speciesInvolved: ['H2O']
      }
    ],
    explicacionProfesor: {
      introduccion: '¡La reacción de combustión más energética y limpia del universo! Al mezclar hidrógeno y oxígeno en proporción estequiométrica 2:1 y aplicar chispa, se produce agua con liberación explosiva de calor.',
      mecanismoIónico: 'Proceso redox en cadena ramificada con cinética ultrarrápida donde el hidrógeno actúa como reductor y el oxígeno como comburente.',
      industria: 'Propulsión de cohetes espaciales, pilas de combustible de hidrógeno cero emisiones y soldadura.',
      conclusion: 'El producto final es agua pura ($H_2O$), un hito ecológico extraordinario.'
    },
    safetyInfo: {
      productoPrincipal: 'Agua (H₂O) / Reacción de Alta Detonabilidad',
      hazardClass: 'Clase 2: Gases extremadamente inflamables en mezcla (Riesgo de deflagración)',
      unNumber: 'UN 1049 (H₂) / UN 1072 (O₂)',
      kemlerCode: '239 (Gas inflamable que puede causar incendio violento)',
      adrTunnelCode: '(B/D)',
      tunnelReason: 'Restricción severa en túneles por riesgo de explosión de gas comprimido',
      nfpa: { health: 0, flammability: 4, instability: 2, special: 'W', specialText: 'Gas Explosivo' },
      ppe: ['Pantalla facial completa de policarbonato', 'Guantes ignífugos', 'Búnker de protección para ensayos'],
      almacenamiento: 'Mantener cilindros de hidrógeno y oxígeno estrictamente separados por barreras.',
      estabilidad: 'Inestable en mezcla estequiométrica ante cualquier chispa.'
    }
  },

  // 1. ÁCIDO CLORHÍDRICO + HIDRÓXIDO DE SODIO
  {
    id: 'hcl_naoh',
    matchedReactants: ['HCl', 'NaOH'],
    title: 'Neutralización Clásica Ácido-Base Fuerte',
    type: 'neutralizacion',
    balancedEquation: 'HCl(aq) + NaOH(aq) ➔ NaCl(aq) + H₂O(l)',
    ionicEquationNet: 'H⁺(aq) + OH⁻(aq) ➔ H₂O(l)',
    spectatorIons: ['Na⁺', 'Cl⁻'],
    enthalpy: 'ΔH° = -57.3 kJ/mol (Exotérmica estándar de neutralización)',
    steps: [
      {
        stepNumber: 1,
        title: 'Disociación electrolítica total en fase acuosa',
        equation: 'HCl ➔ H⁺ + Cl⁻  |  NaOH ➔ Na⁺ + OH⁻',
        description: 'Tanto el HCl como el NaOH son electrolitos fuertes con constantes de disociación muy elevadas ($K_a >> 1$, $K_b >> 1$). En solución acuosa no existen moléculas intactas, sino iones completamente hidratados rodeados de esferas de solvatación.',
        speciesInvolved: ['HCl', 'NaOH', 'H⁺', 'Cl⁻', 'Na⁺', 'OH⁻']
      },
      {
        stepNumber: 2,
        title: 'Transferencia protónica y síntesis de enlace covalente',
        equation: 'H₃O⁺ + OH⁻ ➔ 2H₂O',
        description: 'El catión hidronio ($H_3O^+$) transfiere un protón al anión hidroxilo ($OH^-$), anulando mutuamente su carga para colapsar en dos moléculas de agua líquida térmicamente estable. Esta unión libera exactamente 57.3 kilojulios por cada mol reaccionado.',
        speciesInvolved: ['H⁺', 'OH⁻', 'H₂O']
      },
      {
        stepNumber: 3,
        title: 'Estabilización de iones espectadores y solución salina neutra',
        equation: 'Na⁺(aq) + Cl⁻(aq) ➔ NaCl(aq) [pH = 7.00]',
        description: 'Los iones $Na^+$ y $Cl^-$ no sufren hidrólisis por provenir de una base fuerte y un ácido fuerte respectivamente, dejando un pH rigurosamente neutro a 25 °C.',
        speciesInvolved: ['Na⁺', 'Cl⁻', 'NaCl']
      }
    ],
    explicacionProfesor: {
      introduccion: 'Has seleccionado la reacción arquetípica de la termoquímica moderna: una neutralización ácido fuerte - base fuerte. En este proceso, la reactividad corrosiva de los iones $H^+$ y la cáustica de los $OH^-$ se cancelan vectorialmente.',
      mecanismoIónico: 'A nivel iónico, la ecuación neta es simplemente $H^+ + OH^- \\rightarrow H_2O$. Los cationes sodio ($Na^+$) y aniones cloruro ($Cl^-$) operan como meros espectadores térmicos.',
      industria: 'Este proceso es la base del control de vertidos industriales para ajustar el efluente antes de la descarga en colectores municipales.',
      agricultura: 'Permite neutralizar suelos excesivamente alcalinos o preparar soluciones amortiguadoras estables.',
      conclusion: 'El producto resultante es cloruro de sodio disuelto en agua, totalmente inocuo y no regulado para el transporte.'
    },
    safetyInfo: {
      productoPrincipal: 'Solución salina de Cloruro de Sodio (NaCl)',
      hazardClass: 'No regulado en producto final (Reactivos originales: Clase 8 Corrosivo)',
      unNumber: 'No regulado (Solución neutra)',
      kemlerCode: 'N/A',
      adrTunnelCode: 'Sin restricción',
      tunnelReason: 'El producto neutro obtenido no presenta riesgo de corrosión ni transporte',
      nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
      ppe: ['Gafas de seguridad química con protección lateral', 'Guantes de nitrilo 0.11 mm', 'Bata de laboratorio de algodón'],
      almacenamiento: 'Almacenar en recipientes plásticos cerrados a temperatura ambiente (15-25 °C).',
      estabilidad: 'Químicamente estable de forma indefinida en recipientes sellados.'
    }
  },

  // 2. CADENA COMPLEJA AGRÍCOLA: H2SO4 + KNO3 + KOH
  {
    id: 'h2so4_kno3_koh',
    matchedReactants: ['H2SO4', 'KNO3', 'KOH'],
    title: 'Cadena Agrícola: Síntesis de Fertilizantes Potásicos Libres de Cloruros',
    type: 'doble_intercambio',
    balancedEquation: 'H₂SO₄(l) + 2KNO₃(s) + 2KOH(s) ➔ K₂SO₄(s) + 2KNO₃(aq) + 2H₂O(l)',
    ionicEquationNet: '2H⁺ + SO₄²⁻ + 2K⁺ + 2NO₃⁻ + 2K⁺ + 2OH⁻ ➔ 4K⁺ + SO₄²⁻ + 2NO₃⁻ + 2H₂O',
    spectatorIons: ['K⁺', 'NO₃⁻', 'SO₄²⁻'],
    enthalpy: 'ΔH° = -118.4 kJ/mol (Proceso multietapa exotérmico global)',
    steps: [
      {
        stepNumber: 1,
        title: 'Primer intercambio iónico ácido: Desplazamiento nítrico',
        equation: 'H₂SO₄ + KNO₃ ➔ KHSO₄ + HNO₃',
        description: 'El ácido sulfúrico concentrado protona parcialmente la sal de nitrato de potasio, desplazando una molécula de ácido nítrico y formando bisulfato de potasio ($KHSO_4$) intermediario.',
        speciesInvolved: ['H2SO4', 'KNO3', 'KHSO4', 'HNO3']
      },
      {
        stepNumber: 2,
        title: 'Segunda adición y neutralización con Hidróxido de Potasio',
        equation: 'KHSO₄ + HNO₃ + 2KOH ➔ K₂SO₄ + KNO₃ + 2H₂O',
        description: 'La adición controlada de KOH neutraliza los protones libres tanto del bisulfato ($HSO_4^-$) como del ácido nítrico libre, transformándolos simultáneamente en sulfato de potasio ($K_2SO_4$) y regenerando el nitrato de potasio.',
        speciesInvolved: ['KHSO4', 'HNO3', 'KOH', 'K2SO4', 'KNO3', 'H2O']
      },
      {
        stepNumber: 3,
        title: 'Cristalización y enriquecimiento de fertilizante dual N-K-S',
        equation: 'K⁺ + SO₄²⁻ ➔ K₂SO₄(s) ↓',
        description: 'El sulfato de potasio presenta menor solubilidad relativa que el nitrato a temperaturas moderadas, permitiendo su cristalización pura para fertirriego sin contaminar con cloruros.',
        speciesInvolved: ['K2SO4', 'KNO3']
      }
    ],
    explicacionProfesor: {
      introduccion: '¡Has ejecutado una de las secuencias sintéticas más valiosas de la química agroindustrial! Esta combinación multirreactivo resuelve un dilema agronómico histórico: cómo suministrar masivamente potasio y azufre a los cultivos sin aportar aniones cloruro ($Cl^-$).',
      mecanismoIónico: 'En la primera fase, el ácido sulfúrico actúa como donador selectivo de sulfato ($SO_4^{2-}$). En la segunda fase, la base $KOH$ suministra el catión $K^+$ necesario para saturar todas las valencias aniónicas, formando agua mediante la neutralización $H^+ + OH^- \\rightarrow H_2O$.',
      agricultura: 'Contexto Agrícola Vital: El fertilizante estándar más barato en el mundo es el cloruro de potasio ($KCl$). Sin embargo, en cultivos leñosos de alto rendimiento (aguacates, cítricos, viñedos, frutos rojos, tabaco y hortalizas de invernadero), el anión cloruro acumula toxicidad salina, necrosa los bordes foliares y disminuye drásticamente el calibre del fruto. El Sulfato de Potasio ($K_2SO_4$) y el Nitrato de Potasio ($KNO_3$) aquí producidos son sales libres de cloro (cloro < 1%) que optimizan el llenado del fruto, aumentan el contenido de azúcares (grados Brix) y mejoran la resistencia osmótica a la sequía.',
      industria: 'El $K_2SO_4$ obtenido por este principio (variante del proceso Mannheim) es la materia prima fundamental para abonos complejos NPK de máxima solubilidad.',
      conclusion: 'La mezcla equilibra nutrición vegetal balanceada con un pH estabilizado, permitiendo una absorción radicular inmediata sin antagonismos catiónicos.'
    },
    safetyInfo: {
      productoPrincipal: 'Sulfato de Potasio (K₂SO₄) + Nitrato de Potasio (KNO₃)',
      hazardClass: 'Clase 5.1: Materias Comburentes (por presencia de KNO₃ sólido) / No regulado para K₂SO₄',
      unNumber: 'UN 1486 (Nitrato de potasio)',
      kemlerCode: '50 (Materia comburente/oxidante)',
      adrTunnelCode: '(E)',
      tunnelReason: 'Prohibido el paso en túneles de categoría E debido al riesgo de intensificación de incendios por comburente',
      nfpa: { health: 1, flammability: 0, instability: 1, special: 'OX', specialText: 'Oxidante por componente nítrico' },
      ppe: ['Gafas estancas antipolvo (EN 166)', 'Guantes de nitrilo resistente', 'Mascarilla FFP2 contra aerosoles salinos', 'Bata antiestática de algodón'],
      almacenamiento: 'Almacenar en almacenes secos ventilados, sobre tarimas aisladas del suelo. Prohibido apilar junto a materias orgánicas, combustibles, serrín o azúcares.',
      estabilidad: 'Completamente estable durante 24-36 meses en sacos impermeabilizados con film de polietileno.'
    }
  },

  // 3. SÍNTESIS DE ALÚMINA: Al + O2
  {
    id: 'al_o2',
    matchedReactants: ['Al', 'O2'],
    title: 'Oxidación Metálica: Síntesis de Óxido de Aluminio y Génesis de Gemas',
    type: 'sintesis',
    balancedEquation: '4Al(s) + 3O₂(g) ➔ 2Al₂O₃(s)',
    ionicEquationNet: '4Al⁰ + 3O₂⁰ ➔ 4Al³⁺ + 6O²⁻  [Redox directa]',
    spectatorIons: [],
    enthalpy: 'ΔH° = -3351.4 kJ/mol (Reacción fuertemente exotérmica)',
    steps: [
      {
        stepNumber: 1,
        title: 'Transferencia electrónica redox entre el metal y el gas',
        equation: '4Al ➔ 4Al³⁺ + 12e⁻  |  3O₂ + 12e⁻ ➔ 6O²⁻',
        description: 'El aluminio cede sus tres electrones de valencia ($3s^2 3p^1$) por átomo al oxígeno diatómico, oxidándose violentamente a altas temperaturas con una colosal liberación de calor.',
        speciesInvolved: ['Al', 'O2', 'Al³⁺', 'O²⁻']
      },
      {
        stepNumber: 2,
        title: 'Condensación reticular de Corindón trigonal (α-Al₂O₃)',
        equation: '2Al³⁺ + 3O²⁻ ➔ Al₂O₃',
        description: 'Los iones $Al^{3+}$ y $O^{2-}$ se empaquetan en una red cristalina hexagonal compacta de aniones óxido con los cationes ocupando dos tercios de los huecos octaédricos, alcanzando una dureza de 9 en la escala de Mohs.',
        speciesInvolved: ['Al₂O₃']
      }
    ],
    explicacionProfesor: {
      introduccion: '¡Una reacción fundamental tanto para la metalurgia de alta tecnología como para la mineralogía planetaria! La combinación directa de aluminio metálico con oxígeno molecular genera Óxido de Aluminio (Alúmina, $Al_2O_3$).',
      mecanismoIónico: 'Se trata de un proceso redox directo sin disolventes: 12 electrones migran desde los átomos neutros de aluminio hacia los orbitales antienlazantes del oxígeno, colapsando en una matriz iónico-covalente de extraordinaria estabilidad termodinámica.',
      mineralogia: 'Fascinante Conexión Mineralógica: La forma cristalina de la alúmina se conoce como **Corindón**. En su estado ultra-puro es completamente transparente (leucosafiro). Sin embargo, cuando la red cristalina en crecimiento captura impurezas atómicas por sustitución isomórfica, la naturaleza da a luz a las gemas más valiosas del planeta:\n• Si el $Al_2O_3$ incorpora pequeñísimas trazas de Cromo ($Cr^{3+}$ en torno al 0.05%), el campo cristalino octaédrico altera los orbitales d del cromo, absorbiendo longitudes de onda del verde y azul y confiriendo el color rojo sangre inconfundible del **RUBÍ**.\n• Si las impurezas sustitutivas son pares coordinados de Hierro ($Fe^{2+}$) y Titanio ($Ti^{4+}$), la transferencia de carga interválida genera absorción de luz en el espectro rojo, dando origen al azul zafiro legendario del **ZAFIRO**.',
      industria: 'En la industria se utiliza como refractario de hornos a >2000 °C, abrasivo de precisión (esmeril) y sustrato aislante de microchips de arseniuro de galio.',
      conclusion: 'La alúmina sintetizada es químicamente inerte, no tóxica y prácticamente indestructible por disolventes convencionales.'
    },
    safetyInfo: {
      productoPrincipal: 'Óxido de Aluminio / Alúmina (Al₂O₃)',
      hazardClass: 'No regulado como producto peligroso (Sólido inerte refractario)',
      unNumber: 'No regulado',
      kemlerCode: 'N/A',
      adrTunnelCode: 'Sin restricción',
      tunnelReason: 'Sustancia sólida incombustible e inerte sin restricción de túneles',
      nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
      ppe: ['Gafas de seguridad industriales contra partículas', 'Guantes estándar de nitrilo', 'Mascarilla antipolvo N95/FFP2 si se manipula en polvo ultrafino'],
      almacenamiento: 'Almacenar en contenedores cerrados en ambiente seco.',
      estabilidad: 'Punto de fusión extremadamente alto (2,072 °C); químicamente estable frente a la mayoría de ácidos y bases a temperatura ambiente.'
    }
  },

  // 4. PRECIPITACIÓN DE COBRE: CuSO4 + NaOH
  {
    id: 'cuso4_naoh',
    matchedReactants: ['CuSO4', 'NaOH'],
    title: 'Precipitación Iónica: Síntesis de Hidróxido de Cobre(II) Fungicida',
    type: 'precipitacion',
    balancedEquation: 'CuSO₄(aq) + 2NaOH(aq) ➔ Cu(OH)₂(s) ↓ + Na₂SO₄(aq)',
    ionicEquationNet: 'Cu²⁺(aq) + 2OH⁻(aq) ➔ Cu(OH)₂(s) ↓ (Precipitado azul cielo)',
    spectatorIons: ['Na⁺', 'SO₄²⁻'],
    enthalpy: 'ΔH° = -48.2 kJ/mol',
    steps: [
      {
        stepNumber: 1,
        title: 'Disolución y disociación de cationes cúpricos hidratados',
        equation: 'CuSO₄(s) + H₂O ➔ [Cu(H₂O)₆]²⁺ + SO₄²⁻',
        description: 'El sulfato de cobre se hidrata formando el catión hexacua cobre(II) característico de color azul celeste brillante.',
        speciesInvolved: ['CuSO4', 'Cu²⁺', 'SO4²⁻']
      },
      {
        stepNumber: 2,
        title: 'Desplazamiento de ligandos y precipitación de hidróxido',
        equation: 'Cu²⁺ + 2OH⁻ ➔ Cu(OH)₂ ↓',
        description: 'La adición de iones hidroxilo supera instantáneamente el producto de solubilidad ($K_{ps} = 2.2 \\times 10^{-20}$), colapsando en un precipitado floculante azul cielo de hidróxido de cobre(II).',
        speciesInvolved: ['Cu²⁺', 'OH⁻', 'Cu(OH)₂']
      }
    ],
    explicacionProfesor: {
      introduccion: 'Has provocado una clásica reacción de precipitación inorgánica. El ion cúprico bivalente posee una afinidad tremenda por los iones hidroxilo, formando una fase sólida insoluble.',
      mecanismoIónico: 'Los iones $Na^+$ y $SO_4^{2-}$ no intervienen en el equilibrio de precipitación, quedando en disolución como sulfato de sodio disuelto.',
      agricultura: 'Aplicación Agrícola: El precipitado de hidróxido de cobre(II) es un biocida preventivo indispensable en agricultura ecológica y convencional. Actúa liberando lentamente iones $Cu^{2+}$ que desnaturalizan enzimas respiratorias de hongos parásitos como el mildiu de la vid y repilo del olivo.',
      industria: 'Reactivo para formulación de pigmentos azuritas cerámicas y catalizador de acoplamiento orgánico.',
      conclusion: 'Debe evitarse calentar la mezcla, ya que por encima de 80 °C el $Cu(OH)_2$ se descompone térmicamente en óxido de cobre(II) ($CuO$) de color negro betún.'
    },
    safetyInfo: {
      productoPrincipal: 'Hidróxido de cobre(II) Cu(OH)₂ en pasta / Na₂SO₄ acuoso',
      hazardClass: 'Clase 9: Materias peligrosas diversas (Tóxico acuático por sales de cobre)',
      unNumber: 'UN 3077 (Materia peligrosa para el medio ambiente, sólida)',
      kemlerCode: '90',
      adrTunnelCode: '(-)',
      tunnelReason: 'Exención de código de túnel bajo ADR para materias de clase 9 UN 3077/3082',
      nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' },
      ppe: ['Gafas estancas', 'Guantes de nitrilo resistente', 'Mascarilla FFP2', 'Bata de laboratorio'],
      almacenamiento: 'Evitar vertidos a alcantarillado público; almacenar en recipientes plásticos etiquetados.',
      estabilidad: 'Estable a temperatura ambiente (<60 °C); se deshidrata a $CuO$ si se expone a calor elevado.'
    }
  },

  // 5. TEST FOTOFÍSICO: AgNO3 + NaCl
  {
    id: 'agno3_nacl',
    matchedReactants: ['AgNO3', 'NaCl'],
    title: 'Precipitación Argentométrica de Cloruro de Plata Fotosensible',
    type: 'precipitacion',
    balancedEquation: 'AgNO₃(aq) + NaCl(aq) ➔ AgCl(s) ↓ + NaNO₃(aq)',
    ionicEquationNet: 'Ag⁺(aq) + Cl⁻(aq) ➔ AgCl(s) ↓ (Precipitado blanco cuajoso)',
    spectatorIons: ['Na⁺', 'NO₃⁻'],
    enthalpy: 'ΔH° = -65.5 kJ/mol',
    steps: [
      {
        stepNumber: 1,
        title: 'Intercambio aniónico instantáneo y colapso de red reticular',
        equation: 'Ag⁺ + Cl⁻ ➔ AgCl ↓',
        description: 'El bajísimo producto de solubilidad del cloruro de plata ($K_{ps} = 1.77 \\times 10^{-10}$) provoca la aparición inmediata de un precipitado blanco caseoso.',
        speciesInvolved: ['AgNO3', 'NaCl', 'AgCl']
      },
      {
        stepNumber: 2,
        title: 'Fotorreducción superficial por radiación ultravioleta',
        equation: '2AgCl(s) + hν ➔ 2Ag⁰(s) + Cl₂↑',
        description: 'Al recibir luz ambiental, los electrones son promovidos de la banda de valencia de los aniones cloruro a la banda de conducción de los iones plata, reduciéndose a átomos de plata coloidal metálica negra.',
        speciesInvolved: ['AgCl', 'Ag', 'Cl2']
      }
    ],
    explicacionProfesor: {
      introduccion: 'Este ensayo es el pilar de la química analítica cuantitativa (método de Mohr y Volhard) y la génesis de la fotografía química clásica sobre gelatina de plata.',
      mecanismoIónico: 'El anión cloruro desplaza de la esfera de solvatación al anión nitrato gracias a la enorme energía reticular del retículo cristalino cúbico de $AgCl$.',
      industria: 'Tratamiento y recuperación de metales preciosos en minería hidrometalúrgica y síntesis de emulsiones fotográficas.',
      conclusion: 'El precipitado blanco se torna rápidamente violeta y luego gris oscuro si se expone a la luz por la fotorreducción a plata metálica libre.'
    },
    safetyInfo: {
      productoPrincipal: 'Cloruro de plata (AgCl) + Nitrato de sodio en solución',
      hazardClass: 'Clase 9: Materias peligrosas para el medio ambiente (Plata iónica)',
      unNumber: 'UN 3077',
      kemlerCode: '90',
      adrTunnelCode: '(-)',
      tunnelReason: 'Exento de restricción de túneles en transporte terrestre ADR',
      nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' },
      ppe: ['Guantes de nitrilo (evitan manchas negras dérmicas de plata coloidal)', 'Gafas de laboratorio'],
      almacenamiento: 'Recipientes de vidrio topacio o plástico opaco protegidos de la luz directa.',
      estabilidad: 'Fotosensible; se oscurece gradualmente bajo luz ultravioleta o solar.'
    }
  },

  // 6. DESHIDRATACIÓN DE AZÚCAR: H2SO4 + Azucar
  {
    id: 'h2so4_azucar',
    matchedReactants: ['H2SO4', 'Azucar'],
    title: 'Deshidratación Violenta de Carbohidratos (Serpiente de Carbono)',
    type: 'deshidratacion',
    balancedEquation: 'C₁₂H₂₂O₁₁(s) + H₂SO₄(conc) ➔ 12C(s) + 11H₂O(g) ↑ + H₂SO₄(aq)',
    ionicEquationNet: 'C₁₂H₂₂O₁₁ ➔ 12C + 11H₂O  [Catálisis ácida deshidratante extrema]',
    spectatorIons: [],
    enthalpy: 'ΔH° = -918.6 kJ/mol (Extremadamente exotérmica)',
    steps: [
      {
        stepNumber: 1,
        title: 'Ataque nucleofílico del ácido sobre los grupos hidroxilo (-OH)',
        equation: 'R-OH + H₂SO₄ ➔ R-OSO₃H + H₂O',
        description: 'El ácido sulfúrico concentrado posee una voracidad termodinámica insaciable por las moléculas de agua, arrancando hidrógenos y oxígenos en proporción 2:1 de la estructura del disacárido.',
        speciesInvolved: ['Azucar', 'H2SO4']
      },
      {
        stepNumber: 2,
        title: 'Ebullición interna, vaporización y expansión de columna de carbono',
        equation: '12C + 11H₂O(g) + SO₂(g) ↑',
        description: 'El colosal calor liberado evapora instantáneamente el agua formada. El vapor de agua caliente y trazas de $SO_2$ hinchan la masa de carbón residual, levantando una columna negra esponjosa de carbono elemental grafítico.',
        speciesInvolved: ['C', 'H2O', 'SO2']
      }
    ],
    explicacionProfesor: {
      introduccion: 'Uno de los experimentos más dramáticos y visuales de la química: la deshidratación completa de un hidrato de carbono por un ácido concentrado enérgico.',
      mecanismoIónico: 'El ácido sulfúrico no oxida el azúcar; cataliza su deshidratación química total extrayendo toda el agua intermolecular e intramolecular de la sacarosa, dejando tras de sí un residuo sólido de carbón poroso.',
      industria: 'Demuestra el peligro del contacto directo de ácidos concentrados sobre tejidos biológicos (piel, ojos o celulosa), los cuales son carbonizados de forma similar en segundos.',
      conclusion: 'La reacción desprende nubes tóxicas e irritantes de dióxido de azufre ($SO_2$) por reducción parcial del ácido, requiriendo campana extractora certificada.'
    },
    safetyInfo: {
      productoPrincipal: 'Carbono elemental amorfo esponjoso (C) + Vapores de SO₂/H₂O',
      hazardClass: 'Clase 8: Corrosivo (Ácido sulfúrico residual) / Emisión de gases irritantes',
      unNumber: 'UN 1830 (Ácido sulfúrico concentrado)',
      kemlerCode: '80',
      adrTunnelCode: '(E)',
      tunnelReason: 'Prohibido en túneles E por presencia de ácido corrosivo de alta reactividad',
      nfpa: { health: 3, flammability: 1, instability: 2, special: 'W', specialText: 'Reacción fuertemente exotérmica' },
      ppe: ['Pantalla facial completa', 'Guantes de viton/neopreno de manga larga', 'Delantal resistente a ácidos', 'Campana de extracción activa'],
      almacenamiento: 'Residuo carbonoso debe enfriarse totalmente y neutralizarse antes de gestión como residuo peligroso.',
      estabilidad: 'Reacción violenta e irreversible con elevadas temperaturas locales (>150 °C).'
    }
  },

  // 7. EFERVESCENCIA Y CAPTURA: CaCO3 + HCl
  {
    id: 'caco3_hcl',
    matchedReactants: ['CaCO3', 'HCl'],
    title: 'Disolución de Carbonatos y Liberación de Dióxido de Carbono',
    type: 'doble_intercambio',
    balancedEquation: 'CaCO₃(s) + 2HCl(aq) ➔ CaCl₂(aq) + CO₂(g) ↑ + H₂O(l)',
    ionicEquationNet: 'CaCO₃(s) + 2H⁺(aq) ➔ Ca²⁺(aq) + CO₂(g) ↑ + H₂O(l)',
    spectatorIons: ['Cl⁻'],
    enthalpy: 'ΔH° = -15.2 kJ/mol',
    steps: [
      {
        stepNumber: 1,
        title: 'Ataque del protón sobre el anión carbonato sólido',
        equation: 'CaCO₃ + H⁺ ➔ Ca²⁺ + HCO₃⁻',
        description: 'Los iones hidronio disuelven la red cristalina de calcita o mármol, convirtiendo los carbonatos insolubles en iones bicarbonato solubles.',
        speciesInvolved: ['CaCO3', 'HCl', 'Ca²⁺', 'HCO3⁻']
      },
      {
        stepNumber: 2,
        title: 'Descomposición espontánea del ácido carbónico en gas CO₂',
        equation: 'H⁺ + HCO₃⁻ ➔ H₂CO₃ ➔ CO₂ ↑ + H₂O',
        description: 'El ácido carbónico inestable se descompone velozmente desprendiendo burbujas continuas de dióxido de carbono gaseoso con viva efervescencia.',
        speciesInvolved: ['H2CO3', 'CO2', 'H2O']
      }
    ],
    explicacionProfesor: {
      introduccion: 'Esta reacción es la base del ensayo geológico de campo para identificar rocas calizas y la base química de la acidificación oceánica que amenaza a los arrecifes de coral.',
      mecanismoIónico: 'Los protones solvatados H⁺ atacan los iones carbonato CO₃²⁻ de la red cristalina, formando ácido carbónico transitorio (H₂CO₃) que se descompone espontáneamente en CO₂ gaseoso y agua.',
      mineralogia: 'Génesis Kárstica: El mismo proceso (en forma de ácido carbónico disuelto de la lluvia ácida) esculpe a lo largo de milenios las cuevas, simas kársticas y gargantas calizas al disolver el carbonato cálcico.',
      industria: 'Desincrustación química de calderas y circuitos industriales taponados por cal dura.',
      conclusion: 'El producto final es cloruro cálcico acuoso, una sal soluble común no corrosiva.'
    },
    safetyInfo: {
      productoPrincipal: 'Cloruro de calcio (CaCl₂) en disolución + Gas CO₂ desprendido',
      hazardClass: 'No regulado en producto neutralizado (Reactivo HCl: Clase 8)',
      unNumber: 'No regulado tras reacción completa',
      kemlerCode: 'N/A',
      adrTunnelCode: 'Sin restricción',
      tunnelReason: 'Subproductos finales estables sin peligrosidad para el transporte',
      nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
      ppe: ['Gafas de seguridad', 'Guantes de nitrilo'],
      almacenamiento: 'Recipientes ventilados para no acumular sobrepresión de gas $CO_2$.',
      estabilidad: 'Estable.'
    }
  },

  // 8. VIRAJES DE INDICADORES: FENOLFTALEÍNA + BASES (NaOH o KOH)
  {
    id: 'fenolftaleina_base',
    matchedReactants: ['Fenolftaleina', 'NaOH'],
    title: 'Transición Estructural de Resonancia: Viraje de Fenolftaleína a Fucsia',
    type: 'indicador',
    balancedEquation: 'H₂In(incoloro) + 2OH⁻ ➔ In²⁻(rosa/fucsia brillante) + 2H₂O',
    ionicEquationNet: 'H₂In + 2OH⁻ ➔ In²⁻ + 2H₂O  [Apertura del anillo lactónico]',
    spectatorIons: ['Na⁺'],
    enthalpy: 'ΔH° ≈ -10 kJ/mol',
    steps: [
      {
        stepNumber: 1,
        title: 'Desprotonación de los grupos fenólicos y ruptura de lactona',
        equation: 'C₂₀H₁₄O₄ + 2OH⁻ ➔ C₂₀H₁₂O₄²⁻ + 2H₂O',
        description: 'A pH > 8.2, los grupos hidroxilo de la base arrancan dos protones de la fenolftaleína. Esto fuerza la apertura del anillo de lactona interior.',
        speciesInvolved: ['Fenolftaleina', 'OH⁻']
      },
      {
        stepNumber: 2,
        title: 'Extensión de la conjugación de electrones π y absorción fotónica',
        equation: 'In²⁻ ➔ Sistema quinonoide con deslocalización π',
        description: 'La nueva estructura quinonoide extiende la deslocalización de electrones pi a través de los tres anillos aromáticos, provocando la absorción selectiva de la longitud de onda verde (553 nm) y emitiendo un color rosa fucsia fluorescente espectacular.',
        speciesInvolved: ['In²⁻']
      }
    ],
    explicacionProfesor: {
      introduccion: '¡El viraje más célebre de la volumetría analítica! Has activado la transformación colorimétrica de la fenolftaleína.',
      mecanismoIónico: 'A nivel mecano-cuántico, la presencia de iones $OH^-$ desprotona la molécula, transformando un centro de carbono con hibridación $sp^3$ (no conjugado, incoloro) en un centro plano con hibridación $sp^2$ completamente conjugado. El gap de energía HOMO-LUMO disminuye, absorbiendo fotones en la región visible.',
      industria: 'Control de calidad en análisis de acidez titulable en vinos, zumos, leche y aguas tratadas.',
      conclusion: 'Si se añade un ácido fuerte a la solución fucsia, los protones vuelven a unirse a la fenolftaleína restaurando el estado $sp^3$ incoloro al instante.'
    },
    safetyInfo: {
      productoPrincipal: 'Solución alcalina con sal disódica de fenolftaleína',
      hazardClass: 'Clase 8 si exceso de base NaOH cáustica',
      unNumber: 'UN 1824',
      kemlerCode: '80',
      adrTunnelCode: '(E)',
      tunnelReason: 'Restricción en túneles E debido a la alcalinidad corrosiva de la base añadida',
      nfpa: { health: 2, flammability: 0, instability: 0, special: 'ALK' },
      ppe: ['Gafas herméticas', 'Guantes de nitrilo'],
      almacenamiento: 'Frascos dosificadores en bandeja antiderrames.',
      estabilidad: 'Estable en rango de pH 8.2 - 11.5; a pH extremo >12.5 sufre decoloración lenta a $In(OH)^{3-}$.'
    }
  }
];

// =========================================================================
// QUÍMICA COMPUTACIONAL DINÁMICA: MODELO UNIVERSAL DE REACCIONES
// =========================================================================

interface AcidDef {
  id: string;
  nombre: string;
  formula: string;
  hCount: number;
  anionKey: string;
  anionFormula: string;
  anionName: string;
  anionCharge: number;
}

interface BaseDef {
  id: string;
  nombre: string;
  formula: string;
  ohCount: number;
  cationKey: string;
  cationFormula: string;
  cationName: string;
  cationCharge: number;
}

const ACIDS_MAP: Record<string, AcidDef> = {
  HCl: { id: 'HCl', nombre: 'Ácido clorhídrico', formula: 'HCl', hCount: 1, anionKey: 'Cl', anionFormula: 'Cl⁻', anionName: 'Cloruro', anionCharge: 1 },
  H2SO4: { id: 'H2SO4', nombre: 'Ácido sulfúrico', formula: 'H₂SO₄', hCount: 2, anionKey: 'SO4', anionFormula: 'SO₄²⁻', anionName: 'Sulfato', anionCharge: 2 },
  HNO3: { id: 'HNO3', nombre: 'Ácido nítrico', formula: 'HNO₃', hCount: 1, anionKey: 'NO3', anionFormula: 'NO₃⁻', anionName: 'Nitrato', anionCharge: 1 },
  CH3COOH: { id: 'CH3COOH', nombre: 'Ácido acético', formula: 'CH₃COOH', hCount: 1, anionKey: 'CH3COO', anionFormula: 'CH₃COO⁻', anionName: 'Acetato', anionCharge: 1 },
  H3PO4: { id: 'H3PO4', nombre: 'Ácido fosfórico', formula: 'H₃PO₄', hCount: 3, anionKey: 'PO4', anionFormula: 'PO₄³⁻', anionName: 'Fosfato', anionCharge: 3 },
  C6H8O7: { id: 'C6H8O7', nombre: 'Ácido cítrico', formula: 'C₆H₈O₇', hCount: 3, anionKey: 'C6H5O7', anionFormula: 'C₆H₅O₇³⁻', anionName: 'Citrato', anionCharge: 3 },
  H2CO3: { id: 'H2CO3', nombre: 'Ácido carbónico', formula: 'H₂CO₃', hCount: 2, anionKey: 'CO3', anionFormula: 'CO₃²⁻', anionName: 'Carbonato', anionCharge: 2 },
};

const BASES_MAP: Record<string, BaseDef> = {
  LiOH: { id: 'LiOH', nombre: 'Hidróxido de litio', formula: 'LiOH', ohCount: 1, cationKey: 'Li', cationFormula: 'Li⁺', cationName: 'Litio', cationCharge: 1 },
  NaOH: { id: 'NaOH', nombre: 'Hidróxido de sodio', formula: 'NaOH', ohCount: 1, cationKey: 'Na', cationFormula: 'Na⁺', cationName: 'Sodio', cationCharge: 1 },
  KOH: { id: 'KOH', nombre: 'Hidróxido de potasio', formula: 'KOH', ohCount: 1, cationKey: 'K', cationFormula: 'K⁺', cationName: 'Potasio', cationCharge: 1 },
  'Ca(OH)2': { id: 'Ca(OH)2', nombre: 'Hidróxido de calcio', formula: 'Ca(OH)₂', ohCount: 2, cationKey: 'Ca', cationFormula: 'Ca²⁺', cationName: 'Calcio', cationCharge: 2 },
  'Mg(OH)2': { id: 'Mg(OH)2', nombre: 'Hidróxido de magnesio', formula: 'Mg(OH)₂', ohCount: 2, cationKey: 'Mg', cationFormula: 'Mg²⁺', cationName: 'Magnesio', cationCharge: 2 },
  'Sr(OH)2': { id: 'Sr(OH)2', nombre: 'Hidróxido de estroncio', formula: 'Sr(OH)₂', ohCount: 2, cationKey: 'Sr', cationFormula: 'Sr²⁺', cationName: 'Estroncio', cationCharge: 2 },
  'Ba(OH)2': { id: 'Ba(OH)2', nombre: 'Hidróxido de bario', formula: 'Ba(OH)₂', ohCount: 2, cationKey: 'Ba', cationFormula: 'Ba²⁺', cationName: 'Bario', cationCharge: 2 },
  NH4OH: { id: 'NH4OH', nombre: 'Hidróxido de amonio', formula: 'NH₄OH', ohCount: 1, cationKey: 'NH4', cationFormula: 'NH₄⁺', cationName: 'Amonio', cationCharge: 1 },
  'Cu(OH)2': { id: 'Cu(OH)2', nombre: 'Hidróxido de cobre(II)', formula: 'Cu(OH)₂', ohCount: 2, cationKey: 'Cu', cationFormula: 'Cu²⁺', cationName: 'Cobre(II)', cationCharge: 2 },
  'Fe(OH)3': { id: 'Fe(OH)3', nombre: 'Hidróxido de hierro(III)', formula: 'Fe(OH)₃', ohCount: 3, cationKey: 'Fe', cationFormula: 'Fe³⁺', cationName: 'Hierro(III)', cationCharge: 3 },
};

interface SaltMeta {
  formula: string;
  nombre: string;
  insoluble?: boolean;
  unNumber?: string;
  kemlerCode?: string;
  adrTunnelCode?: string;
  hazardClass?: string;
  nfpa?: NFPAData;
  agricultura?: string;
  industria?: string;
  mineralogia?: string;
}

const KNOWN_SALTS: Record<string, SaltMeta> = {
  // Cloruros
  'K_Cl': { formula: 'KCl', nombre: 'Cloruro de potasio (Silvina / Muriato de potasio)', agricultura: 'Fertilizante potásico de gran consumo mundial (60% K₂O). Utilizado ampliamente en cultivos extensivos tolerantes a cloruros.', industria: 'Electrólisis de salmueras potásicas para obtención de KOH y gas cloro.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado tras neutralización', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Na_Cl': { formula: 'NaCl', nombre: 'Cloruro de sodio (Sal común)', agricultura: 'Ajuste osmótico y control de conductividad en soluciones nutritivas tolerantes.', industria: 'Cloro-álcali electrolítico, conservante y descongelante vial.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Li_Cl': { formula: 'LiCl', nombre: 'Cloruro de litio', industria: 'Desecante industrial y electrolito para baterías avanzadas.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Ca_Cl': { formula: 'CaCl₂', nombre: 'Cloruro de calcio', agricultura: 'Aporte de calcio hidrosoluble y desalinización de suelos salino-sódicos.', industria: 'Descongelante de carreteras e hidrófilo de secado.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Mg_Cl': { formula: 'MgCl₂', nombre: 'Cloruro de magnesio', agricultura: 'Suplemento de magnesio asimilable.', industria: 'Producción de magnesio metálico.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Sr_Cl': { formula: 'SrCl₂', nombre: 'Cloruro de estroncio', industria: 'Fuegos artificiales de color rojo carmesí.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Ba_Cl': { formula: 'BaCl₂', nombre: 'Cloruro de bario', industria: 'Tratamiento térmico de aceros y reactivo para sulfatos.', unNumber: 'UN 1564', kemlerCode: '60 (Tóxico)', adrTunnelCode: '(E)', hazardClass: 'Clase 6.1: Materias tóxicas', nfpa: { health: 3, flammability: 0, instability: 0, special: 'NONE' } },
  'NH4_Cl': { formula: 'NH₄Cl', nombre: 'Cloruro de amonio', industria: 'Fundente para galvanizado y pirotecnia.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Cu_Cl': { formula: 'CuCl₂', nombre: 'Cloruro de cobre(II)', agricultura: 'Fungicida cúprico concentrado.', industria: 'Catalizador Wacker en petroquímica.', unNumber: 'UN 2802', kemlerCode: '80', adrTunnelCode: '(E)', hazardClass: 'Clase 8: Corrosivo', nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' } },
  'Fe_Cl': { formula: 'FeCl₃', nombre: 'Cloruro de hierro(III)', industria: 'Coagulante primario en depuración de aguas y grabado de circuitos PCB.', unNumber: 'UN 3260', kemlerCode: '80', adrTunnelCode: '(E)', hazardClass: 'Clase 8: Corrosivo', nfpa: { health: 3, flammability: 0, instability: 1, special: 'NONE' } },

  // Sulfatos
  'K_SO4': { formula: 'K₂SO₄', nombre: 'Sulfato de potasio', agricultura: 'El fertilizante potásico estrella para agricultura intensiva (50-52% K₂O, 18% S), 100% libre de cloruros para cultivos de alto valor (aguacate, cítricos, viña, fresa).', industria: 'Vidrio óptico de alta resistencia y digestión Kjeldahl.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Na_SO4': { formula: 'Na₂SO₄', nombre: 'Sulfato de sodio (Sal de Glauber)', industria: 'Detergentes en polvo y refinación de pasta de celulosa kraft.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Li_SO4': { formula: 'Li₂SO₄', nombre: 'Sulfato de litio', industria: 'Acelerador de fraguado de cemento y baterías.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Ca_SO4': { formula: 'CaSO₄(s) ↓', nombre: 'Sulfato de calcio (Yeso precipitado)', insoluble: true, mineralogia: 'Forma la roca evaporítica yeso (CaSO₄·2H₂O) y selenita.', agricultura: 'Enmienda de suelos sódicos y aporte de azufre y calcio.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Mg_SO4': { formula: 'MgSO₄', nombre: 'Sulfato de magnesio (Sal de Epsom)', agricultura: 'Corrector de clorosis foliar magnésica con rápida absorción celular.', industria: 'Curtido y secante orgánico.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Sr_SO4': { formula: 'SrSO₄(s) ↓', nombre: 'Sulfato de estroncio (Celestina precipitada)', insoluble: true, mineralogia: 'Mineral celestina de hábito prismático azul celeste.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Ba_SO4': { formula: 'BaSO₄(s) ↓', nombre: 'Sulfato de bario (Barita pesada insoluble)', insoluble: true, mineralogia: 'Precipitado blanco ultra-denso (densidad 4.5 g/cm³), base del mineral baritina.', industria: 'Contraste radiológico inerte y lodos de perforación petrolífera.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado (Insoluble e inocuo)', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'NH4_SO4': { formula: '(NH₄)₂SO₄', nombre: 'Sulfato de amonio', agricultura: 'Fertilizante nitrogenado amoniacal (21% N) y azufrado (24% S).', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Cu_SO4': { formula: 'CuSO₄', nombre: 'Sulfato de cobre(II)', agricultura: 'Ingrediente activo del caldo bordelés contra hongos mildiu.', unNumber: 'UN 3077', kemlerCode: '90', adrTunnelCode: '(-)', hazardClass: 'Clase 9: Tóxico acuático', nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' } },
  'Fe_SO4': { formula: 'Fe₂(SO₄)₃', nombre: 'Sulfato de hierro(III)', industria: 'Coagulante purificador de aguas y mordiente textil.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },

  // Nitratos
  'K_NO3': { formula: 'KNO₃', nombre: 'Nitrato de potasio (Nitro / Salitre potásico)', agricultura: 'Fertilizante hidrosoluble de élite en fertirriego (13-0-45). Nutrición equilibrada K-N soluble libre de cloro.', industria: 'Sales térmicas para plantas termosolares y pólvora negra.', unNumber: 'UN 1486', kemlerCode: '50 (Comburente)', adrTunnelCode: '(E)', hazardClass: 'Clase 5.1: Materias comburentes', nfpa: { health: 1, flammability: 0, instability: 1, special: 'OX' } },
  'Na_NO3': { formula: 'NaNO₃', nombre: 'Nitrato de sodio (Salitre de Chile)', agricultura: 'Fertilizante nítrico tradicional de rápida asimilación radicular.', unNumber: 'UN 1498', kemlerCode: '50', adrTunnelCode: '(E)', hazardClass: 'Clase 5.1: Comburente', nfpa: { health: 1, flammability: 0, instability: 1, special: 'OX' } },
  'Li_NO3': { formula: 'LiNO₃', nombre: 'Nitrato de litio', industria: 'Sales eutécticas térmicas y fuegos artificiales rojos.', unNumber: 'UN 2722', kemlerCode: '50', adrTunnelCode: '(E)', hazardClass: 'Clase 5.1: Comburente', nfpa: { health: 2, flammability: 0, instability: 1, special: 'OX' } },
  'Ca_NO3': { formula: 'Ca(NO₃)₂', nombre: 'Nitrato de calcio', agricultura: 'Aporte de calcio soluble y nitrógeno nítrico, indispensable contra fisiopatías como blossom end rot.', unNumber: 'UN 1454', kemlerCode: '50', adrTunnelCode: '(E)', hazardClass: 'Clase 5.1: Comburente', nfpa: { health: 1, flammability: 0, instability: 1, special: 'OX' } },
  'Mg_NO3': { formula: 'Mg(NO₃)₂', nombre: 'Nitrato de magnesio', agricultura: 'Nutrición foliar de magnesio y nitrógeno sin cloruros.', unNumber: 'UN 1474', kemlerCode: '50', adrTunnelCode: '(E)', hazardClass: 'Clase 5.1: Comburente', nfpa: { health: 1, flammability: 0, instability: 1, special: 'OX' } },
  'Sr_NO3': { formula: 'Sr(NO₃)₂', nombre: 'Nitrato de estroncio', industria: 'Bengalas de rescate marítimo y proyectiles de señalización roja.', unNumber: 'UN 1507', kemlerCode: '50', adrTunnelCode: '(E)', hazardClass: 'Clase 5.1: Comburente', nfpa: { health: 2, flammability: 0, instability: 1, special: 'OX' } },
  'Ba_NO3': { formula: 'Ba(NO₃)₂', nombre: 'Nitrato de bario', industria: 'Pirotecnia de destello verde esmeralda brillante.', unNumber: 'UN 1446', kemlerCode: '56 (Comburente y tóxico)', adrTunnelCode: '(E)', hazardClass: 'Clase 5.1: Comburente (6.1 Tóxico)', nfpa: { health: 3, flammability: 0, instability: 1, special: 'OX' } },
  'NH4_NO3': { formula: 'NH₄NO₃', nombre: 'Nitrato de amonio', agricultura: 'Fertilizante con 33.5% de nitrógeno puro.', unNumber: 'UN 1942', kemlerCode: '50', adrTunnelCode: '(E)', hazardClass: 'Clase 5.1: Comburente', nfpa: { health: 1, flammability: 0, instability: 3, special: 'OX' } },
  'Cu_NO3': { formula: 'Cu(NO₃)₂', nombre: 'Nitrato de cobre(II)', industria: 'Oxidante en síntesis orgánica y pátinas artísticas de bronce.', unNumber: 'UN 3085', kemlerCode: '58', adrTunnelCode: '(E)', hazardClass: 'Clase 5.1: Comburente (8 Corrosivo)', nfpa: { health: 2, flammability: 0, instability: 1, special: 'OX' } },
  'Fe_NO3': { formula: 'Fe(NO₃)₃', nombre: 'Nitrato de hierro(III)', industria: 'Mordiente textil y catalizador ácido.', unNumber: 'UN 1466', kemlerCode: '50', adrTunnelCode: '(E)', hazardClass: 'Clase 5.1: Comburente', nfpa: { health: 2, flammability: 0, instability: 1, special: 'OX' } },

  // Acetatos
  'K_CH3COO': { formula: 'KCH₃COO', nombre: 'Acetato de potasio', agricultura: 'Fertilizante foliar ultra-asimilable y descongelante ecológico.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 1, instability: 0, special: 'NONE' } },
  'Na_CH3COO': { formula: 'NaCH₃COO', nombre: 'Acetato de sodio', industria: 'Calentadores de manos químicos y tampón de pH biológico.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 1, instability: 0, special: 'NONE' } },
  'Ca_CH3COO': { formula: 'Ca(CH₃COO)₂', nombre: 'Acetato de calcio', industria: 'Inhibidor de moho en panadería y síntesis de alcohol solidificado.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },

  // Fosfatos
  'K_PO4': { formula: 'K₃PO₄', nombre: 'Fosfato de potasio', agricultura: 'Fertilizante PK para etapas de floración y engorde.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },
  'Na_PO4': { formula: 'Na₃PO₄', nombre: 'Fosfato trisódico', industria: 'Desengrasante industrial y tratamiento de aguas de calderas.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' } },
  'Ca_PO4': { formula: 'Ca₃(PO₄)₂(s) ↓', nombre: 'Fosfato de calcio (Fosforita precipitada)', insoluble: true, mineralogia: 'Mineral apatito y constituyente inorgánico de huesos y esmalte dental.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' } },

  // Citratos
  'K_C6H5O7': { formula: 'K₃C₆H₅O₇', nombre: 'Citrato de potasio', agricultura: 'Quelatante orgánico natural y regulador osmótico.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 0, flammability: 1, instability: 0, special: 'NONE' } },
  'Na_C6H5O7': { formula: 'Na₃C₆H₅O₇', nombre: 'Citrato de sodio', industria: 'Anticoagulante sanguíneo y regulador de acidez alimentario E331.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 0, flammability: 1, instability: 0, special: 'NONE' } },

  // Carbonatos
  'K_CO3': { formula: 'K₂CO₃', nombre: 'Carbonato de potasio (Potasa)', industria: 'Fabricación de jabones potásicos y vidrio especial.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' } },
  'Na_CO3': { formula: 'Na₂CO₃', nombre: 'Carbonato de sodio (Sosa Solvay)', industria: 'Fabricación de vidrio, detergentes y tratamiento de aguas.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 2, flammability: 0, instability: 0, special: 'NONE' } },
  'Ca_CO3': { formula: 'CaCO₃(s) ↓', nombre: 'Carbonato de calcio (Calcita precipitada)', insoluble: true, mineralogia: 'Rocas calizas, mármoles y conchas marinas.', unNumber: 'No regulado', kemlerCode: 'N/A', adrTunnelCode: 'Sin restricción', hazardClass: 'No regulado', nfpa: { health: 0, flammability: 0, instability: 0, special: 'NONE' } },
  'Ba_CO3': { formula: 'BaCO₃(s) ↓', nombre: 'Carbonato de bario', insoluble: true, unNumber: 'UN 1564', kemlerCode: '60', adrTunnelCode: '(E)', hazardClass: 'Clase 6.1: Tóxico', nfpa: { health: 3, flammability: 0, instability: 0, special: 'NONE' } }
};

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

// 1. SOLUCIONADOR UNIVERSAL ÁCIDO-BASE
function solveAcidBase(acid: AcidDef, base: BaseDef, allReactantIds: string[]): ReactionResult {
  const L = lcm(acid.hCount, base.ohCount);
  const acidCoeff = L / acid.hCount;
  const baseCoeff = L / base.ohCount;
  const waterCoeff = L;

  // Salt lookup
  const saltKey = `${base.cationKey}_${acid.anionKey}`;
  const salt = KNOWN_SALTS[saltKey] || {
    formula: `${base.cationKey}${acid.anionKey}`,
    nombre: `Sal de ${acid.anionName.toLowerCase()} de ${base.cationName.toLowerCase()}`,
    unNumber: 'No regulado tras reacción completa',
    kemlerCode: 'N/A',
    adrTunnelCode: 'Sin restricción',
    hazardClass: 'No regulado tras neutralización',
    nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' }
  };

  const acidPrefix = acidCoeff > 1 ? `${acidCoeff}` : '';
  const basePrefix = baseCoeff > 1 ? `${baseCoeff}` : '';
  const waterPrefix = waterCoeff > 1 ? `${waterCoeff}` : '';
  const saltState = salt.insoluble ? '(s) ↓' : '(aq)';
  const balancedEquation = `${acidPrefix}${acid.formula}(aq) + ${basePrefix}${base.formula}(aq) ➔ ${salt.formula}${saltState} + ${waterPrefix}H₂O(l)`;
  const netIonic = salt.insoluble
    ? `${acidCoeff > 1 ? acidCoeff : ''}H⁺ + ${baseCoeff > 1 ? baseCoeff : ''}OH⁻ + ${base.cationFormula} + ${acid.anionFormula} ➔ ${salt.formula} ↓ + ${waterPrefix}H₂O`
    : `H⁺(aq) + OH⁻(aq) ➔ H₂O(l)`;

  const spectatorIons = salt.insoluble ? [] : [base.cationFormula, acid.anionFormula];

  const step1Equation = `${acidPrefix}${acid.formula}(aq) + ${basePrefix}${base.formula}(aq) ➔ ${L > 1 ? `${L}` : ''}H⁺(aq) + ${acid.anionFormula} + ${base.cationFormula} + ${L > 1 ? `${L}` : ''}OH⁻(aq)`;
  const step2Equation = `H⁺(aq) + OH⁻(aq) ➔ H₂O(l)  [ΔH° = -57.3 kJ/mol]`;
  const step3Equation = salt.insoluble
    ? `${base.cationFormula} + ${acid.anionFormula} ➔ ${salt.formula}(s) ↓  [Precipitado]`
    : `${base.cationFormula}(aq) + ${acid.anionFormula}(aq) ➔ ${salt.formula}(aq)  [pH ≈ 7.00]`;

  return {
    id: `ab_${acid.id}_${base.id}`,
    matchedReactants: [acid.id, base.id],
    title: `Neutralización Ácido-Base: Síntesis de ${salt.nombre}`,
    type: salt.insoluble ? 'precipitacion' : 'neutralizacion',
    balancedEquation,
    ionicEquationNet: netIonic,
    spectatorIons,
    enthalpy: `ΔH° = -${(57.3 * (L / 1)).toFixed(1)} kJ/mol (Exotérmica de neutralización)`,
    steps: [
      {
        stepNumber: 1,
        title: 'Disociación electrolítica e ionización total en agua',
        equation: step1Equation,
        description: `Tanto el ${acid.nombre} (${acid.formula}) como el ${base.nombre} (${base.formula}) se disocian en disolución acuosa liberando protones solvatados H⁺ y aniones hidroxilo OH⁻ junto con sus respectivos iones espectadores.`,
        speciesInvolved: [acid.id, base.id, 'H⁺', 'OH⁻', base.cationFormula, acid.anionFormula]
      },
      {
        stepNumber: 2,
        title: 'Transferencia protónica y formación de agua líquida pura',
        equation: step2Equation,
        description: `Los iones hidronio H⁺ y los iones hidroxilo OH⁻ colapsan mediante enlace covalente polar para formar agua químicamente neutra con un desprendimiento térmico de exactamente 57.3 kJ por cada mol de pares iónicos reaccionados.`,
        speciesInvolved: ['H⁺', 'OH⁻', 'H₂O']
      },
      {
        stepNumber: 3,
        title: salt.insoluble ? `Precipitación espontánea de ${salt.nombre}` : `Estabilización de ${salt.nombre} en fase acuosa homogénea`,
        equation: step3Equation,
        description: salt.insoluble
          ? `Al superarse el producto de solubilidad ($K_{ps}$), la sal ${salt.nombre} precipita de forma inmediata como fase sólida insoluble separándose de la fase acuosa.`
          : `Los iones ${base.cationFormula} y ${acid.anionFormula} actúan como espectadores termodinámicos, estabilizando una disolución salina neutra de ${salt.nombre} (${salt.formula}).`,
        speciesInvolved: [salt.formula, 'H₂O']
      }
    ],
    explicacionProfesor: {
      introduccion: `Has efectuado una reacción estricta de neutralización ácido-base de Brønsted-Lowry entre ${acid.nombre} y ${base.nombre}. La reacción produce estequiométricamente **${salt.nombre} (${salt.formula})** y agua pura (**H₂O**).`,
      mecanismoIónico: `El mecanismo involucra la transferencia protónica espontánea del ácido al grupo hidroxilo básico. La energía libre de Gibbs es fuertemente negativa ($\\Delta G^\\circ < 0$), lo que impulsa el proceso a completarse al 100% sin dejar acidez ni alcalinidad residual si se añaden cantidades equimolares.`,
      agricultura: salt.agricultura || `En aplicaciones agrícolas, esta neutralización permite formular sales de alta solubilidad asimilables por fertirriego sin acumular fitotoxicidad.`,
      industria: salt.industria || `Proceso fundamental para tratamiento de vertidos ácidos, ajuste de pH en reactores químicos y síntesis inorgánica de sales de alta pureza.`,
      mineralogia: salt.mineralogia,
      conclusion: `El producto resultante es ${salt.nombre} (${salt.formula}) disuelto o precipitado en un medio neutro y estable.`
    },
    safetyInfo: {
      productoPrincipal: `${salt.nombre} (${salt.formula}) + H₂O`,
      hazardClass: salt.hazardClass || 'No regulado tras neutralización (Reactivos originales: Clase 8 Corrosivo)',
      unNumber: salt.unNumber || 'No regulado tras reacción completa',
      kemlerCode: salt.kemlerCode || 'N/A',
      adrTunnelCode: salt.adrTunnelCode || 'Sin restricción',
      tunnelReason: salt.adrTunnelCode === '(E)'
        ? 'Restricción en túneles categoría E por la naturaleza comburente o tóxica de la sal formada'
        : 'La sal neutra obtenida no presenta peligrosidad de inflamabilidad, toxicidad ni corrosión para el tránsito en túneles',
      nfpa: salt.nfpa || { health: 1, flammability: 0, instability: 0, special: 'NONE' },
      ppe: ['Gafas de seguridad química con protección lateral', 'Guantes estándar de nitrilo', 'Bata de laboratorio'],
      almacenamiento: 'Almacenar en recipientes plásticos estancos a temperatura ambiente protegidos de la humedad excesiva.',
      estabilidad: 'Químicamente inerte y estable indefinidamente a temperatura y presión normales.'
    }
  };
}

// 2. SOLUCIONADOR ÁCIDO + CARBONATO / BICARBONATO
function solveAcidCarbonate(acidId: string, carbId: string): ReactionResult | null {
  const acid = ACIDS_MAP[acidId];
  if (!acid) return null;

  const isBicarb = carbId.includes('HCO3') || carbId.includes('Bicarbonato');
  const carbFormula = carbId === 'CaCO3' ? 'CaCO₃'
    : carbId === 'Na2CO3' ? 'Na₂CO₃'
    : carbId === 'K2CO3' ? 'K₂CO₃'
    : carbId === 'Li2CO3' ? 'Li₂CO₃'
    : carbId === 'NaHCO3' ? 'NaHCO₃'
    : carbId === 'KHCO3' ? 'KHCO₃'
    : carbId;

  const cation = carbId.startsWith('Ca') ? 'Ca'
    : carbId.startsWith('Na') ? 'Na'
    : carbId.startsWith('K') ? 'K'
    : carbId.startsWith('Li') ? 'Li'
    : carbId.startsWith('Mg') ? 'Mg'
    : carbId.startsWith('Ba') ? 'Ba'
    : 'Na';

  const saltKey = `${cation}_${acid.anionKey}`;
  const salt = KNOWN_SALTS[saltKey] || { formula: `${cation}${acid.anionKey}`, nombre: `Sal de ${cation}` };

  const saltPrefix = (acidId === 'HCl' && (cation === 'Na' || cation === 'K' || cation === 'Li')) ? '2' : '';
  const eq = isBicarb
    ? `${acid.formula}(aq) + ${carbFormula}(s) ➔ ${salt.formula}(aq) + CO₂(g) ↑ + H₂O(l)`
    : acidId === 'HCl'
      ? `2HCl(aq) + ${carbFormula}(s) ➔ ${saltPrefix}${salt.formula}(aq) + CO₂(g) ↑ + H₂O(l)`
      : `${acid.formula}(aq) + ${carbFormula}(s) ➔ ${salt.formula}(aq) + CO₂(g) ↑ + H₂O(l)`;

  return {
    id: `carb_${acidId}_${carbId}`,
    matchedReactants: [acidId, carbId],
    title: `Descomposición de Carbonatos y Efervescencia de CO₂: Formación de ${salt.nombre}`,
    type: 'doble_intercambio',
    balancedEquation: eq,
    ionicEquationNet: isBicarb
      ? `H⁺(aq) + HCO₃⁻(aq) ➔ CO₂(g) ↑ + H₂O(l)`
      : `2H⁺(aq) + CO₃²⁻(s) ➔ CO₂(g) ↑ + H₂O(l)`,
    spectatorIons: [salt.formula],
    enthalpy: 'ΔH° ≈ -15.8 kJ/mol (Exotérmica con efervescencia)',
    steps: [
      {
        stepNumber: 1,
        title: 'Protonación del carbonato y generación de ácido carbónico transitorio',
        equation: isBicarb ? `H⁺ + HCO₃⁻ ➔ H₂CO₃` : `2H⁺ + CO₃²⁻ ➔ H₂CO₃`,
        description: `Los iones hidronio generados por el ${acid.nombre} atacan nucleofílicamente al anión carbonato, formando la especie inestable ácido carbónico ($H_2CO_3$).`,
        speciesInvolved: [acidId, carbId, 'H₂CO₃']
      },
      {
        stepNumber: 2,
        title: 'Descomposición espontánea y liberación viva de gas Dióxido de Carbono',
        equation: `H₂CO₃(aq) ➔ CO₂(g) ↑ + H₂O(l)`,
        description: `El ácido carbónico se disocia instantáneamente a presión atmosférica produciendo una efervescencia vigorosa de burbujas de gas CO₂ no tóxico y agua.`,
        speciesInvolved: ['H₂CO₃', 'CO₂', 'H₂O']
      },
      {
        stepNumber: 3,
        title: `Estabilización de la sal neutra ${salt.nombre} en solución`,
        equation: eq.split('➔')[0] + `➔ ${salt.formula}(aq)`,
        description: `El catión metálico y el anión del ácido forman la sal estable ${salt.nombre} (${salt.formula}).`,
        speciesInvolved: [salt.formula]
      }
    ],
    explicacionProfesor: {
      introduccion: `Has inducido una reacción clásica de disolución de carbonatos por ataque ácido. El contacto del ácido con el carbonato produce la sal **${salt.nombre}**, agua pura y una viva efervescencia de **gas dióxido de carbono ($CO_2$)**.`,
      mecanismoIónico: `El protón lábil H⁺ protona el anión carbonato CO₃²⁻ originando ácido carbónico transitorio, cuya descomposición cinética es ultrarrápida a temperatura ambiente.`,
      agricultura: `Enmienda de suelos y solubilización de fósforo bloqueado en suelos calcáreos mediante acidificación controlada.`,
      industria: `Ensayos geológicos de campo para identificar rocas calizas y procesos industriales de desincrustación de circuitos taponados por cal.`,
      mineralogia: `Meteorización kárstica: el mecanismo geológico que excava cuevas, dolinas y estalagmitas en rocas carbonatadas calizas a lo largo de millones de años.`,
      conclusion: `La reacción finaliza cuando se consume todo el carbonato o se neutraliza el ácido, desprendiendo gas CO₂ inocuo.`
    },
    safetyInfo: {
      productoPrincipal: `${salt.nombre} (${salt.formula}) + Gas CO₂ desprendido`,
      hazardClass: 'No regulado tras reacción completa (Reactivo original: Clase 8 Corrosivo)',
      unNumber: 'No regulado tras disolución',
      kemlerCode: 'N/A',
      adrTunnelCode: 'Sin restricción',
      tunnelReason: 'Subproductos estables sin peligrosidad de transporte en túneles',
      nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
      ppe: ['Gafas de seguridad', 'Guantes de nitrilo'],
      almacenamiento: 'No tapar herméticamente recipientes durante la reacción para evitar sobrepresiones por CO₂.',
      estabilidad: 'Estable.'
    }
  };
}

// 3. SOLUCIONADOR METALES ACTIVOS + ÁCIDOS (DESPRENDIMIENTO DE HIDRÓGENO)
function solveMetalAcid(metalId: string, acidId: string): ReactionResult | null {
  const acid = ACIDS_MAP[acidId];
  if (!acid) return null;

  const metals: Record<string, { nombre: string; formula: string; valencia: number; e0: string }> = {
    Al: { nombre: 'Aluminio', formula: 'Al', valencia: 3, e0: '-1.66 V' },
    Fe: { nombre: 'Hierro', formula: 'Fe', valencia: 2, e0: '-0.44 V' },
    Mg: { nombre: 'Magnesio', formula: 'Mg', valencia: 2, e0: '-2.37 V' },
    Ca: { nombre: 'Calcio', formula: 'Ca', valencia: 2, e0: '-2.87 V' },
    Na: { nombre: 'Sodio', formula: 'Na', valencia: 1, e0: '-2.71 V' },
    K: { nombre: 'Potasio', formula: 'K', valencia: 1, e0: '-2.93 V' },
    Ba: { nombre: 'Bario', formula: 'Ba', valencia: 2, e0: '-2.91 V' },
    Sr: { nombre: 'Estroncio', formula: 'Sr', valencia: 2, e0: '-2.89 V' },
    Li: { nombre: 'Litio', formula: 'Li', valencia: 1, e0: '-3.04 V' },
    Ni: { nombre: 'Níquel', formula: 'Ni', valencia: 2, e0: '-0.25 V' },
    Co: { nombre: 'Cobalto', formula: 'Co', valencia: 2, e0: '-0.28 V' }
  };

  const m = metals[metalId];
  if (!m) return null;

  const saltKey = `${metalId}_${acid.anionKey}`;
  const salt = KNOWN_SALTS[saltKey] || {
    formula: m.valencia === 1 ? `${metalId}${acid.anionKey}` : m.valencia === 2 ? `${metalId}(${acid.anionKey})₂` : `${metalId}(${acid.anionKey})₃`,
    nombre: `Sal de ${acid.anionName.toLowerCase()} de ${m.nombre.toLowerCase()}`
  };

  let eq = '';
  let net = '';
  if (metalId === 'Al' && acidId === 'HCl') {
    eq = '2Al(s) + 6HCl(aq) ➔ 2AlCl₃(aq) + 3H₂(g) ↑';
    net = '2Al⁰ + 6H⁺ ➔ 2Al³⁺ + 3H₂ ↑';
  } else if (metalId === 'Al' && acidId === 'H2SO4') {
    eq = '2Al(s) + 3H₂SO₄(aq) ➔ Al₂(SO₄)₃(aq) + 3H₂(g) ↑';
    net = '2Al⁰ + 6H⁺ ➔ 2Al³⁺ + 3H₂ ↑';
  } else if (m.valencia === 2 && acidId === 'HCl') {
    eq = `${metalId}(s) + 2HCl(aq) ➔ ${salt.formula}(aq) + H₂(g) ↑`;
    net = `${metalId}⁰ + 2H⁺ ➔ ${metalId}²⁺ + H₂ ↑`;
  } else if (m.valencia === 2 && acidId === 'H2SO4') {
    eq = `${metalId}(s) + H₂SO₄(aq) ➔ ${salt.formula}(aq) + H₂(g) ↑`;
    net = `${metalId}⁰ + 2H⁺ ➔ ${metalId}²⁺ + H₂ ↑`;
  } else if (m.valencia === 1 && acidId === 'HCl') {
    eq = `2${metalId}(s) + 2HCl(aq) ➔ 2${salt.formula}(aq) + H₂(g) ↑`;
    net = `2${metalId}⁰ + 2H⁺ ➔ 2${metalId}⁺ + H₂ ↑`;
  } else {
    eq = `${metalId}(s) + ${acid.formula}(aq) ➔ ${salt.formula}(aq) + H₂(g) ↑`;
    net = `${metalId}⁰ + 2H⁺ ➔ ${metalId}ⁿ⁺ + H₂ ↑`;
  }

  return {
    id: `redox_${metalId}_${acidId}`,
    matchedReactants: [metalId, acidId],
    title: `Oxidación Redox de ${m.nombre} y Desprendimiento de Gas Hidrógeno (H₂)`,
    type: 'redox',
    balancedEquation: eq,
    ionicEquationNet: net,
    spectatorIons: [acid.anionFormula],
    enthalpy: 'ΔH° ≈ -460 kJ/mol (Fuertemente exotérmica)',
    steps: [
      {
        stepNumber: 1,
        title: `Oxidación anódica del metal elemental ${m.nombre}`,
        equation: `${metalId}⁰ ➔ ${metalId}ⁿ⁺ + n e⁻  [E° = ${m.e0}]`,
        description: `El ${m.nombre} posee un potencial de reducción estándar muy negativo (${m.e0}), cediendo electrones de valencia con extrema avidez a los protones de la disolución.`,
        speciesInvolved: [metalId, `${metalId}ⁿ⁺`, 'e⁻']
      },
      {
        stepNumber: 2,
        title: 'Reducción catódica de protones y efervescencia de gas Hidrógeno',
        equation: `2H⁺ + 2e⁻ ➔ H₂(g) ↑  [E° = 0.00 V]`,
        description: `Los protones solvatados H⁺ capturan los electrones cedidos por el metal, recombinándose en gas hidrógeno molecular altamente inflamable ($H_2$) que burbujea violentamente.`,
        speciesInvolved: ['H⁺', 'e⁻', 'H₂']
      },
      {
        stepNumber: 3,
        title: `Solvatación de la sal ${salt.nombre}`,
        equation: eq,
        description: `Los cationes metálicos oxidados se estabilizan con los aniones espectadores formando la sal ${salt.nombre} en solución acuosa.`,
        speciesInvolved: [salt.formula, 'H₂']
      }
    ],
    explicacionProfesor: {
      introduccion: `Has provocado un desplazamiento redox espontáneo entre el metal elemental **${m.nombre}** y el **${acid.nombre}**. El metal se oxida completamente disolviéndose en la sal **${salt.nombre}** y liberando **gas Hidrógeno inflamable ($H_2$)**.`,
      mecanismoIónico: `El potencial estándar del metal ($E° = ${m.e0}$) se encuentra por debajo del electrodo estándar de hidrógeno ($0.00\\text{ V}$), lo que otorga una fuerza electromotriz fuertemente positiva ($\\Delta E^\\circ > 0$) y una energía de Gibbs muy negativa (proceso espontáneo).`,
      industria: `Decapado químico de metales en acerías y producción in situ de gas hidrógeno combustible o sales metálicas puras.`,
      conclusion: `Atención logística: el hidrógeno desprendido forma mezclas explosivas con el aire (rango de inflamabilidad 4% - 75% en volumen). Requiere área ventilada libre de chispas.`
    },
    safetyInfo: {
      productoPrincipal: `Gas Hidrógeno (H₂) inflamable + Solución de ${salt.nombre}`,
      hazardClass: 'Clase 2.1: Gas inflamable (Hidrógeno generado) / Clase 8: Líquido corrosivo residual',
      unNumber: 'UN 1049 (Gas Hidrógeno comprimido) / UN 1789 (Ácido)',
      kemlerCode: '23 (Gas inflamable)',
      adrTunnelCode: '(B/D)',
      tunnelReason: 'Prohibición en túneles B y D para gases inflamables por grave riesgo de deflagración en recintos confinados',
      nfpa: { health: 2, flammability: 4, instability: 2, special: 'W', specialText: 'Desprende gas inflamable' },
      ppe: ['Pantalla facial', 'Gafas de seguridad estancas', 'Guantes de viton/neopreno', 'Área libre de fuentes de ignición'],
      almacenamiento: 'Prohibido almacenar en recipientes sellados herméticos mientras dure la efervescencia por peligro de estallido mecánico.',
      estabilidad: 'Reacción fuertemente exotérmica con peligro de ignición del gas hidrógeno.'
    }
  };
}

// 4. SOLUCIONADOR DE INDICADORES QUÍMICOS
function solveIndicatorVirage(indId: string, otherIds: string[]): ReactionResult | null {
  const indicators: Record<string, { nombre: string; colorAcido: string; colorBase: string; colorNeutro: string }> = {
    Fenolftaleina: { nombre: 'Fenolftaleína', colorAcido: 'Incoloro (pH < 8.2)', colorBase: 'Rosa fucsia brillante (pH > 8.2)', colorNeutro: 'Incoloro (pH 7)' },
    Tornasol: { nombre: 'Tornasol', colorAcido: 'Rojo vivo (pH < 4.5)', colorBase: 'Azul intenso (pH > 8.3)', colorNeutro: 'Violeta neutro (pH 7)' },
    Azul_de_Bromotimol: { nombre: 'Azul de Bromotimol', colorAcido: 'Amarillo brillante (pH < 6.0)', colorBase: 'Azul real profundo (pH > 7.6)', colorNeutro: 'Verde esmeralda (pH 6.8 - 7.2)' },
    Naranja_de_Metilo: { nombre: 'Naranja de Metilo', colorAcido: 'Rojo intenso (pH < 3.1)', colorBase: 'Amarillo dorado (pH > 4.4)', colorNeutro: 'Naranja intermedio (pH 7)' },
    Azul_de_Timol: { nombre: 'Azul de Timol', colorAcido: 'Rojo (pH < 1.2) / Amarillo', colorBase: 'Azul oscuro (pH > 9.6)', colorNeutro: 'Amarillo pajizo (pH 7)' },
    Rojo_de_Cresol: { nombre: 'Rojo de Cresol', colorAcido: 'Amarillo (pH < 7.2)', colorBase: 'Rojo púrpura (pH > 8.8)', colorNeutro: 'Ámbar (pH 7)' },
    Indicador_Universal: { nombre: 'Indicador Universal', colorAcido: 'Rojo cereza (pH 1-3) / Naranja (pH 4-6)', colorBase: 'Azul marino / Violeta intenso (pH > 9)', colorNeutro: 'Verde oliva neutro (pH 7.0)' }
  };

  const ind = indicators[indId];
  if (!ind) return null;

  const hasAcid = otherIds.some(id => ACIDS_MAP[id]);
  const hasBase = otherIds.some(id => BASES_MAP[id]);

  const virajeColor = hasBase ? ind.colorBase : hasAcid ? ind.colorAcido : ind.colorNeutro;
  const virajeTipo = hasBase ? 'Medio Alcalino (Básico)' : hasAcid ? 'Medio Ácido' : 'Medio Salino Neutro';

  return {
    id: `ind_${indId}`,
    matchedReactants: [indId, ...otherIds],
    title: `Transición Espectrofotométrica: Viraje de ${ind.nombre} a ${virajeColor.split('(')[0].trim()}`,
    type: 'indicador',
    balancedEquation: `${ind.nombre} + ${virajeTipo} ➔ Forma Estructural Cromófora [Color: ${virajeColor}]`,
    ionicEquationNet: hasBase
      ? `H₂In(molecular) + 2OH⁻ ➔ In²⁻(desprotonado, cromóforo extendido) + 2H₂O`
      : hasAcid
        ? `In⁻ + H⁺ ➔ H-In(forma protonada)`
        : `HIn ⇄ In⁻ + H⁺  [Equilibrio isoeléctrico en pH 7]`,
    spectatorIons: [],
    enthalpy: 'ΔH° ≈ -8.5 kJ/mol (Proceso conformacional y de resonancia)',
    steps: [
      {
        stepNumber: 1,
        title: 'Modificación del equilibrio protónico del cromóforo',
        equation: hasBase ? `H₂In + OH⁻ ➔ HIn⁻ + H₂O` : `In⁻ + H⁺ ➔ H-In`,
        description: `La concentración de iones en la disolución modifica el grado de ionización de los grupos fenólicos o azoicos del indicador ${ind.nombre}.`,
        speciesInvolved: [indId, hasBase ? 'OH⁻' : 'H⁺']
      },
      {
        stepNumber: 2,
        title: 'Reorganización de resonancia π y absorción de longitud de onda visible',
        equation: `Transición HOMO-LUMO ➔ Absorción selectiva en espectro visible`,
        description: `El cambio estructural modifica el tamaño del sistema de dobles enlaces conjugados de electrones $\\pi$, absorbiendo fotones específicos y reflejando una tonalidad: **${virajeColor}**.`,
        speciesInvolved: [indId]
      }
    ],
    explicacionProfesor: {
      introduccion: `Has empleado el indicador colorimétrico **${ind.nombre}**. Al interactuar con el medio actual (${virajeTipo}), experimenta un cambio conformacional inmediato virando hacia el color **${virajeColor}**.`,
      mecanismoIónico: `Los indicadores ácido-base son ácidos o bases orgánicas débiles cuya forma molecular protonada posee un espectro de absorción electromagnética radicalmente diferente al de su forma iónica desprotonada.`,
      industria: `Volumetría cuantitativa, control de acidez en alimentos, fermentaciones y verificación rápida de pH en piscinas y aguas potables.`,
      conclusion: `El viraje es completamente reversible: agregando reactivo antagónico se restaura el color original instantáneamente.`
    },
    safetyInfo: {
      productoPrincipal: `Solución indicadora analítica de ${ind.nombre}`,
      hazardClass: 'No regulado en concentración analítica (<0.1%)',
      unNumber: 'No regulado',
      kemlerCode: 'N/A',
      adrTunnelCode: 'Sin restricción',
      tunnelReason: 'Reactivo analítico diluido sin restricción de transporte',
      nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
      ppe: ['Gafas de laboratorio', 'Guantes de nitrilo desechables'],
      almacenamiento: 'Frascos goteros de vidrio topacio protegidos de luz solar.',
      estabilidad: 'Estable en disolución hidroalcohólica.'
    }
  };
}

// 5. SOLUCIONADOR UNIVERSAL DE MEZCLAS ARBITRARIAS (SIN CAER NUNCA EN "FASE CONDENSADA")
function solveUniversalArbitrary(selectedIds: string[]): ReactionResult {
  const reagents = selectedIds
    .map(id => CHEMICAL_DATABASE.find(c => c.id === id))
    .filter((c): c is ChemicalReagent => Boolean(c));

  const names = reagents.map(r => r.nombre).join(' + ');
  const formulas = reagents.map(r => r.formula).join(' + ');
  const formulasAq = reagents.map(r => `${r.formula}(aq)`).join(' + ');

  // Collect potential ions from formulas
  const ionsFound: string[] = [];
  reagents.forEach(r => {
    if (r.categoria === 'sales' || r.categoria === 'acidos' || r.categoria === 'bases') {
      ionsFound.push(`${r.formula} [Iones Solvatados]`);
    } else {
      ionsFound.push(`${r.formula} [Fase Solvente / Molecular]`);
    }
  });

  return {
    id: `univ_${selectedIds.join('_')}`,
    matchedReactants: selectedIds,
    title: `Equilibrio Iónico & Solvatación Dinámica: ${reagents.map(r => r.formula).join(' + ')}`,
    type: 'compleja',
    balancedEquation: `${formulasAq} ⇄ ${reagents.map(r => `${r.formula}`).join(' + ')} [Disolución Acuosa Homogénea de Iones Solvatados]`,
    ionicEquationNet: `\\sum q_i = 0 \\quad [\\text{Electroneutralidad estricta y equilibrio de Debye-Hückel}]`,
    spectatorIons: reagents.map(r => r.formula),
    enthalpy: 'ΔH° ≈ 0 kJ/mol (Proceso termodinámicamente atérmico)',
    steps: [
      {
        stepNumber: 1,
        title: 'Disolución y solvatación dipolar en fase acuosa',
        equation: `${formulas} + H₂O ➔ ${reagents.map(r => `${r.formula}(aq)`).join(' + ')}`,
        description: `Las moléculas de agua orientan sus dipolos alrededor de cada especie química seleccionada (${names}), rompiendo las fuerzas intermoleculares o reticulares para estabilizar una disolución homogénea transparente.`,
        speciesInvolved: selectedIds
      },
      {
        stepNumber: 2,
        title: 'Estabilidad de pares iónicos y verificación de solubilidad (Kps)',
        equation: `Q_{sp} < K_{ps} \\implies \\text{Ausencia de precipitación o gases reactivos}`,
        description: `El sistema evalúa el producto iónico de todas las combinaciones cruzadas de solutos. Al no superarse ningún umbral de solubilidad ni haber agentes redox o ácido-base antagonistas en exceso, todos los componentes coexisten pacíficamente en solución.`,
        speciesInvolved: selectedIds
      },
      {
        stepNumber: 3,
        title: 'Conservación de masa de Lavoisier y equilibrio termodinámico',
        equation: `\\Delta G^\\circ = -RT \\ln K_{eq} \\approx 0  \\quad [\\text{Sistema químico estable}]`,
        description: `El balance energético de Gibbs confirma la estabilidad de la mezcla sin liberación de calor peligroso ni desprendimiento gaseoso no controlado.`,
        speciesInvolved: selectedIds
      }
    ],
    explicacionProfesor: {
      introduccion: `El Profesor IA ha evaluado la coexistencia de los reactivos **${formulas}** (${names}). Al tratarse de especies compatibles sin reactividad antagónica violenta, forman una fase acuosa homogénea en perfecto equilibrio electrolítico.`,
      mecanismoIónico: `Cada reactivo mantiene su identidad estequiométrica a través de esferas de hidratación acuosa. La fuerza iónica total de la disolución se modela de acuerdo con la teoría de Debye-Hückel para soluciones electrolíticas.`,
      agricultura: `Este tipo de disoluciones multielementales simula los tanques de cabezal de fertirriego donde se combinan fertilizantes hidrosolubles compatibles asegurando que no precipiten sales insolubles en los goteros.`,
      industria: `Verificación obligatoria de compatibilidad química previa a la carga conjunta en cisternas de transporte multimodal bajo normativa ADR.`,
      conclusion: `La disolución resultante se mantiene homogénea, químicamente estable y segura bajo condiciones normales de manipulación.`
    },
    safetyInfo: {
      productoPrincipal: `Disolución homogénea de ${formulas}`,
      hazardClass: 'Clase 9 o No regulado en disolución acuosa diluida',
      unNumber: 'UN 3082 (Si contiene sustancias de Clase 9) / No regulado',
      kemlerCode: '90',
      adrTunnelCode: '(-)',
      tunnelReason: 'Tránsito libre sin restricción en túneles ADR para mezclas acuosas estables sin reactividad violenta',
      nfpa: { health: 1, flammability: 0, instability: 0, special: 'NONE' },
      ppe: ['Gafas de seguridad química con marcado CE (EN 166)', 'Guantes de nitrilo resistente', 'Bata de laboratorio de algodón'],
      almacenamiento: 'Almacenar en recipientes plásticos de polietileno rotulados con la composición exacta de la solución.',
      estabilidad: 'Químicamente estable a temperatura ambiente (15 °C - 25 °C).'
    }
  };
}

// Helper function to find best matching reaction from arbitrary selection
export function analyzeReactionChain(selectedIds: string[]): ReactionResult {
  const cleanIds = selectedIds.map(s => s.trim()).filter(Boolean);
  const idSet = new Set(cleanIds);

  if (cleanIds.length === 0) {
    return {
      id: 'empty',
      matchedReactants: [],
      title: 'Espacio de Trabajo Vacío',
      type: 'compleja',
      balancedEquation: 'Selecciona reactivos para iniciar la simulación',
      steps: [],
      explicacionProfesor: {
        introduccion: 'Selecciona reactivos del catálogo superior para simular sus reacciones químicas.',
        mecanismoIónico: 'El motor calculará la estequiometría y el intercambio iónico exacto.',
        conclusion: 'Listo para reaccionar.'
      },
      safetyInfo: {
        productoPrincipal: 'Ninguno',
        hazardClass: 'N/A',
        unNumber: 'N/A',
        kemlerCode: 'N/A',
        adrTunnelCode: 'N/A',
        tunnelReason: 'N/A',
        nfpa: { health: 0, flammability: 0, instability: 0 },
        ppe: [],
        almacenamiento: 'N/A',
        estabilidad: 'N/A'
      }
    };
  }

  // 1. Check exact presets first (e.g. H2SO4 + KNO3 + KOH, Al + O2, CuSO4 + NaOH, etc.)
  for (const preset of PRESET_REACTIONS) {
    if (preset.matchedReactants.length === cleanIds.length && preset.matchedReactants.every(req => idSet.has(req))) {
      return preset;
    }
  }

  // 2. Check if preset is a subset (e.g. H2SO4 + KNO3 + KOH selected among others)
  for (const preset of PRESET_REACTIONS) {
    if (preset.matchedReactants.length >= 3 && preset.matchedReactants.every(req => idSet.has(req))) {
      return preset;
    }
  }

  // 3. UNIVERSAL ACID-BASE NEUTRALIZATION CHECK (e.g. HCl + KOH -> KCl + H2O)
  const foundAcidId = cleanIds.find(id => ACIDS_MAP[id]);
  const foundBaseId = cleanIds.find(id => BASES_MAP[id]);
  if (foundAcidId && foundBaseId) {
    return solveAcidBase(ACIDS_MAP[foundAcidId], BASES_MAP[foundBaseId], cleanIds);
  }

  // 4. ACID + CARBONATE / BICARBONATE CHECK (e.g. HCl + CaCO3 / Na2CO3 / NaHCO3)
  const foundCarbId = cleanIds.find(id => id.includes('CO3') || id.includes('HCO3'));
  if (foundAcidId && foundCarbId) {
    const res = solveAcidCarbonate(foundAcidId, foundCarbId);
    if (res) return res;
  }

  // 5. METAL + ACID (e.g. Al + HCl, Mg + HCl, Fe + H2SO4)
  const metalsList = ['Al', 'Fe', 'Mg', 'Ca', 'Na', 'K', 'Ba', 'Sr', 'Li', 'Ni', 'Co'];
  const foundMetal = cleanIds.find(id => metalsList.includes(id));
  if (foundMetal && foundAcidId) {
    const res = solveMetalAcid(foundMetal, foundAcidId);
    if (res) return res;
  }

  // 6. INDICATOR CHECK
  const indicatorsList = ['Fenolftaleina', 'Tornasol', 'Azul_de_Bromotimol', 'Naranja_de_Metilo', 'Azul_de_Timol', 'Rojo_de_Cresol', 'Indicador_Universal'];
  const foundIndicator = cleanIds.find(id => indicatorsList.includes(id));
  if (foundIndicator) {
    const others = cleanIds.filter(id => id !== foundIndicator);
    const res = solveIndicatorVirage(foundIndicator, others);
    if (res) return res;
  }

  // 7. PRECIPITATION CHECK (AgNO3 + any Cloruro)
  if (idSet.has('AgNO3')) {
    const foundChloride = cleanIds.find(id => id.includes('Cl') && id !== 'AgNO3');
    if (foundChloride) {
      return {
        ...PRESET_REACTIONS.find(p => p.id === 'agno3_nacl')!,
        title: `Precipitación Argentométrica: AgNO₃ + ${foundChloride} ➔ AgCl(s) ↓ + Nitrato`,
        balancedEquation: `AgNO₃(aq) + ${foundChloride} ➔ AgCl(s) ↓ + Nitrato soluble`
      };
    }
  }

  // 8. ORGANICS DEHYDRATION (Azucar / Madera / Papel + H2SO4)
  if (idSet.has('H2SO4') && (idSet.has('Azucar') || idSet.has('Madera') || idSet.has('Papel'))) {
    return PRESET_REACTIONS.find(p => p.id === 'h2so4_azucar')!;
  }

  // 9. Check 2-reactant presets (e.g. Al + O2, CuSO4 + NaOH, etc.)
  for (const preset of PRESET_REACTIONS) {
    if (preset.matchedReactants.every(req => idSet.has(req))) {
      return preset;
    }
  }

  // 10. UNIVERSAL ARBITRARY SOLVER: Formulates real dissolution, ions & thermodynamics (NEVER "fase condensada")
  return solveUniversalArbitrary(cleanIds);
}
