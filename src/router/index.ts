import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authGaurd } from '@/router/gaurds'
import Signin from '@/views/SigninView.vue'
import Signup from '@/views/SignupView.vue'
import Dashboard from '@/views/DashboardView.vue'

const routes: RouteRecordRaw[] = [
  { name: 'Dashboard', path: '/', component: Dashboard },
  { name: 'Signin', path: '/signin', component: Signin },
  { name: 'Signup', path: '/signup', component: Signup }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(authGaurd)

export { router }
