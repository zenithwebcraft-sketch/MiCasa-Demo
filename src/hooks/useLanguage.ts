import { useState, useEffect } from 'react';
import es from '@/i18n/es.json';
import en from '@/i18n/en.json';

type Language = 'es' | 'en';
type Translations = typeof es;

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>(en);

  useEffect(() => {
    // Detectar idioma del navegador
    const browserLang = navigator.language.toLowerCase();
    
    // Si el navegador está en español, usar español. Si no, inglés.
    const detectedLang: Language = browserLang.startsWith('es') ? 'es' : 'en';
    
    setLanguage(detectedLang);
    setTranslations(detectedLang === 'es' ? es : en);
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setTranslations(lang === 'es' ? es : en);
  };

  return { language, translations: translations as Translations, changeLanguage };
};
