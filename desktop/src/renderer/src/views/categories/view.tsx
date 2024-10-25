import CrudTable, { Cols } from '@renderer/common/components/CrudTable'
import Toast from '@renderer/common/components/Toast'
import ViewLayout from '@renderer/common/layouts/ViewLayout'
import { CategoryTable } from './model'
import Routes from '@renderer/common/utils/routes'
import { toast } from 'sonner'
import useCategoryStore from './store'
import { useEffect } from 'react'
import { deleteCategoryById, getAllCategories } from './services'
import useAuthStore from '@renderer/common/stores/authStore'

export default function CategoriesView() {
  const categories = useCategoryStore((state) => state.categories)
  const setCategories = useCategoryStore((state) => state.setCategories)
  const deleteCategory = useCategoryStore((state) => state.deleteCategory)
  const token = useAuthStore((state) => state.token)

  //TODO: Cambiar esto a otro lado
  //* HAcerlo optimistic
  useEffect(() => {
    const fetchCategories = async () => {
      const [err, data] = await getAllCategories()
      if (!err) {
        setCategories(data)
        return
      }
      //TODO: Manejar este error
      console.log(err)
    }

    fetchCategories()
  }, [])

  const cols: Cols<CategoryTable>[] = [
    { header: 'Id', accesor: (item) => item.id.toLocaleString() },
    { header: 'Name', accesor: (item) => item.name }
  ]

  const handleDelete = (id: string) => {
    const idParsed = parseInt(id)

    toast.warning('La categoria será eliminada, ¿Desea continuar?', {
      duration: Infinity,
      action: {
        label: 'Eliminar',
        onClick: async () => {
          const [err, _data] = await deleteCategoryById(idParsed, token)
          console.log(err)
          deleteCategory(idParsed)
          toast.success('Categoria eliminada correctamente')
        }
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {}
      }
    })
  }

  const categoriesTable = categories.map((x) => ({ id: x.id, name: x.name }))

  return (
    <>
      <Toast />
      <ViewLayout title="Categorias">
        <CrudTable
          data={categoriesTable}
          cols={cols}
          route={Routes.Categories}
          onDelete={handleDelete}
        />
      </ViewLayout>
    </>
  )
}
