import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { ImageSliderType } from './SliderData';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, interpolate, Extrapolation, SharedValue } from 'react-native-reanimated';

type Props = {
  item: ImageSliderType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get('screen');

const SliderItem = ({ item, index, scrollX }: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width*0.25, 0, width*0.25],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, animatedStyle]}>
      <Image source={item.image} style={styles.image} />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.background}
      >
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.speciality}>{item.speciality}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    marginVertical: 10,
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  background: {
    position: 'absolute',
    width: 300,
    height: 400,
    bottom: 0,
    borderRadius: 20,
    padding: 15,
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  textContainer: {
    gap: 8,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  speciality: {
    color: '#fff',
    fontSize: 14,
  },
  phone: {
    color: '#fff',
    fontSize: 12,
  },
  rating: {
    color: '#fff',
    fontSize: 12,
  },
});

export default SliderItem;
