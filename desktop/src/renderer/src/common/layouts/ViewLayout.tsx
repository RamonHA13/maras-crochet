import { ReactNode } from 'react'
import { useLocation } from 'wouter'
import SideBar from '../components/SideBar'

interface Props {
  children: ReactNode
}

export default function ViewLayout({ children }: Props) {
  const [location] = useLocation()
  return (
    <div style={{ display: 'flex' }}>
      <SideBar location={location} />
      {children}
    </div>
  )
}
