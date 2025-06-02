import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../Screens/Home/Home'
import Details from '../Screens/Details/Details'
import Checkout from '../Screens/Checkout/Checkout'
import Login from '../Screens/Auth/Login'
import Cart from '../Screens/Cart/Cart'
import Wishlist from '../Screens/Wishlist/Wishlist'
import Shop from '../Screens/Shop/Shop'
import Account from '../Screens/Account/Account'
import Vendor from '../Screens/Vendor/Vendor'
import Search from '../Screens/Search/Search'
import Register from '../Screens/Auth/Register';
import Vendors from '../Screens/Vendors/Vendors'




const Stack = createNativeStackNavigator()
export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName='Home'
       screenOptions={{
        animation: 'fade', // or 'slide_from_right', 'slide_from_left', 'slide_from_bottom', 'none'
        animationDuration: 700,
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

       
    </Stack.Navigator>
  )
}
