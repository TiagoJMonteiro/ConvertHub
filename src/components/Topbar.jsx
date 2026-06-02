import React from 'react';
import { SunIcon, MoonIcon } from './Icons';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Topbar = ({ darkMode, setDarkMode }) => {
  const { lang, toggleLang } = useLanguage();

  return (
    <header className="flex items-center justify-end gap-3 h-16 px-8 bg-white/50 dark:bg-[#060607]/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/5 sticky top-0 z-50">
      
      
      <button onClick={toggleLang} className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-white/5 transition-all font-semibold text-sm uppercase tracking-wider">
        <Globe className="w-5 h-5" /> {lang}
      </button>
      
      <div className="w-px h-6 bg-zinc-200 dark:bg-white/10"></div>
      
      <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-white/5 transition-all">
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>
      
    </header>
  );
};
export default Topbar;