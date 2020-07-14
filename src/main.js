/*页面入口js文件-->类似于java的main方法*/
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import './assets/css/global.css';

Vue.config.productionTip = false;

new Vue({
  router,//把router路由添加挂载到容器里
  render: h => h(App)
}).$mount('#app');
