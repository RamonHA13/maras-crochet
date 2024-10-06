import { Link } from 'expo-router'
import { Image, Pressable, ScrollView, Text } from 'react-native'
import { Category } from '../../lib/types'

interface Props {
  categories: Category[]
}

export default function CategoryCards({ categories }: Props) {
  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        width: '100%'
      }}
    >
      {categories && categories.map(x => <Card key={x.name} category={x} />)}
    </ScrollView>
  )
}

interface CardProps {
  category: Category
}
export function Card({ category }: CardProps) {
  return (
    <Link
      asChild
      href={{ pathname: '/category/[id]', params: { id: category.id } }}
      className='flex-1 items-center w-full'
    >
      <Pressable>
        <Image
          source={{ uri: category.imgUrl }}
          resizeMode='cover'
          height={70}
          width={70}
        />
        <Text className='text-center'>{category.name}</Text>
      </Pressable>
    </Link>
  )
}
