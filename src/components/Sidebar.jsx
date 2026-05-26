import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppIcon, DashboardIcon, FavoritesIcon } from './Icons';
import { categories } from '../data';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const isActive = (path) => location.pathname === path;
  
  const activeClass = "text-primary bg-primary/10 dark:bg-primary/20";
  const defaultClass = "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-white/5";

  return (
    <aside className="w-64 border-r border-white bg-white dark:bg-[#060607] dark:border-white/5 flex flex-col pt-5 pb-8 h-screen sticky top-0 overflow-y-auto hidden md:flex">
      <Link to="/" className="flex items-center gap-3 px-5 mb-8">
        <AppIcon />
        <span className="text-xl font-bold dark:text-zinc-50">ConvertHub</span>
      </Link>
      
      <nav className="flex-1 px-3 space-y-7">
        {/* Main Navigation links */}
        <div className="space-y-1">
          <Link to="/" className={`group flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/') ? activeClass : defaultClass}`}>
            <DashboardIcon /> {t('dashboard')}
          </Link>
          <Link to="/favorites" className={`group flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive('/favorites') ? activeClass : defaultClass}`}>
            <FavoritesIcon /> {t('favorites')}
          </Link>
        </div>

        {/* Dynamic categories mapping */}
        {Object.values(categories).map(cat => (
          <div key={cat.name} className="space-y-1.5">
            <h4 className="text-xs font-semibold text-zinc-500 tracking-wider px-3">{t(cat.id)}</h4>
            {cat.tools.map(tool => (
              <Link key={tool.id} to={tool.path} className={`group flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive(tool.path) ? activeClass : defaultClass}`}>
                <span className="text-zinc-400 dark:text-white font-medium group-hover:text-zinc-700 dark:group-hover:text-zinc-200">
                  <tool.icon className="!p-0 !bg-transparent !w-4 !h-4 !text-current" />
                </span>
                {tool.name}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;