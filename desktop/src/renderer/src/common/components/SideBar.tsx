import { Link } from 'wouter'

import LogoImg from './LogoImg'
import routes from './../utils/routes'

import './side-bar.css'
import productLogo from './../../assets/productos-logo.svg'
import sellsLogo from './../../assets/ventas-logo.svg'
import employeesLogo from './../../assets/empleados-logo.svg'
import reportsLogo from './../../assets/reportes-logo.svg'
import homeLogo from './../../assets/home-logo.svg'

interface Props {
  location: string
}

export default function SideBar({ location }: Props) {
  const modulesDict = {
    products: 'Productos',
    sells: 'Ventas',
    employees: 'Empleados',
    reports: 'Reportes',
    '/': 'Home'
  }

  const moduleLogoDict = {
    products: productLogo,
    sells: sellsLogo,
    employees: employeesLogo,
    reports: reportsLogo,
    '/': homeLogo
  }

  return (
    <aside id="side__bar">
      <div className="side__bar__logo">
        <LogoImg />
        <h2>Mara's Crochet</h2>
      </div>
      <div className="side__bar__nav">
        <nav>
          <ul>
            {Object.entries(routes).map(([name, route]) => (
              <li>
                <Link
                  style={{ textDecoration: location === name ? 'underline' : 'none' }}
                  href={route}
                >
                  <img src={moduleLogoDict[name] || name} alt={`${name} logo`} />
                  {modulesDict[name] || 'Error!!'}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <footer className="side__bar__footer">
        Administrador <br />
        some@email.com
      </footer>
    </aside>
  )
}
