import { Stack } from 'expo-router'
import useProductsStore from '../../stores/useProductsStore'
import useCategoriesStore from '../../stores/useCategoriesStore'
import { useEffect } from 'react'
import { getAllCategories } from '../../services/categories'
import { getAllProducts } from '../../services/products'

export default function AppLayout() {
  const setProducts = useProductsStore(state => state.setProducts)
  const setCategories = useCategoriesStore(state => state.setCategories)

  useEffect(() => {
    getAllProducts().then(tuple => {
      const [err, data] = tuple
      if (err) {
        console.log(err)
      }
      //TODO: Validar esto
      setProducts(data!)
    })
  }, [setProducts])

  useEffect(() => {
    getAllCategories().then(tuple => {
      const [err, data] = tuple
      if (err) {
        console.log(err)
      }
      //TODO: Validar esto
      setCategories(data!)
    })
  }, [setCategories])

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='products/[id]' options={{ title: '' }} />
    </Stack>
  )
}
