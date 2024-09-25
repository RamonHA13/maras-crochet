// TODO: Separar los modelos por tipo (Table, DTO, etc)

export interface Employee {
  id: number
  name: string
  contactNumber: number | string
  email: string
  role: string //TODO Cambiar esto a un enum
}
