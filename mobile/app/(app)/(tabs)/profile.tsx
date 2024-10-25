import { View, Text, ScrollView } from 'react-native'
import {
  Avatar,
  Button,
  Switch,
  TextInput,
  TextInputProps
} from 'react-native-paper'
import useUserStore from '../../../stores/useUserStore'
import { useMemo, useState } from 'react'
import { User } from '../../../types/user'
import { useRouter } from 'expo-router'

export default function ProfileScreen() {
  const router = useRouter()
  const user = useUserStore(state => state.user)
  const setAuth = useUserStore(state => state.setAuth)
  const setData = useUserStore(state => state.setData)
  const iconLabel = useMemo(() => user.data?.name?.slice(0, 2), [user.data])

  const handleChange = (key: string) => (value: string | boolean) => {
    setData(key as keyof User, value)
    //TODO: Hacer esto optimistic
  }

  const handleLogOut = () => {
    console.log('Loggin out')
    setAuth(user.id!, undefined)
    router.replace('/(auth)/login')
  }
  return (
    <ScrollView className='mx-2'>
      <View className='items-center my-2'>
        {iconLabel ? (
          <Avatar.Text size={100} label={iconLabel} />
        ) : (
          <Avatar.Icon
            size={100}
            icon={'account'}
            className='bg-transparent border-2 border-solid border-black'
            color='black'
          />
        )}
      </View>
      <View>
        <DisabledTextInput
          label='Name'
          value={user.data?.name ?? ''}
          onChangeText={handleChange('name')}
        />
        <DisabledTextInput
          label='Email'
          value={user.auth?.email ?? ''}
          onChangeText={handleChange('email')}
          keyboardType='email-address'
          autoCapitalize='none'
          placeholder='some_email@gmail.com'
        />
        <DisabledTextInput
          label={'Number'}
          value={user.data?.contactNumber ?? ''}
          onChangeText={handleChange('contactNumber')}
          keyboardType='phone-pad'
        />
        <DisabledTextInput
          label='Address'
          value={user.data?.contactNumber ?? ''}
          onChangeText={handleChange('mailingAddress')}
          keyboardType='default'
        />
        <View className='flex-row items-center'>
          <Text>Aceptar términos y condiciones</Text>
          <Switch
            onValueChange={
              user.data?.acceptTermsAndConditions
                ? () => setData('acceptTermsAndConditions', true)
                : handleChange('acceptTermsAndConditions')
            }
            value={user.data?.acceptTermsAndConditions ?? false}
          />
        </View>
        <View className='w-full flex items-center justify-center'>
          <Button
            className='w-3/4'
            mode='contained-tonal'
            onPress={handleLogOut}
          >
            Cerrar sesión
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}

interface DisabledTextInputProps extends TextInputProps {
  value: string
  onChangeText: (value: string | boolean) => void
}

const DisabledTextInput: React.FC<DisabledTextInputProps> = ({
  value,
  onChangeText,
  ...rest
}) => {
  const [editable, setEditable] = useState(false)
  const handleSwitch = () => setEditable(!editable)

  return (
    <View className='flex flex-row justify-end items-center w-full'>
      <TextInput
        {...rest}
        editable={editable}
        className='my-2 w-full' // Asegúrate de que ocupe el espacio disponible
        value={value}
        onChangeText={onChangeText}
      />
      <TextInput.Icon
        className='mr-5'
        icon={editable ? 'check' : 'square-edit-outline'}
        onPress={handleSwitch}
        color={editable ? 'green' : 'black'}
      />
    </View>
  )
}
