import React, { useState } from 'react';
import ToolPageWrapper from '../components/ToolPageWrapper';

const BmiCalculator = ({ tool }) => {

  
  // 1. A MEMÓRIA DA MÁQUINA (Estados do React)
  // É aqui que a calculadora "decora" a altura e o peso que o utilizador escreve.
  // Começamos com valores de exemplo: 170cm e 70kg para não arrancar a zeros.
  
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);

  
  // 2. A MATEMÁTICA (Fórmula do IMC)
  // O Índice de Massa Corporal calcula-se dividindo o peso pela altura ao quadrado.
  // Como a nossa altura está em centímetros, dividimos por 100 primeiro para passar a metros.
  
  const bmi = weight / ((height / 100) ** 2);
  
  
  // 3. O DIAGNÓSTICO (Avaliador de Saúde)
  // Consoante o número da matemática ali de cima, a calculadora decide qual é a categoria.
  // Para além do texto (ex: 'Normal', 'Obese'), damos também uma cor bonita (verde, vermelho)
  // e calculamos uma percentagem para podermos mexer o "ponteiro" no gráfico mais abaixo.
  
  let status = { text: 'Unknown', color: 'text-zinc-500 bg-zinc-100 dark:bg-zinc-800', percentage: 0 };
  
  if (bmi < 18.5) {
    status = { text: 'Abaixo do peso', color: 'text-sky-500 bg-sky-100 dark:bg-sky-950', percentage: bmi / 40 * 100 };
  } else if (bmi < 25) {
    status = { text: 'Normal', color: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-950', percentage: bmi / 40 * 100 };
  } else if (bmi < 30) {
    status = { text: 'Acima do peso', color: 'text-orange-500 bg-orange-100 dark:bg-orange-950', percentage: bmi / 40 * 100 };
  } else {
    status = { text: 'Obeso', color: 'text-rose-500 bg-rose-100 dark:bg-rose-950', percentage: bmi / 40 * 100 };
  }

  // Cortamos os números gigantes para terem apenas 1 casa decimal (Ex: 22.4 em vez de 22.435678)
  const finalBmi = bmi > 0 ? bmi.toFixed(1) : "0.0";
  
  // Isto serve apenas para garantir que o ponteiro do gráfico não sai fora do ecrã se o IMC for extremo
  const cappedPercentage = Math.min(Math.max(status.percentage, 0), 100);

  
  // 4. O VISUAL (O HTML que desenha a página)
  // Dividimos o ecrã em duas partes: Inputs (esquerda) e Resultados (direita)
  
  return (
    <ToolPageWrapper tool={tool}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        
        {/* LADO ESQUERDO: Caixas onde o utilizador escreve */}
        <div className="md:col-span-1 bg-white p-8 rounded-2xl border border-zinc-200 dark:bg-[#121313] dark:border-dark-border space-y-6 shadow-sm">
          
         
          {[ 
            { label: 'Altura (cm)', val: height, set: setHeight }, 
            { label: 'Peso (kg)', val: weight, set: setWeight } 
          ].map(field => (
            <div key={field.label} className="space-y-2.5">
              <label className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{field.label}</label>
              <input 
                type="number" 
                value={field.val} 
                // Sempre que o utilizador escreve, gravamos logo na nossa "memória"
                onChange={e => field.set(parseFloat(e.target.value) || 0)} 
                className="w-full h-14 text-xl px-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-dark-border text-zinc-950 dark:text-zinc-50 focus:ring-2 focus:ring-primary/40 outline-none transition-all" 
              />
            </div>
          ))}
        </div>

        {/* LADO DIREITO: Mostrador do Resultado Final */}
        <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-zinc-200 dark:bg-dark-card dark:border-dark-border space-y-6 shadow-sm">
          <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-600">O teu IMC</span>
          
          <div className="flex flex-col sm:flex-row sm:items-end gap-3.5">
            <span className="text-7xl font-extrabold text-primary">{finalBmi}</span>
            {/* a cena que mostra se estás normal, obeso, etc. Puxa a cor que definimos na lógica em cima! */}
            <span className={`inline-flex items-center w-max rounded-full px-4 py-1.5 text-sm font-semibold mb-2 ${status.color}`}>
              {status.text}
            </span>
          </div>
          
          {/* A BARRA COLORIDA (O Gráfico visual em baixo) */}
          <div className="relative pt-6">
            
            {/* Os números de referência em cima da barra */}
            <div className="flex text-xs text-zinc-500 dark:text-zinc-600 justify-between mb-2 font-medium">
              <span>&lt;18.5</span>
              <span>18.5-25</span>
              <span>25-30</span>
              <span>30+</span>
            </div>
            
            {/* As 4 cores da barra principal desenhadas lado a lado */}
            <div className="h-4 rounded-full bg-zinc-100 dark:bg-zinc-900 flex overflow-hidden">
              <div className="flex-1 bg-sky-400" /> 
              <div className="flex-1 bg-emerald-400" /> 
              <div className="flex-1 bg-orange-400" /> 
              <div className="flex-1 bg-rose-400" />
            </div>
            
            {/* O "Ponteiro" que desliza em cima da barra indicando onde tu te inseres */}
            {bmi > 0 && (
              <div 
                className="absolute top-10 h-6 w-1.5 rounded-full bg-primary -translate-x-1/2 transition-all duration-500 ease-out shadow-md" 
                // Usa a percentagem que calculámos lá no bloco do "Diagnóstico" para se mover
                style={{ left: `${cappedPercentage}%` }}
              />
            )}
          </div>

        </div>
      </div>
    </ToolPageWrapper>
  );
};

export default BmiCalculator;