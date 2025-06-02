import React, { useContext, useState, useEffect } from 'react'
import { Div, Text } from 'react-native-magnus'
import { DataContext } from '../../../../Context/DataProvider'
import Category_item from './Category_item'
import Category_skeleton from './Category_skeleton'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { api_config } from '../../../../config/api_config'


export default function Categories_Section() {
  const {categories} = useContext(DataContext)
  const navigation = useNavigation();
  const { t } = useTranslation();



  return (
    <Div my={5} bg="white" py={10}>
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
