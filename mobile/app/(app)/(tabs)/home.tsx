import { View, Text, ScrollView } from 'react-native'
import CategoryCards from '../../../components/home/CategoryCards'
import HomeSection from '../../../components/home/HomeSection'

export default function HomeScreen() {
  //TODO: Cambiar esto a una peticion
  const categories = [
    {
      id: 1,
      name: 'Flores',
      imgUrl: 'https://via.placeholder.com/50?text=Flores'
    },
    {
      id: 2,
      name: 'Llavero',
      imgUrl: 'https://via.placeholder.com/50?text=Llavero'
    },
    {
      id: 3,
      name: 'Ramos',
      imgUrl: 'https://via.placeholder.com/50?text=Ramos'
    },
    {
      id: 4,
      name: 'Amigurumi',
      imgUrl: 'https://via.placeholder.com/50?text=Amigurumi'
    }
  ]

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

  const recentlyAdded = [
    {
      id: 5,
      name: 'Producto 1',
      imgUrl: 'https://via.placeholder.com/150', // URL de imagen de ejemplo
      description: 'Descripción del producto 1',
      stars: 4.5,
      price: 19.99
    },
    {
      id: 6,
      name: 'Producto 2',
      imgUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      stars: 3.8,
      price: 29.99
    },
    {
      id: 7,
      name: 'Producto 3',
      imgUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 3',
      stars: 4.0,
      price: 24.99
    },
    {
      id: 8,
      name: 'Producto 4',
      imgUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 4',
      stars: 5.0,
      price: 39.99
    }
  ]

  return (
    <ScrollView className='flex-1'>
      <View>
        <Text className='text-black text-center font-bold text-lg my-2'>
          Explora los articulos
        </Text>
        <CategoryCards categories={categories} />
      </View>
      <View className='mb-5'>
        <HomeSection sectionName='Popular' products={products} />
        <HomeSection sectionName='Recien añadidos' products={recentlyAdded} />
      </View>
    </ScrollView>
  )
}
