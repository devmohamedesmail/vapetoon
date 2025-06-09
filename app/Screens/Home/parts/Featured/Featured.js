import { useContext, useMemo } from 'react';
import { Button, Div, Image, Text, Skeleton } from 'react-native-magnus'
import Swiper from 'react-native-swiper'
import { DataContext } from '../../../../Context/DataProvider';
import { useNavigation } from '@react-navigation/native';

export default function Featured() {
  const { products } = useContext(DataContext);
  const navigation = useNavigation();

  // Memoize filtering for performance
  const featuredProducts = useMemo(() => {
    if (!products) return null;
    return products.filter(p => p.isFeatured);
  }, [products]);

  // Group featured products into slides of 3
  const slides = useMemo(() => {
    if (!featuredProducts) return [];
    const arr = [];
    for (let i = 0; i < featuredProducts.length; i += 3) {
      arr.push(featuredProducts.slice(i, i + 3));
    }
    return arr;
  }, [featuredProducts]);

  // Show skeleton while products are loading
  if (products === null) {
    return (
      <Div my={10} bg="white" p={10}>
        <Skeleton.Box h={20} w={120} mb={15} />
        <Div flexDir="row" justifyContent="space-between">
          {[1, 2, 3].map(i => (
            <Div key={i} w="32%" alignItems="center">
              <Skeleton.Box h={90} w={100} mb={10} />
              <Skeleton.Box h={15} w={80} />
            </Div>
          ))}
        </Div>
      </Div>
    );
  }

  // If no featured products, render nothing
  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <Div my={10} bg="white">
      <Swiper
        showsButtons={true}
        style={{ height: 180 }}
        dotColor="white"
        autoplay={true}
        activeDotColor="#ff6b35"
        nextButton={<Text style={{ color: 'black', fontSize: 18, padding: 4 }}>›</Text>}
        prevButton={<Text style={{ color: 'black', fontSize: 18, padding: 4 }}>‹</Text>}
      >
        {slides.map((group, idx) => (
          <Div key={idx} flexDir="row" justifyContent="space-between" px={10}>
            {group.map(product => (
              <Button
                bg="white"
                onPress={() => navigation.navigate("Details", { productId: product.id })}
                key={product.id}
                w="32%"
                alignItems="center"
              >
                <Div>
                  <Image
                    source={{ uri: product.images[0].formats.thumbnail.url }}
                    h="50%"
                    w={100}
                    resizeMode="cover"
                    rounded="md"
                  />
                  <Text mt={5} fontSize={12} textAlign="center">{product.title}</Text>
                </Div>
              </Button>
            ))}
            {/* Fill empty spaces if less than 3 products in last slide */}
            {group.length < 3 &&
              Array.from({ length: 3 - group.length }).map((_, i) => (
                <Div key={i} w="32%" />
              ))
            }
          </Div>
        ))}
      </Swiper>
    </Div>
  );
}