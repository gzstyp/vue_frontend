<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-input placeholder="请输入内容" v-model="searchForm.name">
                    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="handleEdit()" icon="el-icon-plus">添加</el-button>
                <el-button :disabled="kids.length > 0 ? false:true" type="danger" @click="delByKeys()" icon="el-icon-delete">删除</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="listDatas" :empty-text="listEmpty" @selection-change="selectionChange" @row-dblclick="dblclick" border stripe style="margin-top:6px;">
                <el-table-column type="selection" align="center" width="35"></el-table-column>
                <el-table-column prop="role_name" label="楼层名称" ></el-table-column>
                <el-table-column prop="role_flag" label="路由地址" width="280"></el-table-column>
                <el-table-column width="250" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
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
            <el-form ref="form" label-width="120px">
                <el-form-item label="楼层名称">
                    <el-input v-model="formData.name" placeholder="楼层名称" clearable style="width:90%"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" label-width="120px">
                <el-form-item label="路由地址">
                    <el-input v-model="formData.url" placeholder="路由地址" clearable style="width:90%"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" label-width="120px">
                <el-form-item label="楼层排序">
                    <el-input v-model="formData.sort" placeholder="楼层排序" clearable style="width:90%" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submits()">提交</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Role",
        data : function(){
            return {
                listEmpty:'暂无数据',
                dialogTitle :'楼层名称',
                formData : {
                    kid : '',
                    name : '',
                    url : '',
                    sort : ''
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
                dialogVisible : false
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
                        name : row.name,
                        url : row.url,
                        sort : row.sort,
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
                if(!this.formData.name){
                    this.$message.error('请填写楼层名称');
                    return;
                }
                if(!this.formData.url){
                    this.$message.error('请填写路由地址');
                    return;
                }
                return true;
            },
            handleEdit : function(index,item){
                if(item != null && item.kid != null){
                    this.dialogTitle = '编辑楼层名称';
                    this.openDialog(item);
                }else{
                    this.dialogTitle = '添加楼层名称';
                    this.openDialog(null);
                }
            },
            handleDelete : function(index,row){
                var _this = this;
                this.$confirm('系统提示',{
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.listDatas.splice(index,1);
                    this.httpReq.post(this.apis.role.delById,{kid:row.kid},function(data){
                        _this.resultHandle(data);
                    });
                }).catch(action => {
                    this.$message({
                        showClose: true,
                        message : '已取消操作'
                    });
                });
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
                this.httpReq.get(this.apis.role.listData,params,(data)=>{
                    if(data.code === 200){
                        _this.listDatas = data.data;
                        _this.page.total = data.total;
                    }else{
                        _this.listDatas = [];
                        _this.page.total = 0;
                        _this.listEmpty = data.msg;
                    }
                },(error)=>{
                    _this.listDatas = [];
                    _this.listEmpty = '连接服务器失败';
                });
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
