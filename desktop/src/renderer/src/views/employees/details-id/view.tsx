import ViewLayout from '@renderer/common/layouts/ViewLayout'
import Routes from '@renderer/common/utils/routes'
import { Link, useParams } from 'wouter'
import useEmployeeStore from '../store'

export default function DetailsEmployeeView() {
  const { id } = useParams()
  const getEmployeeById = useEmployeeStore((state) => state.getEmployeeById)
  const employee = getEmployeeById(id!)

  return (
    <ViewLayout
      title={`Empleado
      ${employee ? (employee.name ?? employee.email) : 'Desconocido'}`}
    >
      <div className="flex justify-end px-2">
        <Link
          href={`${Routes.Employees}/edit/${id}`}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out mb-1"
        >
          Editar empleado
        </Link>
      </div>
      <div className="h-3/4 px-2 flex flex-col gap-2">
        <div>
          <h2 className="text-xl font-bold">Nombre</h2>
          <span className="bg-gray-300 w-full block">
            {employee.name ? employee.name : 'Sin nombre'}
          </span>
        </div>
        <div>
          <h2 className="text-xl font-bold">Numero de contacto</h2>
          <span className="bg-gray-300 w-full block">
            {employee.contactNumber ? employee.contactNumber : 'Sin numero de contacto'}
          </span>
        </div>
        <div>
          <h2 className="text-xl font-bold">Email</h2>
          <span className="bg-gray-300 w-full block">{employee.email}</span>
        </div>
        <div>
          <h2 className="text-xl font-bold">Role</h2>
          <ul>
            {employee.role.map((role) => (
              <li key={`${id}-role-${role}`} className="bg-gray-300 w-full block my-2">
                {role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ViewLayout>
  )
}
