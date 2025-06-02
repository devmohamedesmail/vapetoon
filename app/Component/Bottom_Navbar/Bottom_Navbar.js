import React, { useContext } from 'react'
import { Div, Button, Icon,Text } from 'react-native-magnus'
import Bottom_Navbar_item from './Bottom_Navbar_item'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Custom_colors from '../../config/Custom_colors';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../Context/AuthProvider';


export default function Bottom_Navbar() {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const products = useSelector(state => state.cart.products)
  const wishlist = useSelector(state => state.wishlist.items)
  const {auth}=useContext(AuthContext)



  return (
    <Div zIndex={100000} h={80} bottom={20} bg="white" borderTopWidth={1} borderTopColor='gray300' flexDir='row' justifyContent='space-around' alignItems='center'>
      <Bottom_Navbar_item
        icon={<AntDesign name="home" size={20} color="black" />}
        title={t('home')}
        onPress={()=>navigation.navigate('Home')}

      />


      <Bottom_Navbar_item
        icon={<MaterialCommunityIcons name="account-multiple" size={18} color="black" />}
        title={t('vendors')}
        onPress={()=>navigation.navigate('Vendors')}
        counter = {wishlist.length}
      />




      <Div  rounded="circle" h={40} w={40} flexDir='column' justifyContent='center' position='relative' alignItems='center'>
        <Button bg={Custom_colors.black} h={50} w={50} shadow="md" rounded="circle" p={0} mb={30} onPress={() => navigation.navigate('Cart')}>
          <MaterialCommunityIcons name="cart-variant" size={24} color="white" />
        </Button>
        <Div position="absolute" p={1} rounded="circle"  w={20} h={20} flexDir='column' justifyContent='center' alignItems='center' top={-30} right={-6} borderColor='white' borderWidth={2}  bg={Custom_colors.primary}>
            <Text color='white' fontSize={10} >{products.length}</Text>
        </Div>
     
      </Div>


      <Bottom_Navbar_item
        icon={<MaterialCommunityIcons name="store" size={24} color="black" />}
        title={t('shop')}
        onPress={()=>navigation.navigate('Shop')}
      />



      <Bottom_Navbar_item
        icon={<FontAwesome name="user-o" size={20} color="black" />}
        title={t('account')}
        onPress={()=>{
          if(auth){
            navigation.navigate('Account')
          }else{
            navigation.navigate('Login')
          }
        }}
      />

    </Div>
  )
}
