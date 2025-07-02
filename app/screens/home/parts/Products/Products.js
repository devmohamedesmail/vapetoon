import React, { useContext } from "react";
import { Div, Text } from "react-native-magnus";
import { DataContext } from "../../../../context/data_provider";
import Product_card_item from "../../../../items/product_card_item";
import Products_skeleton from "../../../../skeletons/products_skeleton";
import { CustomSectionTitle } from "../../../../custom/custom_section_title";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { products } = useContext(DataContext);
  const {t}=useTranslation()
 



  return (
    <Div my={5} px={5} pb={100}>
      <CustomSectionTitle title={t('shop-products')} subtitle={t('shop-products')} />
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
