import React, { useState } from 'react'
import { View } from 'react-native'
import { Switch } from 'react-native-switch'

export default function CustomSwitch() {
  const [isOn, setIsOn] = useState(true)

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
      <Switch
        value={isOn}
        onValueChange={setIsOn}
        activeText={''}
        inActiveText={''}
        backgroundActive={'#c7f000'}
        circleBorderWidth={0}
        barHeight={40}
        switchWidthMultiplier={2.5}
      />
    </View>
  )
}
