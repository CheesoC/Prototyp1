import './assets/main.css'
import 'primeicons/primeicons.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './router'
import naive from 'naive-ui'
import { createApp } from 'vue'
import App from './App.vue'

// Toast configuration options
const toastOptions = {
  position: 'top-center',
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
  transition: 'Vue-Toastification__bounce',
  maxToasts: 1,
  toastClassName: 'custom-toast-class',
  bodyClassName: ['custom-body-class'],
  // Custom styles
  containerClassName: 'my-toast-container',
}

const app = createApp(App)

app.use(router)
app.use(Toast, toastOptions)
app.use(naive)

app.mount('#app')
