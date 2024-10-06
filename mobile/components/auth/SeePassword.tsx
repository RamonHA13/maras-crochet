import { useState } from 'react'
import { ViewStyle } from 'react-native'
import { TextInput } from 'react-native-paper'

interface Props {
  value: string
  onChangeText: (text: string) => void
  className?: string
  label?: string
  style?: ViewStyle
}

export default function SeePassword({
  value,
  onChangeText,
  className,
  label,
  style
}: Props) {
  const [see, setSee] = useState(true)

  return (
    <TextInput
      style={style}
      className={className}
      label={label || 'Password'}
      secureTextEntry={see}
      value={value}
      onChangeText={onChangeText}
      right={<TextInput.Icon icon='eye' onPress={() => setSee(!see)} />}
    />
  )
}
