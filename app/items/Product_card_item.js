import React, { useRef } from 'react'
import { Animated, Pressable } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Div, Image, Button, Text } from 'react-native-magnus';
import Custom_colors from '../config/Custom_colors';
import { api_config } from '../config/api_config';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { add_To_wishlist } from '../Redux/Reducers/wishlistReducer';
import { add_to_cart } from '../Redux/Reducers/cartReducer';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper'
import Entypo from '@expo/vector-icons/Entypo';




function Product_card_item({ product }) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const scaleAnim = useRef(new Animated.Value(1)).current;

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
        ]).start();
    };


    const handleAddtowishlist = (product) => {
        try {
            dispatch(add_To_wishlist(product))
            Toast.show({
                type: "success",
                position: "bottom",
                text1: t('added_to_wishlist'),
                visibilityTime: 3000,
            });
        } catch (error) {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: t('error-happened'),

                visibilityTime: 3000,
            });
        }
    };



    const handle_add_to_cart = (product) => {

        try {
            const { id, title, price, sale, images } = product;
            const quantity = 1
            dispatch(add_to_cart({ id, title, price, images, sale, quantity }))
            Toast.show({
                type: "success",
                position: "bottom",
                text1: t('added_to_cart'),
                visibilityTime: 3000,
            });
        } catch (error) {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: t('error-happened'),
                visibilityTime: 3000,
            });

        }
    }






    return (
        <Animated.View
            style={{
                transform: [{ scale: scaleAnim }],
                width: '48%',
                marginBottom: 16,
            }}
        >
            <Pressable
                onPress={() => {
                    animatePress();
                    navigation.navigate("Details", { productId: product.id });
                }}
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.12,
                    shadowRadius: 16,
                    elevation: 8,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#f0f0f0',
                }}
            >
                {/* Image Section with Gradient Overlay */}
                <Div position="relative" w="100%" h={200}>
                    <Swiper
                        style={{ height: 200 }}
                        showsButtons={false}
                        activeDotColor={Custom_colors.secondary}
                        dotColor="rgba(255,255,255,0.5)"
                        dotStyle={{ 
                            width: 6, 
                            height: 6, 
                            borderRadius: 3,
                            marginLeft: 3,
                            marginRight: 3,
                        }}
                        activeDotStyle={{
                            width: 20,
                            height: 6,
                            borderRadius: 3,
                            marginLeft: 3,
                            marginRight: 3,
                        }}
                        paginationStyle={{ bottom: 10 }}
                    >
                        {product.images &&
                            product.images.map((image, index) => (
                                <Div h={200} key={index} position="relative">
                                    <Image
                                        h={200}
                                        w="100%"
                                        source={{
                                            uri: `${image?.formats?.thumbnail?.url}`,
                                        }}
                                        style={{
                                            borderTopLeftRadius: 20,
                                            borderTopRightRadius: 20,
                                        }}
                                    />
                                    {/* Subtle gradient overlay */}
                                    <Div
                                        position="absolute"
                                        bottom={0}
                                        left={0}
                                        right={0}
                                        h={60}
                                        bg="rgba(0,0,0,0.1)"
                                    />
                                </Div>
                            ))}
                    </Swiper>

                    {/* Premium Sale Badge */}
                    {product.sale && product.price && product.price > product.sale ? (
                        <Div
                            position="absolute"
                            top={12}
                            left={12}
                            bg="#ff6b35"
                            px={12}
                            py={6}
                            rounded={15}
                            shadow="lg"
                            borderWidth={2}
                            borderColor="rgba(255,255,255,0.3)"
                        >
                            <Div flexDir="row" alignItems="center">
                                <Feather name="tag" size={12} color="white" />
                                <Text color="white" fontWeight="bold" fontSize={11} ml={4}>
                                    {`-${Math.round(((product.price - product.sale) / product.price) * 100)}%`}
                                </Text>
                            </Div>
                        </Div>
                    ) : (
                        <Div
                            position="absolute"
                            top={12}
                            left={12}
                            bg="#4CAF50"
                            px={12}
                            py={6}
                            rounded={15}
                            shadow="lg"
                            borderWidth={2}
                            borderColor="rgba(255,255,255,0.3)"
                        >
                            <Div flexDir="row" alignItems="center">
                                <Feather name="star" size={12} color="white" />
                                <Text color="white" fontWeight="bold" fontSize={11} ml={4}>
                                    NEW
                                </Text>
                            </Div>
                        </Div>
                    )}

                    {/* Enhanced Wishlist Button */}
                    <Button
                        bg="rgba(255,255,255,0.95)"
                        shadow="lg"
                        right={12}
                        top={12}
                        position="absolute"
                        p={0}
                        h={40}
                        w={40}
                        rounded="circle"
                        onPress={() => handleAddtowishlist(product)}
                        zIndex={2}
                        borderWidth={1}
                        borderColor="rgba(0,0,0,0.05)"
                    >
                        <AntDesign name="hearto" size={18} color="#ff6b35" />
                    </Button>
                </Div>

                {/* Content Section */}
                <Div p={16}>
                    {/* Product Title */}
                    <Text 
                        fontSize={15} 
                        fontWeight="bold" 
                        color="#2c3e50"
                        mb={8} 
                        numberOfLines={2}
                        lineHeight={20}
                    >
                        {product.title}
                    </Text>

                    {/* Price and Stock Section */}
                    <Div flexDir="row" justifyContent="space-between" alignItems="center" mb={12}>
                        <Div flex={1}>
                            {product.sale ? (
                                <Div>
                                    <Text fontWeight="bold" color="#27ae60" fontSize={16}>
                                        {product.sale} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                                    </Text>
                                    <Text
                                        textDecorLine="line-through"
                                        color="#95a5a6"
                                        fontSize={13}
                                        mt={2}
                                    >
                                        {product.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                                    </Text>
                                </Div>
                            ) : (
                                <Text fontWeight="bold" color="#2c3e50" fontSize={16}>
                                    {product.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                                </Text>
                            )}
                        </Div>

                        {/* Modern Stock Badge */}
                        <Div
                            bg={product.stock > 0 ? "rgba(39, 174, 96, 0.1)" : "rgba(231, 76, 60, 0.1)"}
                            px={10}
                            py={6}
                            rounded={12}
                            borderWidth={1}
                            borderColor={product.stock > 0 ? "rgba(39, 174, 96, 0.2)" : "rgba(231, 76, 60, 0.2)"}
                        >
                            <Div flexDir="row" alignItems="center">
                                <Div
                                    w={6}
                                    h={6}
                                    rounded="circle"
                                    bg={product.stock > 0 ? "#27ae60" : "#e74c3c"}
                                    mr={6}
                                />
                                <Text 
                                    color={product.stock > 0 ? "#27ae60" : "#e74c3c"}
                                    fontWeight="600"
                                    fontSize={10}
                                >
                                    {product.stock > 0 ? t("in_stock") : t("out_of_stock")}
                                </Text>
                            </Div>
                        </Div>
                    </Div>

                    {/* Action Button */}
                    <Button
                        onPress={() => handle_add_to_cart(product)}
                        bg={product.stock === 0 ? "#bdc3c7" : Custom_colors.primary}
                        h={44}
                        w="100%"
                        rounded={12}
                        shadow="md"
                        p={0}
                        disabled={product.stock === 0}
                        flexDir="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Ionicons 
                            name="bag-add" 
                            size={20} 
                            color="white" 
                            style={{ marginRight: 8 }}
                        />
                        <Text color="white" fontWeight="bold" fontSize={14}>
                            {product.stock === 0 ? t("out_of_stock") : t("add_to_cart")}
                        </Text>
                    </Button>
                </Div>
            </Pressable>
        </Animated.View>
    )
}

export default Product_card_item