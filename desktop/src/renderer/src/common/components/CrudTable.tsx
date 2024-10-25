import { Link } from 'wouter'
import Routes from '../utils/routes'
import { useState } from 'react'

interface Props<T extends Record<string, any>> {
  data: T[]
  route: Routes
  onDelete: (id: string) => void
  itemsPerPage?: number
  cols: Cols<T>[]
}

export interface Cols<T> {
  header: string
  accesor: (item: T) => string
}
export default function CrudTable<T extends Record<string, any>>({
  data,
  onDelete,
  route,
  itemsPerPage = 5,
  cols
}: Props<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleDelete = (id: string) => () => {
    onDelete(id)
  }

  return (
    <>
      <div className="flex justify-end px-2">
        <Link
          href={`${route}/create`}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out mb-1"
        >
          Crear Nuevo
        </Link>
      </div>
      <table cellSpacing={3} className="w-full h-4/5 text-center bg-white">
        <thead>
          <tr className="bg-[#BBBBBB] align-top">
            {cols.map((col) => (
              <th key={col.header}>{col.header}</th>
            ))}
            <th></th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((x) => (
            <tr key={x.id}>
              {cols.map((y) => (
                <td key={`row-of-${y.header}`}>{y.accesor(x)}</td>
              ))}
              <td colSpan={3} className="space-x-2">
                <Link
                  href={`${route}/edit/${x.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  Editar
                </Link>
                <Link
                  href={`${route}/${x.id}`}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                >
                  Detalles
                </Link>
                <button
                  onClick={handleDelete(x.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  )
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }
  return (
    <footer className="flex justify-center space-x-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-3 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span>
        {currentPage} de {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-3 rounded disabled:opacity-50"
      >
        Siguiente
      </button>
    </footer>
  )
}
