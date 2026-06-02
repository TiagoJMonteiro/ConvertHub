import React, { useState, useRef, useEffect } from 'react';
import ToolPageWrapper from '../components/ToolPageWrapper';
import { SwapIcon } from '../components/Icons';
import { Search, ChevronDown } from 'lucide-react';


const currencies = {
  USD: { name: 'US Dollar', rate: 1.0 },
  EUR: { name: 'Euro', rate: 0.92 },
  GBP: { name: 'British Pound', rate: 0.79 },
  JPY: { name: 'Japanese Yen', rate: 151.20 },
  CAD: { name: 'Canadian Dollar', rate: 1.36 },
  AUD: { name: 'Australian Dollar', rate: 1.52 },
  CHF: { name: 'Swiss Franc', rate: 0.90 },
  CNY: { name: 'Chinese Yuan', rate: 7.23 },
  INR: { name: 'Indian Rupee', rate: 83.35 },
  BRL: { name: 'Brazilian Real', rate: 5.05 },
  MXN: { name: 'Mexican Peso', rate: 16.50 },
  ZAR: { name: 'South African Rand', rate: 18.90 },
};


const SearchableSelect = ({ value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (event) => { if (ref.current && !ref.current.contains(event.target)) setIsOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  const filteredCurrencies = Object.entries(currencies).filter(([code, data]) => 
    code.toLowerCase().includes(search.toLowerCase()) || data.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 w-full space-y-2.5" ref={ref}>
      <label className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{label}</label>
      <div className="relative">
      
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full h-14 px-5 rounded-xl bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/10 text-zinc-950 dark:text-zinc-50 cursor-pointer hover:border-primary/50 transition-colors"
        >
          <span className="font-medium">{value} - {currencies[value].name}</span>
          <ChevronDown className="w-5 h-5 text-zinc-500" />
        </div>

        
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center px-4 py-3 border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-black/20">
              <Search className="w-4 h-4 text-zinc-500 mr-2" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search currencies..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-sm dark:text-white"
              />
            </div>
            <div className="max-h-60 overflow-y-auto p-1">
              {filteredCurrencies.length > 0 ? filteredCurrencies.map(([code, data]) => (
                <div 
                  key={code}
                  onClick={() => { onChange(code); setIsOpen(false); setSearch(''); }}
                  className={`px-4 py-3 text-sm rounded-lg cursor-pointer transition-colors ${value === code ? 'bg-primary/20 text-primary font-bold' : 'hover:bg-zinc-100 dark:hover:bg-white/5 dark:text-zinc-300'}`}
                >
                  {code} - {data.name}
                </div>
              )) : (
                <div className="px-4 py-3 text-sm text-zinc-500">No currencies found.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


const CurrencyConverter = ({ tool }) => {
  
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  
  
  const numAmount = parseFloat(amount) || 0;
  const rateFromUSD = currencies[from].rate;
  const rateToUSD = currencies[to].rate;
  
  
  const exchangeRate = (1 / rateFromUSD) * rateToUSD;
  const result = numAmount * exchangeRate;

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <ToolPageWrapper tool={tool}>
      <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 max-w-3xl space-y-8 shadow-sm">
        
        <div className="space-y-2.5">
          <label className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Amount</label>
          <input 
            type="number" 
            value={amount} 
            onChange={e => setAmount(e.target.value)} 
            className="w-full h-14 text-lg px-5 rounded-xl bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/10 text-zinc-950 dark:text-zinc-50 focus:ring-2 focus:ring-primary/40 outline-none transition-all" 
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          
          <SearchableSelect value={from} onChange={setFrom} label="From" />

          <button onClick={handleSwap} className="mt-8 p-3 rounded-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 group transition-all">
            <SwapIcon className="group-hover:rotate-180 transition-transform duration-300" />
          </button>

          <SearchableSelect value={to} onChange={setTo} label="To" />

        </div>

        <div className="mt-8 p-8 rounded-2xl bg-white/50 dark:bg-black/20 border border-zinc-200 dark:border-white/5 flex flex-col justify-center space-y-2 relative overflow-hidden">
          
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
           
           <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium z-10">{numAmount} {from} =</p>
           <h2 className="text-4xl sm:text-5xl font-extrabold text-primary z-10">
             {result.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} {to}
           </h2>
           <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-2 z-10">1 {from} = {exchangeRate.toFixed(4)} {to}</p>
        </div>

      </div>
    </ToolPageWrapper>
  );
};

export default CurrencyConverter;