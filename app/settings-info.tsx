import SettingsInfo from '@/screens/tabs/settingsinfo/Settings_Info'
import { View } from 'react-native'

const SettingsInfoPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <SettingsInfo/>
    </View>
  )
}

export const options = {
  headerShown: false
}

export default SettingsInfoPage