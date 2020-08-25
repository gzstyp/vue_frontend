<template>
    <div v-cloak>
        <div v-if="permissions.role_btn_listData">
            <el-row>
                <el-col :span="4" v-if="permissions.role_btn_listData">
                    <el-input placeholder="输入关键字" v-model="searchForm.name" clearable>
                        <el-button slot="append" icon="el-icon-search" @click="search()" title="搜索"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="handleEdit()" icon="el-icon-plus" v-if="permissions.role_btn_add">添加</el-button>
                    <el-button :disabled="kids.length <= 0" type="danger" @click="delByKeys()" icon="el-icon-delete" v-if="permissions.role_btn_delByKeys">删除</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table :data="listDatas" :empty-text="listEmpty" @selection-change="selectionChange" @row-dblclick="dblclick" border stripe style="margin-top:6px;">
                    <el-table-column type="selection" align="center" width="35"></el-table-column>
                    <el-table-column prop="role_name" label="角色名称" ></el-table-column>
                    <el-table-column prop="role_flag" label="角色标识"></el-table-column>
                    <el-table-column label="分配量" width="114">
                        <template slot-scope="scope">
                            {{(scope.row.utotal) ? scope.row.utotal : '0'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="菜单数" width="114">
                        <template slot-scope="scope">
                            {{(scope.row.mtotal) ? scope.row.mtotal : '0'}}
                        </template>
                    </el-table-column>
                    <el-table-column :width="options('role_row_delEmptyMenu,role_row_getRoleMenu') ? 240 : 130" label="操作选项" v-if="operation('role_row_edit,role_row_delById,role_row_delEmptyMenu,role_row_getRoleMenu')">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope.row)" v-if="permissions.role_row_edit">编辑</el-button>
                            <el-button size="mini" type="danger" @click="rowDelete(scope.$index,scope.row)" v-if="permissions.role_row_delById">删除</el-button>
                            <template v-if="options('role_row_delEmptyMenu,role_row_getRoleMenu')">
                                <el-dropdown size="medium" split-button  style="margin-left:6px;">
                                    操作
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-if="permissions.role_row_delEmptyMenu" @click.native="rowEmptyMenu(scope.row)">清空菜单</el-dropdown-item>
                                        <el-dropdown-item v-if="permissions.role_row_getRoleMenu" @click.native="rowRoleMenu(scope.row)">角色菜单</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-if="page.size<page.total"
                    background
                    layout="total,sizes,prev,pager,next,jumper"
                    @size-change="changeSize"
                    @current-change="currentChange"
                    :page-size="page.size"
                    :page-sizes="page.sizes"
                    :current-page="page.current"
                    :total="page.total">
                </el-pagination>
            </el-row>
            <el-dialog :title="dialogTitle" :lock-scroll="false" :visible.sync="dialogVisible" width="32%" :before-close="handleClose" :close-on-click-modal="false" :append-to-body="true">
                <el-form ref="form" label-width="20%">
                    <el-form-item label="角色名称">
                        <el-input v-model="formData.role_name" placeholder="角色名称" clearable style="width:85%"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" label-width="20%">
                    <el-form-item label="角色标识">
                        <el-input v-model="formData.role_flag" placeholder="角色标识" clearable style="width:85%"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submits()">提交</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </span>
            </el-dialog>
        </div>
        <div v-if="!permissions.role_btn_listData"></div>
    </div>
</template>

<script>
    import BlankPage from "../components/BlankPage";
    export default {
        components : {BlankPage},
        name: "Role",
        data : function(){
            return {
                listEmpty:'暂无数据',
                dialogTitle :'添加|编辑',
                formData : {
                    kid : '',
                    role_name : '',
                    role_flag : '',
                },
                searchForm : {
                    name : ''
                },
                kids: [],
                listDatas : [],
                page: {
                    current: 1,
                    size: 20,
                    sizes: [20,50,99],
                    total: 0
                },
                dialogVisible : false,
                permissions : {
                    role_btn_listData : false,
                    role_btn_add : false,
                    role_btn_delByKeys : false,
                    role_row_getRoleMenu : false,
                    role_row_delById : false,
                    role_row_edit : false,
                    role_row_saveRoleMenu : false,
                    role_row_delEmptyMenu : false
                },
                ops : true,/*下拉操作*/
                opts : false,/*下拉操作是否已执行标识*/
                opn : true,/*操作选项*/
                operate : false/*操作选项是否已执行标识*/
            }
        },
        created() {
            this.getListData();
        },
        methods : {
            // 行选择触发事件
            selectionChange(selection) {
                this.kids = [];
                selection.forEach(element => {
                    this.kids.push(element.kid);
                });
            },
            dblclick : function(row,column,event){
                this.openDialog(row);
            },
            search : function(){
                this.getListData();
            },
            openDialog : function(row){
                if(row != null && row.kid != null){
                    this.formData = {
                        kid : row.kid,
                        role_name : row.role_name,
                        role_flag : row.role_flag
                    };
                }else{
                    this.formData = {};
                }
                this.dialogVisible = true;
            },
            //dialog对话框右上角的关闭之前的操作
            handleClose : function(done) {
                this.dialogVisible = false;
            },
            checkForm : function(){
                if(!this.formData.role_name){
                    this.$message.error('请填写角色名称');
                    return;
                }
                if(!this.formData.role_flag){
                    this.$message.error('请填写角色标识');
                    return;
                }
                return true;
            },
            handleEdit : function(index,item){
                if(item != null && item.kid != null){
                    this.dialogTitle = '编辑角色';
                    this.openDialog(item);
                }else{
                    this.dialogTitle = '添加角色';
                    this.openDialog(null);
                }
            },
            rowDelete : function(index,row){
                var _this = this;
                this.$confirm('系统提示',{
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //_this.listDatas.splice(index,1);
                    this.httpReq.post(this.apis.role.delById,{id:row.kid},function(data){
                        _this.resultHandle(data);
                    });
                }).catch(action => {
                    this.$message({
                        showClose: true,
                        message : '已取消操作'
                    });
                });
            },
            rowEmptyMenu : function(row){
                var total = row.mtotal;
                if(total == null){
                    layerFn.alert('['+row.role_name+']还没有分配菜单',AppKey.code.code199);
                    return;
                }
                layerFn.confirm('你确定要清空<span style="color:#1e9fff">'+row.role_name+'</span>的菜单操作吗?',function(){

                });
            },
            rowRoleMenu : function(row){
                console.info('rowRoleMenu'+row.kid);
            },
            resultHandle : function(data){
                if(data.code === 200){
                    this.dialogVisible = false;
                    this.$notify({
                        title: '系统提示',
                        message: data.msg,
                        type: 'success'
                    });
                    this.getListData();
                }else{
                    this.$notify({
                        title: '系统提示',
                        message: data.msg,
                        type: 'warning'
                    });
                }
            },
            delByKeys : function(){
                var _this = this;
                if(this.kids){
                    this.$confirm("删除之后是无法恢复的,你要批量删除"+this.kids.length+"条数据吗?",'系统提示',{
                        distinguishCancelAndClose: true,
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {

                    }).catch(action => {

                    });
                }else{
                }
            },
            submits : function(){
                var form = this.checkForm();
                if(!form){
                    return;
                }
                var _this = this;
                var kid = this.formData.kid;
                var url = (kid == null || kid.length <= 0) ? this.apis.role.add : this.apis.role.edit;
                this.httpReq.post(url,this.formData,(data) =>{
                    _this.resultHandle(data);
                });
            },
            getListData : function(){
                var _this = this;
                var params = {
                    current : _this.page.current,
                    pageSize : _this.page.size
                };
                if(_this.searchForm.name){
                    params.role_name = _this.searchForm.name;
                }
                self.layerIndex = layerFn.loading('正在处理……');
                this.httpReq.get(this.apis.role.listData,params,(data)=>{
                    layerFn.closeIndex(self.layerIndex);
                    if(data.code === 200){
                        _this.listDatas = data.data;
                        _this.page.total = data.total;
                        _this.controlShow(data.permissions)
                    }else{
                        _this.listDatas = [];
                        _this.page.total = 0;
                        _this.listEmpty = data.msg;
                    }
                },(error)=>{
                    layerFn.closeIndex(self.layerIndex);
                    _this.listDatas = [];
                    _this.listEmpty = '连接服务器失败';
                });
            },
            /*控制按钮是否显示*/
            controlShow : function(data){
                var ps = this.permissions;
                for(var x=0;x<data.length;x++){
                    var value = data[x];
                    for(var key in ps){
                        if(key === value){
                            ps[key] = true;
                            break;
                        }
                    }
                }
            },
            /*操作选项*/
            operation : function(opts){
                if(this.opn){
                    this.opn = false;
                    var arrs = opts.split(',');
                    var data = this.permissions;
                    var _this = this;
                    for(const index in arrs){
                        var k = arrs[index];
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
            /*下拉操作*/
            options : function(opts){
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
            },
            changeSize : function (pageSize){
                this.page.current = 1;
                this.page.size = pageSize;
                this.getListData();
            },
            currentChange : function(current){
                this.page.current = current;
                this.getListData();
            }
        }
    }
</script>

<style scoped>
</style>
