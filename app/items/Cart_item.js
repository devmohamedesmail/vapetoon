import React from 'react'
import { Div, Image, Text, Button, Icon } from 'react-native-magnus'
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { remove_from_cart, increase_quantity, decrease_quantity } from '../Redux/Reducers/cartReducer';
import Custom_colors from '../config/Custom_colors';
import Custom_quantity_btn from '../Custom_Components/Custom_quantity_btn';
import { useTranslation } from 'react-i18next';
import { api_config } from '../config/api_config';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Entypo from '@expo/vector-icons/Entypo';

function Cart_item({ item }) {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const handleDelete = (id) => {
        try {
            dispatch(remove_from_cart(id));
            Toast.show({
                type: "success",
                position: "bottom",
                text1: t("deleted"),
                visibilityTime: 3000,
            });
        } catch (error) {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: t("deleted"),
                visibilityTime: 3000,
            });
        }
    };


    // handle increase quantity
    const handleIncrease = (id) => {
        dispatch(increase_quantity(id));
    }

    // handle decrease quantity
    const handleDecrease = (id) => {
        dispatch(decrease_quantity(id));
    }







    return (
        <Div
            borderWidth={1}
            borderColor="gray300"
            rounded={10}
            flexDir="row"
            bg="white"
            justifyContent="space-between"
            my={3}
            overflow="hidden"
        >
            <Button p={0} bg='transparent' onPress={() => navigation.navigate("Details", { product: item })}>
                <Div bg="red" p={0} style={{ width: 70, height: 75, alignItems: 'center', justifyContent: 'center' }}>
                    <Swiper
                        style={{ height: 75, width: 70 }}
                        containerStyle={{ height: 75, width: 70, borderRadius: 8 }}
                        showsButtons={true}
                        activeDotColor="#ff6b35"
                        nextButton={
                            <Entypo name="chevron-right" size={16} color="black" />
                        }
                        prevButton={
                            <Entypo name="chevron-left" size={16} color="black" />
                        }
                    >
                        {item.images && item.images.map((image, index) => (
                            <Div h={50} w={50} key={index}>
                                <Image
                                    h={75}
                                    w={70}
                                    rounded="md"
                                    source={{
                                        uri: `${image?.formats?.thumbnail?.url}`,
                                    }}
                                />
                            </Div>
                        ))}
                    </Swiper>
                </Div>
            </Button>






            <Div mx={7} flex={1}>
                <Text fontWeight='bold' mb={5}>{item.title}</Text>
                <Text color={Custom_colors.primary} fontWeight="bold">
                    {item.price} {i18n.language === 'ar' ? api_config.currency_ar : api_config.currency_en}
                </Text>



                <Div flexDir="row" justifyContent="space-between">
                    <Div
                        flexDir="row"
                        justifyContent="start"
                        alignItems="center"
                        w={200}
                        my={5}
                    >
                        <Custom_quantity_btn icon="plus" onPress={() => handleIncrease(item.id)} />
                        <Text w={30} textAlign="center" fontSize="lg" fontWeight="bold">
                            {item.quantity}
                        </Text>
                        <Custom_quantity_btn icon="minus" onPress={() => handleDecrease(item.id)} />
                    </Div>

                    <Button bg="red" h={30} w={30} rounded="md" p={0} onPress={() => handleDelete(item.id)}>
                        <Icon name="delete" color="white" fontSize={13} />
                    </Button>
                </Div>
            </Div>
        </Div>
    )
}

export default Cart_item