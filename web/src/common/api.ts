import axios, { AxiosRequestConfig } from 'axios'
import { ReturnTuple } from './types'

const API_URL = 'http://localhost:3000/api/v1'

const NullDataError = new Error('Null data')
const UknownError = (error: unknown) =>
  new Error('Uknown error: ' + String(error))

const DEFAULT_CONFIG = {
  headers: { 'Content-type': 'application/json' }
}

const Api = {
  async get<T>(endpoint: string): Promise<ReturnTuple<T>> {
    try {
      const response = await axios.get<T>(`${API_URL}${endpoint}`)
      if (response.data == null) return [NullDataError, null]

      return [null, response.data]
    } catch (error) {
      if (isErrorType(error)) {
        return [error, null]
      }

      return [UknownError(error), null]
    }
  },

  async post<T, U>(
    endpoint: string,
    dataToPost: U,
    config: AxiosRequestConfig = DEFAULT_CONFIG
  ): Promise<ReturnTuple<T>> {
    try {
      const response = await axios.post<T>(
        `${API_URL}${endpoint}`,
        dataToPost,
        config
      )
      if (response.data == null) return [NullDataError, null]

      return [null, response.data]
    } catch (error) {
      if (isErrorType(error)) {
        return [error, null]
      }

      return [UknownError(error), null]
    }
  }
}

const isErrorType = (data: unknown): data is Error => {
  return data instanceof Error
}

export default Api
