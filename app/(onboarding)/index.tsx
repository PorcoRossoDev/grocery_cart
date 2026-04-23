import { images } from '@/lib/images';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
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

  // const opacity = useRef(new Animated.Value(0)).current;
  // const translate = useRef(new Animated.Value(-200)).current

  // useEffect(() => {
  //   Animated.parallel([
  //     Animated.timing(opacity, {
  //       toValue: 1,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(translate, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: true
  //     })
  //   ]).start();
  // }, []);

  // 
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // 🔥 interpolate giống keyframes

  const translateX = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-100, 30, 0],
  });

  const opacity = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.6, 1],
  });

  const scale = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1.2, 1],
  });

  
  // 
  const boxMove = useRef(new Animated.Value(100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  Animated.parallel([
    Animated.spring(boxMove, {
      toValue: 0,
      friction: 10,
      tension: 40,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }),
  ]).start();


  return (


    <View className="flex-1 relative">
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerClassName='relative'
        renderItem={({ item }) => (
          <View style={{ width, height }} className='flex-1 relative'>
            <ImageBackground
              source={item.image}
              style={{ width, height }}
              className='h-full w-full absolute'
            />
            <View className='relative top-28 px-5'>
              <Animated.Text
                className='text-center text-bold text-3xl'
                style={{
                  opacity,
                  transform: [
                    { translateX },
                    { scale },
                  ]
                }}
              >{item.title}</Animated.Text>
              <Animated.Text 
                className='text-center text-bold text-3xl mt-1'
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: boxMove }],
                }}
              >{item.subtitle}</Animated.Text>
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
            <TouchableOpacity className="py-4">
              <Text 
                className="text-white text-semibold text-lg text-center"
              >
                Get started
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}