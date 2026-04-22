import { images } from '@/lib/images';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler, useAnimatedStyle, useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const { width, height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  const onboardingData = [
    {
      id: '1',
      title: 'Get Discounts',
      subtitle: 'On All Products',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
      image: images.splash_1,
    },
    {
      id: '2',
      title: 'Buy Premium',
      subtitle: 'Quality Fruits',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
      image: images.splash_2,
    },
    {
      id: '3',
      title: 'Buy Quality',
      subtitle: 'Dairy Products',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
      image: images.splash_3,
    },
    {
      id: '4',
      title: 'Welcome to',
      subtitle: '',
      sub_image: images.logo,
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
      image: images.splash_4,
    },
  ];


  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (e: any) => {
    const index = Math.round(
      e.nativeEvent.contentOffset.x / width
    );
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
      });
    } else {
      console.log('Go to app'); // router.replace(...)
    }
  };

  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  // 1. Tạo shared value
  const translateX = useSharedValue(0);

  // 2. Gắn vào style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));


  let [count, setCount] = useState(0)

  // 3. Khi bấm → animate
  const handleMove = () => {
    translateX.value = withTiming(
      translateX.value === 0 ? 200 : 0,
      { duration: 500 }
    );
    setCount(count++);
  };

  useEffect(() => {
    console.log('chạy đúng 1 lần');
  }, []);

  return (


    <View className="flex-1">
      <Animated.FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerClassName=''
        renderItem={({ item }) => (
          <View style={{ width, height }} className='flex-1 relative'>
            <ImageBackground
              source={item.image}
              className='h-full w-full absolute'
            />
            <View className='relative top-28 px-5'>
              <Text
                key={`title-${currentIndex}`}
                className='text-center text-bold text-3xl'
              >{item.title}</Text>
              <Text 
                key={`sub-${currentIndex}`}
                className='text-center text-bold text-3xl mt-1'
              >{item.subtitle}</Text>
              {
                item.sub_image && (
                  <View className='flex-center'>
                    <Image 
                      source={item.sub_image}
                      className='w-44'
                      resizeMode='contain'
                    />
                  </View>
                )
              }
              <Text
                key={`desc-${currentIndex}`}
                className='text-regular text-md mt-5 text-center'
              >{item.description}</Text>
            </View>
          </View>
        )}
      />

      <View
        style={{
          bottom: insets.bottom + 10,
        }}
        className='absolute w-full'
      >
        <View className='px-5'>
          <View className='flex-row flex-center my-10'>
            {
              onboardingData.map((_, index) => (
                <View key={index} className={`h-2 w-2 mx-1 rounded-full ${currentIndex === index ? 'bg-green-500' : 'bg-gray-300'}`} />
              ))
            }
          </View>
          <LinearGradient
            colors={['#AEDC81', '#6CC51D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 14 }}
            className=''
          >
            <AnimatedTouchable onPress={handleMove} className="py-4">
              <Text className="text-white text-semibold text-lg text-center">
                Get started ({count})
              </Text>
            </AnimatedTouchable>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}