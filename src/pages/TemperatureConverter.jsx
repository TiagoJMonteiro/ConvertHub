import React, { useState } from 'react';
import ToolPageWrapper from '../components/ToolPageWrapper';
import { SwapIcon } from '../components/Icons';

const TemperatureConverter = ({ tool }) => {
  const [valFrom, setValFrom] = useState(0);
  const [isCelsiusToFahrenheit, setIsCelsiusToFahrenheit] = useState(true);

  const currentFrom = isCelsiusToFahrenheit ? 'Celsius' : 'Fahrenheit';
  const currentTo = isCelsiusToFahrenheit ? 'Fahrenheit' : 'Celsius';
  
  const valTo = isCelsiusToFahrenheit 
    ? (valFrom * 9/5) + 32 
    : (valFrom - 32) * 5/9;

  const handleSwap = () => {
    setIsCelsiusToFahrenheit(!isCelsiusToFahrenheit);
    setValFrom(parseFloat(valTo.toFixed(2)));
  };

  return (
    <ToolPageWrapper tool={tool}>
      <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 max-w-3xl flex flex-col sm:flex-row items-center gap-5 shadow-sm">
        <div className="flex-1 w-full space-y-2.5">
          <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-500">FROM ({currentFrom})</label>
          <input type="number" value={valFrom} onChange={e => setValFrom(parseFloat(e.target.value) || 0)} className="w-full h-16 text-3xl font-bold px-6 rounded-xl bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/5 text-zinc-950 dark:text-zinc-50 focus:ring-2 focus:ring-primary/40 outline-none transition-all" />
        </div>
        <button onClick={handleSwap} className="mt-6 sm:mt-8 p-3 rounded-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 transition-all">
          <SwapIcon className="hover:rotate-180 transition-transform duration-300" />
        </button>
        <div className="flex-1 w-full space-y-2.5">
          <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-500">TO ({currentTo})</label>
          <input type="text" readOnly value={valTo.toFixed(2)} className="w-full h-16 text-3xl font-bold px-6 rounded-xl bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/5 text-primary outline-none" />
        </div>
      </div>
    </ToolPageWrapper>
  );
};

export default TemperatureConverter;