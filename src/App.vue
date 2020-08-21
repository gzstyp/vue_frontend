<template>
  <div id="app">
   <!-- 路由占位符,登录页,即显示路由导航的位置,这个是默认显示的东东(启动页默认显示的页面)[有两个路由占位符地方,一个是本文件,另一个是在文件src\components\Home.vue] -->
   <router-view/>
  </div>
</template>

<script>
    //[全局]引入阿里的iconfont
    import './assets/iconfont/iconfont.css';
export default {
  name: 'app'
}
</script>

<style>
    div.el-submenu__title{
        border-bottom: 1px solid #e0e0e0 !important;
    }
</style>
