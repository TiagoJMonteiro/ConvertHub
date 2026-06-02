import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FavoritesIcon } from './Icons';
import { categories } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext'; 

const ConverterCard = ({ tool }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toggleFavorite, isFavorite } = useFavorites(); 
  const Icon = tool.icon;
  
  const isFav = isFavorite(tool.id); 

  return (
    <div className="relative overflow-hidden p-6 rounded-3xl border border-zinc-200/80 dark:border-white/20 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl flex flex-col gap-5 hover:border-primary/60 dark:hover:border-primary/60 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300 group cursor-pointer" onClick={() => navigate(tool.path)}>
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none"></div>
      <div className="relative z-10 flex items-start justify-between">
        <Icon />
        
      
        <button 
          onClick={(e) => { e.stopPropagation(); toggleFavorite(tool.id); }} 
          className={`transition-colors ${isFav ? 'text-yellow-500' : 'text-zinc-400 dark:text-zinc-500 hover:text-yellow-500 dark:hover:text-yellow-400'}`}
        >
          <FavoritesIcon className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
        </button>
        
      </div>
      <div className="relative z-10 flex-1 space-y-1">
        <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">{tool.name}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{tool.desc}</p>
      </div>
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-zinc-200/50 dark:border-white/5 text-sm">
        <span className="font-medium text-zinc-500 dark:text-zinc-500">{t(categories[tool.category].id)}</span>
        <span className="text-primary font-semibold flex items-center gap-1.5 transition-colors group-hover:text-primary/80">{t('open')} <span className="transform translate-y-px group-hover:translate-x-1 transition-transform">→</span></span>
      </div>
    </div>
  );
};
export default ConverterCard;