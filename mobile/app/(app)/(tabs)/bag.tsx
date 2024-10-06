import { View, Text, FlatList, Image } from 'react-native'
import { BagProduct } from '../../../lib/types'
import { Button, IconButton } from 'react-native-paper'
import { useMemo } from 'react'

export default function BagScreen() {
  const bagProducts: BagProduct[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Producto de Ejemplo 1',
        imgUrl: 'https://via.placeholder.com/150',
        description: 'Descripción del producto de ejemplo 1',
        stars: 4.5,
        price: 29.99,
        amount: 2, // Cantidad del producto en la bolsa
        size: 'M', // Tamaño del producto
        color: 'Rojo' // Color del producto
      },
      {
        id: 2,
        name: 'Producto de Ejemplo 2',
        imgUrl: 'https://via.placeholder.com/150',
        description: 'Descripción del producto de ejemplo 2',
        stars: 4.0,
        price: 19.99,
        amount: 1,
        size: 'L',
        color: 'Azul'
      },
      {
        id: 3,
        name: 'Producto de Ejemplo 3',
        imgUrl: 'https://via.placeholder.com/150',
        description: 'Descripción del producto de ejemplo 3',
        stars: 5.0,
        price: 39.99,
        amount: 3,
        size: 'S',
        color: 'Verde'
      },
      {
        id: 4,
        name: 'Producto de Ejemplo 4',
        imgUrl: 'https://via.placeholder.com/150',
        description: 'Descripción del producto de ejemplo 4',
        stars: 3.5,
        price: 24.99,
        amount: 1,
        size: 'M',
        color: 'Negro'
      }
    ],
    []
  )

  const total = useMemo(
    () =>
      bagProducts.reduce((prev, curr) => (prev += curr.amount * curr.price), 0),
    [bagProducts]
  )

  const handlePress = () => {
    console.log('Comprado vieja: ' + total)
  }

  const handleDeleteItem = (id: any) => () => {
    console.log('Eliminado: ' + id)
  }

  return (
    <View className='flex-1 mx-2'>
      <Text className='text-black text-3xl font-bold my-2'>My Bag</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={bagProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BagItem product={item} handleDelete={handleDeleteItem(item.id)} />
        )}
      />
      <View className='flex-row justify-between p-2'>
        <Text className='text-gray-400'>Total amount</Text>
        <Text className='font-bold'>${total}</Text>
      </View>
      <Button mode='contained-tonal' className='my-2' onPress={handlePress}>
        Pagar
      </Button>
    </View>
  )
}

interface BagItemProps {
  product: BagProduct
  handleDelete: () => void
}

const BagItem = ({ product, handleDelete }: BagItemProps) => {
  return (
    <View className='flex-row my-1 w-full relative'>
      <IconButton
        onPress={handleDelete}
        icon={'close'}
        size={15}
        className='absolute right-0 top-0'
      />
      {/* Imagen del producto */}
      <View className='w-[100px] h-[100px] mr-2'>
        <Image source={{ uri: product.imgUrl }} className='w-full h-full' />
      </View>

      {/* Información del producto */}
      <View className='flex-1 justify-between'>
        {/* Nombre, color y tamaño del producto */}
        <View>
          <Text className='font-bold'>{product.name}</Text>

          <View className='flex-row gap-2'>
            <Text className='text-gray-400'>
              Color:{' '}
              <Text className='text-black font-semibold'>{product.color}</Text>
            </Text>
            <Text className='text-gray-400'>
              Size:{' '}
              <Text className='text-black font-semibold'>{product.size}</Text>
            </Text>
          </View>
        </View>

        {/* Controles de cantidad y precio */}
        <View className='flex-row items-center justify-between'>
          {/* Botones de cantidad */}
          <View className='flex-row items-center'>
            <IconButton icon={'minus'} size={10} />
            <Text>{product.amount}</Text>
            <IconButton icon={'plus'} size={10} />
          </View>

          {/* Precio del producto */}
          <Text className='font-bold'>
            ${(product.price * product.amount).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  )
}
