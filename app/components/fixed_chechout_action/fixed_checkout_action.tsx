import React from 'react'
import { useTranslation } from 'react-i18next'
import { Div, Text, Button } from 'react-native-magnus'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native'
import { useFormikContext } from 'formik'
import { useNavigation } from '@react-navigation/native'

export default function Fixed_Checkout_Action({currentStep,handleNextStep,setCurrentStep,loading,formik}) {
    const { t , i18n} = useTranslation()
    const navigation = useNavigation<any>()
    
    return (
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
                        onPress={()=>formik.handleSubmit()}
                        // disabled={loading}
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
    )
}
