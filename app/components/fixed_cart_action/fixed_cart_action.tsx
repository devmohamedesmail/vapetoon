import React from 'react'
import { useTranslation } from 'react-i18next'
import { Div, Text, Button } from 'react-native-magnus'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { api_config } from '../../config/api_config'

export default function Fixed_Cart_Action({itemCount, totalAmount}) {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<any>();
    return (
        <Div
            position="absolute"
            bottom={80}
            left={0}
            right={0}
            bg="white"
            pt={20}
            pb={20}
            px={20}
            borderTopWidth={1}
            borderTopColor="#e5e7eb"
            style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}
        >
            {/* Quick Summary */}
            <Div flexDir="row" justifyContent="space-between" alignItems="center" mb={16}>
                <Div>
                    <Text fontSize={14} color="#6b7280">
                        {t('total') || 'Total'} ({itemCount} {itemCount === 1 ? (t('item') || 'item') : (t('items') || 'items')})
                    </Text>
                    <Text fontSize={20} fontWeight="700" color="#1f2937">
                        {totalAmount.toFixed(2)} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                    </Text>
                </Div>

                <Div alignItems="flex-end">
                    <Text fontSize={12} color="#059669" fontWeight="600" mb={2}>
                        {t('free_shipping') || 'Free Shipping'}
                    </Text>
                    <Div flexDir="row" alignItems="center">
                        <Feather name="truck" size={14} color="#059669" />
                        <Text fontSize={12} color="#6b7280" ml={4}>
                            {t('estimated_delivery') || 'Estimated delivery'}: 2-3 {t('days') || 'days'}
                        </Text>
                    </Div>
                </Div>
            </Div>

            {/* Checkout Button */}
            <LinearGradient
                colors={['#1f2937', '#374151']}
                style={{
                    borderRadius: 12,
                    height: 56,
                }}
            >
                <Button
                    bg="transparent"
                    h={56}
                    rounded={12}
                    onPress={() => navigation.navigate('Checkout')}
                    flexDir="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <MaterialIcons name="lock" size={20} color="white" style={{ marginRight: 8 }} />
                    <Text color="white" fontSize={16} fontWeight="600">
                        {t('proceed_to_checkout') || 'Proceed to Checkout'}
                    </Text>
                </Button>
            </LinearGradient>


            <Pressable onPress={() => navigation.navigate('Shop')} style={{ alignItems: 'center', marginTop: 12 }}>
                <Text fontSize={14} color="#6b7280" textDecorLine="underline">
                    {t('continue_shopping') || 'Continue Shopping'}
                </Text>
            </Pressable>
        </Div>
    )
}
