import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Inter': require('../assets/fonts/Inter_18pt-Regular.ttf'),
  });

  useEffect(() => {
    const url = Linking.createURL('/');
    console.log('App URL:', url);
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="connect-wallet" options={{ headerShown: false }} />
        <Stack.Screen name="user-account" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(message)" options={{ headerShown: false }} />
        <Stack.Screen name="settings-info" options={{ headerShown: false }} />
        <Stack.Screen name="sticker" options={{ headerShown: false }} />
         <Stack.Screen name="notifications" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
