import Toast from '@renderer/common/components/Toast'
import ViewLayout from '@renderer/common/layouts/ViewLayout'
import { toast } from 'sonner'
import ProductForm from '../components/ProductForm'
import useProductStore from '../store'
import useAuthStore from '@renderer/common/stores/authStore'
import { useLocation } from 'wouter'
import Routes from '@renderer/common/utils/routes'
import { useCallback, useState } from 'react'

interface Data {
  name: string
  price: number
  description: string
  image: Array<{ file: File; url: string }>
  categoryId: number
}

export default function CreateProductView() {
  const [, redirect] = useLocation()
  const [data, setData] = useState<Data>({
    name: '',
    price: 0,
    description: '',
    image: [],
    categoryId: 0
  })

  const token = useAuthStore((state) => state.token)
  const addProduct = useProductStore((state) => state.addProduct)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    if (data.image.length === 0) {
      toast.error('Debe seleccionar al menos una imagen válida para el producto')
      return
    }

    formData.append('name', data.name)
    formData.append('price', data.price.toString())
    formData.append('description', data.description)
    formData.append('category_id', data.categoryId.toString())
    formData.append('inStock', 'true')
    data.image.forEach((i) => {
      formData.append('image', i.file)
    })

    addProduct(formData, token)
      .then(() => {
        toast.success('Producto agregado correctamente')
        redirect(Routes.Products)
      })
      .catch((e) => {
        console.error(e)
        toast.error('Error añadiendo el producto')
      })
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (!files || files.length === 0) {
      toast.error('Error selecting the images, try later')
      return
    }

    const arrFiles = Array.from(files)
    setData((prev) => ({
      ...prev,
      image: [...prev.image, ...arrFiles.map((file) => ({ file, url: fileToUrl(file) }))]
    }))
  }

  const fileToUrl = (file: File) => URL.createObjectURL(file)
  const handleRemoveImage = (url: string) => {
    setData((prev) => ({
      ...prev,
      image: prev.image.filter((x) => x.url !== url)
    }))
  }

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setData((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  return (
    <ViewLayout title="Crea un producto">
      <Toast />
      <ProductForm<Data>
        type="create"
        values={data}
        onChange={handleChange}
        onRemoveImage={handleRemoveImage}
        onSubmit={handleSubmit}
        onChangeImage={handleChangeImage}
      />
    </ViewLayout>
  )
}
