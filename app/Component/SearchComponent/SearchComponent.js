import React, { useContext,useState } from 'react'
import { Input, Icon } from "react-native-magnus";
import Custom_colors from '../../config/Custom_colors';
import { useTranslation } from 'react-i18next';
import { DataContext } from '../../Context/DataProvider';
import { useNavigation } from '@react-navigation/native';

export default function SearchComponent() {
    const { t } = useTranslation();
    const { products } = useContext(DataContext)
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();


    
    const handleSearch = () => {
        if (searchText.trim().length > 0) {
            const filtered = products.filter(
                (item) =>
                    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchText.toLowerCase())
            );
            navigation.navigate('Search', { results: filtered, query: searchText });
        }
    };


    
    return (
        <Input
            flex={1}
            h={40}
            bg="white"
            borderColor="gray300"
            borderWidth={1}
            rounded={29}
            placeholder={t('search')}
            p={10}
            focusBorderColor={Custom_colors.primary}
            suffix={<Icon name="search" color="gray900" fontFamily="Feather" />}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
        />
    )
}
