import MessageList from '@/components/MessageList';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, BackHandler, Dimensions, ScrollView, View } from 'react-native';
import StoryView from '../../components/StoryView';

export default function ChatScreen() {

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
            width: '100%',
            height: '100%',
        }}>
            <View style={{
                position: 'absolute',
                bottom: scaleHeight(714),
                width: '100%'
            }}>
                <StoryView />
            </View>

            <View style={{
                position: 'absolute',
                bottom: 0,
                backgroundColor: '#FFFFFF',
                width: '100%',
                height: isTablet ? scaleHeight(954) : scaleHeight(714),
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                overflow: 'hidden',
            }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MessageList />
                </ScrollView>
            </View>

        </View>
    )
}
