import Toast from '@renderer/common/components/Toast'
import ViewLayout from '@renderer/common/layouts/ViewLayout'
import { useParams } from 'wouter'
import EmployeeForm from '../EmployeeForm'
import { toast } from 'sonner'
import { Employee } from '../model'

export default function EditEmployeeView() {
  const { id } = useParams()
  //TODO: Obtener el empleado y pasarlo por props (Eliminar el placeholder)
  const employeePlaceholder: Employee = {
    id: 1,
    name: 'Juan Pérez',
    contactNumber: '555-1234',
    email: 'juan.perez@example.com',
    role: 'admin' // O podría ser 'sudo'
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    for (const [, val] of formData.entries()) {
      if (!val) {
        toast.error('No deje campos vacios')
        return
      }
    }

    //TODO: Hacer la request
    toast.success('Empleado creado correctamente')
  }

  return (
    <ViewLayout title={`Edita al empleado ${id}`}>
      <Toast />
      <EmployeeForm onSubmit={handleSubmit} employee={employeePlaceholder} />
    </ViewLayout>
  )
}
