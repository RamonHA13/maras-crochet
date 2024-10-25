import Toast from '@renderer/common/components/Toast'
import ViewLayout from '@renderer/common/layouts/ViewLayout'
import useAuthStore from '@renderer/common/stores/authStore'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import useCategoryStore from '../store'
import { createCategory } from '../services'
import { useLocation } from 'wouter'
import Routes from '@renderer/common/utils/routes'
import { toast } from 'sonner'
import CategoryForm from '../components/CategoryForm'

export default function CreateCategoryView() {
  const token = useAuthStore((state) => state.token)
  const addCategory = useCategoryStore((state) => state.addCategory)
  const [, redirect] = useLocation()

  const [data, setData] = useState<{ name: string; image: File | null }>({
    image: null,
    name: ''
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files || files.length < 0) return

    const image = files[0]
    setData((prev) => ({ ...prev, image }))
  }

  const handleRemoveImage = () => {
    setData((prev) => ({ ...prev, image: null }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!data.image) return
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('image', data.image)

    // formData.forEach((value, key) => {
    //   console.log(`${key}:`, value)
    // })

    //TODO: Hacerlo optimistic
    createCategory({ name: data.name, image: data.image }, token).then((tuple) => {
      const [err, response] = tuple
      if (!err) {
        addCategory(response)
        toast.success('Categoria agregada correctamente')

        redirect(Routes.Categories)
        return
      }
      //TODO: Manejar error
      console.log(err)
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const imageToUrl = useCallback((image: File) => URL.createObjectURL(image), [data.image])

  return (
    <ViewLayout title="Crea una categoria">
      <Toast />
      <CategoryForm
        onImageChange={handleImageChange}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onRemoveImage={handleRemoveImage}
        data={{
          name: data.name,
          image: data.image ? imageToUrl(data.image) : ''
        }}
      />
    </ViewLayout>
  )
}
