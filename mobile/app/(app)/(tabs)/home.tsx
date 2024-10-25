import { View, Text, ScrollView } from 'react-native'
import CategoryCards from '../../../components/home/CategoryCards'
import HomeSection from '../../../components/home/HomeSection'
import useCategoriesStore from '../../../stores/useCategoriesStore'
import useProductsStore from '../../../stores/useProductsStore'

export default function HomeScreen() {
  const getRecentlyAdded = useProductsStore(state => state.getRecentlyAdded)

  const categories = useCategoriesStore(state => state.categories)
  const products = useProductsStore(state => state.products)
  const recentlyAdded = getRecentlyAdded()

  // console.log(products, recentlyAdded)
  return (
    <ScrollView className='flex-1'>
      <View>
        <Text className='text-black text-center font-bold text-lg my-2'>
          Explora los articulos
        </Text>
        {categories && <CategoryCards categories={categories} />}
      </View>
      <View className='mb-5'>
        {products.length > 0 && (
          <HomeSection sectionName='Popular' products={products} />
        )}
        {recentlyAdded.length > 0 && (
          <HomeSection sectionName='Recien añadidos' products={recentlyAdded} />
        )}
      </View>
    </ScrollView>
  )
}
