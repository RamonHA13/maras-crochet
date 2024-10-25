export interface LoginResponseDto {
  id: string
  email: string
  token: string
}

export interface LoginRequestDto {
  email: string
  password: string
}

export interface SignupResponseDto extends LoginResponseDto {}
export type SignupRequestDto = LoginRequestDto & {
  confirmPassword: string
}
