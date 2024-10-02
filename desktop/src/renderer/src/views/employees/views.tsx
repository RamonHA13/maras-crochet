import CrudTable, { Cols } from '@renderer/common/components/CrudTable'
import Toast from '@renderer/common/components/Toast'
import ViewLayout from '@renderer/common/layouts/ViewLayout'
import Routes from '@renderer/common/utils/routes'
import { toast } from 'sonner'
import { Employee } from './model'
import useEmployeeStore from './store'
import { useEffect } from 'react'
import useAuthStore from '@renderer/common/stores/authStore'

export default function EmployeesView() {
  const token = useAuthStore((state) => state.token)
  const employees = useEmployeeStore((state) => state.employees)
  const fetchEmployees = useEmployeeStore((state) => state.fetchEmployees)

  useEffect(() => {
    fetchEmployees(token).catch((e) => console.error(e))
  }, [])
  const handleDelete = (id: string) => {
    toast.success('Empleado eliminado correctamente' + id)
    // TODO: Hacer la request y manejar el estado global de los productos
  }

  const cols: Cols<Employee>[] = [
    { header: 'Nombre', accesor: (item) => item['name'] || item['email'] },
    { header: 'Rol', accesor: (item) => item['role'].join(' - ') }
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
