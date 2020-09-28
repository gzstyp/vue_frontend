<template>
    <el-container class="home-container" v-cloak>
        <el-header>
            <div>
                <img src="../assets/logo.jpg" alt="logo">
                <label>噪音数据分析管理系统</label>
                <i @click="showHide()" style="font-size: 24px;cursor: pointer;" title="隐藏|显示导航" :class="aside ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
            </div>
            <div>
                <el-dropdown>
                    <span class="el-dropdown-link" style="color:#fff;cursor:pointer;margin-right:8px;font-size:14px;">
                        {{loginUser}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-plus" @click.native="dropdownOpts('/persion','个人信息')">个人信息</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus">修改密码</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-close" @click.native="logout()">退出登录</el-dropdown-item><!--添加.native属性表示是支持原生的方法,因为组件 el-dropdown 不提供click方法-->
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>
            <el-aside :width="'220px'" v-if="aside">
                <TreeMenu :listMenu="listMenu"/>
			</el-aside>
            <el-container>
                <el-main>
                    <!--标题-->
                    <div class="main-title">
                        <Tab/>
                    </div>
                    <div style="padding:2px;">
                        <!--路由占位符,即显示路由导航的位置[有两个路由占位符地方,一个是本文件,另一个是在文件src\App.vue] -->
                        <router-view/>
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
    import Tab from "../components/Tab";
    import TreeMenu from "../components/TreeMenu";
export default {
    components : {Tab,TreeMenu},
    data(){
        return {
            aside : true,
            loginUser : sessionStorage.getItem('userName') || '未登录',
            listMenu : []
        }
    },
    methods : {
        logout : function (){
            this.$store.commit('clearMenu');
            this.$router.push('/login');/*采用的是编程式导航,页面跳转*/
        },
        dropdownOpts : function (url,name){
            this.$store.commit('selectMenu',{name:name,url:url});
            this.$router.push({path:url});
        },
        showHide : function () {
            this.aside = !this.aside;
        },
        async getListData () {
             const {data : res} = await this.$http.get('/getListMenu');
        }
    },
    beforeCreate(){
        this.$router.push({path:'/welcome'});//刷新默认加载首页|欢迎页
    },
    created(){
        var menuData = sessionStorage.getItem('menuData');
        //this.listMenu = eval('('+ menuData +')');
        this.listMenu = eval("(0," + menuData + ")");//兼容IE8的写法,推荐
    }
}
</script>

<style scoped>
    .home-container{
        height: 100%;
    }
    .el-header{
        background-color: #09aaff;
        display: flex;
        justify-content: space-between;
        padding: 0 2px 0 6px;
        color: #fff;
        height: 44px !important;
        line-height: 44px !important;
    }
    .el-header > div{
        display: flex;
        align-items: center;
    }
    .el-header > div img{
        height: 36px;
        width: 36px;
        border-radius: 50%;
    }
    .el-header label{
        font-size: 22px;
        margin-left:4px;
    }
    .el-aside {
        background-color: #f3f3f3;
        border-right: 1px solid #ddd;
    }
    .toggle-button{
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24;
        height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
    }
    .el-main {
        padding: 0;
    }
    .main-title{
        display:flex;
        justify-content:start;
        align-items:center;
        height: 42px;
        padding-left:2px;
        background-color: #f5f5f5;
        overflow:hidden;
    }
    .el-footer {
        background-color: #F2F6FC;
        color: #333;
        text-align: center;
        line-height: 44px !important;
        height: 44px !important;
    }
</style>