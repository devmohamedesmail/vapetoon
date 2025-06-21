import React, { useContext, useState } from 'react'
import { Input, Icon, Div } from "react-native-magnus";
import { Pressable } from 'react-native';
import custom_colors from '../../config/custom_colors';
import { useTranslation } from 'react-i18next';
import { DataContext } from '../../context/data_provider';
import { useNavigation } from '@react-navigation/native';

export default function SearchComponent({ 
  placeholder = null, 
  gradient = false, 
  onSearch = null,
  autoFocus = false,
  style = {}
}) {
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
            
            // Use custom onSearch callback if provided, otherwise navigate to Search screen
            if (onSearch) {
                onSearch(filtered, searchText);
            } else {
                navigation.navigate('Search', { results: filtered, query: searchText });
            }
        }
    };

    const handleClear = () => {
        setSearchText('');
    };

    const searchPlaceholder = placeholder || t('search') || 'Search products...';

    return (
        <Div style={style}>
            <Input
                flex={1}
                h={44}
                bg={gradient ? "rgba(255,255,255,0.15)" : "white"}
                borderColor={gradient ? "rgba(255,255,255,0.3)" : "gray300"}
                borderWidth={1}
                rounded={22}
                placeholder={searchPlaceholder}
                placeholderTextColor={gradient ? "rgba(255,255,255,0.7)" : "gray500"}
                color={gradient ? "white" : "gray900"}
                px={16}
                py={8}
                focusBorderColor={gradient ? "rgba(255,255,255,0.5)" : custom_colors.secondary}
                autoFocus={autoFocus}
                suffix={
                    <Div flexDir="row" alignItems="center">
                        {searchText.length > 0 && (
                            <Pressable onPress={handleClear} style={{ marginRight: 8 }}>
                                <Icon 
                                    name="x" 
                                    color={gradient ? "rgba(255,255,255,0.7)" : "gray500"} 
                                    fontFamily="Feather" 
                                    fontSize={18}
                                />
                            </Pressable>
                        )}
                        <Pressable onPress={handleSearch}>
                            <Icon 
                                name="search" 
                                color={gradient ? "rgba(255,255,255,0.9)" : "gray700"} 
                                fontFamily="Feather" 
                                fontSize={20}
                            />
                        </Pressable>
                    </Div>
                }
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
            />
        </Div>
    )
}
