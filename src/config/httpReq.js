import service from './service.js';
const httpReq = {
    post(url,params,succeed,failure){
        service.post(url,params).then((data) =>{
            if(data.code === AppKey.code.code205){
                layerFn.tokenLogin();
            }else if(data.code === AppKey.code.code401){
                status500(data.msg);
            }else{
                succeed(data);
            }
        }).catch(error=>{
            if(failure){
                failure(error);
            }else{
                if(error.response){
                    var status = error.response.status;
                    if(status === 404){
                        status404();
                    }else if(status === 500){
                        status500();
                    }
                }else{
                    status500('找不到服务器');
                }
            }
        });
    },
    get(url,params,succeed,failure){
        service.get(url,{params:params}).then((data) =>{
            if(data.code === AppKey.code.code205){
                layerFn.tokenLogin();
            }else if(data.code === AppKey.code.code401){
                status500(data.msg);
            }else{
                succeed(data);
            }
        }).catch(error=>{
            if(failure){
                failure(error);
            }else{
                if(error.response){
                    var status = error.response.status;
                    if(status === 404){
                        status404();
                    }else if(status === 500){
                        status500();
                    }
                }else{
                    status500('找不到服务器');
                }
            }
        });
    }
}
function status404(){
    layerFn.alert("访问的url不存在,你可以试试<a href='http://www.yinlz.com' target='_blank'>引路者</a>解决找不到网页问题",199);
}
function status500(msg){
    msg = (msg == null || msg.length <= 0) ? '系统出现错误' : msg;
    layerFn.alert(msg,204);
}
export default httpReq;
