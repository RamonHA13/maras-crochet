import axios, { AxiosRequestConfig } from 'axios'
import { ReturnTuple } from './types'

export interface HttpService {
  API_URL: string
  get: <T>(endpoint: string, config?: AxiosRequestConfig) => Promise<ReturnTuple<T>>
  post: <T>(enpont: string, body: any, config?: AxiosRequestConfig) => Promise<ReturnTuple<T>>
  patch: <T>(endpoint: string, body: any, config: AxiosRequestConfig) => Promise<ReturnTuple<T>>
  delete: <T>(endpoint: string, config: AxiosRequestConfig) => Promise<ReturnTuple<T>>
}

const API: HttpService = {
  //TODO: Cambiar esta url por una env variable
  API_URL: 'http://localhost:3000/api/v1',
  get: async function <T>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): Promise<ReturnTuple<T>> {
    try {
      const response = await axios.get<T>(`${this.API_URL}${endpoint}`, config)
      return [null, response.data]
    } catch (error) {
      return [error as Error, null]
    }
  },
  post: async function <T>(
    endpoint: string,
    body: any,
    config: AxiosRequestConfig = {}
  ): Promise<ReturnTuple<T>> {
    try {
      const response = await axios.post<T>(`${this.API_URL}${endpoint}`, body, config)
      return [null, response.data]
    } catch (e) {
      return [e as Error, null]
    }
  },
  patch: async function <T>(
    endpoint: string,
    body: any,
    config: AxiosRequestConfig = {}
  ): Promise<ReturnTuple<T>> {
    try {
      const reponse = await axios.patch<T>(`${this.API_URL}${endpoint}`, body, config)
      return [null, reponse.data]
    } catch (error) {
      return [error as Error, null]
    }
  },
  delete: async function <T>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): Promise<ReturnTuple<T>> {
    try {
      const response = await axios.delete(`${this.API_URL}${endpoint}`, config)
      return [null, response.data]
    } catch (e) {
      return [e as Error, null]
    }
  }
}

export default API
