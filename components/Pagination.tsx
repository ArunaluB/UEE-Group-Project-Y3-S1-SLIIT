import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { ImageSliderType } from './SliderData';
import Animated, { useAnimatedStyle, interpolate, Extrapolation, SharedValue } from 'react-native-reanimated';

type Props = {
  items: ImageSliderType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get('screen');

const Pagination = ({ items, paginationIndex, scrollX }: Props) => {
  return (
    <View style={styles.container}>
      {items.map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const dotWidth = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [8, 20, 8],
            Extrapolation.CLAMP
          );
          return {
            width: dotWidth,
          };
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              animatedStyle,
              { backgroundColor: paginationIndex === index ? '#222' : '#aaa' },
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: '#aaa',
    width: 8,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 2,
  },
});
