import React, { useContext, useState, useRef, useEffect, use } from 'react'
import { Animated, StatusBar, Pressable, Alert, TextInput, ActivityIndicator } from 'react-native'
import { Div, ScrollDiv, Text, Button } from 'react-native-magnus'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Toast } from 'toastify-react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Bottom_Navbar from '../../components/bottom_navbar/bottom_navbar'
import { AuthContext } from '../../context/auth_provider'
import { clear_cart } from '../../redux/reducers/cart_reducer'
import { Ionicons } from '@expo/vector-icons'
import Checkout_Header from '../../components/checkout_header/checkout_header'
import Fixed_Checkout_Action from '../../components/fixed_chechout_action/fixed_checkout_action'
import Checkout_Tabs from '../../components/checkout_tabs/checkout_tabs'


export default function Checkout() {
  const { t, i18n } = useTranslation()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.products)
  const { auth } = useContext(AuthContext)
  const [paymentMethods, setPaymentMethods] = useState(null)


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
      name: Yup.string().required(t('name_required')),
      email: Yup.string().email(t('email_invalid')).required(t('email_required') || 'Email is required'),
      phone: Yup.string().required(t('phone_required')),
      address: Yup.string().required(t('address_required')),
      city: Yup.string().required(t('city_required')),
      payment_method: Yup.string().required(t('payment_method_required')),
    }),
    onSubmit: async (values) => {
      try {

        setLoading(true)
        // Based on the error, let's use a minimal structure
        const orderData = {
          data: {
            user_id: auth?.user?.id || 3,
            "name": values.name,
            "address": values.address,
            "phone": values.phone,
            "payment_method": values.payment_method,
            "order":cartItems
          }
        }



        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_APP_URL}/orders`,
          orderData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_TOKEN_SECRET}`,
            },
          }
        )

        

        // Success
        Toast.show({
          type: 'success',
          position: 'center',
          text1: t('order_placed_successfully'), 
          visibilityTime: 4000,
        })

        // Clear cart and navigate
        
       

      } catch (error) {
        console.log('Order error:', error)
        console.log('Error response:', error.response?.data)
        console.log('Error status:', error.response?.status)
        console.log('Error config:', error.config)

        let errorMessage = t('please_try_again') || 'Please try again later'

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        } else if (error.response?.data?.error?.message) {
          errorMessage = error.response.data.error.message
        } else if (error.response?.data?.details) {
          errorMessage = error.response.data.details
        } else if (error.response?.status === 400) {
          errorMessage = 'Invalid order data. Please check all fields and try again.'
        } else if (error.response?.status === 401) {
          errorMessage = 'Authentication failed. Please check your credentials.'
        } else if (error.response?.status === 403) {
          errorMessage = 'Permission denied. Please contact support.'
        } else if (error.response?.status === 404) {
          errorMessage = 'Service not found. Please contact support.'
        } else if (error.response?.status >= 500) {
          errorMessage = 'Server error. Please try again later.'
        } else if (error.message) {
          errorMessage = error.message
        }

        Toast.show({
          type: 'error',
          text1: t('order_failed') || 'Order Failed',
          text2: errorMessage,
          visibilityTime: 5000,
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







  // fetch payment methods from API
  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_APP_URL}/payment-options`, {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_TOKEN_SECRET}`,
        },
      });
      // setPaymentMethods(response.data.data);
      setPaymentMethods(response.data.data);

    } catch (error) {
      console.log('Error fetching payment methods:', error);
    }
  }



  useEffect(() => {
    fetchPaymentMethods()
  }, [])





  return (
    <Div flex={1} bg="#f8f9fa">
      <StatusBar barStyle="light-content" backgroundColor="#1f2937" />

      {/* Professional Header with Gradient */}
      <Checkout_Header handleBackPress={handleBackPress} currentStep={currentStep} />

      {/* Main Content Area */}
      <Div flex={1}>
        <Checkout_Tabs currentStep={currentStep} formik={formik} paymentMethods={paymentMethods} itemCount={cartItems.length} total={total} subtotal={subtotal} />



        {/* Fixed Bottom Button Container - This solves the Bottom_Navbar overlap */}
        <Fixed_Checkout_Action currentStep={currentStep} handleNextStep={handleNextStep} setCurrentStep={setCurrentStep} loading={loading} formik={formik} />
      </Div>

      {/* <Bottom_Navbar /> */}
    </Div>
  )
}
