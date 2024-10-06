import { Product } from '../lib/types'
import { Link } from 'expo-router'
import { Pressable, Text, View, Image } from 'react-native'

interface CardProps {
  product: Product
  index?: number
  height: number
  width?: number
}

export default function ProductCard({
  product,
  height,
  index,
  width
}: CardProps) {
  return (
    <Link
      asChild
      href={{
        pathname: '/products/[id]',
        params: { id: product.id }
      }}
      className={`${index !== undefined && index === 0 ? 'ml-0 mr-2' : 'mx-2'} `}
    >
      <Pressable>
        <View
          style={{
            alignItems: 'center',
            height: height,
            width: width ? width : '100%'
          }}
        >
          <Image
            source={{ uri: product.imgUrl }}
            className='rounded-md w-full h-full'
            resizeMode='cover'
          />
        </View>
        <View>
          <Text className='font-bold text-lg'>{product.name}</Text>
          <Text className='text-xs text-gray-400'>{product.description}</Text>
        </View>
        <View className='flex-row justify-between'>
          <Text className='py-1'>Stars: {product.stars}</Text>
          <Text className='font-bold py-1'>${product.price}</Text>
        </View>
      </Pressable>
    </Link>
  )
}
