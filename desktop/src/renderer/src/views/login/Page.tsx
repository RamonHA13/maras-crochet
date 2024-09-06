import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import LoginInput from './components/LoginInput'
import './page.css'
import { useLocation } from 'wouter'
import LogoImg from '@renderer/common/components/LogoImg'

export default function LoginPage() {
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
    <div id="login">
      <div className="login__logo">
        <LogoImg />
        <h1>
          Mara's Crochet <br /> Admin
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="login__form">
        <LoginInput value={data.email} type="email" name="email" onChange={handleInputChange} />
        <LoginInput
          value={data.password}
          type="password"
          name="password"
          onChange={handleInputChange}
        />

        <button type="submit">Login</button>
        <button type="button">Forgot password?</button>
      </form>
    </div>
  )
}
