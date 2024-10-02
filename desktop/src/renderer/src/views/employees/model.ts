// TODO: Separar los modelos por tipo (Table, DTO, etc)

export interface EmployeeTable {
  id: string
  name: string
  rol: string[]
}

export interface Employee {
  id: string
  name?: string
  contactNumber?: number | string
  email: string
  role: string[] //TODO Cambiar esto a un enum
}

export interface EmployeeDetailsDto extends Employee {}
