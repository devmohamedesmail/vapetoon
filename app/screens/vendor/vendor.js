
import React, { useEffect, useState, useRef } from 'react'
import { StatusBar, Animated, Dimensions, Pressable, ScrollView } from 'react-native'
import { Div, Image, Text, Button } from 'react-native-magnus'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { useRoute, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { api_config } from '../../config/api_config'
import Product_card_item from '../../items/product_card_item'
import Bottom_Navbar from '../../components/bottom_navbar/bottom_navbar'
import Spinner_Loading from '../../components/spinner_loading/spinner_loading'
import Toast from 'react-native-toast-message'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export default function Vendor() {
    const { t } = useTranslation()
    const route = useRoute()
    const navigation = useNavigation()
    const { vendorId } = route.params
    
    const [vendorData, setVendorData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('all')
    
    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(30)).current
    const headerOpacity = useRef(new Animated.Value(0)).current
    const scrollY = useRef(new Animated.Value(0)).current

    const fetch_vendor_data = async () => {
        try {
            setLoading(true)
            setError(null)
            
            const response = await axios.get(
                `${process.env.EXPO_PUBLIC_APP_URL}/vendors?populate[logo]=true&populate[banner]=true&populate[products][populate]=images&filters[id][$eq]=${vendorId}`,
                {
                    headers: {
                        Authorization: `Bearer ${api_config.token}`,
                    }
                }
            )

            const vendors = response.data.data
            if (vendors.length > 0) {
                setVendorData(vendors[0])
            } else {
                setError(t('vendor_not_found') || 'Vendor not found')
            }
        } catch (error) {
            console.log('Vendor fetch error:', error)
            setError(t('failed_to_load_vendor') || 'Failed to load vendor data')
            Toast.show({
                type: 'error',
                text1: t('error') || 'Error',
                text2: t('failed_to_load_vendor') || 'Failed to load vendor data',
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetch_vendor_data()
    }, [vendorId])

    useEffect(() => {
        if (vendorData) {
            // Animate content entrance
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
            ]).start()
        }
    }, [vendorData])

    // Header animation based on scroll
    const headerAnimatedStyle = {
        opacity: headerOpacity,
        transform: [{
            translateY: headerOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
            }),
        }],
    }

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            listener: (event) => {
                const scrollPosition = event.nativeEvent.contentOffset.y
                const threshold = 150
                
                if (scrollPosition > threshold) {
                    Animated.timing(headerOpacity, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }).start()
                } else {
                    Animated.timing(headerOpacity, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }).start()
                }
            },
            useNativeDriver: false,
        }
    )

    const categories = vendorData?.products 
        ? ['all', ...new Set(vendorData.products.map(p => p.category || 'uncategorized'))]
        : ['all']

    const filteredProducts = vendorData?.products?.filter(product => 
        selectedCategory === 'all' || product.category === selectedCategory
    ) || []

    if (loading) {
        return (
            <Div flex={1} bg="#f8f9fa">
                <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
                <Spinner_Loading 
                    size="large" 
                    variant="primary" 
                    text={t('loading_vendor') || 'Loading vendor...'}
                />
            </Div>
        )
    }

    if (error || !vendorData) {
        return (
            <Div flex={1} bg="#f8f9fa" alignItems="center" justifyContent="center" p={20}>
                <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
                
                <Div alignItems="center" mb={32}>
                    <Div 
                        w={80} 
                        h={80} 
                        rounded="circle" 
                        bg="rgba(239, 68, 68, 0.1)"
                        alignItems="center" 
                        justifyContent="center"
                        mb={20}
                    >
                        <MaterialIcons name="store" size={40} color="#ef4444" />
                    </Div>
                    
                    <Text fontSize={20} fontWeight="600" color="#1f2937" textAlign="center" mb={8}>
                        {t('vendor_not_found') || 'Vendor Not Found'}
                    </Text>
                    
                    <Text fontSize={14} color="#6b7280" textAlign="center" mb={24}>
                        {error || t('vendor_not_available') || 'This vendor is not available at the moment'}
                    </Text>
                    
                    <Button
                        bg="#2563eb"
                        h={44}
                        px={24}
                        rounded={12}
                        onPress={() => navigation.goBack()}
                    >
                        <Text color="white" fontSize={14} fontWeight="600">
                            {t('go_back') || 'Go Back'}
                        </Text>
                    </Button>
                </Div>
            </Div>
        )
    }

    return (
        <Div flex={1} bg="#f8f9fa">
            <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
            
            {/* Animated Header */}
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        height: 90,
                        paddingTop: 40,
                        paddingHorizontal: 20,
                    },
                    headerAnimatedStyle,
                ]}
            >
                <LinearGradient
                    colors={['#1f2937', '#374151']}
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        borderRadius: 12,
                    }}
                >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    
                    <Text fontSize={18} fontWeight="600" color="white" numberOfLines={1}>
                        {vendorData?.vendor_name || vendorData?.name}
                    </Text>
                    
                    <Pressable onPress={() => {/* Share functionality */}}>
                        <Ionicons name="share-outline" size={24} color="white" />
                    </Pressable>
                </LinearGradient>
            </Animated.View>

            <Animated.ScrollView
                style={{ flex: 1 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Section */}
                <Div position="relative">
                    {/* Banner Image */}
                    <Image
                        h={250}
                        w="100%"
                        source={{
                            uri: vendorData?.banner?.formats?.large?.url ||
                                 vendorData?.banner?.url ||
                                 'https://via.placeholder.com/400x250/f3f4f6/9ca3af?text=Store+Banner'
                        }}
                        resizeMode="cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 120,
                        }}
                    />

                    {/* Back Button */}
                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={{
                            position: 'absolute',
                            top: 40,
                            left: 20,
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>

                    {/* Share Button */}
                    <Pressable
                        style={{
                            position: 'absolute',
                            top: 40,
                            right: 20,
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Ionicons name="share-outline" size={24} color="white" />
                    </Pressable>
                </Div>

                {/* Vendor Info Card */}
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    }}
                >
                    <Div bg="white" mx={20} mt={-40} rounded={16} p={20} shadow="lg" borderWidth={1} borderColor="#f1f5f9">
                        <Div flexDir="row" alignItems="center" mb={16}>
                            {/* Vendor Logo */}
                            <Div position="relative">
                                <Image
                                    h={70}
                                    w={70}
                                    rounded="circle"
                                    source={{
                                        uri: vendorData?.logo?.formats?.thumbnail?.url ||
                                             vendorData?.logo?.url ||
                                             'https://via.placeholder.com/70x70/f3f4f6/9ca3af?text=Logo'
                                    }}
                                    borderWidth={3}
                                    borderColor="white"
                                />
                                
                                {/* Verified Badge */}
                                <Div
                                    position="absolute"
                                    bottom={-2}
                                    right={-2}
                                    w={20}
                                    h={20}
                                    rounded="circle"
                                    bg="#10b981"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderWidth={2}
                                    borderColor="white"
                                >
                                    <MaterialIcons name="verified" size={12} color="white" />
                                </Div>
                            </Div>

                            {/* Vendor Details */}
                            <Div flex={1} ml={16}>
                                <Text fontSize={20} fontWeight="700" color="#1f2937" mb={4}>
                                    {vendorData?.vendor_name || vendorData?.name}
                                </Text>
                                
                                <Div flexDir="row" alignItems="center" mb={2}>
                                    <MaterialIcons name="star" size={16} color="#f59e0b" />
                                    <Text fontSize={14} fontWeight="600" color="#f59e0b" ml={4}>
                                        4.8 (245 {t('vendor_reviews') || 'reviews'})
                                    </Text>
                                </Div>
                                
                                <Div flexDir="row" alignItems="center">
                                    <Div w={8} h={8} rounded="circle" bg="#10b981" mr={6} />
                                    <Text fontSize={12} color="#6b7280">
                                        {t('open_now') || 'Open Now'} • {t('closes_at') || 'Closes at'} 10:00 PM
                                    </Text>
                                </Div>
                            </Div>
                        </Div>

                        {/* Contact Info */}
                        <Div flexDir="row" justifyContent="space-between" mb={16}>
                            {vendorData?.phone && (
                                <Div flexDir="row" alignItems="center" flex={1}>
                                    <MaterialIcons name="phone" size={16} color="#6b7280" />
                                    <Text fontSize={12} color="#6b7280" ml={6} numberOfLines={1}>
                                        {vendorData.phone}
                                    </Text>
                                </Div>
                            )}
                            
                            {vendorData?.email && (
                                <Div flexDir="row" alignItems="center" flex={1}>
                                    <MaterialIcons name="email" size={16} color="#6b7280" />
                                    <Text fontSize={12} color="#6b7280" ml={6} numberOfLines={1}>
                                        {vendorData.email}
                                    </Text>
                                </Div>
                            )}
                        </Div>

                        {/* Action Buttons */}
                        <Div flexDir="row" justifyContent="space-between">
                            <Button
                                bg="transparent"
                                borderWidth={1}
                                borderColor="#e5e7eb"
                                flex={1}
                                h={40}
                                mr={8}
                                rounded={10}
                                flexDir="row"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <MaterialIcons name="chat" size={16} color="#6b7280" />
                                <Text fontSize={12} fontWeight="600" color="#6b7280" ml={6}>
                                    {t('chat') || 'Chat'}
                                </Text>
                            </Button>
                            
                            <Button
                                bg="transparent"
                                borderWidth={1}
                                borderColor="#e5e7eb"
                                flex={1}
                                h={40}
                                ml={8}
                                rounded={10}
                                flexDir="row"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <MaterialIcons name="call" size={16} color="#6b7280" />
                                <Text fontSize={12} fontWeight="600" color="#6b7280" ml={6}>
                                    {t('call') || 'Call'}
                                </Text>
                            </Button>
                        </Div>
                    </Div>
                </Animated.View>

                {/* Stats Cards */}
                <Div flexDir="row" mx={20} mt={16} mb={20}>
                    <Div bg="white" flex={1} p={16} rounded={12} mr={8} alignItems="center" borderWidth={1} borderColor="#f1f5f9">
                        <Text fontSize={20} fontWeight="700" color="#1f2937">
                            {vendorData?.products?.length || 0}
                        </Text>
                        <Text fontSize={12} color="#6b7280" textAlign="center">
                            {t('products') || 'Products'}
                        </Text>
                    </Div>
                    
                    <Div bg="white" flex={1} p={16} rounded={12} ml={8} alignItems="center" borderWidth={1} borderColor="#f1f5f9">
                        <Text fontSize={20} fontWeight="700" color="#1f2937">
                            245
                        </Text>
                        <Text fontSize={12} color="#6b7280" textAlign="center">
                            {t('customers') || 'Customers'}
                        </Text>
                    </Div>
                </Div>

                {/* Category Filter */}
                {categories.length > 1 && (
                    <Div mb={20}>
                        <Text fontSize={18} fontWeight="600" color="#1f2937" mx={20} mb={12}>
                            {t('categories') || 'Categories'}
                        </Text>
                        
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
                            {categories.map((category) => (
                                <Pressable
                                    key={category}
                                    onPress={() => setSelectedCategory(category)}
                                    style={{
                                        marginRight: 12,
                                        paddingHorizontal: 16,
                                        paddingVertical: 8,
                                        borderRadius: 20,
                                        backgroundColor: selectedCategory === category ? '#2563eb' : '#f8f9fa',
                                        borderWidth: 1,
                                        borderColor: selectedCategory === category ? '#2563eb' : '#e5e7eb',
                                    }}
                                >
                                    <Text 
                                        fontSize={12} 
                                        fontWeight="600" 
                                        color={selectedCategory === category ? 'white' : '#6b7280'}
                                        textTransform="capitalize"
                                    >
                                        {t(category) || category}
                                    </Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </Div>
                )}

                {/* Products Section */}
                <Div mx={20} mb={100}>
                    <Div flexDir="row" alignItems="center" justifyContent="space-between" mb={16}>
                        <Text fontSize={18} fontWeight="600" color="#1f2937">
                            {t('products') || 'Products'} ({filteredProducts.length})
                        </Text>
                    </Div>

                    {filteredProducts.length > 0 ? (
                        <Div flexDir="row" flexWrap="wrap" justifyContent="space-between">
                            {filteredProducts.map((product, index) => (
                                <Product_card_item 
                                    product={product} 
                                    key={product.id || index}
                                    index={index}
                                />
                            ))}
                        </Div>
                    ) : (
                        <Div alignItems="center" py={40}>
                            <MaterialIcons name="inventory-2" size={48} color="#9ca3af" />
                            <Text fontSize={16} color="#6b7280" mt={12} textAlign="center">
                                {t('no_products_found') || 'No products found in this category'}
                            </Text>
                        </Div>
                    )}
                </Div>
            </Animated.ScrollView>

            <Bottom_Navbar />
        </Div>
    )
}