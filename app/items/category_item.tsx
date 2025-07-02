import React, { useRef, useEffect } from 'react'
import { Animated, Pressable, Dimensions } from 'react-native'
import { Div, Image, Text } from 'react-native-magnus'
import { LinearGradient } from 'expo-linear-gradient'

const { width: screenWidth } = Dimensions.get('window')
const itemWidth = (screenWidth - 60) / 4

export default function category_item({ name, image, onPress, index = 0 }) {
    // Animation values
    const scaleAnim = useRef(new Animated.Value(0.8)).current
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(30)).current
    const rotateAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        // Staggered entrance animation with more sophistication
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                delay: index * 80,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 120,
                friction: 8,
                delay: index * 80,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 100,
                friction: 7,
                delay: index * 80,
                useNativeDriver: true,
            }),
        ]).start()
    }, [index])

    const animatePress = () => {
        // Enhanced press animation with rotation
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0.9,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 150,
                    friction: 6,
                    useNativeDriver: true,
                }),
                Animated.timing(rotateAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                onPress && onPress()
            })
        })
    }

    // Fallback image URL with better placeholder
    const imageUrl = image || 'https://via.placeholder.com/100x100/6366f1/ffffff?text=📁'

    // Rotation interpolation
    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '5deg'],
    })

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [
                    { translateY: slideAnim },
                    { scale: scaleAnim },
                    { rotate: rotation }
                ],
                width: itemWidth,
                marginBottom: 20,
                alignItems: 'center',
            }}
        >
            <Pressable
                onPress={animatePress}
                style={({ pressed }) => ({
                    alignItems: 'center',
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
            >
                {/* Enhanced Image Container */}
                <Div
                    position="relative"
                    mb={12}
                    alignItems="center"
                    justifyContent="center"
                >
                    {/* Outer Ring with Gradient Effect */}
                    <LinearGradient
                        colors={['#6366f1', '#8b5cf6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            shadowColor: '#6366f1',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.25,
                            shadowRadius: 8,
                            elevation: 8,
                        }}
                    >
                        {/* Inner Circle with Image */}
                        <Div
                            w={76}
                            h={76}
                            rounded="circle"
                            bg="white"
                            alignItems="center"
                            justifyContent="center"
                            borderWidth={2}
                            borderColor="rgba(255, 255, 255, 0.9)"
                        >
                            <Image
                                h={68}
                                w={68}
                                rounded="circle"
                                source={{ uri: imageUrl }}
                                resizeMode="cover"
                            />
                        </Div>
                    </LinearGradient>

                    {/* Premium Shine Effect */}
                    <Div
                        position="absolute"
                        top={10}
                        left={10}
                        w={24}
                        h={24}
                        rounded="circle"
                        bg="rgba(255, 255, 255, 0.4)"
                        style={{
                            shadowColor: '#ffffff',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.6,
                            shadowRadius: 6,
                        }}
                    />

                    {/* Decorative Dots */}
                    <Div
                        position="absolute"
                        top={-4}
                        right={-4}
                        w={12}
                        h={12}
                        rounded="circle"
                        bg="#f59e0b"
                        borderWidth={2}
                        borderColor="white"
                    />
                </Div>

                {/* Enhanced Category Name */}
                <Text
                    fontSize={12}
                    fontWeight="700"
                    color="#111827"
                    textAlign="center"
                    numberOfLines={2}
                    lineHeight={16}
                    style={{
                        width: itemWidth - 4,
                        textShadowColor: 'rgba(0, 0, 0, 0.1)',
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                    }}
                >
                    {name || 'Category'}
                </Text>
            </Pressable>
        </Animated.View>
    )
}
