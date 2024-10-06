import { Link } from 'expo-router'
import { Pressable, Text, Image } from 'react-native'
import { IconButton } from 'react-native-paper'

const logo = require('./../assets/logo.png')

export const HeaderImage = ({ className }: { className?: string }) => {
  return (
    <Link href={'/(app)/home'} asChild className={className}>
      <Pressable className='flex flex-row items-center gap-2'>
        <Image source={logo} className='w-[50px] h-[50px]' />
        <Text className='font-bold'>Mara's Crochet</Text>
      </Pressable>
    </Link>
  )
}

export const HeaderSearch = ({ onPress }: { onPress: () => void }) => {
  return <IconButton size={25} icon={'magnify'} onPress={onPress} />
}
