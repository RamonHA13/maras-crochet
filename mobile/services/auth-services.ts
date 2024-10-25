import {
  LoginRequestDto,
  LoginResponseDto,
  SignupRequestDto,
  SignupResponseDto
} from '../types/auth'
import { ReturnTuple } from '../types/common'
import API from '../lib/api'

export async function login(
  authData: LoginRequestDto
): Promise<ReturnTuple<LoginResponseDto>> {
  const LOGIN_END_POINT = '/auth/login'
  try {
    const data = await API.post<LoginResponseDto>(LOGIN_END_POINT, authData)
    return [null, data]
  } catch (error) {
    return [error as Error, null]
  }
}

export async function signup(
  authData: SignupRequestDto
): Promise<ReturnTuple<SignupResponseDto>> {
  const SIGNUP_END_POINT = '/auth/signup'
  try {
    const data = await API.post<SignupResponseDto>(SIGNUP_END_POINT, authData)
    return [null, data]
  } catch (error) {
    return [error as Error, null]
  }
}
