import React, { useState, useEffect } from 'react';
import ToolPageWrapper from '../components/ToolPageWrapper';
import { RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const PasswordGenerator = ({ tool }) => {

  
  
 
  const [password, setPassword] = useState(''); // A palavra-passe gerada
  const [length, setLength] = useState(16);     // O tamanho (começa com 16 caracteres)
  
  // Guardamos as opções (se queremos maiúsculas, números, etc.) como se fossem interruptores
  const [opts, setOpts] = useState({ upper: true, lower: true, nums: true, syms: true });


  // 2. O MOTOR (Lógica para criar a password)
  // Esta função é chamada para fazer uma nova password
 
  const generate = () => {
    // Todos as opçoes possíveis agrupadas por tipo
    const chars = {
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 
      lower: 'abcdefghijklmnopqrstuvwxyz',
      nums: '0123456789', 
      syms: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };
    
    let charset = ''; 
    let newPass = ''; // A password que vai ser construída
    
    // Verificamos os interruptores: se o utilizador quer números, atiramos os números para a passe!
    if (opts.upper) charset += chars.upper;
    if (opts.lower) charset += chars.lower;
    if (opts.nums) charset += chars.nums;
    if (opts.syms) charset += chars.syms;
    
    // se o utilizador desligar TUDO, forçamos a usar pelo menos minúsculas
    if (!charset) charset = chars.lower;

    // A máquina vai buscar um caracter à sorte dentro das opçoes possiveis até atingir o tamanho pretendido
    for (let i = 0; i < length; i++) {
      newPass += charset[Math.floor(Math.random() * charset.length)];
    }
    
    // Guardamos a password final na nossa Memória
    setPassword(newPass);
  };


  // 3. O MODO AUTOMÁTICO (useEffect)
  // O useEffect diz ao React: "Sempre que o tamanho (length) ou as opções (opts) mudarem, 
  // corre a função 'generate' automaticamente!". É isto que faz a password mudar na hora!

  useEffect(() => { generate(); }, [length, opts]);

  
  // 4. FUNÇÃO EXTRA: Copiar para a área de transferência
  
  const copy = () => {
    navigator.clipboard.writeText(password); // Diz ao browser para copiar o texto
    toast.success('Password copiada!', {     // Mostra aquele pop-up verde bonito
      icon: '🔒',
    });
  };

  
  // 5. O VISUAL

  return (
    <ToolPageWrapper tool={tool}>
      <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 max-w-3xl space-y-8 shadow-sm">
        
        {/* CAIXA PRINCIPAL: Onde a password aparece grande */}
        <div className="relative flex items-center gap-3">
          <input 
            type="text" 
            readOnly // Não deixamos o utilizador escrever aqui diretamente
            value={password} 
            className="w-full h-20 text-3xl md:text-4xl tracking-wider font-mono px-6 rounded-2xl bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/5 text-primary outline-none" 
          />
          
          {/* Botões dentro da caixa (Refrescar e Copiar) */}
          <div className="absolute right-3 flex items-center gap-2">
            <button 
              onClick={generate} 
              className="p-3 text-zinc-500 hover:text-primary hover:bg-primary/10 rounded-xl transition-all" 
              title="Gerar Nova Password"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
            <button 
              onClick={copy} 
              className="px-6 py-3 bg-primary hover:bg-primary/80 text-white font-semibold rounded-xl transition-colors"
            >
              Copiar
            </button>
          </div>
        </div>
        
        {/* ÁREA DE OPÇÕES: A Barra de tamanho e as caixas de seleção */}
        <div className="space-y-6">
          
          {/* A Barra  para escolher o tamanho da password */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="font-semibold dark:text-zinc-300">Tamanho</label>
              <span className="text-primary font-bold">{length}</span>
            </div>
            <input 
              type="range" 
              min="8" 
              max="64" 
              value={length} 
              // Sempre que mexemos na barra, atualizamos a Memória com o novo número
              onChange={(e) => setLength(e.target.value)} 
              className="w-full accent-primary cursor-pointer" 
            />
          </div>
          
          {/* As 4 caixinhas de seleção (Checkbox) */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {/* Uma lista rápida para criar os 4 botões de uma vez em vez de repetir código */}
            {[ 
              { id: 'upper', label: 'Maiúsculas (A-Z)' }, 
              { id: 'lower', label: 'Minúsculas (a-z)' }, 
              { id: 'nums', label: 'Números (0-9)' }, 
              { id: 'syms', label: 'Símbolos (!@#$)' } 
            ].map(opt => (
              <label key={opt.id} className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={opts[opt.id]} 
                  // Quando clicamos numa caixa, invertemos o valor dela (Se estava true, passa a false e vice-versa)
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