import React, { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, Dimensions, TextInput, Pressable } from 'react-native'
import { Div, Text, Button, ScrollDiv } from 'react-native-magnus'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { api_config } from '../../config/api_config'


export default function Checkout_Tabs({ currentStep, formik ,paymentMethods,itemCount ,total,subtotal}) {
    const { t, i18n } = useTranslation()
    const navigation = useNavigation<any>()
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(30)).current
    
    useEffect(() => {
        // Animate content in when component mounts or currentStep changes
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
    }, [currentStep])
    
    return (
        <Animated.View
            style={{
                flex: 1,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
            }}
        >
            <ScrollDiv flex={1} px={20} pt={20} pb={40} showsVerticalScrollIndicator={false}>

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
                            <Div mb={150}>
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
                                {paymentMethods && paymentMethods.map((method) => {
                                    const methodTitle = i18n.language === 'en' ? method.title_en : method.title_ar;
                                    const methodDescription = i18n.language === 'en' ? method.description_en : method.description_ar;
                                    const isSelected = formik.values.payment_method === methodTitle;

                                    // Dynamic icon based on method type
                                    const getMethodIcon = () => {
                                        const title = method.title_en?.toLowerCase() || '';
                                        if (title.includes('cash') || title.includes('cod')) return 'money';
                                        if (title.includes('card') || title.includes('credit') || title.includes('debit')) return 'credit-card';
                                        if (title.includes('paypal')) return 'payment';
                                        if (title.includes('apple')) return 'apple';
                                        if (title.includes('google')) return 'payment';
                                        return 'payment'; // default
                                    };

                                    return (
                                        <Pressable
                                            key={method.id}
                                            onPress={() => formik.setFieldValue('payment_method', methodTitle)}
                                            style={({ pressed }) => ({
                                                borderWidth: 2,
                                                borderColor: isSelected ? '#059669' : '#e5e7eb',
                                                borderRadius: 12,
                                                padding: 16,
                                                marginBottom: 12,
                                                backgroundColor: isSelected ? '#f0fdf4' : '#f9fafb',
                                                transform: [{ scale: pressed ? 0.98 : 1 }],
                                            })}
                                        >
                                            <Div flexDir="row" alignItems="center" justifyContent="space-between">
                                                <Div flexDir="row" alignItems="center" flex={1}>
                                                    <Div
                                                        w={48}
                                                        h={48}
                                                        rounded="circle"
                                                        bg={isSelected ? '#059669' : '#e5e7eb'}
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        mr={12}
                                                    >
                                                        <MaterialIcons
                                                            name={getMethodIcon()}
                                                            size={24}
                                                            color={isSelected ? 'white' : '#6b7280'}
                                                        />
                                                    </Div>
                                                    <Div flex={1} pr={8}>
                                                        <Text fontSize={16} fontWeight="600" color="#1f2937" numberOfLines={1}>
                                                            {methodTitle}
                                                        </Text>
                                                        <Text fontSize={10} color="#6b7280" numberOfLines={3} mt={2}>
                                                            {/* {methodDescription} */}
                                                        </Text>
                                                    </Div>
                                                </Div>
                                                {isSelected && (
                                                    <Ionicons name="checkmark-circle" size={24} color="#059669" />
                                                )}
                                            </Div>
                                        </Pressable>
                                    );
                                })}
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
                                <Div flexDir="row" alignItems="center">
                                    {(() => {
                                        // Find the selected payment method from the dynamic array
                                        const selectedMethod = paymentMethods?.find(method => {
                                            const methodTitle = i18n.language === 'en' ? method.title_en : method.title_ar;
                                            return methodTitle === formik.values.payment_method;
                                        });

                                        if (selectedMethod) {
                                            const methodTitle = i18n.language === 'en' ? selectedMethod.title_en : selectedMethod.title_ar;

                                            // Dynamic icon based on method type
                                            const getMethodIcon = () => {
                                                const title = selectedMethod.title_en?.toLowerCase() || '';
                                                if (title.includes('cash') || title.includes('cod')) return 'money';
                                                if (title.includes('card') || title.includes('credit') || title.includes('debit')) return 'credit-card';
                                                if (title.includes('paypal')) return 'payment';
                                                if (title.includes('apple')) return 'apple';
                                                if (title.includes('google')) return 'payment';
                                                return 'payment'; // default
                                            };

                                            return (
                                                <>
                                                    <MaterialIcons
                                                        name={getMethodIcon()}
                                                        size={18}
                                                        color="#6b7280"
                                                        style={{ marginRight: 8 }}
                                                    />
                                                    <Text fontSize={14} fontWeight="600" color="#1f2937">
                                                        {methodTitle}
                                                    </Text>
                                                </>
                                            );
                                        }

                                        // Fallback for backward compatibility
                                        const fallbackIcon = formik.values.payment_method?.toLowerCase().includes('cod') || formik.values.payment_method?.toLowerCase().includes('cash') ? 'money' : 'credit-card';
                                        const fallbackName = formik.values.payment_method?.toLowerCase().includes('cod') || formik.values.payment_method?.toLowerCase().includes('cash')
                                            ? (t('cash_on_delivery') || 'Cash on Delivery')
                                            : (t('credit_debit_card') || 'Credit/Debit Card');

                                        return (
                                            <>
                                                <MaterialIcons
                                                    name={fallbackIcon}
                                                    size={18}
                                                    color="#6b7280"
                                                    style={{ marginRight: 8 }}
                                                />
                                                <Text fontSize={14} fontWeight="600" color="#1f2937">
                                                    {fallbackName}
                                                </Text>
                                            </>
                                        );
                                    })()}
                                </Div>
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
    )
}
