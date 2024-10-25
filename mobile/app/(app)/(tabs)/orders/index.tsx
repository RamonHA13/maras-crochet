import OrderCard from '../../../../components/orders/OrderCard'
export default function OrdersScreen() {
  const order = {
    orderNumber: 'ORD123456',
    date: '2024-10-07', // Fecha de compra
    trackingNumber: 'TRACK7890',
    quantity: '3',
    total: 99.99,
    details: 'Compra de tres artículos: camiseta, pantalones, y zapatillas.',
    status: 'Delivered'
  }
  return (
    <>
      <OrderCard order={order} />
    </>
  )
}
