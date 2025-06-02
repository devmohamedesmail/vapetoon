import React, { useContext } from "react";
import { Div, ScrollDiv, Text } from "react-native-magnus";
import Custom_colors from "../../config/Custom_colors";
import Header from "../../Component/Header/Header";
import Bottom_Navbar from "../../Component/Bottom_Navbar/Bottom_Navbar";
import { useDispatch, useSelector } from "react-redux";
import WishlistItem from "./WishlistItem";
import { remove_From_wishlist } from "../../Redux/Reducers/wishlistReducer";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { DataContext } from "../../Context/DataProvider";
import { api_config } from "../../config/api_config";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const { settings } = useContext(DataContext);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();





  const handle_remove_from_wishlist = (id) => {
    try {
      dispatch(remove_From_wishlist({ id }));
      Toast.show({
        type: "success",
        position: "bottom",
        text1: t("deleted"),

        visibilityTime: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Div flex={1} bg={Custom_colors.screen}>
      <Div pt={15} bg="white">
        <Header bg="transparent" />
      </Div>




      <ScrollDiv >
        <Div px={20} py={20}>
          <Text mb={30} textAlign="center" fontWeight="bold" bg="gray100" p={20}>{t('wishlist')}</Text>
          {wishlist && wishlist.length > 0 ? (
            <Div>
              {wishlist.map((product, index) => (
                <WishlistItem
                  key={index}
                  name={product.title}
                  price={product.price}
                  showDetails={() => navigation.navigate("Details", { product })}
                  image={
                    product.image
                      ? `${api_config.url}${product.image.formats.thumbnail.url}`
                      : "https://via.placeholder.com/150"
                  }
                  onPress={() => handle_remove_from_wishlist(product.id)}
                // showDetails={() => navigation.navigate("Details", { item })}
                />
              ))}
            </Div>
          ) : (
            <Text bg="gray200" p={20} textAlign="center" fontWeight="bold">
              {t("empty-wishlist")}
            </Text>
          )}
        </Div>
      </ScrollDiv>
      <Bottom_Navbar />
    </Div>
  );
}
