import React, { useContext, useEffect, useState } from "react";
import { Div, ScrollDiv, Text } from "react-native-magnus";
import Custom_colors from "../../config/Custom_colors";
import Header from "../../Component/Header/Header";
import Bottom_Navbar from "../../Component/Bottom_Navbar/Bottom_Navbar";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Custom_button from "../../Custom_Components/Custom_button";
import { useNavigation } from "@react-navigation/native";
import Cart_item from "../../items/Cart_item";
import { api_config } from "../../config/api_config";
import { AuthContext } from "../../Context/AuthProvider";
export default function Cart() {
  const cartItems = useSelector((state) => state.cart.products);
  const { t , i18n } = useTranslation();
  const navigation = useNavigation();
  const [totalAmount, setTotalAmount] = useState(0);
  const {auth}=useContext(AuthContext)










  // calculte the total price of the cart
  const calculateCartAmount = () => {
    const total = cartItems.reduce((sum, product) => {
      const price = product.price;
      return sum + price * product.quantity;
    }, 0);
    setTotalAmount(total);
  }

  useEffect(() => {
    calculateCartAmount()
  }, [cartItems])

  return (
    <Div flex={1}>
      <Div pt={15} bg="white">
        <Header bg="transparent" />
      </Div>
      <ScrollDiv bg={Custom_colors.screen}>
        <Div px={10} py={20} >
          <Text textAlign="center" p={20} bg="white" my={5} fontWeight="bold">
            {t("cart")}
          </Text>


          <Div>
            {cartItems && cartItems.length > 0 ? (
              <>
                <Div>
                  {cartItems.map((item, index) => (
                    <Cart_item key={index} item={item} />
                  ))}
                </Div>

                <Div flexDir="row" justifyContent="space-between" my={5} py={10} px={5} bg="white">
                  <Text fontWeight="bold">{t('cart-amount')}</Text>
                  <Text bg={Custom_colors.primary} color="white" p={10} rounded='lg'>{totalAmount} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en} </Text>
                </Div>




                <Custom_button
                  title={t("checkout")}
                  onPress={() => {
                     navigation.navigate("Checkout")
                  }}
                />
              </>
            ) : (
              <Text bg="gray100" my={30} textAlign="center" p={20}>
                {t("cart-empty")}
              </Text>
            )}
          </Div>






        </Div>
      </ScrollDiv>
      <Bottom_Navbar />
    </Div>
  );
}
