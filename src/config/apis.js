var baseApi = 'http://192.168.3.108:901/';
const api = {
    user : {
        add : baseApi + 'user/add',
        edit : baseApi + 'user/edit',
        login : baseApi + 'login'
    },
    role : {
        add : baseApi + 'role/add',
        edit : baseApi + 'role/edit',
        listData : baseApi + 'role/listData',
        delById : baseApi + 'role/delById'
    }
}
export default api;
