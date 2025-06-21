import React from 'react'
import { Input, Icon, Div, Text } from 'react-native-magnus'
import custom_colors from '../config/custom_colors'

export default function custom_input({ value, placeholder, onChangeText, icon, secureTextEntry = false ,prefix,error}) {
    return (

        <Div>
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
            {error ?  <Text color='red600'>{error}</Text> : null}
           
        </Div>
    )
}
