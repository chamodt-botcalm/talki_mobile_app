import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, BackHandler, Dimensions, Image, Pressable, Text, View } from 'react-native';
import MessageBottom from '@/components/messageBottom';

export default function MessageScreen() {

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


  return (
    <View style={{
      backgroundColor: '#232323',
      width: '100%',
      height: '100%',
    }}>




      {/* Title Bar */}
      <View style={{
        position: 'absolute',
        top: scaleHeight(60),
        width: '100%'
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: scaleWidth(20)
        }}>
          <Pressable onPress={() => router.back()}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5
            }}>

              <Image source={require('../../assets/images/backk.png')}
                style={{
                  width: 14,
                  height: 14,
                  tintColor: '#D9FD00'
                }} />
              <Text style={{
                color: '#D9FD00',
                fontSize: 16
              }}>Chats</Text>

            </View>
          </Pressable>
          <View style={{
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16
            }}>Martha Craig</Text>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16
            }}>
              last seen just now</Text>
          </View>
          <Image source={require('../../assets/images/Oval.png')}
            style={{
              width: 34,
              height: 34,
            }} />
        </View>
      </View>



      <View style={{
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: scaleHeight(811),
        overflow: 'hidden',
      }}>

      </View>
      <MessageBottom/>

    </View>
  )
}