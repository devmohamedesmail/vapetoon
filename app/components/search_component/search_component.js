import React, { useContext, useState, useEffect } from 'react'
import { Input, Icon, Div } from "react-native-magnus";
import { Pressable, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DataContext } from '../../context/data_provider';
import { useNavigation } from '@react-navigation/native';
import custom_colors from '../../config/custom_colors';

export default function SearchComponent({ 
  placeholder = null, 
  gradient = false, 
  onSearch = null,
  autoFocus = false,
  style = {},
  variant = 'default', // 'default', 'header', 'modal'
  showBackground = true,
  size = 'medium' // 'small', 'medium', 'large'
}) {
    const { t, i18n } = useTranslation();
    const { products } = useContext(DataContext) || { products: [] };
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const navigation = useNavigation();
    const isArabic = i18n.language === 'ar';

    // Size configurations
    const sizeConfig = {
        small: { height: 36, fontSize: 14, iconSize: 16, padding: 12 },
        medium: { height: 44, fontSize: 16, iconSize: 18, padding: 16 },
        large: { height: 52, fontSize: 18, iconSize: 20, padding: 20 }
    };

    const currentSize = sizeConfig[size];

    const handleSearch = () => {
        if (searchText.trim().length > 0) {
            Keyboard.dismiss();
            
            // Filter products safely
            const filtered = Array.isArray(products) ? products.filter(
                (item) => {
                    const title = item?.title?.toLowerCase() || '';
                    const description = item?.description?.toLowerCase() || '';
                    const searchTerm = searchText.toLowerCase();
                    return title.includes(searchTerm) || description.includes(searchTerm);
                }
            ) : [];
            
            // Use custom onSearch callback if provided, otherwise navigate to Search screen
            if (onSearch && typeof onSearch === 'function') {
                onSearch(filtered, searchText);
            } else if (navigation) {
                try {
                    navigation.navigate('Search', { results: filtered, query: searchText });
                } catch (error) {
                    console.warn('Navigation to Search screen failed:', error);
                }
            }
        }
    };

    const handleClear = () => {
        setSearchText('');
        setIsFocused(true);
    };

    const searchPlaceholder = placeholder || t('search_products') || 'Search products...';

    // Variant-specific styling
    const getVariantStyle = () => {
        switch (variant) {
            case 'header':
                return {
                    bg: isFocused ? "white" : "rgba(255,255,255,0.9)",
                    borderColor: isFocused ? custom_colors.secondary : "rgba(255,255,255,0.5)",
                    borderWidth: 1,
                    shadow: isFocused ? "md" : "sm"
                };
            case 'modal':
                return {
                    bg: "gray50",
                    borderColor: isFocused ? custom_colors.secondary : "gray200",
                    borderWidth: 2,
                    shadow: "none"
                };
            default:
                return {
                    bg: gradient ? "rgba(255,255,255,0.15)" : (showBackground ? "white" : "transparent"),
                    borderColor: gradient ? "rgba(255,255,255,0.3)" : (isFocused ? custom_colors.secondary : "gray300"),
                    borderWidth: showBackground ? 1 : 0,
                    shadow: isFocused ? "md" : "sm"
                };
        }
    };

    const variantStyle = getVariantStyle();

    return (
        <Div style={style}>
            <Input
                flex={1}
                h={currentSize.height}
                {...variantStyle}
                rounded={currentSize.height / 2}
                placeholder={searchPlaceholder}
                placeholderTextColor={
                    gradient ? "rgba(255,255,255,0.7)" : 
                    variant === 'modal' ? "gray600" : "gray500"
                }
                color={
                    gradient ? "white" : 
                    variant === 'modal' ? "gray800" : "gray900"
                }
                fontSize={currentSize.fontSize}
                px={currentSize.padding}
                py={8}
                focusBorderColor={
                    gradient ? "rgba(255,255,255,0.8)" : custom_colors.secondary
                }
                autoFocus={autoFocus}
                textAlign={isArabic ? "right" : "left"}
                writingDirection={isArabic ? "rtl" : "ltr"}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                suffix={
                    <Div 
                        flexDir={isArabic ? "row-reverse" : "row"} 
                        alignItems="center"
                        mr={isArabic ? currentSize.padding - 8 : 0}
                        ml={isArabic ? 0 : currentSize.padding - 8}
                    >
                        {searchText.length > 0 && (
                            <Pressable 
                                onPress={handleClear} 
                                style={{ 
                                    marginRight: isArabic ? 0 : 8,
                                    marginLeft: isArabic ? 8 : 0,
                                    padding: 4,
                                    borderRadius: 12
                                }}
                                android_ripple={{ color: 'rgba(0,0,0,0.1)', radius: 12 }}
                            >
                                <Icon 
                                    name="x" 
                                    color={
                                        gradient ? "rgba(255,255,255,0.8)" : 
                                        variant === 'modal' ? "gray600" : "gray500"
                                    } 
                                    fontFamily="Feather" 
                                    fontSize={currentSize.iconSize}
                                />
                            </Pressable>
                        )}
                        <Pressable 
                            onPress={handleSearch}
                            style={{ 
                                padding: 4,
                                borderRadius: 12,
                                backgroundColor: isFocused ? 'rgba(0,0,0,0.05)' : 'transparent'
                            }}
                            android_ripple={{ color: 'rgba(0,0,0,0.1)', radius: 12 }}
                        >
                            <Icon 
                                name="search" 
                                color={
                                    gradient ? "rgba(255,255,255,0.9)" : 
                                    variant === 'modal' ? custom_colors.secondary : 
                                    isFocused ? custom_colors.secondary : "gray700"
                                } 
                                fontFamily="Feather" 
                                fontSize={currentSize.iconSize}
                            />
                        </Pressable>
                    </Div>
                }
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                clearButtonMode="never" // We handle clear manually
                enablesReturnKeyAutomatically={true}
            />
        </Div>
    )
}
