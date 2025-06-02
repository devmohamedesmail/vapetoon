import React, { useContext } from "react";
import { Div, Image } from "react-native-magnus";
import { DataContext } from "../../Context/DataProvider";

export default function Logo({ h, w }) {
  const {categories, products, settings} =
    useContext(DataContext);
  return (
    <Div flexDir="column" justifyContent="center" alignItems="center" >
      <Image
        h={h}
        w={w}
        source={require("../../../assets/images/logo.png")}
      />
    </Div>
  );
}
