import React from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, Dimensions } from 'react-native'
import { Div, Text, Button } from 'react-native-magnus'
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

export default function Cart_Empty() {
    const { height: screenHeight } = Dimensions.get('window');
    const { t } = useTranslation();
    const navigation = useNavigation<any>(); // Add type assertion to fix TypeScript error

    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(50)).current;
  
    React.useEffect(() => {
        // Animate content in
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleContinueShopping = () => {
        navigation.navigate("Shop");
    };




  return (
    <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 40,
            marginTop: screenHeight * 0.1,
          }}
        >
          <Div alignItems="center" justifyContent="center">
            {/* Empty Cart Icon */}
            <Div
              w={120}
              h={120}
              rounded="circle"
              bg="rgba(107, 114, 128, 0.1)"
              alignItems="center"
              justifyContent="center"
              mb={24}
            >
              <Ionicons name="bag-outline" size={60} color="#6b7280" />
            </Div>
    
            {/* Empty State Text */}
            <Text fontSize={24} fontWeight="700" color="#1f2937" mb={12} textAlign="center">
              {t('cart_empty_title') || 'Your cart is empty'}
            </Text>
            
            <Text fontSize={16} color="#6b7280" textAlign="center" lineHeight={24} mb={32}>
              {t('cart_empty_subtitle') || 'Looks like you haven\'t added any items to your cart yet. Start shopping to fill it up!'}
            </Text>
    
            {/* Continue Shopping Button */}
            <Button
              bg="#1f2937"
              h={50}
              px={32}
              rounded={12}
              onPress={handleContinueShopping}
              flexDir="row"
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons name="storefront" size={20} color="white" style={{ marginRight: 8 }} />
              <Text color="white" fontSize={16} fontWeight="600">
                {t('continue_shopping') || 'Continue Shopping'}
              </Text>
            </Button>
          </Div>
        </Animated.View>
  )
}
