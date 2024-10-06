import { useCallback, useState } from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-paper'
import SeePassword from '../../components/auth/SeePassword'
import AuthLayout from '../../components/auth/Layout'

interface LoginData {
  email: string
  password: string
}

export default function LoginScreen() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  })

  const handleInputChange = useCallback(
    (key: keyof LoginData) => (value: string) => {
      setLoginData(prev => ({ ...prev, [key]: value }))
    },
    []
  )

  const handlePressButton = () => {
    console.log('Sended', loginData)
  }

  return (
    <AuthLayout type='login' handlePressButton={handlePressButton}>
      <View>
        <TextInput
          className='my-2'
          label='Email'
          value={loginData.email}
          onChangeText={handleInputChange('email')}
          keyboardType='email-address'
          autoCapitalize='none'
          placeholder='some_email@gmail.com'
        />
        <SeePassword
          value={loginData.password}
          onChangeText={handleInputChange('password')}
        />
      </View>
    </AuthLayout>
  )
}
