/*页面入口js文件-->类似于java的main方法*/
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import './assets/css/global.css';

Vue.config.productionTip = false;

new Vue({
  router,//把router路由添加挂载到容器里,this.$router.params.xxx 获值取值,同理,store 也是可以this.store.state.xxx获值取值
  render: h => h(App)
}).$mount('#app');
