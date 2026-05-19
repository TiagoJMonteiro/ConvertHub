import React, { useState } from 'react';
import ToolPageWrapper from '../components/ToolPageWrapper';
import { SwapIcon } from '../components/Icons';

const UnitConverter = ({ tool }) => {
  const [valFrom, setValFrom] = useState(1);
  const [swapped, setSwapped] = useState(false);

  const currentFrom = swapped ? tool.to : tool.from;
  const currentTo = swapped ? tool.from : tool.to;
  const factor = tool.factor;
  const valTo = swapped ? valFrom / factor : valFrom * factor;

  const handleSwap = () => {
    setSwapped(!swapped);
    setValFrom(valTo);
  };

  return (
    <ToolPageWrapper tool={tool}>
      <div className="bg-white p-8 rounded-2xl border border-zinc-200 dark:bg-dark-card dark:border-dark-border max-w-3xl flex flex-col sm:flex-row items-center gap-5 shadow-sm">
        <div className="flex-1 w-full space-y-2.5">
          <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-500">FROM ({currentFrom})</label>
          <input 
            type="number" 
            value={valFrom} 
            onChange={e => setValFrom(parseFloat(e.target.value) || 0)} 
            className="w-full h-16 text-3xl font-bold px-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-dark-border text-zinc-950 dark:text-zinc-50 focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all" 
          />
        </div>
        
        <button onClick={handleSwap} className="mt-6 sm:mt-8 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group transition-colors">
          <SwapIcon className="group-hover:rotate-180 transition-transform duration-300" />
        </button>
        
        <div className="flex-1 w-full space-y-2.5">
          <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-500">TO ({currentTo})</label>
          <input 
            type="text" 
            readOnly 
            value={valTo.toFixed(4)} 
            className="w-full h-16 text-3xl font-bold px-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-dark-border text-primary outline-none" 
          />
        </div>
      </div>
    </ToolPageWrapper>
  );
};

export default UnitConverter;