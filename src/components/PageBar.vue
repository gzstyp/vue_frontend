<template>
    <el-pagination
        v-if="page.size < page.total"
        background
        layout="total,sizes,prev,pager,next,jumper"
        @size-change="changeSize"
        @current-change="currentChange"
        :page-size="page.size"
        :page-sizes="page.sizes"
        :current-page="page.current"
        :total="page.total">
    </el-pagination>
</template>
<script>
    export default {
        name: "PageBar",
        props : {
            page : {
                type : Object,
                default(){
                    return {}
                }
            }
        },
        methods : {
            changeSize(pageSize){
                this.$emit('childrenSize',pageSize);
            },
            currentChange(current){
                this.$emit('childrenCurrent',current);
            }
        }
    }
</script>
<style scoped>

</style>