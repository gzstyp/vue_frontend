import service from './service.js';
const httpReq = {
    post(url,params,succeed,failure){
        service.post(url,params).then(data =>{
            succeed(data);
        }).catch(error=>{
            failure(error);
        });
    }
}
export default httpReq;
