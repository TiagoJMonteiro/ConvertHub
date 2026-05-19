import React from 'react';
import { SunIcon, MoonIcon } from './Icons';

const Topbar = ({ darkMode, setDarkMode }) => {
  return (
    <header className="flex items-center justify-end h-16 px-8 bg-white/70 backdrop-blur-sm border-b border-zinc-100 dark:bg-black/30 dark:border-dark-border sticky top-0 z-50">
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        className="p-2.5 rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-800 transition-colors"
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
};

export default Topbar;