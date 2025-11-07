import { Tabs } from 'expo-router';
import BottomNavigator from '../../components/BottomNavigator';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={() => <BottomNavigator />}
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