
import React, { useRef, useEffect } from 'react'
import { Animated, Pressable, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Div, Image, Text } from 'react-native-magnus'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

const { width: screenWidth } = Dimensions.get('window')
const itemWidth = (screenWidth - 60) / 2 // 2 items per row with padding

const Vendor_item = ({ item, index }) => {
    const navigation = useNavigation()
    const { t } = useTranslation()
    
    // Animation values
    const scaleAnim = useRef(new Animated.Value(0.95)).current
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(20)).current
    
    useEffect(() => {
        // Staggered entrance animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                delay: index * 100,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 80,
                friction: 8,
                delay: index * 100,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 100,
                friction: 8,
                delay: index * 100,
                useNativeDriver: true,
            }),
        ]).start()
    }, [index])

    const animatePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start(() => {
            navigation.navigate('Vendor', { vendorId: item.id })
        })
    }

    // Fallback image URL
    const imageUrl = item?.logo?.formats?.thumbnail?.url || 
                     item?.logo?.url || 
                     'https://via.placeholder.com/200x120/f3f4f6/9ca3af?text=Store'

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [
                    { translateY: slideAnim },
                    { scale: scaleAnim }
                ],
                width: itemWidth,
                marginBottom: 16,
                marginHorizontal: 4,
            }}
        >
            <Pressable 
                onPress={animatePress}
                style={({ pressed }) => ({
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
            >
                <Div 
                    bg="white" 
                    rounded={16} 
                    overflow="hidden"
                    shadow="sm"
                    borderWidth={1}
                    borderColor="#f1f5f9"
                >
                    {/* Image Section with Gradient Overlay */}
                    <Div position="relative" h={120}>
                        <Image 
                            source={{ uri: imageUrl }} 
                            w="100%" 
                            h={120}
                            resizeMode="cover"
                        />
                        
                        {/* Gradient Overlay */}
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.1)']}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 40,
                            }}
                        />

                        {/* Quality Badge */}
                        <Div 
                            position="absolute" 
                            top={8} 
                            right={8}
                            bg="rgba(16, 185, 129, 0.9)"
                            rounded={20}
                            px={8}
                            py={4}
                            flexDir="row"
                            alignItems="center"
                        >
                            <MaterialIcons name="verified" size={12} color="white" />
                            <Text fontSize={10} fontWeight="600" color="white" ml={4}>
                                {t('verified') || 'Verified'}
                            </Text>
                        </Div>

                        {/* Store Type Icon */}
                        <Div 
                            position="absolute" 
                            bottom={8} 
                            left={8}
                            w={32}
                            h={32}
                            rounded="circle"
                            bg="rgba(255, 255, 255, 0.9)"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Ionicons name="storefront" size={16} color="#1f2937" />
                        </Div>
                    </Div>

                    {/* Content Section */}
                    <Div p={12}>
                        {/* Vendor Name */}
                        <Text 
                            fontSize={16} 
                            fontWeight="700" 
                            color="#1f2937"
                            numberOfLines={2}
                            mb={6}
                            lineHeight={20}
                        >
                            {item?.vendor_name || item?.name || t('unknown_vendor')}
                        </Text>

                        {/* Stats Row */}
                        <Div flexDir="row" alignItems="center" justifyContent="space-between" mb={8}>
                            <Div flexDir="row" alignItems="center">
                                <MaterialIcons name="star" size={14} color="#f59e0b" />
                                <Text fontSize={12} fontWeight="600" color="#f59e0b" ml={2}>
                                    {item?.rating || '4.5'}
                                </Text>
                                <Text fontSize={10} color="#9ca3af" ml={2}>
                                    ({item?.reviews_count || '120'})
                                </Text>
                            </Div>
                            
                            <Div flexDir="row" alignItems="center">
                                <MaterialIcons name="inventory" size={12} color="#6b7280" />
                                <Text fontSize={10} color="#6b7280" ml={2}>
                                    {item?.products_count || '50+'} {t('items') || 'items'}
                                </Text>
                            </Div>
                        </Div>

                        {/* Delivery Info */}
                        <Div flexDir="row" alignItems="center" justifyContent="space-between">
                            <Div flexDir="row" alignItems="center">
                                <Div 
                                    w={6} 
                                    h={6} 
                                    rounded="circle" 
                                    bg="#10b981" 
                                    mr={6}
                                />
                                <Text fontSize={11} color="#6b7280">
                                    {t('fast_delivery') || 'Fast Delivery'}
                                </Text>
                            </Div>
                            
                            <Text fontSize={11} fontWeight="600" color="#2563eb">
                                {t('view_store') || 'View Store'}
                            </Text>
                        </Div>
                    </Div>

                    {/* Hover/Press Effect Border */}
                    <Div 
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        rounded={16}
                        borderWidth={2}
                        borderColor="transparent"
                        pointerEvents="none"
                    />
                </Div>
            </Pressable>
        </Animated.View>
    )
}

export default Vendor_item