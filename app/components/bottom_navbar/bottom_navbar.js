import React, { useContext } from 'react'
import { Pressable, Dimensions, Platform } from 'react-native'
import { Div, Text } from 'react-native-magnus'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
import { Ionicons, Foundation, Feather } from '@expo/vector-icons'
import custom_colors from '../../config/custom_colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { AuthContext } from '../../context/auth_provider'

const { width: screenWidth } = Dimensions.get('window')

// Tab Item Component with improved design
const TabItem = ({ icon, activeIcon, label, isActive, onPress, badge }) => (
  <Pressable onPress={onPress} style={{ alignItems: 'center', flex: 1 }}>
    <Div alignItems="center" py={6}>
      {isActive ? activeIcon : icon}
      <Text 
        fontSize={9} 
        fontWeight={isActive ? "600" : "500"}
        color={isActive ? custom_colors.primary : "#fff"}
        mt={2}
      >
        {label}
      </Text>
      
      {/* Badge for regular tabs */}
      {badge > 0 && (
        <Div
          position="absolute"
          top={-4}
          right={16}
          bg="#ef4444"
          minW={16}
          h={16}
          rounded="circle"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={8} color="white" fontWeight="bold">
            {badge > 99 ? '99+' : badge}
          </Text>
        </Div>
      )}
    </Div>
  </Pressable>
)

// Center Floating Button with enhanced design
const CenterButton = ({ icon, onPress, badge }) => (
  <Pressable onPress={onPress}>
    <Div
      w={60}
      h={60}
      bg={custom_colors.primary}
      rounded="circle"
      alignItems="center"
      justifyContent="center"
      style={{
        marginTop: -30,
        shadowColor: custom_colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 12,
      }}
    >
      {icon}
      
      {/* Badge for center button */}
      {badge > 0 && (
        <Div
          position="absolute"
          top={-3}
          right={-3}
          bg="#ef4444"
          minW={20}
          h={20}
          rounded="circle"
          alignItems="center"
          justifyContent="center"
          borderWidth={2}
          borderColor="white"
        >
          <Text fontSize={9} color="white" fontWeight="bold">
            {badge > 99 ? '99+' : badge}
          </Text>
        </Div>
      )}
    </Div>
  </Pressable>
)

export default function Bottom_Navbar() {
  const navigation = useNavigation()
  const route = useRoute()
  const { t } = useTranslation()
  const cartItems = useSelector(state => state.cart.products)
  const wishlistItems = useSelector(state => state.wishlist.items)
  const { auth } = useContext(AuthContext)

  const currentRoute = route.name
  const isActive = (routeNames) => routeNames.includes(currentRoute)
//url(#grad)
  return (
    <Div position="absolute" bottom={0} left={0} right={0} zIndex={1000}>
      {/* Enhanced Curved Background using SVG */}
      <Svg width={screenWidth} height={85} style={{ position: 'absolute', bottom: 0 }}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="rgba(255, 255, 255, 0.98)" />
            <Stop offset="100%" stopColor="rgba(248, 250, 252, 1)" />
          </LinearGradient>
        </Defs>
        <Path
          d={`M0,25 Q${screenWidth/4},8 ${screenWidth/2},8 Q${screenWidth*3/4},8 ${screenWidth},25 L${screenWidth},85 L0,85 Z`}
          fill="#ff6b35"
          stroke="rgba(20, 86, 220, 0.3)"
          strokeWidth={0.5}
        />
      </Svg>

      {/* Tab Container */}
      <Div
        h={85}
        flexDir="row"
        alignItems="center"
        justifyContent="space-around"
        px={16}
        pb={Platform.OS === 'ios' ? 25 : 15}
      >
        {/* Home Tab */}
        <TabItem
          icon={<Ionicons name="home-outline" size={22} color="#fff" />}
          activeIcon={<Ionicons name="home" size={22} color={custom_colors.primary} />}
          label={t('home')}
          isActive={isActive(['Home'])}
          onPress={() => navigation.navigate('Home')}
        />

        {/* Vendors Tab */}
        <TabItem
          icon={<Foundation name="torsos-all" size={22} color="#fff" />}
          activeIcon={<Foundation name="torsos-all" size={22} color={custom_colors.primary} />}
          label={t('vendors')}
          isActive={isActive(['Vendors'])}
          onPress={() => navigation.navigate('Vendors')}
         
        />

        {/* Center Cart Button */}
        <CenterButton
          icon={<Ionicons name="bag" size={26} color="white" />}
          onPress={() => navigation.navigate('Cart')}
          badge={cartItems.length}
        />

        {/* Shop Tab */}
        <TabItem
          icon={<Ionicons name="storefront-outline" size={22} color="#fff" />}
          activeIcon={<Ionicons name="storefront" size={22} color={custom_colors.primary} />}
          label={t('shop')}
          isActive={isActive(['Shop'])}
          onPress={() => navigation.navigate('Shop')}
        />

        {/* Account Tab */}
        <TabItem
          icon={<Feather name="user" size={22} color="#fff" />}
          activeIcon={<Feather name="user" size={22} color={custom_colors.primary} />}
          label={t('account')}
          isActive={isActive(['Account', 'Login'])}
          onPress={() => auth ? navigation.navigate('Account') : navigation.navigate('Login')}
        />
      </Div>
    </Div>
  )
}
