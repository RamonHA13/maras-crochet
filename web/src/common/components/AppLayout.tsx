import useUserStore from '../stores/useUserStore'
import Footer from './Footer'
import Header from './Header'
import SocialBanner from './SocialBanner'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const user = useUserStore(state => state.user)
  const isLogged = Boolean(user.auth?.token)
  return (
    <main className='flex flex-col h-full'>
      <SocialBanner />
      <Header isLogged={isLogged} />
      {children}
      <Footer />
    </main>
  )
}
