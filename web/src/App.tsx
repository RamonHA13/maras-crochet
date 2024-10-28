import { Route, Switch } from 'wouter'
import { useEffect } from 'react'

import Routes from './common/routes'
import HomePage from './modules/home/page'
import useCategoryStore from './common/stores/useCategoryStore'
import { getCategories } from './services/category'
import useProductStore from './common/stores/useProductStore'
import { getProducts } from './services/product'
import AuthLoginPage from './modules/auth/login/page'
import AuthRegisterPage from './modules/auth/register/page'
import NotFoundPage from './modules/404/page'
import ProductCategoryPage from './modules/product/category/[id]'
import ProductDetailsPage from './modules/product/[id]'
import ProductsPage from './modules/product/page'
import CartPage from './modules/cart/page'

export default function App() {
  const setCategories = useCategoryStore(state => state.setCategories)
  const setProducts = useProductStore(state => state.setProducts)

  useEffect(() => {
    ;(async () => {
      const [err, data] = await getCategories()
      if (err) {
        console.error(err)
        return
      }
      setCategories(
        data.map(x => ({
          ...x,
          name: x.name.slice(0, 1).toLocaleUpperCase() + x.name.slice(1)
        }))
      )
    })()
  }, [setCategories])

  useEffect(() => {
    ;(async () => {
      const [err, data] = await getProducts()
      if (err) {
        console.error(err)
        return
      }
      setProducts(
        data.map(x => ({
          ...x,
          name: x.name.slice(0, 1).toLocaleUpperCase() + x.name.slice(1)
        }))
      )
    })()
  }, [setProducts])

  return (
    <Switch>
      <Route path={Routes.home.route} component={HomePage} />

      <Route path={Routes.login.route} component={AuthLoginPage} />
      <Route path={Routes.register.route} component={AuthRegisterPage} />

      <Route path={Routes.products.route} component={ProductsPage} />
      <Route
        path={`${Routes.productByCategory.route}:id`}
        component={ProductCategoryPage}
      />
      <Route
        path={`${Routes.products.route}:id`}
        component={ProductDetailsPage}
      />

      <Route path={Routes.cart.route} component={CartPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}
