import React, { useRef, useEffect, useState } from 'react'
import { Animated, ScrollView, Pressable, Platform, StatusBar } from 'react-native'
import { Div, Text } from 'react-native-magnus'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons'

interface PrivacySection {
  id: string
  title: string
  content: string
  icon: string
  color: string
}

export default function Privacy() {
  const { t, i18n } = useTranslation()
  const navigation = useNavigation<any>()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  
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

  // Privacy Sections Data
  const privacySections: PrivacySection[] = [
    {
      id: '1',
      title: t('information_collection') || 'Information We Collect',
      content: t('information_collection_content') || 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes your name, email address, phone number, shipping address, and payment information.',
      icon: 'database',
      color: '#3b82f6'
    },
    {
      id: '2',
      title: t('how_we_use_info') || 'How We Use Your Information',
      content: t('how_we_use_info_content') || 'We use your information to process orders, provide customer service, send you updates about your orders, improve our services, and comply with legal obligations.',
      icon: 'settings',
      color: '#10b981'
    },
    {
      id: '3',
      title: t('information_sharing') || 'Information Sharing',
      content: t('information_sharing_content') || 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with trusted service providers who assist us in operating our app.',
      icon: 'share-2',
      color: '#f59e0b'
    },
    {
      id: '4',
      title: t('data_security') || 'Data Security',
      content: t('data_security_content') || 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.',
      icon: 'shield',
      color: '#ef4444'
    },
    {
      id: '5',
      title: t('cookies_tracking') || 'Cookies and Tracking',
      content: t('cookies_tracking_content') || 'We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and personalize content. You can control cookie settings through your device settings.',
      icon: 'eye',
      color: '#8b5cf6'
    },
    {
      id: '6',
      title: t('your_rights') || 'Your Rights',
      content: t('your_rights_content') || 'You have the right to access, update, or delete your personal information. You may also opt out of certain communications. Contact us to exercise these rights.',
      icon: 'user-check',
      color: '#06b6d4'
    },
    {
      id: '7',
      title: t('children_privacy') || 'Children\'s Privacy',
      content: t('children_privacy_content') || 'Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.',
      icon: 'users',
      color: '#84cc16'
    },
    {
      id: '8',
      title: t('policy_changes') || 'Policy Changes',
      content: t('policy_changes_content') || 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.',
      icon: 'refresh-cw',
      color: '#f97316'
    }
  ]

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id)
  }

  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
    <Div flex={1} bg="#f8fafc">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Professional Header */}
      <LinearGradient
        colors={['#1e293b', '#334155']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: Platform.OS === 'ios' ? 50 : 30,
          paddingBottom: 24,
          paddingHorizontal: 20,
        }}
      >
        <Div flexDir="row" alignItems="center" justifyContent="space-between" mb={16}>
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
            <Div flexDir="row" alignItems="center">
              <Feather name="shield" size={28} color="white" style={{ marginRight: 12 }} />
              <Text fontSize={24} fontWeight="800" color="white">
                {t('privacy_policy') || 'Privacy Policy'}
              </Text>
            </Div>
          </Div>
          
          <Div w={48} /> {/* Spacer for centering */}
        </Div>
        
        <Div alignItems="center">
          <Text fontSize={14} color="rgba(255,255,255,0.8)" textAlign="center" lineHeight={20}>
            {t('privacy_subtitle') || 'Your privacy and data protection are our top priorities'}
          </Text>
          <Div flexDir="row" alignItems="center" mt={8}>
            <Feather name="calendar" size={14} color="rgba(255,255,255,0.6)" />
            <Text fontSize={12} color="rgba(255,255,255,0.6)" ml={6}>
              {t('last_updated')}: {t('december_2024') || 'December 2024'}
            </Text>
          </Div>
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
          {/* Introduction Card */}
          <Div p={20}>
            <Div
              bg="white"
              p={24}
              rounded={20}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Div flexDir="row" alignItems="center" mb={16}>
                <Div
                  w={48}
                  h={48}
                  rounded="circle"
                  bg="#dbeafe"
                  alignItems="center"
                  justifyContent="center"
                  mr={16}
                >
                  <Feather name="info" size={24} color="#1d4ed8" />
                </Div>
                <Div flex={1}>
                  <Text fontSize={18} fontWeight="700" color="#111827" mb={4}>
                    {t('privacy_intro_title') || 'Introduction'}
                  </Text>
                  <Text fontSize={14} color="#6b7280">
                    {t('effective_date') || 'Effective Date'}: {t('december_2024') || 'December 2024'}
                  </Text>
                </Div>
              </Div>
              
              <Text fontSize={15} color="#374151" lineHeight={24}>
                {t('privacy_intro_content') || 'This Privacy Policy describes how Vendora ("we", "our", or "us") collects, uses, and shares your personal information when you use our mobile application and services. We are committed to protecting your privacy and ensuring transparency about our data practices.'}
              </Text>
            </Div>
          </Div>

          {/* Privacy Sections */}
          <Div px={20} pb={20}>
            {privacySections.map((section, index) => (
              <Div key={section.id} mb={16}>
                <Pressable onPress={() => toggleSection(section.id)}>
                  <Div
                    bg="white"
                    rounded={20}
                    borderWidth={expandedSection === section.id ? 2 : 1}
                    borderColor={expandedSection === section.id ? section.color : "#e5e7eb"}
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 8,
                      elevation: 3,
                    }}
                  >
                    <Div p={20}>
                      <Div flexDir="row" alignItems="center" justifyContent="space-between">
                        <Div flexDir="row" alignItems="center" flex={1}>
                          <Div
                            w={44}
                            h={44}
                            rounded="circle"
                            bg={expandedSection === section.id ? section.color : `${section.color}20`}
                            alignItems="center"
                            justifyContent="center"
                            mr={16}
                          >
                            <Feather 
                              name={section.icon as any} 
                              size={20} 
                              color={expandedSection === section.id ? "white" : section.color} 
                            />
                          </Div>
                          <Div flex={1}>
                            <Text 
                              fontSize={16} 
                              fontWeight="700" 
                              color="#111827" 
                              mb={4}
                            >
                              {section.title}
                            </Text>
                            <Text fontSize={12} color="#6b7280">
                              {t('tap_to_read_more') || 'Tap to read more'}
                            </Text>
                          </Div>
                        </Div>
                        <Div
                          w={32}
                          h={32}
                          rounded="circle"
                          bg={expandedSection === section.id ? `${section.color}20` : "#f3f4f6"}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Ionicons 
                            name={expandedSection === section.id ? "chevron-up" : "chevron-down"} 
                            size={18} 
                            color={expandedSection === section.id ? section.color : "#6b7280"} 
                          />
                        </Div>
                      </Div>
                      
                      {expandedSection === section.id && (
                        <Div mt={20} pt={20} borderTopWidth={1} borderTopColor="#f3f4f6">
                          <Text fontSize={15} color="#374151" lineHeight={26}>
                            {section.content}
                          </Text>
                        </Div>
                      )}
                    </Div>
                  </Div>
                </Pressable>
              </Div>
            ))}
          </Div>

          {/* Contact Information Card */}
          <Div px={20} pb={20}>
            <Div
              bg="white"
              p={24}
              rounded={20}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Div flexDir="row" alignItems="center" mb={20}>
                <LinearGradient
                  colors={['#6366f1', '#8b5cf6']}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}
                >
                  <Feather name="mail" size={24} color="white" />
                </LinearGradient>
                <Div flex={1}>
                  <Text fontSize={18} fontWeight="700" color="#111827" mb={4}>
                    {t('questions_concerns') || 'Questions or Concerns?'}
                  </Text>
                  <Text fontSize={14} color="#6b7280">
                    {t('contact_privacy_team') || 'Contact our privacy team'}
                  </Text>
                </Div>
              </Div>
              
              <Text fontSize={15} color="#374151" lineHeight={24} mb={20}>
                {t('privacy_contact_content') || 'If you have any questions about this Privacy Policy or our data practices, please contact us using the information below:'}
              </Text>
              
              <Div 
                bg="#f8fafc" 
                p={16} 
                rounded={12} 
                borderWidth={1} 
                borderColor="#e2e8f0"
              >
                <Text fontSize={14} fontWeight="600" color="#374151" mb={8}>
                  📧 Email: privacy@vendora.com
                </Text>
                <Text fontSize={14} fontWeight="600" color="#374151" mb={8}>
                  📞 Phone: +1 (555) 123-4567
                </Text>
                <Text fontSize={14} fontWeight="600" color="#374151">
                  📍 Address: 123 Privacy Street, Data City, DC 12345
                </Text>
              </Div>
            </Div>
          </Div>

          {/* Bottom Disclaimer */}
          <Div px={20} pb={40}>
            <Div
              bg="#1f2937"
              p={20}
              rounded={16}
              borderWidth={1}
              borderColor="#374151"
            >
              <Div flexDir="row" alignItems="center" mb={12}>
                <Feather name="alert-circle" size={20} color="#fbbf24" />
                <Text fontSize={16} fontWeight="600" color="white" ml={12}>
                  {t('important_notice') || 'Important Notice'}
                </Text>
              </Div>
              <Text fontSize={14} color="#d1d5db" lineHeight={22}>
                {t('privacy_disclaimer') || 'This privacy policy is effective as of the date stated above and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.'}
              </Text>
            </Div>
          </Div>
        </ScrollView>
      </Animated.View>
    </Div>
  )
}
