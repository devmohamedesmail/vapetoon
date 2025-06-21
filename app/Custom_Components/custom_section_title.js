import React from 'react'
import { Div, Text } from 'react-native-magnus'

export const CustomSectionTitle = ({ title, subtitle, showDivider = true }) => {
  return (
    <Div mb={20} px={16}>
      {/* Main Title Section */}
      <Div flexDir="row" alignItems="center" mb={8}>
        <Text 
          fontSize={20} 
          fontWeight="700" 
          color="#1f2937"
          letterSpacing={0.5}
        >
          {title}
        </Text>
      </Div>
      
      {/* Subtitle */}
      {subtitle && (
        <Text 
          fontSize={10} 
          color="#6b7280" 
          fontWeight="400"
          mb={showDivider ? 12 : 0}
          lineHeight={20}
        >
          {subtitle}
        </Text>
      )}
      
      {/* Professional Divider */}
      {showDivider && (
        <Div 
          h={2} 
          w={40} 
          bg="#4f46e5" 
          rounded={1}
        />
      )}
    </Div>
  )
}