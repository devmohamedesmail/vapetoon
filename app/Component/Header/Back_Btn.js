import React from 'react'
import { Div, Button, Text } from 'react-native-magnus'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
export default function Back_Btn() {
    const navigation = useNavigation();
    const {t} = useTranslation();
    return (
        <Button p={0} bg='transparent' onPress={()=>navigation.goBack()} mr={10}>
            <Div flexDir='row' alignItems='center'>
                <MaterialIcons name="arrow-back-ios" size={16} color="black" />
                <Text color='black' fontSize={10}>{t('back')}</Text>
            </Div>   
        </Button>
    )
}
