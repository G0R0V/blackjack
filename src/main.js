import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Create the app
var app = createApp(App)

// Global const configuration
app.config.globalProperties.$cardColors = ['COEUR', 'PIQUE', 'TREFLE', 'CARREAU']

// User router
app.use(router).mount('#app')
