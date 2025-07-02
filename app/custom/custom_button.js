import React from 'react'
import { Button } from 'react-native-magnus'
import custom_colors from '../config/custom_colors'

export default function Custom_Button({ title, onPress , ...props }) {
    return (
        <Button onPress={onPress} my={20} w='100%' bg={custom_colors.primary} color='white' rounded='md' shadow='9' {...props}>
            {title}
        </Button>
    )
}
