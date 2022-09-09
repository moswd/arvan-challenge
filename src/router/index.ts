import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authGaurd } from '@/router/gaurds'
import { useUserStore } from '@store/user'
import Signin from '@/views/SigninView.vue'
import Signup from '@/views/SignupView.vue'
import Dashboard from '@/views/DashboardView.vue'
import Articles from '@/views/ArticlesView.vue'
import ArticleBuilder from '@/views/ArticleBuilderView.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'Dashboard',
    path: '/',
    redirect: { name: 'Articles' },
    component: Dashboard,
    children: [
      { name: 'Articles', path: 'articles', component: Articles },
      {
        name: 'CreateArticle',
        path: 'articles/create',
        component: ArticleBuilder
      },
      {
        name: 'UpdateArticle',
        path: 'articles/:slug/update',
        component: ArticleBuilder
      } // TODO: what case should namings have?
    ]
  },
  { name: 'Signin', path: '/signin', component: Signin },
  { name: 'Signup', path: '/signup', component: Signup },
  {
    // TODO: logout needs refactor
    name: 'Logout',
    path: '/logout',
    beforeEnter() {
      const { removeCreds } = useUserStore()
      removeCreds()
      return { name: 'Signin' }
    }
  } as unknown as RouteRecordRaw // TODO: fix this
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(authGaurd)

export { router }
