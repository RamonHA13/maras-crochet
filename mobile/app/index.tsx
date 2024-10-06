import { Redirect } from 'expo-router'
import { useState } from 'react'

export default function RootScreen() {
  const [token] = useState(false)

  return token ? (
    <Redirect href={'/(app)/home'} />
  ) : (
    <Redirect href={'/(auth)/login'} />
  )
}
