import React, { useState } from 'react'
import { Button, Div, Text } from 'react-native-magnus';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import custom_colors from '../../config/custom_colors';
import custom_button from '../../custom_components/custom_button';
import Custom_spinner from '../../custom_components/custom_spinner';

export default function Toggle_Lang() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const toggleLanguage = () => {
    try {
      setLoading(true);
      const newLang = i18n.language === 'en' ? 'ar' : 'en';
      i18n.changeLanguage(newLang)
        .then(() => {
          I18nManager.forceRTL(newLang === 'ar');

        })
        .catch(err => console.error('Failed to change language', err));
        setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  return (
    <Div flexDir='row' justifyContent='center' my={5}>
      {loading ? (<Custom_spinner />):(<custom_button title={i18n.language === 'en' ? 'العربية' : 'English'} onPress={toggleLanguage} />)}
    </Div>
  )
}
