import React from 'react'
import { Pressable } from 'react-native'
import { Div, Button, Text } from 'react-native-magnus'

export default function HeaderItem({ 
  icon, 
  onPress, 
  count = 0, 
  size = 44,
  bgColor = "rgba(31, 41, 55, 0.1)",
  badgeColor = "#ef4444",
  showBadge = true
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        transform: [{ scale: pressed ? 0.95 : 1 }],
      })}
    >
      <Div position="relative">
        <Div
          w={size}
          h={size}
          rounded="circle"
          bg={bgColor}
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </Div>
        
        {showBadge && count > 0 && (
          <Div
            position="absolute"
            top={-4}
            right={-4}
            minW={20}
            h={20}
            rounded="circle"
            bg={badgeColor}
            alignItems="center"
            justifyContent="center"
            px={6}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text 
              fontSize={12} 
              fontWeight="600" 
              color="white"
              textAlign="center"
            >
              {count > 99 ? '99+' : count}
            </Text>
          </Div>
        )}
      </Div>
    </Pressable>
  )
}
