import { Route, Switch } from 'wouter'
import HomePage from './views/home/Page'
import LoginPage from './views/login/Page'
import useAuth from './common/hooks/useAuth'

function App(): JSX.Element {
  useAuth('/')
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  )
}

export default App
