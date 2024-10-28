import FacebookIcon from './Icons/FacebookIcon'
import InstagramIcon from './Icons/InstagramIcon'
import XIcon from './Icons/XIcon'

export default function SocialBanner() {
  return (
    <nav className=' flex justify-center gap-2 bg-[#252B42] p-2'>
      <h3 className='text-white font-bold'>Siguenos:</h3>
      <ul className='flex gap-2'>
        <li>
          <a href='#'>
            <FacebookIcon />
          </a>
        </li>
        <li>
          <a href='#'>
            <InstagramIcon />
          </a>
        </li>
        <li>
          <a href='#'>
            <XIcon />
          </a>
        </li>
      </ul>
    </nav>
  )
}
