import React,{useState} from 'react'
import { Div,Text } from 'react-native-magnus'
import Custom_input from '../../../Custom_Components/Custom_input'
import { useTranslation } from 'react-i18next'

export default function Billing_info() {
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const [state,setState] = useState('')
    const { t, i18n } = useTranslation();
  return (
    <Div>
        <Text fontWeight='bold' textAlign='center' my={20} >{t('billing-info')}</Text>
        <Custom_input value={name} placeholder={t('name')} onChangeText={(text)=>setName(text)} />
        <Custom_input value={phone} placeholder={t('phone')} onChangeText={(text)=>setPhone(text)} />
        <Custom_input value={address} placeholder={t('address')} onChangeText={(text)=>setAddress(text)} />
        <Custom_input value={state} placeholder={t('city')} onChangeText={(text)=>setState(text)} />    
    </Div>
  )
}
