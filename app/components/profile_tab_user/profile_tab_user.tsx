import React from 'react'
import { useTranslation } from 'react-i18next'
import { Div, Text, Button } from 'react-native-magnus'
import { Ionicons } from '@expo/vector-icons'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth_provider'

export default function Profile_Tab_User() {
    const { t } = useTranslation()
    const { auth } = useContext(AuthContext)
  return (
     <Div p={20} pb={150}>
                <Div flexDir="row" alignItems="center" mb={24}>
                    <Ionicons name="person-outline" size={24} color="#8b5cf6" />
                    <Text fontSize={20} fontWeight="700" color="#1f2937" ml={12}>
                        {t('profile_info') || 'Profile Information'}
                    </Text>
                </Div>
    
                <Div>
                    {/* Name Field */}
                    <Div mb={16} bg="white" rounded={16} p={16} borderWidth={1} borderColor="#f0f0f0">
                        <Div flexDir="row" alignItems="center" mb={8}>
                            <Ionicons name="person" size={20} color="#6b7280" />
                            <Text fontSize={14} fontWeight="600" color="#374151" ml={8}>
                                {t('full_name') || 'Full Name'}
                            </Text>
                        </Div>
                        <Text fontSize={16} color="#1f2937" fontWeight="500">
                            {auth?.user?.username || 'Not provided'}
                        </Text>
                    </Div>
    
                    {/* Email Field */}
                    <Div mb={16} bg="white" rounded={16} p={16} borderWidth={1} borderColor="#f0f0f0">
                        <Div flexDir="row" alignItems="center" mb={8}>
                            <Ionicons name="mail" size={20} color="#6b7280" />
                            <Text fontSize={14} fontWeight="600" color="#374151" ml={8}>
                                {t('email_address') || 'Email Address'}
                            </Text>
                        </Div>
                        <Text fontSize={16} color="#1f2937" fontWeight="500">
                            {auth?.user?.email || 'Not provided'}
                        </Text>
                    </Div>
    
                    {/* Phone Field */}
                    <Div mb={16} bg="white" rounded={16} p={16} borderWidth={1} borderColor="#f0f0f0">
                        <Div flexDir="row" alignItems="center" mb={8}>
                            <Ionicons name="call" size={20} color="#6b7280" />
                            <Text fontSize={14} fontWeight="600" color="#374151" ml={8}>
                                {t('phone_number') || 'Phone Number'}
                            </Text>
                        </Div>
                        <Text fontSize={16} color="#1f2937" fontWeight="500">
                            {auth?.user?.phone || 'Not provided'}
                        </Text>
                    </Div>
    
                    {/* Edit Profile Button */}
                    <Button
                        bg="#8b5cf6"
                        h={48}
                        rounded={12}
                        mt={16}
                        flexDir="row"
                        alignItems="center"
                        justifyContent="center"
                        onPress={() => {/* Navigate to edit profile */}}
                    >
                        <Ionicons name="create-outline" size={18} color="white" style={{ marginRight: 8 }} />
                        <Text color="white" fontSize={16} fontWeight="600">
                            {t('edit_profile') || 'Edit Profile'}
                        </Text>
                    </Button>
                </Div>
            </Div>
  )
}
