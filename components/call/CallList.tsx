import { View, StyleSheet, Text, Dimensions, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'

const CallList = () => {



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


  const styles = StyleSheet.create({
    row1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 20,
      paddingVertical: 6,
    },
    row2: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    row3: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    column: {
      flexDirection: 'column'
    },
    borderbottom: {
      borderBottomColor: 'rgba(60, 60, 67, 0.29)',
      borderBottomWidth: 1,
      marginHorizontal: 25,
    },
    image: {
      width: scaleWidth(40),
      height: scaleWidth(40),
      borderRadius: scaleWidth(20)
    },
    icon: {
      width: scaleWidth(20),
      height: scaleWidth(20),
      resizeMode: 'contain',
      tintColor: '#8E8E93'
    }
  })
  

  const list = [
    {
      name: 'Joshua Lawrence',
      type: 'Outgoing (2 min)',
      date: '10/13',
      image: require('../../assets/images/im1.jpg'),
      category: 'outgoing'
    },
    {
      name: 'Joshua Lawrence',
      type: 'Missed',
      date: '10/13',
      image: require('../../assets/images/im1.jpg'),
      category: 'missed'
    },
    {
      name: 'Joshua Lawrence',
      type: 'Incoming (2 min)',
      date: '10/13',
      image: require('../../assets/images/im1.jpg'),
      category: 'incoming'
    },
    {
      name: 'Joshua Lawrence',
      type: 'Outgoing (2 min)',
      date: '10/13',
      image: require('../../assets/images/im1.jpg'),
      category: 'outgoing'
    },
    {
      name: 'Joshua Lawrence',
      type: 'Missed',
      date: '10/13',
      image: require('../../assets/images/im1.jpg'),
      category: 'missed'
    },
    {
      name: 'Joshua Lawrence',
      type: 'Incoming (2 min)',
      date: '10/13',
      image: require('../../assets/images/im1.jpg'),
      category: 'incoming'
    },
    {
      name: 'Joshua Lawrence',
      type: 'Outgoing (2 min)',
      date: '10/13',
      image: require('../../assets/images/im1.jpg'),
      category: 'outgoing'
    },
    {
      name: 'Joshua Lawrence',
      type: 'Missed',
      date: '10/13',
      image: require('../../assets/images/im1.jpg'),
      category: 'missed'
    },
    {
      name: 'Joshua Lawrence',
      type: 'Incoming (2 min)',
      date: '10/13',
      image: require('../../assets/images/im1.jpg'),
      category: 'incoming'
    },
    {
      name: 'Joshua Lawrence',
      type: 'Outgoing (2 min)',
      date: '10/13',
      image: require('../../assets/images/im1.jpg'),
      category: 'outgoing'
    },
    {
      name: 'Joshua Lawrence',
      type: 'Missed',
      date: '10/13',
      image: require('../../assets/images/im1.jpg'),
      category: 'missed'
    },
    {
      name: 'Joshua Lawrence',
      type: 'Incoming (2 min)',
      date: '10/13',
      image: require('../../assets/images/im1.jpg'),
      category: 'incoming'
    },
    {
      name: 'Joshua Lawrence',
      type: 'Outgoing (2 min)',
      date: '10/13',
      image: require('../../assets/images/im1.jpg'),
      category: 'outgoing'
    },
    {
      name: 'Joshua Lawrence',
      type: 'Missed',
      date: '10/13',
      image: require('../../assets/images/im1.jpg'),
      category: 'missed'
    },
    {
      name: 'Joshua Lawrence',
      type: 'Incoming (2 min)',
      date: '10/133',
      image: require('../../assets/images/im1.jpg'),
      category: 'incoming'
    }
  ]

  return (
    <ScrollView contentContainerStyle={{
      paddingBottom: 110
    }}>
      <View style={{ marginTop: 27 }}>
        {list.map((item, index) => (
          <React.Fragment key={index}>
            <View style={styles.row1}>
              <View style={styles.row2}>
                <Image source={item.category === 'missed' ? require('../../assets/images/missedcall.png') : item.category === 'incoming' ? require('../../assets/images/incoming.png') : require('../../assets/images/outgoing.png')} style={[styles.icon, item.category === 'missed' && {width: scaleWidth(20), height: scaleWidth(15)}]} />
                <Image source={item.image} style={styles.image} />
                <View style={styles.column}>
                  <Text style={{ fontSize: 14, color: item.category === 'missed' ? 'red' : '#8E8E93' }}>{item.name}</Text>
                  <Text style={{ fontSize: 13, color: '#8E8E93' }}>{item.type}</Text>
                </View>
              </View>
              <View style={styles.row3}>
                <Text style={{ fontSize: 13, color: '#8E8E93' }}>{item.date}</Text>
                <Image source={require('../../assets/images/Info.png')}
                  style={{ resizeMode: 'contain' }} />
              </View>
            </View>
            <View style={styles.borderbottom} />
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  )
}

export default CallList