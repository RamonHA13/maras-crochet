import { Toaster, ToasterProps } from 'sonner'

interface Props extends ToasterProps {}
export default function Toast(props: Props) {
  return <Toaster closeButton duration={Infinity} richColors position="top-right" {...props} />
}
