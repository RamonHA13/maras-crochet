export default function Footer() {
  return (
    <>
      <hr className='w-1/2 m-auto border-black' />
      <footer className='grid grid-cols-3 justify-items-center p-2 mt-4 gap-2'>
        <section>
          <h3 className='text-center text-2xl font-bold'>Nosotros</h3>
          <div className='px-10'>
            <strong>Mara's Crochet</strong> es una tienda dedicada al tejido a
            mano que te lleva a una experiencia creativa llena de colores.
            <br />
            En nuestra tienda encontraras gran variedad de accesorios
          </div>
        </section>
        <section>
          <h3 className='text-center text-2xl font-bold'>Contacto</h3>
          <div className='px-10 flex flex-col gap-2'>
            <div>
              <strong> Horario de atencion:</strong> <br />
              Lunes - Viernes <br />
              9:00 - 13:00 hrs <br />
              Correo: marascrochet@gmail.com
            </div>
            <address className='text-center my-2'>
              Petatlan Gro, Col Burocratas <br /> 43737, Guerrero, México.
            </address>
          </div>
        </section>
        <section className='flex items-center justify-center'>
          <img src='/logo.png' className='w-3/4' alt="mara's crochet logo" />
        </section>
      </footer>
      <div className='text-center text-gray-400 pb-2'>
        Web app made with love by{' '}
        <strong>
          <u>
            <a href='https://github.com/monkig' target='_blank'>
              Monki 🥰
            </a>
          </u>
        </strong>
      </div>
    </>
  )
}
