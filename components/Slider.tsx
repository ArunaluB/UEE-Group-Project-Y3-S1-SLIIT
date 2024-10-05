import { View, StyleSheet, ViewToken } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { ImageSliderType } from './SliderData';
import SliderItem from './SliderItem';
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Pagination from '../components/Pagination';

type Props = {
    itemList: ImageSliderType[];
};

const Slider = ({ itemList }: Props) => {
    const scrollX = useSharedValue(0);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const [data,setData] = useState(itemList);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay,setIsAutoPlay] =useState(true);
    const interval = useRef<NodeJS.Timeout>();
    const offset = useSharedValue(0);
    // Handler for scrolling using reanimated
    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });
    useEffect(() => {
        // Add any side effects or cleanup code here
    }, []);

    // Viewable items handler to track current page index
    const onViewableItemsChanged = ({viewableItems}:{viewableItems:ViewToken[]}) => {
        if(viewableItems[0].index !== undefined && viewableItems[0].index !== null){
            setPaginationIndex(viewableItems[0].index % itemList.length);
        }
    }

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    const viewbilityConfigCallBackPairs = useRef([
      {viewabilityConfig, onViewableItemsChanged},
     ]);

    return (
        <View>
            <Animated.FlatList
                data={itemList}
                renderItem={({ item, index }) => (
                    <SliderItem item={item} index={index} scrollX={scrollX} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={onScrollHandler}
                scrollEventThrottle={16}
                viewabilityConfigCallbackPairs = {viewbilityConfigCallBackPairs.current}
                onEndReached = {()=> setData([...data,...itemList])}
                onEndReachedThreshold={0.5}
            />
            <Pagination items={itemList} paginationIndex={paginationIndex} scrollX={scrollX} />
        </View>
    );
};

export default Slider;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
