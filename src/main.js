/*页面入口js文件-->类似于java的main方法*/
import Vue from 'vue';
import App from './App.vue';
import router from './router';
//import './plugins/element.js';//按需导入
import './assets/css/global.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,//把router路由添加挂载到容器里,this.$router.params.xxx 获值取值,同理,store 也是可以this.store.state.xxx获值取值
  render: h => h(App)
}).$mount('#app');
