import React from 'react'
import { Div,Image,Text } from 'react-native-magnus'

export default function Orderitem() {
    return (
        <Div flexDir='col' justifyContent='center' alignItems='center'>
            <Image
                h={80}
                w={80}
                m={10}
                rounded="md"
                source={{
                    uri:
                        "https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
                }}
            />
            <Text>product Title</Text>
        </Div>
    )
}
