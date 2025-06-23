import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable } from 'react-native'
import { Div, Text } from 'react-native-magnus'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

export default function Checkout_Header({ handleBackPress, currentStep }) {
    const { t, i18n } = useTranslation()
    const navigation = useNavigation<any>();
  return (
   <LinearGradient
      colors={['#1f2937', '#374151']}
      style={{
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
      }}
    >
      <Div flexDir="row" alignItems="center" justifyContent="space-between">
        <Pressable onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>

        <Div alignItems="center" flex={1}>
          <Text fontSize={20} fontWeight="700" color="white">
            {t('checkout') || 'Checkout'}
          </Text>
          <Text fontSize={14} color="#d1d5db" mt={2}>
            {t('step')} {currentStep} {t('of')} 3
          </Text>
        </Div>

        <Div w={24} /> {/* Spacer */}
      </Div>

      {/* Progress Bar */}
      <Div flexDir="row" mt={20} alignItems="center">
        {[1, 2, 3].map((step, index) => (
          <React.Fragment key={step}>
            <Div
              w={32}
              h={32}
              rounded="circle"
              bg={currentStep >= step ? "white" : "rgba(255,255,255,0.3)"}
              alignItems="center"
              justifyContent="center"
            >
              {currentStep > step ? (
                <Ionicons name="checkmark" size={16} color="#1f2937" />
              ) : (
                <Text
                  color={currentStep >= step ? "#1f2937" : "rgba(255,255,255,0.7)"}
                  fontSize={14}
                  fontWeight="600"
                >
                  {step}
                </Text>
              )}
            </Div>
            {index < 2 && (
              <Div
                flex={1}
                h={2}
                bg={currentStep > step ? "white" : "rgba(255,255,255,0.3)"}
                mx={8}
                rounded={1}
              />
            )}
          </React.Fragment>
        ))}
      </Div>

      {/* Step Labels */}
      <Div flexDir="row" justifyContent="space-between" mt={8}>
        <Text fontSize={12} color={currentStep >= 1 ? "white" : "rgba(255,255,255,0.7)"} fontWeight="500">
          {t('billing_info') || 'Billing'}
        </Text>
        <Text fontSize={12} color={currentStep >= 2 ? "white" : "rgba(255,255,255,0.7)"} fontWeight="500">
          {t('payment') || 'Payment'}
        </Text>
        <Text fontSize={12} color={currentStep >= 3 ? "white" : "rgba(255,255,255,0.7)"} fontWeight="500">
          {t('review') || 'Review'}
        </Text>
      </Div>
    </LinearGradient>
  )
}
