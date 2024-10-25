import { Slot, usePathname } from 'expo-router'
import { View, Text, ScrollView } from 'react-native'
import HeaderNavigation from '../../../../components/orders/HeaderNavigation'

export default function OrdersLayout() {
  const pathname = usePathname()
  const routes = [
    {
      label: 'Delivered',
      route: '/orders'
    },
    {
      label: 'Processing',
      route: '/orders/processing'
    },
    {
      label: 'Cancelled',
      route: '/orders/cancelled'
    }
  ]
  return (
    <View className='mx-2 flex-1'>
      <HeaderNavigation routes={routes} currentPath={pathname} />
      <Text className='text-black text-3xl font-bold my-2'>My Orders</Text>
      <ScrollView>
        <Slot />
      </ScrollView>
    </View>
  )
}
