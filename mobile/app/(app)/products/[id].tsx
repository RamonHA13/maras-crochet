import { useLocalSearchParams } from 'expo-router'
import { ScrollView, Text, View, Image } from 'react-native'
import useProductsStore from '../../../stores/useProductsStore'
import { Button, IconButton } from 'react-native-paper'
import useFavoriteStore from '../../../stores/useFavoritesStore'
import { BlurView } from 'expo-blur'
import { StyleSheet } from 'react-native'

export default function ProductByIdScreen() {
  const { id } = useLocalSearchParams<{ id: any }>()
  const getProductById = useProductsStore(state => state.getProductById)
  const isFavoriteProduct = useFavoriteStore(state => state.isFavoriteProduct)
  const setFavorite = useFavoriteStore(state => state.setProduct)
  const removeProduct = useFavoriteStore(state => state.removeProduct)

  const product = getProductById(id)
  const isFavorite = isFavoriteProduct(id)

  const handlePress = () => {
    console.log('Comprado: ' + id)
  }

  const handleFavorite = () => {
    if (isFavorite) {
      removeProduct(id)
    } else {
      setFavorite(product)
    }
  }
  return (
    <View className='flex flex-col justify-between h-full'>
      <View className='flex-row justify-between items-center mx-2'>
        {/* <IconButton
          iconColor='red'
          icon={isFavorite ? 'heart' : 'heart-outline'}
          size={35}
          onPress={handleFavorite}
        /> */}
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

        <BlurView intensity={100} style={styles.blurContainer}>
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
        <Text className='text-2xl font-bold'>{product.name}</Text>
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
    backgroundColor: 'rgba(0,0,0,.5)',
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
