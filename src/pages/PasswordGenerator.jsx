import React, { useState, useEffect } from 'react';
import ToolPageWrapper from '../components/ToolPageWrapper';
import { RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const PasswordGenerator = ({ tool }) => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, nums: true, syms: true });

  const generate = () => {
    const chars = {
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower: 'abcdefghijklmnopqrstuvwxyz',
      nums: '0123456789', syms: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };
    let charset = '', newPass = '';
    if (opts.upper) charset += chars.upper;
    if (opts.lower) charset += chars.lower;
    if (opts.nums) charset += chars.nums;
    if (opts.syms) charset += chars.syms;
    if (!charset) charset = chars.lower;

    for (let i = 0; i < length; i++) {
      newPass += charset[Math.floor(Math.random() * charset.length)];
    }
    setPassword(newPass);
  };

  useEffect(() => { generate(); }, [length, opts]);

  const copy = () => {
    navigator.clipboard.writeText(password);
    toast.success('Password copied to clipboard!', {
      icon: '🔒',
    });
  };

  return (
    <ToolPageWrapper tool={tool}>
      <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 max-w-3xl space-y-8 shadow-sm">
        
        {/* Output Area */}
        <div className="relative flex items-center gap-3">
          <input 
            type="text" 
            readOnly 
            value={password} 
            className="w-full h-20 text-3xl md:text-4xl tracking-wider font-mono px-6 rounded-2xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/5 text-primary outline-none" 
          />
          
          <div className="absolute right-3 flex items-center gap-2">
            <button 
              onClick={generate} 
              className="p-3 text-zinc-500 hover:text-primary hover:bg-primary/10 rounded-xl transition-all" 
              title="Generate New Password"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
            <button 
              onClick={copy} 
              className="px-6 py-3 bg-primary hover:bg-primary/80 text-white font-semibold rounded-xl transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
        
        {/* Options */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="font-semibold dark:text-zinc-300">Length</label>
              <span className="text-primary font-bold">{length}</span>
            </div>
            <input 
              type="range" 
              min="8" 
              max="64" 
              value={length} 
              onChange={(e) => setLength(e.target.value)} 
              className="w-full accent-primary cursor-pointer" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[ 
              { id: 'upper', label: 'Uppercase (A-Z)' }, 
              { id: 'lower', label: 'Lowercase (a-z)' }, 
              { id: 'nums', label: 'Numbers (0-9)' }, 
              { id: 'syms', label: 'Symbols (!@#$)' } 
            ].map(opt => (
              <label key={opt.id} className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={opts[opt.id]} 
                  onChange={() => setOpts({...opts, [opt.id]: !opts[opt.id]})} 
                  className="w-5 h-5 accent-primary rounded cursor-pointer" 
                />
                <span className="dark:text-zinc-300 font-medium">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </ToolPageWrapper>
  );
};

export default PasswordGenerator;