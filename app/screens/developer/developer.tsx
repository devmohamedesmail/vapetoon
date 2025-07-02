import React, { useRef, useEffect } from 'react'
import { Animated, ScrollView, Pressable, Platform, StatusBar, Linking, Alert } from 'react-native'
import { Div, Text, Button } from 'react-native-magnus'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

export default function Developer() {
  const { t, i18n } = useTranslation()
  const navigation = useNavigation<any>()
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  
  // Separate animation values for name (to avoid native driver conflicts)
  const nameTransformAnim = useRef(new Animated.Value(0)).current
  const nameColorAnim = useRef(new Animated.Value(0)).current

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

    // Beautiful continuous animation for the name
    const startNameAnimation = () => {
      // Transform animation (using native driver)
      Animated.loop(
        Animated.sequence([
          Animated.timing(nameTransformAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(nameTransformAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start()

      // Color animation (not using native driver)
      Animated.loop(
        Animated.sequence([
          Animated.timing(nameColorAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(nameColorAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start()
    }

    // Start name animation after entrance animation
    setTimeout(startNameAnimation, 1000)
  }, [])

  const handleBackPress = () => {
    navigation.goBack()
  }

  const handleContact = (type: 'phone' | 'whatsapp' | 'email' | 'website') => {
    let url = ''
    let errorMessage = ''

    switch (type) {
      case 'phone':
        url = 'tel:+971589107126'
        errorMessage = t('call_error') || 'Unable to make call'
        break
      case 'whatsapp':
        url = 'whatsapp://send?phone=971589107126'
        errorMessage = t('whatsapp_error') || 'WhatsApp is not installed'
        break
      case 'email':
        url = 'mailto:dev.mohamed.esmail@gmail.com'
        errorMessage = t('email_error') || 'Unable to open email'
        break
      case 'website':
        url = 'http://mohamedesmail.site/'
        errorMessage = t('website_error') || 'Unable to open website'
        break
    }

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url)
      } else {
        Alert.alert(t('error') || 'Error happened please try again later', errorMessage)
      }
    }).catch(() => {
      Alert.alert(t('error') || 'Error happened please try again later', errorMessage)
    })
  }

  const contactMethods = [
    {
      id: 'phone',
      title: t('call_developer') || 'Call Developer',
      subtitle: '+971 58 910 7126',
      icon: 'call',
      color: '#10b981',
      action: () => handleContact('phone')
    },
    {
      id: 'whatsapp',
      title: t('whatsapp_developer') || 'WhatsApp',
      subtitle: t('send_message') || 'Send a message',
      icon: 'logo-whatsapp',
      color: '#25d366',
      action: () => handleContact('whatsapp')
    },
    {
      id: 'email',
      title: t('email_developer') || 'Email',
      subtitle: 'dev.mohamed.esmail@gmail.com',
      icon: 'mail',
      color: '#3b82f6',
      action: () => handleContact('email')
    },
    {
      id: 'website',
      title: t('visit_portfolio') || 'Visit Portfolio',
      subtitle: 'mohamedesmail.site',
      icon: 'globe',
      color: '#8b5cf6',
      action: () => handleContact('website')
    }
  ]

  const skills = [
    { name: 'React Native', level: 95, color: '#61dafb' },
    { name: 'Web Development', level: 90, color: '#10b981' },
    { name: 'TypeScript', level: 88, color: '#3178c6' },
    { name: 'UI/UX Design', level: 85, color: '#f59e0b' },
    { name: 'Backend Development', level: 87, color: '#ef4444' },
    { name: 'Database Design', level: 82, color: '#8b5cf6' },
  ]

  const renderContactMethod = (method: any, index: number) => (
    <Animated.View
      key={method.id}
      style={{
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: scaleAnim }
        ]
      }}
    >
      <Pressable
        onPress={method.action}
        android_ripple={{ color: `${method.color}20` }}
      >
        <Div
          bg="white"
          mx="lg"
          mb="md"
          p="lg"
          rounded="2xl"
          row
          alignItems="center"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Div
            w={56}
            h={56}
            rounded="xl"
            mr="lg"
            justifyContent="center"
            alignItems="center"
            style={{
              backgroundColor: `${method.color}15`
            }}
          >
            <Ionicons 
              name={method.icon as any} 
              size={28} 
              color={method.color} 
            />
          </Div>

          <Div flex={1}>
            <Text
              fontSize="lg"
              fontWeight="700"
              color="gray900"
              mb="xs"
            >
              {method.title}
            </Text>
            <Text
              fontSize="sm"
              color="gray600"
            >
              {method.subtitle}
            </Text>
          </Div>

          <Ionicons 
            name={i18n.language === 'ar' ? 'chevron-back' : 'chevron-forward'} 
            size={20} 
            color="#9ca3af" 
          />
        </Div>
      </Pressable>
    </Animated.View>
  )

  const renderSkill = (skill: any, index: number) => (
    <Animated.View
      key={skill.name}
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }}
    >
      <Div mb="lg">
        <Div row justifyContent="space-between" alignItems="center" mb="sm">
          <Text fontSize="md" fontWeight="600" color="gray700">
            {skill.name}
          </Text>
          <Text fontSize="sm" color="gray500" fontWeight="600">
            {skill.level}%
          </Text>
        </Div>
        
        <Div
          w="100%"
          h={8}
          bg="gray200"
          rounded="lg"
          overflow="hidden"
        >
          <Animated.View
            style={{
              width: `${skill.level}%`,
              height: '100%',
              backgroundColor: skill.color,
              borderRadius: 8,
            }}
          />
        </Div>
      </Div>
    </Animated.View>
  )

  return (
    <Div flex={1} bg="gray50">
      <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1f2937', '#374151']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: Platform.OS === 'ios' ? 50 : 30,
          paddingBottom: 30,
          paddingHorizontal: 20,
        }}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          <Div row alignItems="center" justifyContent="space-between" mb="xl">
            <Pressable onPress={handleBackPress}>
              <Div
                w={40}
                h={40}
                rounded="xl"
                justifyContent="center"
                alignItems="center"
                bg="rgba(255, 255, 255, 0.1)"
              >
                <Ionicons 
                  name={i18n.language === 'ar' ? 'chevron-forward' : 'chevron-back'} 
                  size={24} 
                  color="white" 
                />
              </Div>
            </Pressable>

            <Text fontSize="xl" fontWeight="700" color="white">
              {t('developer_profile') || 'Developer Profile'}
            </Text>

            <Div w={40} />
          </Div>

          {/* Developer Info */}
          <Div alignItems="center">
            <Div
              w={100}
              h={100}
              rounded="circle"
              bg="white"
              justifyContent="center"
              alignItems="center"
              mb="lg"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 12,
              }}
            >
              <FontAwesome5 name="user-tie" size={40} color="#1f2937" />
            </Div>

            <Div alignItems="center">
              <Animated.View
                style={{
                  transform: [
                    { 
                      scale: nameTransformAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.05]
                      })
                    },
                    { 
                      rotate: nameTransformAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '2deg']
                      })
                    }
                  ]
                }}
              >
                <Animated.Text
                  style={{
                    fontSize: 28,
                    fontWeight: '800',
                    color: nameColorAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['#ffffff', '#fbbf24']
                    }),
                    marginBottom: 4,
                    textShadowColor: 'rgba(0,0,0,0.5)',
                    textShadowOffset: { width: 2, height: 2 },
                    textShadowRadius: 4,
                  }}
                >
                  Mohamed Esmail
                </Animated.Text>
              </Animated.View>
            
            <Text fontSize="lg" color="rgba(255, 255, 255, 0.8)" mb="sm">
              {t('full_stack_developer') || 'Full Stack Developer'}
            </Text>

            <Div row alignItems="center">
              <Ionicons name="location" size={16} color="rgba(255, 255, 255, 0.7)" />
              <Text fontSize="sm" color="rgba(255, 255, 255, 0.7)" ml="xs">
                UAE
              </Text>
            </Div>
            </Div>
          </Div>
        </Animated.View>
      </LinearGradient>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* About Section */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }}
        >
          <Div bg="white" mx="lg" mt="lg" p="xl" rounded="2xl" mb="lg"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Div row alignItems="center" mb="lg">
              <Ionicons name="person-circle" size={24} color="#6366f1" />
              <Text fontSize="lg" fontWeight="700" color="gray900" ml="sm">
                {t('about_developer') || 'About Developer'}
              </Text>
            </Div>
            
            <Text fontSize="md" color="gray600" lineHeight={22}>
              {t('developer_bio') || 'Passionate mobile app developer specializing in React Native and cross-platform development. With expertise in creating beautiful, functional, and user-friendly applications that deliver exceptional user experiences.'}
            </Text>
          </Div>
        </Animated.View>

        {/* Skills Section */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }}
        >
          <Div bg="white" mx="lg" mb="lg" p="xl" rounded="2xl"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Div row alignItems="center" mb="lg">
              <Ionicons name="code-slash" size={24} color="#10b981" />
              <Text fontSize="lg" fontWeight="700" color="gray900" ml="sm">
                {t('technical_skills') || 'Technical Skills'}
              </Text>
            </Div>
            
            {skills.map(renderSkill)}
          </Div>
        </Animated.View>

        {/* Contact Methods */}
        <Div mb="lg">
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }}
          >
            <Text fontSize="lg" fontWeight="700" color="gray900" mx="lg" mb="md">
              {t('get_in_touch') || 'Get in Touch'}
            </Text>
          </Animated.View>
          
          {contactMethods.map(renderContactMethod)}
        </Div>

        {/* Footer */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }}
        >
          <Div alignItems="center" px="lg" mt="lg">
            <Text fontSize="sm" color="gray500" textAlign="center" lineHeight={20}>
              {t('developer_footer') || 'Built with ❤️ using React Native\nFor inquiries about app development or collaboration opportunities, feel free to reach out!'}
            </Text>
          </Div>
        </Animated.View>
      </ScrollView>
    </Div>
  )
}
