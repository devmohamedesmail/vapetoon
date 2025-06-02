
import { useNavigation } from '@react-navigation/native'
import { Button, Div, Image ,Text} from 'react-native-magnus'

const Vendor_item = ({ item }) => {
    const navigation = useNavigation()

  
    console.log(item)
    return (
        <Button onPress={() => navigation.navigate('Vendor', { vendorId: item.id })} bg="white" p={0} mb={7} w="32%" rounded={10}>

            <Div flexDir='column' justifyContent='center' alignItems='center' mb={10}  w="100%">
                <Image source={{ uri: `${item.image.formats.thumbnail.url}` }} w="100%" h={100} rounded='md' />
                <Text mt={10} textAlign='center' fontWeight='bold'>{item.vendor_name}</Text>
            </Div>
        </Button>
    )
}

export default Vendor_item