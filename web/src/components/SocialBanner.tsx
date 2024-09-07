import FacebookIcon from './Icons/FacebookIcon'
import InstagramIcon from './Icons/InstagramIcon'
import XIcon from './Icons/XIcon'

export default function SocialBanner() {
  return (
    <nav className=' flex justify-center gap-2 bg-[#252B42]'>
      <h3 className='text-white'>Siguenos:</h3>
      <a>
        <FacebookIcon height={30} width={30} />
      </a>
      <a>
        <InstagramIcon height={30} width={30} />
      </a>
      <a>
        <XIcon height={30} width={30} />
      </a>
    </nav>
  )
}
