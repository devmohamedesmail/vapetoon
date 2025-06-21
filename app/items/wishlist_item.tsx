import React, { useState, useRef } from "react";
import { Pressable, Animated, Dimensions } from "react-native";
import { Button, Div, Image, Text } from "react-native-magnus";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import Toast from 'react-native-toast-message';
import { add_to_cart } from "../redux/reducers/cart_reducer";
import { remove_From_wishlist } from "../redux/reducers/wishlist_reducer";
import { api_config } from "../config/api_config";

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth - 40;

interface WishlistItemProps {
  item: {
    id: string | number;
    name: string;
    title?: string;
    price: number;
    image?: string;
    images?: any;
    stock?: number;
    description?: string;
  };
  showDetails: () => void;
  onRemove: () => void;
}

export default function Wishlist_Item({ item, showDetails, onRemove }: WishlistItemProps) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const cartItems = useSelector((state: any) => state.cart.products);
    
    const [isPressed, setIsPressed] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const removeAnim = useRef(new Animated.Value(1)).current;

    // Animation handlers
    const handlePressIn = () => {
        setIsPressed(true);
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        setIsPressed(false);
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    // Check if item is already in cart
    const isInCart = cartItems.some((cartItem: any) => cartItem.id === item.id);

    // Add to cart handler
    const handleAddToCart = async () => {
        if (item.stock === 0) {
            Toast.show({
                type: 'error',
                text1: t('out_of_stock') || 'Out of Stock',
                position: 'top',
                visibilityTime: 3000,
            });
            return;
        }

        if (isInCart) {
            Toast.show({
                type: 'info',
                text1: t('already_in_cart') || 'Already in Cart',
                position: 'top',
                visibilityTime: 3000,
            });
            return;
        }

        setIsAddingToCart(true);
        
        try {
            dispatch(add_to_cart({ 
                ...item, 
                quantity: 1,
                name: item.name || item.title || t('unnamed_product')
            }));
            
            Toast.show({
                type: 'success',
                text1: t('added_to_cart') || 'Added to Cart!',
                position: 'top',
                visibilityTime: 3000,
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: t('error_occurred') || 'Error occurred',
                position: 'top',
                visibilityTime: 3000,
            });
        } finally {
            setIsAddingToCart(false);
        }
    };

    // Remove from wishlist handler
    const handleRemoveFromWishlist = () => {
        setIsRemoving(true);
        
        Animated.sequence([
            Animated.timing(removeAnim, {
                toValue: 0.8,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(removeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            try {
                dispatch(remove_From_wishlist({ id: item.id }));
                Toast.show({
                    type: 'success',
                    text1: t('removed_from_wishlist') || 'Removed from Wishlist',
                    position: 'top',
                    visibilityTime: 3000,
                });
                if (onRemove) onRemove();
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: t('error_occurred') || 'Error occurred',
                    position: 'top',
                    visibilityTime: 3000,
                });
                setIsRemoving(false);
                // Reset animation if error
                Animated.timing(removeAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }).start();
            }
        });
    };

    // Get image source with fallback
    const getImageSource = () => {
        if (item.image) {
            return item.image;
        }
        if (item.images && item.images.length > 0) {
            return item.images[0].formats?.thumbnail?.url || item.images[0].url;
        }
        return "https://via.placeholder.com/150";
    };

    // Format price with currency
    const formatPrice = (price: number) => {
        return `${price.toFixed(2)} ${i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}`;
    };

    // Truncate name to fit design
    const truncatedName = (item.name || item.title || t('unnamed_product')).length > 25 
        ? (item.name || item.title || t('unnamed_product')).substring(0, 25) + "..." 
        : (item.name || item.title || t('unnamed_product'));

    return (
        <Animated.View
            style={{
                transform: [
                    { scale: scaleAnim },
                    { scale: removeAnim }
                ],
                opacity: removeAnim,
            }}
        >
            <Div
                bg="white"
                rounded={20}
                mb={16}
                mx={4}
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 8,
                }}
            >
                {/* Card Content */}
                <Div p={16}>
                    <Div flexDir="row" alignItems="center">
                        {/* Product Image */}
                        <Pressable
                            onPress={showDetails}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            style={{ marginRight: 16 }}
                        >
                            <Div
                                w={80}
                                h={80}
                                rounded={16}
                                overflow="hidden"
                                bg="#f3f4f6"
                                alignItems="center"
                                justifyContent="center"
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 3,
                                }}
                            >
                                <Image
                                    source={{ uri: item.images[0].url || getImageSource() }}
                                    w={80}
                                    h={80}
                                    resizeMode="cover"
                                />
                                
                                {/* Stock Overlay */}
                                {item.stock === 0 && (
                                    <Div
                                        position="absolute"
                                        top={0}
                                        left={0}
                                        right={0}
                                        bottom={0}
                                        bg="rgba(0,0,0,0.6)"
                                        alignItems="center"
                                        justifyContent="center"
                                        rounded={16}
                                    >
                                        <Text color="white" fontSize={10} fontWeight="600">
                                            {t('out_of_stock')}
                                        </Text>
                                    </Div>
                                )}
                            </Div>
                        </Pressable>

                        {/* Product Details */}
                        <Div flex={1} mr={12}>
                            <Pressable onPress={showDetails}>
                                <Text
                                    fontSize={16}
                                    fontWeight="600"
                                    color="#1f2937"
                                    mb={4}
                                    numberOfLines={2}
                                >
                                    {truncatedName}
                                </Text>
                            </Pressable>

                            {/* Price */}
                            <Div flexDir="row" alignItems="center" mb={8}>
                                <Text
                                    fontSize={18}
                                    fontWeight="700"
                                    color="#059669"
                                >
                                    {formatPrice(item.price)}
                                </Text>
                                {item.stock !== undefined && item.stock > 0 && (
                                    <Div
                                        bg="#dcfce7"
                                        px={8}
                                        py={2}
                                        rounded={8}
                                        ml={8}
                                    >
                                        <Text fontSize={10} color="#059669" fontWeight="600">
                                            {t('in_stock')} ({item.stock})
                                        </Text>
                                    </Div>
                                )}
                            </Div>

                            {/* Action Buttons */}
                            <Div flexDir="row" alignItems="center">
                                {/* Add to Cart Button */}
                                <Pressable
                                    onPress={handleAddToCart}
                                    disabled={isAddingToCart || item.stock === 0}
                                    style={({ pressed }) => ({
                                        flex: 1,
                                        marginRight: 8,
                                        opacity: pressed ? 0.8 : 1,
                                    })}
                                >
                                    <LinearGradient
                                        colors={
                                            item.stock === 0 
                                                ? ['#9ca3af', '#6b7280']
                                                : isInCart 
                                                    ? ['#059669', '#047857']
                                                    : ['#3b82f6', '#2563eb']
                                        }
                                        style={{
                                            paddingHorizontal: 12,
                                            paddingVertical: 8,
                                            borderRadius: 10,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {isAddingToCart ? (
                                            <Feather name="loader" size={14} color="white" />
                                        ) : (
                                            <Ionicons 
                                                name={isInCart ? "checkmark" : "bag-add"} 
                                                size={14} 
                                                color="white" 
                                                style={{ marginRight: 4 }}
                                            />
                                        )}
                                        <Text color="white" fontSize={12} fontWeight="600">
                                            {item.stock === 0 
                                                ? t('out_of_stock')
                                                : isInCart 
                                                    ? t('in_cart') || 'In Cart'
                                                    : isAddingToCart 
                                                        ? t('adding') || 'Adding...'
                                                        : t('add_to_cart')
                                            }
                                        </Text>
                                    </LinearGradient>
                                </Pressable>
                            </Div>
                        </Div>

                        {/* Remove from Wishlist Button */}
                        <Div alignItems="center">
                            <Pressable
                                onPress={handleRemoveFromWishlist}
                                disabled={isRemoving}
                                style={({ pressed }) => ({
                                    padding: 8,
                                    borderRadius: 12,
                                    backgroundColor: pressed ? '#fef2f2' : 'transparent',
                                })}
                            >
                                <Div
                                    w={36}
                                    h={36}
                                    rounded="circle"
                                    bg="#fef2f2"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderWidth={1}
                                    borderColor="#fecaca"
                                >
                                    {isRemoving ? (
                                        <Feather name="loader" size={16} color="#ef4444" />
                                    ) : (
                                        <Ionicons name="heart-dislike" size={16} color="#ef4444" />
                                    )}
                                </Div>
                            </Pressable>
                            
                            <Text fontSize={9} color="#6b7280" mt={4} textAlign="center">
                                {t('remove')}
                            </Text>
                        </Div>
                    </Div>
                </Div>

                {/* Bottom Gradient Border */}
                <LinearGradient
                    colors={['transparent', 'rgba(59, 130, 246, 0.1)']}
                    style={{
                        height: 2,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                    }}
                />
            </Div>
        </Animated.View>
    );
}
