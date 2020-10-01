<template>
    <div v-cloak>
        <div v-if="permissions.role_btn_listData">
            <el-row>
                <el-table :data="listDatas" :empty-text="listEmpty" @selection-change="selectionChange" @row-dblclick="dblclick" border stripe style="margin-top:6px;" :height="tableHeight">
                    <el-table-column type="selection" align="center" width="35"></el-table-column>
                    <template v-for="item in theads">
                        <el-table-column :prop="item.prop" :label="item.label" :width="item.width" :sortable="item.sortable" show-overflow-tooltip></el-table-column>
                    </template>
                    <!-- 操作选项 -->
                    <el-table-column align="center" :width="options('role_row_delEmptyMenu,role_row_getRoleMenu') ? 200 : 130" label="操作选项" v-if="operation('role_row_edit,role_row_delById,role_row_delEmptyMenu,role_row_getRoleMenu')">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" plain @click="rowEdit(scope.row,scope.$index)" v-if="permissions.role_row_edit">编辑</el-button>
                            <el-button type="danger" size="mini" plain @click="rowDelete(scope.row,scope.$index)" v-if="permissions.role_row_delById">删除</el-button>
                            <template v-if="options('role_row_delEmptyMenu,role_row_getRoleMenu')">
                                <el-dropdown style="margin-left:6px;" trigger="click" @command="clickIndex(scope.$index)">
                                    <span class="el-dropdown-link" style="cursor:pointer;font-size:14px;">
                                        <el-button size="mini" plain class="rowDataOpts" :id="scope.row.kid" :value="JSON.stringify(scope.row)">选项</el-button>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <slot name="handleOptions"></slot>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
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
            listEmpty: '暂无数据',
            kids: [],//保存复选框已勾选的id
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
            tableHeight : 760//默认的高度
        }
    },
    created(){
        this.tableHeight = winFn.fnGetHeight() - 253;
    },
    methods: {
        //必填项,点击行的索引列,触发事件,此时需要在父组件[调用方]添加一个接收事件名‘clickItemIndex’即可达到子组件向父组件数据
        clickIndex(index){
            this.$emit('clickItemIndex',index);
        },
        //每页大小,更改每页大小时跳转到第1页
        eventSize(size){
            this.page.current = 1;
            //事件获取之后,要发送事件到调用页面,通过父组件(调用页面)自定义事件实时发送事件;
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
            selection.forEach(item => {
                this.kids.push(item.kid);
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
    },
    mounted(){
        $(window).resize(function (){                    //当浏览器大小变化时
            //alert($(window).height());                 //浏览器时下窗口可视区域高度
            //alert($(document).height());               //浏览器时下窗口文档的高度
            //alert($(document.body).height());          //浏览器时下窗口文档body的高度 979
            //alert($(document.body).outerHeight(true)); //浏览器时下窗口文档body的总高度 包括border padding margin 979
            this.tableHeight = winFn.fnGetHeight() - 253;
        });
    }
}
</script>
<style scoped>
</style>