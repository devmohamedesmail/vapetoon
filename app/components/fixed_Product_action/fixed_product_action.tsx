import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Button, Div, Text } from 'react-native-magnus';
import { Ionicons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';

export default function Fixed_Product_Action({  product, handleAddToCart }) {
  const navigation = useNavigation<any>();
  const { t } = useTranslation<any>();
  return (
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
  )
}
