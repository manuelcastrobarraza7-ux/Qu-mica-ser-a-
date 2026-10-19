import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Brain, Loader2, Bot, User, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export const ProfessorChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: `¡Saludos! Soy el **Profesor IA de Espiquumeyria**, tu tutor científico omnisciente adaptativo.
Mi conocimiento abarca desde la química analítica y de procesos (mecanismos iónicos, fertilizantes libres de cloruros como $K_2SO_4$ y $KNO_3$, mineralogía de alúmina y corindón, fichas NFPA y códigos de túneles ADR) hasta los dominios más avanzados de la física: mecánica cuántica, astrofísica termonuclear, objetos subestelares como enanas marrones y cosmología relativista.

¿Qué fenómeno, reacción o concepto científico deseas desentrañar hoy?`
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useHighThinking, setUseHighThinking] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    '¿Por qué el K₂SO₄ y KNO₃ son indispensables en agricultura frente al KCl?',
    '¿Cómo los iones Cr³⁺ y pares Fe²⁺/Ti⁴⁺ en la red de Al₂O₃ dan origen al rubí y al zafiro?',
    '¿Cómo funciona la restricción de túneles ADR para ácido nítrico (UN 2031, Código E)?',
    'Explica la fusión de deuterio en enanas marrones y la presión de degeneración.',
    'Diferencia entre entrelazamiento cuántico y enlaces químicos covalentes.'
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          useHighThinking,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.reply || 'Sin respuesta del Profesor.';
        setMessages((prev) => [...prev, { role: 'model', content: reply }]);

        // Optional speech synthesis if unmuted
        if (!isMuted && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const cleanText = reply.replace(/[$#*_`]/g, '').slice(0, 300);
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.lang = 'es-ES';
          utterance.rate = 1.05;
          window.speechSynthesis.speak(utterance);
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            content: `Error al contactar con el modelo: ${errData.error || 'Respuesta inválida del servidor.'}`
          }
        ]);
      }
    } catch (err: unknown) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: 'No se pudo establecer conexión con el motor de inferencia. Por favor revisa la consola o intenta de nuevo.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setMessages([
      {
        role: 'model',
        content: `¡Bienvenido de nuevo a la cátedra de Espiquumeyria! Pregúntame sobre cualquier reacción química, protocolo de transporte peligroso, agricultura de precisión o fundamentos de la física teórica y cuántica.`
      }
    ]);
  };

  return (
    <div className="bg-[#0b111a] border border-cyan-500/20 rounded-xl p-4 shadow-xl flex flex-col h-[700px] relative overflow-hidden">
      {/* Top Header */}
      <div className="border-b border-slate-800 pb-3 mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              Profesor IA Omnisciente
              <span className="text-[10px] text-cyan-400 font-normal">
                {useHighThinking ? 'Gemini 4 Argon (High Thinking)' : 'Gemini 3.8 Flash'}
              </span>
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">
              Física, Química, Mineralogía, Astrofísica y Logística Espiquumeyria
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Thinking Toggle */}
          <button
            onClick={() => setUseHighThinking(!useHighThinking)}
            className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition border ${
              useHighThinking
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Activa el razonamiento profundo en alta fidelidad"
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Thinking: {useHighThinking ? 'HIGH' : 'OFF'}</span>
          </button>

          {/* Audio voice toggle */}
          <button
            onClick={() => {
              if (!isMuted && 'speechSynthesis' in window) window.speechSynthesis.cancel();
              setIsMuted(!isMuted);
            }}
            className={`p-1.5 rounded text-xs transition border ${
              !isMuted
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title={isMuted ? 'Activar voz del profesor' : 'Silenciar voz'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Reset button */}
          <button
            onClick={resetChat}
            className="p-1.5 rounded text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
            title="Reiniciar conversación"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Suggested prompts chips */}
      <div className="mb-2 flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
        <span className="text-slate-500 text-[10px] uppercase whitespace-nowrap">Temas clave:</span>
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 whitespace-nowrap transition text-left"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 font-sans text-xs">
        {messages.map((m, idx) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={idx}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-xl p-3.5 leading-relaxed text-xs shadow-md whitespace-pre-wrap ${
                  isUser
                    ? 'bg-cyan-600 text-white font-medium rounded-tr-none'
                    : 'bg-[#070b12] text-slate-200 border border-slate-800/90 rounded-tl-none font-mono text-[11.5px]'
                }`}
              >
                {m.content}
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-2.5 items-center text-slate-400 text-xs font-mono">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shrink-0">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <span className="italic">El Profesor IA está calculando la derivación con rigor científico...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder="Pregunta al Profesor (ej. ¿Por qué K₂SO₄ no daña raíces sensibles a salinidad?)"
          disabled={isLoading}
          className="flex-1 bg-[#070b12] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 font-sans transition"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim() || isLoading}
          className={`p-2 rounded-lg text-black transition ${
            !inputQuery.trim() || isLoading
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-cyan-500 hover:bg-cyan-400 shadow-md shadow-cyan-500/20'
          }`}
          title="Enviar consulta"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
