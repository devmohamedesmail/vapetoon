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
    <Div flex={1} bg="#f8f9fa">
      <Div pt={15} bg="white" borderBottomWidth={1} borderBottomColor="#f0f0f0">
        <Header bg="transparent" />
      </Div>

      <ScrollDiv flex={1} showsVerticalScrollIndicator={false}>
        <Div px={20} py={20}>
          <Text mb={30} textAlign="center" fontSize={24} fontWeight="700" color="#1f2937">
            {t('wishlist') || 'My Wishlist'}
          </Text>
          {wishlist && wishlist.length > 0 ? (
            <Div>
              {wishlist.map((product, index) => (
                <WishlistItem
                  key={product.id || index}
                  item={{
                    ...product,
                    name: product.title || product.name,
                    image: product.image
                      ? `${api_config.url}${product.image.formats?.thumbnail?.url || product.image.url}`
                      : product.images?.[0] || "https://via.placeholder.com/150",
                  }}
                  showDetails={() => navigation.navigate("Details", { product })}
                  onRemove={() => handle_remove_from_wishlist(product.id)}
                />
              ))}
            </Div>
          ) : (
            <Div alignItems="center" py={60}>
              <Div 
                w={100} 
                h={100} 
                rounded="circle" 
                bg="rgba(239, 68, 68, 0.1)" 
                alignItems="center" 
                justifyContent="center"
                mb={20}
              >
                <Text fontSize={40}>💝</Text>
              </Div>
              <Text fontSize={20} fontWeight="700" color="#1f2937" mb={8} textAlign="center">
                {t("empty_wishlist") || "Your wishlist is empty"}
              </Text>
              <Text fontSize={14} color="#6b7280" textAlign="center" lineHeight={20}>
                {t("add_items_to_wishlist") || "Add items you love to your wishlist and they'll appear here"}
              </Text>
            </Div>
          )}
        </Div>
      </ScrollDiv>
      <Bottom_Navbar />
    </Div>
  );
}
