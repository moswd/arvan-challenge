import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authGaurd } from '@/router/gaurds'
import { useUserStore } from '@store/user'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Articles from '@/views/ArticlesView.vue'
import ArticleBuilder from '@/views/ArticleBuilderView.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'Dashboard',
    path: '/',
    redirect: { name: 'Articles' },
    component: DashboardLayout,
    children: [
      {
        name: 'Articles',
        path: 'articles',
        component: Articles
      },

      {
        name: 'CreateArticle',
        path: 'articles/create',
        component: ArticleBuilder
      },

      {
        name: 'UpdateArticle',
        path: 'articles/:slug/update',
        component: ArticleBuilder
      }
    ]
  },

  {
    name: 'Login',
    path: '/login',
    component: Login
  },

  {
    name: 'Register',
    path: '/register',
    component: Register
  },

  {
    name: 'Logout',
    path: '/logout',
    beforeEnter() {
      const { removeCreds } = useUserStore()
      removeCreds()
      return { name: 'Login' }
    }
  } as unknown as RouteRecordRaw,

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(authGaurd)

export { router }
