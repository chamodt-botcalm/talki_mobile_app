import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { BackHandler, Dimensions, Image, Pressable, Text, TextInput, View } from 'react-native';

export default function WelcomePage() {
    const router = useRouter();
    const [showCreateWallet, setShowCreateWallet] = useState(false);
    const [showImportAccount, setShowImportAccount] = useState(false);
    

    const [dimensions, setDimensions] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions({
                width: window.width,
                height: window.height,
            });
        });

        return () => subscription?.remove();
    }, []);

    useEffect(() => {
        const backAction = () => {
            if (showCreateWallet) {
                setShowCreateWallet(false);
                return true;
            }
            else if(showImportAccount){
                setShowImportAccount(false);
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [showCreateWallet, showImportAccount]);

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
            flex: 1,
            backgroundColor: '#232323',
        }}>
            <Image
                source={isLandscape ? require('../assets/images/Groupp2.png') : require('../assets/images/Groupp.png')}
                style={{
                    position: 'absolute',
                    bottom: isTablet ? scaleHeight(600) : scaleHeight(422),
                    right: isTablet ? scaleWidth(430) : scaleWidth(123),


                }} />

            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
            }}>

                <Image
                    source={isTablet ? require('../assets/images/rockk2.png') : require('../assets/images/rockk.png')}
                    style={{
                        position: 'absolute',
                        bottom: isTablet ? scaleHeight(380) : scaleHeight(308),
                    }} />
                <View style={{
                    position: 'absolute',
                    bottom: isTablet ? scaleHeight(650) : scaleHeight(536),
                    left: isTablet ? scaleWidth(118) : scaleWidth(0),
                    width: isTablet ? 'auto' : '100%',
                    alignItems: isTablet ? 'flex-start' : 'center'

                }}>
                    <Text style={{
                        fontSize: isTablet ? 170 * scale : 141 * scale,
                        color: '#DBFF00',
                        fontWeight: '600',


                    }}>
                        talk
                        <Text style={{
                            fontSize: isTablet ? 277 * scale : 229 * scale
                        }}>i</Text>
                    </Text>
                </View>

                <Text style={{
                    position: 'absolute',
                    top: isTablet ? scaleHeight(134) : scaleHeight(70),
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    fontFamily: 'Inter',
                    fontSize: scale * 40,
                    fontWeight: 'bold'
                }}> Welcome </Text>



                {(() => {
                    if (showImportAccount) {
                        return (
                            <>
                                
                                <View style={{
                                    position: 'absolute',
                                    top: isTablet ? scaleHeight(230) : scaleHeight(169),
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    width: '100%',
                                    paddingHorizontal: isTablet ? scaleWidth(172) : scaleWidth(29.5),
                                }}>
                                    <Text style={{
                                        marginBottom: scaleHeight(10),
                                        fontSize: isTablet ? scale * 18 : scale * 14,
                                        color: '#8C8C8C',
                                        fontFamily: 'Inter',
                                    }}>Private key</Text>
                                    <TextInput
                                        placeholder='Private key'
                                        placeholderTextColor="#A4A4A4"
                                        style={{
                                            backgroundColor: '#F6F6F6',
                                            paddingVertical: scaleHeight(12),
                                            paddingLeft: scaleWidth(12),
                                            borderRadius: scale * 8,
                                            borderColor: '#EEE7E7',
                                            borderWidth: 1,
                                            width: isTablet ? scaleWidth(490) : scaleWidth(371),
                                            marginBottom:isTablet? scaleHeight(153): scaleHeight(80),
                                            fontFamily: 'Inter',
                                            fontSize: isTablet ? scale * 16 : scale * 14,
                                            
                                        }} />
                                    <Pressable
                                        style={{
                                            backgroundColor: '#DBFF00',
                                            width: isTablet ? scaleWidth(490) : scaleWidth(371),
                                            height:isTablet? scaleHeight(73): scaleHeight(60),
                                            borderRadius: scale * 8,
                                            justifyContent: 'center'
                                        }}
                                        onPress={() => router.push('/connect-wallet')}
                                    >
                                        <Text style={{
                                            color: 'black',
                                            fontSize: isTablet ? scale * 20 : scale * 16,
                                            textAlign: 'center',
                                            fontFamily: 'Inter',
                                            fontWeight: '600'
                                        }}>
                                            Import
                                        </Text>
                                    </Pressable>
                                </View>
                            </>
                        );
                    } else if (showCreateWallet) {
                        return (
                            <>
                                <View style={{
                                    position: 'absolute',
                                    top: isTablet ? scaleHeight(255) : scaleHeight(143),
                                    width: '100%',
                                    alignItems: 'center'
                                }}>
                                    <Image source={require('../assets/images/Camera.png')} />
                                </View>
                                <View style={{
                                    position: 'absolute',
                                    top: isTablet ? scaleHeight(398) : scaleHeight(229),
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    width: '100%',
                                    paddingHorizontal: isTablet ? scaleWidth(172) : scaleWidth(29.5),
                                }}>
                                    <Text style={{
                                        marginBottom: scaleHeight(10),
                                        fontSize: isTablet ? scale * 18 : scale * 14,
                                        color: '#8C8C8C',
                                        fontFamily: 'Inter',
                                    }}>Wallet Address</Text>
                                    <TextInput
                                        placeholder='0xb96cc255470............599'
                                        placeholderTextColor="#A4A4A4"
                                        style={{
                                            backgroundColor: '#F6F6F6',
                                            paddingVertical: scaleHeight(12),
                                            paddingLeft: scaleWidth(12),
                                            borderRadius: scale * 8,
                                            borderColor: '#EEE7E7',
                                            borderWidth: 1,
                                            width: isTablet ? scaleWidth(490) : scaleWidth(371),
                                            marginBottom: scaleHeight(20),
                                            fontFamily: 'Inter',
                                            fontSize: isTablet ? scale * 16 : scale * 14,
                                        }} />
                                    <Pressable
                                        style={{
                                            backgroundColor: '#DBFF00',
                                            width: isTablet ? scaleWidth(490) : scaleWidth(371),
                                            height: scaleHeight(60),
                                            borderRadius: scale * 8,
                                            justifyContent: 'center'
                                        }}
                                        onPress={() => router.push('/user-account')}
                                    >
                                        <Text style={{
                                            color: 'black',
                                            fontSize: isTablet ? scale * 18 : scale * 16,
                                            textAlign: 'center',
                                            fontFamily: 'Inter',
                                            fontWeight: '600'
                                        }}>
                                            Create Wallet
                                        </Text>
                                    </Pressable>
                                </View>
                            </>
                        );
                    } else {
                        return (
                            <>
                                <Pressable
                                    style={{
                                        position: 'absolute',
                                        top: isTablet ? scaleHeight(403) : scaleHeight(181),
                                        left: isTablet ? (dimensions.width - scaleWidth(490)) / 2 : (dimensions.width - scaleWidth(371)) / 2,
                                        backgroundColor: '#DBFF00',
                                        width: isTablet ? scaleWidth(490) : scaleWidth(371),
                                        height: scaleHeight(60),
                                        borderRadius: scale * 5,
                                        justifyContent: 'center'
                                    }}
                                    onPress={() => alert('Button Pressed!')}
                                >
                                    <Text style={{ color: 'black', fontSize: scale * 16, textAlign: 'center', fontFamily: 'Inter', }}>
                                        Connect Wallet
                                    </Text>
                                </Pressable>
                                <View style={{
                                    position: 'absolute',
                                    top: isTablet ? scaleHeight(480) : scaleHeight(253),
                                    left: 0,
                                    right: 0,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    gap: isTablet ? scaleWidth(15) : scaleWidth(12),
                                    paddingHorizontal: scaleWidth(30)
                                }}>
                                    <Pressable
                                        style={{
                                            borderColor: '#DBFF00',
                                            borderWidth: scale * 2,
                                            width: isTablet ? scaleWidth(238) : scaleWidth(180),
                                            height: scaleHeight(60),
                                            borderRadius: scale * 7,
                                            justifyContent: 'center'
                                        }}
                                        onPress={() => setShowCreateWallet(true)}
                                    >
                                        <Text style={{ color: 'black', fontSize: scale * 16, textAlign: 'center', fontFamily: 'Inter', }}>
                                            Create Wallet
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        style={{
                                            borderColor: '#DBFF00',
                                            borderWidth: scale * 2,
                                            width: isTablet ? scaleWidth(238) : scaleWidth(180),
                                            height: scaleHeight(60),
                                            borderRadius: scale * 7,
                                            justifyContent: 'center'
                                        }}
                                        onPress={() => setShowImportAccount(true)}
                                    >
                                        <Text style={{ color: 'black', fontSize: scale * 16, textAlign: 'center', fontFamily: 'Inter', }}>
                                            Import Account
                                        </Text>
                                    </Pressable>
                                </View>
                            </>
                        );
                    }
                })()}
            </View>
        </View>
    )
}
