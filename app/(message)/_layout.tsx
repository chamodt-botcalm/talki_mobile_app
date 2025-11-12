import React from 'react'
import { Stack,Tabs } from 'expo-router';
import MessageBottom from '@/components/messageBottom';
import BottomNavigator from '@/components/BottomNavigator';

const messagelayout = () => {
  return (
    
    <Tabs
         screenOptions={{
           headerShown: false,
           tabBarStyle: { display: 'none' }
         }}
       >
         <Tabs.Screen name="messagescreen" />
         <Tabs.Screen name="info-screen"/>
         <Tabs.Screen name="info-edit"/>
       </Tabs>
  )
}

export default messagelayout;