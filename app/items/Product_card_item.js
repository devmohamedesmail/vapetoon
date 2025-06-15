import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
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
      
        <Div
            w="49%"
            mb={12}
            bg="white"
            rounded={18}
            borderColor="gray200"
            borderWidth={1}
            overflow="hidden"
            position="relative"
        >
            <Button
                p={0}
                onPress={() => navigation.navigate("Details", { productId: product.id })}
                bg="transparent"
                activeOpacity={0.85}
            >
                <Div position="relative" w="100%">
                    <Swiper
                        style={{ height: 200, borderTopLeftRadius: 18, borderTopRightRadius: 18 }}
                        showsButtons={true}
                        activeDotColor={Custom_colors.secondary}
                        nextButton={
                            <Entypo name="chevron-with-circle-right" size={22} color={Custom_colors.secondary} />
                        }
                        prevButton={
                            <Entypo name="chevron-with-circle-left" size={22} color={Custom_colors.secondary} />
                        }
                    >
                        {product.images &&
                            product.images.map((image, index) => (
                                <Div h={200} key={index}>
                                    <Image
                                        h={200}
                                        w="100%"
                                        roundedTop="xl"
                                        source={{
                                            uri: `${image?.formats?.thumbnail?.url}`,
                                        }}
                                        style={{
                                            borderTopLeftRadius: 18,
                                            borderTopRightRadius: 18,
                                        }}
                                    />
                                </Div>
                            ))}
                    </Swiper>
                    {/* Sale Badge */}
                    {product.sale && product.price && product.price > product.sale ? (
                        <Div
                            position="absolute"
                            top={12}
                            left={12}
                            bg="#ff6b35"
                            px={10}
                            py={4}
                            rounded="circle"
                            shadow="md"
                        >
                            <Text color="white" fontWeight="bold" fontSize={12}>
                                {`Save ${product.price - product.sale} ${i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en
                                    }`}
                            </Text>
                        </Div>
                    ) : (
                        <Div
                            position="absolute"
                            top={12}
                            left={12}
                            bg="#ff6b35"
                            px={10}
                            py={4}
                            rounded="circle"
                            shadow="md"
                        >
                            <Text color="white" fontWeight="bold" fontSize={12}>
                                {t("buy_now_and_enjoy")}
                            </Text>
                        </Div>
                    )}
                    {/* Wishlist Button */}
                    <Button
                        bg="white"
                        shadow="md"
                        right={12}
                        top={12}
                        position="absolute"
                        p={0}
                        h={36}
                        w={36}
                        rounded="circle"
                        onPress={() => handleAddtowishlist(product)}
                        zIndex={2}
                    >
                        <AntDesign name="hearto" size={18} color="black" />
                    </Button>
                </Div>
            </Button>

            <Div p={14}>
                <Text  fontSize={13} mb={4} numberOfLines={2}>
                    {product.title}
                </Text>
                <Div flexDir="row" justifyContent="space-between" alignItems="center" my={8}>
                    <Div>
                        {product.sale ? (
                            <Div flexDir="row" alignItems="center">
                                <Text fontWeight="bold" color="green700">
                                    {product.sale} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                                </Text>
                                <Text
                                    textDecorLine="line-through"
                                    color="red600"
                                    ml={8}
                                    fontSize={13}
                                >
                                    {product.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                                </Text>
                            </Div>
                        ) : (
                            <Text fontWeight="bold">
                                {product.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                            </Text>
                        )}
                    </Div>
                    {/* Stock Badge */}
                    <Div
                        bg={product.stock > 0 ? "green600" : "red600"}
                        px={7}
                        py={4}
                        rounded="circle"
                        shadow="xs"
                    >
                        <Text color="white"  fontSize={11}>
                            {product.stock > 0 ? t("in_stock") : t("out_of_stock")}
                        </Text>
                    </Div>
                </Div>
                <Div flexDir="row" justifyContent="flex-end" mt={6}>
                    <Button
                        onPress={() => handle_add_to_cart(product)}
                        bg={Custom_colors.black}
                        h={38}
                        w={38}
                        rounded="circle"
                        shadow="md"
                        p={0}
                        disabled={product.stock === 0}
                        opacity={product.stock === 0 ? 0.5 : 1}
                    >
                        <MaterialIcons name="add-shopping-cart" size={20} color="white" />
                    </Button>
                </Div>
            </Div>
        </Div>
        // ...existing code...
    )
}

export default Product_card_item