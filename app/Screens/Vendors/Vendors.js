import React, { use, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Div, Text, Image, Input, Icon, ScrollDiv } from 'react-native-magnus';
import custom_colors from '../../config/custom_colors';
import { api_config } from '../../config/api_config';
import axios from 'axios';
import Vendor_item from '../../items/vendor_item';
import Skeleton_item from '../../items/skeleton_item';
import BackBtn from '../../components/header/back_btn';
import Bottom_Navbar from '../../components/bottom_navbar/bottom_navbar';


export default function Vendors() {
  const [vendors, setVendors] = useState(null);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);







  const fetch_all_vendors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api_config.url}/api/vendors?populate[image]=true`, {
        headers: {
          Authorization: `Bearer ${api_config.token}`,
        }
      })

      const vendors = response.data.data;
      setVendors(vendors);
      setFilteredVendors(vendors);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetch_all_vendors();
  }, []);




  const handleSearch = (text) => {
    setSearch(text);
    if (!text) {
      setFilteredVendors(vendors);
      return;
    }
    setFilteredVendors(
      vendors.filter(v =>
        v.vendor_name?.toLowerCase().includes(text.toLowerCase())
      )
    );
  };


  return (
    <Div flex={1} bg={custom_colors.screen} p={10}>

      <Div pt={40}>
        <BackBtn />
        <Input
          mt={10}
          placeholder="Search vendors"
          value={search}
          onChangeText={handleSearch}
          suffix={<Icon name="search" color="gray900" fontFamily="Feather" />}
          mb={15}
          bg="white"
          rounded={20}
          px={15}
          borderColor="gray300"
          borderWidth={1}
          h={40}
        />
      </Div>







      <ScrollDiv>
        {loading ? (
          <Div flexDir='row' flexWrap='wrap' justifyContent='space-between'>
            <Skeleton_item />
            <Skeleton_item />
            <Skeleton_item />
            <Skeleton_item />
            <Skeleton_item />
            <Skeleton_item />
          </Div>
        ) : (
          <Div flexDir='row' flexWrap='wrap' justifyContent='space-between' alignItems='center' px={5}>
            {filteredVendors && filteredVendors.length > 0 ? (
              filteredVendors.map((item) => (
                <Vendor_item item={item} key={item.id} />
              ))
            ) : (
              <Text mt={30} textAlign="center" w="100%">No vendors found.</Text>
            )}
          </Div>
        )}
      </ScrollDiv>
      <Bottom_Navbar />


    </Div>
  )
}