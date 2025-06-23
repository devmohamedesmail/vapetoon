import React, { useRef, useEffect } from 'react'
import { View, Animated, Easing, Dimensions } from 'react-native'
import { Div, Text } from 'react-native-magnus'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { LinearGradient } from 'expo-linear-gradient'

interface SpinnerLoadingProps {
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary' | 'minimal'
  showText?: boolean
  text?: string
  fullScreen?: boolean
}

export default function Spinner_Loading({ 
  size = 'medium', 
  variant = 'primary', 
  showText = true, 
  text,
  fullScreen = true 
}: SpinnerLoadingProps) {
  const { t } = useTranslation()
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
  
  // Animation values
  const spinValue = useRef(new Animated.Value(0)).current
  const pulseValue = useRef(new Animated.Value(1)).current
  const fadeValue = useRef(new Animated.Value(0)).current
  const scaleValue = useRef(new Animated.Value(0.3)).current
  const orbitalValue = useRef(new Animated.Value(0)).current
  
  // Size configurations
  const sizeConfig = {
    small: { container: 60, spinner: 40, icon: 16, text: 12 },
    medium: { container: 80, spinner: 60, icon: 20, text: 14 },
    large: { container: 120, spinner: 90, icon: 28, text: 16 }
  }
  
  const currentSize = sizeConfig[size]
  
  useEffect(() => {
    // Main spinning animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    )
    
    // Pulsing animation for the center
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    )
    
    // Orbital dots animation
    const orbitalAnimation = Animated.loop(
      Animated.timing(orbitalValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    )
    
    // Entrance animation
    const entranceAnimation = Animated.parallel([
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ])
    
    // Start animations
    entranceAnimation.start()
    spinAnimation.start()
    pulseAnimation.start()
    orbitalAnimation.start()
    
    return () => {
      spinAnimation.stop()
      pulseAnimation.stop()
      orbitalAnimation.stop()
    }
  }, [])
  
  // Spin interpolation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })
  
  // Orbital interpolation
  const orbital = orbitalValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })
  
  const renderSpinnerContent = () => {
    if (variant === 'minimal') {
      return (
        <Animated.View
          style={{
            width: currentSize.spinner,
            height: currentSize.spinner,
            transform: [{ rotate: spin }],
          }}
        >
          <Div
            w={currentSize.spinner}
            h={currentSize.spinner}
            rounded="circle"
            borderWidth={3}
            borderColor="transparent"
            borderTopColor="#1f2937"
            borderRightColor="rgba(31, 41, 55, 0.3)"
            borderBottomColor="rgba(31, 41, 55, 0.1)"
            borderLeftColor="rgba(31, 41, 55, 0.3)"
          />
        </Animated.View>
      )
    }
    
    if (variant === 'secondary') {
      return (
        <Div alignItems="center" justifyContent="center">
          {/* Outer rotating ring */}
          <Animated.View
            style={{
              position: 'absolute',
              width: currentSize.spinner,
              height: currentSize.spinner,
              transform: [{ rotate: spin }],
            }}
          >
            <LinearGradient
              colors={['#3b82f6', '#8b5cf6', '#ec4899']}
              style={{
                width: currentSize.spinner,
                height: currentSize.spinner,
                borderRadius: currentSize.spinner / 2,
                padding: 3,
              }}
            >
              <Div
                w={currentSize.spinner - 6}
                h={currentSize.spinner - 6}
                rounded="circle"
                bg="white"
              />
            </LinearGradient>
          </Animated.View>
          
          {/* Center pulsing icon */}
          <Animated.View
            style={{
              transform: [{ scale: pulseValue }],
            }}
          >
            <Div
              w={currentSize.spinner * 0.4}
              h={currentSize.spinner * 0.4}
              rounded="circle"
              bg="#3b82f6"
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons name="storefront" size={currentSize.icon} color="white" />
            </Div>
          </Animated.View>
        </Div>
      )
    }
    
    // Primary variant (default)
    return (
      <Div alignItems="center" justifyContent="center">
        {/* Outer orbital dots */}
        <Animated.View
          style={{
            position: 'absolute',
            width: currentSize.spinner + 20,
            height: currentSize.spinner + 20,
            transform: [{ rotate: orbital }],
          }}
        >
          {[0, 60, 120, 180, 240, 300].map((angle, index) => (
            <Div
              key={angle}
              position="absolute"
              w={6}
              h={6}
              rounded="circle"
              bg={`hsl(${angle + 180}, 70%, 60%)`}
              style={{
                top: Math.cos((angle * Math.PI) / 180) * (currentSize.spinner / 2 + 10) + (currentSize.spinner + 20) / 2 - 3,
                left: Math.sin((angle * Math.PI) / 180) * (currentSize.spinner / 2 + 10) + (currentSize.spinner + 20) / 2 - 3,
              }}
            />
          ))}
        </Animated.View>
        
        {/* Main spinning ring */}
        <Animated.View
          style={{
            width: currentSize.spinner,
            height: currentSize.spinner,
            transform: [{ rotate: spin }],
          }}
        >
          <LinearGradient
            colors={['#1f2937', '#3b82f6', '#10b981', '#f59e0b']}
            style={{
              width: currentSize.spinner,
              height: currentSize.spinner,
              borderRadius: currentSize.spinner / 2,
              padding: 4,
            }}
          >
            <Div
              w={currentSize.spinner - 8}
              h={currentSize.spinner - 8}
              rounded="circle"
              bg="white"
            />
          </LinearGradient>
        </Animated.View>
        
        {/* Center pulsing shopping bag */}
        <Animated.View
          style={{
            position: 'absolute',
            transform: [{ scale: pulseValue }],
          }}
        >
          <Div
            w={currentSize.spinner * 0.45}
            h={currentSize.spinner * 0.45}
            rounded="circle"
            bg="white"
            alignItems="center"
            justifyContent="center"
            shadow="md"
          >
            <LinearGradient
              colors={['#1f2937', '#374151']}
              style={{
                width: currentSize.spinner * 0.35,
                height: currentSize.spinner * 0.35,
                borderRadius: (currentSize.spinner * 0.35) / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="bag" size={currentSize.icon} color="white" />
            </LinearGradient>
          </Div>
        </Animated.View>
        
        {/* Inner rotating elements */}
        <Animated.View
          style={{
            position: 'absolute',
            width: currentSize.spinner * 0.7,
            height: currentSize.spinner * 0.7,
            transform: [{ rotate: spin }],
          }}
        >
          {[0, 90, 180, 270].map((angle, index) => (
            <Div
              key={angle}
              position="absolute"
              w={4}
              h={4}
              rounded="circle"
              bg="#3b82f6"
              style={{
                top: Math.cos((angle * Math.PI) / 180) * (currentSize.spinner * 0.3) + (currentSize.spinner * 0.7) / 2 - 2,
                left: Math.sin((angle * Math.PI) / 180) * (currentSize.spinner * 0.3) + (currentSize.spinner * 0.7) / 2 - 2,
              }}
            />
          ))}
        </Animated.View>
      </Div>
    )
  }
  
  const loadingText = text || t('loading') || 'Loading...'
  
  if (!fullScreen) {
    return (
      <Animated.View
        style={{
          opacity: fadeValue,
          transform: [{ scale: scaleValue }],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {renderSpinnerContent()}
        {showText && (
          <Text
            fontSize={currentSize.text}
            color="#6b7280"
            fontWeight="500"
            mt={16}
            textAlign="center"
          >
            {loadingText}
          </Text>
        )}
      </Animated.View>
    )
  }
  
  return (
    <Div
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(255, 255, 255, 0.95)"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
    >
      <Animated.View
        style={{
          opacity: fadeValue,
          transform: [{ scale: scaleValue }],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {renderSpinnerContent()}
        
        {showText && (
          <Animated.View
            style={{
              opacity: fadeValue,
              marginTop: 24,
            }}
          >
            <Text
              fontSize={currentSize.text}
              color="#1f2937"
              fontWeight="600"
              textAlign="center"
              mb={4}
            >
              {loadingText}
            </Text>
            <Text
              fontSize={currentSize.text - 2}
              color="#6b7280"
              textAlign="center"
            >
              {t('please_wait') || 'Please wait...'}
            </Text>
          </Animated.View>
        )}
        
        {/* Decorative elements */}
        <Div position="absolute" top={-60} left={-60} opacity={0.1}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <MaterialIcons name="shopping-cart" size={24} color="#3b82f6" />
          </Animated.View>
        </Div>
        
        <Div position="absolute" bottom={-60} right={-60} opacity={0.1}>
          <Animated.View style={{ transform: [{ rotate: orbital }] }}>
            <MaterialIcons name="storefront" size={20} color="#10b981" />
          </Animated.View>
        </Div>
      </Animated.View>
    </Div>
  )
}
