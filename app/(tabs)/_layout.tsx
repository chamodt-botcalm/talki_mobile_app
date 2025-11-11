import { Tabs, usePathname } from 'expo-router';
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import BottomNavigator from '../../components/BottomNavigator';
import MessageBottomTab from '@/components/messageBottomTab';

export default function TabLayout() {
  const pathname = usePathname();
  
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => subscription?.remove();
  }, []);

// Base dimensions (mobile: w-430 h-932, tablet: w-834 h-1194)
  const BASE_WIDTH = 430;
  const BASE_HEIGHT = 932;
  const TABLET_WIDTH = 834;
  const TABLET_HEIGHT = 1194;

  // Detect device type
  const isTablet = dimensions.width >= 600 || dimensions.height >= 1000;

  // Use tablet base if detected
  const currentBaseWidth = isTablet ? TABLET_WIDTH : BASE_WIDTH;
  const currentBaseHeight = isTablet ? TABLET_HEIGHT : BASE_HEIGHT;

  // Detect orientation
  const isLandscape = dimensions.width > dimensions.height;

  // Scale functions
  const scaleWidth = (size: number) => (dimensions.width / currentBaseWidth) * size;
  const scaleHeight = (size: number) => (dimensions.height / currentBaseHeight) * size;

  // Responsive scale factor (use the smaller scale to prevent overflow)
  const scale = Math.min(
    dimensions.width / currentBaseWidth,
    dimensions.height / currentBaseHeight
  );



  const isChatScreen = pathname === '/chat-screen';
  const shouldShowMessageBottomTab = isTablet && isChatScreen;

  return (
    <Tabs
      tabBar={() => shouldShowMessageBottomTab ? <MessageBottomTab/> : <BottomNavigator />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="wallet" />
      <Tabs.Screen name="chat-screen" />
      <Tabs.Screen name="contact" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}