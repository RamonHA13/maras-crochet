import { View, Text, FlatList, Image, Pressable } from 'react-native'
import { Product } from '../../../lib/types'
import { IconButton } from 'react-native-paper'
import { Link } from 'expo-router'

export default function FavoritesScreen() {
  const products = [
    {
      id: 1,
      name: 'Producto 1',
      imgUrl: 'https://via.placeholder.com/150', // URL de imagen de ejemplo
      description: 'Descripción del producto 1',
      stars: 4.5,
      price: 19.99
    },
    {
      id: 2,
      name: 'Producto 2',
      imgUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      stars: 3.8,
      price: 29.99
    },
    {
      id: 3,
      name: 'Producto 3',
      imgUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 3',
      stars: 4.0,
      price: 24.99
    },
    {
      id: 4,
      name: 'Producto 4',
      imgUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 4',
      stars: 5.0,
      price: 39.99
    }
  ]

  const handleDelete = (id: any) => () => {
    console.log('Eliminado vieja: ' + id)
  }
  return (
    <View className='flex-1 mx-2'>
      <Text className='text-black text-3xl font-bold my-2'>My Favorites</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <FavoriteItem product={item} handleDelete={handleDelete(item.id)} />
        )}
      />
    </View>
  )
}

interface FavoriteItemProps {
  handleDelete: () => void
  product: Product
}

const FavoriteItem = ({ handleDelete, product }: FavoriteItemProps) => {
  return (
    <Link
      href={{ pathname: '/products/[id]', params: { id: product.id } }}
      asChild
      className='flex-row my-1 w-full relative'
    >
      <Pressable>
        <IconButton
          onPress={handleDelete}
          icon={'close'}
          size={15}
          className='absolute right-0 -top-3 z-50'
        />
        <View className='w-[100px] h-[100px] mr-2'>
          <Image source={{ uri: product.imgUrl }} className='w-full h-full' />
        </View>

        <View className='justify-between flex-1'>
          <View>
            <Text className='font-bold'>{product.name}</Text>
            <Text className='text-gray-400'>{product.description}</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text>Stars: {product.stars}</Text>
            <Text className='font-bold'>${product.price}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}
