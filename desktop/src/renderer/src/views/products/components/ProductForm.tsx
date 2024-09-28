import InputImage from '@renderer/common/components/InputImage'
import MultipleImages from '@renderer/common/components/MultipleImages'
import { useRef } from 'react'

interface Props<T> {
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onRemoveImage: (url: string) => void
  values: T
  type: 'edit' | 'create'
}

export default function ProductForm<T extends Record<string, any>>({
  onSubmit,
  onRemoveImage,
  onChangeImage,
  onChange,
  values,
  type = 'create'
}: Props<T>) {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleAddMore = () => {
    inputRef.current?.click()
  }

  return (
    <form onSubmit={onSubmit} className="h-full flex flex-col items-center gap-4">
      <div className="flex flex-col items-start w-full">
        <div className="flex justify-between w-full gap-5 px-2">
          <div className="flex flex-col w-1/2">
            <label htmlFor="name">Nombre</label>
            <input
              onChange={onChange}
              type="text"
              name="name"
              className="px-2"
              value={values.name} // Precarga el nombre si existe un producto
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="price">Precio</label>
            <input
              onChange={onChange}
              type="number"
              name="price"
              className="px-2"
              value={values.price} // Precarga el precio si existe un producto
            />
          </div>
        </div>
        <div className="flex flex-col w-full px-2">
          <label htmlFor="description">Descripción</label>
          <textarea
            onChange={onChange}
            name="description"
            className="px-2 resize-none"
            rows={5}
            value={values.description} // Precarga la descripción si existe un producto
          ></textarea>
        </div>
      </div>
      <div className="flex w-full h-36 px-2">
        <MultipleImages
          onRemove={onRemoveImage}
          urls={values.image.map((x) => (typeof x === 'string' ? x : x.url))}
        />
        {/* Generar URLs para las imágenes */}
        <InputImage
          className={`flex flex-col items-center justify-center ${values.image.length > 0 ? 'w-32' : 'w-full'} h-full border-2 border-dashed border-gray-300 text-gray-500 transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700`}
          ref={inputRef}
          onClick={handleAddMore}
          onChange={onChangeImage}
        />
      </div>
      <div className="w-full flex justify-center">
        <input
          type="submit"
          value={type === 'edit' ? 'Actualizar producto' : 'Agregar producto'} // Cambia el texto del botón
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
        />
      </div>
    </form>
  )
}
