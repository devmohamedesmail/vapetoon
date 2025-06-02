import React from 'react'
import { Skeleton, Div } from 'react-native-magnus'

export default function Category_skeleton() {
    return (
        <Div flexDir="column" mt="md" w='18%'  justifyContent='center' alignItems='center'>
            <Skeleton.Circle h={60} w={60} />
            <Div alignItems="center" mt={10}>
                <Skeleton.Box h={20} w={60}></Skeleton.Box>
            </Div>
        </Div>
    )
}
