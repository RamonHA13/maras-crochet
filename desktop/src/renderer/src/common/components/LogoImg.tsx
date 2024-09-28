import { ImgHTMLAttributes } from 'react'
import logo from './../../assets/logo.png'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {}
export default function LogoImg({ ...rest }: Props) {
  return <img src={logo} alt="Mara's crochet logo" {...rest} />
}
