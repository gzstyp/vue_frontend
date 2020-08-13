<template>
    <el-container class="home-container">
        <el-header>
            <div class="top-left">
                <img src="../assets/logo.jpg" alt="logo">
                <label>管理系统服务平台</label>
                <!--<el-button class="toggle-button" @click="showHide()">{{aside ? '隐藏' : '显示'}}</el-button>-->
                <i @click="showHide()" style="font-size: 24px;cursor: pointer;" title="隐藏|显示导航" :class="aside ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
            </div>
            <div class="top-right">
                <el-button @click="logout()">退出</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '45px': '220px'" v-if="aside">
                <el-menu
                  unique-opened
                  router
                  :collapse="isCollapse"
                  :collapse-transition="false"
                  :default-active="activeUrl"
                  background-color="#f3f3f3"
                  text-color="#000"
                  active-text-color="#409eff">
                    <template v-for="item in listMenu">

                        <template v-if="item.children">
                            <el-submenu :index="''+item.id">
                                <template slot="title">
                                    <i :class="item.icon"></i>
                                    <span>{{item.name}}</span>
                                </template>
                                <template v-for="subItem in item.children">

                                    <template v-if="subItem.children">

                                        <el-submenu :index="''+subItem.id">

                                            <template slot="title">
                                                <i :class="subItem.icon"></i>
                                                <span>{{subItem.name}}</span>
                                            </template>
                                            <template v-for="subIt in subItem.children">

                                                <el-menu-item :index="'/'+subIt.url" @click="saveNavStatus('/'+subIt.url,subIt.name)">
                                                    <template slot="title">
                                                        <span>{{subIt.name}}</span>
                                                    </template>
                                                </el-menu-item>

                                            </template>

                                        </el-submenu>

                                    </template>
                                    <template v-if="!subItem.children">

                                        <el-menu-item :index="'/'+subItem.url" @click="saveNavStatus('/'+subItem.url,subItem.name)">
                                            <template slot="title">
                                                <span>{{subItem.name}}</span>
                                            </template>
                                        </el-menu-item>

                                    </template>

                                </template>
                            </el-submenu>
                        </template>

                        <template v-if="!item.children">
                            <el-menu-item :index="'/'+item.url" @click="saveNavStatus('/'+item.url,item.name)">
                                <template slot="title">
                                    <span>{{item.name}}</span>
                                </template>
                            </el-menu-item>
                        </template>

                    </template>
                </el-menu>
			</el-aside>
            <el-container>
                <el-main>
                    <!--标题-->
                    <div class="main-title"><label>{{title}}</label></div>
                    <div style="padding: 4px;">
                        <!--路由占位符,即显示路由导航的位置[有两个路由占位符地方,一个是本文件,另一个是在文件src\App.vue] -->
                        <router-view></router-view>
                    </div>
                </el-main>
                <el-footer>
					<div>贵州驼峰科技有限公司</div>
				</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return {
            aside : true,
            isCollapse : false,
            title : '欢迎你',
            activeUrl : '',
            listMenu : [
                {
                    id : '0000000000640033000000000ea4c107',
                    name : '系统管理',
                    icon : 'el-icon-setting',
                    url : null,
                    children : [
                        {
                            id : '0000000004dfa8b9000000002f4e715c',
                            name : '角色管理',
                            url : 'role'
                        },
                        {
                            id : '0000000007c4dd77ffffffffe68454c6',
                            name : '用户管理',
                            url : 'user'
                        },
                        {
                            id : '00000000456de029ffffffffc68a479c',
                            name : '系统菜单',
                            url : 'menu'
                        }
                    ]
                },
                {
                    id : '00000000454d3232ffffffffd0b0c4dd',
                    name : '水西天香',
                    url : null,
                    icon : 'el-icon-help',
                    children : [
                        {
                            id : '0000000043a8763d000000001f8b393f',
                            name : '文章分类',
                            url : 'role1'
                        },
                        {
                            id : '000000003bb712cd00000000022090e8',
                            name : '文章管理',
                            url : 'user1'
                        },
                        {
                            id : '00000000338a27a7ffffffff905a8f9e',
                            name : '轮播图管理',
                            url : null,
                            icon : 'el-icon-set-up',
                            children : [
                                {
                                    id : 'ffffffff95beb47dffffffffad7e6abe',
                                    name : '首页轮播图首页轮播图首页',
                                    url : 'role2'
                                },
                                {
                                    id : 'ffffffffbd471a55ffffffff976c6d1b',
                                    name : '水西天香',
                                    url : 'shuixi01'
                                }
                            ]
                        }
                    ]
                },
                {
                    id : '11ffffffbd471a55ffffffff976c6d11',
                    name : '账号管理',
                    url : 'menu2'
                }
            ]
        }
    },
    methods : {
        logout : function () {
            window.sessionStorage.clear();
            this.$router.push('/login');/*采用的是编程式导航,页面跳转*/
        },
        showHide : function () {
            this.aside = !this.aside;
        },
        showCollapse : function () {
            this.isCollapse = !this.isCollapse;
        },
        saveNavStatus : function(url,name){
            sessionStorage.setItem("activeUrl", url);
            sessionStorage.setItem("activeTitle", name);
            this.activeUrl = url;
            this.title = name;
        },
        async getListData () {
             const {data : res} = await this.$http.get('/getListMenu');
        }
    },
    created() {
        var _active = sessionStorage.getItem('activeUrl');
        if (_active){
            this.activeUrl = _active;
        }
        var _title = sessionStorage.getItem('activeTitle');
        if (_title){
            this.title = _title;
        }
        //this.getListData();
    }
}
</script>

<style scoped>
    .home-container{
        height: 100%;
    }
    .el-header{
        background-color: #09AAFF;
        display: flex;
        justify-content: space-between;
        padding: 0 10px 0 8px;
        align-items: center;
        color: #fff;
        height: 60px;
        line-height: 60px;
    }
    .el-header > div{
        display: flex;
        align-items: center;
    }
    .el-header > div img{
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
    .el-header label{
        font-size: 22px;
        margin-left: 15px;
    }
    .toggle-button0{
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24;
        height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
    }
    .el-aside {
        background-color: #f3f3f3;
        border-right: 1px solid #ddd;
    }
    .el-menu-item, .el-submenu__title{
        height: 42px;
        line-height: 42px;
        padding-left:4px !important;
        padding-right:4px !important;
        border-bottom: 1px solid #e0e0e0;
    }
    li.el-submenu{
        border-bottom : none !important;
    }
    .toggle-menu{
        height: 42px;
        line-height: 42px;
        min-width:100%;
        text-align: center;
        cursor: pointer;
        letter-spacing: 0.2em;
        border-bottom: 1px solid #e0e0e0;
        color: #000;
    }
    li.el-submenu {
        border-bottom:1px solid #e0e0e0;
    }
    .el-aside .el-menu{
        border-right: none;
    }
    .el-main {
        padding: 0;
    }
    .main-title{
        height: 40px;
        line-height: 40px;
        width: 100%;
        background-color: #f5f5f5;
    }
    .main-title label{
        margin-left:6px
    }
    .el-footer {
        background-color: #F2F6FC;
        color: #333;
        text-align: center;
        line-height: 60px;
        height: 60px;
    }
    .el-menu--collapse{
        width:44px !important;
    }
    .el-menu-item{
        padding-left:20px;
    }
</style>
