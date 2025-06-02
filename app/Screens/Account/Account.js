import React, { useContext, useEffect, useState } from 'react'
import { Div, Text, Image,Skeleton } from 'react-native-magnus'
import Custom_colors from '../../config/Custom_colors'
import Header from '../../Component/Header/Header'
import Bottom_Navbar from '../../Component/Bottom_Navbar/Bottom_Navbar'
import Account_item from '../../items/Account_item'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../Context/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import Drawer from '../../Component/Drawer/Drawer_account'
import axios from 'axios'
import { api_config } from '../../config/api_config'
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
export default function Account() {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState(0);
    const { auth, handle_logout } = useContext(AuthContext)
    const navigation = useNavigation();
    const [orders, setOrders] = useState(null)

    // Dummy components for each tab
    const OrdersTab = () => (
        <Div p={15}>
            <Text fontWeight="bold" mb={10}>{t('orders')}</Text>
            {orders ? (
                <>
                    {orders && orders.length > 0 ? (
                        orders.map(order => (
                            <Div key={order.id} mb={15} p={10} bg="white" rounded={10} shadow="sm">
                                <Text fontWeight="bold">{t('order_number')}: {order.id}</Text>
                                <Div my={5} px={8} py={3} bg="green600" rounded={8} alignSelf="flex-start">
                                    <Text color="white" fontWeight="bold" fontSize={13}>
                                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                                            day: 'numeric',
                                            month: 'short'
                                        })}
                                    </Text>
                                </Div>
                                <Div mt={10}>
                                    {order.order && order.order.length > 0 && order.order.map(product => (
                                        <Div key={product.id} flexDir="row" alignItems="center" mb={8}>
                                            <Image
                                                source={{ uri: product.images?.[0]?.formats?.thumbnail?.url }}
                                                h={40}
                                                w={40}
                                                rounded="md"
                                                mr={10}
                                            />
                                            <Div flex={1}>
                                                <Text fontWeight="bold">{product.title}</Text>
                                                <Text color="gray700" fontSize={12}>{product.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}</Text>
                                                <Text color="gray600" fontSize={12}>{t('quantity')}: {product.quantity}</Text>
                                            </Div>
                                        </Div>
                                    ))}
                                </Div>
                            </Div>
                        ))
                    ) : (
                        <Text textAlign='center'>{t('no_orders_found')}</Text>
                    )}

                </>
            ) : (
                <Div flexDir="row" mt="md">
                    <Skeleton.Circle h={40} w={40} />
                    <Div ml="md" flex={1}>
                        <Skeleton.Box mt="sm" />
                        <Skeleton.Box mt="sm" w="80%" />
                        <Skeleton.Box mt="sm" />
                    </Div>
                </Div>)}
        </Div>
    );
    const AddressesTab = () => (
        <Div p={15}><Text fontWeight="bold">{t('addressess')}</Text><Text>{t('your_addresses_here')}</Text></Div>
    );
    const InfoTab = () => (
        <Div p={15} flexDir='column' justifyContent='center' alignItems='center'>



            <Div flexDir='row' alignItems='center' bg="white" p={10} rounded={10} shadow="sm" w={"100%"} mb={10}>
                <AntDesign name="user" size={24} color="black" />
                <Text fontWeight='bold' mx={10}>{auth?.user.username}</Text>
            </Div>
            <Div flexDir='row' alignItems='center' bg="white" p={10} rounded={10} shadow="sm" w={"100%"} mb={10}>
                <Fontisto name="email" size={24} color="black" />
                <Text fontWeight='bold' mx={10}>{auth?.user.email}</Text>
            </Div>
            <Div flexDir='row' alignItems='center' bg="white" p={10} rounded={10} shadow="sm" w={"100%"} mb={10}>
                <Feather name="phone" size={24} color="black" />
                <Text fontWeight='bold' mx={10}>{auth?.user.phone ? auth?.user.phone : "N/A"}</Text>
            </Div>


        </Div>
    );




    const fetch_user_orders = async () => {
        try {
            const response = await axios.get(`https://ecommerce-strapi-ex18.onrender.com/api/orders?filters[user_id][$eq]=${auth?.user.id}`, {
                headers: {
                    Authorization: `Bearer ${api_config.token}`,
                },
            });
            const orders = response.data.data

            if (orders.length > 0) {
                setOrders(orders);
            } else {
                setOrders([])
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetch_user_orders()
    }, [])


    return (
        <Div flex={1}>
            <Header />
            <Drawer />

            <Div flex={1} bg={Custom_colors.screen}>
                {auth?.user.username && <Text>{t('welcome')} {auth?.user.username}</Text>}
                <Div flexDir='row' justifyContent='space-between' alignItems='center' px={5} my={10}>
                    <Account_item
                        image={require('../../../assets/images/order.png')}
                        title={t('orders')}
                        onPress={() => setActiveTab(0)}
                    />
                    <Account_item
                        image={require('../../../assets/images/gps.png')}
                        title={t('addressess')}
                        onPress={() => setActiveTab(1)}
                    />
                    <Account_item
                        image={require('../../../assets/images/user.png')}
                        title={t('info')}
                        onPress={() => setActiveTab(2)}
                    />
                </Div>

                {activeTab === 0 && <OrdersTab />}
                {activeTab === 1 && <AddressesTab />}
                {activeTab === 2 && <InfoTab />}



            </Div>









            <Bottom_Navbar />
        </Div>
    )
}
