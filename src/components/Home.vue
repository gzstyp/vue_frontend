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
            <el-aside :width="isCollapse ? '64px': '220px'" v-if="aside">
                <el-menu
                  unique-opened
                  router
                  :collapse="isCollapse"
                  :collapse-transition="false"
                  :default-active="activeUrl"
                  @open="handleOpen"
                  @close="handleClose"
                  background-color="#f3f3f3"
                  text-color="#000"
                  active-text-color="#409eff">
                    <el-submenu :index="''+item.id" v-for="item in listMenu" :key="item.id">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <el-menu-item :index="'/'+subItem.url" v-for="subItem in item.children" :key="subItem.id" @click="saveNavStatus('/'+subItem.url,subItem.name)">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{subItem.name}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
                <div title="显示|收缩" class="toggle-menu" @click="showCollapse"><i :class="isCollapse ? 'el-icon-right' : 'el-icon-back'"></i></div>
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
                    id : 10001,
                    name : '系统管理',
                    url : null,
                    children : [
                        {
                            id : 100011,
                            name : '角色管理',
                            url : 'role'
                        },
                        {
                            id : 100012,
                            name : '用户管理',
                            url : 'user'
                        },
                        {
                            id : 100013,
                            name : '系统菜单',
                            url : 'menu'
                        }
                    ]
                },
                {
                    id : 10002,
                    name : '水西天香',
                    url : null,
                    children : [
                        {
                            id : 100021,
                            name : '文章分类',
                            url : 'role1'
                        },
                        {
                            id : 100022,
                            name : '文章管理',
                            url : 'user1'
                        },
                        {
                            id : 100023,
                            name : '轮播图管理',
                            url : 'menu1'
                        }
                    ]
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
        handleOpen : function () {

        },
        handleClose : function () {

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
		color: #333;
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
    .toggle-menu{
        height: 50px;
        line-height: 50px;
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
		padding: 0px;
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
</style>
