import React from 'react'
import { useTranslation } from 'react-i18next'
import { Div, Text } from 'react-native-magnus'
import { api_config } from '../../config/api_config'


export default function Cart_Summery({ itemCount, totalAmount }) {

    const { t, i18n } = useTranslation();

    return (
        <Div
            bg="white"
            rounded={16}
            p={20}
            mt={20}
            mb={200}
            borderWidth={1}
            borderColor="#e5e7eb"
        >
            <Text fontSize={18} fontWeight="600" color="#1f2937" mb={16}>
                {t('order_summary')}
            </Text>

            <Div flexDir="row" justifyContent="space-between" alignItems="center" mb={12}>
                <Text fontSize={14} color="#6b7280">
                    {t('subtotal')} ({itemCount} {itemCount === 1 ? (t('item')) : (t('items'))})
                </Text>
                <Text fontSize={16} fontWeight="600" color="#1f2937">
                    {totalAmount.toFixed(2)} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                </Text>
            </Div>

            <Div flexDir="row" justifyContent="space-between" alignItems="center" mb={12}>
                <Text fontSize={14} color="#6b7280">
                    {t('shipping')}
                </Text>
                <Text fontSize={14} color="#059669" fontWeight="600">
                    {t('free')}
                </Text>
            </Div>

            <Div h={1} bg="#e5e7eb" my={12} />

            <Div flexDir="row" justifyContent="space-between" alignItems="center">
                <Text fontSize={18} fontWeight="700" color="#1f2937">
                    {t('total')}
                </Text>
                <Text fontSize={20} fontWeight="700" color="#1f2937">
                    {totalAmount.toFixed(2)} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                </Text>
            </Div>
        </Div>
    )
}
