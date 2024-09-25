import CrudTable, { Cols } from '@renderer/common/components/CrudTable'
import Toast from '@renderer/common/components/Toast'
import ViewLayout from '@renderer/common/layouts/ViewLayout'
import Routes from '@renderer/common/utils/routes'
import { toast } from 'sonner'
import { Employee } from './model'

export default function EmployeesView() {
  const handleDelete = (id: string) => {
    toast.success('Empleado eliminado correctamente' + id)
    // TODO: Hacer la request y manejar el estado global de los productos
  }

  //TODO: Hacer el estado global de los empleados
  const employees = [
    { id: 1, name: 'John Doe', role: 'admin' },
    { id: 2, name: 'Jane Smith', role: 'admin' },
    { id: 3, name: 'Emily Johnson', role: 'admin' }
  ]
  const cols: Cols<Employee>[] = [
    { header: 'Nombre', accesor: (item) => item['name'] },
    { header: 'Rol', accesor: (item) => item['role'] }
  ]

  return (
    <ViewLayout title="Empleados">
      <Toast />
      <CrudTable
        cols={cols}
        data={employees as Employee[]}
        route={Routes.Employees}
        onDelete={handleDelete}
      />
    </ViewLayout>
  )
}
