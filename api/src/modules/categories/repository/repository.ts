export default interface CategoryRepository<T, U> {
  get: (id: number) => Promise<T | null>
  getAll: () => Promise<T[]>
  edit: (id: number, data: Partial<U>) => Promise<T>
  delete: (id: number) => Promise<T>
  create: (data: U) => Promise<T>
}
