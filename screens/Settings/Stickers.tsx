import { View, Text, Dimensions, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import BlackBackground from '@/components/main/black'
import WhiteBackground from '@/components/main/white'
import PullBar from '@/components/pullbar'

const Stickers = () => {

    const router = useRouter();
    const [activeTab, setActiveTab] = useState("All");

    const [dimensions, setDimensions] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }: { window: { width: number; height: number } }) => {
            setDimensions({
                width: window.width,
                height: window.height,
            });
        });

        return () => {
            subscription?.remove?.();
        };
    }, []);

    const BASE_WIDTH = 430;
    const BASE_HEIGHT = 932;

    const TABLET_WIDTH = 834;
    const TABLET_HEIGHT = 1194;

    const isTablet = dimensions.width >= 600 || dimensions.height >= 1000;

    const currentBaseWidth = isTablet ? TABLET_WIDTH : BASE_WIDTH;
    const currentBaseHeight = isTablet ? TABLET_HEIGHT : BASE_HEIGHT;

    const isLandscape = dimensions.width > dimensions.height;

    const scaleWidth = (size: number) => (dimensions.width / currentBaseWidth) * size;
    const scaleHeight = (size: number) => (dimensions.height / currentBaseHeight) * size;

    const scale = Math.min(
        dimensions.width / currentBaseWidth,
        dimensions.height / currentBaseHeight
    );


    useEffect(() => {
        const backAction = () => {
            router.back();
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);

    return (
        <BlackBackground>
            <WhiteBackground height={scaleHeight(811)}>
                <View style={{marginTop:scaleHeight(11),alignSelf:'center'}}>
                    <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)} />
                </View>
            </WhiteBackground>
        </BlackBackground>
    )
}

export default Stickers