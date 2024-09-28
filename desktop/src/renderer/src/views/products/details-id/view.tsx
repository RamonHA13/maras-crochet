import ViewLayout from '@renderer/common/layouts/ViewLayout'
import Routes from '@renderer/common/utils/routes'
import { Link, useParams } from 'wouter'
import ImageModal from '../components/ImageModal'
import { useMemo, useState } from 'react'
import useProductStore from '../store'

export default function EditProductView() {
  const [modalUrl, setModalUrl] = useState('')
  const { id } = useParams()
  const getProductById = useProductStore((state) => state.getProductById)
  const product = useMemo(() => getProductById(id!), [])

  const handleCloseModal = () => {
    setModalUrl('')
  }

  const handleShowImageModal = (url: string) => () => {
    setModalUrl(url)
  }
  return (
    <ViewLayout title={`Editar el producto ${product.name}`}>
      <div className="flex justify-end px-2">
        <Link
          href={`${Routes.Products}/edit/${id}`}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out mb-1"
        >
          Editar producto
        </Link>
      </div>
      <div className="h-3/4 px-2 flex flex-col gap-2">
        <div className="flex flex-col">
          <h2>Nombre</h2>
          <span className="block w-full bg-slate-300">{product.name}</span>
        </div>
        <div className="flex flex-col">
          <h2>Precio</h2>
          <span className="block w-full bg-slate-300">${product.price}</span>
        </div>
        <div>
          <h2>Descripción</h2>
          <span className="block w-full bg-slate-300">{product.description}</span>
        </div>
        <div>
          <h2>En stock</h2>
          <span className="block w-full bg-slate-300">{product.inStock ? 'Sí' : 'No'}</span>
        </div>
        <div className="w-full flex h-36">
          {/* TODO: Componetizar esto */}
          {product.imgUrls.map((image, index) => (
            <button
              key={`product-image-${image}`}
              className="relative w-0 flex-grow group transition-all duration-500 ease-in-out hover:w-32"
              onClick={handleShowImageModal(image)}
            >
              <img
                className="object-scale-down w-full h-full opacity-80 transition-all duration-500 ease-in-out hover:opacity-100 hover:filter hover:contrast-120"
                key={index}
                src={image}
                alt={`Producto ${index + 1}`}
              />
            </button>
          ))}
        </div>
      </div>
      {modalUrl && <ImageModal onClose={handleCloseModal} url={modalUrl} />}
    </ViewLayout>
  )
}
