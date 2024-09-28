import Input from '@renderer/common/components/Input'
import { ChangeEvent, memo, ReactNode, useCallback, useState } from 'react'

interface Props {
  type?: 'password' | 'text' | 'email'
  name: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
}

export default function LoginInput({ type = 'text', name, onChange, value }: Props) {
  const ComponentDict: Record<string, ReactNode> = {
    password: <PasswordInput className="p-1" value={value} name={name} onChange={onChange} />
  }

  const firstLetterToUpperCase = useCallback((name: string) => {
    return name.charAt(0).toLocaleUpperCase() + name.slice(1)
  }, [])

  return (
    <div id="login__input">
      <label htmlFor={name}>{firstLetterToUpperCase(name)}</label>
      {ComponentDict[type] || (
        <Input
          className="flex flex-col"
          type={type}
          onChange={onChange}
          name={name}
          value={value}
        />
      )}
    </div>
  )
}

const PasswordInput = memo(({ onChange, value, name }: Props & { className: string }) => {
  const [view, setView] = useState(false)
  const handleClickViewPassword = () => {
    setView(!view)
  }
  return (
    <div>
      <Input
        type={view ? 'text' : 'password'}
        onChange={onChange}
        name={name}
        value={value}
        style={{ padding: '1% 1% 1% 1%' }}
      />
      <button onClick={handleClickViewPassword} type="button" className="underline">
        {view ? 'Hide password' : 'See password'}
      </button>
    </div>
  )
})
