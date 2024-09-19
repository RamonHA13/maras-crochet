import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import LoginInput from './components/LoginInput'
import { useLocation } from 'wouter'
import LogoImg from '@renderer/common/components/LogoImg'

export default function LoginView() {
  const [, redirect] = useLocation()

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    /**
     * TODO:
     *  - Hacer el request al back
     *  - Guardar el token en el localstorage
     *  - Redirect a home
     */
    redirect('/')
  }

  return (
    <div id="login" className="flex items-center justify-evenly h-screen">
      <div className="text-center">
        <LogoImg />
        <h1 className="text-4xl font-bold">
          Mara's Crochet <br /> Admin
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="login__form flex flex-col gap-3 h-[45%]">
        <LoginInput value={data.email} type="email" name="email" onChange={handleInputChange} />
        <LoginInput
          value={data.password}
          type="password"
          name="password"
          onChange={handleInputChange}
        />

        <button type="submit" className="bg-[#F8D4C5] p-1 rounded-sm font-semibold">
          Login
        </button>
        <button type="button" className="underline">
          Forgot password?
        </button>
      </form>
    </div>
  )
}
