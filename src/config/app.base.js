var tokenUrl = 'accessToken='+(sessionStorage.getItem('accessToken') || '') + '&refreshToken=' + (sessionStorage.getItem('refreshToken') || '');
const AppKey = {
    iconDir : 'js/layer/theme/default/',/**AppKey.iconDir*/
    confirm : '确定',/**AppKey.confirm*/
    close : '关闭',/**AppKey.close*/
    submit : '提交',/**AppKey.submit*/
    cancel : '取消',/**AppKey.cancel*/
    title : "系统提示",
    msg_error : "哦!网络故障请<a href='javascript:;' onclick='if(self==top){window.location.reload();}else{top.location.reload();}' style='text-decoration:none;color:#3b8cff;outline:none;cursor:pointer;'>刷新</a>或稍后重试",/**连接服务器失败*/
    msg_not_login : "未登录或登录超时,请<a href='javascript:;' onclick='if(self==top){window.location.reload();}else{top.location.reload();}' style='text-decoration:none;color:#3b8cff;outline:none;cursor:pointer;'>刷新</a>重试",/**稍后重试*/
    token_not_login : "未登录或登录超时,请<a href='/login.html' onclick='if(self==top){window.location.reload();}else{top.location.reload();}' style='text-decoration:none;color:#3b8cff;outline:none;cursor:pointer;'>登录</a>再重试",/**稍后重试*/
    notLogin : '未登录或登录超时',
    loginUrl : '/login.html',/**跳转到登录界面;用法:AppKey.loginUrl*/
    sysError : '系统出现错误',
    layerArea : '270px',/**AppKey.layerArea*/
    loadMsg : function(){
        var num = Math.random() * 10 + 1;/**随机生成1到10之间的数,包含1不包含10,即<=1 && =>9*/
        num = parseInt(num,10);
        if(num === 1){
            return '加载是件闹心事……';
        }else if(num === 2){
            return '感谢你的等待,请稍等……';
        }else if(num === 3){
            return '网络差,请稍等……';
        }else if(num === 4){
            return '正在载入数据……';
        }else if(num === 5){
            return '网络阻塞,努力加载中……';
        }else if(num === 6){
            return '服务器压力大,努力处理中……';
        }else if(num === 7){
            return '处理中,请稍等……';
        }else if(num === 8){
            return '数据正在赶来,请稍等……';
        }else{
            return '网络不给力,努力加载中……';
        }
    },
    baseApi : 'http://192.168.3.108:901/',
    tokenStart : '?'+tokenUrl,
    tokenParams : '&'+tokenUrl,
    code : {
        /**自定义code及msg*/
        code198 : 198,
        /**请求失败|操作失败*/
        code199 : 199,
        /**请求成功|操作成功*/
        code200 : 200,
        /**返回空值|暂无数据*/
        code201 : 201,
        /**请求协议参数不完整*/
        code202 : 202,
        /**密钥验证失败*/
        code203 : 203,
        /**系统出现错误*/
        code204 : 204,
        /**未登录或登录超时*/
        code205 : 205,
        /**无权限操作*/
        code401 : 401
    },
    msg : {
        /**操作失败*/
        msg199: '操作失败', /**操作成功*/
        msg200: '操作成功', /**暂无数据*/
        msg201: '暂无数据', /**参数不完整*/
        msg202: '参数不完整', /**系统出现错误*/
        msg204: '系统出现错误', /**未登录或登录超时*/
        msg205: '未登录或登录超时', /**无权限操作*/
        msg401: '无权限操作'
    }
}
export default AppKey;
