import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import './global.css';

export default function RootLayout() {

  const [loaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
  });

  if (!loaded) return null;

  return <Stack  screenOptions={{ headerShown: false }} />;
}