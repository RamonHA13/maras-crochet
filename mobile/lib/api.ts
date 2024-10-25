import axios, { AxiosRequestConfig } from 'axios'
import { config } from './config'

interface Apieable {
  get: <T>(endpoint: string, config?: AxiosRequestConfig) => Promise<T>
  post: <T>(
    endpoint: string,
    dataToCreate: Partial<T>,
    config?: AxiosRequestConfig
  ) => Promise<T>
  patch: <T>(
    endpoint: string,
    data: Partial<T>,
    config?: AxiosRequestConfig
  ) => Promise<T>
  delete: <T>(
    endpoint: string,
    data: Partial<T>,
    config?: AxiosRequestConfig
  ) => Promise<T>
}

const API_URL = `http://${config.ip}:3000/api/v1`

const DEFAULT_CONFIG = {
  headers: { 'Content-type': 'application/json' }
}

const API: Apieable = {
  get: async <T>(
    endpoint: string,
    config: AxiosRequestConfig = DEFAULT_CONFIG
  ) => {
    const { data } = await axios.get<T>(`${API_URL}${endpoint}`, config)

    return data
  },
  post: async <T>(
    endpoint: string,
    dataToCreate: Partial<T>,
    config: AxiosRequestConfig = DEFAULT_CONFIG
  ) => {
    const response = await axios.post<T>(
      `${API_URL}${endpoint}`,
      dataToCreate,
      config
    )
    return response.data
  },
  patch: async <T>(
    endpoint: string,
    data: Partial<T>,
    config: AxiosRequestConfig = DEFAULT_CONFIG
  ) => {
    const { data: responseData } = await axios.patch<T>(
      `${API_URL}${endpoint}`,
      data,
      config
    )
    return responseData
  },

  // delete method implementation
  delete: async <T>(
    endpoint: string,
    config: AxiosRequestConfig = DEFAULT_CONFIG
  ) => {
    const { data } = await axios.delete<T>(`${API_URL}${endpoint}`, config)
    return data
  }
}

export default API
