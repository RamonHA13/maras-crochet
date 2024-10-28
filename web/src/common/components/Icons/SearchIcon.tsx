interface Props {
  width?: number
  height?: number
}

export default function SearchIcon({ width = 25, height = 25 }: Props) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      height={height}
      width={width}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <path
          d='M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z'
          stroke='#000000'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>{' '}
      </g>
    </svg>
  )
}

//para definir los parametros de un objeto con una interfaz
//una interfaz es un contrato para un objeto
