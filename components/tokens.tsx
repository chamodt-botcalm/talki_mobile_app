import { View, Text, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'

const Tokens = () => {
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


const coins=[
  {
    id: '1', coinName: 'USD Coin', coinImage: '../assets/images/token1.png', numberOfCoins:'300 USDC',total:'$3,000.00'
  }
]


  return (
    <View>
      {coins.map((items)=>(
      <View style={{
        flexDirection:'row',
        gap:scaleWidth(203)
      }}>
        <View style={{
          flexDirection:'row'
        }}>
        <Image source={require('../assets/images/token1.png')}/>
        <View style={{
          flexDirection:'column'
        }}>
            <Text style={{fontSize: 14}}>{items.coinName}</Text>
            <Text style={{fontSize: 14}}>{items.numberOfCoins}</Text>
        </View>
        </View>
        <Text style={{fontSize: 14}}>{items.total}</Text>
      </View>
     ))}
    </View>
  )
}

export default Tokens