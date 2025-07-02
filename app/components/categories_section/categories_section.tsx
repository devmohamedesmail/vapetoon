import React, { useContext, useRef, useEffect } from 'react'
import { Animated, Pressable, Dimensions } from 'react-native'
import { Div, Text, ScrollDiv } from 'react-native-magnus'
import { MaterialIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { DataContext } from '../../context/data_provider'
import Category_item from '../../items/category_item'

const { width: screenWidth } = Dimensions.get('window')

export default function Categories_Section() {
    const { t } = useTranslation()
    const navigation = useNavigation<any>()
    const { categories } = useContext(DataContext)
    
    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(30)).current
    const buttonScaleAnim = useRef(new Animated.Value(1)).current

    useEffect(() => {
        if (categories && categories.length > 0) {
            // Animate section entrance
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    tension: 80,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]).start()
        }
    }, [categories])

    const handleCategoryPress = (category: any) => {
        navigation.navigate('Shop', { category })
    }

    const handleViewAllPress = () => {
        // Animate button press
        Animated.sequence([
            Animated.timing(buttonScaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScaleAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Navigate to categories page or show all categories
            navigation.navigate('Categories')
        })
    }

    if (!categories || categories.length === 0) {
        return null
    }

    // Show max 8 categories in grid
    const displayCategories = categories.slice(0, 8)

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
            }}
        >
            <Div bg="white" pt={24} pb={20} px={20}>
                {/* Section Header */}
                <Div flexDir="row" alignItems="center" justifyContent="space-between" mb={24}>
                    <Div flexDir="row" alignItems="center" flex={1}>
                        <Div 
                            w={48} 
                            h={48} 
                            rounded="circle" 
                            bg="rgba(99, 102, 241, 0.1)" 
                            alignItems="center" 
                            justifyContent="center" 
                            mr={16}
                        >
                            <MaterialIcons name="category" size={24} color="#6366f1" />
                        </Div>
                        <Div flex={1}>
                            <Text fontSize={22} fontWeight="700" color="#111827" mb={2}>
                                {t('shop_categories')}
                            </Text>
                            <Text fontSize={14} color="#6b7280" lineHeight={18}>
                                {t('browse_by_category')}
                            </Text>
                        </Div>
                    </Div>
                    
                    {/* Categories Count Badge */}
                    <Div
                        bg="#f3f4f6"
                        px={12}
                        py={8}
                        rounded={12}
                        borderWidth={1}
                        borderColor="#e5e7eb"
                    >
                        <Text fontSize={13} fontWeight="600" color="#374151">
                            {categories.length}
                        </Text>
                    </Div>
                </Div>

                {/* Categories Grid */}
                <Div 
                    flexDir="row" 
                    flexWrap="wrap" 
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    {displayCategories.map((category: any, index: number) => (
                        <Category_item
                            key={category.id || index}
                            name={category.title || category.name}
                            image={
                                category.image?.formats?.thumbnail?.url ||
                                category.image?.formats?.small?.url ||
                                category.image?.url ||
                                category.logo?.formats?.thumbnail?.url ||
                                category.logo?.url
                            }
                            onPress={() => handleCategoryPress(category)}
                            index={index}
                        />
                    ))}
                </Div>

                {/* View All Categories Button */}
                {categories.length > 8 && (
                    <Div alignItems="center" mt={24}>
                        <Pressable onPress={handleViewAllPress}>
                            <Animated.View
                                style={{
                                    transform: [{ scale: buttonScaleAnim }],
                                }}
                            >
                                <Div
                                    bg="#6366f1"
                                    px={24}
                                    py={14}
                                    rounded={16}
                                    flexDir="row"
                                    alignItems="center"
                                    shadow="sm"
                                    style={{
                                        shadowColor: '#6366f1',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.15,
                                        shadowRadius: 12,
                                        elevation: 8,
                                    }}
                                >
                                    <MaterialIcons name="apps" size={18} color="white" />
                                    <Text fontSize={15} fontWeight="600" color="white" mx={8}>
                                        {t('view_all_categories')}
                                    </Text>
                                    <MaterialIcons name="arrow-forward" size={18} color="white" />
                                </Div>
                            </Animated.View>
                        </Pressable>
                    </Div>
                )}
            </Div>

            {/* Decorative Bottom Separator */}
            <Div 
                h={8} 
                bg="#f8fafc"
            />
        </Animated.View>
    )
}
