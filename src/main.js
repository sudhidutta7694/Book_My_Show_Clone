// import './assets/main.css'
// import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import api from './services/api'
// import {pinia} from './store';


// const app = createApp(App)



// // Set $http property on app.config.globalProperties
// app.config.globalProperties.$http = api;
// app.config.productionTip = false;

// import App from './App.vue'
// import router from './router'

// app.use(createPinia())
// app.use(router)
// app.use(pinia)
// app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(router).use(pinia)

app.mount('#app')

