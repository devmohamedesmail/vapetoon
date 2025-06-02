import React from 'react'
import { Button } from 'react-native-magnus'
import Custom_colors from '../config/Custom_colors'

export default function Custom_button({ title, onPress , ...props }) {
    return (
        <Button onPress={onPress} my={20} w='100%' bg={Custom_colors.primary} color='white' rounded='md' shadow='9' {...props}>
            {title}
        </Button>
    )
}
