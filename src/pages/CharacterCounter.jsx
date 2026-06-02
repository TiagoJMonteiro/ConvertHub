import React, { useState } from 'react';
import ToolPageWrapper from '../components/ToolPageWrapper';

const CharacterCounter = ({ tool }) => {
  const [text, setText] = useState('');

  const chars = text.length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lines = text === '' ? 0 : text.split('\n').length;
  const readTime = Math.ceil(words / 200); 

  return (
    <ToolPageWrapper tool={tool}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl">
        <div className="md:col-span-3">
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Type or paste your text here..."
            className="w-full h-96 p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-primary/50 resize-none shadow-sm"
          ></textarea>
        </div>
        
        <div className="space-y-4">
          {[
            { label: 'Characters', val: chars, color: 'text-sky-500' },
            { label: 'Words', val: words, color: 'text-emerald-500' },
            { label: 'Lines', val: lines, color: 'text-purple-500' },
            { label: 'Reading Time', val: `${readTime} min`, color: 'text-orange-500' }
          ].map(stat => (
            <div key={stat.label} className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-5 rounded-2xl border border-zinc-200/50 dark:border-white/10 text-center shadow-sm">
              <h3 className={`text-4xl font-extrabold ${stat.color}`}>{stat.val}</h3>
              <p className="text-sm font-semibold text-zinc-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolPageWrapper>
  );
};

export default CharacterCounter;