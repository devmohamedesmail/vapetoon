import React, { useContext, useState, useRef, useEffect } from 'react'
import { Animated, StatusBar, Pressable, Alert, TextInput, ActivityIndicator } from 'react-native'
import { Div, ScrollDiv, Text, Button } from 'react-native-magnus'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { LinearGradient } from 'expo-linear-gradient'

// Components
import Bottom_Navbar from '../../Component/Bottom_Navbar/Bottom_Navbar'

// Config & Context
import { api_config } from '../../config/api_config'
import { AuthContext } from '../../Context/AuthProvider'
import { clear_cart } from '../../Redux/Reducers/cartReducer'

// Icons
import { Ionicons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons'

export default function Checkout() {
  const { t, i18n } = useTranslation()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.products)
  const { auth } = useContext(AuthContext)
  
  // State
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  
  // Animation
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current

  // Calculate totals
  const subtotal = cartItems.reduce((sum, product) => {
    const price = product.sale || product.price
    return sum + price * product.quantity
  }, 0)
  
  const itemCount = cartItems.reduce((sum, product) => sum + product.quantity, 0)
  const shippingFee = 0 // Free shipping
  const total = subtotal + shippingFee

  // Form validation
  const formik = useFormik({
    initialValues: {
      name: auth?.user?.username || '',
      email: auth?.user?.email || '',
      phone: '',
      address: '',
      city: '',
      payment_method: '',
      notes: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('name_required') || 'Name is required'),
      email: Yup.string().email(t('email_invalid') || 'Invalid email').required(t('email_required') || 'Email is required'),
      phone: Yup.string().required(t('phone_required') || 'Phone is required'),
      address: Yup.string().required(t('address_required') || 'Address is required'),
      city: Yup.string().required(t('city_required') || 'City is required'),
      payment_method: Yup.string().required(t('payment_method_required') || 'Payment method is required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        
        const orderData = {
          user_id: auth?.user?.id || 3,
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          city: values.city,
          payment_method: values.payment_method,
          notes: values.notes,
          order: cartItems,
          total_amount: total,
          item_count: itemCount,
          status: 'pending'
        }

        const response = await axios.post(
          `${api_config.url}/api/orders`,
          { data: orderData },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${api_config.token}`,
            },
          }
        )

        // Success
        Toast.show({
          type: 'success',
          text1: t('order_placed_successfully') || 'Order Placed Successfully!',
          text2: t('order_confirmation_sent') || 'Confirmation will be sent to your email',
          visibilityTime: 4000,
        })

        // Clear cart and navigate
        dispatch(clear_cart())
        navigation.navigate('Account')
        
      } catch (error) {
        console.log('Order error:', error)
        Toast.show({
          type: 'error',
          text1: t('order_failed') || 'Order Failed',
          text2: t('please_try_again') || 'Please try again later',
          visibilityTime: 3000,
        })
      } finally {
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    // Animate content in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handleBackPress = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      navigation.goBack()
    }
  }

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate billing info
      const errors = {}
      if (!formik.values.name) errors.name = 'Required'
      if (!formik.values.email) errors.email = 'Required'
      if (!formik.values.phone) errors.phone = 'Required'
      if (!formik.values.address) errors.address = 'Required'
      if (!formik.values.city) errors.city = 'Required'
      
      if (Object.keys(errors).length > 0) {
        formik.setErrors(errors)
        return
      }
      setCurrentStep(2)
    } else if (currentStep === 2) {
      if (!formik.values.payment_method) {
        formik.setFieldError('payment_method', 'Please select a payment method')
        return
      }
      setCurrentStep(3)
    }
  }

  if (cartItems.length === 0) {
    return (
      <Div flex={1} bg="#f8f9fa">
        <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
        
        {/* Header */}
        <LinearGradient
          colors={['#1f2937', '#374151']}
          style={{
            paddingTop: 50,
            paddingBottom: 20,
            paddingHorizontal: 20,
          }}
        >
          <Div flexDir="row" alignItems="center" justifyContent="space-between">
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            
            <Div alignItems="center" flex={1}>
              <Text fontSize={20} fontWeight="700" color="white">
                {t('checkout') || 'Checkout'}
              </Text>
            </Div>

            <Div w={24} /> {/* Spacer */}
          </Div>
        </LinearGradient>

        {/* Empty State */}
        <Div flex={1} justifyContent="center" alignItems="center" px={40}>
          <Div 
            w={120} 
            h={120} 
            rounded="circle" 
            bg="rgba(156, 163, 175, 0.1)" 
            alignItems="center" 
            justifyContent="center"
            mb={24}
          >
            <Ionicons name="bag-outline" size={60} color="#9ca3af" />
          </Div>
          
          <Text fontSize={24} fontWeight="700" color="#1f2937" mb={12} textAlign="center">
            {t('cart_empty') || 'Your cart is empty'}
          </Text>
          <Text fontSize={16} color="#6b7280" textAlign="center" mb={32} lineHeight={24}>
            {t('add_items_to_checkout') || 'Add some items to your cart to proceed with checkout'}
          </Text>
          
          <Button
            bg="#1f2937"
            h={56}
            px={32}
            rounded={12}
            onPress={() => navigation.navigate('Shop')}
            flexDir="row"
            alignItems="center"
            justifyContent="center"
          >
            <Ionicons name="storefront" size={20} color="white" style={{ marginRight: 8 }} />
            <Text color="white" fontSize={16} fontWeight="600">
              {t('start_shopping') || 'Start Shopping'}
            </Text>
          </Button>
        </Div>
        <Bottom_Navbar />
      </Div>
    )
  }

  return (
    <Div flex={1} bg="#f8f9fa">
      <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
      
      {/* Professional Header with Gradient */}
      <LinearGradient
        colors={['#1f2937', '#374151']}
        style={{
          paddingTop: 50,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <Div flexDir="row" alignItems="center" justifyContent="space-between">
          <Pressable onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          
          <Div alignItems="center" flex={1}>
            <Text fontSize={20} fontWeight="700" color="white">
              {t('checkout') || 'Checkout'}
            </Text>
            <Text fontSize={14} color="#d1d5db" mt={2}>
              {t('step')} {currentStep} {t('of')} 3
            </Text>
          </Div>

          <Div w={24} /> {/* Spacer */}
        </Div>

        {/* Progress Bar */}
        <Div flexDir="row" mt={20} alignItems="center">
          {[1, 2, 3].map((step, index) => (
            <React.Fragment key={step}>
              <Div
                w={32}
                h={32}
                rounded="circle"
                bg={currentStep >= step ? "white" : "rgba(255,255,255,0.3)"}
                alignItems="center"
                justifyContent="center"
              >
                {currentStep > step ? (
                  <Ionicons name="checkmark" size={16} color="#1f2937" />
                ) : (
                  <Text 
                    color={currentStep >= step ? "#1f2937" : "rgba(255,255,255,0.7)"} 
                    fontSize={14} 
                    fontWeight="600"
                  >
                    {step}
                  </Text>
                )}
              </Div>
              {index < 2 && (
                <Div 
                  flex={1} 
                  h={2} 
                  bg={currentStep > step ? "white" : "rgba(255,255,255,0.3)"} 
                  mx={8} 
                  rounded={1}
                />
              )}
            </React.Fragment>
          ))}
        </Div>

        {/* Step Labels */}
        <Div flexDir="row" justifyContent="space-between" mt={8}>
          <Text fontSize={12} color={currentStep >= 1 ? "white" : "rgba(255,255,255,0.7)"} fontWeight="500">
            {t('billing_info') || 'Billing'}
          </Text>
          <Text fontSize={12} color={currentStep >= 2 ? "white" : "rgba(255,255,255,0.7)"} fontWeight="500">
            {t('payment') || 'Payment'}
          </Text>
          <Text fontSize={12} color={currentStep >= 3 ? "white" : "rgba(255,255,255,0.7)"} fontWeight="500">
            {t('review') || 'Review'}
          </Text>
        </Div>
      </LinearGradient>

      {/* Main Content Area */}
      <Div flex={1}>
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <ScrollDiv flex={1} px={20} pt={20} pb={20} showsVerticalScrollIndicator={false}>
            
            {/* Step 1: Billing Information */}
            {currentStep === 1 && (
              <Div>
                <Div bg="white" rounded={16} p={24} mb={20} borderWidth={1} borderColor="#e5e7eb">
                  <Div flexDir="row" alignItems="center" mb={20}>
                    <Div w={40} h={40} rounded="circle" bg="#eff6ff" alignItems="center" justifyContent="center" mr={12}>
                      <Ionicons name="person" size={20} color="#2563eb" />
                    </Div>
                    <Div>
                      <Text fontSize={18} fontWeight="600" color="#1f2937">
                        {t('billing_information') || 'Billing Information'}
                      </Text>
                      <Text fontSize={14} color="#6b7280">
                        {t('enter_your_details') || 'Enter your shipping and contact details'}
                      </Text>
                    </Div>
                  </Div>

                  {/* Form Fields */}
                  <Div>
                    {/* Name */}
                    <Div mb={16}>
                      <Text fontSize={14} fontWeight="600" color="#374151" mb={8}>
                        {t('full_name') || 'Full Name'} *
                      </Text>
                      <Div
                        borderWidth={1}
                        borderColor={formik.errors.name ? "#ef4444" : "#d1d5db"}
                        rounded={12}
                        bg="#f9fafb"
                        px={16}
                        py={12}
                      >
                        <TextInput
                          style={{
                            fontSize: 16,
                            color: '#1f2937',
                            flex: 1,
                          }}
                          onChangeText={formik.handleChange('name')}
                          value={formik.values.name}
                          placeholder={t('enter_full_name') || 'Enter your full name'}
                          placeholderTextColor="#9ca3af"
                        />
                      </Div>
                      {formik.errors.name && (
                        <Text color="#ef4444" fontSize={12} mt={4}>
                          {formik.errors.name}
                        </Text>
                      )}
                    </Div>

                    {/* Email */}
                    <Div mb={16}>
                      <Text fontSize={14} fontWeight="600" color="#374151" mb={8}>
                        {t('email_address') || 'Email Address'} *
                      </Text>
                      <Div
                        borderWidth={1}
                        borderColor={formik.errors.email ? "#ef4444" : "#d1d5db"}
                        rounded={12}
                        bg="#f9fafb"
                        px={16}
                        py={12}
                      >
                        <TextInput
                          style={{
                            fontSize: 16,
                            color: '#1f2937',
                            flex: 1,
                          }}
                          onChangeText={formik.handleChange('email')}
                          value={formik.values.email}
                          placeholder={t('enter_email') || 'Enter your email address'}
                          placeholderTextColor="#9ca3af"
                          keyboardType="email-address"
                          autoCapitalize="none"
                        />
                      </Div>
                      {formik.errors.email && (
                        <Text color="#ef4444" fontSize={12} mt={4}>
                          {formik.errors.email}
                        </Text>
                      )}
                    </Div>

                    {/* Phone */}
                    <Div mb={16}>
                      <Text fontSize={14} fontWeight="600" color="#374151" mb={8}>
                        {t('phone_number') || 'Phone Number'} *
                      </Text>
                      <Div
                        borderWidth={1}
                        borderColor={formik.errors.phone ? "#ef4444" : "#d1d5db"}
                        rounded={12}
                        bg="#f9fafb"
                        px={16}
                        py={12}
                      >
                        <TextInput
                          style={{
                            fontSize: 16,
                            color: '#1f2937',
                            flex: 1,
                          }}
                          onChangeText={formik.handleChange('phone')}
                          value={formik.values.phone}
                          placeholder={t('enter_phone') || 'Enter your phone number'}
                          placeholderTextColor="#9ca3af"
                          keyboardType="phone-pad"
                        />
                      </Div>
                      {formik.errors.phone && (
                        <Text color="#ef4444" fontSize={12} mt={4}>
                          {formik.errors.phone}
                        </Text>
                      )}
                    </Div>

                    {/* Address */}
                    <Div mb={16}>
                      <Text fontSize={14} fontWeight="600" color="#374151" mb={8}>
                        {t('street_address') || 'Street Address'} *
                      </Text>
                      <Div
                        borderWidth={1}
                        borderColor={formik.errors.address ? "#ef4444" : "#d1d5db"}
                        rounded={12}
                        bg="#f9fafb"
                        px={16}
                        py={12}
                        minH={80}
                      >
                        <TextInput
                          style={{
                            fontSize: 16,
                            color: '#1f2937',
                            flex: 1,
                            textAlignVertical: 'top',
                          }}
                          onChangeText={formik.handleChange('address')}
                          value={formik.values.address}
                          placeholder={t('enter_address') || 'Enter your complete address'}
                          placeholderTextColor="#9ca3af"
                          multiline
                          numberOfLines={3}
                        />
                      </Div>
                      {formik.errors.address && (
                        <Text color="#ef4444" fontSize={12} mt={4}>
                          {formik.errors.address}
                        </Text>
                      )}
                    </Div>

                    {/* City */}
                    <Div mb={16}>
                      <Text fontSize={14} fontWeight="600" color="#374151" mb={8}>
                        {t('city') || 'City'} *
                      </Text>
                      <Div
                        borderWidth={1}
                        borderColor={formik.errors.city ? "#ef4444" : "#d1d5db"}
                        rounded={12}
                        bg="#f9fafb"
                        px={16}
                        py={12}
                      >
                        <TextInput
                          style={{
                            fontSize: 16,
                            color: '#1f2937',
                            flex: 1,
                          }}
                          onChangeText={formik.handleChange('city')}
                          value={formik.values.city}
                          placeholder={t('enter_city') || 'Enter your city'}
                          placeholderTextColor="#9ca3af"
                        />
                      </Div>
                      {formik.errors.city && (
                        <Text color="#ef4444" fontSize={12} mt={4}>
                          {formik.errors.city}
                        </Text>
                      )}
                    </Div>
                  </Div>
                </Div>
              </Div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <Div>
                <Div bg="white" rounded={16} p={24} mb={20} borderWidth={1} borderColor="#e5e7eb">
                  <Div flexDir="row" alignItems="center" mb={20}>
                    <Div w={40} h={40} rounded="circle" bg="#ecfdf5" alignItems="center" justifyContent="center" mr={12}>
                      <MaterialIcons name="payment" size={20} color="#059669" />
                    </Div>
                    <Div>
                      <Text fontSize={18} fontWeight="600" color="#1f2937">
                        {t('payment_method') || 'Payment Method'}
                      </Text>
                      <Text fontSize={14} color="#6b7280">
                        {t('choose_payment_option') || 'Choose how you want to pay'}
                      </Text>
                    </Div>
                  </Div>

                  {/* Payment Options */}
                  <Div>
                    {/* Cash on Delivery */}
                    <Pressable
                      onPress={() => formik.setFieldValue('payment_method', 'cod')}
                      style={({ pressed }) => ({
                        borderWidth: 2,
                        borderColor: formik.values.payment_method === 'cod' ? '#059669' : '#e5e7eb',
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 12,
                        backgroundColor: formik.values.payment_method === 'cod' ? '#f0fdf4' : '#f9fafb',
                        transform: [{ scale: pressed ? 0.98 : 1 }],
                      })}
                    >
                      <Div flexDir="row" alignItems="center" justifyContent="space-between">
                        <Div flexDir="row" alignItems="center">
                          <Div 
                            w={48} 
                            h={48} 
                            rounded="circle" 
                            bg={formik.values.payment_method === 'cod' ? '#059669' : '#e5e7eb'} 
                            alignItems="center" 
                            justifyContent="center" 
                            mr={12}
                          >
                            <MaterialIcons name="money" size={24} color={formik.values.payment_method === 'cod' ? 'white' : '#6b7280'} />
                          </Div>
                          <Div>
                            <Text fontSize={16} fontWeight="600" color="#1f2937">
                              {t('cash_on_delivery') || 'Cash on Delivery'}
                            </Text>
                            <Text fontSize={14} color="#6b7280">
                              {t('pay_when_delivered') || 'Pay when your order arrives'}
                            </Text>
                          </Div>
                        </Div>
                        {formik.values.payment_method === 'cod' && (
                          <Ionicons name="checkmark-circle" size={24} color="#059669" />
                        )}
                      </Div>
                    </Pressable>

                    {/* Credit Card */}
                    <Pressable
                      onPress={() => formik.setFieldValue('payment_method', 'card')}
                      style={({ pressed }) => ({
                        borderWidth: 2,
                        borderColor: formik.values.payment_method === 'card' ? '#059669' : '#e5e7eb',
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 12,
                        backgroundColor: formik.values.payment_method === 'card' ? '#f0fdf4' : '#f9fafb',
                        transform: [{ scale: pressed ? 0.98 : 1 }],
                      })}
                    >
                      <Div flexDir="row" alignItems="center" justifyContent="space-between">
                        <Div flexDir="row" alignItems="center">
                          <Div 
                            w={48} 
                            h={48} 
                            rounded="circle" 
                            bg={formik.values.payment_method === 'card' ? '#059669' : '#e5e7eb'} 
                            alignItems="center" 
                            justifyContent="center" 
                            mr={12}
                          >
                            <MaterialIcons name="credit-card" size={24} color={formik.values.payment_method === 'card' ? 'white' : '#6b7280'} />
                          </Div>
                          <Div>
                            <Text fontSize={16} fontWeight="600" color="#1f2937">
                              {t('credit_debit_card') || 'Credit/Debit Card'}
                            </Text>
                            <Text fontSize={14} color="#6b7280">
                              {t('secure_online_payment') || 'Secure online payment'}
                            </Text>
                          </Div>
                        </Div>
                        {formik.values.payment_method === 'card' && (
                          <Ionicons name="checkmark-circle" size={24} color="#059669" />
                        )}
                      </Div>
                    </Pressable>
                  </Div>

                  {formik.errors.payment_method && (
                    <Text color="#ef4444" fontSize={12} mt={8}>
                      {formik.errors.payment_method}
                    </Text>
                  )}
                </Div>
              </Div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <Div>
                {/* Order Items */}
                <Div bg="white" rounded={16} p={24} mb={20} borderWidth={1} borderColor="#e5e7eb">
                  <Div flexDir="row" alignItems="center" mb={20}>
                    <Div 
                      w={48} 
                      h={48} 
                      rounded="circle" 
                      bg="#fef3c7" 
                      alignItems="center" 
                      justifyContent="center" 
                      mr={12}
                    >
                      <Ionicons name="bag" size={24} color="#d97706" />
                    </Div>
                    <Div>
                      <Text fontSize={18} fontWeight="600" color="#1f2937">
                        {t('order_summary') || 'Order Summary'}
                      </Text>
                      <Text fontSize={14} color="#6b7280">
                        {itemCount} {itemCount === 1 ? (t('item') || 'item') : (t('items') || 'items')}
                      </Text>
                    </Div>
                  </Div>

                  {/* Order Totals */}
                  <Div bg="#f9fafb" rounded={12} p={16}>
                    <Div flexDir="row" justifyContent="space-between" alignItems="center" mb={12}>
                      <Text fontSize={14} color="#6b7280">
                        {t('subtotal') || 'Subtotal'}
                      </Text>
                      <Text fontSize={16} fontWeight="600" color="#1f2937">
                        {subtotal.toFixed(2)} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                      </Text>
                    </Div>

                    <Div flexDir="row" justifyContent="space-between" alignItems="center" mb={16}>
                      <Text fontSize={14} color="#6b7280">
                        {t('shipping') || 'Shipping'}
                      </Text>
                      <Div flexDir="row" alignItems="center">
                        <Ionicons name="checkmark-circle" size={16} color="#059669" style={{ marginRight: 4 }} />
                        <Text fontSize={14} color="#059669" fontWeight="600">
                          {t('free') || 'Free'}
                        </Text>
                      </Div>
                    </Div>

                    <Div h={1} bg="#e5e7eb" mb={16} />

                    <Div flexDir="row" justifyContent="space-between" alignItems="center">
                      <Text fontSize={18} fontWeight="700" color="#1f2937">
                        {t('total') || 'Total'}
                      </Text>
                      <Text fontSize={20} fontWeight="700" color="#1f2937">
                        {total.toFixed(2)} {i18n.language === "ar" ? api_config.currency_ar : api_config.currency_en}
                      </Text>
                    </Div>
                  </Div>
                </Div>

                {/* Billing & Payment Summary */}
                <Div bg="white" rounded={16} p={24} mb={20} borderWidth={1} borderColor="#e5e7eb">
                  <Text fontSize={16} fontWeight="600" color="#1f2937" mb={16}>
                    {t('delivery_payment_details') || 'Delivery & Payment Details'}
                  </Text>

                  <Div mb={16}>
                    <Text fontSize={14} color="#6b7280" mb={4}>
                      {t('deliver_to') || 'Deliver to'}:
                    </Text>
                    <Text fontSize={14} fontWeight="600" color="#1f2937">
                      {formik.values.name}
                    </Text>
                    <Text fontSize={14} color="#6b7280">
                      {formik.values.address}, {formik.values.city}
                    </Text>
                    <Text fontSize={14} color="#6b7280">
                      {formik.values.phone}
                    </Text>
                  </Div>

                  <Div>
                    <Text fontSize={14} color="#6b7280" mb={4}>
                      {t('payment_method') || 'Payment method'}:
                    </Text>
                    <Text fontSize={14} fontWeight="600" color="#1f2937">
                      {formik.values.payment_method === 'cod' 
                        ? (t('cash_on_delivery') || 'Cash on Delivery')
                        : (t('credit_debit_card') || 'Credit/Debit Card')
                      }
                    </Text>
                  </Div>
                </Div>

                {/* Order Notes */}
                <Div bg="white" rounded={16} p={24} mb={20} borderWidth={1} borderColor="#e5e7eb">
                  <Text fontSize={16} fontWeight="600" color="#1f2937" mb={12}>
                    {t('order_notes') || 'Order Notes'} ({t('optional') || 'Optional'})
                  </Text>
                  <Div
                    borderWidth={1}
                    borderColor="#d1d5db"
                    rounded={12}
                    bg="#f9fafb"
                    px={16}
                    py={12}
                    minH={80}
                  >
                    <TextInput
                      style={{
                        fontSize: 14,
                        color: '#1f2937',
                        flex: 1,
                        textAlignVertical: 'top',
                      }}
                      onChangeText={formik.handleChange('notes')}
                      value={formik.values.notes}
                      placeholder={t('add_delivery_instructions') || 'Add any special delivery instructions...'}
                      placeholderTextColor="#9ca3af"
                      multiline
                      numberOfLines={3}
                    />
                  </Div>
                </Div>
              </Div>
            )}
          </ScrollDiv>
        </Animated.View>

        {/* Fixed Bottom Button Container - This solves the Bottom_Navbar overlap */}
        <Div 
          position="absolute"
          bottom={40}
          left={0}
          right={0}
          bg="white" 
          px={20} 
          pt={16} 
          pb={16}
          borderTopWidth={1}
          borderTopColor="#e5e7eb"
        >
          {/* Step 1 Button */}
          {currentStep === 1 && (
            <Button
              bg="#1f2937"
              h={50}
              rounded={12}
              onPress={handleNextStep}
              flexDir="row"
              alignItems="center"
              justifyContent="center"
              mb={16}
            >
              <Text color="white" fontSize={16} fontWeight="600" mr={8}>
                {t('continue_to_payment') || 'Continue to Payment'}
              </Text>
              <Ionicons name="arrow-forward" size={16} color="white" />
            </Button>
          )}

          {/* Step 2 Buttons */}
          {currentStep === 2 && (
            <Div flexDir="row" justifyContent="space-between">
              <Button
                bg="transparent"
                borderWidth={1}
                borderColor="#d1d5db"
                h={56}
                flex={0.45}
                rounded={12}
                onPress={() => setCurrentStep(1)}
                flexDir="row"
                alignItems="center"
                justifyContent="center"
              >
                <Ionicons name="arrow-back" size={16} color="#6b7280" style={{ marginRight: 8 }} />
                <Text color="#6b7280" fontSize={16} fontWeight="600">
                  {t('back') || 'Back'}
                </Text>
              </Button>

              <Button
                bg="#1f2937"
                h={56}
                flex={0.5}
                rounded={12}
                onPress={handleNextStep}
                flexDir="row"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="white" fontSize={16} fontWeight="600" mr={8}>
                  {t('review_order') || 'Review Order'}
                </Text>
                <Ionicons name="arrow-forward" size={16} color="white" />
              </Button>
            </Div>
          )}

          {/* Step 3 Buttons */}
          {currentStep === 3 && (
            <Div flexDir="row" justifyContent="space-between">
              <Button
                bg="transparent"
                borderWidth={1}
                borderColor="#d1d5db"
                h={56}
                flex={0.45}
                rounded={12}
                onPress={() => setCurrentStep(2)}
                flexDir="row"
                alignItems="center"
                justifyContent="center"
              >
                <Ionicons name="arrow-back" size={16} color="#6b7280" style={{ marginRight: 8 }} />
                <Text color="#6b7280" fontSize={16} fontWeight="600">
                  {t('back') || 'Back'}
                </Text>
              </Button>

              <Button
                bg="#059669"
                h={56}
                flex={0.5}
                rounded={12}
                onPress={formik.handleSubmit}
                disabled={loading}
                flexDir="row"
                alignItems="center"
                justifyContent="center"
                opacity={loading ? 0.7 : 1}
              >
                {loading ? (
                  <Div flexDir="row" alignItems="center">
                    <ActivityIndicator color="white" size="small" style={{ marginRight: 8 }} />
                    <Text color="white" fontSize={16} fontWeight="600">
                      {t('placing_order') || 'Placing Order...'}
                    </Text>
                  </Div>
                ) : (
                  <Div flexDir="row" alignItems="center">
                    <MaterialIcons name="lock" size={16} color="white" style={{ marginRight: 8 }} />
                    <Text color="white" fontSize={16} fontWeight="600">
                      {t('place_order') || 'Place Order'}
                    </Text>
                  </Div>
                )}
              </Button>
            </Div>
          )}
        </Div>
      </Div>

      {/* <Bottom_Navbar /> */}
    </Div>
  )
}
