import React, { useContext } from "react";
import { Div, Text } from "react-native-magnus";
import { DataContext } from "../../../../Context/DataProvider";
import Product_card_item from "../../../../items/Product_card_item";
import Products_skeleton from "../../../../skeletons/Products_skeleton";

export default function Products() {
  const { products } = useContext(DataContext);

 



  return (
    <Div my={5} px={5} >
      {products && products.length > 0 ? (
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
        <Products_skeleton />
      )}
    </Div>
  );
}
