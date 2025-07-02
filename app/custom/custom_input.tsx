import React from 'react'
import { Input, Icon, Div, Text } from 'react-native-magnus'
import custom_colors from '../config/custom_colors'

interface CustomInputProps {
    value?: any
    label?: string
    placeholder?: string
    onChangeText?: any
    icon?: any
    secureTextEntry?: boolean
    prefix?: any
    error?: any
}

export default function CustomInput({ 
    value, 
    label, 
    placeholder, 
    onChangeText, 
    icon, 
    secureTextEntry = false, 
    prefix, 
    error 
}: CustomInputProps) {
    return (
        <Div>
            {label && <Text fontSize={10} mb={5}>{label}</Text>}
            <Input
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                mt="md"
                p={10}
                focusBorderColor={custom_colors.primary}
                prefix={prefix}
                suffix={icon}
                secureTextEntry={secureTextEntry}
                my={8}
                h={50}
            />
            {error ? <Text color='red600'>{error}</Text> : null}
        </Div>
    )
}
