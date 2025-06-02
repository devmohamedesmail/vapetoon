import { Skeleton, Div } from 'react-native-magnus'

const Skeleton_item = () => {
    return (
        <Div flexDir="column" mt="md" w='18%' justifyContent='center' alignItems='center'>
            <Skeleton.Circle h={60} w={60} />
            <Div alignItems="center" mt={10}>
                <Skeleton.Box h={20} w={60}></Skeleton.Box>
            </Div>
        </Div>
    )
}

export default Skeleton_item