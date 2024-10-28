import Api from '../common/api'

const LOGIN_END_POINT = '/auth/login'

export interface LoginResponseDto {
  id: string
  email: string
  token: string
}

interface LoginData {
  email: string
  password: string
}

export async function login(data: LoginData) {
  return await Api.post<LoginResponseDto, LoginData>(LOGIN_END_POINT, data)
}
