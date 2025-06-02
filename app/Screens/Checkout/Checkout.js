import React, { useContext, useState, useRef } from 'react'
import { Div, ScrollDiv, Text, Snackbar, Icon, Button } from 'react-native-magnus'
import Custom_colors from '../../config/Custom_colors'
import Header from '../../Component/Header/Header';
import Bottom_Navbar from '../../Component/Bottom_Navbar/Bottom_Navbar';
import Custom_button from '../../Custom_Components/Custom_button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Cart_item from '../../items/Cart_item';
import Custom_input from '../../Custom_Components/Custom_input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Custom_spinner from '../../Custom_Components/Custom_spinner';
import { api_config } from '../../config/api_config';
import { AuthContext } from '../../Context/AuthProvider';




export default function Checkout() {

  const { t } = useTranslation();
  const cartItems = useSelector((state) => state.cart.products);
  const [loading, setLoading] = useState(false)
  const snackbarRef = useRef(null);
  const { auth } = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      name: auth?.user?.username,
      phone: '',
      address: '',
      payment_method: '',
      order: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('name-required')),
      phone: Yup.string().required('phone-required'),
      address: Yup.string().required('address-required'),

    }),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const response = await axios.post(
          `${api_config.url}/api/orders`,
          {
            data: {
              user_id: auth?.user?.id || 3,
              name: values.name,
              phone: values.phone,
              address: values.address,
              order: cartItems,
              payment_method: values.payment_method
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${api_config.token}`,
            },
          }
        )
        snackbarRef.current.show(
          t('order-sent-successfully'),
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
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      } finally {
        setLoading(false)
      }
    },
  })








  return (
    <Div flex={1} bg={Custom_colors.screen}>
      <Div pt={15} bg="white">
        <Header bg="transparent" />
      </Div>
      <ScrollDiv>

        <Text textAlign='center' py={15} mb={10} fontWeight='bold'>{t('checkout')}</Text>


        {cartItems && cartItems.length > 0 ? (
          <Div px={5}>
            <Div bg="white" py={10} my={5}>
              {cartItems.map((item, index) => (
                <Cart_item key={index} item={item} />
              ))}
            </Div>
            <Div bg="white" py={10} my={5}>
              <Text textAlign='center' fontWeight='bold' my={5}>{t('billing-info')}</Text>
              <Custom_input placeholder={t('name')} value={formik.values.name} onChangeText={formik.handleChange('name')} error={formik.errors.name} />
              <Custom_input placeholder={t('phone')} value={formik.values.phone} onChangeText={formik.handleChange('phone')} error={formik.errors.phone} />
              <Custom_input placeholder={t('address')} value={formik.values.address} onChangeText={formik.handleChange('address')} error={formik.errors.address} />


              {/* Payment Options */}
              <Text fontWeight="bold" mt={10} mb={5}>{t('payment-method')}</Text>
              <Div flexDir="column" justifyContent="center" mb={10}>
                <Button
                  bg={formik.values.payment_method === 'cod' ? "green600" : "gray200"}
                  color={formik.values.payment_method === 'cod' ? "white" : "black"}
                  mr={10}
                  px={15}
                  w={"100%"}
                  mb={10}
                  rounded={20}
                  h={60}
                  onPress={() => formik.setFieldValue('payment_method', 'cod')}
                >
                  {t('cash-on-delivery')}
                </Button>
                <Button
                  bg={formik.values.payment_method === 'visa' ? "green600" : "gray200"}
                  color={formik.values.payment_method === 'visa' ? "white" : "black"}
                  px={15}
                  w={"100%"}
                  mb={10}
                  rounded={20}
                    h={60}
                  onPress={() => formik.setFieldValue('payment_method', 'visa')}
                >
                  {t('pay-with-visa')}
                </Button>
              </Div>
              {formik.errors.payment_method && (
                <Text color="red600" fontSize={12} mb={5}>{formik.errors.payment_method}</Text>
              )}











              {loading ? <Custom_spinner /> : <Custom_button title={t('send-order')} onPress={formik.handleSubmit} />}

            </Div>
          </Div>


        ) : (<Div><Text>go shopping</Text></Div>)}



        <Snackbar
          ref={snackbarRef}
          bg="green600"
          alignSelf='center'
          mb={10}
          h={50}
          w={"80%"}
          color="white"
        ></Snackbar>
      </ScrollDiv>


      <Bottom_Navbar />
    </Div>
  )
}
