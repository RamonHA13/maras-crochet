import { Employee } from './model'

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  employee?: Employee
}

export default function EmployeeForm({ onSubmit, employee }: Props) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 px-2">
      <div className="flex flex-col">
        <label htmlFor="name">Nombre</label>
        <input type="text" name="name" defaultValue={employee?.name || ''} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="contactNumber">Numero de contacto</label>
        <input type="tel" name="contactNumber" defaultValue={employee?.contactNumber || ''} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Correo electronico</label>
        <input type="email" name="email" defaultValue={employee?.email || ''} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="role">Rol</label>
        <select name="role" id="" defaultValue={employee?.role || ''}>
          {/* TODO: Hacer los roles dinamico desde la api */}
          <option value="">Selecciona un rol</option>
          <option value="admin">Admin</option>
          <option value="sudo">Sudo</option>
        </select>
      </div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer mt-16"
        type="submit"
      >
        {employee ? 'Actualizar empleado' : 'Crear empleado'}
      </button>
    </form>
  )
}
