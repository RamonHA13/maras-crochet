import { Link } from 'wouter'

import LogoImg from './LogoImg'
import Routes from '../utils/routes'

import productLogo from './../../assets/productos-logo.svg'
import sellsLogo from './../../assets/ventas-logo.svg'
import employeesLogo from './../../assets/empleados-logo.svg'
import reportsLogo from './../../assets/reportes-logo.svg'
import homeLogo from './../../assets/home-logo.svg'
import categoryLogo from './../../assets/categorias-logo.svg'

import SignOutButton from './SignOutButton'

interface Props {
  location: string
  userEmail: string
}

export default function SideBar({ location, userEmail }: Props) {
  const modulesDict = {
    products: 'Productos',
    sells: 'Ventas',
    employees: 'Empleados',
    reports: 'Reportes',
    home: 'Home',
    categories: 'Categorias'
  }

  const moduleLogoDict = {
    products: productLogo,
    sells: sellsLogo,
    employees: employeesLogo,
    reports: reportsLogo,
    home: homeLogo,
    categories: categoryLogo
  }

  const noShow = [
    'login',
    'productsdetails',
    'productsedit',
    'productscreate',
    'employeesedit',
    'employeescreate',
    'employeesdetails',
    'categoriesedit',
    'categoriescreate',
    'categoriesdetails'
  ]

  return (
    <aside className="flex flex-col items-center justify-between h-screen left-0 top-0 bottom-0 px-5">
      <div className="flex flex-col items-center justify-center my-3">
        <LogoImg className="w-32" />
        <h2 className="text-3xl text-center font-bold">Mara's Crochet</h2>
      </div>
      <div>
        <nav>
          <ul>
            {Object.entries(Routes).map(([name, route]) => {
              const nameLower = name.toLocaleLowerCase()
              if (noShow.includes(nameLower)) return

              return (
                <li key={name}>
                  <Link
                    className="flex items-center gap-2 justify-start m-2"
                    style={{
                      textDecoration: location === route ? 'underline' : 'none'
                    }}
                    href={route}
                  >
                    <img src={moduleLogoDict[nameLower] || nameLower} alt={`${nameLower} logo`} />
                    {modulesDict[nameLower] || 'Error!!'}
                  </Link>
                </li>
              )
            })}
            <li>
              <SignOutButton />
            </li>
          </ul>
        </nav>
      </div>
      <footer className="text-center pb-5">
        Administrador <br />
        {userEmail}
      </footer>
    </aside>
  )
}
