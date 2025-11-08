import React from 'react'
import { Stack,Tabs } from 'expo-router';
import MessageBottom from '@/components/messageBottom';
import BottomNavigator from '@/components/BottomNavigator';

const messagelayout = () => {
  return (
    <Tabs
         tabBar={() => <MessageBottom />}
         screenOptions={{
           headerShown: false,
         }}
       >
         <Tabs.Screen name="messagescreen" />
       </Tabs>
  )
}

export default messagelayout;