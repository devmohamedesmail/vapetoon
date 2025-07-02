import React, { useState, useRef, useContext } from 'react'
import { StatusBar, TextInput, Pressable, Animated, Alert, ScrollView } from 'react-native'
import { Div, Text, Button } from 'react-native-magnus'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Toast } from 'toastify-react-native'
import axios from 'axios'
import { AuthContext } from '../../context/auth_provider'
import CustomInput from '../../custom/custom_input'
import custom_colors from '../../config/custom_colors'

export default function Add_Address() {
    const { t, i18n } = useTranslation()
    const navigation = useNavigation<any>()
    const { auth } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(30)).current

    React.useEffect(() => {
        // Animate screen entrance
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

    // Form validation
    const formik = useFormik({
        initialValues: {
            type: '',
            address_line1: '',
            address_line2: '',
            city: '',
            label: '',
        },
        validationSchema: Yup.object({
          address_line1: Yup.string()
            .min(5, t('address_too_short') || 'Address too short')
            .required(t('address_line1_required') || 'Address line 1 is required'),
          city: Yup.string()
            .min(2, t('city_too_short') || 'City name too short')
            .required(t('city_required') || 'City is required'),
          label: Yup.string()
            .required(t('address_label_required') || 'Address label is required'),
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true)
                
                const addressData = {
                    data: {
                        user_id: auth?.user?.id || 3,
                        address_line1: values.address_line1,
                        address_line2: values.address_line2 || '',
                        city: values.city,
                        type: values.type || 'home', 
                        // label: values.label,
                        // is_default: false,
                    }
                }

               

                const response = await axios.post(
                    `${process.env.EXPO_PUBLIC_APP_URL}/addresses`,
                    addressData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${process.env.EXPO_PUBLIC_TOKEN_SECRET}`,
                        },
                    }
                )

                Toast.show({
                    type: 'success',
                    position: 'center',
                    text1: t('address_added_successfully'),
                    visibilityTime: 3000,
                })



            } catch (error) {
                console.log('Add address error:', error)

                

               

                Toast.show({
                    type: 'error',
                    position: 'center',
                    text1: t('address_add_failed') ,  
                    visibilityTime: 4000,
                })
            } finally {
                setLoading(false)
            }
        },
    })

    const addressLabels = [
        { key: 'home', label: t('home') || 'Home', icon: 'home' as const },
        { key: 'work', label: t('work') || 'Work', icon: 'business' as const },
        { key: 'other', label: t('other') || 'Other', icon: 'location-on' as const },
    ]

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
                            {t('add_new_address') || 'Add New Address'}
                        </Text>
                        <Text fontSize={14} color="#d1d5db" mt={2}>
                            {t('add_delivery_address') || 'Add a new delivery address'}
                        </Text>
                    </Div>

                    <Div w={24} /> {/* Spacer */}
                </Div>
            </LinearGradient>

            {/* Main Content */}
            <Animated.View
                style={{
                    flex: 1,
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                }}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Address Form Card */}
                    <Div bg="white" rounded={16} p={24} mb={20} borderWidth={1} borderColor="#e5e7eb">
                        <Div flexDir="row" alignItems="center" mb={20}>
                            <Div w={40} h={40} rounded="circle" bg="#eff6ff" alignItems="center" justifyContent="center" mr={12}>
                                <Ionicons name="location" size={20} color="#2563eb" />
                            </Div>
                            <Div>
                                <Text fontSize={18} fontWeight="600" color="#1f2937">
                                    {t('address_information') || 'Address Information'}
                                </Text>
                                <Text fontSize={14} color="#6b7280">
                                    {t('enter_complete_address') || 'Enter your complete address details'}
                                </Text>
                            </Div>
                        </Div>

                        {/* Address Label Selection */}
                        <Div mb={20}>
                            <Text fontSize={14} fontWeight="600" color="#374151" mb={12}>
                                {t('address_label') || 'Address Label'} *
                            </Text>
                            <Div flexDir="row" justifyContent="space-between">
                                {addressLabels.map((item) => (
                                    <Pressable
                                        key={item.key}
                                        onPress={() => formik.setFieldValue('label', item.key)}
                                        style={({ pressed }) => ({
                                            flex: 1,
                                            marginHorizontal: 4,
                                            borderWidth: 2,
                                            borderColor: formik.values.label === item.key ? '#2563eb' : '#e5e7eb',
                                            borderRadius: 12,
                                            padding: 16,
                                            backgroundColor: formik.values.label === item.key ? '#eff6ff' : '#f9fafb',
                                            transform: [{ scale: pressed ? 0.98 : 1 }],
                                        })}
                                    >
                                        <Div alignItems="center">
                                            <MaterialIcons
                                                name={item.icon}
                                                size={24}
                                                color={formik.values.label === item.key ? '#2563eb' : '#6b7280'}
                                            />
                                            <Text
                                                fontSize={12}
                                                fontWeight="600"
                                                color={formik.values.label === item.key ? '#2563eb' : '#6b7280'}
                                                mt={4}
                                                textAlign="center"
                                            >
                                                {item.label}
                                            </Text>
                                        </Div>
                                    </Pressable>
                                ))}
                            </Div>
                            {formik.errors.label && (
                                <Text color="#ef4444" fontSize={12} mt={8}>
                                    {formik.errors.label}
                                </Text>
                            )}
                        </Div>

                        {/* Address Line 1 */}

                        <CustomInput

                            onChangeText={formik.handleChange('address_line1')}
                            value={formik.values.address_line1}
                            placeholder={t('enter_address_line1')}
                            prefix={<MaterialIcons name="home" size={20} color="#6b7280" style={{ marginRight: 12 }} />} 
                            error={formik.errors.address_line1} />

                        {/* Address Line 2 (Optional) */}
                     


                        <CustomInput

                            onChangeText={formik.handleChange('address_line2')}
                            value={formik.values.address_line2}
                            placeholder={t('enter_address_line2')}
                            prefix={<MaterialIcons name="home" size={20} color="#6b7280" style={{ marginRight: 12 }} />} 
                            error={formik.errors.address_line2} />

                        <CustomInput

                            onChangeText={formik.handleChange('city')}
                            value={formik.values.city}
                            placeholder={t('city')}
                            prefix={<MaterialIcons name="location-city" size={20} color="#6b7280" style={{ marginRight: 12 }} />} 
                            error={formik.errors.city} />

                     

                        {/* Save Button */}
                        <Button
                            bg={custom_colors.primary}
                            h={56}
                            rounded={12}
                            onPress={() => formik.handleSubmit()}
                            disabled={loading}
                            flexDir="row"
                            alignItems="center"
                            justifyContent="center"
                            mt={8}
                            opacity={loading ? 0.7 : 1}
                        >
                            {loading ? (
                                <Div flexDir="row" alignItems="center">
                                    <MaterialIcons name="sync" size={20} color="white" style={{ marginRight: 8 }} />
                                    <Text color="white" fontSize={16} fontWeight="600">
                                        {t('saving') || 'Saving...'}
                                    </Text>
                                </Div>
                            ) : (
                                <Div flexDir="row" alignItems="center">
                                    <MaterialIcons name="save" size={20} color="white" style={{ marginRight: 8 }} />
                                    <Text color="white" fontSize={16} fontWeight="600">
                                        {t('save_address') || 'Save Address'}
                                    </Text>
                                </Div>
                            )}
                        </Button>
                    </Div>

                    {/* Tips Card */}
                    <Div bg="white" rounded={16} p={20} borderWidth={1} borderColor="#e5e7eb">
                        <Div flexDir="row" alignItems="center" mb={12}>
                            <MaterialIcons name="lightbulb" size={20} color="#f59e0b" style={{ marginRight: 8 }} />
                            <Text fontSize={16} fontWeight="600" color="#1f2937">
                                {t('helpful_tips') || 'Helpful Tips'}
                            </Text>
                        </Div>
                        <Text fontSize={14} color="#6b7280" lineHeight={20}>
                            • {t('tip_complete_address') || 'Provide a complete address for faster delivery'}{'\n'}
                            • {t('tip_landmarks') || 'Include nearby landmarks in address line 2'}{'\n'}
                            • {t('tip_label_addresses') || 'Label your addresses for easy identification'}
                        </Text>
                    </Div>
                </ScrollView>
            </Animated.View>
        </Div>
    )
}
