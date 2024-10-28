export default function Star({
  text,
  className,
  color = '#FF7733'
}: {
  color?: string
  text: string
  className?: string
}) {
  return (
    <div className={className}>
      <svg
        width='83'
        height='83'
        viewBox='0 0 83 83'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M41.5 0L48.8341 6.99585L58.3796 3.58786L62.2341 12.9619L72.3405 13.7311L72.049 23.8625L80.9688 28.6758L76.5818 37.8128L82.7727 45.8379L75.0485 52.4006L77.4401 62.25L67.7144 65.1036L65.8931 75.0742L55.8476 73.7253L50.1283 82.0931L41.5 76.775L32.8717 82.0931L27.1524 73.7253L17.1069 75.0742L15.2856 65.1036L5.55994 62.25L7.95148 52.4006L0.227341 45.8379L6.41824 37.8128L2.03115 28.6758L10.951 23.8625L10.6595 13.7311L20.7659 12.9619L24.6204 3.58786L34.1659 6.99585L41.5 0Z'
          fill={color}
        />
        <text
          x='50%' // Centra horizontalmente
          y='50%' // Centra verticalmente
          textAnchor='middle' // Alinea el texto al centro
          dominantBaseline='middle' // Alinea verticalmente al medio
          fill='white' // Color del texto
          fontSize='12' // Tamaño del texto
        >
          {text}
        </text>
      </svg>
    </div>
  )
}
