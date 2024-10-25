import { Product } from '../types/product'
import { Link } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
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
  const parseDescription = useCallback(() => {
    const details = product.description.slice(0, 25)

    return details + '...'
  }, [product.description])

  return (
    <Link
      asChild
      href={{
        pathname: '/products/[id]',
        params: { id: product.id }
      }}
      className={`${index !== undefined && index === 0 ? 'ml-0 mr-2' : 'mx-2'} my-2 bg-white rounded-lg`}
    >
      <Pressable>
        <View
          style={{
            alignItems: 'center',
            height: height,
            width: width ? width : 190
          }}
        >
          <Image
            source={{ uri: product.imgUrls[0] }}
            className='rounded-tr-md rounded-tl-md w-full h-full'
            resizeMode='cover'
          />
        </View>
        <View className='px-2'>
          <Text className='font-bold text-lg'>{product.name}</Text>
          <Text className='text-xs text-gray-400'>{parseDescription()}</Text>
        </View>
        <View className='flex-row justify-between px-2'>
          <Text className='py-1'>Stars: {product.stars}</Text>
          <Text className='font-bold py-1'>${product.price}</Text>
        </View>
      </Pressable>
    </Link>
  )
}
