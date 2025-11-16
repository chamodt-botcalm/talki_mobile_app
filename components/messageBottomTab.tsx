import { useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Image, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import MessageCountBadge from './messagecountbadge';

const MessageBottomTab = () => {
  const { width, height } = useWindowDimensions();
  const dimensions = { width, height };

  const [navigationReady, setNavigationReady] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [totalMessages, setTotalMessages] = useState(0);

  // Base dimensions
  const BASE_WIDTH = 430;
  const BASE_HEIGHT = 932;
  const TABLET_WIDTH = 834;
  const TABLET_HEIGHT = 1194;

  const isTablet = dimensions.width >= 600 || dimensions.height >= 1000;
  const currentBaseWidth = isTablet ? TABLET_WIDTH : BASE_WIDTH;
  const currentBaseHeight = isTablet ? TABLET_HEIGHT : BASE_HEIGHT;

  const scaleWidth = (size: number) => (dimensions.width / currentBaseWidth) * size;
  const scaleHeight = (size: number) => (dimensions.height / currentBaseHeight) * size;

  // Safely get navigation hooks
  let router: any = null;
  let pathname: string = '';
  let params: any = null;

  try {
    router = useRouter();
    pathname = usePathname();
    params = useLocalSearchParams();
  } catch {
    // Navigation not ready
  }

  useEffect(() => {
    if (router && pathname !== undefined) {
      setNavigationReady(true);
      setCurrentPath(pathname);
      setTotalMessages(Number(params?.totalMessages) || 0);
    }
  }, [router, pathname, params]);

  const isActive = (route: string) => currentPath === route.replace('/(tabs)', '');

  const tabItems = [
    { route: '/(tabs)/wallet' as '/(tabs)/wallet', icon: require('../assets/images/wallet.png') },
    { route: '/(tabs)/chat-screen' as '/(tabs)/chat-screen', icon: require('../assets/images/communications.png'), iconn: require('../assets/images/num17.png') },
    { route: '/(tabs)/contact' as '/(tabs)/contact', icon: require('../assets/images/user.png') },
    { route: '/(tabs)/settings' as '/(tabs)/settings', icon: require('../assets/images/setting.png') },
  ];

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#F6F5FA',
        borderTopColor: '#7A7A7A',
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scaleWidth(12),
        height: scaleHeight(90),

      }}
    >

      {/*  First Column — Navigation Icons */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: scaleWidth(69),
          width: '50%'
        }}
      >
        {tabItems.map((item, index) => {
          const active = isActive(item.route);
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigationReady && router?.push(item.route)}
              style={{
                backgroundColor: active ? 'black' : 'transparent',
                borderRadius: 30,
                padding: scaleWidth(6),
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
                  <View style={{ position: 'absolute', top: -10, right: -10 }}>
                    <MessageCountBadge />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/*  Second Column — Message Input */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          marginLeft: scaleWidth(20),
        }}
      >
        <Image
          source={require('../assets/images/Attach.png')}
          style={{
            width: scaleWidth(28),
            height: scaleHeight(28),
            tintColor: '#858E99',
            marginRight: scaleWidth(8),
            resizeMode: 'contain',
          }}
        />

        <TextInput
          placeholder="Message"
          placeholderTextColor="#858E99"
          style={{
            flex: 1,
            paddingVertical: scaleHeight(6),
            borderColor: '#D1D1D6',
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: scaleWidth(12),
            fontSize: scaleWidth(14),
          }}
        />

        <Image
          source={require('../assets/images/microphone.png')}
          style={{
            width: scaleWidth(30),
            height: scaleHeight(30),
            tintColor: '#858E99',
            marginLeft: scaleWidth(8),
            resizeMode: 'contain',

          }}
        />
      </View>
    </View>
  );
};

export default MessageBottomTab;
