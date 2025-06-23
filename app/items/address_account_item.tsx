import React from 'react'
import { Div, Text, Button } from 'react-native-magnus'
import { MaterialIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

export default function Address_Account_Item({ address }: { address: any }) {
    const { t } = useTranslation()
    return (
        <Div
            key={address.id}
            bg="white"
            p={16}
            mb={12}
            rounded={12}
            borderWidth={1}
            borderColor="#e5e7eb"
        >
            <Div flexDir="row" alignItems="flex-start" justifyContent="space-between">
                <Div flex={1}>
                    <Div flexDir="row" alignItems="center" mb={8}>
                        <MaterialIcons
                            name={address.type === 'home' ? 'home' :
                                address.type === 'work' ? 'business' : 'location-on'}
                            size={18}
                            color="#059669"
                        />
                        <Text fontSize={14} fontWeight="600" color="#059669" ml={6} textTransform="capitalize">
                            {address.type}
                        </Text>
                    </Div>

                    {address.address_line1 && (
                        <Text fontSize={16} fontWeight="600" color="#1f2937" mb={4}>
                            {address.address_line1}
                        </Text>
                    )}

                    {address.address_line2 && (
                        <Text fontSize={14} color="#6b7280" mb={2}>
                            {address.address_line2}
                        </Text>
                    )}

                    {address.city && (
                        <Text fontSize={14} color="#6b7280">
                            {address.city}
                        </Text>
                    )}

                    {!address.address_line1 && !address.address_line2 && !address.city && (
                        <Text fontSize={14} color="#ef4444" fontStyle="italic">
                            {t('incomplete_address') || 'Incomplete address data'}
                        </Text>
                    )}
                </Div>

                <Div flexDir="row" alignItems="center">
                    <Button
                        bg="transparent"
                        h={36}
                        w={36}
                        rounded="circle"
                        onPress={() => {
                            // Edit address functionality
                            console.log('Edit address:', address.id)
                        }}
                    >
                        <MaterialIcons name="edit" size={18} color="#6b7280" />
                    </Button>

                    <Button
                        bg="transparent"
                        h={36}
                        w={36}
                        rounded="circle"
                        onPress={() => {
                            // Delete address functionality
                            console.log('Delete address:', address.id)
                        }}
                        ml={4}
                    >
                        <MaterialIcons name="delete" size={18} color="#ef4444" />
                    </Button>
                </Div>
            </Div>
        </Div>
    )
}
