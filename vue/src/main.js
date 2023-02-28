import { createApp } from 'vue'
import VueKonva  from 'vue-konva'
import './style.css'
import store from './store'
import router from './router'
//import MathJax from 'mathjax';
import './index.css'
import App from './App.vue'
import { mapActions } from 'vuex';
import ApexCharts from 'apexcharts'
import VueApexCharts from 'vue-apexcharts'
import "./apexCharts"

createApp(App).use(store).use(router).use(VueKonva).mount('#app')

/*MathJax.startup.promise.then(() => {
    console.log('MathJax loaded!');
  });*/


  