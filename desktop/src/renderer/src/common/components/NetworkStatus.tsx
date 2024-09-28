import { useEffect, useState } from 'react'
import './NetworkStatus.css'

export default function NetworkStatus() {
  const [online, setOnline] = useState<boolean>(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true)
    }
    const handleOffline = () => {
      setOnline(false)
    }

    window.addEventListener('online', handleOnline)

    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <span className="absolute right-5 top-5">
      {online ? <NetworkLogo online={online} /> : <NetworkLogo online={online} />}
    </span>
  )
}

const NetworkLogo = ({ online }: { online: boolean }) => {
  return (
    <div className={`${online ? 'wifi-online' : 'wifi-offline'} flex gap-2 items-center`}>
      <span className={`${online ? '#4caf50' : '#f44336'}`}> {online ? 'Online' : 'Offline'}</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="wifi-icon"
      >
        <path
          d="M12 18c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-14C5.37 4 0 9.37 0 16h2c0-5.52 4.48-10 10-10s10 4.48 10 10h2c0-6.63-5.37-12-12-12zm0 4c-4.42 0-8 3.58-8 8h2c0-3.31 2.69-6 6-6s6 2.69 6 6h2c0-4.42-3.58-8-8-8z"
          fill={`${online ? '#4caf50' : '#f44336'}`}
        />
      </svg>
    </div>
  )
}
