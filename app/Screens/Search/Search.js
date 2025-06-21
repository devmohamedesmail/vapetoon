
import React from 'react'
import { Div, ScrollDiv, Text, Image } from 'react-native-magnus'
import Header from '../../components/header/header'
import custom_colors from '../../config/custom_colors';
import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';
import Swiper from 'react-native-swiper'
import Search_item from '../../items/search_item';
import { useTranslation } from 'react-i18next';

export default function Search() {
    const route = useRoute()
    const { results, query } = route.params;
    const {t}=useTranslation();

    return (
        <Div flex={1} bg={custom_colors.screen}>



            <Div pt={15} bg="white">
                <Header bg="transparent" />

            </Div>
            <Text>{query}</Text>




            <ScrollDiv>

                {results ? (

                    <>
                        {results && results.length > 0 ? (
                            <>
                                {results.map((item, index) => (
                                    <Search_item item={item} key={index} />
                                ))}


                            </>) : (<Text textAlign='center'>{t('no_results')}</Text>)}


                    </>) : (

                    <Div>
                        <Div flexDir="row" mt="md">
                        
                            <Div ml="md" flex={1}>
                                <Skeleton.Box mt="sm" />
                                <Skeleton.Box mt="sm" w="80%" />
                                <Skeleton.Box mt="sm" />
                            </Div>
                        </Div>
                    </Div>



                )}






            </ScrollDiv>



        </Div>
    )
}