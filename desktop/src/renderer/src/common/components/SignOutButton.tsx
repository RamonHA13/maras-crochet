import { useLocation } from 'wouter'
import useAuthStore from '../stores/authStore'

export default function SignOutButton() {
  const [, redirect] = useLocation()
  const signOut = useAuthStore((state) => state.signOut)
  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
    signOut()
    redirect('/login')
  }

  return (
    <button onClick={handleClick} className="flex w-full justify-start items-center gap-2 px-2">
      <svg
        width={40}
        height={40}
        fill="#000000"
        viewBox="0 0 24 24"
        id="sign-out-left-3"
        data-name="Flat Line"
        xmlns="http://www.w3.org/2000/svg"
        className="icon flat-line"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <polyline
            id="primary"
            points="6 15 3 12 6 9"
            style={{
              fill: 'none',
              stroke: '#000000',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: 2
            }}
          ></polyline>
          <line
            id="primary-2"
            data-name="primary"
            x1="3"
            y1="12"
            x2="17"
            y2="12"
            style={{
              fill: 'none',
              stroke: '#000000',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: 2
            }}
          ></line>
          <path
            id="primary-3"
            data-name="primary"
            d="M17,20h3a1,1,0,0,0,1-1V5a1,1,0,0,0-1-1H17"
            style={{
              fill: 'none',
              stroke: '#000000',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: 2
            }}
          ></path>
        </g>
      </svg>
      Exit
    </button>
  )
}
