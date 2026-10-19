import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, ShieldAlert, Award, Truck, Flame, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

interface Scenario {
  id: number;
  title: string;
  category: string;
  description: string;
  timeLimit: number;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: 'Derrame de Ácido Sulfúrico Concentrado en Muelle Agrícola',
    category: 'Seguridad Química & Neutralización',
    description: 'Un contenedor cisterna de H₂SO₄ al 98% ha sufrido una fuga de 800L en el muelle de carga de fertilizantes. Hay riesgo de vapores deshidratantes y contacto con materiales orgánicos.',
    timeLimit: 25,
    question: '¿Cuál es el protocolo estricto de EPP y neutralización segura según la normativa Espiquumeyria?',
    options: [
      {
        id: 'A',
        text: 'Lanzar agua a presión para diluir el ácido rápidamente con guantes de látex.',
        isCorrect: false,
        explanation: '¡PELIGRO EXTREMO! La adición directa de agua a ácido sulfúrico concentrado genera una reacción violentamente exotérmica que proyecta ácido hirviendo y vapores corrosivos (Regla de oro: "Nunca des de beber al ácido").'
      },
      {
        id: 'B',
        text: 'EPP Nivel B (Traje de viton/butilo + respirador gases B/P3) y neutralizar gradualmente con Cal Apagada (Ca(OH)₂) en seco.',
        isCorrect: true,
        explanation: '¡CORRECTO! El hidróxido de calcio neutraliza el ácido formando sulfato de calcio insoluble (yeso) sin desprendimiento violento ni proyecciones líquidas incontroladas.'
      },
      {
        id: 'C',
        text: 'Añadir sodio metálico para secar la humedad del suelo con gafas de sol.',
        isCorrect: false,
        explanation: '¡ERROR CATASTRÓFICO! El sodio metálico reacciona violentamente con ácidos desprendiendo hidrógeno gaseoso que detonaría de inmediato.'
      }
    ]
  },
  {
    id: 2,
    title: 'Planificación de Ruta ADR: Transporte de Ácido Nítrico y Nitrato de Potasio',
    category: 'Logística de Túneles ADR',
    description: 'Un convoy de transporte transporta Ácido Nítrico concentrado (UN 2031, ADR Código de Túnel (E)) y Nitrato de Potasio comburente (UN 1486, Código (E)) hacia una central de fertirriego.',
    timeLimit: 25,
    question: 'En la cordillera hay 3 opciones de cruce. ¿Cuál es la única ruta legalmente autorizada bajo el Acuerdo ADR?',
    options: [
      {
        id: 'A',
        text: 'Túnel Central "Metrópolis" (Categoría E, túnel largo de alta afluencia urbana).',
        isCorrect: false,
        explanation: '¡PROHIBIDO! Los códigos (E) prohíben taxativamente el paso de mercancías peligrosas en cualquier cantidad a través de túneles clasificados como Categoría E.'
      },
      {
        id: 'B',
        text: 'Paso por Puerto de Montaña Abierto (Categoría A / Sin Restricción de Túnel) o Túnel Categoría B con desvío periférico.',
        isCorrect: true,
        explanation: '¡CORRECTO! Las mercancías con código (E) pueden circular por carreteras abiertas, túneles de Categoría A (sin restricción) o túneles de Categorías B, C y D siempre que no coincidan con su limitación específica.'
      },
      {
        id: 'C',
        text: 'Ocultar las placas naranjas ADR antes de ingresar a la galería de túnel E para evitar multas.',
        isCorrect: false,
        explanation: '¡INFRACCIÓN PENAL GRAVÍSIMA! Ocultar la señalización ADR pone en riesgo letal a los equipos de emergencia y a todos los usuarios de la vía pública.'
      }
    ]
  },
  {
    id: 3,
    title: 'Horno de Plasma a 2,050 °C: Cristalización de Rubíes en Alúmina',
    category: 'Mineralogía & Síntesis Cristalina',
    description: 'En el reactor mineralógico de Espiquumeyria se ha fundido aluminio puro con oxígeno molecular (4Al + 3O₂ ➔ 2Al₂O₃), alcanzando la masa vítrea de corindón puro.',
    timeLimit: 25,
    question: '¿Qué dopante atómico específico debes inyectar en la red cristalina para sintetizar un auténtico Rubí de grado gemológico?',
    options: [
      {
        id: 'A',
        text: 'Inyectar trazas de Cromo trivalente (Cr³⁺) en sustitución isomórfica de cationes Al³⁺.',
        isCorrect: true,
        explanation: '¡ÉXITO MINERALÓGICO! Los iones Cr³⁺ ocupan huecos octaédricos en el corindón Al₂O₃, absorbiendo luz en el verde-azul por campo cristalino y emitiendo el deslumbrante rojo sangre característico del Rubí.'
      },
      {
        id: 'B',
        text: 'Inyectar azúcar y celulosa para quemar el residuo.',
        isCorrect: false,
        explanation: 'Los compuestos orgánicos se incinerarían a 2,050 °C produciendo hollín que arruinaría la transparencia óptica del cristal.'
      },
      {
        id: 'C',
        text: 'Inyectar mercurio líquido con agua salina fría.',
        isCorrect: false,
        explanation: 'Provocaría una explosión de vapor por choque térmico destrozando el crisol cerámico de alta temperatura.'
      }
    ]
  }
];

export const ChemicalGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [gameState, setGameState] = useState<'title' | 'playing' | 'feedback' | 'victory' | 'gameover'>('title');
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Web Audio synth for sounds
  const playSynthSound = (type: 'start' | 'correct' | 'wrong' | 'tick' | 'victory') => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'tick') {
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'correct') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.25);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'start') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'victory') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.15); // A5
        osc.frequency.setValueAtTime(1174.66, now + 0.3); // D6
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        osc.start(now);
        osc.stop(now + 0.7);
      }
    } catch {
      // AudioContext not allowed or disabled
    }
  };

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
        if (timeLeft <= 5) playSynthSound('tick');
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      handleTimeout();
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  const startGame = () => {
    playSynthSound('start');
    setGameState('playing');
    setCurrentScenarioIdx(0);
    setScore(0);
    setTimeLeft(SCENARIOS[0].timeLimit);
    setSelectedOption(null);
  };

  const handleTimeout = () => {
    playSynthSound('wrong');
    setSelectedOption('TIMEOUT');
    setGameState('feedback');
  };

  const handleSelectAnswer = (optionId: string) => {
    if (gameState !== 'playing') return;
    const scenario = SCENARIOS[currentScenarioIdx];
    const opt = scenario.options.find((o) => o.id === optionId);
    setSelectedOption(optionId);

    if (opt?.isCorrect) {
      playSynthSound('correct');
      setScore((prev) => prev + 100 + timeLeft * 5);
    } else {
      playSynthSound('wrong');
    }

    setGameState('feedback');
  };

  const handleNextScenario = () => {
    if (currentScenarioIdx + 1 < SCENARIOS.length) {
      const nextIdx = currentScenarioIdx + 1;
      setCurrentScenarioIdx(nextIdx);
      setTimeLeft(SCENARIOS[nextIdx].timeLimit);
      setSelectedOption(null);
      setGameState('playing');
    } else {
      playSynthSound('victory');
      setGameState('victory');
    }
  };

  const currentScenario = SCENARIOS[currentScenarioIdx];
  const chosenOpt = currentScenario?.options.find((o) => o.id === selectedOption);

  return (
    <div className="fixed inset-0 z-50 bg-[#080d14]/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
      {/* Top Bar for Game */}
      <div className="w-full max-w-4xl flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
            Espiquumeyria Emergency Protocol Simulator
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs"
            title={isMuted ? 'Activar sonido synth' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
          >
            Salir al Panel
          </button>
        </div>
      </div>

      {/* Main Game Frame */}
      <div className="w-full max-w-3xl bg-[#0b111a] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-between">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Title Screen */}
        {gameState === 'title' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
              <ShieldAlert className="w-10 h-10 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Módulo Interactivo de Certificación
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Protocolo de Emergencia & Logística Química
              </h1>
              <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                Asume el control del laboratorio y de la flota de transporte de sustancias peligrosas. Enfréntate a derrames de ácidos minerales, rutas restringidas por túneles ADR y síntesis exotérmicas de alúmina y gemas.
              </p>
            </div>

            <div className="text-xs font-mono text-slate-500 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-800">
              3 Escenarios Críticos • Límite de Tiempo • Calificación Oficial Espiquumeyria
            </div>

            <button
              onClick={startGame}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/20 active:scale-95 transition flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Comenzar Simulación</span>
            </button>
          </div>
        )}

        {/* 2. Playing Stage */}
        {gameState === 'playing' && currentScenario && (
          <div className="flex-1 flex flex-col justify-between space-y-4">
            {/* HUD Status Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
              <span className="text-cyan-400 font-bold">
                ESCENARIO {currentScenarioIdx + 1} DE {SCENARIOS.length} • {currentScenario.category}
              </span>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-0.5 rounded font-bold ${timeLeft <= 5 ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-slate-800 text-slate-300'}`}>
                  TIEMPO: {timeLeft}s
                </span>
                <span className="text-emerald-400 font-bold">
                  PUNTOS: {score}
                </span>
              </div>
            </div>

            {/* Scenario Header */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">{currentScenario.title}</h3>
              <p className="text-xs text-slate-300 bg-[#070b12] p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                {currentScenario.description}
              </p>
            </div>

            {/* Question */}
            <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-lg p-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-1">
                Pregunta Táctica:
              </span>
              <p className="text-xs font-semibold text-white">{currentScenario.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentScenario.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectAnswer(opt.id)}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-[#070b12] hover:bg-[#0f1724] hover:border-cyan-500/50 text-slate-200 text-xs transition flex items-start gap-3 group"
                >
                  <span className="w-5 h-5 rounded-md bg-slate-800 group-hover:bg-cyan-500 group-hover:text-black font-mono font-bold flex items-center justify-center shrink-0 transition">
                    {opt.id}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. Feedback Stage */}
        {gameState === 'feedback' && currentScenario && (
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className="text-center py-2">
              {chosenOpt?.isCorrect ? (
                <div className="inline-flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" /> PROTOCOLO CORRECTAMENTE EJECUTADO (+{100 + timeLeft * 5} pts)
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 text-red-400 font-mono font-bold text-sm bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/30">
                  <XCircle className="w-4 h-4" /> ERROR DE PROCEDIMIENTO O TIEMPO AGOTADO
                </div>
              )}
            </div>

            <div className="bg-[#070b12] border border-slate-800 rounded-xl p-4 space-y-3 text-xs leading-relaxed">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block font-bold">
                Dictamen Técnico del Profesor IA:
              </span>
              <p className="text-slate-200">
                {chosenOpt?.explanation || 'El tiempo de respuesta del operador ha expirado sin aplicar la medida de contención.'}
              </p>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={handleNextScenario}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider shadow-md transition"
              >
                {currentScenarioIdx + 1 < SCENARIOS.length ? 'Siguiente Escenario ➔' : 'Ver Calificación Final ➔'}
              </button>
            </div>
          </div>
        )}

        {/* 4. Victory / Summary Screen */}
        {gameState === 'victory' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Certificación Completada</span>
              <h3 className="text-2xl font-bold text-white">Evaluación Final de Seguridad Química</h3>
              <p className="text-xs text-slate-400">Puntaje total alcanzado: <strong className="text-emerald-400 font-mono text-sm">{score} puntos</strong></p>
            </div>

            <div className="bg-[#070b12] border border-slate-800 rounded-xl p-4 max-w-md text-xs text-slate-300 leading-relaxed text-left font-mono">
              <p className="text-cyan-300 font-bold mb-1">Dictamen de Espiquumeyria:</p>
              Has demostrado competencia operativa en la neutralización de reactivos agresivos, cumplimiento riguroso de los códigos de túneles ADR (E) y comprensión de la síntesis de minerales de alta gama a partir de alúmina.
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={startGame}
                className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reintentar Simulación
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider transition"
              >
                Regresar al Laboratorio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
