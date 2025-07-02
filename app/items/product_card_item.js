import React, { useRef, useEffect } from 'react'
import { Animated, Pressable, Dimensions } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Div, Image, Button, Text } from 'react-native-magnus';
import { LinearGradient } from 'expo-linear-gradient';
import custom_colors from '../config/custom_colors';
import { api_config } from '../config/api_config';

import { useDispatch, useSelector } from 'react-redux';
import { add_To_wishlist, remove_From_wishlist } from '../redux/reducers/wishlist_reducer';
import { add_to_cart } from '../redux/reducers/cart_reducer';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper'
import { Toast } from 'toastify-react-native';

const { width: screenWidth } = Dimensions.get('window');

function Product_card_item({ product, index = 0 }) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    // Enhanced animation values
    const titleScaleAnim = useRef(new Animated.Value(1)).current;
    const cardScaleAnim = useRef(new Animated.Value(0.95)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;
    const heartScaleAnim = useRef(new Animated.Value(1)).current;
    const cartButtonAnim = useRef(new Animated.Value(1)).current;

    // Get wishlist items to check if product is in wishlist
    const wishlistItems = useSelector(state => state.wishlist.items);
    const isInWishlist = wishlistItems.some(item => item.id === product.id);

    // Entrance animation
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
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
            Animated.spring(cardScaleAnim, {
                toValue: 1,
                tension: 100,
                friction: 7,
                delay: index * 100,
                useNativeDriver: true,
            }),
        ]).start();
    }, [index]);

    const animateTitlePress = () => {
        Animated.sequence([
            Animated.timing(titleScaleAnim, {
                toValue: 0.98,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(titleScaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const animateHeartPress = () => {
        Animated.sequence([
            Animated.timing(heartScaleAnim, {
                toValue: 1.3,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.spring(heartScaleAnim, {
                toValue: 1,
                tension: 300,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const animateCartButton = () => {
        Animated.sequence([
            Animated.timing(cartButtonAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(cartButtonAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const showSuccessToast = (message, icon = "shopping-cart") => {
        Toast.show({
            type: "success",
            position: "center",
            text1: t('added-successfully') || 'Added Successfully',
            // text2: message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 60,
        });
    };

    const showErrorToast = (message) => {
        Toast.show({
            type: "error",
            position: "center",
            text1:t('failed-to-add'),
            text2: message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 60,
           
        });
    };

    const showWishlistToast = (message, isAdding = true) => {
        Toast.show({
            type: "success",
            position: "center",
            text1: isAdding ? `💖 ${t('added-successfully')}` : `💔 ${t('removed-successfully')}`,
            // text2: message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 60,
           
        });
    };

    const handleAddtowishlist = (product) => {
        try {
            animateHeartPress();
            if (isInWishlist) {
                // Remove from wishlist
                dispatch(remove_From_wishlist(product.id));
                showWishlistToast(`${getTruncatedTitle(product.title)} removed from your wishlist`, false);
            } else {
                // Add to wishlist
                dispatch(add_To_wishlist(product));
                showWishlistToast(`${getTruncatedTitle(product.title)} added to your wishlist`, true);
            }
        } catch (error) {
            showErrorToast(t('error-happened') || 'Something went wrong. Please try again.');
        }
    };

    const handle_add_to_cart = (product) => {
        try {
            animateCartButton();
            const { id, title, price, sale, images } = product;
            const quantity = 1
            dispatch(add_to_cart({ id, title, price, images, sale, quantity }))
            showSuccessToast(`${title} ${t('added_to_cart') || 'added to your cart!'}`);
        } catch (error) {
            showErrorToast(t('error-happened') || 'Failed to add item to cart. Please try again.');
        }
    }

    const handleTitlePress = () => {
        animateTitlePress();
        navigation.navigate("Details", { productId: product.id });
    };

    // Function to truncate title to 5 words
    const getTruncatedTitle = (title) => {
        if (!title) return '';
        const words = title.split(' ');
        return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : title;
    };

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [
                    { translateY: slideAnim },
                    { scale: cardScaleAnim }
                ],
                width: '49%',
                marginBottom: 16,
            }}
        >
            <Div
                bg="white"
                rounded={16}
                overflow="hidden"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 8,
                }}
            >
                {/* Enhanced Image Section with Gradient Overlay */}
                <Div position="relative" w="100%" h={180}>
                    <Swiper
                        style={{ height: 180 }}
                        showsButtons={false}
                        activeDotColor="#6366f1"
                        dotColor="rgba(255,255,255,0.5)"
                        dotStyle={{
                            width: 6,
                            height: 6,
                            borderRadius: 3,
                            marginLeft: 2,
                            marginRight: 2,
                        }}
                        activeDotStyle={{
                            width: 16,
                            height: 6,
                            borderRadius: 3,
                            marginLeft: 2,
                            marginRight: 2,
                        }}
                        paginationStyle={{ bottom: 12 }}
                    >
                        {product.images &&
                            product.images.map((image, imageIndex) => {
                                // Handle different image structures
                                let imageUrl = '';

                                if (image?.formats?.thumbnail?.url) {
                                    imageUrl = image.formats.thumbnail.url;
                                } else if (image?.formats?.small?.url) {
                                    imageUrl = image.formats.small.url;
                                } else if (image?.url) {
                                    imageUrl = image.url;
                                } else {
                                    return null;
                                }

                                return (
                                    <Div h={180} key={imageIndex} position="relative">
                                        <Image
                                            h={180}
                                            w="100%"
                                            source={{ uri: imageUrl }}
                                            style={{
                                                borderTopLeftRadius: 16,
                                                borderTopRightRadius: 16,
                                            }}
                                            resizeMode="cover"
                                        />
                                        {/* Subtle gradient overlay for better text readability */}
                                        <LinearGradient
                                            colors={['transparent', 'rgba(0,0,0,0.05)']}
                                            style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                height: 60,
                                            }}
                                        />
                                    </Div>
                                );
                            })}
                    </Swiper>

                    {/* Premium Sale Badge with Gradient */}
                    {product.sale && product.price && product.price > product.sale && (
                        <Div position="absolute" top={12} left={12}>
                            <LinearGradient
                                colors={['#ff4757', '#ff3742']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 6,
                                    borderRadius: 12,
                                    shadowColor: '#ff4757',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 4,
                                    elevation: 4,
                                }}
                            >
                                <Text color="white" fontWeight="700" fontSize={11}>
                                    -{Math.round(((product.price - product.sale) / product.price) * 100)}%
                                </Text>
                            </LinearGradient>
                        </Div>
                    )}

                    {/* Enhanced Wishlist Button */}
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            transform: [{ scale: heartScaleAnim }],
                        }}
                    >
                        <Pressable
                            onPress={() => handleAddtowishlist(product)}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: isInWishlist ? 'rgba(255, 71, 87, 0.15)' : 'rgba(255, 255, 255, 0.95)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                shadowColor: isInWishlist ? '#ff4757' : '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.15,
                                shadowRadius: 8,
                                elevation: 4,
                                borderWidth: isInWishlist ? 1 : 0,
                                borderColor: isInWishlist ? '#ff4757' : 'transparent',
                            }}
                        >
                            <AntDesign
                                name={isInWishlist ? "heart" : "hearto"}
                                size={18}
                                color={isInWishlist ? "#ff4757" : "#6b7280"}
                            />
                        </Pressable>
                    </Animated.View>

                    {/* Stock Status Indicator */}
                    <Div position="absolute" bottom={12} right={12}>
                        <Div
                            bg={product.stock > 0 ? "rgba(16, 185, 129, 0.9)" : "rgba(239, 68, 68, 0.9)"}
                            px={8}
                            py={4}
                            rounded={8}
                        >
                            <Text color="white" fontWeight="600" fontSize={9}>
                                {product.stock > 0 ? t("in_stock") : t("out_of_stock")}
                            </Text>
                        </Div>
                    </Div>
                </Div>

                {/* Enhanced Content Section */}
                <Div p={16}>
                    {/* Product Title with Enhanced Typography */}
                    <Animated.View style={{ transform: [{ scale: titleScaleAnim }] }}>
                        <Pressable onPress={handleTitlePress}>
                            <Text
                                fontSize={15}
                                fontWeight="700"
                                color="#111827"
                                mb={8}
                                numberOfLines={2}
                                lineHeight={20}
                                style={{
                                    textShadowColor: 'rgba(0, 0, 0, 0.05)',
                                    textShadowOffset: { width: 0, height: 1 },
                                    textShadowRadius: 2,
                                }}
                            >
                                {getTruncatedTitle(product.title)}
                            </Text>
                        </Pressable>
                    </Animated.View>

                    {/* Enhanced Price Section with Better Visual Hierarchy */}
                    <Div mb={12}>
                        {product.sale ? (
                            <Div flexDir="row" alignItems="center" mb={4}>
                                <LinearGradient
                                    colors={['#059669', '#10b981']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        paddingHorizontal: 8,
                                        paddingVertical: 4,
                                        borderRadius: 6,
                                        marginRight: 8,
                                    }}
                                >
                                    <Text fontWeight="800" color="white" fontSize={16}>
                                        {product.sale} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                                    </Text>
                                </LinearGradient>
                                <Text
                                    textDecorLine="line-through"
                                    color="#9ca3af"
                                    fontSize={13}
                                    fontWeight="500"
                                >
                                    {product.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                                </Text>
                            </Div>
                        ) : (
                            <Text fontWeight="800" color="#111827" fontSize={18} mb={4}>
                                {product.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                            </Text>
                        )}
                    </Div>

                    {/* Enhanced Add to Cart Button */}
                    <Animated.View style={{ transform: [{ scale: cartButtonAnim }] }}>
                        <Pressable
                            onPress={() => handle_add_to_cart(product)}
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0 ? (
                                <Div
                                    bg="#f3f4f6"
                                    h={44}
                                    rounded={12}
                                    flexDir="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    borderWidth={1}
                                    borderColor="#e5e7eb"
                                >
                                    <Feather name="x-circle" size={18} color="#9ca3af" style={{ marginRight: 8 }} />
                                    <Text color="#6b7280" fontWeight="600" fontSize={14}>
                                        {t("out_of_stock")}
                                    </Text>
                                </Div>
                            ) : (
                                <LinearGradient
                                    colors={['#0d1b2a', '#000']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        height: 44,
                                        borderRadius: 12,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        shadowColor: '#6366f1',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 8,
                                        elevation: 6,
                                    }}
                                >
                                    <Ionicons name="bag-add-outline" size={20} color="white" style={{ marginRight: 8 }} />
                                    <Text color="white" fontWeight="700" fontSize={14}>
                                        {t("add_to_cart")}
                                    </Text>
                                </LinearGradient>
                            )}
                        </Pressable>
                    </Animated.View>
                </Div>
            </Div>
        </Animated.View>
    )
}

export default Product_card_item