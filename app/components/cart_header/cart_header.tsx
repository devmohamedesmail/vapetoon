import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable } from 'react-native'
import { Div, Text } from 'react-native-magnus'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function Cart_Header({ cartItems, itemCount }) {

    const { t } = useTranslation();
    const navigation = useNavigation<any>();
    return (
        <Div
            pt={50}
            pb={20}
            px={20}
            bg="white"
            borderBottomWidth={1}
            borderBottomColor="#e5e7eb"
        >
            <Div flexDir="row" alignItems="center" justifyContent="space-between">
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1f2937" />
                </Pressable>

                <Div alignItems="center">
                    <Text fontSize={20} fontWeight="700" color="#1f2937">
                        {t('shopping_cart')}
                    </Text>
                    {cartItems.length > 0 && (
                        <Text fontSize={14} color="#6b7280" mt={2}>
                            {itemCount} {itemCount === 1 ? (t('item') || 'item') : (t('items') || 'items')}
                        </Text>
                    )}
                </Div>

                <Div w={24} />
            </Div>
        </Div>
    )
}
