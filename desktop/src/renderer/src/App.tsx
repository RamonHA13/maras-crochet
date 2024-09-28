import { Route, Switch } from 'wouter'
import HomeView from './views/home/view'
import LoginView from './views/login/view'
import useAuth from './common/hooks/useAuth'
import Routes from './common/utils/routes'
import ProductsView from './views/products/view'
import SellsView from './views/sells/view'
import EmployeesView from './views/employees/views'
import ReportsView from './views/reports/view'
import DetailsProductView from './views/products/details-id/view'
import EditProductView from './views/products/edit-id/view'
import CreateProductView from './views/products/create/view'
import CreateEmployeeView from './views/employees/create/view'
import EditEmployeeView from './views/employees/edit-id/view'
import DetailsEmployeeView from './views/employees/details-id/view'

function App(): JSX.Element {
  useAuth('/home')
  return (
    <Switch>
      <Route path={Routes.Home} component={HomeView} />
      <Route path={Routes.Login} component={LoginView} />

      <Route path={Routes.Products} component={ProductsView} />
      <Route path={Routes.ProductsCreate} component={CreateProductView} />
      <Route path={Routes.ProductsDetails} component={DetailsProductView} />
      <Route path={Routes.ProductsEdit} component={EditProductView} />

      <Route path={Routes.Employees} component={EmployeesView} />
      <Route path={Routes.EmployeesCreate} component={CreateEmployeeView} />
      <Route path={Routes.EmployeesDetails} component={DetailsEmployeeView} />
      <Route path={Routes.EmployeesEdit} component={EditEmployeeView} />

      <Route path={Routes.Sells} component={SellsView} />
      <Route path={Routes.Reports} component={ReportsView} />
    </Switch>
  )
}

export default App
