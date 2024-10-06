import { Stack } from 'expo-router'
import { useState } from 'react'
import { PaperProvider } from 'react-native-paper'

export default function AppLayout() {
  const [token] = useState(false)

  return (
    <PaperProvider>
      {token ? (
        <Stack>
          <Stack.Screen name='(client)/index' />
        </Stack>
      ) : (
        <Stack>
          <Stack.Screen name='(auth)/index' options={{ title: 'Login' }} />
          <Stack.Screen name='(auth)/register' options={{ title: 'Sign up' }} />
          <Stack.Screen
            name='(auth)/forgot-password'
            options={{ title: 'Forgot password' }}
          />
        </Stack>
      )}
    </PaperProvider>
  )
}
