import { useUserStore } from '@store/user'
import { RouteLocationNormalized } from 'vue-router'

export function authGaurd(to: RouteLocationNormalized) {
  const routeName = to.name
  const { token } = useUserStore()

  if (token) {
    if (routeName === 'Login' || routeName === 'Register') {
      return { name: 'Dashboard' }
    }
  } else {
    if (routeName !== 'Login' && routeName !== 'Register') {
      return { name: 'Login' }
    }
  }
}
