import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Signin from '@/views/SigninView.vue'
import Signup from '@/views/SignupView.vue'
import Dashboard from '@/views/DashboardView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Dashboard },
  { path: '/signin', component: Signin },
  { path: '/signup', component: Signup }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { router }
