import { ReactNode } from 'react'
import { useLocation } from 'wouter'
import SideBar from '../components/SideBar'
import useDate from '../hooks/useDate'
import BackButton from '../components/BackButton'
import NetworkStatus from '../components/NetworkStatus'
import useAuthStore from '../stores/authStore'

interface Props {
  children: ReactNode
  title?: string
}

export default function ViewLayout({ children, title }: Props) {
  const [location] = useLocation()
  const userEmail = useAuthStore((state) => state.email)
  return (
    <div className="flex justify-between h-screen">
      <SideBar location={location} userEmail={userEmail} />
      <div className="h-full w-full flex flex-col relative bg-[#E8E8E8] rounded-s-3xl">
        <NetworkStatus />
        <h2 className="text-3xl text-center font-bold uppercase mt-14 mb-5 relative ">
          <BackButton />
          {title}
        </h2>
        <div className="flex flex-col flex-grow justify-around items-center h-full">
          <div className="h-full w-full">{children}</div>
        </div>
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
