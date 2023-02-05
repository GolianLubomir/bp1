import { createApp } from 'vue'
import './style.css'
import store from './store'
import router from './router'
//import MathJax from 'mathjax';
import './index.css'
import App from './App.vue'

createApp(App).use(store).use(router).mount('#app')

/*MathJax.startup.promise.then(() => {
    console.log('MathJax loaded!');
  });*/
  