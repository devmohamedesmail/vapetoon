import React from 'react'
import { Input, Icon, Div, Text } from 'react-native-magnus'
import Custom_colors from '../config/Custom_colors'

export default function Custom_input({ value, placeholder, onChangeText, icon, secureTextEntry = false ,prefix,error}) {
    return (

        <Div>
            <Input
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                mt="md"
                p={10}
                focusBorderColor={Custom_colors.primary}
                prefix={prefix}
                suffix={icon}
                secureTextEntry={secureTextEntry}
                my={8}
                h={50}
            />
            {error ?  <Text color='red600'>{error}</Text> : null}
           
        </Div>
    )
}
