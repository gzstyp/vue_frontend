import axios from "axios";
//创建axios实例,本实例不包含表单里有文件上传功能
const instance = axios.create({
    timeout : 40000
});
var refreshFlag = true;
//请求拦截器,好使!!!但需要后端要支持才行
instance.interceptors.request.use(function(config){
    const access = sessionStorage.getItem('accessToken');
    const refresh = sessionStorage.getItem('refreshToken');
    if(access != null && access.length > 0){
        if(refresh != null && refresh.length > 0){
            config.headers.accessToken = access;
            config.headers['refreshToken'] = refresh;
        }
    }
    const formData = new FormData();
    const params = config.data;
    for(const key in params){
        const k = key.trim();
        const v = params[key].trim();
        if(k != null && k.length > 0){
            if(v != null && v.length > 0){
                formData.append(k,v);
            }
        }
    }
    config.data = formData;
    return config;
},error => {
    return Promise.reject(error);
});

//响应拦截器,在实际应用中可以,好使!!!
instance.interceptors.response.use((data) =>{
    const _data = data.data;
    if(_data.code === 200){
        var renewal = _data.renewal;//注意该更新token标识
        if(renewal){
            if(refreshFlag){
                refreshFlag = false;
                renewalToken();
            }
        }
    }
    return data.data;
},error => {
    return Promise.reject(error);
});

function renewalToken(){
    var params = {'accessToken': (sessionStorage.getItem('accessToken') || '')};
    instance.post(urlPrefix + 'user/renewalToken',params).then((data)=>{
        setTimeout(function(){
            refreshFlag = true;
        },120000);//2分钟后又可以刷新,防止重复刷新
        if(data.code === AppKey.code.code200){
            var token = data.data;
            sessionStorage.setItem("accessToken",token.accessToken);
            sessionStorage.setItem("refreshToken",token.refreshToken);
        }else if(data.code === AppKey.code.code205){
            layerFn.tokenLogin();
        }else{
            layerFn.alert(data.msg,data.code);
        }
    });
}

export default instance;//导出，方便其他调用!!!
