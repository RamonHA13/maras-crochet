import { useEffect } from 'react'
import { useLocation } from 'wouter'

export default function useAuth(locationPath?: string) {
  const [, setLocation] = useLocation()

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (!token) {
      setLocation('/login')
      return
    }

    if (locationPath) {
      setLocation(locationPath)
    }
  }, [])
}
