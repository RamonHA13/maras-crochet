import { Redirect } from 'expo-router'
import { useEffect } from 'react'
import useFavoriteStore from '../stores/useFavoritesStore'
import useUserStore from '../stores/useUserStore'

export default function RootScreen() {
  const userAuth = useUserStore(state => state.user.auth)

  const clear = useFavoriteStore(state => state.clear)

  useEffect(() => {
    //TODO:: Quitar esto alv
    clear()
  }, [clear])

  return userAuth?.token ? (
    <Redirect href={'/(app)/home'} />
  ) : (
    <Redirect href={'/(auth)/login'} />
  )
}
