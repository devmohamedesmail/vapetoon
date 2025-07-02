import React, { useRef, useEffect, useState } from 'react'
import { Animated, ScrollView, Pressable, Linking, Platform, StatusBar } from 'react-native'
import { Div, Text, Button } from 'react-native-magnus'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons'

interface FAQItem {
  id: string
  question: string
  answer: string
  icon: string
}

interface ContactMethod {
  id: string
  title: string
  subtitle: string
  icon: string
  action: () => void
  color: string
}

export default function Help() {
  const { t, i18n } = useTranslation()
  const navigation = useNavigation<any>()
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
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

  // FAQ Data
  const faqData: FAQItem[] = [
    {
      id: '1',
      question: t('how_to_place_order') || 'How to place an order?',
      answer: t('place_order_answer') || 'Browse products, add items to cart, proceed to checkout, enter your details, and confirm payment.',
      icon: 'shopping-cart'
    },
    {
      id: '2',
      question: t('payment_methods') || 'What payment methods do you accept?',
      answer: t('payment_methods_answer') || 'We accept credit cards, debit cards, PayPal, and cash on delivery.',
      icon: 'credit-card'
    },
    {
      id: '3',
      question: t('delivery_time') || 'How long does delivery take?',
      answer: t('delivery_time_answer') || 'Standard delivery takes 2-5 business days. Express delivery is available for next-day delivery.',
      icon: 'truck'
    },
    {
      id: '4',
      question: t('return_policy') || 'What is your return policy?',
      answer: t('return_policy_answer') || 'Items can be returned within 30 days of purchase in original condition with receipt.',
      icon: 'refresh-cw'
    },
    {
      id: '5',
      question: t('track_order') || 'How can I track my order?',
      answer: t('track_order_answer') || 'You can track your order in the "My Orders" section or through the tracking link sent via email.',
      icon: 'map-pin'
    },
    {
      id: '6',
      question: t('account_issues') || 'Having account issues?',
      answer: t('account_issues_answer') || 'Try resetting your password or contact support if you cannot access your account.',
      icon: 'user'
    }
  ]

  // Contact Methods
  const contactMethods: ContactMethod[] = [
    {
      id: 'email',
      title: t('email_support') || 'Email Support',
      subtitle: 'support@vendora.com',
      icon: 'mail',
      action: () => Linking.openURL('mailto:support@vendora.com'),
      color: '#3b82f6'
    },
    {
      id: 'phone',
      title: t('phone_support') || 'Phone Support',
      subtitle: '+1 (555) 123-4567',
      icon: 'phone',
      action: () => Linking.openURL('tel:+15551234567'),
      color: '#10b981'
    },
    {
      id: 'chat',
      title: t('live_chat') || 'Live Chat',
      subtitle: t('chat_available') || 'Available 24/7',
      icon: 'message-circle',
      action: () => {/* Open chat */},
      color: '#8b5cf6'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      subtitle: '+1 (555) 123-4567',
      icon: 'message-square',
      action: () => Linking.openURL('https://wa.me/15551234567'),
      color: '#22c55e'
    }
  ]

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
    <Div flex={1} bg="#f8fafc">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Professional Header */}
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: Platform.OS === 'ios' ? 50 : 30,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <Div flexDir="row" alignItems="center" justifyContent="space-between">
          <Pressable 
            onPress={handleBackPress}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 12,
              padding: 12,
            }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          
          <Div flex={1} alignItems="center">
            <Text fontSize={24} fontWeight="800" color="white">
              {t('help_support') || 'Help & Support'}
            </Text>
            <Text fontSize={14} color="rgba(255,255,255,0.8)" mt={4}>
              {t('help_subtitle') || 'We\'re here to help you'}
            </Text>
          </Div>
          
          <Div w={48} /> {/* Spacer for centering */}
        </Div>
      </LinearGradient>

      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim }
          ]
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Quick Actions Section */}
          <Div p={20}>
            <Text fontSize={20} fontWeight="700" color="#111827" mb={16}>
              🚀 {t('quick_actions') || 'Quick Actions'}
            </Text>
            
            <Div flexDir="row" flexWrap="wrap" justifyContent="space-between">
              <Pressable
                onPress={() => navigation.navigate('Orders')}
                style={{ width: '48%', marginBottom: 12 }}
              >
                <LinearGradient
                  colors={['#dbeafe', '#bfdbfe']}
                  style={{
                    padding: 20,
                    borderRadius: 16,
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="receipt-outline" size={32} color="#1d4ed8" />
                  <Text fontSize={14} fontWeight="600" color="#1d4ed8" mt={8} textAlign="center">
                    {t('my_orders') || 'My Orders'}
                  </Text>
                </LinearGradient>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate('Account')}
                style={{ width: '48%', marginBottom: 12 }}
              >
                <LinearGradient
                  colors={['#dcfce7', '#bbf7d0']}
                  style={{
                    padding: 20,
                    borderRadius: 16,
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="person-outline" size={32} color="#059669" />
                  <Text fontSize={14} fontWeight="600" color="#059669" mt={8} textAlign="center">
                    {t('my_account') || 'My Account'}
                  </Text>
                </LinearGradient>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate('Wishlist')}
                style={{ width: '48%', marginBottom: 12 }}
              >
                <LinearGradient
                  colors={['#fce7f3', '#fbcfe8']}
                  style={{
                    padding: 20,
                    borderRadius: 16,
                    alignItems: 'center',
                  }}
                >
                  <AntDesign name="hearto" size={32} color="#be185d" />
                  <Text fontSize={14} fontWeight="600" color="#be185d" mt={8} textAlign="center">
                    {t('wishlist') || 'Wishlist'}
                  </Text>
                </LinearGradient>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate('Cart')}
                style={{ width: '48%', marginBottom: 12 }}
              >
                <LinearGradient
                  colors={['#fef3c7', '#fde68a']}
                  style={{
                    padding: 20,
                    borderRadius: 16,
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="bag-outline" size={32} color="#d97706" />
                  <Text fontSize={14} fontWeight="600" color="#d97706" mt={8} textAlign="center">
                    {t('my_cart') || 'My Cart'}
                  </Text>
                </LinearGradient>
              </Pressable>
            </Div>
          </Div>

          {/* FAQ Section */}
          <Div p={20}>
            <Text fontSize={20} fontWeight="700" color="#111827" mb={16}>
              ❓ {t('frequently_asked') || 'Frequently Asked Questions'}
            </Text>
            
            {faqData.map((faq, index) => (
              <Div key={faq.id} mb={12}>
                <Pressable onPress={() => toggleFAQ(faq.id)}>
                  <Div
                    bg="white"
                    p={20}
                    rounded={16}
                    borderWidth={expandedFAQ === faq.id ? 2 : 1}
                    borderColor={expandedFAQ === faq.id ? "#6366f1" : "#e5e7eb"}
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 8,
                      elevation: 2,
                    }}
                  >
                    <Div flexDir="row" alignItems="center" justifyContent="space-between">
                      <Div flexDir="row" alignItems="center" flex={1}>
                        <Div
                          w={40}
                          h={40}
                          rounded="circle"
                          bg={expandedFAQ === faq.id ? "#6366f1" : "#f3f4f6"}
                          alignItems="center"
                          justifyContent="center"
                          mr={16}
                        >
                          <Feather 
                            name={faq.icon as any} 
                            size={18} 
                            color={expandedFAQ === faq.id ? "white" : "#6b7280"} 
                          />
                        </Div>
                        <Text 
                          fontSize={16} 
                          fontWeight="600" 
                          color="#111827" 
                          flex={1}
                        >
                          {faq.question}
                        </Text>
                      </Div>
                      <Ionicons 
                        name={expandedFAQ === faq.id ? "chevron-up" : "chevron-down"} 
                        size={20} 
                        color="#6b7280" 
                      />
                    </Div>
                    
                    {expandedFAQ === faq.id && (
                      <Div mt={16} pt={16} borderTopWidth={1} borderTopColor="#f3f4f6">
                        <Text fontSize={15} color="#4b5563" lineHeight={24}>
                          {faq.answer}
                        </Text>
                      </Div>
                    )}
                  </Div>
                </Pressable>
              </Div>
            ))}
          </Div>

          {/* Contact Support Section */}
          <Div p={20}>
            <Text fontSize={20} fontWeight="700" color="#111827" mb={16}>
              📞 {t('contact_support') || 'Contact Support'}
            </Text>
            
            {contactMethods.map((method, index) => (
              <Pressable key={method.id} onPress={method.action}>
                <Div
                  bg="white"
                  p={20}
                  rounded={16}
                  mb={12}
                  flexDir="row"
                  alignItems="center"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 2,
                  }}
                >
                  <Div
                    w={48}
                    h={48}
                    rounded="circle"
                    bg={method.color}
                    alignItems="center"
                    justifyContent="center"
                    mr={16}
                  >
                    <Feather name={method.icon as any} size={20} color="white" />
                  </Div>
                  
                  <Div flex={1}>
                    <Text fontSize={16} fontWeight="600" color="#111827" mb={4}>
                      {method.title}
                    </Text>
                    <Text fontSize={14} color="#6b7280">
                      {method.subtitle}
                    </Text>
                  </Div>
                  
                  <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </Div>
              </Pressable>
            ))}
          </Div>

          {/* App Info Section */}
          <Div p={20} pb={40}>
            <Text fontSize={20} fontWeight="700" color="#111827" mb={16}>
              ℹ️ {t('app_information') || 'App Information'}
            </Text>
            
            <Div
              bg="white"
              p={24}
              rounded={16}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Div flexDir="row" justifyContent="space-between" alignItems="center" mb={16}>
                <Text fontSize={16} color="#6b7280">{t('app_version') || 'App Version'}</Text>
                <Text fontSize={16} fontWeight="600" color="#111827">1.0.0</Text>
              </Div>
              
              <Div flexDir="row" justifyContent="space-between" alignItems="center" mb={16}>
                <Text fontSize={16} color="#6b7280">{t('last_updated') || 'Last Updated'}</Text>
                <Text fontSize={16} fontWeight="600" color="#111827">Dec 2024</Text>
              </Div>
              
              <Div borderTopWidth={1} borderTopColor="#f3f4f6" pt={16}>
                <Pressable onPress={() => Linking.openURL('https://vendora.com/privacy')}>
                  <Div flexDir="row" justifyContent="space-between" alignItems="center" mb={12}>
                    <Text fontSize={16} color="#6366f1" fontWeight="600">
                      {t('privacy_policy') || 'Privacy Policy'}
                    </Text>
                    <Ionicons name="open-outline" size={16} color="#6366f1" />
                  </Div>
                </Pressable>
                
                <Pressable onPress={() => Linking.openURL('https://vendora.com/terms')}>
                  <Div flexDir="row" justifyContent="space-between" alignItems="center">
                    <Text fontSize={16} color="#6366f1" fontWeight="600">
                      {t('terms_service') || 'Terms of Service'}
                    </Text>
                    <Ionicons name="open-outline" size={16} color="#6366f1" />
                  </Div>
                </Pressable>
              </Div>
            </Div>
          </Div>
        </ScrollView>
      </Animated.View>
    </Div>
  )
}
