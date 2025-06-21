import React from 'react'
import { useTranslation } from 'react-i18next'
import { Div, Text } from 'react-native-magnus'
import { LinearGradient } from 'expo-linear-gradient'

export const CustomSectionTitle = ({ title, subtitle, icon, gradient = ['#667eea', '#764ba2'] }) => {
  const {t,i18n}=useTranslation();
  const isArabic = i18n.language === 'ar';
  
  return (
    <Div mb={20} mt={15} px={16}>
      {/* Main Container with Shadow Effect */}
      <Div
        shadow="md"
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={8}
        bg="white"
        rounded={16}
        p={16}
        borderWidth={1}
        borderColor="#f3f4f6"
      >
        {/* Header Section */}
        <Div
          flexDir={isArabic ? "row-reverse" : "row"}
          alignItems="center"
          justifyContent="space-between"
          mb={subtitle ? 12 : 0}
        >
          {/* Title with Icon */}
          <Div
            flexDir={isArabic ? "row-reverse" : "row"}
            alignItems="center"
            flex={1}
          >
            {/* Gradient Accent */}
            <LinearGradient
              colors={gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 6,
                height: 32,
                borderRadius: 3,
                marginRight: isArabic ? 0 : 12,
                marginLeft: isArabic ? 12 : 0,
              }}
            />
            
            {/* Icon Container */}
            {icon && (
              <Div
                w={40}
                h={40}
                rounded="circle"
                bg="#f8fafc"
                justifyContent="center"
                alignItems="center"
                mr={isArabic ? 0 : 12}
                ml={isArabic ? 12 : 0}
                borderWidth={2}
                borderColor="#e2e8f0"
              >
                <Text fontSize={20}>{icon}</Text>
              </Div>
            )}
            
            {/* Title Text */}
            <Div flex={1}>
              <Text 
                fontSize={22} 
                fontWeight="700" 
                color="#1a202c"
                textAlign={isArabic ? "right" : "left"}
                letterSpacing={0.5}
                style={{
                  textShadowColor: 'rgba(0, 0, 0, 0.1)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                {title}
              </Text>
            </Div>
          </Div>
          
          {/* Decorative Element */}
          <Div
            flexDir={isArabic ? "row-reverse" : "row"}
            alignItems="center"
          >
            <Div w={8} h={8} rounded="circle" bg="#667eea" opacity={0.3} />
            <Div w={6} h={6} rounded="circle" bg="#764ba2" opacity={0.5} mx={4} />
            <Div w={4} h={4} rounded="circle" bg="#667eea" opacity={0.7} />
          </Div>
        </Div>
        
        {/* Subtitle */}
        {subtitle && (
          <Div
            pl={isArabic ? 0 : icon ? 64 : 18}
            pr={isArabic ? icon ? 64 : 18 : 0}
          >
            <Text 
              fontSize={14} 
              color="#64748b" 
              fontWeight="400"
              textAlign={isArabic ? "right" : "left"}
              lineHeight={20}
              opacity={0.8}
            >
              {subtitle}
            </Text>
          </Div>
        )}
        
        {/* Bottom Gradient Line */}
        <Div mt={16} alignItems={isArabic ? "flex-end" : "flex-start"}>
          <LinearGradient
            colors={[...gradient, 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: '40%',
              height: 3,
              borderRadius: 2,
            }}
          />
        </Div>
      </Div>
    </Div>
  )
}