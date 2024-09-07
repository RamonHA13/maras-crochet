import Header from './components/Header'
import Footer from './components/Footer'
import SocialBanner from './components/SocialBanner'
import Cart from './components/Cart'

export default function App() {
  return (
    <>
      <SocialBanner />
      <Header />
      <img src='./../banner.jpg ' className='w-full' />
      <Cart />
      <Footer />
    </>
  )
}
