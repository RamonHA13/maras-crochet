import { useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native'

export default function ProductByIdScreen() {
  const { id } = useLocalSearchParams<{ id: any }>()
  return <Text>Producto id: {id}</Text>
}
