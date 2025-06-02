import { Button, Div, Image ,Text} from 'react-native-magnus'

export default function Account_item({image,onPress,title}) {
  return (
    <Button onPress={onPress} flex={1} mx={5} bg="white">
        <Div flexDir='column' justifyContent='center' alignItems='center'>
            <Image w={40} h={40} source={image}  />
            <Text mt={10}>{title}</Text>
        </Div>
    </Button>
  )
}