import React, { useState, useEffect } from 'react'
import { Image, View, Dimensions, Animated, BackHandler, Text } from 'react-native'
import { useRouter } from 'expo-router'
import BottomNavigator from '../../components/BottomNavigator'
import Tabs from '@/components/tabs'
import Tokens from '@/components/tokens'

const WalletScreen = () => {

  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

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
  const isTablet = dimensions.width >= 600 || dimensions.height >= 1000; // Rough threshold for tablet

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
      <View style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        position: 'absolute',
        height: scaleHeight(811),
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
      }}>
        <View style={{
          backgroundColor: '#AEAEB2',
          height: scaleHeight(5),
          width: scaleWidth(83),
          borderRadius: 6,
          alignSelf: 'center',
          marginTop: isTablet ? scaleHeight(20) : scaleHeight(11)

        }} />

        <View style={{
          flexDirection: 'column',
          borderColor: 'rgba(60,60,67,0.29)',
          borderWidth: 1,
          width: scaleWidth(366),
          alignSelf: 'center',
          paddingHorizontal: scaleWidth(25),
          borderRadius:15,
          marginTop:scaleWidth(49)
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical:scaleHeight(8)
           
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: scaleWidth(10),
            }}>
              <Image source={require('../../assets/images/jon.jpg')}
                style={{
                  borderRadius: 50,
                  width: scaleWidth(46),
                  height: scaleWidth(46),
                  
                }}
              />
              <Text>Jon Smith</Text>
            </View>
            <View style={{
              width:scaleWidth(25),
              alignItems:'center'
            }}>
            <Image source={require('../../assets/images/down.png')}
              style=
              {{
                width: scaleWidth(12),
                height: scaleHeight(12),
                resizeMode:'contain'
              }}
            />
            </View>
          </View>
           <View style={{
              borderBottomColor:'rgba(60,60,67,0.29)',
              borderBottomWidth:1,
              width:scaleWidth(316)
            }}/>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
             paddingVertical:scaleHeight(13)
          }}>
            <View style={{
              flexDirection: 'row',
              gap:scaleWidth(10),
              alignItems:'center'
            }}>
              <Text>Address :</Text>
              <Text style={{
                fontSize:11,
                color:'rgba(60,60,67,0.29)'
              }}>0xb96cc255470............599</Text>
            </View>
            <View style={{
              flexDirection:'column',
             alignItems:'center',
            }}>
              <Image source={require('../../assets/images/topup.png')}
              style={{
                width: scaleWidth(18),
                height: scaleHeight(18),
                resizeMode:'contain'
              }}
              />
              <Text style={{
                fontSize: scaleHeight(8),
              }}>Top Up</Text>
            </View>
          </View>

        </View>

              <View style={{
                marginTop:scaleHeight(28)
              }}>
                <Tabs/>
              </View>
              <View style={{
                marginTop:scaleHeight(71),
                marginLeft:scaleWidth(18)
              }}>
                <Tokens/>
              </View>

      </View>
    </View>
  )
}

export default WalletScreen
