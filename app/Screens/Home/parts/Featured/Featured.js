
import { useContext } from 'react';
import { Button, Div, Image, Text } from 'react-native-magnus'
import Swiper from 'react-native-swiper'
import { DataContext } from '../../../../Context/DataProvider';
import { useNavigation } from '@react-navigation/native';

export default function Featured() {

  const {products} = useContext(DataContext);
   const navigation = useNavigation();


 // Filter products where isFeatured is true
  const featuredProducts = products
    ? products.filter(p => p.isFeatured)
    : [];

  // Group featured products into slides of 3
  const slides = [];
  for (let i = 0; i < featuredProducts.length; i += 3) {
    slides.push(featuredProducts.slice(i, i + 3));
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
                            <Button bg="white" onPress={() => navigation.navigate("Details", { productId: product.id })} key={product.id} w="32%" alignItems="center">
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
    )
}