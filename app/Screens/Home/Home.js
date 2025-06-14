import React, { useState } from 'react'
import { Div, ScrollDiv, Text, Image, Button } from 'react-native-magnus'
import Custom_colors from '../../config/Custom_colors'
import Categories_Section from './parts/Categories/Categories_Section'
import Products from './parts/Products/Products'
import Bottom_Navbar from '../../Component/Bottom_Navbar/Bottom_Navbar'
import Header from '../../Component/Header/Header'
import Banner from './parts/Banner/Banner'
import Featured from './parts/Featured/Featured'
import { RefreshControl } from 'react-native'
import FloatBtn from '../../Component/FloatBtn/FloatBtn'

export default function Home() {
  const [headerBg, setHeaderBg] = useState('transparent');
  const [refreshing, setRefreshing] = useState(false);
  // Handler for scroll event
  const handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    setHeaderBg(y > 30 ? 'white' : 'transparent'); // adjust 30 to your liking
  };


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <Div flex={1} bg={Custom_colors.screen}>

      <Div position="absolute" top={0} left={0} w="100%" zIndex={10}>
        <Header logo={true} bg={headerBg} />
      </Div>

      <ScrollDiv
        bg={Custom_colors.screen}
        contentContainerStyle={{ paddingTop: 60 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        // contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }

      >
        <Div py={5}>
          <Banner />


          <Div flexDir='row' justifyContent='space-between' alignItems='center' px={5}>
            <Div bg="white" flex={1} mx={2} flexDir='column' justifyContent='center' alignItems='center' p={3}>
              <Text fontWeight='bold' fontSize={25}>15%</Text>
              <Text fontSize={10}>on Order 100+ AED</Text>
            </Div>
            <Div bg="white" flex={1} mx={2} flexDir='column' justifyContent='center' alignItems='center' p={3}>
              <Text fontWeight='bold' fontSize={25}>15%</Text>
              <Text fontSize={10}>on Order 100+ AED</Text>
            </Div>
            <Div bg="white" flex={1} mx={2} flexDir='column' justifyContent='center' alignItems='center' p={3}>
              <Text fontWeight='bold' fontSize={25}>15%</Text>
              <Text fontSize={10}>on Order 100+ AED</Text>
            </Div>
            <Text bg="orange600" h={25} p={4} color="white">Code : ACK</Text>
          </Div>


          <Featured />





          <Categories_Section />


          <Div
            my={20}
            w="98%"
            mx={5}
            alignSelf='center'
            h={160}
            rounded={18}
            overflow="hidden"
            shadow="xl"
            position="relative"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
              }}
              w="100%"
              h={160}
              position="absolute"
              top={0}
              left={0}
              style={{ opacity: 0.85 }}
            />
            <Div
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              bg="rgba(0,0,0,0.35)"
              alignItems="center"
              justifyContent="center"
              px={20}
            >
              <Text color="white" fontSize={22} fontWeight="bold" textAlign="center">
                Discover the Latest Vape Products!
              </Text>
              <Text color="white" fontSize={14} mt={6} mb={12} textAlign="center">
                Shop our new arrivals and exclusive deals.
              </Text>
              <Button
                bg="orange600"
                px={18}
                py={8}
                rounded="circle"
                shadow="md"
                onPress={() => navigation.navigate("Products")}
              >
                <Text color="white" fontWeight="bold" fontSize={15}>
                  Shop Now
                </Text>
              </Button>
            </Div>
          </Div>


<FloatBtn />
          <Products />
        </Div>
      </ScrollDiv>
      
      <Bottom_Navbar />
    </Div>
  )
}
