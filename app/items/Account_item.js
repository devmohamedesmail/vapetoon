import { Button, Div, Image ,Text} from 'react-native-magnus'
import Custom_colors from '../config/Custom_colors'

export default function Account_item({image,onPress,title}) {
  return (
    <Button onPress={onPress} py={4} fontSize={12} mx={5} bg={Custom_colors.primary} color='white'>       
       {title}
    </Button>
  )
}