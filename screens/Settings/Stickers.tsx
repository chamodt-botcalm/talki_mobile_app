import BlackBackground from '@/components/main/black'
import WhiteBackground from '@/components/main/white'
import PullBar from '@/components/pullbar'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { BackHandler, Dimensions, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


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


    const styles = StyleSheet.create({

        borderbottom: {
            borderBottomColor: '#E3E3E6',
            borderBottomWidth: 1,

        },
        row1: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 13,
            marginLeft: 67
        },
        row2: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 11
        },
        column1: {
            flexDirection: 'column',
        },
        row3: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleWidth(8),
            marginLeft: scaleWidth(12),
        },
        image: {
            width: scaleWidth(44),
            height: scaleHeight(28),
            resizeMode: 'contain'
        },
        text:{
            fontSize: 16, 
            marginLeft: 18, 
            textTransform: 'uppercase', 
            marginTop: scaleHeight(25), 
            marginBottom: scaleHeight(8)
        },
         header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: scaleWidth(14),
            marginTop: scaleHeight(73)
        },
         headerText: {
            color: '#D9FD00',
            fontSize: 18
        },
         backButton: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleWidth(9)
        },
        backIcon: {
            width: scaleWidth(14),
            height: scaleHeight(14),
            tintColor: '#D9FD00',
            resizeMode: 'contain'
        }

    });

    const section1 = [
        { title1: 'Suggest by Emoji', title2: 'All Sets' },
        { title1: 'Trending Stickers', title2: '15', stylee: styles.borderbottom, mh: { marginHorizontal: 25 }, link: '', bg: { backgroundColor: '#232323', paddingHorizontal: 5, paddingVertical: 1, borderRadius: 10 }, co: { color: '#D9FD00' } },
        { title1: 'Archived Stickers', title2: '46', stylee: styles.borderbottom, mh: { marginHorizontal: 25 }, link: '' },
        { title1: 'Masks', title2: '', stylee: styles.borderbottom, mh: { marginHorizontal: 25 }, link: '' },
        { title1: 'Loop Animated Stickers', title2: '' },

    ]

    const stickers = [
        {
            title: 'Bat', numberOfStickers: 25, image: require('../../assets/images/batsticker.png')
        },
        {
            title: 'Bat', numberOfStickers: 25, image: require('../../assets/images/batsticker.png')
        },
        {
            title: 'Bat', numberOfStickers: 25, image: require('../../assets/images/batsticker.png')
        },
        {
            title: 'Bat', numberOfStickers: 25, image: require('../../assets/images/batsticker.png')
        },
        {
            title: 'Bat', numberOfStickers: 25, image: require('../../assets/images/batsticker.png')
        },
        {
            title: 'Bat', numberOfStickers: 25, image: require('../../assets/images/batsticker.png')
        },
        {
            title: 'Bat', numberOfStickers: 25, image: require('../../assets/images/batsticker.png')
        },
        {
            title: 'Bat', numberOfStickers: 25, image: require('../../assets/images/batsticker.png')
        },
        {
            title: 'Bat', numberOfStickers: 25, image: require('../../assets/images/batsticker.png')
        }
    ]

    const MenuItem = ({ title1, title2, stylee, mh, link, bg, co }: { title1: string; title2: string; stylee?: any; mh?: any; link?: string, bg?: any, co?: any }) => {
        return (
            <View>
                <TouchableOpacity style={[styles.row1]} onPress={() => link && router.push(link as any)}>
                    <Text>{title1}</Text>
                    <View style={[styles.row2]}>
                        <Text style={[co, bg]}>{title2}</Text>
                        <Icon name="chevron-forward-outline" size={20} style={{ color: '#AEAEB2' }} />
                    </View>
                </TouchableOpacity>
                <View style={[stylee, mh]} />
            </View>

        );
    };

    const Sticker = ({ title, numberOfStickers, image }: { title: string; numberOfStickers: number; image: any }) => {
        return (
            <>
                <View style={[styles.row3, { paddingVertical: scaleHeight(8) }]}>
                    <Image source={image} style={styles.image} />
                    <View style={styles.column1}>
                        <Text>{title}</Text>
                        <Text style={{ color: '#8E8E93' }}>{numberOfStickers} stickers</Text>
                    </View>
                </View>
                <View style={[styles.borderbottom, { marginHorizontal: 25 }]} />
            </>
        )
    };
    return (
        <BlackBackground>
            {/* Header */}
             <View style={styles.header}>
                            <Pressable>
                                <View style={styles.backButton}>
                                    <Pressable onPress={() => router.back()}>
                                        <Image source={require('../../assets/images/backk.png')}
                                            style={styles.backIcon} />
                                    </Pressable> 
                                    <Pressable onPress={() => router.back()}>
                                        <Text style={styles.headerText}>Back</Text>
                                    </Pressable>
                                </View>
                            </Pressable>
                            <Text style={styles.headerText}>Stickers</Text>
                            <Pressable onPress={() => router.back()}>
                                <Text style={styles.headerText}>Edit</Text>
                            </Pressable>
                        </View>
            <WhiteBackground height={scaleHeight(811)}>
                <View style={{ marginTop: scaleHeight(11), alignSelf: 'center' }}>
                    <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)} />
                </View>
                <View style={[styles.column1, { backgroundColor: '#F6F6F6' }, { marginTop: 29 }]}>
                    {section1.map((item, index) => (
                        <MenuItem key={index} title1={item.title1} title2={item.title2} stylee={item.stylee} mh={item.mh} link={item.link} bg={item.bg} co={item.co} />

                    ))}
                </View>

                <Text style={styles.text}>Sticker sets</Text>

                <ScrollView contentContainerStyle={{
                    paddingBottom: 10
                  }}>
                    {stickers.map((item, index) => (
                        <Sticker key={index} title={item.title} numberOfStickers={item.numberOfStickers} image={item.image} />
                    ))}
                </ScrollView>

            </WhiteBackground>
        </BlackBackground>
    )
}

export default Stickers