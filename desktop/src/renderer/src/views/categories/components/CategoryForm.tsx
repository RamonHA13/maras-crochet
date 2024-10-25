import InputImage from '@renderer/common/components/InputImage'
import { useCallback, useRef } from 'react'

interface Props {
  data: {
    image: string | null
    name: string
  }
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImage: () => void
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CategoryForm({
  onSubmit,
  onChange,
  onRemoveImage,
  onImageChange,
  data
}: Props) {
  const inputImageRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    inputImageRef.current!.click()
  }

  return (
    <form className="flex flex-col gap-2 px-2" onSubmit={onSubmit}>
      <div className="flex flex-col">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          className="px-2"
          name="name"
          value={data.name ?? ''}
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col gap-5">
        <label htmlFor="imgUrls">Imagen</label>
        <div className="w-full flex">
          {data.image ? (
            <button
              className="relative flex items-center justify-center flex-grow group transition-all duration-500 ease-in-out"
              onClick={onRemoveImage}
            >
              <img
                className="object-scale-down w-44 opacity-80 transition-all duration-500 ease-in-out hover:opacity-100 hover:filter hover:contrast-120 "
                src={data.image}
                alt="Imagen de categoria seleccionada"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                <span className="text-white text-lg">Click para eliminar</span>
              </div>
            </button>
          ) : (
            <InputImage
              className="w-full h-44"
              ref={inputImageRef}
              onClick={handleImageClick}
              onChange={onImageChange}
            />
          )}
        </div>
      </div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer mt-16"
        type="submit"
      >
        Crear categoria
      </button>
    </form>
  )
}
