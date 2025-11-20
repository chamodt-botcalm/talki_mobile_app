import React from 'react'
import { View } from 'react-native'
import WalletScreen from '../../screens/tabs/WalletScreen'

export default function wallet() {
  return (
    <View style={{ flex: 1 }}>
      <WalletScreen name="wallet" />
    </View>
  )
}