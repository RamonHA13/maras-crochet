import { useCallback, useState } from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-paper'
import SeePassword from '../../components/auth/SeePassword'
import AuthLayout from '../../components/auth/Layout'
import useUserStore from '../../stores/useUserStore'
import { login } from '../../services/auth-services'
import { useRouter } from 'expo-router'
import AuthDialog from '../../components/Dialog'

interface LoginData {
  email: string
  password: string
}

export default function LoginScreen() {
  const router = useRouter()
  const setAuth = useUserStore(state => state.setAuth)

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  })
  const [showDialog, setDialog] = useState(false)

  const handleInputChange = useCallback(
    (key: keyof LoginData) => (value: string) => {
      setLoginData(prev => ({ ...prev, [key]: value }))
    },
    []
  )

  const handlePressButton = () => {
    const canPress = Object.entries(loginData).some(
      ([key, value]) => value !== ''
    )

    if (!canPress) {
      console.log(loginData)
      setDialog(true)
      return
    }

    login(loginData).then(tuple => {
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
    <>
      {showDialog && <AuthDialog onDismiss={() => setDialog(false)} />}
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
    </>
  )
}
