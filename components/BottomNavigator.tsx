import { usePathname, useRouter } from 'expo-router'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

export default function BottomNavigator() {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (route: string) => pathname === route.replace('/(tabs)', '')

  const tabItems = [
    { route: '/(tabs)/wallet' as '/(tabs)/wallet', icon: require('../assets/images/wallet.png') },
    { route: '/(tabs)/chat-screen' as '/(tabs)/chat-screen', icon: require('../assets/images/communications.png') },
    { route: '/(tabs)/contact' as '/(tabs)/contact', icon: require('../assets/images/user.png') },
    { route: '/(tabs)/settings' as '/(tabs)/settings', icon: require('../assets/images/setting.png') },
  ]

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#F6F5FA',
        width: '100%',
        height: 104,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
      }}
    >
      {tabItems.map((item, index) => {
        const active = isActive(item.route)
        return (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.route)}
            style={{
              backgroundColor: active ? 'black' : 'transparent',
              borderRadius: 30,
              padding: 10,
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 27,
                height: 27,
                tintColor: active ? 'white' : undefined,
              }}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
