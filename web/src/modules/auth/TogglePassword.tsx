import { useState } from 'react'

export default function TogglePassword({
  name = 'password'
}: {
  name?: string
}) {
  const [seePassword, setSeePassword] = useState(false)
  return (
    <div className='flex flex-col'>
      <label htmlFor={name}>Contraseña</label>
      <div className='relative w-64'>
        <input
          type={seePassword ? 'text' : 'password'}
          name={name}
          className='border-2 w-full pr-12 py-2 rounded'
        />
        <button
          type='button'
          onClick={() => setSeePassword(!seePassword)}
          className='absolute right-2 top-1/2 transform -translate-y-1/2 text-sm bg-transparent text-blue-500 focus:outline-none'
        >
          {seePassword ? 'Ocultar' : 'Ver'}
        </button>
      </div>
    </div>
  )
}
