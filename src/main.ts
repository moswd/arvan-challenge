import { createApp } from 'vue'
import { router } from '@/router'
import { piniaInstance } from '@/store'
import VueUniversalModal from 'vue-universal-modal'
import Toast, { POSITION } from 'vue-toastification'

import App from '@/App.vue'

import 'vue-universal-modal/dist/index.css'
import 'vue-toastification/dist/index.css'
import '@/main.css'

const app = createApp(App)

app.use(piniaInstance)
app.use(router)
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  hideProgressBar: true,
  closeButton: false,
  icon: false
})
app.use(VueUniversalModal, {
  teleportTarget: '#modals'
})

app.mount('#app')
