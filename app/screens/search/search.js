
import React, { useState } from 'react'
import { Div, ScrollDiv, Text, Image, Input, Button } from 'react-native-magnus'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import Header from '../../components/header/header'
import custom_colors from '../../config/custom_colors';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native';
import Search_item from '../../items/search_item';
import { useTranslation } from 'react-i18next';

export default function Search() {
    const route = useRoute()
    const navigation = useNavigation()
    const { results, query } = route.params;
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const [searchText, setSearchText] = useState(query || '');

    const handleNewSearch = () => {
        if (searchText.trim()) {
            // Navigate to new search or trigger search function
            navigation.setParams({ query: searchText, results: [] });
        }
    };

    const renderEmptyState = () => (
        <Div alignItems="center" justifyContent="center" py={60} px={20}>
            <Div
                w={120}
                h={120}
                rounded="circle"
                bg="#f8fafc"
                alignItems="center"
                justifyContent="center"
                mb={24}
                borderWidth={3}
                borderColor="#e2e8f0"
            >
                <Ionicons name="search-outline" size={50} color="#94a3b8" />
            </Div>
            <Text
                fontSize={20}
                fontWeight="600"
                color="#1f2937"
                textAlign="center"
                mb={8}
            >
                {t('no_results')}
            </Text>
            <Text
                fontSize={14}
                color="#6b7280"
                textAlign="center"
                lineHeight={22}
                maxW="80%"
            >
                {t('try_different_keywords')}
            </Text>
        </Div>
    );

    const renderLoadingSkeleton = () => (
        <Div px={16}>
            {[1, 2, 3, 4, 5].map((item) => (
                <Div
                    key={item}
                    bg="white"
                    rounded={12}
                    p={16}
                    mb={12}
                    shadow="sm"
                    flexDir="row"
                >
                    <Div
                        w={80}
                        h={80}
                        bg="#f1f5f9"
                        rounded={8}
                        mr={12}
                    />
                    <Div flex={1}>
                        <Div h={16} bg="#f1f5f9" rounded={4} mb={8} w="70%" />
                        <Div h={12} bg="#f1f5f9" rounded={4} mb={8} w="50%" />
                        <Div h={12} bg="#f1f5f9" rounded={4} w="40%" />
                    </Div>
                </Div>
            ))}
        </Div>
    );

    return (
        <Div flex={1} bg="#f8fafc">
            {/* Header with Gradient Background */}
            <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ paddingTop: 50, paddingBottom: 20 }}
            >
                <Header bg="transparent" />
                
                {/* Search Results Header */}
                <Div px={16} mt={16}>
                    <Text
                        color="white"
                        fontSize={24}
                        fontWeight="700"
                        mb={8}
                        textAlign={isArabic ? "right" : "left"}
                    >
                        {t('search_results')}
                    </Text>
                    {query && (
                        <Div
                            flexDir={isArabic ? "row-reverse" : "row"}
                            alignItems="center"
                            mb={16}
                        >
                            <Text color="rgba(255,255,255,0.8)" fontSize={14}>
                                {t('showing_results_for')}:
                            </Text>
                            <Text
                                color="white"
                                fontSize={14}
                                fontWeight="600"
                                ml={isArabic ? 0 : 6}
                                mr={isArabic ? 6 : 0}
                            >
                                "{query}"
                            </Text>
                        </Div>
                    )}
                    
                    {/* Results Count */}
                    {results && results.length > 0 && (
                        <Div
                            bg="rgba(255,255,255,0.2)"
                            px={12}
                            py={6}
                            rounded={20}
                            alignSelf={isArabic ? "flex-end" : "flex-start"}
                        >
                            <Text color="white" fontSize={12} fontWeight="500">
                                {results.length} {results.length === 1 ? t('result') : t('results')} {t('found')}
                            </Text>
                        </Div>
                    )}
                </Div>
                
                {/* Enhanced Search Input */}
                <Div px={16} mt={16}>
                    <Div
                        bg="white"
                        rounded={12}
                        p={4}
                        flexDir={isArabic ? "row-reverse" : "row"}
                        alignItems="center"
                        shadow="lg"
                    >
                        <Input
                            flex={1}
                            placeholder={t('search_products')}
                            value={searchText}
                            onChangeText={setSearchText}
                            fontSize={16}
                            borderWidth={0}
                            bg="transparent"
                            textAlign={isArabic ? "right" : "left"}
                            onSubmitEditing={handleNewSearch}
                        />
                        <TouchableOpacity onPress={handleNewSearch}>
                            <Div
                                bg="#667eea"
                                w={40}
                                h={40}
                                rounded="circle"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Ionicons 
                                    name="search" 
                                    size={20} 
                                    color="white" 
                                />
                            </Div>
                        </TouchableOpacity>
                    </Div>
                </Div>
            </LinearGradient>

            {/* Results Content */}
            <ScrollDiv flex={1} contentContainerStyle={{ paddingBottom: 20 }}>
                {results ? (
                    results && results.length > 0 ? (
                        <Div px={16} pt={20}>
                            {/* Filter/Sort Options */}
                            <Div
                                flexDir={isArabic ? "row-reverse" : "row"}
                                justifyContent="space-between"
                                alignItems="center"
                                mb={16}
                            >
                                <Text
                                    fontSize={16}
                                    fontWeight="600"
                                    color="#374151"
                                >
                                    {t('all_results')}
                                </Text>
                                <Div flexDir={isArabic ? "row-reverse" : "row"} alignItems="center">
                                    <TouchableOpacity>
                                        <Div
                                            flexDir={isArabic ? "row-reverse" : "row"}
                                            alignItems="center"
                                            bg="white"
                                            px={12}
                                            py={8}
                                            rounded={8}
                                            shadow="sm"
                                            mr={isArabic ? 0 : 8}
                                            ml={isArabic ? 8 : 0}
                                        >
                                            <Ionicons name="filter" size={16} color="#6b7280" />
                                            <Text 
                                                fontSize={12} 
                                                color="#6b7280" 
                                                ml={isArabic ? 0 : 4}
                                                mr={isArabic ? 4 : 0}
                                            >
                                                {t('filter')}
                                            </Text>
                                        </Div>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Div
                                            flexDir={isArabic ? "row-reverse" : "row"}
                                            alignItems="center"
                                            bg="white"
                                            px={12}
                                            py={8}
                                            rounded={8}
                                            shadow="sm"
                                        >
                                            <Ionicons name="swap-vertical" size={16} color="#6b7280" />
                                            <Text 
                                                fontSize={12} 
                                                color="#6b7280" 
                                                ml={isArabic ? 0 : 4}
                                                mr={isArabic ? 4 : 0}
                                            >
                                                {t('sort')}
                                            </Text>
                                        </Div>
                                    </TouchableOpacity>
                                </Div>
                            </Div>
                            
                            {/* Search Results */}
                            {results.map((item, index) => (
                                <Search_item item={item} key={index} />
                            ))}
                        </Div>
                    ) : (
                        renderEmptyState()
                    )
                ) : (
                    renderLoadingSkeleton()
                )}
            </ScrollDiv>
        </Div>
    )
}