import React, { useContext, useState, useRef, useEffect } from 'react'
import { Animated, Pressable, Dimensions, Platform } from 'react-native'
import { Div, Text } from 'react-native-magnus'
import { LinearGradient } from 'expo-linear-gradient'

// Icons
import { Ionicons, MaterialIcons, Feather, Foundation } from '@expo/vector-icons'

// Config & Context
import Custom_colors from '../../config/Custom_colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { AuthContext } from '../../Context/AuthProvider'

// Conditional BlurView import
let BlurView
try {
  BlurView = require('expo-blur').BlurView
} catch (error) {
  BlurView = null
}

const { width: screenWidth } = Dimensions.get('window')

// Modern Tab Item Component
const TabItem = ({ 
  icon, 
  activeIcon, 
  label, 
  isActive, 
  onPress, 
  badge,
  isCenter = false 
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current
  const translateYAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0.6)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateYAnim, {
        toValue: isActive ? -4 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 1 : 0.6,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }, [isActive])

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()
    onPress()
  }

  if (isCenter) {
    return (
      <Div flex={1} alignItems="center" justifyContent="center">
        <Pressable onPress={handlePress}>
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#667eea',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
                marginBottom: 20,
              }}
            >
              {activeIcon}
              {badge > 0 && (
                <Div
                  position="absolute"
                  top={-5}
                  right={-5}
                  bg="#ef4444"
                  minW={20}
                  h={20}
                  rounded="circle"
                  alignItems="center"
                  justifyContent="center"
                  borderWidth={2}
                  borderColor="white"
                >
                  <Text fontSize={10} color="white" fontWeight="bold">
                    {badge > 99 ? '99+' : badge}
                  </Text>
                </Div>
              )}
            </LinearGradient>
          </Animated.View>
        </Pressable>
      </Div>
    )
  }

  return (
    <Div flex={1} alignItems="center" justifyContent="center" position="relative">
      <Pressable onPress={handlePress}>
        <Animated.View
          style={{
            transform: [
              { scale: scaleAnim },
              { translateY: translateYAnim }
            ],
            opacity: opacityAnim,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
        >
          {/* Active Background */}
          {isActive && (
            <Div
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="rgba(102, 126, 234, 0.1)"
              rounded={20}
            />
          )}
          
          {/* Icon */}
          <Div mb={4}>
            {isActive ? activeIcon : icon}
          </Div>
          
          {/* Label */}
          <Text 
            fontSize={11} 
            fontWeight={isActive ? "600" : "500"}
            color={isActive ? "#667eea" : "#6b7280"}
            textAlign="center"
          >
            {label}
          </Text>

          {/* Badge */}
          {badge > 0 && (
            <Div
              position="absolute"
              top={-2}
              right={8}
              bg="#ef4444"
              minW={16}
              h={16}
              rounded="circle"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize={9} color="white" fontWeight="bold">
                {badge > 99 ? '99+' : badge}
              </Text>
            </Div>
          )}
        </Animated.View>
      </Pressable>
    </Div>
  )
}

export default function Bottom_Navbar() {
  const navigation = useNavigation()
  const route = useRoute()
  const { t } = useTranslation()
  const products = useSelector(state => state.cart.products)
  const wishlist = useSelector(state => state.wishlist.items)
  const { auth } = useContext(AuthContext)

  // Get current route name
  const currentRoute = route.name

  // Tab configuration
  const tabs = [
    {
      id: 'home',
      label: t('home'),
      icon: <Ionicons name="home-outline" size={22} color="#6b7280" />,
      activeIcon: <Ionicons name="home" size={22} color="#667eea" />,
      onPress: () => navigation.navigate('Home'),
      routeNames: ['Home']
    },
    {
      id: 'vendors',
      label: t('vendors'),
      icon: <Foundation name="torsos-all" size={22} color="#6b7280" />,
      activeIcon: <Foundation name="torsos-all" size={22} color="#667eea" />,
      onPress: () => navigation.navigate('Vendors'),
      routeNames: ['Vendors'],
      badge: wishlist.length
    },
    {
      id: 'cart',
      label: t('cart'),
      icon: <Ionicons name="bag-outline" size={24} color="white" />,
      activeIcon: <Ionicons name="bag" size={24} color="white" />,
      onPress: () => navigation.navigate('Cart'),
      routeNames: ['Cart'],
      badge: products.length,
      isCenter: true
    },
    {
      id: 'shop',
      label: t('shop'),
      icon: <Ionicons name="storefront-outline" size={22} color="#6b7280" />,
      activeIcon: <Ionicons name="storefront" size={22} color="#667eea" />,
      onPress: () => navigation.navigate('Shop'),
      routeNames: ['Shop']
    },
    {
      id: 'account',
      label: t('account'),
      icon: <Feather name="user" size={22} color="#6b7280" />,
      activeIcon: <Feather name="user" size={22} color="#667eea" />,
      onPress: () => {
        if (auth) {
          navigation.navigate('Account')
        } else {
          navigation.navigate('Login')
        }
      },
      routeNames: ['Account', 'Login']
    }
  ]

  return (
    <Div
      position="absolute"
      bottom={0}
      
      h={Platform.OS === 'ios' ? 80 : 70}
      left={0}
      right={0}
      zIndex={1000}
    >
      {/* Backdrop blur effect - with fallback */}
      {BlurView ? (
        <BlurView
          intensity={20}
          tint="light"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      ) : (
        <Div
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(255, 255, 255, 0.95)"
        />
      )}
      
      {/* Main container */}
      <Div
        bg={BlurView ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.98)"}
        pt={20}
        pb={32}
        px={12}
        borderTopWidth={1}
        borderTopColor="rgba(229, 231, 235, 0.5)"
        style={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        {/* Active indicator line */}
        <Div
          position="absolute"
          top={8}
          left="50%"
          w={40}
          h={4}
          bg="rgba(107, 114, 128, 0.3)"
          rounded={2}
          style={{
            marginLeft: -20,
          }}
        />

        {/* Tab items */}
        <Div flexDir="row" alignItems="center" justifyContent="space-around">
          {tabs.map((tab) => (
            <TabItem
              key={tab.id}
              icon={tab.icon}
              activeIcon={tab.activeIcon}
              label={tab.label}
              isActive={tab.routeNames.includes(currentRoute)}
              onPress={tab.onPress}
              badge={tab.badge || 0}
              isCenter={tab.isCenter}
            />
          ))}
        </Div>
      </Div>
    </Div>
  )
}
