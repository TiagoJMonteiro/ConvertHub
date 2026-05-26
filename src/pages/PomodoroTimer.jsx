import React, { useState, useEffect } from 'react';
import ToolPageWrapper from '../components/ToolPageWrapper';

const PomodoroTimer = ({ tool }) => {
  const [mode, setMode] = useState('work'); // 'work' ou 'break'
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Começa com 25 minutos
  const [isActive, setIsActive] = useState(false);

  // O motor do relógio: Corre a cada segundo se estiver activo
  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Aqui podias adicionar um som a tocar!
    }
    
    return () => clearInterval(interval); // Limpa o intervalo para não crashar a app
  }, [isActive, timeLeft]);

  // Função para formatar os segundos em MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Muda entre Trabalho (25m) e Pausa (5m)
  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  return (
    <ToolPageWrapper tool={tool}>
      <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-10 rounded-3xl border border-zinc-200/50 dark:border-white/10 max-w-xl mx-auto shadow-sm text-center">
        
        {/* Separadores (Trabalho vs Pausa) */}
        <div className="flex justify-center gap-4 mb-10">
          <button 
            onClick={() => switchMode('work')}
            className={`px-6 py-2.5 rounded-full font-bold transition-colors ${mode === 'work' ? 'bg-rose-500 text-white' : 'bg-zinc-100 dark:bg-white/5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            Foco (25m)
          </button>
          <button 
            onClick={() => switchMode('break')}
            className={`px-6 py-2.5 rounded-full font-bold transition-colors ${mode === 'break' ? 'bg-emerald-500 text-white' : 'bg-zinc-100 dark:bg-white/5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            Pausa (5m)
          </button>
        </div>

        {/* Mostrador do Relógio */}
        <div className="relative flex justify-center items-center py-10">
          {/* Brilho de fundo condicional */}
          <div className={`absolute w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20 ${mode === 'work' ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
          
          <h2 className="text-8xl md:text-9xl font-extrabold tracking-tighter text-zinc-950 dark:text-zinc-50 relative z-10 tabular-nums">
            {formatTime(timeLeft)}
          </h2>
        </div>

        {/* Botões de Controlo */}
        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={() => setIsActive(!isActive)} 
            className={`px-10 py-4 rounded-2xl font-extrabold text-xl transition-all shadow-lg text-white ${isActive ? 'bg-zinc-800 hover:bg-zinc-700' : mode === 'work' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
          >
            {isActive ? 'PAUSAR' : 'INICIAR'}
          </button>
          <button 
            onClick={resetTimer}
            className="px-6 py-4 rounded-2xl font-bold bg-zinc-200 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-white/20 transition-all"
          >
            Reset
          </button>
        </div>

      </div>
    </ToolPageWrapper>
  );
};

export default PomodoroTimer;