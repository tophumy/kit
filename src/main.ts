import { createApp } from 'vue'
import './style.css'      // Import file CSS của Tailwind
import App from './App.vue'
import router from './router' // Import router chúng ta vừa tạo

const app = createApp(App)

app.use(router) // Báo cho Vue biết sử dụng router

app.mount('#app')