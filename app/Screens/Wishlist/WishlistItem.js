import React from "react";
import { Button, Div, Image, Text } from "react-native-magnus";
import Feather from "@expo/vector-icons/Feather";
import Custom_colors from "../../config/Custom_colors";
import { useTranslation } from "react-i18next";
import { api_config } from "../../config/api_config";

export default function WishlistItem({ image, name,price, onPress, showDetails }) {
  const {t,i18n} = useTranslation();
  return (
    <Div flexDir="row" bg="white" borderColor="gray300" borderWidth={1} p={5} rounded='md' overflow="hidden" my={3}>
      <Button p={0} onPress={showDetails} bg="transparent">
        <Image
          h={80}
          w={80}
          rounded="md"
          source={{
            uri: `${image}`,
          }}
        />
      </Button>
      <Div  flex={1}>
        <Text mx={5} overflow="hidden" flex={1} color={Custom_colors.primary}>
          {name}
        </Text>
        <Text mx={5} overflow="hidden" flex={1}>
          {price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
        </Text>
        <Div flexDir="row" justifyContent="flex-end" flex={1} >
          <Button bg="white" onPress={onPress} p={5}>
            <Feather name="trash" size={20} color="red" />
          </Button>
        </Div>
      </Div>
    </Div>
  );
}
