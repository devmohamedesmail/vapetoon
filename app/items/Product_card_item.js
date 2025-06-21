import React, { useRef } from 'react'
import { Animated, Pressable } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Div, Image, Button, Text } from 'react-native-magnus';
import custom_colors from '../config/custom_colors';
import { api_config } from '../config/api_config';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { add_To_wishlist, remove_From_wishlist } from '../redux/reducers/wishlist_reducer';
import { add_to_cart } from '../redux/reducers/cart_reducer';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper'
import Entypo from '@expo/vector-icons/Entypo';

function Product_card_item({ product }) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const titleScaleAnim = useRef(new Animated.Value(1)).current;
    
    // Get wishlist items to check if product is in wishlist
    const wishlistItems = useSelector(state => state.wishlist.items);
    const isInWishlist = wishlistItems.some(item => item.id === product.id);

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

    const showSuccessToast = (message, icon = "shopping-cart") => {
        Toast.show({
            type: "success",
            position: "top",
            text1: "✅ Success!",
            text2: message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 60,
            text1Style: {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#27ae60'
            },
            text2Style: {
                fontSize: 14,
                color: '#2c3e50',
                fontWeight: '500'
            },
            style: {
                borderLeftColor: '#27ae60',
                borderLeftWidth: 5,
                backgroundColor: '#f8fff8',
                borderRadius: 12,
                shadowColor: '#27ae60',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 8,
            }
        });
    };

    const showErrorToast = (message) => {
        Toast.show({
            type: "error",
            position: "top",
            text1: "❌ Oops!",
            text2: message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 60,
            text1Style: {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#e74c3c'
            },
            text2Style: {
                fontSize: 14,
                color: '#2c3e50',
                fontWeight: '500'
            },
            style: {
                borderLeftColor: '#e74c3c',
                borderLeftWidth: 5,
                backgroundColor: '#fff8f8',
                borderRadius: 12,
                shadowColor: '#e74c3c',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 8,
            }
        });
    };

    const showWishlistToast = (message, isAdding = true) => {
        Toast.show({
            type: "info",
            position: "top",
            text1: isAdding ? "💖 Added to Wishlist" : "💔 Removed from Wishlist",
            text2: message,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 60,
            text1Style: {
                fontSize: 16,
                fontWeight: 'bold',
                color: isAdding ? '#ff6b35' : '#6b7280'
            },
            text2Style: {
                fontSize: 14,
                color: '#2c3e50',
                fontWeight: '500'
            },
            style: {
                borderLeftColor: isAdding ? '#ff6b35' : '#6b7280',
                borderLeftWidth: 5,
                backgroundColor: isAdding ? '#fff9f6' : '#f9fafb',
                borderRadius: 12,
                shadowColor: isAdding ? '#ff6b35' : '#6b7280',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 8,
            }
        });
    };

    const handleAddtowishlist = (product) => {
        try {
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
        <Div
            w="49%"
            // h={320}
            mb={12}
            bg="#fff"
            rounded={8}
            overflow="hidden"
            borderWidth={1}
            borderColor="#e8e8e8"
        >
            {/* Image Section with Swiper - NOT PRESSABLE */}
            <Div position="relative" w="100%" h={160}>
                <Swiper
                    style={{ height: 160 }}
                    showsButtons={false}
                    activeDotColor={custom_colors.primary}
                    dotColor="#d1d5db"
                    dotStyle={{ 
                        width: 4, 
                        height: 4, 
                        borderRadius: 2,
                        marginLeft: 2,
                        marginRight: 2,
                    }}
                    activeDotStyle={{
                        width: 12,
                        height: 4,
                        borderRadius: 2,
                        marginLeft: 2,
                        marginRight: 2,
                    }}
                    paginationStyle={{ bottom: 8 }}
                >
                    {product.images &&
                        product.images.map((image, index) => {
                            // Handle different image structures
                            let imageUrl = '';
                            
                            if (image?.formats?.thumbnail?.url) {
                                // Image has formats with thumbnail
                                imageUrl = image.formats.thumbnail.url;
                            } else if (image?.formats?.small?.url) {
                                // Image has formats but no thumbnail, use small
                                imageUrl = image.formats.small.url;
                            } else if (image?.url) {
                                // Image has direct URL (no formats)
                                imageUrl = image.url;
                            } else {
                                // Fallback - skip this image
                                return null;
                            }
                            
                            return (
                                <Div h={160} key={index} position="relative">
                                    <Image
                                        h={160}
                                        w="100%"
                                        source={{
                                            uri: imageUrl,
                                        }}
                                        style={{
                                            borderTopLeftRadius: 8,
                                            borderTopRightRadius: 8,
                                        }}
                                        resizeMode="cover"
                                    />
                                </Div>
                            );
                        })}
                </Swiper>

                {/* Clean Sale Badge */}
                {product.sale && product.price && product.price > product.sale && (
                    <Div
                        position="absolute"
                        top={8}
                        left={8}
                        bg="#ff4757"
                        px={8}
                        py={4}
                        rounded={4}
                    >
                        <Text color="white" fontWeight="600" fontSize={10}>
                            -{Math.round(((product.price - product.sale) / product.price) * 100)}%
                        </Text>
                    </Div>
                )}

                {/* Professional Wishlist Button */}
                <Button
                    bg={isInWishlist ? "rgba(255, 71, 87, 0.1)" : "rgba(255,255,255,0.9)"}
                    right={8}
                    top={8}
                    position="absolute"
                    p={0}
                    h={32}
                    w={32}
                    rounded={4}
                    onPress={() => handleAddtowishlist(product)}
                    zIndex={2}
                    borderWidth={1}
                    borderColor={isInWishlist ? "#ff4757" : "#e8e8e8"}
                >
                    <AntDesign 
                        name={isInWishlist ? "heart" : "hearto"} 
                        size={14} 
                        color={isInWishlist ? "#ff4757" : "#6b7280"} 
                    />
                </Button>
            </Div>

            {/* Content Section - Fixed Height */}
            <Div p={12}  >
                {/* Product Title - PRESSABLE for navigation */}
                <Div >
                    <Animated.View style={{ transform: [{ scale: titleScaleAnim }] }}>
                        <Pressable onPress={handleTitlePress}>
                            <Text 
                                fontSize={13} 
                                fontWeight="600" 
                                color="#1f2937"
                                mb={6} 
                                numberOfLines={2}
                                lineHeight={13}
                            >
                                {getTruncatedTitle(product.title)}
                            </Text>
                        </Pressable>
                    </Animated.View>

                    {/* Price Section */}
                    <Div mb={8}>
                        {product.sale ? (
                            <Div flexDir="row" alignItems="center">
                                <Text fontWeight="700" color="#059669" fontSize={14} mr={6}>
                                    {product.sale} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                                </Text>
                                <Text
                                    textDecorLine="line-through"
                                    color="#9ca3af"
                                    fontSize={11}
                                >
                                    {product.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                                </Text>
                            </Div>
                        ) : (
                            <Text fontWeight="700" color="#1f2937" fontSize={14}>
                                {product.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                            </Text>
                        )}
                    </Div>
                </Div>

                {/* Bottom Section */}
                <Div>
                    {/* Stock Status */}
                    <Div flexDir="row" alignItems="center" mb={8}>
                        <Div
                            w={6}
                            h={6}
                            rounded="circle"
                            bg={product.stock > 0 ? "#10b981" : "#ef4444"}
                            mr={6}
                        />
                        <Text 
                            color={product.stock > 0 ? "#10b981" : "#ef4444"}
                            fontWeight="500"
                            fontSize={10}
                        >
                            {product.stock > 0 ? t("in_stock") : t("out_of_stock")}
                        </Text>
                    </Div>

                    {/* Creative Add to Cart Button */}
                    <Button
                        onPress={() => handle_add_to_cart(product)}
                        bg={product.stock === 0 ? "#e5e7eb" : custom_colors.primary}
                        h={36}
                        w="100%"
                        rounded={6}
                        p={0}
                        disabled={product.stock === 0}
                        flexDir="row"
                        alignItems="center"
                        justifyContent="center"
                        borderWidth={product.stock === 0 ? 1 : 0}
                        borderColor="#d1d5db"
                    >
                        {product.stock === 0 ? (
                            <>
                                <Feather name="x-circle" size={16} color="#9ca3af" style={{ marginRight: 6 }} />
                                <Text color="#6b7280" fontWeight="600" fontSize={12}>
                                    {t("out_of_stock")}
                                </Text>
                            </>
                        ) : (
                            <>
                                <Ionicons name="bag-add-outline" size={16} color="white" style={{ marginRight: 6 }} />
                                <Text color="white" fontWeight="600" fontSize={12}>
                                    {t("add_to_cart")}
                                </Text>
                            </>
                        )}
                    </Button>
                </Div>
            </Div>
        </Div>
    )
}

export default Product_card_item