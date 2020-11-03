<template>
  <div id="app">
   <!-- 路由占位符,登录页,即显示路由导航的位置,这个是默认显示的东东(启动页默认显示的页面)[有两个路由占位符地方,一个是本文件,另一个是在文件src\components\Home.vue] -->
   <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
    [v-cloak]{
        display:none;
    }
    /*导航菜单开始*/
    div.el-submenu__title{
        padding:0 0 0 6px !important;
        height:42px;
        line-height:42px;
        border-bottom: 1px solid #e0e0e0 !important;
    }
    li.el-submenu .el-menu-item{
        padding:0 2px 0 6px !important;
        height:42px;
        line-height:42px;
    }
    /*导航菜单结束*/
    /* element-ui中dialog居中开始 */
    .el-dialog{
        display: flex;
        flex-direction: column;
        margin:0 !important;
        position:absolute;
        border-radius:4px;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        max-height:calc(100% - 30px);
        max-width:calc(100% - 30px);
    }
    .el-dialog .el-dialog__body{
        flex:1;
        overflow: auto;
    }
    /*弹出框的按钮样式*/
    .el-dialog__footer {
        padding: 4px 0;
        text-align: center;
        box-sizing: border-box;
    }
    /* element-ui中dialog居中结束*/
    /*表格样式开始*/
    /*表格内的样式(表头)  padding: 6px 0; 较为好看*/
    div table thead tr th{
        padding:1px 0 !important;
        height:39px !important;/*数据表格的行的高度[36px对应表体的37px;39px对应表体的39px]*/
    }
    /*数据表格的样式(表体)*/
    div table tbody tr td{
        height:39px !important;/*数据表格的行的高度[37对应表头36px;39对应表头39px]*/
        padding:0;
    }
    .el-table td, .el-table th{
        padding:0;
    }
    /*解决复选框有点点的问题,可以删除???*/
    .el-table-column--selection .cell{padding-right:10px;}
    .el-textarea__inner{
        padding:4px;
    }
    /*暂无数据的样式*/
    .el-table__empty-block {height:39px !important;min-height:39px;}/*数据表格的行的高度*/
    .el-table__empty-text{line-height: 39px;height:39px;width:100%;color: #909399;border-bottom:1px solid #ebeef5}/*数据表格的行的高度*/
    /*表格样式结束*/
</style>