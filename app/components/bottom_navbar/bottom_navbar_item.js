import React from "react";
import { Button, Div, Text } from "react-native-magnus";
import custom_colors from "../../config/custom_colors";

export default function Bottom_Navbar_item({ icon, title, onPress, counter }) {
  return (
    <Div position="relative">
      <Button onPress={onPress} bg="transparent">
        <Div flexDir="column" justifyContent="center" alignItems="center">
          {icon}
          <Text fontSize={10}>{title}</Text>
        </Div>
      </Button>
      {counter && counter > 0 ? (
        <Div
          position="absolute"
          top={-5}
          right={9}
          bg={custom_colors.primary}
          w={20}
          h={20}
          rounded="circle"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize={10} color="white">
            {counter}
          </Text>
        </Div>
      ) : (
        <></>
      )}
    </Div>
  );
}
