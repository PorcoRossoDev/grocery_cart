import { images } from '@/lib/images';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {

  const { width, height } = Dimensions.get('window');


  const onboardingData = [
    {
      id: '1',
      title: 'Premium Food',
      subtitle: 'At Your Doorstep',
      description: 'Lorem ipsum dolor sit amet...',
      image: require('@/assets/images/onBoard_1.png'),
    },
    {
      id: '2',
      title: 'Fresh Ingredients',
      subtitle: 'Everyday',
      description: 'Fresh and healthy...',
      image: require('@/assets/images/onBoard_1.png'),
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

  return (


    <View className="flex-1">
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerClassName='bg-yellow-300'
        renderItem={({ item }) => (
          <View style={{ width, height }} className='flex-1 relative'>
            <Image
              source={images.onBoard_1}
              className='w-full h-1/2'
              resizeMode='cover'
            />
            <View
              className="flex-1 w-full z-10 relative bg-red-300"
            >
              <Image
                source={images.cur}
                className='w-full absolute -top-16 h-full'
                resizeMode='cover'
              />
              <View className='flex-1 pt-5 px-5 relative'>
                <View className='flex-1 flex-col justify-between relative'>
                  <View>
                    <Text className='text-bold text-center text-3xl'>Premium Food</Text>
                    <Text className='text-bold text-center text-3xl mt-1'>At Your Doorstep</Text>

                    <Text className='text-regular text-center text-md mt-8 text-[#868889]'>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                    </Text>

                    {/* Pagination */}
                    <View className="w-full flex-row justify-center mt-10">
                      {onboardingData.map((_, index) => (
                        <View
                          key={index}
                          className={`h-2 w-2 mx-1 rounded-full ${currentIndex === index
                              ? 'bg-green-500'
                              : 'bg-gray-300'
                            }`}
                        />
                      ))}
                    </View>
                  </View>

                  <LinearGradient
                    colors={['#AEDC81', '#6CC51D']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ borderRadius: 14 }}
                    className=''
                  >
                    <TouchableOpacity className="py-4">
                      <Text className="text-white text-semibold text-lg text-center">
                        Get started
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}