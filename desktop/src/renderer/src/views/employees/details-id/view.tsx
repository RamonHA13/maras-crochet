import ViewLayout from '@renderer/common/layouts/ViewLayout'
import Routes from '@renderer/common/utils/routes'
import { Link, useParams } from 'wouter'

export default function DetailsEmployeeView() {
  const { id } = useParams()
  return (
    <ViewLayout title={`Empleado ${id}`}>
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
          <span className="bg-gray-300 w-full block">Nombre del empleado</span>
        </div>
        <div>
          <h2 className="text-xl font-bold">Numero de contacto</h2>
          <span className="bg-gray-300 w-full block">35421.2135453</span>
        </div>
        <div>
          <h2 className="text-xl font-bold">Email</h2>
          <span className="bg-gray-300 w-full block">Email del empleado</span>
        </div>
        <div>
          <h2 className="text-xl font-bold">Role</h2>
          <ul>
            <li className="bg-gray-300 w-full block">Role 1</li>
            <li className="bg-gray-300 w-full block">Role 2</li>
          </ul>
        </div>
      </div>
    </ViewLayout>
  )
}
