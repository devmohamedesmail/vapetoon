import React, { useContext, useEffect, useState, useRef } from "react";
import { Animated, StatusBar, Dimensions, Pressable } from "react-native";
import { Div, ScrollDiv, Text, Button } from "react-native-magnus";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import Cart_item from "../../items/cart_item";
import Bottom_Navbar from "../../components/bottom_navbar/bottom_navbar";
import { api_config } from "../../config/api_config";
import { AuthContext } from "../../context/auth_provider";
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import Cart_Empty from "../../components/cart_empty/cart_empty";
import Cart_Header from "../../components/cart_header/cart_header";
import Cart_Summery from "../../components/cart_summery/cart_summery";
import Fixed_Cart_Action from "../../components/fixed_cart_action/fixed_cart_action";



export default function Cart() {
  const cartItems = useSelector((state) => state.cart.products);
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { auth } = useContext(AuthContext);
  
  // State
  const [totalAmount, setTotalAmount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  
  // Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Calculate cart totals
  const calculateCartAmount = () => {
    const total = cartItems.reduce((sum, product) => {
      const price = product.sale || product.price;
      return sum + price * product.quantity;
    }, 0);
    
    const count = cartItems.reduce((sum, product) => {
      return sum + product.quantity;
    }, 0);
    
    setTotalAmount(total);
    setItemCount(count);
  }

  useEffect(() => {
    calculateCartAmount();
    
    // Animate content in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [cartItems]);

 

 

  return (
    <Div flex={1} bg="#f8f9fa">
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header */}
      <Cart_Header cartItems={cartItems} itemCount={itemCount} />

      {cartItems && cartItems.length > 0 ? (
        <Div flex={1} >
          {/* Cart Items */}
          <Animated.View
            style={{
              flex: 1,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              paddingBottom: 100, 
              
              
             
            }}
          >
            <ScrollDiv
              flex={1}
              px={20}
              pt={20}
            
              showsVerticalScrollIndicator={false}
            >
              {cartItems.map((item, index) => (
                <Cart_item key={`${item.id}-${index}`} item={item} />
              ))}

              {/* Order Summary Card */}
              <Cart_Summery itemCount={itemCount} totalAmount={totalAmount} />
            </ScrollDiv>
          </Animated.View>

          {/* Fixed Bottom Action Bar */}
         <Fixed_Cart_Action itemCount={itemCount} totalAmount={totalAmount} />
        </Div>
      ) : (
        <Cart_Empty />
      )}

      <Bottom_Navbar />
    </Div>
  );
}
