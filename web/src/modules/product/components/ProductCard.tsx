import { Link } from 'wouter'
import { ProductResponseDto } from '../../../services/product'
import Routes from '../../../common/routes'

const ProductCard = ({ product }: { product: ProductResponseDto }) => {
  return (
    <article className='border rounded-lg overflow-hidden transition-transform transform'>
      <div className='w-full h-48 flex items-center justify-center bg-gray-200'>
        <img
          src={product.imgUrls[0]}
          alt={`${product.name} image`}
          className='object-cover w-full h-full'
        />
      </div>
      <div className='p-4'>
        <h3 className='text-xl font-semibold'>{product.name}</h3>
        <div className='flex justify-between mt-2'>
          <span className='font-bold text-xl'>${product.price}</span>
          <Link
            href={`${Routes.products.route}${product.id}`}
            className='text-blue-500 underline'
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
