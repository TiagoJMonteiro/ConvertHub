import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    dashboard: "Dashboard",
    favorites: "Favorites",
    search: "Search tools...",
    welcome: "Welcome to",
    subtitle: "Your toolbox, beautifully organized",
    desc: "Converters, calculators and utilities — fast, modern, and made for everyday use.",
    open: "Open",
    unit: "UNIT CONVERTERS",
    health: "HEALTH CALCULATORS",
    finance: "FINANCE TOOLS",
    utility: "UTILITY TOOLS",
    back: "Back to dashboard",
    addFav: "Add to favorites"
  },
  pt: {
    dashboard: "Painel",
    favorites: "Favoritos",
    search: "Buscar ferramentas...",
    welcome: "Bem-vindo ao",
    subtitle: "Sua caixa de ferramentas, bem organizada",
    desc: "Conversores, calculadoras e utilitários — rápidos, modernos e feitos para o dia a dia.",
    open: "Abrir",
    unit: "CONVERSORES DE UNIDADES",
    health: "CALCULADORAS DE SAÚDE",
    finance: "FERRAMENTAS FINANCEIRAS",
    utility: "FERRAMENTAS ÚTEIS",
    back: "Voltar ao painel",
    addFav: "Adicionar aos favoritos"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('appLang') || 'en');

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'pt' : 'en';
    setLang(newLang);
    localStorage.setItem('appLang', newLang);
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);