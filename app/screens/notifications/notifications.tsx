import React, { useRef, useEffect, useState } from 'react'
import { Animated, ScrollView, Pressable, Platform, StatusBar, FlatList } from 'react-native'
import { Div, Text, Button } from 'react-native-magnus'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons'

interface NotificationItem {
  id: string
  type: 'order' | 'promotion' | 'system' | 'delivery' | 'wishlist'
  title: string
  message: string
  time: string
  isRead: boolean
  isImportant: boolean
  actionUrl?: string
  icon: string
  color: string
}

interface NotificationFilter {
  id: string
  label: string
  type: string | null
  icon: string
  color: string
}

export default function Notifications() {
  const { t, i18n } = useTranslation()
  const navigation = useNavigation<any>()
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [refreshing, setRefreshing] = useState(false)
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current

  useEffect(() => {
    // Load mock notifications
    loadNotifications()
    
    // Entrance animation
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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  // Mock notification data
  const loadNotifications = () => {
    const mockNotifications: NotificationItem[] = [
      {
        id: '1',
        type: 'order',
        title: t('order_confirmed') || 'Order Confirmed',
        message: t('order_confirmed_message') || 'Your order #12345 has been confirmed and is being processed.',
        time: '2 min ago',
        isRead: false,
        isImportant: true,
        icon: 'receipt-outline',
        color: '#10b981'
      },
      {
        id: '2',
        type: 'delivery',
        title: t('order_shipped') || 'Order Shipped',
        message: t('order_shipped_message') || 'Your order is on its way! Track your package for updates.',
        time: '1 hour ago',
        isRead: false,
        isImportant: true,
        icon: 'car-outline',
        color: '#3b82f6'
      },
      {
        id: '3',
        type: 'promotion',
        title: t('special_offer') || 'Special Offer',
        message: t('special_offer_message') || '🎉 Get 20% off on your next purchase! Limited time offer.',
        time: '3 hours ago',
        isRead: true,
        isImportant: false,
        icon: 'gift-outline',
        color: '#f59e0b'
      },
      {
        id: '4',
        type: 'wishlist',
        title: t('price_drop') || 'Price Drop Alert',
        message: t('price_drop_message') || 'Item in your wishlist is now available at a lower price!',
        time: '1 day ago',
        isRead: true,
        isImportant: false,
        icon: 'heart-outline',
        color: '#ef4444'
      },
      {
        id: '5',
        type: 'system',
        title: t('app_update') || 'App Update Available',
        message: t('app_update_message') || 'New features and improvements are available. Update now!',
        time: '2 days ago',
        isRead: true,
        isImportant: false,
        icon: 'download-outline',
        color: '#8b5cf6'
      },
      {
        id: '6',
        type: 'order',
        title: t('order_delivered') || 'Order Delivered',
        message: t('order_delivered_message') || 'Your order has been successfully delivered. Enjoy your purchase!',
        time: '3 days ago',
        isRead: true,
        isImportant: false,
        icon: 'checkmark-circle-outline',
        color: '#059669'
      }
    ]
    setNotifications(mockNotifications)
  }

  // Filter options
  const filterOptions: NotificationFilter[] = [
    {
      id: 'all',
      label: t('all_notifications') || 'All',
      type: null,
      icon: 'notifications-outline',
      color: '#6366f1'
    },
    {
      id: 'orders',
      label: t('orders_filter') || 'Orders',
      type: 'order',
      icon: 'receipt-outline',
      color: '#10b981'
    },
    {
      id: 'delivery',
      label: t('delivery') || 'Delivery',
      type: 'delivery',
      icon: 'car-outline',
      color: '#3b82f6'
    },
    {
      id: 'promotions',
      label: t('promotions') || 'Promotions',
      type: 'promotion',
      icon: 'gift-outline',
      color: '#f59e0b'
    },
    {
      id: 'system',
      label: t('system') || 'System',
      type: 'system',
      icon: 'settings-outline',
      color: '#8b5cf6'
    }
  ]

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => 
    selectedFilter === 'all' || notification.type === filterOptions.find(f => f.id === selectedFilter)?.type
  )

  // Unread count
  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleBackPress = () => {
    navigation.goBack()
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const handleNotificationPress = (notification: NotificationItem) => {
    markAsRead(notification.id)
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'order':
      case 'delivery':
        navigation.navigate('Orders')
        break
      case 'wishlist':
        navigation.navigate('Wishlist')
        break
      case 'promotion':
        navigation.navigate('Home')
        break
      default:
        break
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    loadNotifications()
    setRefreshing(false)
  }

  const renderNotificationItem = ({ item, index }: { item: NotificationItem; index: number }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: scaleAnim }
        ]
      }}
    >
      <Pressable
        onPress={() => handleNotificationPress(item)}
        android_ripple={{ color: 'rgba(99, 102, 241, 0.1)' }}
      >
        <Div
          bg="white"
          mx="lg"
          mb="md"
          p="lg"
          rounded="2xl"
          shadow="sm"
          row
          alignItems="flex-start"
          borderWidth={item.isImportant && !item.isRead ? 2 : 0}
          borderColor={item.isImportant && !item.isRead ? item.color : 'transparent'}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            backgroundColor: item.isRead ? '#f8fafc' : '#ffffff'
          }}
        >
          {/* Notification Icon */}
          <Div
            w={48}
            h={48}
            rounded="xl"
            mr="md"
            justifyContent="center"
            alignItems="center"
            style={{
              backgroundColor: `${item.color}15`
            }}
          >
            <Ionicons 
              name={item.icon as any} 
              size={24} 
              color={item.color} 
            />
          </Div>

          {/* Notification Content */}
          <Div flex={1}>
            <Div row justifyContent="space-between" alignItems="flex-start" mb="xs">
              <Text
                fontSize="lg"
                fontWeight="700"
                color={item.isRead ? 'gray600' : 'gray900'}
                flex={1}
                mr="sm"
              >
                {item.title}
              </Text>
              
              {!item.isRead && (
                <Div
                  w={8}
                  h={8}
                  rounded="circle"
                  bg={item.color}
                />
              )}
            </Div>

            <Text
              fontSize="sm"
              color="gray600"
              lineHeight={20}
              mb="sm"
            >
              {item.message}
            </Text>

            <Div row justifyContent="space-between" alignItems="center">
              <Text
                fontSize="xs"
                color="gray500"
                fontWeight="500"
              >
                {item.time}
              </Text>

              <Div row>
                {!item.isRead && (
                  <Pressable
                    onPress={() => markAsRead(item.id)}
                    style={{ marginRight: 16 }}
                  >
                    <Div
                      px="sm"
                      py="xs"
                      rounded="lg"
                      bg="blue50"
                    >
                      <Text fontSize="xs" color="blue600" fontWeight="600">
                        {t('mark_read') || 'Mark Read'}
                      </Text>
                    </Div>
                  </Pressable>
                )}

                <Pressable onPress={() => deleteNotification(item.id)}>
                  <Div
                    w={32}
                    h={32}
                    rounded="lg"
                    justifyContent="center"
                    alignItems="center"
                    bg="red50"
                  >
                    <Feather name="trash-2" size={16} color="#ef4444" />
                  </Div>
                </Pressable>
              </Div>
            </Div>
          </Div>
        </Div>
      </Pressable>
    </Animated.View>
  )

  const renderFilterTab = (filter: NotificationFilter) => (
    <Pressable
      key={filter.id}
      onPress={() => setSelectedFilter(filter.id)}
      style={{
        marginRight: 12,
      }}
    >
      <Div
        px="lg"
        py="sm"
        rounded="xl"
        row
        alignItems="center"
        bg={selectedFilter === filter.id ? filter.color : 'gray100'}
        style={{
          shadowColor: selectedFilter === filter.id ? filter.color : 'transparent',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: selectedFilter === filter.id ? 8 : 0,
        }}
      >
        <Ionicons 
          name={filter.icon as any} 
          size={18} 
          color={selectedFilter === filter.id ? 'white' : '#6b7280'} 
          style={{ marginRight: 6 }}
        />
        <Text
          fontSize="sm"
          fontWeight="600"
          color={selectedFilter === filter.id ? 'white' : 'gray600'}
        >
          {filter.label}
        </Text>
      </Div>
    </Pressable>
  )

  return (
    <Div flex={1} bg="gray50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: Platform.OS === 'ios' ? 50 : 30,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          <Div row alignItems="center" justifyContent="space-between" mb="lg">
            <Pressable onPress={handleBackPress}>
              <Div
                w={40}
                h={40}
                rounded="xl"
                justifyContent="center"
                alignItems="center"
                bg="rgba(255, 255, 255, 0.2)"
              >
                <Ionicons 
                  name={i18n.language === 'ar' ? 'chevron-forward' : 'chevron-back'} 
                  size={24} 
                  color="white" 
                />
              </Div>
            </Pressable>

            <Div alignItems="center">
              <Text fontSize="xl" fontWeight="700" color="white">
                {t('notifications') || 'Notifications'}
              </Text>
              {unreadCount > 0 && (
                <Text fontSize="sm" color="rgba(255, 255, 255, 0.8)">
                  {unreadCount} {t('unread') || 'unread'}
                </Text>
              )}
            </Div>

            <Pressable onPress={markAllAsRead}>
              <Div
                w={40}
                h={40}
                rounded="xl"
                justifyContent="center"
                alignItems="center"
                bg="rgba(255, 255, 255, 0.2)"
              >
                <MaterialIcons name="done-all" size={20} color="white" />
              </Div>
            </Pressable>
          </Div>
        </Animated.View>
      </LinearGradient>

      {/* Filter Tabs */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 16,
          }}
        >
          {filterOptions.map(renderFilterTab)}
        </ScrollView>
      </Animated.View>

      {/* Notifications List */}
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }}
      >
        {filteredNotifications.length > 0 ? (
          <FlatList
            data={filteredNotifications}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => item.id}
            refreshing={refreshing}
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 8,
              paddingBottom: 100,
            }}
          />
        ) : (
          <Div flex={1} justifyContent="center" alignItems="center" px="xl">
            <Div
              w={120}
              h={120}
              rounded="circle"
              justifyContent="center"
              alignItems="center"
              mb="xl"
              style={{
                backgroundColor: '#f3f4f6'
              }}
            >
              <Ionicons name="notifications-outline" size={48} color="#9ca3af" />
            </Div>
            
            <Text fontSize="xl" fontWeight="700" color="gray700" mb="sm" textAlign="center">
              {t('no_notifications') || 'No Notifications'}
            </Text>
            
            <Text fontSize="md" color="gray500" textAlign="center" lineHeight={24}>
              {selectedFilter === 'all' 
                ? (t('no_notifications_message') || 'You\'re all caught up! No new notifications at the moment.')
                : (t('no_filtered_notifications') || `No ${filterOptions.find(f => f.id === selectedFilter)?.label.toLowerCase()} notifications.`)
              }
            </Text>
          </Div>
        )}
      </Animated.View>
    </Div>
  )
}
