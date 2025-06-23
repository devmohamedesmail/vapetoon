import React, { useEffect, useState } from 'react'
import { Div, Image, ScrollDiv, Text } from 'react-native-magnus'
import custom_colors from '../../config/custom_colors'
import Header from '../../components/header/header'
import Bottom_Navbar from '../../components/bottom_navbar/bottom_navbar'
import { api_config } from '../../config/api_config'
import axios from 'axios'

import Product_card_item from '../../items/product_card_item'
import Products_skeleton from '../../skeletons/products_skeleton'
export default function Shop({ route }) {
  const category = route?.params?.category;
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);















  const fetch_products = async () => {
    try {
      if(category?.id){
        const response = await axios.get(`${process.env.EXPO_PUBLIC_APP_URL}/products?filters[category][id][$eq]=28&populate=images`, {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
          },
        });
        setProducts(response.data.data);
        
      }else{
        const response = await axios.get(`${process.env.EXPO_PUBLIC_APP_URL}/products?populate=images`, {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
          },
        });
        setProducts(response.data.data);
      }

      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch_products();
  }, [category]);










  return (
       <Div flex={1}>
      <Div pt={15} bg="white">
        <Header bg="transparent" />
      </Div>
      <ScrollDiv bg={custom_colors.screen}>
        {/* header Category Section start */}
        {category?.image?.url && (
          <Div position="relative">
            <Image
              source={{ uri: `${category.image.formats.thumbnail.url}` }}
              w="100%"
              h={200}
            />
            <Text position="absolute" top="40%" left="40%" bg="white" p={10} rounded="md">
              {category.title}
            </Text>
          </Div>
        )}
        {/* header Category Section end */}

        <Div my={5} px={5}>
          {loading ? (
            <Products_skeleton />
          ) : products && products.length > 0 ? (
            <Div
              flexDir="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              {products.map((product, index) => (
                <Product_card_item key={index} product={product} />
              ))}
            </Div>
          ) : (
            <Div alignItems="center" py={20}>
              <Text color="gray500">No products found.</Text>
            </Div>
          )}
        </Div>
      </ScrollDiv>
      <Bottom_Navbar />
    </Div>
  )
}
