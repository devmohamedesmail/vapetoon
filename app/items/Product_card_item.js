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
            dispatch(add_to_cart(product))
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
            mb={4}
            bg="white"
            rounded="md"
            position="relative"
            borderColor="gray200"
            borderWidth={1}
        >
            <Button p={0} onPress={() => navigation.navigate("Details", { productId: product.id })} bg="transparent">
                <Div position="relative" w="100%" h="100%">

                    <Swiper
                        style={{ height: 200 }}
                        showsButtons={true}
                        activeDotColor="#ff6b35"
                        nextButton={
                            <Entypo name="chevron-right" size={20} color="black" />

                        }
                        prevButton={
                            <Entypo name="chevron-left" size={20} color="black" />
                        }

                    >
                        {product.images && product.images.map((image, index) => (
                            <Div h={200} key={index}>
                                <Image
                                    h={200}
                                    w="100%"
                                    rounded="md"
                                    source={{
                                        uri: `${image?.formats?.thumbnail?.url}`,
                                    }}
                                />
                            </Div>
                        ))}


                    </Swiper>
                    {product.sale && product.price && product.price > product.sale ? (
                        <Text
                            bg="#ff6b35"
                            color="white"
                            textAlign="center"
                            py={1}
                            px={4}
                        >
                            {`Save ${product.price - product.sale} ${i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}`}
                        </Text>
                    ) : (
                        <Text
                            bg="#ff6b35"
                            color="white"
                            textAlign="center"
                            py={1}
                            px={4}
                        >
                            {t('buy_now_and_enjoy')}
                        </Text>
                    )}
                </Div>
            </Button>

            <Button
                bg="white"
                shadow="md"
                right={10}
                top={10}
                position="absolute"
                p={0}
                h={30}
                w={30}
                rounded="circle"
                ml="md"
                onPress={() => handleAddtowishlist(product)}
            >
                <AntDesign name="hearto" size={17} color="black" />
            </Button>

            <Div p={10}>
                <Text fontWeight="semibold">{product.title}</Text>

                <Div flexDir="row" justifyContent="space-between" alignItems="center" my={10}>
                    <Div>
                        {product.sale ? (
                            <Div flexDir='row'>
                                <Text>{product.sale} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en} </Text>
                                <Text textDecorLine='line-through' color='red600'>{product.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en} </Text>
                            </Div>

                        ) : (
                            <Text>{product.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en} </Text>
                        )}
                    </Div>

                    <Text color="green700">Stock : {product.stock}</Text>
                </Div>



                <Div flexDir="row" justifyContent="flex-end">
                    <Button
                        onPress={() => handle_add_to_cart(product)}
                        bg={Custom_colors.black} h={35} p={0} w={35} rounded="md" shadow="md">
                        <Div>
                            <MaterialIcons name="add-shopping-cart" size={20} color="white" />
                        </Div>
                    </Button>
                </Div>
            </Div>
        </Div>
    )
}

export default Product_card_item