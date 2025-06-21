import React, { useEffect } from "react";
import { StatusBar, Pressable } from "react-native";
import { Div, Button, Text } from "react-native-magnus";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import Logo from "../logo/logo";
import HeaderItem from "./header_item";
import BackBtn from "./back_btn";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import SearchComponent from "../search_component/search_component";
import { useTranslation } from "react-i18next";

export default function Header({ 
  logo = false, 
  bg = "white", 
  title = "", 
  showSearch = true, 
  showWishlist = true,
  showNotifications = false,
  gradient = false,
  transparent = false,
  searchPlaceholder = ""
}) {
  const { t } = useTranslation();
  const wishlist = useSelector(state => state.wishlist.items);
  const navigation = useNavigation();

  const HeaderContent = () => (
    <Div
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      bg={transparent ? "transparent" : bg}
      pt={50}
      pb={16}
      px={20}
    >
      {/* Left Section */}
      <Div flexDir="row" alignItems="center" flex={showSearch ? 0.2 : 0.3}>
        {logo ? (
          <Div flexDir="row" alignItems="center">
            <Logo />
            {showNotifications && (
              <Pressable
                onPress={() => navigation.navigate("Notifications")}
                style={({ pressed }) => ({
                  marginLeft: 12,
                  opacity: pressed ? 0.7 : 1,
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                })}
              >
                <Div
                  w={44}
                  h={44}
                  rounded="circle"
                  bg={gradient ? "rgba(255,255,255,0.2)" : "rgba(31, 41, 55, 0.1)"}
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <Ionicons 
                    name="notifications-outline" 
                    size={22} 
                    color={gradient ? "white" : "#1f2937"} 
                  />
                  {/* Notification badge */}
                  <Div
                    position="absolute"
                    top={8}
                    right={8}
                    w={8}
                    h={8}
                    rounded="circle"
                    bg="#ef4444"
                  />
                </Div>
              </Pressable>
            )}
          </Div>
        ) : (
          <Div flexDir="row" alignItems="center">
            <BackBtn color={gradient ? "white" : "#1f2937"} />
            {title && !showSearch && (
              <Text 
                fontSize={20} 
                fontWeight="700" 
                color={gradient ? "white" : "#1f2937"}
                ml={12}
                numberOfLines={1}
              >
                {title}
              </Text>
            )}
          </Div>
        )}
      </Div>

      {/* Center Section - Enhanced Search */}
      {showSearch && (
        <Div flex={1} mx={showWishlist ? 16 : 8}>
          <SearchComponent 
            placeholder={searchPlaceholder || t('search_products') || 'Search products...'}
            gradient={gradient}
          />
        </Div>
      )}

      {/* Right Section - Wishlist Only */}
      <Div flexDir="row" alignItems="center" flex={0.2} justifyContent="flex-end">
        {showWishlist && (
          <Pressable
            onPress={() => navigation.navigate("Wishlist")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Div position="relative">
              <Div
                w={44}
                h={44}
                rounded="circle"
                bg={gradient ? "rgba(255,255,255,0.2)" : "rgba(31, 41, 55, 0.1)"}
                alignItems="center"
                justifyContent="center"
              >
                <Ionicons 
                  name={wishlist.length > 0 ? "heart" : "heart-outline"} 
                  size={22} 
                  color={wishlist.length > 0 ? "#ef4444" : (gradient ? "white" : "#1f2937")} 
                />
              </Div>
              {wishlist.length > 0 && (
                <Div
                  position="absolute"
                  top={-4}
                  right={-4}
                  minW={20}
                  h={20}
                  rounded="circle"
                  bg="#ef4444"
                  alignItems="center"
                  justifyContent="center"
                  px={6}
                >
                  <Text 
                    fontSize={12} 
                    fontWeight="600" 
                    color="white"
                    textAlign="center"
                  >
                    {wishlist.length > 99 ? '99+' : wishlist.length}
                  </Text>
                </Div>
              )}
            </Div>
          </Pressable>
        )}
      </Div>
    </Div>
  );

  if (gradient) {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
        <LinearGradient
          colors={['#1f2937', '#374151']}
          style={{ width: '100%' }}
        >
          <HeaderContent />
        </LinearGradient>
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={bg} />
      <HeaderContent />
    </>
  );
}
