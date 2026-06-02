import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ConverterCard from '../components/ConverterCard';
import { categories } from '../data';

const Dashboard = () => {
  
  const [searchQuery, setSearchQuery] = useState('');

  // 2. Filter the categories and tools based on the search query
  const filteredCategories = Object.values(categories).map(cat => {
    // Filter tools inside this category
    const matchingTools = cat.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return { ...cat, tools: matchingTools };
  }).filter(cat => cat.tools.length > 0); // 3. Hide empty categories completely

  return (
    <div className="p-8 md:p-12 space-y-12 max-w-7xl mx-auto w-full">
      
      
      <div className="relative overflow-hidden p-10 rounded-3xl border border-zinc-200/50 dark:border-white/10 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-2xl space-y-10 shadow-lg">
        
        
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/15 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-primary/20 px-4 py-2 text-sm text-primary font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Your toolbox, beautifully organized
          </div>
          <h1 className="text-5xl font-extrabold text-zinc-950 dark:text-zinc-50 leading-tight">
            Welcome to <span className="text-primary">ConvertHub</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl">
            Converters, calculators and utilities — fast, modern, and made for everyday use.
          </p>
        </div>
        
        <div className="relative z-10">
          {/* Pass the state down to the SearchBar */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>

      {/* Render the FILTERED categories instead of all of them */}
      {filteredCategories.length > 0 ? (
        filteredCategories.map(cat => (
          <section key={cat.name} className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">{cat.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.tools.map(tool => (
                <ConverterCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        ))
      ) : (
        // Empty state if someone searches for gibberish
        <div className="text-center py-20">
           <p className="text-xl font-medium text-zinc-500 dark:text-zinc-400">No tools found for "{searchQuery}"</p>
           <button onClick={() => setSearchQuery('')} className="mt-4 text-primary hover:text-primary/80 font-semibold">Clear search</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;