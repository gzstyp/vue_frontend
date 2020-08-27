<template>
    <div class="pageContainer" v-if="show" v-cloak>
        <div class="pageContent">{{content}}</div>
    </div>
</template>
<script>
    export default {
        name: "BlankPage",
        props : {
            show : {
                default : false
            },
            content : {
                default : ''
            }
        }
    }
</script>
<style scoped>
    .pageContainer{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .pageContent{
        height:40px;
        line-height:40px;
        width:110px;
        text-align:center;
    }
</style>