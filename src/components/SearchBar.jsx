import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const { t } = useLanguage();
  const inputRef = useRef(null); // Reference to the input element

  // Listen for the keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault(); // Stop the browser's default search bar from opening
        inputRef.current?.focus(); // Focus our search bar
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative max-w-xl group">
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      <input 
        ref={inputRef}
        type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('search')}
        className="w-full h-14 pl-12 pr-20 rounded-xl bg-white/20 dark:bg-black/20 text-zinc-900 dark:text-white placeholder-zinc-500 border border-zinc-200 dark:border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all backdrop-blur-sm peer" 
      />
      
      {/* Keyboard Shortcut Badge */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-60 peer-focus:opacity-0 transition-opacity duration-200">
        <kbd className="px-2 py-1 rounded-md bg-white/50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-xs font-semibold text-zinc-500 dark:text-zinc-400 shadow-sm">
          Ctrl K
        </kbd>
      </div>
    </div>
  );
};
export default SearchBar;