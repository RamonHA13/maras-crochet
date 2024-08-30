import CartIcon from './Icons/CartIcon'
import FavoriteIcon from './Icons/FavoriteIcon'
import PorfileIcon from './Icons/PorfileIcon'
import SearchIcon from './Icons/SearchIcon'

export default function Header() {
  return (
    <>
      <header className='flex justify-between items-center p-4'>
        <div className='flex justify-between items-center'>
          <a href='/'>
            <img src='./../logo.png' className='w-[100px] h-[100px]'></img>
          </a>
          <h1>Mara's Crochet</h1>
        </div>

        <nav>
          <ul className='flex justify-between space-x-3'>
            <li>
              <a href='#'>Inicio</a>
            </li>
            <li>
              <a href='#'>Nosotros</a>
            </li>
            <li>
              <a href='#'>Categorias</a>
            </li>
          </ul>
        </nav>

        <nav className='flex justify-between items-center space-x-3'>
          <SearchIcon height={40} width={40} />
          <a href='#'>
            <CartIcon height={40} width={40} />{' '}
          </a>
          <a href='#'>
            <FavoriteIcon height={40} width={40} />
          </a>
          <a href='#'>Iniciar sesion </a>
          <a href='#'>Registrarte</a>
          <a href='#'>
            <PorfileIcon height={40} width={40} />
          </a>
        </nav>
      </header>
    </>
  )
}
