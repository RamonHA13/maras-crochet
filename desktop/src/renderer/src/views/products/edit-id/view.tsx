import ViewLayout from '@renderer/common/layouts/ViewLayout'
import { useLocation, useParams } from 'wouter'
import ProductForm from '../components/ProductForm'
import { toast } from 'sonner'
import { Product } from '../model'
import useProductStore from '../store'
import { useCallback, useState } from 'react'
import useAuthStore from '@renderer/common/stores/authStore'
import Routes from '@renderer/common/utils/routes'
import Toast from '@renderer/common/components/Toast'

interface Data {
  name: string
  price: number
  description: string
  image: string[]
  deletedImages: string[]
  categoryId: number
  newImages: Array<{ file: File; url: string }>
}

//TODO: Handle no images case
export default function EditProductView() {
  const { id } = useParams()
  const [, redirect] = useLocation()
  const getProductById = useProductStore((state) => state.getProductById)
  const updateProduct = useProductStore((state) => state.updateProduct)
  const token = useAuthStore((state) => state.token)
  const product: Product = getProductById(id!)
  const [data, setData] = useState<Data>({
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.imgUrls,
    categoryId: product.category.id,
    deletedImages: [],
    newImages: []
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', data.name)
    Object.entries(data).forEach(([key, value]) => {
      if (
        key !== 'name' &&
        data[key] !== product[key] &&
        !key.toLocaleLowerCase().includes('image')
      ) {
        formData.append(
          key === 'categoryId' ? 'category_id' : key,
          typeof value !== 'string' ? String(value) : value
        )
      }
    })

    if (data.newImages.length > 0) {
      data.newImages.forEach((x) => {
        formData.append('image', x.file)
      })
    }
    if (data.deletedImages.length > 0) {
      const filteredDeletedImages = data.deletedImages.filter((x) => !x.startsWith('blob'))

      filteredDeletedImages.forEach((url) => {
        formData.append('deletedImages[]', url)
      })
    }

    let isEmpty = true
    for (const value of formData.values()) {
      if (value && value !== id) {
        isEmpty = false
        break
      }
    }

    if (isEmpty) {
      toast.warning('No ha hecho ningun cambio, desea salir?', {
        action: {
          label: 'Si',
          onClick: () => {
            redirect(Routes.Products)
          }
        },
        cancel: {
          label: 'No',
          onClick: () => {}
        }
      })
      return
    }

    updateProduct(id!, formData, token)
      .then(() => {
        redirect(Routes.Products)
      })
      .catch(() => {
        toast.error('Error actualizando producto, intente despues')
      })
  }

  const fileToUrl = (file: File) => URL.createObjectURL(file)
  const handleRemoveImage = (url: string) => {
    setData((prev) => {
      return {
        ...prev,
        image: prev.image.filter((x) => x !== url),
        newImages: prev.newImages.filter((x) => x.url !== url),
        deletedImages: [...prev.deletedImages, url]
      }
    })
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (!files || files.length === 0) {
      toast.error('Error selecting the images, try later')
      return
    }

    const arrFiles = Array.from(files)
    setData((prev) => {
      const imageUrl = arrFiles.map((file) => ({ file, url: fileToUrl(file) }))
      return {
        ...prev,
        image: [...prev.image, ...imageUrl.map((x) => x.url)],
        newImages: [...prev.newImages, ...imageUrl]
      }
    })
  }

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setData((prev) => ({ ...prev, [name]: value }))
    },
    []
  )
  return (
    <ViewLayout
      title={`Edit the product ${product.name && product.name?.length > 9 ? `${product.name?.slice(0, -9)}...` : product.name}`}
    >
      <Toast />
      <ProductForm
        type="edit"
        onChangeImage={handleChangeImage}
        onRemoveImage={handleRemoveImage}
        onChange={handleChange}
        onSubmit={handleSubmit}
        values={data}
      />
    </ViewLayout>
  )
}
