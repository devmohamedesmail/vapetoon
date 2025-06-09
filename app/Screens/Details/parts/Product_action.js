import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Div, ScrollDiv, Text, Button } from "react-native-magnus";
import Custom_colors from "../../../config/Custom_colors";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart } from "../../../Redux/Reducers/cartReducer";
import Toast from "react-native-toast-message";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
export default function Product_action({
  product,
  quantity,
  setQuantity,
  selectedvariants,
  setSelectedVariants,
  selectedoptions,
  setSelectedoptions
}) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handle_add_wishlist = (product) => {
    try {

      dispatch(add_To_wishlist(product))

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Added to Wishlist!",
        text2: `${product.name} has been added to your wishlist.`,
        visibilityTime: 3000,
      });
    } catch (error) {
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Added to Wishlist!",
        text2: `${product.name} has been added to your wishlist.`,
        visibilityTime: 3000,
      });
    }
  };


const handle_add_to_cart = (product) => {

        try {
            const { id,title, price,sale, images } = product;
            const quantity = 1
            dispatch(add_to_cart({ id,title, price, images,sale, quantity }))
            Toast.show({
                type: "success",
                position: "bottom",
                text1: t('added_to_cart'),
                visibilityTime: 3000,
            });
        } catch (error) {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: t('error-happened'),
                visibilityTime: 3000,
            });

        }
    }



  return (
    <Div h={100} flexDir="row" alignItems="center" px={5} bg="white" pt={5} pb={30}>
    
    
      <Button
        h={45}
        flex={1}
        bg={Custom_colors.primary}
        rounded={8}
        borderWidth={1}
        borderColor={Custom_colors.primary}
        m={3}
        onPress={() => handle_add_to_cart(product)}
      >
        <Div flexDir="row" justifyContent="center" alignItems="center">
          <MaterialIcons
            name="add-shopping-cart"
            size={20}
            color={Custom_colors.white}
          />
          <Text color={Custom_colors.white}> {t("add-to-cart")} </Text>
        </Div>
      </Button>

      <Button
        h={45}
        w={45}
        p={0}
        bg={Custom_colors.white}
        onPress={() => handle_add_wishlist(product)}
      >
        <AntDesign name="hearto" size={24} color="black" />
      </Button>
      <Button
        h={45}
        w={45}
        p={0}
        bg={Custom_colors.white}
        onPress={() => navigation.navigate("Vendor", { vendorId: product.vendor.id })}
      >
        <Entypo name="shop" size={24} color="black" />
      </Button>
    </Div>
  );
}
