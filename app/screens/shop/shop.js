import React, { useEffect, useState, useRef } from 'react'
import { StatusBar, Animated, Dimensions, Pressable, ScrollView, RefreshControl } from 'react-native'
import { Div, Image, Text, Button, Input } from 'react-native-magnus'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import Product_card_item from '../../items/product_card_item'
import Bottom_Navbar from '../../components/bottom_navbar/bottom_navbar'
import Spinner_Loading from '../../components/spinner_loading/spinner_loading'
import SearchComponent from '../../components/search_component/search_component'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export default function Shop({ route }) {
  const { t, i18n } = useTranslation()
  const navigation = useNavigation()
  const category = route?.params?.category
  
  const [products, setProducts] = useState(null)
  const [filteredProducts, setFilteredProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name') // name, price, rating
  const [filterOpen, setFilterOpen] = useState(false)
  const [error, setError] = useState(null)
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current
  const headerOpacity = useRef(new Animated.Value(0)).current
  const scrollY = useRef(new Animated.Value(0)).current

  const fetch_products = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)

      let url = `${process.env.EXPO_PUBLIC_APP_URL}/products?populate=images`
      
      if (category?.id) {
        url = `${process.env.EXPO_PUBLIC_APP_URL}/products?filters[category][id][$eq]=${category.id}&populate=images`
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_TOKEN_SECRET}`,
        },
      })

      setProducts(response.data.data)
      setFilteredProducts(response.data.data)
      
      // Animate content entrance
      if (!showRefreshIndicator) {
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
      
    } catch (error) {
      console.log('Shop fetch error:', error)
      setError(t('failed_to_load_products') || 'Failed to load products')
      Toast.show({
        type: 'error',
        text1: t('error') || 'Error',
        text2: t('failed_to_load_products') || 'Failed to load products',
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (!products) return

    if (!query.trim()) {
      setFilteredProducts(products)
      return
    }

    const filtered = products.filter(product =>
      product.name?.toLowerCase().includes(query.toLowerCase()) ||
      product.description?.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredProducts(filtered)
  }

  const handleSort = (sortType) => {
    setSortBy(sortType)
    if (!filteredProducts) return

    const sorted = [...filteredProducts].sort((a, b) => {
      switch (sortType) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '')
        case 'price':
          return (a.price || 0) - (b.price || 0)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })
    setFilteredProducts(sorted)
  }

  const onRefresh = () => {
    fetch_products(true)
  }

  // Header animation based on scroll
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      listener: (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.y
        const threshold = 100
        
        if (scrollPosition > threshold) {
          Animated.timing(headerOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start()
        } else {
          Animated.timing(headerOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start()
        }
      },
      useNativeDriver: false,
    }
  )

  useEffect(() => {
    fetch_products()
  }, [category])

  const sortOptions = [
    { key: 'name', label: t('sort_by_name') || 'Name', icon: 'sort-by-alpha' },
    { key: 'price', label: t('sort_by_price') || 'Price', icon: 'attach-money' },
    { key: 'rating', label: t('sort_by_rating') || 'Rating', icon: 'star' },
  ]

  if (loading) {
    return (
      <Div flex={1} bg="#f8f9fa">
        <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
        <Spinner_Loading 
          size="large" 
          variant="primary" 
          text={t('loading_products') || 'Loading products...'}
        />
      </Div>
    )
  }










  return (
    <Div flex={1} bg="#f8f9fa">
      <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
      
      {/* Animated Header */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 90,
          paddingTop: 40,
          paddingHorizontal: 20,
          opacity: headerOpacity,
          transform: [{
            translateY: headerOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-50, 0],
            }),
          }],
        }}
      >
        <LinearGradient
          colors={['#1f2937', '#374151']}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            borderRadius: 12,
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          
          <Text fontSize={18} fontWeight="600" color="white" numberOfLines={1}>
            {category?.title || t('all_products') || 'All Products'}
          </Text>
          
          <Pressable onPress={() => setFilterOpen(!filterOpen)}>
            <MaterialIcons name="tune" size={24} color="white" />
          </Pressable>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        style={{ flex: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Hero Section */}
        {category?.image?.url && (
          <Div position="relative" h={220}>
            <Image
              source={{ 
                uri: category.image?.formats?.large?.url || 
                     category.image?.formats?.medium?.url || 
                     category.image?.url 
              }}
              w="100%"
              h={220}
              resizeMode="cover"
            />
            
            {/* Gradient Overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 120,
              }}
            />

            {/* Back Button */}
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                position: 'absolute',
                top: 40,
                left: 20,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>

            {/* Category Title */}
            <Div position="absolute" bottom={20} left={20} right={20}>
              <Text fontSize={28} fontWeight="700" color="white" mb={8}>
                {category.title}
              </Text>
              <Text fontSize={14} color="rgba(255,255,255,0.8)">
                {t('discover_products') || 'Discover amazing products'} • {filteredProducts?.length || 0} {t('items') || 'items'}
              </Text>
            </Div>
          </Div>
        )}

        {/* Search and Filter Section */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingHorizontal: 20,
            paddingTop: category?.image?.url ? 20 : 60,
            paddingBottom: 16,
          }}
        >
          {/* Page Title (when no category image) */}
          {!category?.image?.url && (
            <Div mb={20}>
              <Text fontSize={28} fontWeight="700" color="#1f2937" mb={8}>
                {category?.title || t('all_products') || 'All Products'}
              </Text>
              <Text fontSize={16} color="#6b7280">
                {t('discover_products') || 'Discover amazing products'} • {filteredProducts?.length || 0} {t('items') || 'items'}
              </Text>
            </Div>
          )}

          {/* Search Bar */}
          <SearchComponent
            placeholder={t('search_products') || 'Search products...'}
            value={searchQuery}
            onChangeText={handleSearch}
            variant="outlined"
            size="medium"
            showSearchIcon={true}
          />
        </Animated.View>

        {/* Sort and Filter Bar */}
        <Div mx={20} mb={20}>
          <Div flexDir="row" alignItems="center" justifyContent="space-between" mb={16}>
            <Text fontSize={18} fontWeight="600" color="#1f2937">
              {filteredProducts?.length || 0} {t('products_found') || 'Products'}
            </Text>
            
            <Pressable
              onPress={() => setFilterOpen(!filterOpen)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor: filterOpen ? '#2563eb' : '#f8f9fa',
                borderWidth: 1,
                borderColor: filterOpen ? '#2563eb' : '#e5e7eb',
              }}
            >
              <MaterialIcons 
                name="tune" 
                size={16} 
                color={filterOpen ? 'white' : '#6b7280'} 
              />
              <Text 
                fontSize={12} 
                fontWeight="600" 
                color={filterOpen ? 'white' : '#6b7280'} 
                ml={6}
              >
                {t('filter') || 'Filter'}
              </Text>
            </Pressable>
          </Div>

          {/* Sort Options */}
          {filterOpen && (
            <Animated.View
              style={{
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: '#e5e7eb',
              }}
            >
              <Text fontSize={14} fontWeight="600" color="#1f2937" mb={12}>
                {t('sort_by') || 'Sort by'}
              </Text>
              
              <Div flexDir="row" flexWrap="wrap">
                {sortOptions.map((option) => (
                  <Pressable
                    key={option.key}
                    onPress={() => handleSort(option.key)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: sortBy === option.key ? '#2563eb' : '#f8f9fa',
                      marginRight: 8,
                      marginBottom: 8,
                      borderWidth: 1,
                      borderColor: sortBy === option.key ? '#2563eb' : '#e5e7eb',
                    }}
                  >
                    <MaterialIcons 
                      name={option.icon} 
                      size={14} 
                      color={sortBy === option.key ? 'white' : '#6b7280'} 
                    />
                    <Text 
                      fontSize={12} 
                      fontWeight="600" 
                      color={sortBy === option.key ? 'white' : '#6b7280'} 
                      ml={6}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                ))}
              </Div>
            </Animated.View>
          )}
        </Div>

        {/* Products Section */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingHorizontal: 20,
            paddingBottom: 100,
          }}
        >
          {error ? (
            <Div alignItems="center" py={60}>
              <MaterialIcons name="error-outline" size={48} color="#ef4444" />
              <Text fontSize={16} color="#ef4444" mt={12} textAlign="center">
                {error}
              </Text>
              <Button
                bg="#2563eb"
                h={40}
                px={20}
                rounded={10}
                mt={16}
                onPress={() => fetch_products()}
              >
                <Text color="white" fontSize={14} fontWeight="600">
                  {t('try_again') || 'Try Again'}
                </Text>
              </Button>
            </Div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <Div flexDir="row" flexWrap="wrap" justifyContent="space-between">
              {filteredProducts.map((product, index) => (
                <Product_card_item 
                  key={product.id || index} 
                  product={product} 
                  index={index}
                />
              ))}
            </Div>
          ) : (
            <Div alignItems="center" py={60}>
              <MaterialIcons name="inventory-2" size={48} color="#9ca3af" />
              <Text fontSize={18} fontWeight="600" color="#1f2937" mt={12} textAlign="center">
                {searchQuery ? 
                  (t('no_search_results') || 'No products found') : 
                  (t('no_products_available') || 'No products available')
                }
              </Text>
              <Text fontSize={14} color="#6b7280" mt={4} textAlign="center">
                {searchQuery ? 
                  (t('try_different_search') || 'Try searching with different keywords') : 
                  (t('check_back_later') || 'Check back later for new products')
                }
              </Text>
              {searchQuery && (
                <Button
                  bg="transparent"
                  borderWidth={1}
                  borderColor="#e5e7eb"
                  h={40}
                  px={20}
                  rounded={10}
                  mt={16}
                  onPress={() => handleSearch('')}
                >
                  <Text color="#6b7280" fontSize={14} fontWeight="600">
                    {t('clear_search') || 'Clear Search'}
                  </Text>
                </Button>
              )}
            </Div>
          )}
        </Animated.View>
      </Animated.ScrollView>

      <Bottom_Navbar />
    </Div>
  )
}
