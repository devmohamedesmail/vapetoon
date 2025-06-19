import React, { useState } from "react";
import { Pressable, Animated } from "react-native";
import { Button, Div, Image, Text } from "react-native-magnus";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { api_config } from "../../config/api_config";
import { add_to_cart } from "../../Redux/Reducers/cartReducer";
import Toast from "react-native-toast-message";

export default function WishlistItem({ item, onPress, showDetails, onRemove }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [isPressed, setIsPressed] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Extract item properties with fallbacks
  const image = item?.image || item?.images?.[0] || '';
  const name = item?.name || item?.title || '';
  const price = item?.price || 0;
  const salePrice = item?.sale || item?.sale_price;
  const stock = item?.stock || item?.quantity || 0;
  const hasDiscount = salePrice && salePrice < price;
  const finalPrice = hasDiscount ? salePrice : price;
  const discountPercentage = hasDiscount ? Math.round(((price - salePrice) / price) * 100) : 0;

  const handleAddToCart = async () => {
    if (stock <= 0) {
      Toast.show({
        type: 'error',
        text1: t('out_of_stock') || 'Out of Stock',
        text2: t('item_not_available') || 'This item is currently not available',
        visibilityTime: 3000,
      });
      return;
    }

    setIsAddingToCart(true);
    
    try {
      // Add to cart with quantity 1
      dispatch(add_to_cart({ ...item, quantity: 1 }));
      
      Toast.show({
        type: 'success',
        text1: t('added_to_cart') || 'Added to Cart!',
        text2: `${name} ${t('added_successfully') || 'has been added to your cart'}`,
        visibilityTime: 2000,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('error') || 'Error',
        text2: t('failed_to_add') || 'Failed to add item to cart',
        visibilityTime: 3000,
      });
    } finally {
      setTimeout(() => setIsAddingToCart(false), 1000);
    }
  };

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.98 : 1 }],
        marginBottom: 16,
      })}
    >
      <Div 
        bg="white" 
        rounded={16} 
        p={16}
        borderWidth={1}
        borderColor="#f0f0f0"
        overflow="hidden"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <Div flexDir="row" alignItems="flex-start">
          {/* Product Image */}
          <Pressable onPress={showDetails}>
            <Div position="relative">
              <Image
                h={100}
                w={100}
                rounded={12}
                source={{
                  uri: image || 'https://via.placeholder.com/100x100?text=No+Image',
                }}
                resizeMode="cover"
              />
              
              {/* Discount Badge */}
              {hasDiscount && (
                <Div
                  position="absolute"
                  top={8}
                  left={8}
                  bg="#ef4444"
                  rounded={12}
                  px={8}
                  py={4}
                >
                  <Text fontSize={10} fontWeight="600" color="white">
                    -{discountPercentage}%
                  </Text>
                </Div>
              )}

              {/* Stock Status */}
              {stock <= 0 && (
                <Div
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg="rgba(0,0,0,0.7)"
                  rounded={12}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize={12} fontWeight="600" color="white">
                    {t('out_of_stock') || 'Out of Stock'}
                  </Text>
                </Div>
              )}
            </Div>
          </Pressable>

          {/* Product Details */}
          <Div flex={1} ml={16} justifyContent="space-between">
            {/* Product Name */}
            <Pressable onPress={showDetails}>
              <Text 
                fontSize={16} 
                fontWeight="600" 
                color="#1f2937" 
                numberOfLines={2}
                mb={8}
                lineHeight={22}
              >
                {name || t('unnamed_product') || 'Unnamed Product'}
              </Text>
            </Pressable>
            
            {/* Price Section */}
            <Div mb={12}>
              <Div flexDir="row" alignItems="center" flexWrap="wrap">
                <Text 
                  fontSize={18} 
                  fontWeight="700" 
                  color="#1f2937"
                  mr={8}
                >
                  {finalPrice.toFixed(2)} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                </Text>
                
                {hasDiscount && (
                  <Text 
                    fontSize={14} 
                    color="#9ca3af"
                    textDecorationLine="line-through"
                  >
                    {price.toFixed(2)} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                  </Text>
                )}
              </Div>
              
              {/* Stock Info */}
              <Div flexDir="row" alignItems="center" mt={4}>
                <Ionicons 
                  name={stock > 0 ? "checkmark-circle" : "close-circle"} 
                  size={14} 
                  color={stock > 0 ? "#059669" : "#ef4444"} 
                />
                <Text 
                  fontSize={12} 
                  color={stock > 0 ? "#059669" : "#ef4444"}
                  fontWeight="500"
                  ml={4}
                >
                  {stock > 0 
                    ? `${stock} ${t('in_stock') || 'in stock'}`
                    : t('out_of_stock') || 'Out of stock'
                  }
                </Text>
              </Div>
            </Div>

            {/* Action Buttons */}
            <Div flexDir="row" alignItems="center" justifyContent="space-between">
              {/* Add to Cart Button */}
              <Button
                bg={stock > 0 ? "#1f2937" : "#d1d5db"}
                h={44}
                flex={1}
                rounded={12}
                mr={12}
                onPress={handleAddToCart}
                disabled={stock <= 0 || isAddingToCart}
                flexDir="row"
                alignItems="center"
                justifyContent="center"
              >
                {isAddingToCart ? (
                  <Div flexDir="row" alignItems="center">
                    <Div 
                      w={16} 
                      h={16} 
                      borderWidth={2} 
                      borderColor="white" 
                      borderTopColor="transparent"
                      rounded="circle"
                      mr={8}
                      style={{
                        transform: [{ rotate: '45deg' }]
                      }}
                    />
                    <Text color="white" fontSize={14} fontWeight="600">
                      {t('adding') || 'Adding...'}
                    </Text>
                  </Div>
                ) : (
                  <Div flexDir="row" alignItems="center">
                    <Ionicons 
                      name="bag-add" 
                      size={16} 
                      color={stock > 0 ? "white" : "#9ca3af"} 
                      style={{ marginRight: 6 }}
                    />
                    <Text 
                      color={stock > 0 ? "white" : "#9ca3af"} 
                      fontSize={14} 
                      fontWeight="600"
                    >
                      {t('add_to_cart') || 'Add to Cart'}
                    </Text>
                  </Div>
                )}
              </Button>

              {/* Remove from Wishlist Button */}
              <Button
                bg="transparent"
                borderWidth={1}
                borderColor="#ef4444"
                h={44}
                w={44}
                rounded={12}
                onPress={onRemove || onPress}
                alignItems="center"
                justifyContent="center"
              >
                <MaterialIcons name="favorite" size={18} color="#ef4444" />
              </Button>
            </Div>
          </Div>
        </Div>
      </Div>
    </Pressable>
  );
}
