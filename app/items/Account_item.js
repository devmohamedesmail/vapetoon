import React from 'react'
import { Pressable } from 'react-native'
import { Button, Div, Image, Text } from 'react-native-magnus'
import { Ionicons } from '@expo/vector-icons'
import Custom_colors from '../config/Custom_colors'

export default function Account_item({ image, onPress, title, icon, isActive = false, color = Custom_colors.primary }) {
  return (
    <Pressable onPress={onPress} style={{ marginHorizontal: 8 }}>
      <Div
        flexDir="row"
        alignItems="center"
        bg={isActive ? color : 'transparent'}
        px={16}
        py={10}
        rounded={25}
        borderWidth={isActive ? 0 : 1}
        borderColor="#e5e7eb"
        style={{
          shadowColor: isActive ? color : 'transparent',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: isActive ? 3 : 0,
        }}
      >
        {icon && (
          <Ionicons 
            name={icon} 
            size={18} 
            color={isActive ? 'white' : '#6b7280'} 
            style={{ marginRight: 8 }}
          />
        )}
        <Text
          fontSize={14}
          fontWeight={isActive ? "600" : "500"}
          color={isActive ? 'white' : '#6b7280'}
        >
          {title}
        </Text>
      </Div>
    </Pressable>
  )
}