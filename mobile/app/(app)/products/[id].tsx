import { useLocalSearchParams, useRouter } from 'expo-router'
import { ScrollView, Text, View, Image } from 'react-native'
import useProductsStore from '../../../stores/useProductsStore'
import { Button, IconButton } from 'react-native-paper'
import useFavoriteStore from '../../../stores/useFavoritesStore'
import { BlurView } from 'expo-blur'
import { StyleSheet } from 'react-native'
import useBagStore from '../../../stores/useBagStore'

export default function ProductByIdScreen() {
  const { id } = useLocalSearchParams<{ id: any }>()
  const router = useRouter()

  const getProductById = useProductsStore(state => state.getProductById)

  const isFavoriteProduct = useFavoriteStore(state => state.isFavoriteProduct)
  const setFavorite = useFavoriteStore(state => state.setProduct)
  const removeProduct = useFavoriteStore(state => state.removeProduct)

  const setBagProduct = useBagStore(state => state.setBagProduct)
  const product = getProductById(id)
  const isFavorite = isFavoriteProduct(id)

  const handlePress = () => {
    setBagProduct(product)
    router.navigate('/(tabs)/bag')
  }

  const handleFavorite = () => {
    if (isFavorite) {
      removeProduct(id)
    } else {
      setFavorite(product)
    }
  }
  return (
    <View className='flex flex-col justify-between h-full relative'>
      <View className='flex-row justify-between items-center mx-2 absolute z-50 right-0'>
        <IconButton
          iconColor='red'
          icon={isFavorite ? 'heart' : 'heart-outline'}
          size={35}
          onPress={handleFavorite}
        />
      </View>
      <View style={styles.container}>
        {/* Imagen de fondo con blur */}
        {product && product.imgUrls[0] && (
          <Image
            source={{ uri: product.imgUrls[0] }}
            style={StyleSheet.absoluteFillObject}
            resizeMode='cover' // Para que cubra todo el fondo
            blurRadius={20} // Aplica un blur nativo
          />
        )}

        <BlurView intensity={0} style={styles.blurContainer}>
          {/* ScrollView con imágenes originales */}
          <ScrollView
            horizontal
            contentContainerStyle={styles.scrollViewContent}
          >
            {product &&
              product.imgUrls.map(x => (
                <Image
                  key={`image-${x}`}
                  style={styles.image}
                  source={{ uri: x }}
                  resizeMode='contain' // Mantiene las proporciones originales
                />
              ))}
          </ScrollView>
        </BlurView>
      </View>

      <View className='mx-2'>
        <Text className='text-2xl font-bold'>
          {product.name.slice(0, 1).toLocaleUpperCase() + product.name.slice(1)}
        </Text>
        <Text className='pb-1'>{product.description}</Text>
        {product.stars && <Text className='py-1'>Stars: {product.stars}</Text>}
        <Text>${product.price} MXN</Text>
      </View>

      <Button mode='contained' className='mx-2 my-2' onPress={handlePress}>
        Añadir a la bolsa
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  blurContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollViewContent: {
    alignItems: 'center'
  },
  image: {
    width: 255,
    height: 255,
    shadowColor: 'white',
    shadowRadius: 10,
    shadowOpacity: 1
  }
})
