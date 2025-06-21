import React from 'react'
import { Button, Div, Image, Text } from 'react-native-magnus'

export default function Category_item({name , image, onPress}) {
  return (
    <Button bg='transparent' w='23%' mb={10} mx={2} p={0} flexDir='column' justifyContent='center' alignItems='center' onPress={onPress}>
      <Image
        h={90}
        w={90}
        rounded='circle'
        source={{
          uri:`${image}`,
        }}
      />
      <Text textAlign='center' fontSize={10} fontWeight='semi-bold' mt={8}>{name}</Text>
    </Button>
  )
}


