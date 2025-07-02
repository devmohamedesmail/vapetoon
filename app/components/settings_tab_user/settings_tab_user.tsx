import React from 'react'
import { Div, Text, Button } from 'react-native-magnus'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { Pressable, Alert } from 'react-native'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth_provider'
import Toast from 'react-native-toast-message'
import Toggle_Lang from '../toggle_lang/toggle_lang'
import { useNavigation } from '@react-navigation/native'

export default function Settings_Tab_User() {
    const { t } = useTranslation();
    const { handle_logout } = useContext(AuthContext);
    const navigation = useNavigation<any>();
    return (
        <Div p={20} pb={150}>
            <Div flexDir="row" alignItems="center" mb={24}>
                <Ionicons name="settings-outline" size={24} color="#f59e0b" />
                <Text fontSize={20} fontWeight="700" color="#1f2937" ml={12}>
                    {t('settings') || 'Settings'}
                </Text>
            </Div>

            <Div>

                <Toggle_Lang />

                {/* developer profile */}
                <Pressable onPress={() => navigation.navigate('Developer')}>
                    <Div flexDir="row" alignItems="center" justifyContent="space-between" bg="white" rounded={16} p={16} mb={12} borderWidth={1} borderColor="#f0f0f0">
                        <Div flexDir="row" alignItems="center">
                            <Ionicons name="code-slash" size={20} color="#6b7280" />
                            <Text fontSize={16} fontWeight="500" color="#1f2937" ml={12}>
                                {t('developer') || 'Developer Profile'}
                            </Text>
                        </Div>
                        <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                    </Div>
                </Pressable>


                 {/* developer pprofile */}
                 {/* Notifications Setting */}
                <Pressable onPress={() => navigation.navigate('Notifications')}>
                    <Div flexDir="row" alignItems="center" justifyContent="space-between" bg="white" rounded={16} p={16} mb={12} borderWidth={1} borderColor="#f0f0f0">
                        <Div flexDir="row" alignItems="center">
                            <Ionicons name="notifications" size={20} color="#6b7280" />
                            <Text fontSize={16} fontWeight="500" color="#1f2937" ml={12}>
                                {t('notifications') || 'Notifications'}
                            </Text>
                        </Div>
                        <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                    </Div>
                </Pressable>

                {/* Privacy Setting */}
                <Pressable onPress={() => navigation.navigate('Privacy')}>
                    <Div flexDir="row" alignItems="center" justifyContent="space-between" bg="white" rounded={16} p={16} mb={12} borderWidth={1} borderColor="#f0f0f0">
                        <Div flexDir="row" alignItems="center">
                            <Ionicons name="shield-checkmark" size={20} color="#6b7280" />
                            <Text fontSize={16} fontWeight="500" color="#1f2937" ml={12}>
                                {t('privacy') || 'Privacy'}
                            </Text>
                        </Div>
                        <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                    </Div>
                </Pressable>

                {/* Help & Support */}
                <Pressable onPress={() => navigation.navigate('Help')}>
                    <Div flexDir="row" alignItems="center" justifyContent="space-between" bg="white" rounded={16} p={16} mb={12} borderWidth={1} borderColor="#f0f0f0">
                        <Div flexDir="row" alignItems="center">
                            <Ionicons name="help-circle" size={20} color="#6b7280" />
                            <Text fontSize={16} fontWeight="500" color="#1f2937" ml={12}>
                                {t('help_support') || 'Help & Support'}
                            </Text>
                        </Div>
                        <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                    </Div>
                </Pressable>

                {/* Logout Button */}
                <Button
                    bg="#ef4444"
                    h={48}
                    rounded={12}
                    mt={24}
                    flexDir="row"
                    alignItems="center"
                    justifyContent="center"
                    onPress={() => {
                        Alert.alert(
                            t('logout') || 'Logout',
                            t('logout_confirmation') || 'Are you sure you want to logout?',
                            [
                                { text: t('cancel') || 'Cancel', style: 'cancel' },
                                {
                                    text: t('logout') || 'Logout',
                                    style: 'destructive',
                                    onPress: () => {
                                        handle_logout();
                                        Toast.show({
                                            type: 'success',
                                            text1: t('logged_out') || 'Logged out successfully',
                                            visibilityTime: 2000,
                                        });
                                    }
                                }
                            ]
                        );
                    }}
                >
                    <Ionicons name="log-out-outline" size={18} color="white" style={{ marginRight: 8 }} />
                    <Text color="white" fontSize={16} fontWeight="600">
                        {t('logout') || 'Logout'}
                    </Text>
                </Button>
            </Div>
        </Div>
    )
}
