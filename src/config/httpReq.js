import service from './service.js';
const httpReq = {
    post(url,params,succeed,failure){
        service.post(url,params).then((data) =>{
            succeed(data);
        }).catch(error=>{
            if(error.response){
                var status = error.response.status;
                if(status === 404){
                    console.info('请求的url不存在');
                }else if(status === 500){
                    console.info('系统出现错误');
                }
            }else{
                console.info('找不到服务器');
            }
            failure(error);
        });
    },
    get(url,params,succeed,failure){
        service.get(url,{params:params}).then((data) =>{
            succeed(data);
        }).catch(error=>{
            if(error.response){
                var status = error.response.status;
                if(status === 404){
                    console.info('请求的url不存在');
                }else if(status === 500){
                    console.info('系统出现错误');
                }
            }else{
                console.info('找不到服务器');
            }
            failure(error);
        });
    }
}
export default httpReq;
