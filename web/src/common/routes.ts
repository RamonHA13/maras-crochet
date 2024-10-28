const Routes: Record<
  string,
  {
    name: string
    route: string
  }
> = {
  home: {
    name: 'home',
    route: '/'
  },
  login: {
    name: 'login',
    route: '/auth/login'
  },
  products: {
    name: 'products',
    route: '/products/'
  },
  productByCategory: {
    name: 'product by category',
    route: '/products/category/'
  },
  cart: {
    name: 'cart',
    route: '/cart'
  },
  register: {
    name: 'register',
    route: '/auth/register'
  },
  profile: {
    name: 'profile',
    route: '/profile'
  }
}

export default Routes
