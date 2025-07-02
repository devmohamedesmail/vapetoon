import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, Pressable, RefreshControl, Alert, ScrollView } from 'react-native'
import { Div, Text, Image, Skeleton, ScrollDiv, Button } from 'react-native-magnus'
import Header from '../../components/header/header'
import Bottom_Navbar from '../../components/bottom_navbar/bottom_navbar'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../context/auth_provider'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { api_config } from '../../config/api_config'
import { Ionicons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import custom_colors from '../../config/custom_colors'
import Toggle_Lang from '../../components/toggle_lang/toggle_lang'
import Profile_Header from '../../components/profile_header/profile_header'
import Address_Tab_User from '../../components/address_tab_user/address_tab_user'
import Orders_Tab_User from '../../components/address_tab_user/orders_tab_user'
import Profile_Tab_User from '../../components/profile_tab_user/profile_tab_user'
import Settings_Tab_User from '../../components/settings_tab_user/settings_tab_user'

export default function Account() {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState(0);
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

    


  

   




    const onRefresh = async () => {
        setRefreshing(true);
        
        setRefreshing(false);
    };


   


    return (
        <Div flex={1} bg="#f8f9fa">
            <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
            <Header />

            {/* Profile Header Section */}
            <Profile_Header userStats={userStats} />

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
                {activeTab === 0 && <Orders_Tab_User userStats={userStats} setUserStats={setUserStats} />}
                {activeTab === 1 && <Address_Tab_User />}
                {activeTab === 2 && <Profile_Tab_User />}
                {activeTab === 3 && <Settings_Tab_User />}
            </ScrollView>

            <Bottom_Navbar />
        </Div>
    )
}
