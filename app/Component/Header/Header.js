import React, { useEffect } from "react";
import { Div, Button, Text } from "react-native-magnus";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from '@expo/vector-icons/Feather';
import Fontisto from "@expo/vector-icons/Fontisto";
import Logo from "../Logo/Logo";
import HeaderItem from "./HeaderItem";
import Back_Btn from "./Back_Btn";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "react-native-screens";
import SearchComponent from "../SearchComponent/SearchComponent";

export default function Header({ logo = false, bg = "white" }) {
  const products = useSelector((state) => state.cart.products);
  const wishlist = useSelector(state => state.wishlist.items)
  const navigation = useNavigation()



  return (
    <Div
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      bg={bg}
      pt={35}
      pb={10}

      px={13}
    >
      <Div>
        {logo ?

          <HeaderItem
            icon={<Feather name="message-square" size={20} color="black" />}
            count={0}
            onPress={() => navigation.navigate("Chat")}
          />

          : null}

        {!logo ? <Back_Btn /> : null}
      </Div>



      <SearchComponent />

      <Div flexDir="row">


        <HeaderItem
          icon={<Fontisto name="heart-alt" size={15} color="black" />}
          count={wishlist.length}
          onPress={() => navigation.navigate("Wishlist")}
        />
      </Div>
    </Div>
  );
}
