import React, { useContext, useState } from 'react'

import { LinearGradient } from 'expo-linear-gradient'
import { AuthContext } from '../../context/auth_provider'
import { Div, Text,Image } from 'react-native-magnus'
import { Ionicons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

interface UserStats {
    totalOrders: number
    completedOrders: number
    totalSpent: string
}

interface ProfileHeaderProps {
    userStats: UserStats
}

export default function Profile_Header({ userStats }: ProfileHeaderProps) {
    const { auth } = useContext(AuthContext)
    const { t } = useTranslation()

    return (
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
                            borderWidth={2}
                            borderColor="#fff"
                            borderStyle="solid"
                            alt="User Avatar"
                            
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
    )
}
