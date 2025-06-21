import React, { useRef, useState } from 'react'
import { Animated, TouchableOpacity, StyleSheet, View } from 'react-native'
import { MaterialIcons, FontAwesome, AntDesign, Entypo, Feather } from '@expo/vector-icons'

const options = [
  {
    icon: <Feather name="user" size={22} color="#ff6b35" />,
    label: 'Account',
    onPress: () => alert('Account'),
  },
  {
    icon: <AntDesign name="shoppingcart" size={22} color="#ff6b35" />,
    label: 'Cart',
    onPress: () => alert('Cart'),
  },
  {
    icon: <AntDesign name="hearto" size={22} color="#ff6b35" />,
    label: 'Wishlist',
    onPress: () => alert('Wishlist'),
  },
  {
    icon: <Entypo name="shop" size={22} color="#ff6b35" />,
    label: 'Vendors',
    onPress: () => alert('Vendors'),
  },
  {
    icon: <MaterialIcons name="home" size={22} color="#ff6b35" />,
    label: 'Home',
    onPress: () => alert('Home'),
  },
]

const radius = 50

export default function FloatBtn() {
  const [open, setOpen] = useState(false)
  const animation = useRef(new Animated.Value(0)).current

  const toggleMenu = () => {
    setOpen(!open)
    Animated.spring(animation, {
      toValue: open ? 0 : 1,
      useNativeDriver: true,
    }).start()
  }

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View style={styles.container} pointerEvents="box-none">
        {options.map((opt, i) => {
          const angle = (i / options.length) * 2 * Math.PI - Math.PI / 2
          const x = radius * Math.cos(angle)
          const y = radius * Math.sin(angle)
          return (
            <Animated.View
              key={opt.label}
              style={[
                styles.option,
                {
                  transform: [
                    {
                      translateX: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, x],
                      }),
                    },
                    {
                      translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, y],
                      }),
                    },
                    {
                      scale: animation,
                    },
                  ],
                  opacity: animation,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.optionBtn}
                onPress={opt.onPress}
                activeOpacity={0.8}
              >
                {opt.icon}
              </TouchableOpacity>
            </Animated.View>
          )
        })}
        <TouchableOpacity
          style={styles.fab}
          onPress={toggleMenu}
          activeOpacity={0.85}
        >
          <Animated.View
            style={{
              transform: [
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg'],
                  }),
                },
              ],
            }}
          >
            <FontAwesome name="plus" size={28} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 36,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#ff6b35',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  option: {
    position: 'absolute',
    left: 8,
    top: 8,
  },
  optionBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 8,
  },
})