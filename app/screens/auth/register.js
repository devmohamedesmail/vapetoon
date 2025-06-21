import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, Div, Snackbar, SnackbarRef, Icon } from 'react-native-magnus';

import Logo from '../../components/logo/logo';
import custom_input from '../../custom_components/custom_input';
import Custom_Button from '../../custom_components/custom_button';
import Ionicons from '@expo/vector-icons/Ionicons';
import custom_colors from '../../config/custom_colors';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/auth_provider';
import Custom_spinner from '../../custom_components/custom_spinner';


export default function Register() {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { auth, handle_register } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const snackbarRef = useRef(null);


    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required(t('name-required')),
            email: Yup.string().email('Invalid email').required(t('email-required')),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required(t('password-required')),
        }),
        onSubmit: async values => {

            setLoading(true)
            try {
                const result = await handle_register(values.username, values.email, values.password)

                if (result !== null) {

                    snackbarRef.current.show(
                        t('register-successful'),
                        {
                            duration: 2000,
                            suffix: <Icon
                                name="checkcircle"
                                color="white"
                                fontSize="md"
                                fontFamily="AntDesign"
                            />
                        }
                    );

                    setTimeout(() => {
                        navigation.navigate('Home')
                    }, 2000)

                }







                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            } finally {
                setLoading(false)
            }

        }
    })

    return (

        <Div flex={1} bg='black'>

            <Div pt={30} px={15}>
                <Button bg="transparent" onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={20} color="white" />
                </Button>
            </Div>


            <Div bg="white" flex={1} mt="30%" position='relative' roundedTopRight={30} roundedTopLeft={30} px={15}>

                <Div my={30}>
                    <Logo w={150} h={30} />
                </Div>
                <custom_input
                    value={formik.values.username}
                    placeholder={t('name')}
                    onChangeText={formik.handleChange('username')}
                    prefix={<AntDesign name="user" size={20} color="black" />}
                    error={formik.errors.username}
                />

                <custom_input
                    value={formik.values.email}
                    placeholder={t('email')}
                    onChangeText={formik.handleChange('email')}
                    prefix={<Feather name="mail" size={18} color="black" />}
                    error={formik.errors.email}
                />
                <custom_input
                    value={formik.values.password}
                    placeholder="*************"
                    onChangeText={formik.handleChange('password')}
                    secureTextEntry={true}
                    icon={<Ionicons name="eye-outline" size={24} color="black" />}
                    prefix={<AntDesign name="lock1" size={18} color="black" />}
                    error={formik.errors.password}

                />

                {loading ? <Custom_spinner /> : <Custom_Button title={t('register')} onPress={formik.handleSubmit} />}

                <Text textAlign='center' fontWeight='bold'> Or </Text>
                <Custom_Button bg={custom_colors.secondary} onPress={() => navigation.navigate('Login')} title={t('login')} />






            </Div>
            <Snackbar
                ref={snackbarRef}
                bg="green600"
                alignSelf='center'
                mb={10}
                h={50}
                w={"80%"}
                color="white"
            ></Snackbar>
        </Div>
    )
}
