import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button } from 'react-native-magnus';
import Custom_colors from '../config/Custom_colors';

export default function Custom_quantity_btn({icon,onPress}) {
    return (
        <Button onPress={onPress} bg={Custom_colors.primary} borderColor={Custom_colors.primary} borderWidth={1} w={25} h={25} rounded="lg" p={0} shadow="9" >
            <AntDesign name={icon} size={14} color="white" />
        </Button>
    )
}
