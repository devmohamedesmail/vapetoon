import React from 'react'
import { Pressable } from 'react-native'
import { Div, Button, Text } from 'react-native-magnus'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function BackBtn({ color = "#1f2937", showText = false, size = 44 }) {
    const navigation = useNavigation();
    const { t } = useTranslation();
    
    return (
        <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
        >
            <Div
                w={size}
                h={size}
                rounded="circle"
                bg="rgba(31, 41, 55, 0.1)"
                alignItems="center"
                justifyContent="center"
                flexDir="row"
            >
                <Ionicons name="arrow-back" size={22} color={color} />
                {showText && (
                    <Text color={color} fontSize={14} fontWeight="500" ml={4}>
                        {t('back') || 'Back'}
                    </Text>
                )}
            </Div>
        </Pressable>
    )
}
