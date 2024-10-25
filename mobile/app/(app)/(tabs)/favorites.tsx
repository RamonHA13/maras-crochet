import { View, Text, FlatList, Image, Pressable } from 'react-native'
import { Product } from '../../../types/product'
import { IconButton } from 'react-native-paper'
import { Link } from 'expo-router'
import useFavoriteStore from '../../../stores/useFavoritesStore'

export default function FavoritesScreen() {
  const products = useFavoriteStore(state => state.products)
  const removeProduct = useFavoriteStore(state => state.removeProduct)

  console.log(products)
  const handleDelete = (id: any) => () => {
    removeProduct(id)
    //TODO: Hacer peticion
    //TODO: HAcer esto optimista
  }

  //TODO: Agregar imagen en caso de que no haya productos
  return (
    <View className='flex-1 mx-2'>
      <Text className='text-black text-3xl font-bold my-2'>My Favorites</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
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
          <Image
            source={{ uri: product.imgUrls[0] }}
            className='w-full h-full'
          />
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
