import axios from "axios";
//创建axios实例,本实例不包含表单里有文件上传功能
const instance = axios.create({
    timeout : 40000
});

//请求拦截器,好使!!!但需要后端要支持才行
instance.interceptors.request.use(function(config){
    var access = sessionStorage.getItem('access_token');
    var refresh = sessionStorage.getItem('refresh_token');
    if(access != null && access.length > 0){
        if(refresh != null && refresh.length > 0){
            config.headers.access_token = access;
            config.headers['refresh_token'] = refresh;
        }
    }
    var formData = new FormData();
    var params = config.data;
    for(var key in params){
        var k = key.trim();
        var v = params[key].trim();
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
    var _data = data.data;
    if(_data.code === 200){
        var renewal = data.renewal;//注意该更新token标识
        if(renewal){
            //更新令牌
            instance.get('http://api.fwtai.com/dataView/getFloorArea', {params: {}}).then(data =>{
                console.info('更新令牌成功');
            }).catch(error=>{
                console.info('更新令牌失败');
            });
        }
    }
    return data.data;
},error => {
    return Promise.reject(error);
});

export default instance;//导出，方便其他调用!!!
