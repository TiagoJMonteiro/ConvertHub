import React, { useState, useEffect } from 'react';
import ToolPageWrapper from '../components/ToolPageWrapper';
import toast from 'react-hot-toast';

const ColorConverter = ({ tool }) => {
  const [hex, setHex] = useState('#8b5cf6'); // Cor roxa por defeito
  const [rgb, setRgb] = useState('');
  const [hsl, setHsl] = useState('');

  // Lógica complexa para converter HEX para RGB e HSL
  useEffect(() => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(char => char + char).join('');
    }
    
    if (cleanHex.length === 6) {
      // Converter para RGB
      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);
      setRgb(`rgb(${r}, ${g}, ${b})`);

      // Converter para HSL
      let rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
      let max = Math.max(rNorm, gNorm, bNorm), min = Math.min(rNorm, gNorm, bNorm);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
          case gNorm: h = (bNorm - rNorm) / d + 2; break;
          case bNorm: h = (rNorm - gNorm) / d + 4; break;
        }
        h /= 6;
      }
      setHsl(`hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`);
    } else {
      setRgb('Formato Inválido');
      setHsl('Formato Inválido');
    }
  }, [hex]);

  const copyToClipboard = (text, format) => {
    navigator.clipboard.writeText(text);
    toast.success(`Formato ${format} copiado!`, { icon: '🎨' });
  };

  return (
    <ToolPageWrapper tool={tool}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        
        
        <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 space-y-6 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-semibold dark:text-zinc-300">Cor Hexadecimal (HEX)</label>
            <input 
              type="text" 
              value={hex} 
              onChange={e => setHex(e.target.value)} 
              className="w-full h-14 px-5 font-mono text-lg rounded-xl bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/10 outline-none text-zinc-950 dark:text-zinc-50 focus:border-primary/50" 
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-white/10">
            <div className="flex justify-between items-center bg-white dark:bg-black/20 p-4 rounded-xl border border-zinc-200 dark:border-white/5">
              <div>
                <p className="text-xs text-zinc-500 font-semibold mb-1">RGB</p>
                <p className="font-mono text-zinc-900 dark:text-zinc-100">{rgb}</p>
              </div>
              <button onClick={() => copyToClipboard(rgb, 'RGB')} className="px-4 py-2 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-lg text-sm font-semibold transition-colors">Copiar</button>
            </div>

            <div className="flex justify-between items-center bg-white dark:bg-black/20 p-4 rounded-xl border border-zinc-200 dark:border-white/5">
              <div>
                <p className="text-xs text-zinc-500 font-semibold mb-1">HSL</p>
                <p className="font-mono text-zinc-900 dark:text-zinc-100">{hsl}</p>
              </div>
              <button onClick={() => copyToClipboard(hsl, 'HSL')} className="px-4 py-2 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-lg text-sm font-semibold transition-colors">Copiar</button>
            </div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 flex flex-col items-center justify-center space-y-6 shadow-sm">
          <div 
            className="w-full h-64 rounded-3xl shadow-inner transition-colors duration-300 border border-black/10 dark:border-white/10"
            style={{ backgroundColor: hex.length === 7 || hex.length === 4 ? hex : 'transparent' }}
          ></div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Pré-visualização em tempo real</p>
        </div>

      </div>
    </ToolPageWrapper>
  );
};

export default ColorConverter;