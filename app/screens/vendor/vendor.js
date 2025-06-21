
import { Div, Image, ScrollDiv, Text, Skeleton } from 'react-native-magnus'
import Header from '../../components/header/header'
import custom_colors from '../../config/custom_colors'
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { api_config } from '../../config/api_config';
import { useEffect, useState } from 'react';
import Product_card_item from '../../items/product_card_item';
import Bottom_Navbar from '../../components/bottom_navbar/bottom_navbar';

export default function Vendor() {
    const route = useRoute()
    const { vendorId } = route.params;
    const [vendorData, setVendorData] = useState(null);





    const fetch_all_vendor = async () => {
        try {
            const response = await axios.get(`${api_config.url}/api/vendors?populate[image]=true&populate[banner]=true&populate[products][populate]=images`, {
                headers: {
                    Authorization: `Bearer ${api_config.token}`,
                }
            })

            const vendors = response.data.data;
            const foundVendor = vendors.find((item) => item.id === vendorId);
            setVendorData(foundVendor);
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        fetch_all_vendor();
    }, [vendorId])

    return (
        <Div flex={1} bg={custom_colors.screen}>
            <Div pt={15} bg="white">
                <Header bg="transparent" />

            </Div>
            <ScrollDiv>



                {vendorData ? (
                    <>
                        <Image
                            h={200}
                            w="100%"

                            source={{
                                uri:
                                    `${vendorData?.banner?.formats?.thumbnail?.url}`,
                            }}
                        />




                        <Div flexDir='row' bg="white" my={6}>
                            <Div>
                                <Image
                                    h={80}
                                    w={80}
                                    rounded={'circle'}
                                    source={{
                                        uri:
                                            `${vendorData?.image?.formats?.thumbnail?.url}`,
                                    }}
                                />
                            </Div>
                            <Div flexDir='colum' justifyContent='center' alignItems='flex-start'>
                                <Text>{vendorData.vendor_name}</Text>
                                <Text>{vendorData.phone}</Text>
                                <Text>{vendorData.email}</Text>
                            </Div>
                        </Div>





                        <Div flexDir='row' flexWrap='wrap' justifyContent='space-between' alignItems='center'>
                            {vendorData && vendorData.products.map((product, index) => (
                                <Product_card_item product={product} key={index} />
                            ))}
                        </Div>

                    </>) : (
                    <Div>
                       <Div flexDir="row" mt={10}>
                        <Skeleton.Box h={100} w="100%" />
                        <Div ml="md" flex={1}>
                            <Skeleton.Box mt="sm" h={300} w="100%"  />
                            <Skeleton.Box  mt={10} h={20} w="80%" />
                            <Skeleton.Box mt={10} h={20} w="100%" />
                            <Skeleton.Box  mt={10} h={20} w="80%" />
                            <Skeleton.Box mt={10} h={20} w="100%" />
                            <Skeleton.Box  mt={10} h={20} w="80%" />
                            <Skeleton.Box mt={10} h={20} w="100%" />
                            <Skeleton.Box  mt={10} h={20} w="80%" />
                            <Skeleton.Box mt={10} h={20} w="100%" />
                            <Skeleton.Box  mt={10} h={20} w="80%" />
                            <Skeleton.Box mt={10} h={20} w="100%" />
                            <Skeleton.Box  mt={10} h={20} w="80%" />
                            <Skeleton.Box mt={10} h={20} w="100%" />
                            
                        </Div>
                    </Div> 
                    </Div>
                
                
                
                )}

            </ScrollDiv>
            <Bottom_Navbar />
        </Div>
    )
}