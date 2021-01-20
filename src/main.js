/*页面入口js文件-->类似于java的main方法*/
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//import './plugins/element.js';//按需导入
import './assets/css/global.css';
//[全局]引入阿里的iconfont,当然也可以在App.vue里的<script>import './assets/iconfont/iconfont.css';</script>节点引入,也可以单独的Xxx.vue文件里节点 <script>import './assets/iconfont/iconfont.css';</script>
import './assets/iconfont/iconfont.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import httpReq from './config/httpReq.js';
import apis from './config/apis.js';

Vue.config.productionTip = false;

Vue.prototype.apis = apis;
Vue.prototype.httpReq = httpReq;

//验证是否已输入参数: if(this.checkParam(_username,'请输入登录账号!'))return;
Vue.prototype.checkParam = function(value,msg){
    if(value == null || value.length === 0 || (typeof(value) == 'string' && value.replace(/^\s+|\s+$/gm,'').length <= 0)){
        this.$message.error(msg);//layerFn.alert(msg);也是ok的
        return true;
    }
    return false;
};

//默认每页大小
Vue.prototype.pageLimit = 18;

Vue.use(ElementUI);

new Vue({
  router,//把router路由添加挂载到容器里,this.$router.params.xxx 获值取值,同理,store 也是可以this.store.state.xxx获值取值
  store,
  render: h => h(App)
}).$mount('#app');
