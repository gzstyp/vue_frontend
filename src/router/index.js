import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './../views/Login';
import Home from './../views/Home';
import NotFound from './../views/NotFound';

Vue.use(VueRouter);

/*所有的路由都静态添加进去,然后动态显示所拥有的菜单,默认是跳转到home,但是使用了redirect所以最终跳转到了welcome,而跳转welcome就直接访问Welcome页面组件*/
const routes = [
    {path:'/',redirect:'login'},
    {path:'/login',component:Login},
    {path:'/home',component:Home,redirect:'/welcome',children:[
        {path:'/welcome',component:() => import('../views/Welcome')},
        {path:'/role',component:() => import('../views/Role')},
        {path:'/user',component:() => import('../views/User')},
        {path:'/menu',component:() => import('../views/Menu')},
        {path:'/persion',component:() => import('../views/Persion')}
    ]},
    {path:'*',component: NotFound}
]

const router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition){
        // return 期望滚动到哪个的位置
        return { x:0,y:0} //让页面滚动到顶部
    },
    mode : 'history'/*注释掉这个在nginx下访问正常*/
});

//通过导航守卫控制权限
router.beforeEach((to,from,next)=>{
    // to 是将要访问的路径,
    // from 是从哪一个url跳转过来的网址
    // next 是一个函数，表示放行,next()表示放行,next('/login') 表示强制跳转到参数内的url
    if (to.path == '/login')return next();
    var token = window.sessionStorage.getItem('accessToken');
    if (!token)return next('/login');
    next();
});

export default router;

/*
路由的基本步骤：
  1.引入相关的库文件
  2.添加路由链接
  <router-link to="" >,其中router-link会转换为a元素，to转换为 href
  3.添加路由占位符 <router-view />
  4.创建路由组件供路由切换
  const Login = {
     template:'<h2>Login组件</h2>'
  };
  5.创建路由实例对象
  const router = new VueRouter({
     router:[
        {path:'/login',component:Login}
     ]
  });
  6.把路由挂载到Vue的跟实例中

  路由组件的传递参数:
  1).基本的路由参数
  2).props的值为布尔类型
  3).props的值为对象类型
  4).props的值为函数类型
*/
