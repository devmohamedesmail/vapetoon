import React from 'react'
import { Div, Button, Text } from 'react-native-magnus'
import Custom_colors from '../../config/Custom_colors';

export default function HeaderItem({ icon, onPress, count }) {
    return (
        <Div position='relative' h={30} w={30} mx={5}>
            <Button bg="white" borderColor='gray300' borderWidth={1} h={30} w={30} rounded="md" p={0} onPress={onPress}>

                {icon}
            </Button>

            <Div 
                bg={Custom_colors.primary}
                position='absolute'
                top={-4} right={-13}
                zIndex={100000}
                rounded="circle"
                h={20} w={20}
                display='flex'
                flexDir='column'
                justifyContent='center'
                alignItems='center'
            >
                <Text color='white'>{count}</Text>
            </Div>
        </Div>
    )
}
