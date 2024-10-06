import { View, Image, Text } from 'react-native'
import { Link } from 'expo-router'
import { Button } from 'react-native-paper'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign'

const logo = require('./../../assets/logo.png')

interface Props {
  type: 'login' | 'signup' | 'forgot-password'
  children: React.ReactNode
  handlePressButton: () => void
  className?: string
}

const buttonDict: Record<Props['type'], string> = {
  login: 'Inicia sesión',
  signup: 'Crea tu cuenta',
  'forgot-password': 'Enviar correo'
}

const optionsDict: Record<Props['type'], React.ReactNode> = {
  login: <LoginOptions />,
  signup: <SignUpOptions />,
  'forgot-password': null
}

export default function AuthLayout({
  type = 'login',
  children,
  handlePressButton,
  className
}: Props) {
  return (
    <View className={`gap-5 h-full p-2 mt-15 ${className}`}>
      <View className='w-full items-center'>
        {(type === 'login' || type === 'forgot-password') && (
          <Image
            source={logo}
            resizeMode='contain'
            className='w-[200px] h-[200px]'
          />
        )}
      </View>
      {children}
      <View className='flex justify-end items-end'>{optionsDict[type]}</View>
      <View className='w-full items-center'>
        <Button
          className='w-3/4'
          mode='contained-tonal'
          onPress={handlePressButton}
        >
          {buttonDict[type]}
        </Button>
      </View>

      {type === 'signup' && (
        <View>
          <Text className='text-center my-5'>
            Or sign up with a social account
          </Text>
          <View className='flex flex-row w-full justify-center'>
            <AntDesign
              name='google'
              size={35}
              color='black'
              style={{ marginHorizontal: 25 }}
            />
            <AntDesign
              name='facebook-square'
              size={35}
              color='black'
              style={{ marginHorizontal: 25 }}
            />
          </View>
        </View>
      )}
    </View>
  )
}

function LoginOptions() {
  return (
    <>
      <View className='flex flex-row items-center gap-1'>
        <Link href='/register' className='underline'>
          You don't have an account?
        </Link>
        <FontAwesome
          name='long-arrow-right'
          size={15}
          color='green'
          className='ml-6'
        />
      </View>
      <View className='flex flex-row items-center gap-1'>
        <Link href='/forgot-password' className='underline'>
          Forgot your password?
        </Link>
        <FontAwesome
          name='long-arrow-right'
          size={15}
          color='green'
          className='ml-6'
        />
      </View>
    </>
  )
}

function SignUpOptions() {
  return (
    <View className='flex flex-row items-center gap-1'>
      <FontAwesome
        name='long-arrow-left'
        size={15}
        color='red'
        className='mr-6'
      />
      <Link href='/login' className='underline'>
        Already have an account?
      </Link>
    </View>
  )
}

/**
 * <View>
        <Text className='text-center my-5'>
          Or sign up with a social account
        </Text>
        <View className='flex flex-row w-full justify-center'>
          <AntDesign
            name='google'
            size={35}
            color='black'
            style={{ marginHorizontal: 25 }}
          />
          <AntDesign
            name='facebook-square'
            size={35}
            color='black'
            style={{ marginHorizontal: 25 }}
          />
        </View>
      </View>
 */
