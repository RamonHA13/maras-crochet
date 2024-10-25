import Toast from '@renderer/common/components/Toast'
import ViewLayout from '@renderer/common/layouts/ViewLayout'
import { useParams } from 'wouter'
import useCategoryStore from '../store'
import CategoryForm from '../components/CategoryForm'
import { useState } from 'react'

export default function EditCategoryView() {
  const { id } = useParams()
  const getCategoryById = useCategoryStore((state) => state.getCategoryById)
  const category = getCategoryById(Number(id!))
  const [data, setData] = useState<{ name: string; image: string | null }>({
    name: category.name,
    image: category.imgUrls[0]
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!data.image || data.name) return
    //TODO: HAcer la peticion y actualizar estado
  }

  const handleRemoveImage = () => {
    setData((prev) => ({ ...prev, image: null }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files || files.length === 0) return
    setData((prev) => ({ ...prev, image: URL.createObjectURL(files[0]) }))
  }

  return (
    <ViewLayout title={`Edit the category ${category.name}`}>
      <Toast />
      <CategoryForm
        onRemoveImage={handleRemoveImage}
        data={data}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onImageChange={handleImageChange}
      />
    </ViewLayout>
  )
}
