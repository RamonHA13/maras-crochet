import { Link, useLocation } from 'wouter'
import AuthLayout from '../layout'
import TogglePassword from '../TogglePassword'
import Routes from '../../../common/routes'
import { login } from '../../../services/user'
import { toast } from 'sonner'
import useUserStore from '../../../common/stores/useUserStore'

export default function AuthLoginPage() {
  const setAuth = useUserStore(state => state.setAuth)
  const [, redirect] = useLocation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    if (!email || !password) {
      toast.error('No deje espacios en blanco')
      return
    }

    const loginData = {
      email,
      password
    }

    login(loginData).then(tuple => {
      const [err, data] = tuple
      if (err) {
        console.error(err)
        return
      }
      const { id, ...rest } = data
      setAuth(id, rest)
      redirect(Routes.home.route)
    })
    e.currentTarget.reset()
  }

  return (
    <AuthLayout>
      <h2 className='text-center font-bold text-2xl mb-2'>Inicia sesión</h2>
      <div className='flex flex-col justify-center items-center '>
        <form
          action='POST'
          className='flex flex-col gap-2'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col'>
            <label htmlFor='email'>Correo electronico</label>
            <input type='email' name='email' className='border-2' />
          </div>
          <TogglePassword />
          <button type='submit' className='rounded border-2 p-1'>
            Iniciar sesión
          </button>
        </form>
        <div className='flex flex-col justify-start'>
          <Link href={Routes.register.route} className='underline'>
            ¿No tienes cuenta? Crea una!
          </Link>
          <Link href='#' className='underline'>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
