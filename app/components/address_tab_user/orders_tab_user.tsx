import React, { useContext, useEffect, useState } from 'react'
import { Div, Text, Image, Button, Skeleton } from 'react-native-magnus'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../context/auth_provider'
import { api_config } from '../../config/api_config'
import axios from 'axios'


export default function Orders_Tab_User({ userStats, setUserStats }: any) {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<any>();
    const { auth } = useContext(AuthContext);
    const [orders, setOrders] = useState(null);






    const fetchOrders = async () => {
        try {
            const response = await axios(`${api_config.url}/orders?filters[user_id][$eq]=${auth?.user?.id}`, {
                headers: {
                    Authorization: `Bearer ${api_config.token}`,
                },
            });
            // setOrders(response.data.data);
            const orders = response.data.data

            if (orders.length > 0) {
                setOrders(orders);
                // Calculate user stats
                const totalOrders = orders.length;
                const completedOrders = orders.filter(order => order.status === 'completed' || order.status === 'delivered').length;
                const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0);

                setUserStats({
                    totalOrders,
                    completedOrders,
                    totalSpent: totalSpent.toFixed(2)
                });
            } else {
                setOrders([])
                setUserStats({
                    totalOrders: 0,
                    completedOrders: 0,
                    totalSpent: '0.00'
                });
            }
        } catch (error) {
            console.error('Error fetching orders:', error);

        }
    }


    useEffect(() => {
        fetchOrders()
    }, [])



    return (
        <Div p={20} pb={150}>
            <Div flexDir="row" alignItems="center" mb={20}>
                <Ionicons name="receipt-outline" size={24} color="#3b82f6" />
                <Text fontSize={20} fontWeight="700" color="#1f2937" ml={12}>
                    {t('order_history') || 'Order History'}
                </Text>
            </Div>

            {orders ? (
                <>
                    {orders && orders.length > 0 ? (
                        orders.map(order => (
                            <Div key={order.id} mb={16} bg="white" rounded={16} p={20} borderWidth={1} borderColor="#f0f0f0" style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 8,
                                elevation: 3,
                            }}>
                                {/* Order Header */}
                                <Div flexDir="row" justifyContent="space-between" alignItems="center" mb={16}>
                                    <Div>
                                        <Text fontSize={16} fontWeight="600" color="#1f2937" mb={4}>
                                            {t('order')} #{order.id}
                                        </Text>
                                        <Div flexDir="row" alignItems="center">
                                            <Ionicons name="calendar-outline" size={14} color="#6b7280" />
                                            <Text fontSize={12} color="#6b7280" ml={4}>
                                                {new Date(order.createdAt).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </Text>
                                        </Div>
                                    </Div>
                                    <Div
                                        bg="#ecfdf5"
                                        px={12}
                                        py={6}
                                        rounded={20}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Text fontSize={12} fontWeight="600" color="#059669">
                                            {order.status || 'Pending'}
                                        </Text>
                                    </Div>
                                </Div>

                                {/* Order Items */}
                                {order.order && order.order.length > 0 && (
                                    <Div>
                                        <Text fontSize={14} fontWeight="600" color="#374151" mb={12}>
                                            {t('items')} ({order.order.length})
                                        </Text>
                                        {order.order.slice(0, 3).map((product, index) => (
                                            <Div key={product.id || index} flexDir="row" alignItems="center" mb={12}>
                                                <Image
                                                    source={{
                                                        uri: product.images?.[0]?.formats?.thumbnail?.url ||
                                                            product.image?.formats?.thumbnail?.url ||
                                                            'https://via.placeholder.com/50x50?text=No+Image'
                                                    }}
                                                    h={50}
                                                    w={50}
                                                    rounded={12}
                                                    mr={12}
                                                    resizeMode="cover"
                                                />
                                                <Div flex={1}>
                                                    <Text fontSize={14} fontWeight="600" color="#1f2937" numberOfLines={1}>
                                                        {product.title || product.name}
                                                    </Text>
                                                    <Div flexDir="row" alignItems="center" mt={2}>
                                                        <Text fontSize={12} color="#6b7280">
                                                            {product.quantity}x
                                                        </Text>
                                                        <Text fontSize={12} fontWeight="600" color="#1f2937" ml={4}>
                                                            {product.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                                                        </Text>
                                                    </Div>
                                                </Div>
                                            </Div>
                                        ))}
                                        {order.order.length > 3 && (
                                            <Text fontSize={12} color="#6b7280" textAlign="center" mt={8}>
                                                +{order.order.length - 3} {t('more_items') || 'more items'}
                                            </Text>
                                        )}
                                    </Div>
                                )}

                                {/* Order Total */}
                                <Div borderTopWidth={1} borderTopColor="#f3f4f6" pt={16} mt={16}>
                                    <Div flexDir="row" justifyContent="space-between" alignItems="center">
                                        <Text fontSize={16} fontWeight="600" color="#1f2937">
                                            {t('total') || 'Total'}:
                                        </Text>
                                        <Text fontSize={18} fontWeight="700" color="#1f2937">
                                            {order.total_amount || '0.00'} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                                        </Text>
                                    </Div>
                                </Div>
                            </Div>
                        ))
                    ) : (
                        <Div alignItems="center" py={60}>
                            <Div
                                w={80}
                                h={80}
                                rounded="circle"
                                bg="rgba(59, 130, 246, 0.1)"
                                alignItems="center"
                                justifyContent="center"
                                mb={20}
                            >
                                <Ionicons name="receipt-outline" size={40} color="#3b82f6" />
                            </Div>
                            <Text fontSize={18} fontWeight="600" color="#1f2937" mb={8}>
                                {t('no_orders_yet') || 'No orders yet'}
                            </Text>
                            <Text fontSize={14} color="#6b7280" textAlign="center" mb={24}>
                                {t('start_shopping_to_see_orders') || 'Start shopping to see your orders here'}
                            </Text>
                            <Button
                                bg="#3b82f6"
                                h={44}
                                px={24}
                                rounded={12}
                                onPress={() => navigation.navigate('Shop')}
                            >
                                <Text color="white" fontSize={14} fontWeight="600">
                                    {t('start_shopping') || 'Start Shopping'}
                                </Text>
                            </Button>
                        </Div>
                    )}
                </>
            ) : (
                <Div>
                    {[1, 2, 3].map((item) => (
                        <Div key={item} mb={16} bg="white" rounded={16} p={20}>
                            <Div flexDir="row" alignItems="center" mb={12}>
                                <Skeleton.Circle h={50} w={50} />
                                <Div ml={12} flex={1}>
                                    <Skeleton.Box h={16} w="60%" mb={8} />
                                    <Skeleton.Box h={12} w="40%" />
                                </Div>
                            </Div>
                            <Skeleton.Box h={12} w="100%" mb={8} />
                            <Skeleton.Box h={12} w="80%" />
                        </Div>
                    ))}
                </Div>
            )}
        </Div>
    )
}
