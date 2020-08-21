<template>
    <!--若是启用属性 el-menu 的 router 的话,那无法控制标签页的数量-->
    <el-menu
        unique-opened
        :collapse-transition="false"
        :default-active="$route.path"
        background-color="#f3f3f3"
        text-color="#000"
        active-text-color="#409eff">
        <template v-for="item in listMenu">

            <template v-if="item.children">
                <el-submenu :index="''+item.kid">
                    <template slot="title">
                        <i :class="item.icon" style="font-size:20px"></i>
                        <span>{{item.name}}</span>
                    </template>
                    <template v-for="subItem in item.children">

                        <template v-if="subItem.children">

                            <el-submenu :index="''+subItem.kid">

                                <template slot="title">
                                    <i :class="subItem.icon" style="font-size:20px"></i>
                                    <span>{{subItem.name}}</span>
                                </template>
                                <template v-for="subIt in subItem.children">

                                    <el-menu-item :index="'/'+subIt.url" @click="saveNavStatus('/'+subIt.url,subIt.name)" v-if="subIt.hidden">
                                        <template slot="title">
                                            <span>{{subIt.name}}</span>
                                        </template>
                                    </el-menu-item>

                                </template>

                            </el-submenu>

                        </template>
                        <template v-if="!subItem.children">

                            <el-menu-item :index="'/'+subItem.url" @click="saveNavStatus('/'+subItem.url,subItem.name)" v-if="subItem.hidden">
                                <template slot="title">
                                    <span>{{subItem.name}}</span>
                                </template>
                            </el-menu-item>

                        </template>

                    </template>
                </el-submenu>
            </template>
            <template v-if="!item.children">
                <el-menu-item :index="'/'+item.url" @click="saveNavStatus('/'+item.url,item.name)" v-if="item.hidden">
                    <template slot="title">
                        <span>{{item.name}}</span>
                    </template>
                </el-menu-item>
            </template>

        </template>
    </el-menu>
</template>
<script>
    export default {
        name : "TreeMenu",
        props : {
            listMenu : null
        },
        methods : {
            /*若是启用属性 el-menu 的 router 的话,那无法控制标签页的数量*/
            saveNavStatus : function(url,name){
                const tabs = this.$store.state.tab.tabsList;
                const len = tabs.length;
                if(len > 6){
                    let result = tabs.findIndex(item => item.url === url);
                    if(result === -1){
                        this.$message.warning('标签页太多,先关闭再打开');
                    }else{
                        this.$router.push({path:url});
                    }
                }else{
                    this.$store.commit('selectMenu',{name:name,url:url});
                    this.$router.push({path:url});
                }
            }
        }
    }
</script>
<style scoped>
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
    .el-menu--collapse{
        width:44px !important;
    }
    .el-menu-item{
        padding-left:10px;
    }
    .el-menu-item:focus,.el-menu-item.is-active{
        /*background: url("../assets/images/zfx04.svg") no-repeat right;*/
    }
    .el-submenu [class^=el-icon-]{
        margin-right:0;
    }
</style>
