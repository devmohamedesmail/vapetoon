import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, Div, Snackbar, SnackbarRef, Icon } from 'react-native-magnus';

import Logo from '../../components/logo/logo';
import custom_input from '../../custom_components/custom_input';
import custom_button from '../../custom_components/custom_button';
import Ionicons from '@expo/vector-icons/Ionicons';
import custom_colors from '../../config/custom_colors';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/auth_provider';
import Custom_spinner from '../../custom_components/custom_spinner';


export default function Login() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { auth, handle_login } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const snackbarRef = useRef(null);
  const [error, setError] = useState(null)


  const formik = useFormik({
    initialValues: {
      identifier: 'user@gmail.com',
      password: '123456789'
    },
    validationSchema: Yup.object().shape({
      identifier: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async values => {
      setLoading(true)
      try {
        const result = await handle_login(values.identifier, values.password)



        if (result === undefined) {
          setError(true)
        } else {
          snackbarRef.current.show(
            t('login-successful'),
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

          console.log("Result", result)
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

        <Div

          borderWidth={3}
          borderColor='white'
          my={30} mt={-50}
          rounded="circle"
          zIndex={100}
          bg="gray"
          w={150}
          h={150}
          flexDir='column'
          justifyContent='center'
          alignItems='center'
          position='absolute' top={-50}
          left="55%"
          style={{
            transform: [{ translateX: -75 }],
          }}


        >
          <Logo w={120} h={20} />
        </Div>


        <Div mt={100}>
          <custom_input
            value={formik.values.identifier}
            placeholder={t('email')}
            onChangeText={formik.handleChange('identifier')}
            prefix={<Feather name="mail" size={14} color="black" />}
            error={formik.errors.identifier}
          />
          <custom_input
            value={formik.values.password}
            placeholder="*************"
            onChangeText={formik.handleChange('password')}
            secureTextEntry={true}
            icon={<Ionicons name="eye-outline" size={18} color="black" />}
            prefix={<AntDesign name="lock1" size={14} color="black" />}
            error={formik.errors.password}

          />
           {error && <Text textAlign='center' color='red'>{t('invalid-credentials')}</Text>}
          {loading ? <Custom_spinner /> : <custom_button title={t('login')} onPress={formik.handleSubmit} />}

          <Text textAlign='center' fontWeight='bold'> Or </Text>
          <custom_button bg={custom_colors.secondary} onPress={() => navigation.navigate('Register')} title={t('register')} />

        </Div>





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
