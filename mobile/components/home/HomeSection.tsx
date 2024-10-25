import { ScrollView, Text, View } from 'react-native'
import { Product } from './../../types/product'
import ProductCard from '../ProductCard'

interface Props {
  sectionName: string
  products: Product[]
}

export default function HomeSection({ sectionName, products }: Props) {
  return (
    <View className='mt-2 mx-4'>
      <Text className='text-xl font-bold my-2'>{sectionName}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((x, i) => (
          <ProductCard key={x.id} product={x} index={i} height={100} />
        ))}
      </ScrollView>
    </View>
  )
}
