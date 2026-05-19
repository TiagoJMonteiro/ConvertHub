import React from 'react';
import ConverterCard from '../components/ConverterCard';
import { tools } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { Star } from 'lucide-react';

const Favorites = () => {
  const { t, lang } = useLanguage();
  const { favorites } = useFavorites();

  // Filter the master list of tools to only include favorited IDs
  const favoriteTools = tools.filter(tool => favorites.includes(tool.id));

  return (
    <div className="p-8 md:p-12 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold text-zinc-950 dark:text-zinc-50 flex items-center gap-3">
          <Star className="w-8 h-8 text-yellow-500 fill-current" />
          {t('favorites')}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          {lang === 'en' 
            ? 'Your personally pinned quick-access shortcuts.' 
            : 'Seus atalhos de acesso rápido fixados pessoalmente.'}
        </p>
      </div>

      {favoriteTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {favoriteTools.map(tool => (
            <ConverterCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        /* Sleek Empty State if nothing is favorited yet */
        <div className="bg-white/40 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-white/5 p-16 rounded-3xl backdrop-blur-xl text-center max-w-xl mx-auto mt-12 flex flex-col items-center justify-center space-y-4 shadow-sm">
          <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-white/5 text-zinc-400 dark:text-zinc-600">
            <Star className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            {lang === 'en' ? 'No favorites pinned yet' : 'Nenhum favorito fixado ainda'}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm">
            {lang === 'en' 
              ? 'Click the star icon in the top right corner of any tool card on the dashboard to pin it here.' 
              : 'Clique no ícone de estrela no canto superior direito de qualquer cartão no painel para fixá-lo aqui.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;