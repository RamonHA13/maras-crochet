import { Link } from 'wouter'
import Routes from '../routes'
import CartIcon from './Icons/CartIcon'
import FavoriteIcon from './Icons/FavoriteIcon'
import AppLogo from './AppLogo'
import HeaderLayout from './HeaderLayout'
import PorfileIcon from './Icons/PorfileIcon'
import useCartStore from '../stores/useCartStore'
import { useState } from 'react'
import QuestionMark from './Icons/QuestionMark'

export default function Header({ isLogged }: { isLogged: boolean }) {
  const headerRouters: Record<string, string> = {
    home: 'Inicio',
    'about-us': 'Nosotros',
    // categories: 'Categorias',
    products: 'Productos'
  }

  return (
    <HeaderLayout>
      <AppLogo />
      <nav>
        <ul className='flex justify-evenly'>
          {Object.entries(headerRouters).map(([key, value]) => (
            <li key={`${key}-${value}`}>
              <Link
                href={Routes[key]?.route || '#'}
                className='font-bold border-r-2 border-l-2 border-solid border-black px-2'
              >
                {value}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav>
        <ul className='flex justify-end items-center gap-5'>
          <CartButton />
          <Link href='#'>
            <FavoriteIcon />
          </Link>
          {isLogged ? (
            <Link href='#'>
              <PorfileIcon />
            </Link>
          ) : (
            <Link href={Routes.login.route} className='font-semibold'>
              Inicia sesión
            </Link>
          )}
        </ul>
      </nav>
    </HeaderLayout>
  )
}

const CartButton = () => {
  const products = useCartStore(state => state.products)
  const deleteFromCart = useCartStore(state => state.deleteFromCart)

  const [showDetails, setShowDetails] = useState(false)

  const handleClick = () => {
    setShowDetails(!showDetails)
  }

  const handleDeleteFromCart = (id: string) => () => {
    deleteFromCart(id)
  }
  return (
    <li className='relative'>
      <button className='relative' onClick={handleClick}>
        {products.length > 0 && (
          <span className='w-3 h-3 absolute left-0 bottom-0 bg-pink-400 rounded-full animate-pulse'></span>
        )}
        <CartIcon />
      </button>

      {showDetails && (
        <section className='absolute -left-56  bg-white border border-pink-400 w-60 py-2'>
          <h3 className='text-center border-b-2'>Carrito</h3>
          <div>
            {products.length > 0 ? (
              products.map(x => (
                <article
                  key={`cart-preview-${x.id}`}
                  className='flex items-center text-xs justify-between px-2 py-2'
                >
                  <img
                    src={x.imgUrl}
                    alt={`cart preview img ${x.name}`}
                    className='w-10 h-10 rounded-lg'
                  />
                  <div className='flex w-full mx-2 justify-between'>
                    <div>
                      <h4>{x.name}</h4>
                      <span>${x.price} MXN</span>
                    </div>
                    <button
                      className='z-50'
                      onClick={handleDeleteFromCart(x.id)}
                    >
                      X
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className='flex flex-col items-center p-5'>
                <QuestionMark />
                <span className='font-semibold text-xs text-center'>
                  No products in the cart
                </span>
              </div>
            )}
          </div>
          {products.length > 0 && (
            <Link
              href={Routes.cart.route}
              className='text-center block   bg-blue-500 text-white mx-16 mt-2 py-1 rounded hover:bg-blue-600'
            >
              Ir a pagar
            </Link>
          )}
        </section>
      )}
    </li>
  )
}
