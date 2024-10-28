import Star from '../../../common/components/Star'

interface Product {
  id: string
  imgUrl: string
  name: string
}
interface Props {
  products: Product[]
}
export default function News({ products }: Props) {
  return (
    <section className='mt-10 mb-14 font-bold px-2'>
      <h2 className='text-3xl text-center'>Novedades</h2>
      <h3 className='text-lg text-center pb-14'> ¡Nuestras recomendaciones!</h3>
      <div className='flex justify-evenly'>
        {products.map(x => (
          <Card key={`${x.name}-${x.id}`} product={x} />
        ))}
      </div>
    </section>
  )
}

//TODO: Cambiar el color de la estrella
export const Card = ({ product }: { product: Product }) => (
  <a href='#' className='rounded-lg w-64 h-64 relative z-30'>
    <Star text='Nuevo' className='absolute -right-10 -top-10 z-10' />
    <img
      src={product.imgUrl}
      className='w-full h-full object-cover rounded-lg' // Añadido rounded-lg para bordes redondeados
      alt={product.name} // Para accesibilidad
    />
    <h4 className='flex items-center justify-center font-bold text-2xl'>
      {product.name}
    </h4>
  </a>
)
