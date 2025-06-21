import React, { useState } from 'react'
import { Div, Text, Radio, Button, Image } from "react-native-magnus";
import custom_colors from "../../../config/custom_colors";
import { api_config } from "../../../config/api_config";
import Custom_quantity_btn from "../../../custom_components/custom_quantity_btn";
import { useTranslation } from "react-i18next";
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function Product_description({
  product,
  quantity,
  setQuantity,
  selectedvariants,
  setSelectedVariants,
  selectedoptions,
  setSelectedoptions,
  setSelectedImage
}) {

  const { t, i18n } = useTranslation();

  const [selectedAttributes, setSelectedAttributes] = useState({});
  const navigation = useNavigation();

  const handleAttributeSelect = (attrName, value) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attrName]: value.value,
    }));


    if (value?.image?.formats?.thumbnail?.url) {
      setSelectedImage(value.image.formats.thumbnail.url);
    }
    
  };



  const handle_increase_quantity = () => {
    setQuantity(quantity + 1);
  };
  const handle_decrease_quantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };







  return (
    <Div mt={5}   >

      <Div my={5} p={10} bg="white">
        <Text fontWeight="bold" fontSize={20}>{product.title}</Text>
        <Text mt={10} >{product.description}</Text>


        <Text mt={10} fontWeight='bold'  >{product?.category?.title}</Text>

        <Div flexDir='row' justifyContent='space-between' alignItems='center'>
          <Text fontWeight='bold' mt={10} >{product?.vendor?.vendor_name}</Text>
          <Button rounded={10} px={15} py={10} fontSize={12} bg={custom_colors.primary} onPress={() => navigation.navigate("Vendor", { vendorId: product.vendor.id })}>
            {t('visit-vendor')}
          </Button>
        </Div>
      </Div>







      {product && product.attributes && product.attributes.length > 0 ? (<Div my={5} p={10} bg="white">

        {product?.attributes?.map((attr, index) => (
          <Div key={index} mb={15}>
            <Text fontWeight="bold" mb={5}>
              {attr.name}
            </Text>



            <Div flexDir='row' flexWrap='wrap' justifyContent='flex-start' alignItems='center'>
              {attr.values.map((value, idx) => (
                <Button
                  bg={selectedAttributes[attr.name] === value.value ? custom_colors.secondary : "gray200"}
                  shadow={selectedAttributes[attr.name] === value.value ? "sm" : "none"}
                  position='relative'
                  w={'15%'}
                  p={0}
                  key={idx}
                  py={10}
                  mr={10}
                  mb={10}
                  rounded={30}
                  onPress={() => handleAttributeSelect(attr.name, value)}>
                  <Div
                    w={"100%"}

                    alignItems="center"
                    justifyContent="center"

                  >



{value?.image ?

 <Image
                      w={40}
                      h={40}
                      rounded={"circle"}

                      source={{
                        uri: value?.image?.formats?.thumbnail?.url,
                      }}
                    />:(<></>)}


                   
                    <Text
                      color={selectedAttributes[attr.name] === value.value ? "white" : "gray800"}
                      fontWeight={selectedAttributes[attr.name] === value.value ? "bold" : "normal"}
                    >
                      {value.value}
                    </Text>
                  </Div>
                </Button>

              ))}
            </Div>

          </Div>
        ))}




      </Div>) : (<></>)}








      <Div my={5} p={10} flexDir='row' justifyContent='space-between' alignItems='center' bg="white">

        {product.sale ? (

          <Div flexDir='row'>
            <Text color={custom_colors.primary} fontSize="2xl" >
              {product.sale} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
            </Text>
            <Text color='red600' fontSize={13} textDecorLine='line-through' >
              {product.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
            </Text>
          </Div>) : (

          <Div>
            <Text color={custom_colors.primary} fontSize="2xl" >
              {product.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
            </Text>
          </Div>
        )}

        <Div
          flexDir="row"
          bg="gray200"
          justifyContent="center"
          alignItems="center"
          px={10}
          py={5}
          rounded={10}
          w={130}

        >
          <Custom_quantity_btn
            icon="plus"
            onPress={() => handle_increase_quantity()}
          />
          <Text w={40} textAlign="center" fontSize="lg" fontWeight="bold">
            {quantity}
          </Text>
          <Custom_quantity_btn
            icon="minus"
            onPress={() => handle_decrease_quantity()}
          />
        </Div>
      </Div>






      {/* <Div bg="white" my={5} p={5}>
        {Array.isArray(product.logn_description) && product.logn_description.map((para, idx) => (
          <Text key={idx} mb={5}>
            {para.children && para.children.map((child, cidx) => child.text).join('')}
          </Text>
        ))}
      </Div> */}

    </Div>
  );
}
