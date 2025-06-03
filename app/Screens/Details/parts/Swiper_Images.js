import React from "react";
import { Div, Image } from "react-native-magnus";
import Swiper from 'react-native-swiper'





export default function Swiper_Images({ product,selectedImage }) {
 const images = product.images || [];


   const renderedImages = selectedImage
    ? [{ url: selectedImage }, ...images.filter(img => img?.formats?.thumbnail?.url !== selectedImage)]
    : images;



  return (

    // <Div bg="white">


    //   <Swiper showsButtons={true} style={{ height: 300 }}>
    //     {product.images && product.images.map((image, index) => (
    //       <Div h={300} key={index}>
    //         <Image
    //           h={300}
    //           w="100%"
    //           rounded="md"
    //           source={{
    //             uri: `${image?.formats?.thumbnail?.url}`,
    //           }}
    //         />
    //       </Div>
    //     ))}
    //   </Swiper>

    // </Div>
      <Div bg="white">
      <Swiper showsButtons={true} style={{ height: 300 }}>
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


