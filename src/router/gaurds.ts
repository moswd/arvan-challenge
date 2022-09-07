import { useUserStore } from '@store/user'
import { RouteLocationNormalized } from 'vue-router'

export function authGaurd(to: RouteLocationNormalized) {
  const routeName = to.name
  const { token } = useUserStore()

  if (token) {
    if (routeName === 'Signin' || routeName === 'Signup') {
      return { name: 'Dashboard' }
    }
  } else {
    if (routeName !== 'Signin' && routeName !== 'Signup') {
      return { name: 'Signin' }
    }
  }
}
