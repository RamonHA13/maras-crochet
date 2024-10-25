import { useState } from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useRouter } from 'expo-router'

import AuthLayout from '../../components/auth/Layout'
import SeePassword from '../../components/auth/SeePassword'
import useUserStore from '../../stores/useUserStore'
import { signup } from '../../services/auth-services'

interface RegisterData {
  email: string
  password: string
  confirmPassword: string
}
export default function RegisterScreen() {
  const router = useRouter()
  const setAuth = useUserStore(state => state.setAuth)

  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (key: keyof RegisterData) => (value: string) => {
    setRegisterData(prev => ({ ...prev, [key]: value }))
  }

  const handlePressButton = () => {
    signup(registerData).then(tuple => {
      const [err, data] = tuple
      if (err) {
        console.log(err)
        return
      }
      const { id, ...rest } = data
      setAuth(id, rest)
      router.replace('/(app)/home')
    })
  }

  return (
    <AuthLayout
      type='signup'
      className=''
      handlePressButton={handlePressButton}
    >
      <View>
        <TextInput
          className='mb-1'
          label='Email'
          value={registerData.email}
          onChangeText={handleInputChange('email')}
          keyboardType='email-address'
          autoCapitalize='none'
          placeholder='some_email@gmail.com'
        />
        <SeePassword
          onChangeText={handleInputChange('email')}
          value={registerData.password}
          className='mb-1'
        />
        <SeePassword
          label='Confirm password'
          onChangeText={handleInputChange('confirmPassword')}
          value={registerData.confirmPassword}
        />
      </View>
    </AuthLayout>
  )
}
