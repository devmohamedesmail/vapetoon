import React , { useContext, useEffect, useState } from 'react'
import { Div, Text, Button } from 'react-native-magnus'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../context/auth_provider'
import Spinner_Loading from '../spinner_loading/spinner_loading'
import axios from 'axios'
import Address_Account_Item from '../../items/address_account_item'

export default function Address_Tab_User() {
    const { t } = useTranslation();
    const navigation = useNavigation<any>();
    const [addresses, setAddresses] = useState(null); 
    const {auth}=useContext(AuthContext)


    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_APP_URL}/addresses?filters[user_id][$eq]=${auth?.user?.id}`,{
                headers: {
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TOKEN_SECRET}`,
                },
            })
            
            setAddresses(response.data.data);
           
        } catch (error) {
            console.error('Error fetching addresses:', error);
            
        }
    }



useEffect(()=>{
    fetchAddresses()
},[])



    return (
        <Div p={20}>
            <Div flexDir="row" alignItems="center" justifyContent="space-between" mb={20}>
                <Div flexDir="row" alignItems="center">
                    <Ionicons name="location-outline" size={24} color="#059669" />
                    <Text fontSize={20} fontWeight="700" color="#1f2937" ml={12}>
                        {t('addresses') || 'My Addresses'}
                    </Text>
                </Div>
                <Button
                    bg="#059669"
                    h={36}
                    px={16}
                    p={0}
                    rounded={10}
                    onPress={() => navigation.navigate('AddAddress')}
                >
                    <Ionicons name="add" size={16} color="white" />
                </Button>
            </Div>

            {/* Loading State */}
            {addresses === null ? (
                <Div alignItems="center" py={60}>
                    <Spinner_Loading size="large" variant="primary" fullScreen={false} showText={false} />
                    <Text fontSize={16} color="#6b7280" mt={16}>
                        {t('loading_addresses') || 'Loading addresses...'}
                    </Text>
                </Div>
            ) : addresses.length === 0 ? (
                /* No Addresses State */
                <Div alignItems="center" py={60}>
                    <Div
                        w={80}
                        h={80}
                        rounded="circle"
                        bg="rgba(5, 150, 105, 0.1)"
                        alignItems="center"
                        justifyContent="center"
                        mb={20}
                    >
                        <Ionicons name="location-outline" size={40} color="#059669" />
                    </Div>
                    <Text fontSize={18} fontWeight="600" color="#1f2937" mb={8}>
                        {t('no_addresses') || 'No addresses saved'}
                    </Text>
                    <Text fontSize={14} color="#6b7280" textAlign="center" mb={24}>
                        {t('add_address_description') || 'Add your addresses for faster checkout'}
                    </Text>
                    <Button
                        bg="#059669"
                        h={44}
                        px={24}
                        rounded={12}
                        flexDir="row"
                        alignItems="center"
                        onPress={() => navigation.navigate('AddAddress')}
                    >
                        <Ionicons name="add" size={16} color="white" style={{ marginRight: 8 }} />
                        <Text color="white" fontSize={14} fontWeight="600">
                            {t('add_address') || 'Add Address'}
                        </Text>
                    </Button>
                </Div>
            ) : (
                /* Addresses List */
                <Div>
                    {addresses.map((address) => (
                       <Address_Account_Item key={address.id} address={address} />
                    ))}
                </Div>
            )}
        </Div>
    )
}
