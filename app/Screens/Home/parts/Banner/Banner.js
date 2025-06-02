import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Div, Image } from "react-native-magnus";
import { DataContext } from "../../../../Context/DataProvider";
import Swiper from "react-native-swiper";

export default function Banner() {
  const [sliders, setsliders] = useState([]);
  const { settings } = useContext(DataContext);

  const fetchSliders = async () => {
    try {
      const response = await axios.get(`${settings.appurl}api/show/sliders`);
      setsliders(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, [sliders]);

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
