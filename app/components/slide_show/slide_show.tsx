import React, { useRef, useEffect, useState } from 'react'
import { Animated, ScrollView, Pressable, Dimensions, Platform, ImageBackground } from 'react-native'
import { Div, Text, Button } from 'react-native-magnus'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const { width: screenWidth } = Dimensions.get('window')

interface SlideItem {
  id: string
  title: string
  subtitle: string
  description: string
  buttonText: string
  image: any
  backgroundColor: string[]
  textColor: string
  action: () => void
}

export default function Slide_Show() {
  const { t, i18n } = useTranslation()
  const navigation = useNavigation<any>()
  const scrollViewRef = useRef<ScrollView>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true)
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current

  // Slide data
  const slides: SlideItem[] = [
    {
      id: '1',
      title: t('welcome_to_vendora') || 'Welcome to Vendora',
      subtitle: t('discover_amazing_products') || 'Discover Amazing Products',
      description: t('explore_thousands_products') || 'Explore thousands of products from trusted vendors worldwide',
      buttonText: t('slideshow_shop_now') || 'Shop Now',
      image: require('../../../assets/images/banner1.webp'),
      backgroundColor: ['#6366f1', '#8b5cf6'],
      textColor: 'white',
      action: () => navigation.navigate('Shop')
    },
    {
      id: '2',
      title: t('special_offers') || 'Special Offers',
      subtitle: t('up_to_50_off') || 'Up to 50% Off',
      description: t('limited_time_deals') || 'Limited time deals on your favorite brands and products',
      buttonText: t('view_deals') || 'View Deals',
      image: require('../../../assets/images/banner2.webp'),
      backgroundColor: ['#f59e0b', '#f97316'],
      textColor: 'white',
      action: () => navigation.navigate('Shop', { filter: 'deals' })
    },
    {
      id: '3',
      title: t('slideshow_fast_delivery') || 'Fast Delivery',
      subtitle: t('slideshow_free_shipping') || 'Free Shipping',
      description: t('get_products_delivered') || 'Get your products delivered to your doorstep in 24 hours',
      buttonText: t('learn_more') || 'Learn More',
      image: require('../../../assets/images/banner3.webp'),
      backgroundColor: ['#10b981', '#059669'],
      textColor: 'white',
      action: () => navigation.navigate('Help')
    }
  ]

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (autoPlayEnabled) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => {
          const nextSlide = (prev + 1) % slides.length
          scrollToSlide(nextSlide)
          return nextSlide
        })
      }, 4000) // Change slide every 4 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [autoPlayEnabled, slides.length])

  const scrollToSlide = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    })
  }

  const handleSlidePress = (index: number) => {
    setCurrentSlide(index)
    scrollToSlide(index)
    setAutoPlayEnabled(false)
    
    // Re-enable auto-play after 3 seconds
    setTimeout(() => {
      setAutoPlayEnabled(true)
    }, 3000)
  }

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x
    const index = Math.round(contentOffset / screenWidth)
    setCurrentSlide(index)
  }

  const renderSlide = (slide: SlideItem, index: number) => (
    <Div key={slide.id} w={screenWidth} h={240}>
      <ImageBackground
        source={slide.image}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[`${slide.backgroundColor[0]}20`, `${slide.backgroundColor[1]}15`, `${slide.backgroundColor[1]}10`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 24,
            backgroundColor: 'rgba(0,0,0,0.05)'
          }}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }}
          >
            {/* Content */}
            <Div mb="sm">
              <Text
                fontSize="sm"
                fontWeight="600"
                color={slide.textColor}
                mb="xs"
                style={{ opacity: 1, textShadowColor: 'rgba(0,0,0,0.9)', textShadowOffset: {width: 2, height: 2}, textShadowRadius: 4 }}
              >
                {slide.subtitle}
              </Text>
              
              <Text
                fontSize="2xl"
                fontWeight="800"
                color={slide.textColor}
                mb="sm"
                lineHeight={32}
                style={{ textShadowColor: 'rgba(0,0,0,0.9)', textShadowOffset: {width: 2, height: 2}, textShadowRadius: 5 }}
              >
                {slide.title}
              </Text>
              
              <Text
                fontSize="md"
                color={slide.textColor}
                mb="lg"
                lineHeight={22}
                style={{ opacity: 1, textShadowColor: 'rgba(0,0,0,0.9)', textShadowOffset: {width: 2, height: 2}, textShadowRadius: 4 }}
              >
                {slide.description}
              </Text>
            </Div>

            {/* Action Button */}
            <Pressable onPress={slide.action}>
              <Div
                bg="white"
                py="sm"
                px="xl"
                rounded="xl"
                row
                alignItems="center"
                justifyContent="center"
                alignSelf="flex-start"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Text
                  fontSize="md"
                  fontWeight="700"
                  color={slide.backgroundColor[0]}
                  mr="xs"
                >
                  {slide.buttonText}
                </Text>
                <Ionicons 
                  name={i18n.language === 'ar' ? 'chevron-back' : 'chevron-forward'} 
                  size={18} 
                  color={slide.backgroundColor[0]} 
                />
              </Div>
            </Pressable>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </Div>
  )

  const renderIndicator = (index: number) => (
    <Pressable
      key={index}
      onPress={() => handleSlidePress(index)}
      style={{ marginHorizontal: 4 }}
    >
      <Animated.View
        style={{
          width: currentSlide === index ? 24 : 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
          transform: [
            {
              scale: currentSlide === index ? 1.2 : 1
            }
          ]
        }}
      />
    </Pressable>
  )

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }]
      }}
    >
      <Div bg="white" rounded="2xl" mx="md" mb="lg" overflow="hidden">
        {/* Slide Show */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onTouchStart={() => setAutoPlayEnabled(false)}
          onTouchEnd={() => {
            setTimeout(() => setAutoPlayEnabled(true), 3000)
          }}
        >
          {slides.map(renderSlide)}
        </ScrollView>

        {/* Indicators */}
        <Div
          position="absolute"
          bottom={20}
          left={0}
          right={0}
          row
          justifyContent="center"
          alignItems="center"
        >
          {slides.map((_, index) => renderIndicator(index))}
        </Div>

        {/* Auto-play control */}
        <Pressable
          onPress={() => setAutoPlayEnabled(!autoPlayEnabled)}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialIcons
            name={autoPlayEnabled ? 'pause' : 'play-arrow'}
            size={20}
            color="white"
          />
        </Pressable>
      </Div>
    </Animated.View>
  )
}
