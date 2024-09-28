import { forwardRef, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: string
}

const Input = forwardRef<HTMLInputElement, Props>(({ type = 'text', ...rest }: Props, ref) => {
  return <input type={type} {...rest} ref={ref} />
})

export default Input
