import { useParams } from 'wouter'
import AppLayout from '../../common/components/AppLayout'
import useProductStore from '../../common/stores/useProductStore'
import { useState } from 'react'
import useCartStore from '../../common/stores/useCartStore'

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()

  const addToCart = useCartStore(state => state.addToCart)

  const getById = useProductStore(state => state.getById)
  const product = getById(id)

  const [selectedImage, setSelectedImage] = useState(product.imgUrls[0])

  const handleSelectedImage = (url: string) => () => setSelectedImage(url)

  const handleAddToCar = () => {
    addToCart({
      id: crypto.randomUUID(),
      originalId: product.id,
      price: product.price,
      name: product.name,
      imgUrl: product.imgUrls[0]
    })
  }

  return (
    <AppLayout>
      <div className='flex px-6 my-16'>
        {/* Aside for thumbnails */}
        <aside className='flex flex-col w-1/6 px-4 border-r-2 border-gray-300 '>
          {product.imgUrls.map((x, i) => (
            <button
              key={`${x}-i`}
              onClick={handleSelectedImage(x)}
              className={`${x !== selectedImage && 'opacity-65 hover:opacity-100 hover:scale-105'} mb-2 transition-transform transform `}
            >
              <img
                src={x}
                alt={`${product.name} image-${i + 1}`}
                className='rounded-md '
              />
            </button>
          ))}
        </aside>

        {/* Main image */}
        <div className='flex-1 flex items-center justify-center'>
          <img
            src={selectedImage}
            alt={`${product.name} image`}
            className='w-full h-auto max-w-xl border rounded-lg shadow-lg'
          />
        </div>

        <div className='flex flex-col justify-between pl-4 w-1/3'>
          <div className='border-b border-gray-300 pb-2 mb-4'>
            <h2 className='text-2xl font-bold'>{product.name}</h2>
            <span className='text-xl font-semibold'>${product.price} MXN</span>
          </div>

          {/* Descripción pegada al primer div */}
          <div className='flex-grow'>
            <h3 className='text-xl font-semibold'>Descripción</h3>
            <p>{product.description}</p>
          </div>

          {/* Botón siempre al final */}
          <button
            onClick={handleAddToCar}
            className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
