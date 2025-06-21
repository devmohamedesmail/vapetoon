import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Div, Text } from "react-native-magnus";
import { api_config } from "../../../config/api_config";

export default function Cart_content() {
  const { t } = useTranslation();
  const cartItems = useSelector((state) => state.cart.products);
  return (
    <Div>
    
    </Div>
  );
}
