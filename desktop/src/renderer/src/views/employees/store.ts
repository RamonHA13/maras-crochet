import { create } from 'zustand'
import { Employee } from './model'
import API from '@renderer/common/utils/API'

//TODO: Agregar estadoss de carga.
interface EmployeeState {
  employees: Employee[]
  fetchEmployees: () => Promise<void>
  addEmployee: (employee: Employee) => Promise<void>
  updateEmployee: (id: string, dataToUpdate: Partial<Employee>) => Promise<void>
  deleteEmployee: (id: string) => Promise<void>
}

const END_POINT = '/user'

const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  fetchEmployees: async () => {
    const [err, data] = await API.get<Employee[]>(END_POINT)
    if (!err) {
      set({ employees: data })
    }
    console.log(data)
  },
  addEmployee: async (employee: Employee) => {
    const [err, data] = await API.post<Employee>(END_POINT, employee)
    if (!err) {
      set((state) => ({
        employees: [...state.employees, data]
      }))
    }
    console.error(err)
  },
  updateEmployee: async (id: string, dataToUpdate: Partial<Employee>) => {
    const [err, data] = await API.patch<Partial<Employee>>(`${END_POINT}/${id}`, dataToUpdate)
    if (!err) {
      set((state) => ({
        employees: state.employees.map((e) => (e.id === id ? { ...e, ...data } : e))
      }))
    }
    console.error(err)
  },
  deleteEmployee: async (id: string) => {
    const [err] = await API.delete<Partial<Employee>>(`${END_POINT}/${id}`)
    if (!err) {
      set((state) => ({ employees: state.employees.filter((e) => e.id !== id) }))
    }
    console.error(err)
  }
}))

export default useEmployeeStore()
