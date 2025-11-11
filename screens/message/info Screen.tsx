import { View, Text, Dimensions, Animated, BackHandler, Image, Pressable, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'

const InfoScreen = () => {


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
      flex: 1,
      height: '100%',
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scaleWidth(14),
        marginTop: scaleHeight(73)
      }}>
        <Pressable onPress={() => router.back()}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleWidth(9)
          }}>

            <Image source={require('../../assets/images/backk.png')}
              style={{
                width: scaleWidth(14),
                height: scaleHeight(14),
                tintColor: '#D9FD00',
                resizeMode: 'contain'
              }} />

            <Text style={{
              color: '#D9FD00',
              fontSize: 16
            }}>Back</Text>

          </View>
        </Pressable>
        <Text style={{
          color: '#D9FD00',
          fontSize: 16
        }}>Info</Text>
        <Text style={{
          color: '#D9FD00',
          fontSize: 16
        }}>Edit</Text>
      </View>

      <Animated.View style={{
        backgroundColor: '#FFFFFF',
        height: scaleHeight(811),
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow:'hidden',
         transform: [{ translateY: slideAnim }],
      }}>
        <ScrollView
      contentContainerStyle={{
        minHeight: scaleHeight(1000), // 👈 increases scroll height
      }}
    >
        <View style={{
          backgroundColor: '#AEAEB2',
          width: scaleWidth(63),
          height: scaleHeight(6),
          borderRadius: 6,
          position: 'absolute',
          left: (dimensions.width - scaleWidth(63)) / 2,
          top: scaleWidth(11)
        }} />

        {/* Title */}
        <View style={{
          marginTop: scaleHeight(40),
          height: scaleHeight(92),
          width: '100%',
          backgroundColor: '#F6F6F6',
          justifyContent: 'center'
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 30,
            justifyContent: 'space-between'
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: scaleWidth(30)
            }}>
              <Image source={require('../../assets/images/Martha.png')}
                style={{
                  width: scaleWidth(66),
                  height: scaleHeight(66),
                  resizeMode: 'contain'
                }}
              />
              <View style={{
                flexDirection: 'column'
              }}>
                <Text style={{
                  fontSize: 19
                }}>Martha Craig</Text>
                <Text style={{
                  color: '#037EE5',
                  fontSize: 15
                }}>Online</Text>
              </View>
            </View>
            <Image source={require('../../assets/images/telephone.png')}
              style={{
                width: scaleWidth(22),
                height: scaleHeight(22),
                tintColor: '#037EE5',
                resizeMode: 'contain'
              }}
            />
          </View>
        </View>


        <View>
          <View style={{
            marginLeft: scaleWidth(18),
            marginTop: scaleHeight(10)
          }}>
            <View style={{
              flexDirection: 'column',
              paddingVertical: scaleHeight(12),
            }}>
              <Text>Wallet</Text>
              <Text style={{
                color: '#00B12C'
              }}>0xb96cc255470............599</Text>
            </View>
          </View>
          <View style={{
            borderBottomColor: '#C6C6C8',
            borderBottomWidth: 1,
            width: scaleWidth(380),
            alignSelf: 'center'
          }} />
        </View>

        <View>
          <View style={{
            marginLeft: scaleWidth(18)
          }}>
            <View style={{
              flexDirection: 'column',
              paddingVertical: scaleHeight(12),
            }}>
              <Text>Wallet #</Text>
              <Text style={{
                color: '#037EE5'
              }}>0xb96cc255470............599</Text>
            </View>
          </View>
          <View style={{
            borderBottomColor: '#C6C6C8',
            borderBottomWidth: 1,
            width: scaleWidth(380),
            alignSelf: 'center'
          }} />
        </View>

        <View>
          <View style={{
            marginLeft: scaleWidth(18)
          }}>
            <View style={{
              flexDirection: 'column',
              paddingVertical: scaleHeight(12),
            }}>
              <Text>Bio</Text>
              <Text>Lorem ipsum dolor sit amet consectetur.</Text>
            </View>
          </View>
          <View style={{
            borderBottomColor: '#C6C6C8',
            borderBottomWidth: 1,
            width: scaleWidth(380),
            alignSelf: 'center'
          }} />
        </View>

        <View>
          <View style={{
            marginLeft: scaleWidth(18),
            marginTop: scaleHeight(20)
          }}>
            <View style={{
              flexDirection: 'column',
              paddingVertical: scaleHeight(12),
            }}>
              <Text>username</Text>
              <Text style={{
                color: '#037EE5'
              }}>@marthacraig</Text>
            </View>
          </View>
          <View style={{
            borderBottomColor: '#C6C6C8',
            borderBottomWidth: 1,
            width: scaleWidth(380),
            alignSelf: 'center'
          }} />
        </View>

        <View>
          <View style={{
            marginLeft: scaleWidth(18),
            marginTop: scaleHeight(20)
          }}>
            <View style={{
              flexDirection: 'column',
              paddingVertical: scaleHeight(12),
            }}>
              <Text style={{
                color: '#037EE5'
              }}>Send Message</Text>
            </View>
          </View>
          <View style={{
            borderBottomColor: '#C6C6C8',
            borderBottomWidth: 1,
            width: scaleWidth(380),
            alignSelf: 'center'
          }} />
        </View>

        <View>
          <View style={{
            marginLeft: scaleWidth(18)
          }}>
            <View style={{
              flexDirection: 'column',
              paddingVertical: scaleHeight(12),
            }}>
              <Text style={{
                color: '#037EE5'
              }}>Share Wallet</Text>
            </View>
          </View>
          <View style={{
            borderBottomColor: '#C6C6C8',
            borderBottomWidth: 1,
            width: scaleWidth(380),
            alignSelf: 'center'
          }} />
        </View>

        <View>
          <View style={{
            marginLeft: scaleWidth(18)
          }}>
            <View style={{
              flexDirection: 'column',
              paddingVertical: scaleHeight(12),
            }}>
              <Text style={{
                color: '#037EE5'
              }}>Start Secret Chat</Text>
            </View>
          </View>
          <View style={{
            borderBottomColor: '#C6C6C8',
            borderBottomWidth: 1,
            width: scaleWidth(380),
            alignSelf: 'center'
          }} />
        </View>

        <View>
          <View style={{
            marginLeft: scaleWidth(18),
            marginTop: scaleHeight(20)
          }}>
            <View style={{
              flexDirection: 'row',
              paddingVertical: scaleHeight(12),
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Text style={{
                color: '#00000'
              }}>Shared Media</Text>
              <Image source={require('../../assets/images/next.png')}
                style={{
                  marginRight: scaleWidth(20),
                  width: scaleWidth(12),
                  height: scaleHeight(12),
                  tintColor: '#C6C6C8'
                }}
              />
            </View>
          </View>
          <View style={{
            borderBottomColor: '#C6C6C8',
            borderBottomWidth: 1,
            width: scaleWidth(380),
            alignSelf: 'center'
          }} />
        </View>

        <View>
          <View style={{
            marginLeft: scaleWidth(18),
          }}>
            <View style={{
              flexDirection: 'row',
              paddingVertical: scaleHeight(12),
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Text style={{
                color: '#00000'
              }}>Notifications</Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: scaleWidth(15)
              }}>
                <Text style={{
                  color: '#C6C6C8'
                }}>Enabled</Text>
                <Image source={require('../../assets/images/next.png')}
                  style={{
                    marginRight: scaleWidth(20),
                    width: scaleWidth(12),
                    height: scaleHeight(12),
                    tintColor: '#C6C6C8'
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{
            borderBottomColor: '#C6C6C8',
            borderBottomWidth: 1,
            width: scaleWidth(380),
            alignSelf: 'center'
          }} />
        </View>

        <View>
          <View style={{
            marginLeft: scaleWidth(18),
          }}>
            <View style={{
              flexDirection: 'row',
              paddingVertical: scaleHeight(12),
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Text style={{
                color: '#00000'
              }}>Groups In Common</Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: scaleWidth(15)
              }}>
                <Text style={{
                  color: '#C6C6C8'
                }}>1</Text>
                <Image source={require('../../assets/images/next.png')}
                  style={{
                    marginRight: scaleWidth(20),
                    width: scaleWidth(12),
                    height: scaleHeight(12),
                    tintColor: '#C6C6C8'
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{
            borderBottomColor: '#C6C6C8',
            borderBottomWidth: 1,
            width: scaleWidth(380),
            alignSelf: 'center'
          }} />
        </View>

        <View>


          <View style={{
            flexDirection: 'column',
            paddingVertical: scaleHeight(12),
            backgroundColor: '#F6F6F6',
            marginTop: scaleHeight(20)
          }}>
            <Text style={{
              color: '#FE3B30',
              marginLeft: scaleWidth(18),
            }}>Block User</Text>
          </View>
        </View>
</ScrollView>
      </Animated.View>


    </View>



  )
}

export default InfoScreen