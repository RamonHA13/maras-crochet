import { useLocalSearchParams } from 'expo-router'
import { FlatList, Text, View } from 'react-native'
import ProductCard from '../../../../components/ProductCard'
import useProductsStore from '../../../../stores/useProductsStore'
import useCategoriesStore from '../../../../stores/useCategoriesStore'
import { useCallback } from 'react'

export default function ProductsByCategoryIdScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const getProductByCategory = useProductsStore(
    state => state.getProductByCategory
  )
  const getCategoryById = useCategoriesStore(state => state.getCategoryById)
  const categoryData = getCategoryById(Number(id))
  const products = getProductByCategory(Number(id))

  const parseName = useCallback(
    () =>
      categoryData.name.slice(0, 1).toLocaleUpperCase() +
      categoryData.name.slice(1),
    [categoryData.name]
  )
  return (
    <View className='flex-1'>
      <Text className='text-center text-xl font-bold my-2'>{parseName()}</Text>
      <FlatList
        className='mb-2'
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={item} height={150} width={345} />
        )}
      />
    </View>
  )
}
