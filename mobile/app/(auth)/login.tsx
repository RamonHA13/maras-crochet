import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function LoginScreen() {
  return (
    <View className='flex-1 items-center justify-center bg-red-500'>
      <Text>login Page desde expo router</Text>
      <StatusBar style='auto' />
    </View>
  )
}
