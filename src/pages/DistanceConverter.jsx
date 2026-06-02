import React, { useState } from 'react';
import ToolPageWrapper from '../components/ToolPageWrapper';
import { SwapIcon } from '../components/Icons';

// Dicionário de unidades com a sua taxa de conversão relativa a 1 Metro

const units = {
  mm: { name: 'Milímetros (mm)', rate: 0.001, sys: 'metric' },
  cm: { name: 'Centímetros (cm)', rate: 0.01, sys: 'metric' },
  m: { name: 'Metros (m)', rate: 1, sys: 'metric' },
  km: { name: 'Quilómetros (km)', rate: 1000, sys: 'metric' },
  in: { name: 'Polegadas (in)', rate: 0.0254, sys: 'imperial' },
  ft: { name: 'Pés (ft)', rate: 0.3048, sys: 'imperial' },
  yd: { name: 'Jardas (yd)', rate: 0.9144, sys: 'imperial' },
  mi: { name: 'Milhas (mi)', rate: 1609.344, sys: 'imperial' },
};

const DistanceConverter = ({ tool }) => {
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('km');
  const [to, setTo] = useState('mi');

  const numAmount = parseFloat(amount) || 0;
  
  // Lógica: Converte para a unidade base (Metro) e depois para o destino
  const valueInMeters = numAmount * units[from].rate;
  const result = valueInMeters / units[to].rate;

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <ToolPageWrapper tool={tool}>
      <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 max-w-3xl space-y-8 shadow-sm">
        
        {/* Input do Valor */}
        <div className="space-y-2.5">
          <label className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Valor a converter</label>
          <input 
            type="number" 
            value={amount} 
            onChange={e => setAmount(e.target.value)} 
            className="w-full h-14 text-lg px-5 rounded-xl bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/10 text-zinc-950 dark:text-zinc-50 focus:ring-2 focus:ring-primary/40 outline-none transition-all" 
          />
        </div>

        {/* Seletores de Unidade */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          
          <div className="flex-1 w-full space-y-2.5">
            <label className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">De</label>
            <select 
              value={from} 
              onChange={e => setFrom(e.target.value)}
              className="w-full h-14 px-4 rounded-xl bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/10 text-zinc-950 dark:text-zinc-50 outline-none cursor-pointer"
            >
              {/* Grupo: Sistema Métrico */}
              <optgroup label="Sistema Métrico" className="text-zinc-500 font-semibold bg-zinc-100 dark:bg-zinc-900">
                {Object.entries(units).filter(([_, data]) => data.sys === 'metric').map(([key, data]) => (
                  <option key={key} value={key} className="text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 font-medium">{data.name}</option>
                ))}
              </optgroup>
              
              {/* Grupo: Sistema Imperial */}
              <optgroup label="Sistema Imperial" className="text-zinc-500 font-semibold bg-zinc-100 dark:bg-zinc-900">
                {Object.entries(units).filter(([_, data]) => data.sys === 'imperial').map(([key, data]) => (
                  <option key={key} value={key} className="text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 font-medium">{data.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          <button onClick={handleSwap} className="mt-8 p-3 rounded-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 group transition-all">
            <SwapIcon className="group-hover:rotate-180 transition-transform duration-300" />
          </button>

          <div className="flex-1 w-full space-y-2.5">
            <label className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Para</label>
            <select 
              value={to} 
              onChange={e => setTo(e.target.value)}
              className="w-full h-14 px-4 rounded-xl bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/10 text-zinc-950 dark:text-zinc-50 outline-none cursor-pointer"
            >
              {/* Grupo: Sistema Métrico */}
              <optgroup label="Sistema Métrico" className="text-zinc-500 font-semibold bg-zinc-100 dark:bg-zinc-900">
                {Object.entries(units).filter(([_, data]) => data.sys === 'metric').map(([key, data]) => (
                  <option key={key} value={key} className="text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 font-medium">{data.name}</option>
                ))}
              </optgroup>
              
              {/* Grupo: Sistema Imperial */}
              <optgroup label="Sistema Imperial" className="text-zinc-500 font-semibold bg-zinc-100 dark:bg-zinc-900">
                {Object.entries(units).filter(([_, data]) => data.sys === 'imperial').map(([key, data]) => (
                  <option key={key} value={key} className="text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 font-medium">{data.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

        </div>

        {/* Caixa de Resultado */}
        <div className="mt-8 p-8 rounded-2xl bg-white/50 dark:bg-black/20 border border-zinc-200 dark:border-white/5 flex flex-col justify-center space-y-2 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
           
           <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium z-10">{numAmount} {units[from].name} =</p>
           
           <h2 className="text-4xl sm:text-5xl font-extrabold text-primary z-10 break-all">
             {result % 1 === 0 ? result : result.toFixed(4)} <span className="text-2xl text-zinc-950 dark:text-zinc-50">{to}</span>
           </h2>
        </div>

      </div>
    </ToolPageWrapper>
  );
};

export default DistanceConverter;