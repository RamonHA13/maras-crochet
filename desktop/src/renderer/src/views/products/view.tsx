import CrudTable, { Cols } from '@renderer/common/components/CrudTable'
import Toast from '@renderer/common/components/Toast'
import ViewLayout from '@renderer/common/layouts/ViewLayout'
import Routes from '@renderer/common/utils/routes'
import { toast } from 'sonner'
import { ProductTable } from './model'
import useProductStore from './store'
import { useEffect } from 'react'
import useAuthStore from '@renderer/common/stores/authStore'

export default function ProductsView() {
  const token = useAuthStore((state) => state.token)
  const products = useProductStore((state) => state.products)
  const fetchProducts = useProductStore((state) => state.fetchProducts)
  const deleteProduct = useProductStore((state) => state.deleteProduct)

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = (id: string) => {
    toast.warning('El producto será eliminado,¿desea continuar?', {
      duration: Infinity,
      action: {
        label: 'Eliminar',
        onClick: () =>
          deleteProduct(id, token)
            .then(() => {
              toast.success('Producto eliminado correctamente')
            })
            .catch((e) => {
              console.error(e)
              toast.error('Error eliminando el producto, intente despues')
            })
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {}
      }
    })
  }

  const productsTable = products.map<ProductTable>((x) => ({
    id: x.id,
    name: x.name,
    stock: x.inStock
  }))
  const cols: Cols<ProductTable>[] = [
    { header: 'Name', accesor: (item) => item['name'] },
    { header: 'Stock', accesor: (item) => String(item['stock']) }
  ]
  return (
    <>
      <Toast />
      <ViewLayout title="Productos">
        <CrudTable
          cols={cols}
          data={productsTable}
          onDelete={handleDelete}
          route={Routes.Products}
        />
      </ViewLayout>
    </>
  )
}
