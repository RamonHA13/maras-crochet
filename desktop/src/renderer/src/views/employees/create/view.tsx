import Toast from '@renderer/common/components/Toast'
import ViewLayout from '@renderer/common/layouts/ViewLayout'
import { toast } from 'sonner'
import EmployeeForm from '../EmployeeForm'

export default function CreateEmployeeView() {
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
    <ViewLayout title="Crea un empleado">
      <Toast />
      <EmployeeForm onSubmit={handleSubmit} />
    </ViewLayout>
  )
}
