import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function HomeScreen() {
  return (
    <View className='flex-1 items-center justify-center bg-red-500'>
      <Text className='text-white'>
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style='auto' />
    </View>
  )
}
