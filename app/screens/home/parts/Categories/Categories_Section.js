import React, { useContext, useState, useEffect } from 'react'
import { Div, Text } from 'react-native-magnus'
import { DataContext } from '../../../../context/data_provider'
import Category_item from './Category_item'
import Category_skeleton from './Category_skeleton'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { api_config } from '../../../../config/api_config'
import { CustomSectionTitle } from '../../../../custom_components/custom_section_title'


export default function Categories_Section() {
  const {categories} = useContext(DataContext)
  const navigation = useNavigation();
  const { t } = useTranslation();



  return (
    <Div my={5} bg="white" py={10}>
      <CustomSectionTitle title={t('shop-Categories')} subtitle={t('shop-Categories')} />
      {categories && categories.length > 0 ? (
        <Div flexDir='row' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
          {categories.map((category, index) => (
            <Category_item
              name={category.title}
              key={index}
              image={`${category.image.url}`}
              onPress={() => {
                navigation.navigate('Shop', { category: category })
              }} />
          ))
          }
        </Div>
      ) :
        (
          <Div flexDir='row' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
            <Category_skeleton />
            <Category_skeleton />
            <Category_skeleton />
            <Category_skeleton />
            <Category_skeleton />
            <Category_skeleton />
            <Category_skeleton />
          </Div>
        )}
    </Div>
  )
}
