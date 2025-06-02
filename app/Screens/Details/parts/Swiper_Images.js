import React from "react";
import { Div, Image } from "react-native-magnus";
import Swiper from 'react-native-swiper'





export default function Swiper_Images({ product }) {
 
  return (

    <Div bg="white">


      <Swiper showsButtons={true} style={{ height: 300 }}>
        {product.images && product.images.map((image, index) => (
          <Div h={300} key={index}>
            <Image
              h={300}
              w="100%"
              rounded="md"
              source={{
                uri: `${image?.formats?.thumbnail?.url}`,
              }}
            />
          </Div>
        ))}
      </Swiper>

    </Div>
  );
}


