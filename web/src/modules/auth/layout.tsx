import Footer from '../../common/components/Footer'
import AuthHeader from './AuthHeader'
import AppToast from '../../common/components/AppToast'

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppToast />

      <div className='flex flex-col h-full'>
        <AuthHeader />
        <section className='flex-grow'>{children}</section>
        <Footer />
      </div>
    </>
  )
}
