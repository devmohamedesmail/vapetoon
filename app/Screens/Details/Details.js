import React, { useEffect, useState } from "react";
import { Div, ScrollDiv, Skeleton } from "react-native-magnus";
import Custom_colors from "../../config/Custom_colors";
import { useRoute } from "@react-navigation/native";
import Swiper_Images from "./parts/Swiper_Images";
import Product_description from "./parts/Product_description";
import Product_action from "./parts/Product_action";
import Header from "../../Component/Header/Header";
import axios from "axios";
import { api_config } from "../../config/api_config";

export default function Details() {
  const route = useRoute();
  const { productId } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [selectedvariants, setSelectedVariants] = useState([]);
  const [selectedoptions, setSelectedoptions] = useState([]);
  const [product, setProduct] = useState(null);









  // const fetch_product_details = async () => {
  //   try {
  //     const response = await axios.get(`${api_config.url}/api/products?filters[id][$eq]=${productId}&populate[category]=true&populate[vendor]=true&populate[images]=true&populate[attributes][populate]=values`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${api_config.token}`,

  //         }
  //       }
  //     )

  //     setProduct(response.data.data[0])

  //   } catch (error) {
  //     console.log("error fetcing product details", error)
  //   }
  // }
  const fetch_product_details = async () => {
    try {
      const response = await axios.get(`https://ecommerce-strapi-ex18.onrender.com/api/products?filters[id][$eq]=${productId}&populate[category]=true&populate[vendor]=true&populate[images]=true&populate[attributes][populate][values][populate]=image`,
        {
          headers: {
            Authorization: `Bearer ${api_config.token}`,

          }
        }
      )

      setProduct(response.data.data[0])

    } catch (error) {
      console.log("error fetcing product details", error)
    }
  }

  useEffect(() => {
    fetch_product_details()
  }, [productId])










  return (
    <Div flex={1}>
      <Div pt={15} bg="white">
        <Header bg="transparent" />
      </Div>


      {product ? (
        <>
          <ScrollDiv bg={Custom_colors.screen}>
            <Swiper_Images product={product} />


            <Product_description
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
              selectedvariants={selectedvariants}
              setSelectedVariants={setSelectedVariants}
              selectedoptions={selectedoptions}
              setSelectedoptions={setSelectedoptions}
            />
          </ScrollDiv>
          <Product_action
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedvariants={selectedvariants}
            setSelectedVariants={setSelectedVariants}
            selectedoptions={selectedoptions}
            setSelectedoptions={setSelectedoptions}
          />
        </>
      ) : (
        <Div flex={1} mt={0}>
          <Div ml="md" flex={1}>
            <Skeleton.Box mt="sm" w="100%" h={400} />
            <Skeleton.Box mt="sm" w="80%" h={30} />
            <Skeleton.Box mt="sm" h={30} />
            <Skeleton.Box w="80%" mt={20} h={30} />
            <Skeleton.Box mt="sm" h={30} />
            <Skeleton.Box w="80%" mt={20} h={30} />
            <Skeleton.Box mt="sm" h={30} />
            <Skeleton.Box w="80%" mt={20} h={30} />
            <Skeleton.Box mt="sm" h={30} />



          </Div>
        </Div>)}

    </Div>
  );
}
