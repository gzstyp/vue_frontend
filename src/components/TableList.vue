<template>
    <div v-cloak>
        <div v-if="permissions.role_btn_listData">
            <el-row>
                <el-table :data="listDatas" :empty-text="listEmpty" @selection-change="selectionChange" @row-dblclick="dblclick" border stripe style="margin-top:6px;" :height="tableHeight">
                    <el-table-column type="selection" align="center" width="35"></el-table-column>
                    <template v-for="item in theads">
                        <el-table-column :prop="item.prop" :label="item.label" :width="item.width" :sortable="item.sortable" show-overflow-tooltip></el-table-column>
                    </template>

                    <!--自定义列显示-->
                    <slot name="handleColumn"></slot>

                    <!-- 操作选项 -->
                    <el-table-column align="center" :width="options('role_row_delEmptyMenu,role_row_getRoleMenu') ? 200 : 130" label="操作选项" v-if="operation('role_row_edit,role_row_delById,role_row_delEmptyMenu,role_row_getRoleMenu')">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" plain @click="rowEdit(scope.row,scope.$index)" v-if="permissions.role_row_edit">编辑</el-button>
                            <el-button type="danger" size="mini" plain @click="rowDelete(scope.row,scope.$index)" v-if="permissions.role_row_delById">删除</el-button>

                            <slot name="handleOptions"></slot>

                        </template>
                    </el-table-column>
                </el-table>
                <PageBar style="margin-top:6px;" :page="page" @childrenSize="eventSize" @childrenCurrent="eventCurrent"></PageBar>
            </el-row>
        </div>
    </div>
</template>
<script>
import PageBar from "@/components/PageBar";
export default {
    name: "TableList",
    components : {
      PageBar
    },
    props: {
        currentIndex : 1,
        theads: {
            type: Array,
            default: null
        },
        listDatas: {
            type: Array,
            default(){
                return null
            }
        },
        total: {
            default: 0
        },
        dblclick: {
            type: Function
        },
        record : {
            type : Number,
            default(){}
        }
    },
    data: function(){
        return {
            listEmpty: '暂无数据', kids: [],
            page : {
                current : this.currentIndex,
                total : this.record,
                size : this.pageLimit,
                sizes : [this.pageLimit,20,50,99]
            },
            dialogVisible: false,
            permissions: {
                role_btn_listData: true,
                role_btn_add: true,
                role_btn_delByKeys: true,
                role_row_getRoleMenu: true,
                role_row_delById: true,
                role_row_edit: true,
                role_row_saveRoleMenu: true,
                role_row_delEmptyMenu: true
            },
            //下拉操作
            ops: true, //下拉操作是否已执行标识
            opts: false, //操作选项
            opn: true, //操作选项是否已执行标识
            operate: false,
            tableHeight : 760
        }
    },
    created(){
        this.tableHeight = winFn.fnGetHeight() - 253;
    },
    methods: {
        //每页大小
        eventSize(size){
            this.page.current = 1;
            this.$emit('eventChangeSize',size);
        },
        //当前页
        eventCurrent(current){
            this.page.current = current;
            this.$emit('eventChangeCurrent',current);
        },
        //行编辑
        rowEdit(row,index){
            this.$emit('rowEdit',{row,index});
        },
        //行删除
        rowDelete(row,index){
            this.$emit('rowDelete', {row,index});
        },
        // 行选择触发事件
        selectionChange(selection){
            this.kids = [];
            selection.forEach(element => {
                this.kids.push(element.kid);
            });
            this.$emit('delClick',this.kids);
        },
        //控制按钮是否显示
        controlShow: function(data){
            var ps = this.permissions;
            for(var x = 0; x < data.length; x++){
                var value = data[x];
                for(var key in ps){
                    if(key === value){
                        ps[key] = true;
                        break;
                    }
                }
            }
        },
        //操作选项
        operation: function(opts){
            if(this.opn){
                this.opn = false;
                var arrs = opts.split(',');
                var data = this.permissions;
                var _this = this;
                for(const index in arrs){
                    var k = arrs['' + index];
                    for(const key in data){
                        if(data[k]){
                            _this.operate = true;
                            break;
                        }
                    }
                }
            }
            return this.operate;
        },
        //下拉操作
        options: function(opts){
            if(this.ops){
                this.ops = false;
                var arrs = opts.split(',');
                var data = this.permissions;
                var _this = this;
                for(const index in arrs){
                    var k = arrs[index];
                    for(const key in data){
                        if(data[k]){
                            _this.opts = true;
                            break;
                        }
                    }
                }
            }
            return this.opts;
        }
    }
}
</script>
<style scoped>
</style>