<template>
    <div>
        <!-- :closable="tag.path !== 'home'" 表示不等于首页时才显示关闭按钮 -->
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
        computed : {
            //括号内的参数可以是数组或对象,此处是对象,前面的tags是属性名,好比在 data 定义一个属性名为 tags 一个道理，只是用了一个属性的辅助 mapState 替换了在 data 写的属性名而已
            ...mapState({
                tags : state => state.tab.tabsList //tab是模块化的名称
            })//...表示让计算的属性合并
        },
        data(){
            return {}
        },
        methods: {
            ...mapMutations({
                close : 'closeTab'//即相当于 this.$store.commit('closeTab',tag);其closeTab指定Vuex方法名及传参数!!!
            }),
            handleClose(tag){
                this.close(tag);//调用的是上面的 close : 'closeTab' 的属性，tag 是参数!!!
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
