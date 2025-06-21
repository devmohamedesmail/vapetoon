import React, { useEffect, useState, useRef } from "react";
import { Animated, StatusBar, Dimensions, Pressable } from "react-native";
import { Div, ScrollDiv, Text, Button, Image } from "react-native-magnus";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import axios from "axios";
import Swiper from 'react-native-swiper';

// Icons
import { Ionicons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';

// Config & Redux
import custom_colors from "../../config/custom_colors";
import { api_config } from "../../config/api_config";
import { add_to_cart } from '../../redux/reducers/cart_reducer';
import { add_To_wishlist } from '../../redux/reducers/wishlist_reducer';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Details() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  
  const { productId } = route.params;
  
  // State
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Animation refs
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fetch product details
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_APP_URL}/products?filters[id][$eq]=${productId}&populate[category]=true&populate[vendor]=true&populate[images]=true&populate[attributes][populate][values][populate]=image`,
        {
          headers: {
            Authorization: `Bearer ${api_config.token}`,
          }
        }
      );

      setProduct(response.data.data[0]);
      
      // Animate content in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
    } catch (error) {
      console.log("Error fetching product details", error);
      Toast.show({
        type: 'error',
        text1: t('error_occurred'),
        text2: t('failed_to_load_product'),
      });
    } finally {
      setLoading(false);
    }
  };

  // Add to cart handler
  const handleAddToCart = () => {
    try {
      const { id, title, price, sale, images } = product;
      dispatch(add_to_cart({ id, title, price, images, sale, quantity }));
      Toast.show({
        type: "success",
        text1: t('added_to_cart'),
        text2: `${quantity}x ${title}`,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t('error_occurred'),
      });
    }
  };

  // Add to wishlist handler
  const handleAddToWishlist = () => {
    try {
      dispatch(add_To_wishlist(product));
      setIsWishlisted(!isWishlisted);
      Toast.show({
        type: "success",
        text1: isWishlisted ? t('removed_from_wishlist') : t('added_to_wishlist'),
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t('error_occurred'),
      });
    }
  };

  // Quantity handlers
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.1, 1, 0.9],
    extrapolate: 'clamp',
  });

  if (loading) {
    return (
      <Div flex={1} bg="#ffffff">
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        
        {/* Loading Header */}
        <Div 
          pt={50} 
          pb={20} 
          px={20} 
          flexDir="row" 
          alignItems="center" 
          bg="white"
          borderBottomWidth={1}
          borderBottomColor="#f0f0f0"
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </Pressable>
          <Text ml={16} fontSize={18} fontWeight="600" color="#1f2937">
            {t('product_details')}
          </Text>
        </Div>

        {/* Loading Content */}
        <ScrollDiv flex={1} bg="#f9fafb">
          <Div bg="white" h={400} />
          <Div p={20}>
            <Div bg="white" rounded={12} p={20} mb={16}>
              <Div bg="#e5e7eb" h={24} rounded={4} mb={12} />
              <Div bg="#e5e7eb" h={16} rounded={4} mb={8} w="70%" />
              <Div bg="#e5e7eb" h={16} rounded={4} mb={16} w="50%" />
              <Div bg="#e5e7eb" h={20} rounded={4} w="30%" />
            </Div>
          </Div>
        </ScrollDiv>
      </Div>
    );
  }

  if (!product) {
    return (
      <Div flex={1} bg="#ffffff" justifyContent="center" alignItems="center">
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Text fontSize={16} color="#6b7280">{t('product_not_found')}</Text>
      </Div>
    );
  }

  const currentPrice = product.sale || product.price;
  const originalPrice = product.price;
  const hasDiscount = product.sale && product.sale < product.price;
  const discountPercentage = hasDiscount ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  return (
    <Div flex={1} bg="#ffffff">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Animated Header */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          opacity: headerOpacity,
        }}
      >
        <Div 
          pt={50} 
          pb={20} 
          px={20} 
          flexDir="row" 
          alignItems="center" 
          justifyContent="space-between"
          bg="rgba(255,255,255,0.95)"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </Pressable>
          <Text fontSize={16} fontWeight="600" color="#1f2937" numberOfLines={1} flex={1} mx={16}>
            {product.title}
          </Text>
          <Pressable onPress={handleAddToWishlist}>
            <AntDesign 
              name={isWishlisted ? "heart" : "hearto"} 
              size={24} 
              color={isWishlisted ? "#ef4444" : "#6b7280"} 
            />
          </Pressable>
        </Div>
      </Animated.View>

      {/* Floating Header */}
      <Div 
        position="absolute" 
        top={50} 
        left={0} 
        right={0} 
        zIndex={999}
        px={20}
        pt={15}
        pb={15}
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Pressable 
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: 12,
            padding: 12,
          }}
        >
          <Ionicons name="arrow-back" size={20} color="#1f2937" />
        </Pressable>
        
        <Pressable 
          onPress={handleAddToWishlist}
          style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: 12,
            padding: 12,
          }}
        >
          <AntDesign 
            name={isWishlisted ? "heart" : "hearto"} 
            size={20} 
            color={isWishlisted ? "#ef4444" : "#1f2937"} 
          />
        </Pressable>
      </Div>

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Image Section */}
          <Animated.View style={{ transform: [{ scale: imageScale }] }}>
            <Div h={400} bg="white">
              {product.images && product.images.length > 0 ? (
                <Swiper
                  style={{ height: 400 }}
                  showsButtons={false}
                  dot={<Div w={8} h={8} bg="rgba(255,255,255,0.5)" rounded="circle" mx={4} />}
                  activeDot={<Div w={20} h={8} bg="white" rounded={4} mx={4} />}
                  paginationStyle={{ bottom: 20 }}
                  onIndexChanged={setSelectedImageIndex}
                >
                  {product.images.map((image, index) => (
                    <Div key={index} h={400} justifyContent="center" alignItems="center">
                      <Image
                        source={{ uri: image?.formats?.thumbnail?.url }}
                        h={400}
                        w="100%"
                        resizeMode="cover"
                      />
                    </Div>
                  ))}
                </Swiper>
              ) : (
                <Div h={400} justifyContent="center" alignItems="center" bg="#f3f4f6">
                  <Feather name="image" size={48} color="#9ca3af" />
                </Div>
              )}

              {hasDiscount && (
                <Div
                  position="absolute"
                  top={20}
                  left={20}
                  bg="#ef4444"
                  px={12}
                  py={6}
                  rounded={8}
                >
                  <Text color="white" fontSize={12} fontWeight="600">
                    -{discountPercentage}%
                  </Text>
                </Div>
              )}
            </Div>
          </Animated.View>

          {/* Content Section */}
          <Div bg="#f9fafb" pt={20} pb={120}>
            {/* Product Info Card */}
            <Div bg="white" mx={20} mb={16} rounded={16} p={24}>
              {/* Category & Vendor */}
              <Div flexDir="row" alignItems="center" mb={12}>
                {product.category && (
                  <Div bg="#f3f4f6" px={12} py={6} rounded={20} mr={8}>
                    <Text fontSize={12} color="#6b7280" fontWeight="500">
                      {product.category.name}
                    </Text>
                  </Div>
                )}
                {product.vendor && (
                  <Div bg="#eff6ff" px={12} py={6} rounded={20}>
                    <Text fontSize={12} color="#2563eb" fontWeight="500">
                      {product.vendor.name}
                    </Text>
                  </Div>
                )}
              </Div>

              {/* Product Title */}
              <Text fontSize={24} fontWeight="700" color="#1f2937" mb={8} lineHeight={32}>
                {product.title}
              </Text>

              {/* Price Section */}
              <Div flexDir="row" alignItems="baseline" mb={16}>
                <Text fontSize={28} fontWeight="800" color="#1f2937" mr={8}>
                  {currentPrice} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                </Text>
                {hasDiscount && (
                  <Text fontSize={18} color="#9ca3af" textDecorLine="line-through">
                    {originalPrice} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                  </Text>
                )}
              </Div>

              {/* Stock Status */}
              <Div flexDir="row" alignItems="center" mb={20}>
                <Div
                  w={8}
                  h={8}
                  rounded="circle"
                  bg={product.stock > 0 ? "#10b981" : "#ef4444"}
                  mr={8}
                />
                <Text fontSize={14} color={product.stock > 0 ? "#10b981" : "#ef4444"} fontWeight="600">
                  {product.stock > 0 ? `${t('in_stock')} (${product.stock})` : t('out_of_stock')}
                </Text>
              </Div>

              {/* Description */}
              {product.description && (
                <Div>
                  <Text fontSize={16} color="#4b5563" lineHeight={24}>
                    {product.description}
                  </Text>
                </Div>
              )}
            </Div>

            {/* Quantity & Actions Card */}
            <Div bg="white" mx={20} rounded={16} p={24}>
              <Text fontSize={18} fontWeight="600" color="#1f2937" mb={16}>
                {t('quantity')}
              </Text>
              
              {/* Quantity Selector */}
              <Div flexDir="row" alignItems="center" justifyContent="space-between">
                <Div flexDir="row" alignItems="center" bg="#f9fafb" rounded={12} p={4}>
                  <Pressable
                    onPress={decreaseQuantity}
                    style={{
                      backgroundColor: quantity > 1 ? '#374151' : '#e5e7eb',
                      borderRadius: 8,
                      padding: 12,
                    }}
                  >
                    <Feather name="minus" size={16} color={quantity > 1 ? "white" : "#9ca3af"} />
                  </Pressable>
                  
                  <Text fontSize={18} fontWeight="600" color="#1f2937" mx={20} minW={40} textAlign="center">
                    {quantity}
                  </Text>
                  
                  <Pressable
                    onPress={increaseQuantity}
                    style={{
                      backgroundColor: '#374151',
                      borderRadius: 8,
                      padding: 12,
                    }}
                  >
                    <Feather name="plus" size={16} color="white" />
                  </Pressable>
                </Div>

                {/* Total Price */}
                <Div alignItems="flex-end">
                  <Text fontSize={12} color="#6b7280" mb={4}>
                    {t('total')}
                  </Text>
                  <Text fontSize={20} fontWeight="700" color="#1f2937">
                    {(currentPrice * quantity).toFixed(2)} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                  </Text>
                </Div>
              </Div>
            </Div>
          </Div>
        </Animated.ScrollView>

        {/* Fixed Bottom Action Bar */}
        <Div
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bg="white"
          pt={20}
          pb={32}
          px={20}
          borderTopWidth={1}
          borderTopColor="#e5e7eb"
        >
          {/* Action Buttons Row */}
          <Div flexDir="row" alignItems="center" justifyContent="space-between">
            {/* Visit Store Button */}
            <Button
              bg="transparent"
              borderWidth={2}
              borderColor="#1f2937"
              h={56}
              flex={0.45}
              rounded={16}
              onPress={() => navigation.navigate('Vendor', { vendorId: product.vendor?.id })}
              flexDir="row"
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons 
                name="storefront-outline" 
                size={20} 
                color="#1f2937" 
                style={{ marginRight: 8 }}
              />
              <Text color="#1f2937" fontSize={15} fontWeight="600">
                {t('visit_store')}
              </Text>
            </Button>

            {/* Add to Cart Button */}
            <Button
              bg={product.stock > 0 ? "#1f2937" : "#9ca3af"}
              h={56}
              flex={0.5}
              rounded={16}
              disabled={product.stock === 0}
              onPress={handleAddToCart}
              flexDir="row"
              alignItems="center"
              justifyContent="center"
            >
              <MaterialIcons 
                name="shopping-cart" 
                size={20} 
                color="white" 
                style={{ marginRight: 8 }}
              />
              <Text color="white" fontSize={15} fontWeight="600">
                {product.stock > 0 ? t('add_to_cart') : t('out_of_stock')}
              </Text>
            </Button>
          </Div>
        </Div>
      </Animated.View>
    </Div>
  );
}
