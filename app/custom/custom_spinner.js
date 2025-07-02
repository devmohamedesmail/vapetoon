import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Button } from 'react-native-magnus'
import custom_colors from '../config/custom_colors';

export default function Custom_spinner() {
  return (
    <Button bg={custom_colors.primary} w="100%" p={0} h={50}>
        <ActivityIndicator size="large" color="white" />
    </Button>
    
  )
}