import { useLocalSearchParams } from 'expo-router'
import { FlatList, Text, View } from 'react-native'
import ProductCard from '../../../../components/ProductCard'

export default function ProductsByCategoryIdScreen() {
  const { id } = useLocalSearchParams<{ id: any }>()
  const products = [
    {
      id: 9,
      name: 'Producto 1',
      imgUrl: 'https://via.placeholder.com/150', // URL de imagen de ejemplo
      description: 'Descripción del producto 1',
      stars: 4.5,
      price: 19.99
    },
    {
      id: 10,
      name: 'Producto 2',
      imgUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      stars: 3.8,
      price: 29.99
    },
    {
      id: 11,
      name: 'Producto 3',
      imgUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 3',
      stars: 4.0,
      price: 24.99
    },
    {
      id: 12,
      name: 'Producto 4',
      imgUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 4',
      stars: 5.0,
      price: 39.99
    }
  ]

  return (
    <View className='flex-1'>
      <Text className='text-center text-xl font-bold my-2'> Category {id}</Text>
      <FlatList
        className='mb-2'
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={({ item }) => <ProductCard product={item} height={150} />}
      />
    </View>
  )
}
