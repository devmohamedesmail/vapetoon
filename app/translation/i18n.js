// import '@formatjs/intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import enTranslations from './locales/en/translation.json';
import arTranslations from './locales/ar/translation.json';

// Function to get saved language
const getSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('app_language');
    return savedLanguage || 'en'; // Default to English if no saved language
  } catch (error) {
    console.error('Failed to get saved language:', error);
    return 'en';
  }
};

// Initialize i18n with saved language
const initializeI18n = async () => {
  const savedLanguage = await getSavedLanguage();
  
  // Set RTL for Arabic
  I18nManager.forceRTL(savedLanguage === 'ar');
  
  return i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: enTranslations
        },
        ar: {
          translation: arTranslations
        }
      },
      lng: savedLanguage, // Use saved language
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      },
      pluralSeparator: '_', 
    });
};

// Initialize the i18n
initializeI18n();

export default i18n;