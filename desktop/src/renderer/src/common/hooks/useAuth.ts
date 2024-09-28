import { useEffect } from 'react'
import { useLocation } from 'wouter'
import useAuthStore from '../stores/authStore'

export default function useAuth(locationPath?: string) {
  const [, setLocation] = useLocation()
  const token = useAuthStore((state) => state.token)
  useEffect(() => {
    if (!token) {
      setLocation('/login')
      return
    }

    if (locationPath) {
      setLocation(locationPath)
    }
  }, [])
}
