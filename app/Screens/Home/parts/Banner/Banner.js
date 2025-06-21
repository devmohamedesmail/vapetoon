import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Div, Image } from "react-native-magnus";
import { DataContext } from "../../../../context/data_provider";
import { api_config } from "../../../../config/api_config";
import Swiper from "react-native-swiper";

export default function Banner() {



  return (
    <Div h={250} mb={10} overflow="hidden" mt={-70}>
      <Swiper autoplay={true} showsPagination={true}>
        <Image
          source={require('../../../../../assets/images/banner1.webp')}
          h={250}
          w="100%"
          resizeMode="cover"
        />
        <Image
          source={require('../../../../../assets/images/banner1.webp')}
          h={250}
          w="100%"
          resizeMode="cover"
        />
        <Image
          source={require('../../../../../assets/images/banner1.webp')}
          h={250}
          w="100%"
          resizeMode="cover"
        />
      </Swiper>
    </Div>
  );
}
