import { Link } from 'expo-router'
import { Image, Pressable, ScrollView, Text } from 'react-native'
import { Category } from '../../types/product'
import { useCallback } from 'react'

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
  const parseName = useCallback(() => {
    const firstLetter = category.name.slice(0, 1).toLocaleUpperCase()
    const restOfTheNAme = category.name.slice(1)
    return firstLetter + restOfTheNAme
  }, [category])
  return (
    <Link
      asChild
      href={{ pathname: '/category/[id]', params: { id: category.id } }}
      className='flex-1 items-center w-full'
    >
      <Pressable>
        <Image
          className='rounded-md'
          source={{
            uri: category.imgUrls[0] ?? 'https://placehold.co/70x70',
            height: 70,
            width: 70
          }}
          resizeMode='cover'
        />
        <Text className='text-center'>{parseName()}</Text>
      </Pressable>
    </Link>
  )
}
