<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/logo.jpg" alt="logo">
                <label>贵州救灾物资中心</label>
                <i @click="showHide()" style="font-size: 24px;cursor: pointer;" title="隐藏|显示导航" :class="aside ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
            </div>
            <div>
                <el-dropdown size="medium" split-button>
                    {{loginUser}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-plus">个人信息</el-dropdown-item>
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
            loginUser : 'admin',
            listMenu : [
                {
                    kid : '0000000000640033000000000ea4c107',
                    name : '系统管理',
                    icon : 'el-icon-setting',
                    hidden : true,
                    url : null,
                    children : [
                        {
                            kid : '0000000004dfa8b9000000002f4e715c',
                            name : '角色管理',
                            hidden : true,
                            url : 'role'
                        },
                        {
                            kid : '0000000007c4dd77ffffffffe68454c6',
                            name : '用户管理',
                            hidden : true,
                            url : 'user'
                        },
                        {
                            kid : '00000000456de029ffffffffc68a479c',
                            name : '系统菜单',
                            hidden : true,
                            url : 'menu'
                        }
                    ]
                },
                {
                    kid : '00000000454d3232ffffffffd0b0c4dd',
                    name : '水西天香',
                    hidden : true,
                    url : null,
                    icon : 'el-icon-help',
                    children : [
                        {
                            kid : '0000000043a8763d000000001f8b393f',
                            name : '文章分类',
                            hidden : true,
                            url : 'articleClass'
                        },
                        {
                            kid : '000000003bb712cd00000000022090e8',
                            name : '文章管理',
                            hidden : true,
                            url : 'articleManager'
                        },
                        {
                            kid : '00000000338a27a7ffffffff905a8f9e',
                            name : '数据库与软件版本管理',
                            hidden : true,
                            url : null,
                            icon : 'el-icon-set-up',
                            children : [
                                {
                                    kid : 'ffffffff95beb47dffffffffad7e6abe',
                                    name : '数据库定期维护管理列表',
                                    hidden : true,
                                    url : 'database'
                                },
                                {
                                    kid : 'ffffffffbd471a55ffffffff976c6d1b',
                                    name : '软件版本管理',
                                    hidden : true,
                                    url : 'software'
                                }
                            ]
                        }
                    ]
                },
                {
                    kid : '11ffffffbd471a55ffffffff976c6d11',
                    name : '个人信息',
                    hidden : true,
                    url : 'persion'
                }
            ]
        }
    },
    methods : {
        logout : function (){
            this.$store.commit('clearMenu');
            this.$router.push('/login');/*采用的是编程式导航,页面跳转*/
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
