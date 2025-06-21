import React, { useContext, useEffect, useState, useRef } from "react";
import { Animated, StatusBar, Dimensions, Pressable } from "react-native";
import { Div, ScrollDiv, Text, Button } from "react-native-magnus";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

// Components & Items
// import Cart_item from "../../items/cart_item";
import Cart_item from "../../items/cart_item";

import Bottom_Navbar from "../../components/bottom_navbar/bottom_navbar";

// Config & Context
import { api_config } from "../../config/api_config";
import { AuthContext } from "../../context/auth_provider";

// Icons
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

const { height: screenHeight } = Dimensions.get('window');

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

  const handleCheckout = () => {
    if (!auth) {
      navigation.navigate("Login");
      return;
    }
    navigation.navigate("Checkout");
  };

  const handleContinueShopping = () => {
    navigation.navigate("Shop");
  };

  const EmptyCart = () => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        marginTop: screenHeight * 0.1,
      }}
    >
      <Div alignItems="center" justifyContent="center">
        {/* Empty Cart Icon */}
        <Div
          w={120}
          h={120}
          rounded="circle"
          bg="rgba(107, 114, 128, 0.1)"
          alignItems="center"
          justifyContent="center"
          mb={24}
        >
          <Ionicons name="bag-outline" size={60} color="#6b7280" />
        </Div>

        {/* Empty State Text */}
        <Text fontSize={24} fontWeight="700" color="#1f2937" mb={12} textAlign="center">
          {t('cart_empty_title') || 'Your cart is empty'}
        </Text>
        
        <Text fontSize={16} color="#6b7280" textAlign="center" lineHeight={24} mb={32}>
          {t('cart_empty_subtitle') || 'Looks like you haven\'t added any items to your cart yet. Start shopping to fill it up!'}
        </Text>

        {/* Continue Shopping Button */}
        <Button
          bg="#1f2937"
          h={50}
          px={32}
          rounded={12}
          onPress={handleContinueShopping}
          flexDir="row"
          alignItems="center"
          justifyContent="center"
        >
          <Ionicons name="storefront" size={20} color="white" style={{ marginRight: 8 }} />
          <Text color="white" fontSize={16} fontWeight="600">
            {t('continue_shopping') || 'Continue Shopping'}
          </Text>
        </Button>
      </Div>
    </Animated.View>
  );

  return (
    <Div flex={1} bg="#f8f9fa">
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header */}
      <Div
        pt={50}
        pb={20}
        px={20}
        bg="white"
        borderBottomWidth={1}
        borderBottomColor="#e5e7eb"
      >
        <Div flexDir="row" alignItems="center" justifyContent="space-between">
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </Pressable>
          
          <Div alignItems="center">
            <Text fontSize={20} fontWeight="700" color="#1f2937">
              {t('shopping_cart') || 'Shopping Cart'}
            </Text>
            {cartItems.length > 0 && (
              <Text fontSize={14} color="#6b7280" mt={2}>
                {itemCount} {itemCount === 1 ? (t('item') || 'item') : (t('items') || 'items')}
              </Text>
            )}
          </Div>

          <Div w={24} /> {/* Spacer for centering */}
        </Div>
      </Div>

      {cartItems && cartItems.length > 0 ? (
        <Div flex={1}>
          {/* Cart Items */}
          <Animated.View
            style={{
              flex: 1,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <ScrollDiv
              flex={1}
              px={20}
              pt={20}
              pb={160}
              showsVerticalScrollIndicator={false}
            >
              {cartItems.map((item, index) => (
                <Cart_item key={`${item.id}-${index}`} item={item} />
              ))}

              {/* Order Summary Card */}
              <Div
                bg="white"
                rounded={16}
                p={20}
                mt={20}
                borderWidth={1}
                borderColor="#e5e7eb"
              >
                <Text fontSize={18} fontWeight="600" color="#1f2937" mb={16}>
                  {t('order_summary') || 'Order Summary'}
                </Text>

                <Div flexDir="row" justifyContent="space-between" alignItems="center" mb={12}>
                  <Text fontSize={14} color="#6b7280">
                    {t('subtotal') || 'Subtotal'} ({itemCount} {itemCount === 1 ? (t('item') || 'item') : (t('items') || 'items')})
                  </Text>
                  <Text fontSize={16} fontWeight="600" color="#1f2937">
                    {totalAmount.toFixed(2)} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                  </Text>
                </Div>

                <Div flexDir="row" justifyContent="space-between" alignItems="center" mb={12}>
                  <Text fontSize={14} color="#6b7280">
                    {t('shipping') || 'Shipping'}
                  </Text>
                  <Text fontSize={14} color="#059669" fontWeight="600">
                    {t('free') || 'Free'}
                  </Text>
                </Div>

                <Div h={1} bg="#e5e7eb" my={12} />

                <Div flexDir="row" justifyContent="space-between" alignItems="center">
                  <Text fontSize={18} fontWeight="700" color="#1f2937">
                    {t('total') || 'Total'}
                  </Text>
                  <Text fontSize={20} fontWeight="700" color="#1f2937">
                    {totalAmount.toFixed(2)} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                  </Text>
                </Div>
              </Div>
            </ScrollDiv>
          </Animated.View>

          {/* Fixed Bottom Action Bar */}
          <Div
            position="absolute"
            bottom={80}
            left={0}
            right={0}
            bg="white"
            pt={20}
            pb={20}
            px={20}
            borderTopWidth={1}
            borderTopColor="#e5e7eb"
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            {/* Quick Summary */}
            <Div flexDir="row" justifyContent="space-between" alignItems="center" mb={16}>
              <Div>
                <Text fontSize={14} color="#6b7280">
                  {t('total') || 'Total'} ({itemCount} {itemCount === 1 ? (t('item') || 'item') : (t('items') || 'items')})
                </Text>
                <Text fontSize={20} fontWeight="700" color="#1f2937">
                  {totalAmount.toFixed(2)} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                </Text>
              </Div>
              
              <Div alignItems="flex-end">
                <Text fontSize={12} color="#059669" fontWeight="600" mb={2}>
                  {t('free_shipping') || 'Free Shipping'}
                </Text>
                <Div flexDir="row" alignItems="center">
                  <Feather name="truck" size={14} color="#059669" />
                  <Text fontSize={12} color="#6b7280" ml={4}>
                    {t('estimated_delivery') || 'Estimated delivery'}: 2-3 {t('days') || 'days'}
                  </Text>
                </Div>
              </Div>
            </Div>

            {/* Checkout Button */}
            <LinearGradient
              colors={['#1f2937', '#374151']}
              style={{
                borderRadius: 12,
                height: 56,
              }}
            >
              <Button
                bg="transparent"
                h={56}
                rounded={12}
                onPress={handleCheckout}
                flexDir="row"
                alignItems="center"
                justifyContent="center"
              >
                <MaterialIcons name="lock" size={20} color="white" style={{ marginRight: 8 }} />
                <Text color="white" fontSize={16} fontWeight="600">
                  {t('proceed_to_checkout') || 'Proceed to Checkout'}
                </Text>
              </Button>
            </LinearGradient>

            {/* Continue Shopping Link */}
            <Pressable onPress={handleContinueShopping} style={{ alignItems: 'center', marginTop: 12 }}>
              <Text fontSize={14} color="#6b7280" textDecorLine="underline">
                {t('continue_shopping') || 'Continue Shopping'}
              </Text>
            </Pressable>
          </Div>
        </Div>
      ) : (
        <EmptyCart />
      )}

      <Bottom_Navbar />
    </Div>
  );
}
