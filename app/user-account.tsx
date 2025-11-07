import React from 'react'
import { View } from 'react-native'
import UserAccount from '../screens/User Account'

export default function useraccount() {
    return (
        <View style={{
            flex: 1
        }}>
            <UserAccount />
        </View>
    )
}
