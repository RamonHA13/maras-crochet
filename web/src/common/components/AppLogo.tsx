import { Link } from 'wouter'
import Routes from '../routes'

export default function AppLogo() {
  return (
    <div className='flex items-center'>
      <Link
        href={Routes.home.route}
        className='w-[100px] h-[60px] overflow-hidden'
      >
        <img
          src='/logo.png'
          className='object-cover w-full h-full'
          alt='Logo'
        />
      </Link>
      <h1 className='text-xl font-bold'>Mara's Crochet</h1>
    </div>
  )
}
