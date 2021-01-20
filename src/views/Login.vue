<template>
    <div class="login_container" v-cloak>
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.jpg" alt="logo"/>
            </div>
            <el-form :model="loginForm" label-width="80px" class="login_form">
                <el-form-item label="登录账号">
                    <el-input v-model="loginForm.username" placeholder="输入登录账号|用户名"/>
                </el-form-item>
                <el-form-item label="登录密码">
                    <el-input type="password" v-model="loginForm.password" placeholder="输入登录密码" />
                </el-form-item>
            </el-form>
            <el-row type="flex" justify="center" class="btns">
                <el-button type="primary" @click="login()">登录认证</el-button>
                <el-button type="danger" @click="resetData()">取消重置</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
		return{
			loginForm : {
                username : 'admin',
				password : 1
			}
		}
	},
    methods : {
        login : function (){
            var _username = this.loginForm.username;
            var _password = this.loginForm.password;
            if(_username.length === 0 || (typeof(_username)=='string' && _username.replace(/^\s+|\s+$/gm,'').length <=0)){//验证完美
                this.$message.error('请输入登录账号!');
                return;
            }
            if(_password.length === 0 || (typeof(_password)=='string' && _password.replace(/^\s+|\s+$/gm,'').length <=0)){
                this.$message.error('请输入登录密码!');
                return;
            }
            self.layerIndex = layerFn.loading('登录认证……');
            this.httpReq.post(this.apis.user.login,this.loginForm,(data) =>{
                layerFn.closeIndex(self.layerIndex);
                if(data.code === 200){
                    this.$store.commit('clearMenu');//防止二次登录
                    sessionStorage.setItem('accessToken',data.data.accessToken);
                    sessionStorage.setItem('refreshToken',data.data.refreshToken);
                    sessionStorage.setItem('userName',data.data.userName);
                    sessionStorage.setItem('menuData',data.data.menuData);
                    this.$router.push({path : '/home'});//采用的是编程式导航,进行页面跳转
                }else{
                    this.$message.warning(data.msg);
                }
            },(error) =>{
                layerFn.closeIndex(self.layerIndex);
                this.$message.error('连接服务器失败');
            });
        },
        resetData(){
            this.loginForm.username = '';
            this.loginForm.password = '';
        }
    }
}
</script>

<style scoped>
    [v-cloak]{
        display:none;
    }
    .login_container{
        height: 100%;
        width: 100%;
        background-image:url("../assets/images/bg_login.jpg");
        background-size:100% 100%;
    }
    .login_box{
        width: 450px;
        height: 300px;
        background-color:rgba(241, 235, 235, 0.5);
        border-radius: 8px;
        position:absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .login_box .avatar_box{
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 8px;
        box-shadow: 0 0 10px #ddd;/* 添加阴影,向外扩展10px */
        position:absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
    }
    .login_box .avatar_box img{
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
    .btns{
        bottom: -240px;
    }
    .login_form{
        position:absolute;
        width: 100%;
        top: 100px;
        box-sizing: border-box;
        padding-right: 15px;
    }
</style>