import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, Pressable, RefreshControl, Alert, ScrollView } from 'react-native'
import { Div, Text, Image, Skeleton, ScrollDiv, Button } from 'react-native-magnus'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '../../Component/Header/Header'
import Bottom_Navbar from '../../Component/Bottom_Navbar/Bottom_Navbar'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../Context/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { api_config } from '../../config/api_config'
import { Ionicons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import Custom_colors from '../../config/Custom_colors'

export default function Account() {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState(0);
    const { auth, handle_logout } = useContext(AuthContext)
    const navigation = useNavigation();
    const [orders, setOrders] = useState(null)
    const [refreshing, setRefreshing] = useState(false)
    const [userStats, setUserStats] = useState({
        totalOrders: 0,
        totalSpent: 0,
        completedOrders: 0
    })

    const tabs = [
        {
            id: 0,
            title: t('orders') || 'Orders',
            icon: 'receipt-outline',
            color: '#3b82f6'
        },
        {
            id: 1,
            title: t('addresses') || 'Addresses',
            icon: 'location-outline',
            color: '#059669'
        },
        {
            id: 2,
            title: t('profile') || 'Profile',
            icon: 'person-outline',
            color: '#8b5cf6'
        },
        {
            id: 3,
            title: t('settings') || 'Settings',
            icon: 'settings-outline',
            color: '#f59e0b'
        }
    ]

    // Orders Tab Component
    const OrdersTab = () => (
        <Div p={20}>
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
    );
    // Addresses Tab Component
    const AddressesTab = () => (
        <Div p={20}>
            <Div flexDir="row" alignItems="center" justifyContent="space-between" mb={20}>
                <Div flexDir="row" alignItems="center">
                    <Ionicons name="location-outline" size={24} color="#059669" />
                    <Text fontSize={20} fontWeight="700" color="#1f2937" ml={12}>
                        {t('addresses') || 'My Addresses'}
                    </Text>
                </Div>
                <Button
                    bg="#059669"
                    h={36}
                    px={16}
                    rounded={10}
                    onPress={() => {/* Add new address logic */}}
                >
                    <Ionicons name="add" size={16} color="white" />
                </Button>
            </Div>
            
            <Div alignItems="center" py={60}>
                <Div 
                    w={80} 
                    h={80} 
                    rounded="circle" 
                    bg="rgba(5, 150, 105, 0.1)" 
                    alignItems="center" 
                    justifyContent="center"
                    mb={20}
                >
                    <Ionicons name="location-outline" size={40} color="#059669" />
                </Div>
                <Text fontSize={18} fontWeight="600" color="#1f2937" mb={8}>
                    {t('no_addresses') || 'No addresses saved'}
                </Text>
                <Text fontSize={14} color="#6b7280" textAlign="center" mb={24}>
                    {t('add_address_description') || 'Add your addresses for faster checkout'}
                </Text>
                <Button
                    bg="#059669"
                    h={44}
                    px={24}
                    rounded={12}
                    flexDir="row"
                    alignItems="center"
                >
                    <Ionicons name="add" size={16} color="white" style={{ marginRight: 8 }} />
                    <Text color="white" fontSize={14} fontWeight="600">
                        {t('add_address') || 'Add Address'}
                    </Text>
                </Button>
            </Div>
        </Div>
    );

    // Profile Tab Component
    const ProfileTab = () => (
        <Div p={20}>
            <Div flexDir="row" alignItems="center" mb={24}>
                <Ionicons name="person-outline" size={24} color="#8b5cf6" />
                <Text fontSize={20} fontWeight="700" color="#1f2937" ml={12}>
                    {t('profile_info') || 'Profile Information'}
                </Text>
            </Div>

            <Div>
                {/* Name Field */}
                <Div mb={16} bg="white" rounded={16} p={16} borderWidth={1} borderColor="#f0f0f0">
                    <Div flexDir="row" alignItems="center" mb={8}>
                        <Ionicons name="person" size={20} color="#6b7280" />
                        <Text fontSize={14} fontWeight="600" color="#374151" ml={8}>
                            {t('full_name') || 'Full Name'}
                        </Text>
                    </Div>
                    <Text fontSize={16} color="#1f2937" fontWeight="500">
                        {auth?.user?.username || 'Not provided'}
                    </Text>
                </Div>

                {/* Email Field */}
                <Div mb={16} bg="white" rounded={16} p={16} borderWidth={1} borderColor="#f0f0f0">
                    <Div flexDir="row" alignItems="center" mb={8}>
                        <Ionicons name="mail" size={20} color="#6b7280" />
                        <Text fontSize={14} fontWeight="600" color="#374151" ml={8}>
                            {t('email_address') || 'Email Address'}
                        </Text>
                    </Div>
                    <Text fontSize={16} color="#1f2937" fontWeight="500">
                        {auth?.user?.email || 'Not provided'}
                    </Text>
                </Div>

                {/* Phone Field */}
                <Div mb={16} bg="white" rounded={16} p={16} borderWidth={1} borderColor="#f0f0f0">
                    <Div flexDir="row" alignItems="center" mb={8}>
                        <Ionicons name="call" size={20} color="#6b7280" />
                        <Text fontSize={14} fontWeight="600" color="#374151" ml={8}>
                            {t('phone_number') || 'Phone Number'}
                        </Text>
                    </Div>
                    <Text fontSize={16} color="#1f2937" fontWeight="500">
                        {auth?.user?.phone || 'Not provided'}
                    </Text>
                </Div>

                {/* Edit Profile Button */}
                <Button
                    bg="#8b5cf6"
                    h={48}
                    rounded={12}
                    mt={16}
                    flexDir="row"
                    alignItems="center"
                    justifyContent="center"
                    onPress={() => {/* Navigate to edit profile */}}
                >
                    <Ionicons name="create-outline" size={18} color="white" style={{ marginRight: 8 }} />
                    <Text color="white" fontSize={16} fontWeight="600">
                        {t('edit_profile') || 'Edit Profile'}
                    </Text>
                </Button>
            </Div>
        </Div>
    );

    // Settings Tab Component
    const SettingsTab = () => (
        <Div p={20}>
            <Div flexDir="row" alignItems="center" mb={24}>
                <Ionicons name="settings-outline" size={24} color="#f59e0b" />
                <Text fontSize={20} fontWeight="700" color="#1f2937" ml={12}>
                    {t('settings') || 'Settings'}
                </Text>
            </Div>

            <Div>
                {/* Language Setting */}
                <Pressable onPress={() => {/* Language selection logic */}}>
                    <Div flexDir="row" alignItems="center" justifyContent="space-between" bg="white" rounded={16} p={16} mb={12} borderWidth={1} borderColor="#f0f0f0">
                        <Div flexDir="row" alignItems="center">
                            <Ionicons name="language" size={20} color="#6b7280" />
                            <Text fontSize={16} fontWeight="500" color="#1f2937" ml={12}>
                                {t('language') || 'Language'}
                            </Text>
                        </Div>
                        <Div flexDir="row" alignItems="center">
                            <Text fontSize={14} color="#6b7280" mr={8}>
                                {i18n.language === 'ar' ? 'العربية' : 'English'}
                            </Text>
                            <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                        </Div>
                    </Div>
                </Pressable>

                {/* Notifications Setting */}
                <Pressable onPress={() => {/* Notifications settings */}}>
                    <Div flexDir="row" alignItems="center" justifyContent="space-between" bg="white" rounded={16} p={16} mb={12} borderWidth={1} borderColor="#f0f0f0">
                        <Div flexDir="row" alignItems="center">
                            <Ionicons name="notifications" size={20} color="#6b7280" />
                            <Text fontSize={16} fontWeight="500" color="#1f2937" ml={12}>
                                {t('notifications') || 'Notifications'}
                            </Text>
                        </Div>
                        <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                    </Div>
                </Pressable>

                {/* Privacy Setting */}
                <Pressable onPress={() => {/* Privacy settings */}}>
                    <Div flexDir="row" alignItems="center" justifyContent="space-between" bg="white" rounded={16} p={16} mb={12} borderWidth={1} borderColor="#f0f0f0">
                        <Div flexDir="row" alignItems="center">
                            <Ionicons name="shield-checkmark" size={20} color="#6b7280" />
                            <Text fontSize={16} fontWeight="500" color="#1f2937" ml={12}>
                                {t('privacy') || 'Privacy'}
                            </Text>
                        </Div>
                        <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                    </Div>
                </Pressable>

                {/* Help & Support */}
                <Pressable onPress={() => {/* Help & Support */}}>
                    <Div flexDir="row" alignItems="center" justifyContent="space-between" bg="white" rounded={16} p={16} mb={12} borderWidth={1} borderColor="#f0f0f0">
                        <Div flexDir="row" alignItems="center">
                            <Ionicons name="help-circle" size={20} color="#6b7280" />
                            <Text fontSize={16} fontWeight="500" color="#1f2937" ml={12}>
                                {t('help_support') || 'Help & Support'}
                            </Text>
                        </Div>
                        <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                    </Div>
                </Pressable>

                {/* Logout Button */}
                <Button
                    bg="#ef4444"
                    h={48}
                    rounded={12}
                    mt={24}
                    flexDir="row"
                    alignItems="center"
                    justifyContent="center"
                    onPress={() => {
                        Alert.alert(
                            t('logout') || 'Logout',
                            t('logout_confirmation') || 'Are you sure you want to logout?',
                            [
                                { text: t('cancel') || 'Cancel', style: 'cancel' },
                                { 
                                    text: t('logout') || 'Logout', 
                                    style: 'destructive',
                                    onPress: () => {
                                        handle_logout();
                                        Toast.show({
                                            type: 'success',
                                            text1: t('logged_out') || 'Logged out successfully',
                                            visibilityTime: 2000,
                                        });
                                    }
                                }
                            ]
                        );
                    }}
                >
                    <Ionicons name="log-out-outline" size={18} color="white" style={{ marginRight: 8 }} />
                    <Text color="white" fontSize={16} fontWeight="600">
                        {t('logout') || 'Logout'}
                    </Text>
                </Button>
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
            console.log(error)
            Toast.show({
                type: 'error',
                text1: t('error') || 'Error',
                text2: t('failed_to_load_orders') || 'Failed to load orders',
                visibilityTime: 3000,
            });
        }
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await fetch_user_orders();
        setRefreshing(false);
    };


    useEffect(() => {
        fetch_user_orders()
    }, [])


    return (
        <Div flex={1} bg="#f8f9fa">
            <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
            <Header />

            {/* Profile Header Section */}
            <LinearGradient
                colors={['#1f2937', '#374151']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ paddingTop: 20, paddingBottom: 30, paddingHorizontal: 20 }}
            >
                <Div alignItems="center">
                    {/* Profile Avatar */}
                    <Div
                        w={100}
                        h={100}
                        rounded="circle"
                        bg="#f3f4f6"
                        alignItems="center"
                        justifyContent="center"
                        mb={16}
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 12,
                            elevation: 5,
                        }}
                    >
                        {auth?.user?.avatar ? (
                            <Image
                                source={{ uri: auth.user.avatar }}
                                w={100}
                                h={100}
                                rounded="circle"
                                resizeMode="cover"
                            />
                        ) : (
                            <Ionicons name="person" size={50} color="#6b7280" />
                        )}
                    </Div>

                    {/* User Name */}
                    <Text fontSize={24} fontWeight="700" color="white" mb={4}>
                        {auth?.user?.username || 'Guest User'}
                    </Text>

                    {/* User Email */}
                    <Text fontSize={14} color="#d1d5db" mb={20}>
                        {auth?.user?.email || 'No email provided'}
                    </Text>

                    {/* Stats Row */}
                    <Div flexDir="row" justifyContent="space-between" w="100%" maxW={280}>
                        <Div alignItems="center" flex={1}>
                            <Text fontSize={20} fontWeight="700" color="white">
                                {userStats.totalOrders}
                            </Text>
                            <Text fontSize={12} color="#d1d5db">
                                {t('orders') || 'Orders'}
                            </Text>
                        </Div>
                        <Div alignItems="center" flex={1}>
                            <Text fontSize={20} fontWeight="700" color="white">
                                {userStats.completedOrders}
                            </Text>
                            <Text fontSize={12} color="#d1d5db">
                                {t('completed') || 'Completed'}
                            </Text>
                        </Div>
                        <Div alignItems="center" flex={1}>
                            <Text fontSize={20} fontWeight="700" color="white">
                                {userStats.totalSpent}
                            </Text>
                            <Text fontSize={12} color="#d1d5db">
                                {t('spent') || 'Spent'}
                            </Text>
                        </Div>
                    </Div>
                </Div>
            </LinearGradient>

            {/* Tab Navigation */}
            <Div bg="white" px={20} py={16} style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
            }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 0 }}
                >
                    <Div flexDir="row" alignItems="center">
                        {tabs.map((tab) => (
                            <Pressable
                                key={tab.id}
                                onPress={() => setActiveTab(tab.id)}
                                style={{ marginRight: 16 }}
                            >
                                <Div
                                    flexDir="row"
                                    alignItems="center"
                                    bg={activeTab === tab.id ? tab.color : 'transparent'}
                                    px={16}
                                    py={10}
                                    rounded={25}
                                    borderWidth={activeTab === tab.id ? 0 : 1}
                                    borderColor="#e5e7eb"
                                    style={{
                                        shadowColor: activeTab === tab.id ? tab.color : 'transparent',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 4,
                                        elevation: activeTab === tab.id ? 3 : 0,
                                    }}
                                >
                                    <Ionicons 
                                        name={tab.icon} 
                                        size={18} 
                                        color={activeTab === tab.id ? 'white' : '#6b7280'} 
                                    />
                                    <Text
                                        fontSize={14}
                                        fontWeight={activeTab === tab.id ? "600" : "500"}
                                        color={activeTab === tab.id ? 'white' : '#6b7280'}
                                        ml={8}
                                    >
                                        {tab.title}
                                    </Text>
                                </Div>
                            </Pressable>
                        ))}
                    </Div>
                </ScrollView>
            </Div>

            {/* Tab Content */}
            <ScrollView
                flex={1}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#3b82f6']}
                        tintColor="#3b82f6"
                    />
                }
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {activeTab === 0 && <OrdersTab />}
                {activeTab === 1 && <AddressesTab />}
                {activeTab === 2 && <ProfileTab />}
                {activeTab === 3 && <SettingsTab />}
            </ScrollView>

            <Bottom_Navbar />
        </Div>
    )
}
