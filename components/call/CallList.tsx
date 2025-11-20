import { View, StyleSheet, Text, Dimensions } from 'react-native'
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


const styles=StyleSheet.create({
    row1:{
        flexDirection:'row'
    },
    row2:{
        flexDirection:'row'
    },
    row3:{
        flexDirection:'row'
    },
    column:{
        flexDirection:'column'
    },
    borderbottom:{
        borderBottomColor:'rgba(60, 60, 67, 0.29)',
        borderBottomWidth:1,
        marginHorizontal:25
    }
})

  return (
    <View>
      
    </View>
  )
}

export default CallList