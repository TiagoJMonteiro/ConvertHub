import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';



// Importamos o tradutor (Language) e os Favoritos. Tudo o que estiver dentro deles 
// partilha a mesma informação em todas as páginas.

import { LanguageProvider, useLanguage } from './context/LanguageContext'; // Adicionado o useLanguage!
import { FavoritesProvider } from './context/FavoritesContext';

// Componentes Base 
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ToolPageWrapper from './components/ToolPageWrapper';

// Páginas / Ferramentas
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites'; 
import DistanceConverter from './pages/DistanceConverter';
import WeightConverter from './pages/WeightConverter';
import TemperatureConverter from './pages/TemperatureConverter';
import BmiCalculator from './pages/BmiCalculator';
import DailyCalories from './pages/DailyCalories';
import CurrencyConverter from './pages/CurrencyConverter';
import CompoundInterest from './pages/CompoundInterest';
import PasswordGenerator from './pages/PasswordGenerator';
import CharacterCounter from './pages/CharacterCounter';
import ColorConverter from './pages/ColorConverter';
import PomodoroTimer from './pages/PomodoroTimer';

// Dados
import { tools } from './data';



// Se no data.js houver uma ferramenta que ainda não criei o ficheiro, 
// o React usa isto para não "crashar" e mostrar uma página de erro.

const PlaceholderTool = ({ tool }) => {
  const { t } = useLanguage(); // 
  return (
    <ToolPageWrapper tool={tool}>
      <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 dark:text-zinc-400 text-center py-20 shadow-sm">
        <tool.icon className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <h2 className="text-xl font-semibold mb-2 text-zinc-950 dark:text-zinc-50">{tool.name} {t('underConstruction')}</h2>
        <p>{t('comeBackLater')}</p>
      </div>
    </ToolPageWrapper>
  );
};


// 3. O ESQUELETO DA PÁGINA (Layout)
// Esta é a "moldura" do site. A barra lateral e a barra do topo ficam sempre fixas,
// e apenas o "miolo" (Outlet) muda de página para página.

const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation(); // O React fica a saber em que página estamos no momento
  const { t } = useLanguage(); // Puxamos o dicionário para o rodapé

  // Efeito "Interruptor": Sempre que a variável darkMode muda, ele adiciona ou tira a classe 'dark' do site todo
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-[#060607] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        {/* A ZONA ANIMADA (O Miolo da App) */}
        <main className="flex-1 relative">
          {/* O AnimatePresence diz ao framer-motion: "Espera que a página antiga saia (wait) antes de mostrares a nova!" */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }} // Posição de entrada: invisível e ligeiramente descaída
              animate={{ opacity: 1, y: 0 }}  // Posição final: visível e no sítio certo
              exit={{ opacity: 0, y: -15 }}   // Posição de saída: desaparece e sobe
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* O "Outlet" é onde o React enfia as tuas ferramentas (calculadoras, conversores, etc) */}
              <Outlet /> 
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="mt-auto py-8 px-10 border-t border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-black/20 text-sm text-zinc-600 dark:text-zinc-500 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-sm">
          <span>© {new Date().getFullYear()} ConvertHub — {t('subtitle')}</span>
          <span>{t('builtWith')} <span className="font-semibold text-zinc-900 dark:text-zinc-50">React</span> & <span className="font-semibold text-zinc-900 dark:text-zinc-50">Tailwind CSS</span></span>
        </footer>
      </div>
    </div>
  );
};


// 4. O MOTOR DE NAVEGAÇÃO (A verdadeira App)
// É aqui que dizemos que "moradas" (links) carregam que ficheiros.
// O BrowserRouter envolve a app toda para a transformar num "site de página única" (SPA)

export default function App() {
  return (
    // Os nossos "Providers" abraçam a app para injetar os Favoritos e os Idiomas globalmente
    <LanguageProvider>
      <FavoritesProvider>
        <BrowserRouter>
          
          {/* O Toaster é a biblioteca mágica que faz aparecer os popups verdes de sucesso lá em baixo */}
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              className: 'dark:bg-[#18181b] dark:text-white dark:border dark:border-white/10',
              style: { borderRadius: '12px', padding: '16px' }
            }} 
          />
          
          <Routes>
            {/* O caminho "/" (Raíz do site) carrega o Esqueleto (AppLayout) primeiro */}
            <Route path="/" element={<AppLayout />}>
              
              {/* Se não houver mais nada no link, carrega o Dashboard (index) */}
              <Route index element={<Dashboard />} />
              <Route path="/favorites" element={<Favorites />} /> 
              
              {/* TRUQUE DE MESTRE: Em vez de escrever 20 rotas à mão, lemos o data.js 
                  e geramos as rotas automaticamente através do .map() */}
              {tools.map(tool => {
                let Element = PlaceholderTool; // Assumimos que está em construção por defeito
                
                // Mapeamento de Rotas: Liga a chave do data.js ao Ficheiro Visual respetivo
                if (tool.id === 'distance') Element = DistanceConverter;
                if (tool.id === 'weight') Element = WeightConverter;
                if (tool.id === 'temperature') Element = TemperatureConverter;
                if (tool.id === 'bmi') Element = BmiCalculator;
                if (tool.id === 'calories') Element = DailyCalories;
                if (tool.id === 'pomodoro') Element = PomodoroTimer;
                if (tool.id === 'currency') Element = CurrencyConverter;
                if (tool.id === 'interest') Element = CompoundInterest;
                if (tool.id === 'password') Element = PasswordGenerator;
                if (tool.id === 'characters') Element = CharacterCounter;
                if (tool.id === 'color') Element = ColorConverter;

                return <Route key={tool.id} path={tool.path} element={<Element tool={tool} />} />;
              })}
            </Route>
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </LanguageProvider>
  );
}