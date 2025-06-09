import React from "react";
import { Div, Image } from "react-native-magnus";
import Swiper from 'react-native-swiper'
import Custom_colors from "../../../config/Custom_colors";
import Entypo from '@expo/vector-icons/Entypo';




export default function Swiper_Images({ product, selectedImage }) {
  const images = product.images || [];


  const renderedImages = selectedImage
    ? [{ url: selectedImage }, ...images.filter(img => img?.formats?.thumbnail?.url !== selectedImage)]
    : images;



  return (


    <Div bg="white">
      <Swiper 
      dotColor="#ccc" 
      activeDotColor={Custom_colors.secondary || 'red'}
      nextButton={<Entypo name="chevron-with-circle-right" size={20} color={Custom_colors.secondary} />}
      prevButton={<Entypo name="chevron-with-circle-left" size={20} color={Custom_colors.secondary} />}
      showsButtons={true} style={{ height: 300 }}>
        {renderedImages.map((image, index) => (
          <Div h={300} key={index}>
            <Image
              h={300}
              w="100%"
              rounded="md"
              source={{
                uri: image?.url || image?.formats?.thumbnail?.url,
              }}
            />
          </Div>
        ))}
      </Swiper>
    </Div>
  );
}


