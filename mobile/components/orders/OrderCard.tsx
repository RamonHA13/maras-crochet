import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { Card } from 'react-native-paper'

interface Props {
  order: {
    orderNumber: string
    date: string //De compra
    trackingNumber: string
    quantity: string
    total: number
    details: string
    status: string
  }
}
export default function OrderCard({ order }: Props) {
  const handlePress = () => {
    console.log('Detalles')
  }
  return (
    <Card>
      <Card.Content className='flex-row justify-between mb-2'>
        <Text>
          Order No: <Text className='font-bold'>{order.orderNumber}</Text>
        </Text>
        <Text>{order.date}</Text>
      </Card.Content>
      <Card.Content className='gap-1'>
        <Text>
          Tracking number:{' '}
          <Text className='font-bold'>{order.trackingNumber}</Text>
        </Text>
        <View className='flex-row justify-between'>
          <Text>
            Quantity: <Text className='font-bold'>{order.quantity}</Text>
          </Text>
          <Text>Total Amount: ${order.total}</Text>
        </View>
      </Card.Content>
      <Card.Content className='flex-row justify-between items-center mt-4'>
        <Button mode='outlined' onPress={handlePress}>
          Details
        </Button>
        <Text>{order.status}</Text>
        {/* Cambiar los colores de acuerdo al status */}
      </Card.Content>
    </Card>
  )
}
