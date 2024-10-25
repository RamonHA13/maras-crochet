import FacebookIcon from './Icons/FacebookIcon'
import InstagramIcon from './Icons/InstagramIcon'
import XIcon from './Icons/XIcon'

export default function Footer() {
  return (
    <footer className='flex justify-between items-center p-4 my-10'>
      <div className='flex-1 space-x-4'>
        <p className='text-justify'>
          <b>Mara's Crochet</b> es una tienda dedicada al tejido a mano que te
          lleva a una experiencia creativa llena de colores.
          <br />
          En nuestra tienda encontraras gran variedad de accesorios.
        </p>
        <div className='flex'>
          <a href='#'>
            <FacebookIcon height={30} width={30} />
          </a>
          <a href='#'>
            <InstagramIcon height={30} width={30} />
          </a>
          <a href='#'>
            <XIcon height={30} width={30} />
          </a>
        </div>
      </div>

      <div className='flex-1 space-x-4'>
        <b>
          <h1 className='text-center'>Contacto</h1>
        </b>
        <h3 className='text-justify'>
          Petatlan, Col Burocratas, 43737, Guerrero, Mexico
        </h3>
        <br />
        <h3>Horario de Atencion: </h3>
        <h3> Lunes-Viernes </h3>
        <h3> 9:00-13:00 hrs</h3>
        <br />
        <h3>Correo: </h3>
        <h3>marascrochet@gmail.com</h3>
      </div>

      <div className='flex-1 space-x-4'>
        <b>
          <h1 className='text-center'>Nosotros</h1>
        </b>
        <a href='#'>
          <img src='./../logo.png' className='w-[200px] h-[200px] ' />
        </a>
      </div>
    </footer>
  )
}
