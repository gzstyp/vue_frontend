<template>
    <div>
        <!-- :closable="tag.url !== '/welcome'" 表示不等于首页时才显示关闭按钮 -->
        <el-tag :key="tag.name" v-for="tag in tags" :closable="tag.url !== '/welcome'" :disable-transitions="false"
                @close="handleClose(tag)"
                @click="changeMenu(tag)"
                :effect="$route.path === tag.url ? 'dark' : 'plain'"
                ><!--路由信息是没有 r 的,注意哦-->
            {{tag.name}}
        </el-tag>
    </div>
</template>
<script>
    import {mapState,mapMutations} from 'vuex';
    export default {
        name : "Tab",
        // 计算属性,它实时接收状态的变化,实时监听模块化 /store/tab.js 的标识state下里定义的 tabsList 值
        //计算属性,它实时监听vuex的状态mapState的变化,即实时监听 /store/index.js 的标识state下里定义的 historyLists 值;watch是监听 data() 或 props的值的变化而执行响应的事件或更改值
        computed : {
            //括号内的参数可以是数组或对象,此处是对象,前面的tags是属性名,好比在 data 定义一个属性名为 tags 一个道理，只是用了一个属性的辅助 mapState 替换了在 data 写的属性名而已
            ...mapState({
                tags : state => state.tab.tabsList //tab是模块化的名称,也就是 src/store/tab.js下的state的tabsList,tags有url和name
            })//...表示让计算的属性合并
        },
        data(){
            return {}
        },
        methods: {
            ...mapMutations({
                close : 'closeTab'//即相当于 this.$store.commit('closeTab',tag);其closeTab指定Vuex方法名及传参数!!!
            }),
            handleClose(item){
                this.close(item);//调用的是上面的 close : 'closeTab' 的属性，tag 是参数!!!
                const tabs = this.$store.state.tab.tabsList;
                const len = tabs.length;
                var url = tabs[len-1].url;
                this.$router.push({path:url});//关闭后显示最后一个tab
            },
            /*点击标签时跳转页面,采用自定义的name来进行页面跳转*/
            changeMenu(item){
                this.$router.push({path:item.url});//自定义通过name来进行跳转,即点击左边的导航菜单进行页面跳转,采用的是函数式编程,当有r时是路由,没有r的是参考路由信息
                this.$store.commit('selectMenu', item);
            }
        }
    }
</script>
<style scoped>
    .el-tag,.el-tag--light{
        margin-right:1px;
        cursor:pointer;
    }
</style>