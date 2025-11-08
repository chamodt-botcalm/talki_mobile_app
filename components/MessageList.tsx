import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, BackHandler, Dimensions, Image, Pressable, Text, View } from 'react-native';

const MessageList = () => {
  const router = useRouter();

  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  const slideAnim = useState(new Animated.Value(dimensions.height))[0];

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => {
      subscription?.remove?.();
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      router.back();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
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

  const messageData = [
    { id: '1', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: true, hasPin: true, unreadCount: 0, date: '9/29' },
    { id: '2', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: false, hasPin: true, unreadCount: 0, date: '9/29' },
    { id: '3', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: true, hasPin: false, unreadCount: 0, date: '9/29' },
    { id: '4', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: false, hasPin: false, unreadCount: 3, date: '9/29' },
    { id: '5', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: true, hasPin: true, unreadCount: 0, date: '9/29' },
    { id: '6', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: false, hasPin: false, unreadCount: 4, date: '9/29' },
    { id: '7', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: true, hasPin: false, unreadCount: 0, date: '9/29' },
    { id: '8', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: false, hasPin: true, unreadCount: 5, date: '9/29' },
    { id: '9', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: true, hasPin: false, unreadCount: 0, date: '9/29' },
    { id: '10', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: false, hasPin: false, unreadCount: 0, date: '9/29' },
    { id: '11', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: true, hasPin: true, unreadCount: 0, date: '9/29' },
    { id: '12', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: false, hasPin: false, unreadCount: 3, date: '9/29' },
    { id: '13', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: true, hasPin: false, unreadCount: 0, date: '9/29' },
    { id: '14', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: false, hasPin: true, unreadCount: 4, date: '9/29' },
    { id: '15', userName: 'sarah_k', userid: '0xb96cc255470............599', userImage: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'GIF', hasSeen: true, hasPin: false, unreadCount: 0, date: '9/29' },
  ];

  return (
    <View style={{
      width: isTablet ? '50%' : '100%',
      borderRightWidth: 1,
      borderRightColor: isTablet ? 'rgba(60, 60, 67, 0.29)' : 'transparent',
    }}>
     
      <View style={{ marginTop: 23 }}>
        {messageData.map((item: any) => {
          return (
             <Pressable onPress={() => router.push('/(message)/messagescreen')}>
            <View key={item.id} style={{
              borderBottomColor: 'rgba(60, 60, 67, 0.29)',
              borderBottomWidth: 1,
              paddingVertical: 7,
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginRight: 10,
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <View>
                    <Image source={{ uri: item.userImage }}
                      style={{
                        width: 62,
                        height: 62,
                        borderRadius: 40,
                      }} />
                  </View>
                  <View style={{
                    flexDirection: 'column',
                    marginLeft: 11,
                    flex: 1,
                  }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.userName}</Text>
                    <Text style={{ fontSize: 12, color: '#666' }}>{item.userid}</Text>
                    <Text style={{
                      color: '#8E8E93',
                      marginTop: 4,
                    }}>{item.message}</Text>
                  </View>
                </View>

                <View style={{
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  height: 62,
                  paddingVertical: 4,
                }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    
                    {item.hasSeen && (
                      <Image source={require('../assets/images/check-mark.png')}
                        style={{
                          width: 30,
                          height: 30,
                          tintColor: '#34C759'
                        }} />
                    )}
                    <Text style={{ 
                      fontSize: 14, 
                      color: '#8E8E93',
                      fontWeight: '400'
                    }}>{item.date}</Text>
                  </View>
                  
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                    {item.hasPin && (
                      <Image source={require('../assets/images/pin.png')}
                        style={{
                          width: 14,
                          height: 14,
                          tintColor: '#8E8E93'
                        }} />
                    )}
                    {item.unreadCount > 0 && (
                      <View style={{
                        backgroundColor: '#232323',
                        borderRadius: 12,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        width:30,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Text style={{ 
                          
                          fontSize: 12, 
                          fontWeight: '600',
                          color:'#D9FD00'
                        }}>{item.unreadCount}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
             </Pressable>
          );
        })}
      </View>
     
    </View>
  );
};

export default MessageList;