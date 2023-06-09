import { createApp } from 'vue'
import './style.css'
import store from './store'
import router from './router'
import './index.css'
import App from './App.vue'
import "./apexCharts"



createApp(App).use(store).use(router).mount('#app')
  