import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { Drawer, Div, Button } from 'react-native-magnus'
import Octicons from '@expo/vector-icons/Octicons';
import Toggle_Lang from '../Toggle_Lang/Toggle_Lang';
import custom_button from '../../custom_components/custom_button';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth_provider';
export default function Drawer_account() {
  const drawerRef = React.createRef();
  const {t}=useTranslation();
  const navigation = useNavigation();
  const {auth,handle_logout}=useContext(AuthContext)

   const handle_logout_user = () => {
        
        try {
            handle_logout()
            setTimeout(() => {
                navigation.navigate('Login')
            }, 1000);
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <Div>
      <Drawer ref={drawerRef} >
        <Div px={10} pt={30} h={"100%"} >
          <Div flexDir='column' position='absolute' bottom={30} right={10} left={10} >
            <Toggle_Lang />
            <custom_button title={t('Logout')} onPress={()=>handle_logout_user()}  />
            
          </Div>
        </Div>
      </Drawer>

      <Div flexDir='row' justifyContent='space-between' alignItems='center' bg="white" px={10} my={10}>
        {auth?.user.username && <Text>{auth?.user.username}</Text>}
        <Button
         
          bg="white"
          onPress={() => {
            if (drawerRef.current) {
              drawerRef.current.open();
            }
          }}
        >
          <Octicons name="three-bars" size={24} color="black" />
        </Button>
      </Div>
    </Div>
  )
}