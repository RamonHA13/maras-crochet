import { TextInput } from 'react-native-paper'
import { Text } from 'react-native'
import { useState } from 'react'
import AuthLayout from '../../components/auth/Layout'

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('')
  const handleInputChange = (value: string) => {
    setEmail(value)
  }
  const handlePressButton = () => {}
  return (
    <AuthLayout handlePressButton={handlePressButton} type='forgot-password'>
      <Text>
        Please, enter your email address. You will receive a link to create a
        new password via email
      </Text>
      <TextInput
        className='my-2'
        label='Email'
        value={email}
        onChangeText={handleInputChange}
        keyboardType='email-address'
        autoCapitalize='none'
        placeholder='some_email@gmail.com'
      />
    </AuthLayout>
  )
}
