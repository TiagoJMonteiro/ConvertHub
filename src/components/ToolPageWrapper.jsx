import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FavoritesIcon } from './Icons';
import { categories } from '../data';

const ToolPageWrapper = ({ children, tool }) => {
  const navigate = useNavigate();
  const Icon = tool.icon;
  
  return (
    <div className="p-8 md:p-12 space-y-12 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-sm font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 flex items-center gap-2 transition-colors">
          <span>←</span> Back to dashboard
        </button>
        <button className="text-sm font-semibold px-4 py-2 rounded-xl border border-zinc-200 dark:border-dark-border bg-white dark:bg-dark-card text-zinc-950 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-2 transition-colors group">
          <FavoritesIcon className="w-5 h-5 text-zinc-400 group-hover:text-yellow-500 transition-colors" /> Add to favorites
        </button>
      </div>
      <div className="flex items-center gap-6">
        <Icon />
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-zinc-500 tracking-wider uppercase">{categories[tool.category].name}</p>
          <h1 className="text-4xl font-extrabold text-zinc-950 dark:text-zinc-50">{tool.name}</h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400">{tool.desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ToolPageWrapper;