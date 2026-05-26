import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Contextos
import { LanguageProvider } from './context/LanguageContext';
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

// Componente Placeholder (Caso alguma ferramenta ainda não exista)
const PlaceholderTool = ({ tool }) => (
  <ToolPageWrapper tool={tool}>
    <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 dark:text-zinc-400 text-center py-20 shadow-sm">
      <tool.icon className="w-16 h-16 mx-auto mb-4 opacity-50" />
      <h2 className="text-xl font-semibold mb-2 text-zinc-950 dark:text-zinc-50">{tool.name} está em construção</h2>
      <p>Volta mais tarde para veres esta ferramenta.</p>
    </div>
  </ToolPageWrapper>
);

// Layout Principal
const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation(); 

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-[#060607] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Outlet /> 
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="mt-auto py-8 px-10 border-t border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-black/20 text-sm text-zinc-600 dark:text-zinc-500 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-sm">
          <span>© {new Date().getFullYear()} ConvertHub — A tua caixa de ferramentas.</span>
          <span>Construído com <span className="font-semibold text-zinc-900 dark:text-zinc-50">React</span> & <span className="font-semibold text-zinc-900 dark:text-zinc-50">Tailwind CSS</span></span>
        </footer>
      </div>
    </div>
  );
};

// Router Principal
export default function App() {
  return (
    <LanguageProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              className: 'dark:bg-[#18181b] dark:text-white dark:border dark:border-white/10',
              style: { borderRadius: '12px', padding: '16px' }
            }} 
          />
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/favorites" element={<Favorites />} /> 
              
              {tools.map(tool => {
                let Element = PlaceholderTool;
                
                // Mapeamento de Rotas
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