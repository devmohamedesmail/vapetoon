import React, { useRef } from 'react'
import { Animated, Pressable } from 'react-native'
import { Div, Image, Text, Button } from 'react-native-magnus'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import { remove_from_cart, increase_quantity, decrease_quantity } from '../Redux/Reducers/cartReducer'
import { useTranslation } from 'react-i18next'
import { api_config } from '../config/api_config'
import { useNavigation } from '@react-navigation/native'

// Icons
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons'

function Cart_item({ item }) {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()
    const navigation = useNavigation()
    const scaleAnim = useRef(new Animated.Value(1)).current

    const animatePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.98,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start()
    }

    const handleDelete = (id) => {
        try {
            dispatch(remove_from_cart(id))
            Toast.show({
                type: "success",
                position: "bottom",
                text1: t("removed_from_cart"),
                visibilityTime: 2000,
            })
        } catch (error) {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: t("error_occurred"),
                visibilityTime: 2000,
            })
        }
    }

    const handleIncrease = (id) => {
        dispatch(increase_quantity(id))
    }

    const handleDecrease = (id) => {
        dispatch(decrease_quantity(id))
    }

    const handleNavigateToDetails = () => {
        animatePress()
        navigation.navigate("Details", { productId: item.id })
    }

    // Calculate prices
    const currentPrice = item.sale || item.price
    const originalPrice = item.price
    const hasDiscount = item.sale && item.sale < item.price
    const totalPrice = (currentPrice * item.quantity).toFixed(2)

    return (
        <Animated.View
            style={{
                transform: [{ scale: scaleAnim }],
                marginBottom: 16,
            }}
        >
            <Div
                bg="white"
                rounded={16}
                borderWidth={1}
                borderColor="#f0f0f0"
                overflow="hidden"
                flexDir="row"
                alignItems="center"
            >
                {/* Product Image */}
                <Pressable onPress={handleNavigateToDetails}>
                    <Div w={100} h={100} position="relative">
                        {item.images && item.images.length > 0 ? (
                            <Image
                                source={{ uri: item.images[0]?.formats?.thumbnail?.url }}
                                w={100}
                                h={100}
                                resizeMode="cover"
                                rounded={12}
                                ml={12}
                                my={12}
                            />
                        ) : (
                            <Div
                                w={100}
                                h={100}
                                bg="#f3f4f6"
                                rounded={12}
                                ml={12}
                                my={12}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Feather name="image" size={24} color="#9ca3af" />
                            </Div>
                        )}

                        {/* Discount Badge */}
                        {hasDiscount && (
                            <Div
                                position="absolute"
                                top={8}
                                left={8}
                                bg="#ef4444"
                                px={6}
                                py={2}
                                rounded={8}
                            >
                                <Text color="white" fontSize={10} fontWeight="600">
                                    -{Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}%
                                </Text>
                            </Div>
                        )}
                    </Div>
                </Pressable>

                {/* Product Info */}
                <Div flex={1} p={16} justifyContent="space-between">
                    {/* Title and Price Section */}
                    <Div>
                        <Pressable onPress={handleNavigateToDetails}>
                            <Text 
                                fontSize={16} 
                                fontWeight="600" 
                                color="#1f2937" 
                                mb={8}
                                numberOfLines={2}
                                lineHeight={20}
                            >
                                {item.title}
                            </Text>
                        </Pressable>

                        {/* Price Display */}
                        <Div flexDir="row" alignItems="baseline" mb={12}>
                            <Text fontSize={18} fontWeight="700" color="#1f2937" mr={8}>
                                {currentPrice} {i18n.language === 'ar' ? api_config.currency_ar : api_config.currency_en}
                            </Text>
                            {hasDiscount && (
                                <Text 
                                    fontSize={14} 
                                    color="#9ca3af" 
                                    textDecorLine="line-through"
                                >
                                    {originalPrice} {i18n.language === 'ar' ? api_config.currency_ar : api_config.currency_en}
                                </Text>
                            )}
                        </Div>

                        {/* Total Price */}
                        <Div flexDir="row" alignItems="center" mb={12}>
                            <Text fontSize={12} color="#6b7280" mr={8}>
                                {t('total')}:
                            </Text>
                            <Text fontSize={16} fontWeight="700" color="#059669">
                                {totalPrice} {i18n.language === 'ar' ? api_config.currency_ar : api_config.currency_en}
                            </Text>
                        </Div>
                    </Div>

                    {/* Quantity Controls and Delete */}
                    <Div flexDir="row" alignItems="center" justifyContent="space-between">
                        {/* Quantity Controls */}
                        <Div flexDir="row" alignItems="center" bg="#f9fafb" rounded={12} p={4}>
                            <Pressable
                                onPress={() => handleDecrease(item.id)}
                                style={{
                                    backgroundColor: item.quantity > 1 ? '#374151' : '#e5e7eb',
                                    borderRadius: 8,
                                    padding: 8,
                                }}
                            >
                                <Feather 
                                    name="minus" 
                                    size={14} 
                                    color={item.quantity > 1 ? "white" : "#9ca3af"} 
                                />
                            </Pressable>
                            
                            <Text 
                                fontSize={16} 
                                fontWeight="600" 
                                color="#1f2937" 
                                mx={16} 
                                minW={30} 
                                textAlign="center"
                            >
                                {item.quantity}
                            </Text>
                            
                            <Pressable
                                onPress={() => handleIncrease(item.id)}
                                style={{
                                    backgroundColor: '#374151',
                                    borderRadius: 8,
                                    padding: 8,
                                }}
                            >
                                <Feather name="plus" size={14} color="white" />
                            </Pressable>
                        </Div>

                        {/* Delete Button */}
                        <Pressable
                            onPress={() => handleDelete(item.id)}
                            style={{
                                backgroundColor: '#fef2f2',
                                borderRadius: 12,
                                padding: 12,
                                borderWidth: 1,
                                borderColor: '#fecaca',
                            }}
                        >
                            <MaterialIcons name="delete-outline" size={20} color="#ef4444" />
                        </Pressable>
                    </Div>
                </Div>
            </Div>
        </Animated.View>
    )
}

export default Cart_item