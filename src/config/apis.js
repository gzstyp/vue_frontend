import appBase from './app.base.js';
const api = {
    user : {
        add : appBase.baseApi + 'user/add',
        edit : appBase.baseApi + 'user/edit',
        login : appBase.baseApi + 'login'
    },
    role : {
        add : appBase.baseApi + 'role/add',
        edit : appBase.baseApi + 'role/edit',
        listData : appBase.baseApi + 'role/listData',
        delById : appBase.baseApi + 'role/delById'
    }
}
export default api;
