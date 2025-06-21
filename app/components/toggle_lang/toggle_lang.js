import React, { useState, useEffect } from 'react'
import { Button, Div, Text } from 'react-native-magnus';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Custom_spinner from '../../custom_components/custom_spinner';
import { Pressable } from 'react-native';
import { Ionicons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons'

export default function Toggle_Lang() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  // Load saved language on component mount
  useEffect(() => {
    loadSavedLanguage();
  }, []);

  // Load language from AsyncStorage
  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('app_language');
      if (savedLanguage && savedLanguage !== i18n.language) {
        await i18n.changeLanguage(savedLanguage);
        I18nManager.forceRTL(savedLanguage === 'ar');
      }
    } catch (error) {
      console.error('Failed to load saved language:', error);
    }
  };

  // Save language to AsyncStorage
  const saveLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('app_language', language);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const toggleLanguage = async () => {
    try {
      setLoading(true);
      const newLang = i18n.language === 'en' ? 'ar' : 'en';

      // Change language and save to storage
      await i18n.changeLanguage(newLang);
      await saveLanguage(newLang);
      I18nManager.forceRTL(newLang === 'ar');

      // Show success message
      Toast.show({
        type: 'success',
        text1: t('language_changed') || 'Language changed successfully',
        position: 'top',
        visibilityTime: 2000,
      });

    } catch (error) {
      console.error('Failed to change language:', error);
      
      // Show error message
      Toast.show({
        type: 'error',
        text1: t('language_change_failed') || 'Failed to change language',
        position: 'top',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      onPress={toggleLanguage}
      disabled={loading}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Div flexDir="row" alignItems="center" justifyContent="space-between" bg="white" rounded={16} p={16} mb={12} borderWidth={1} borderColor="#f0f0f0">
        <Div flexDir="row" alignItems="center">
          <Div
            w={40}
            h={40}
            rounded="circle"
            bg="#f3f4f6"
            alignItems="center"
            justifyContent="center"
            mr={12}
          >
            <Ionicons name="language" size={20} color="#6b7280" />
          </Div>
          <Div>
            <Text fontSize={16} fontWeight="600" color="#1f2937">
              {t('language') || 'Language'}
            </Text>
            <Text fontSize={12} color="#6b7280">
              {i18n.language === 'ar' ? t('change_language') || 'تغيير اللغة' : t('change_language') || 'Change Language'}
            </Text>
          </Div>
        </Div>

        <Div flexDir="row" alignItems="center">
          {loading ? (
            <Custom_spinner />
          ) : (
            <>
              <Div
                bg={i18n.language === 'ar' ? '#dcfce7' : '#dbeafe'}
                px={12}
                py={6}
                rounded={12}
                mr={8}
              >
                <Text
                  fontSize={14}
                  fontWeight="600"
                  color={i18n.language === 'ar' ? '#059669' : '#2563eb'}
                >
                  {i18n.language === 'ar' ? 'العربية' : 'English'}
                </Text>
              </Div>
              <Ionicons name="chevron-forward" size={16} color="#6b7280" />
            </>
          )}
        </Div>
      </Div>
    </Pressable>
  )
}
