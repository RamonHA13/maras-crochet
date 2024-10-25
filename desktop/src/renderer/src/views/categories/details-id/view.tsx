import { Link, useParams } from 'wouter'
import useCategoryStore from '../store'
import ViewLayout from '@renderer/common/layouts/ViewLayout'
import Routes from '@renderer/common/utils/routes'
import { useState } from 'react'
import ImageModal from '@renderer/views/products/components/ImageModal'

export default function CategoryDetailsView() {
  const [modalUrl, setModalUrl] = useState('')
  const { id } = useParams()
  const getCategoryById = useCategoryStore((state) => state.getCategoryById)
  const category = getCategoryById(Number(id!))

  return (
    <ViewLayout title={`Categoria ${category.name}`}>
      <div className="flex justify-end px-2">
        <Link
          href={`${Routes.Categories}/edit/${id}`}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out mb-1"
        >
          Editar producto
        </Link>
      </div>

      <div className="flex flex-col gap-5 px-2">
        <div className="flex flex-col gap-2">
          <h2>Nombre</h2>
          <span className="block w-full bg-slate-300 px-2">{category.name}</span>
        </div>

        <div className="w-full flex flex-col h-36">
          <h2>Imagen</h2>
          <button
            key={`product-image-${category.imgUrls}`}
            className="relative flex justify-center w-full group transition-all duration-500 ease-in-out "
            onClick={() => setModalUrl(category.imgUrls[0])}
          >
            <img
              className="object-cover w-40 h-40 opacity-80 transition-all duration-500 ease-in-out hover:opacity-100 hover:filter hover:contrast-120"
              src={category.imgUrls[0]}
              alt={`imagen de categoria ${category.name}`}
            />
          </button>
        </div>
      </div>
      {modalUrl && <ImageModal onClose={() => setModalUrl('')} url={modalUrl} />}
    </ViewLayout>
  )
}
