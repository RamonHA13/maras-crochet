import { ReactNode } from 'react'
import { useLocation } from 'wouter'
import SideBar from '../components/SideBar'
import useDate from '../hooks/useDate'
import BackButton from '../components/BackButton'
import NetworkStatus from '../components/NetworkStatus'

interface Props {
  children: ReactNode
  title?: string
}

export default function ViewLayout({ children, title }: Props) {
  const [location] = useLocation()
  return (
    <div className="flex justify-between h-screen">
      <SideBar location={location} />
      <div className="h-full w-full flex flex-col relative">
        <NetworkStatus />
        <h2 className="text-3xl text-center font-bold uppercase my-14 relative">
          <BackButton />
          {title}
        </h2>
        <div className="flex flex-col flex-grow justify-around items-center">{children}</div>
        <footer className="pb-5">
          <Timer />
        </footer>
      </div>
    </div>
  )
}

const Timer = () => {
  const { time, toHumanReadeable } = useDate()

  return (
    <div className="text-center">
      <span className="text-2xl font-semibold">{time}</span> <br />
      <span className="text-2xl font-semibold">{toHumanReadeable()}</span>
    </div>
  )
}
