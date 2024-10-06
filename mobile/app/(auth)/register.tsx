import { View } from 'react-native'
import AuthLayout from '../../components/auth/Layout'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'
import SeePassword from '../../components/auth/SeePassword'

interface RegisterData {
  email: string
  password: string
  confirmPassword: string
}
export default function RegisterScreen() {
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (key: keyof RegisterData) => (value: string) => {
    setRegisterData(prev => ({ ...prev, [key]: value }))
  }

  const handlePressButton = () => {}

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
