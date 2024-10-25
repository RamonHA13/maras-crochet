import { Link } from 'expo-router'
import { View } from 'react-native'

interface Props {
  routes: {
    label: string
    route: string
  }[]
  currentPath: string
}

export default function HeaderNavigation({ routes, currentPath }: Props) {
  return (
    <View className='flex flex-row justify-between py-2'>
      {routes.map(x => (
        <Link
          key={`${x.label}-${x.route}`}
          href={x.route}
          className={`${x.route === currentPath && 'bg-[#E9AFAA] text-white rounded-full'} p-2 text-center`}
        >
          {x.label}
        </Link>
      ))}
    </View>
  )
}
