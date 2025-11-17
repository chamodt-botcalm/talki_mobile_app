import { useLocalSearchParams, usePathname, useRouter } from 'expo-router'
import React from 'react'
import { Image, TouchableOpacity, View, Text} from 'react-native'
import MessageCountBadge from './messagecountbadge'

export default function BottomNavigator() {

  const params = useLocalSearchParams();
  const totalMessages = Number(params.totalMessages) || 0;

  const router = useRouter()
  const pathname = usePathname()

  const isActive = (route: string) => pathname === route.replace('/(tabs)', '')

  const tabItems = [
    { route: '/(tabs)/wallet' as '/(tabs)/wallet', icon: require('../assets/images/wallet.png'), name: 'Wallet'},
    { route: '/(tabs)/chat-screen' as '/(tabs)/chat-screen', icon: require('../assets/images/communications.png'), iconn: require('../assets/images/num17.png'), name: 'Chats'},
    { route: '/(tabs)/contact' as '/(tabs)/contact', icon: require('../assets/images/user.png') ,name: 'Contacts'},
    { route: '/(tabs)/settings' as '/(tabs)/settings', icon: require('../assets/images/setting.png') ,name: 'Settings'},
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
          <View style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.route)}
            style={{
              backgroundColor: active ? 'black' : 'transparent',
              borderRadius: 30,
              padding: 10,
            }}
          > 
            <View style={{ position: 'relative' }}>
              <Image
                source={item.icon}
                style={{
                  width: 27,
                  height: 27,
                  tintColor: active ? 'white' : undefined,
                }}
              />
              {item.iconn && totalMessages > 0 && (
                <View style={{ position: 'absolute', top: -15, right: -15 }}>
                <MessageCountBadge />
                </View>
              )}
            </View>
            
          </TouchableOpacity>
           <Text>{item.name}</Text>
           </View>
        )
      })}
    </View>
  )
}
