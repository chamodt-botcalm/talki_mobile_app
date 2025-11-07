import React from 'react'
import { View } from 'react-native'
import SettingsScreen from '../../screens/tabs/SettingsScreen'

export default function settings() {
  return (
    <View style={{ flex: 1 }}>
      <SettingsScreen />
    </View>
  )
}