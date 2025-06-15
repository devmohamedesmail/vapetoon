import React from 'react'
import { Div, Text } from 'react-native-magnus'

export const CustomSectionTitle = ({ title, subtitle }) => {
  return (
    <Div
      flexDir="row"
      alignItems="center"
      mb={18}
      mt={10}
      px={10}
    >
      <Div
        h={28}
        w={5}
        bg="orange600"
        rounded="xl"
        mr={10}
      />
      <Div>
        <Text fontSize={20} fontWeight="bold" color="black">
          {title}
        </Text>
        {subtitle && (
          <Text fontSize={13} color="gray600" mt={2}>
            {subtitle}
          </Text>
        )}
      </Div>
    </Div>
  )
}