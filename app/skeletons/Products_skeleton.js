import React from 'react'
import { Div, Skeleton } from 'react-native-magnus'




const Product_skeleton_item = () => {
    return (
        <Div flexDir="column" mt="md" mx={5} w='47%' mb={15}>
            <Skeleton.Box h={100} w='100%'/>
            <Div ml="md" flex={1}>
                <Skeleton.Box mt="sm" />
                <Skeleton.Box mt="sm" w="80%" />
                <Skeleton.Box mt="sm" />
            </Div>
        </Div>
    )
}





function Products_skeleton() {
  return (
    <Div flexDir="row" flexWrap="wrap">
          <Product_skeleton_item />
          <Product_skeleton_item />
          <Product_skeleton_item />
         
    </Div>
  )
}

export default Products_skeleton