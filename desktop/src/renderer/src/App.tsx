import { Route, Switch } from 'wouter'
import HomeView from './views/home/view'
import LoginView from './views/login/view'
import useAuth from './common/hooks/useAuth'
import Routes from './common/utils/routes'
import ProductsView from './views/products/view'
import SellsView from './views/sells/view'
import EmployeesView from './views/employees/views'
import ReportsView from './views/reports/view'

function App(): JSX.Element {
  useAuth('/home')
  return (
    <Switch>
      <Route path={Routes.Home} component={HomeView} />
      <Route path={Routes.Login} component={LoginView} />
      <Route path={Routes.Products} component={ProductsView} />
      <Route path={Routes.Sells} component={SellsView} />
      <Route path={Routes.Employees} component={EmployeesView} />
      <Route path={Routes.Reports} component={ReportsView} />
    </Switch>
  )
}

export default App
