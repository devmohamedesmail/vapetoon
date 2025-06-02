import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Button } from 'react-native-magnus'
import Custom_colors from '../config/Custom_colors';

export default function Custom_spinner() {
  return (
    <Button bg={Custom_colors.primary} w="100%" p={0} h={50}>
        <ActivityIndicator size="large" color="white" />
    </Button>
    
  )
}