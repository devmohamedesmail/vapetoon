import { FlatList } from 'react-native';
import Swiper from 'react-native-swiper'
import { Div, Image, Text } from 'react-native-magnus';
import { api_config } from '../config/api_config';
import { i18n } from 'i18next';
import { useTranslation } from 'react-i18next';

export default function Search_item({ item }) {
    const { t, i18n } = useTranslation()
    return (
        <Div bg="white" px={10} py={5} my={3} flexDir='row'>
            <Swiper showsButtons={true} style={{ height: 100, width: 100 , backgroundColor:"red" }} >
                {item.images && item.images.map((image, index) => (
                    <Image
                        key={index}
                        h={100}
                        w="100%"
                        rounded="md"
                        source={{
                            uri: `${image?.formats?.thumbnail?.url}`,
                        }}
                    />
                ))}


            </Swiper>


            <Div mx={5}>
                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                <Text>{item.description}</Text>
                <Div>
                    {item.sale ? (
                        <Div flexDir='row'>
                            <Text textDecorLine='line-through' color='red'>{item.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en} </Text>
                            <Text style={{ fontWeight: 'bold' }}>{item.sale} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}</Text>
                        </Div>
                    ) : (<Text>{item.price} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}</Text>)}

                </Div>
            </Div>
        </Div>
    )
}