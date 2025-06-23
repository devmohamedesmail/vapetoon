import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screens/home/home'

import Details from '../screens/details/details'
import Checkout from '../screens/checkout/checkout'
import Login from '../screens/auth/login'
import Cart from '../screens/cart/cart'
import Wishlist from '../screens/wishlist/wishlist'
import Shop from '../screens/shop/shop'
import Account from '../screens/account/account'
import Vendor from '../screens/vendor/vendor'
import Search from '../screens/search/search'
import Register from '../screens/auth/register';
import Vendors from '../screens/vendors/vendors'
import Add_Address from '../screens/addresses/add'




const Stack = createNativeStackNavigator()
export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName='Home'
       screenOptions={{
        animation: 'slide_from_bottom', // or 'slide_from_right', 'slide_from_left', 'slide_from_bottom', 'none'
        animationDuration: 200,
        headerShown: false
      }}
      
      >
        <Stack.Screen name='Home' component={Home}  />
        <Stack.Screen name='Details' component={Details}   />
        <Stack.Screen name='Checkout' component={Checkout}  />
        <Stack.Screen name='Login' component={Login}  />
        <Stack.Screen name='Register' component={Register}  />
        <Stack.Screen name='Cart' component={Cart}  />
        <Stack.Screen name='Wishlist' component={Wishlist}  />
        <Stack.Screen name='Shop' component={Shop}  />
        <Stack.Screen name='Account' component={Account}  />
        <Stack.Screen name='Vendor' component={Vendor}  />
        <Stack.Screen name='Search' component={Search}  />
        <Stack.Screen name='Vendors' component={Vendors}  />
        <Stack.Screen name='AddAddress' component={Add_Address}  />

       
    </Stack.Navigator>
  )
}
