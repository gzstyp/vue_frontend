const api = {
    user : {
        add : urlPrefix + 'user/add',
        edit : urlPrefix + 'user/edit',
        login : urlPrefix + 'login'
    },
    role : {
        add : urlPrefix + 'role/add',
        edit : urlPrefix + 'role/edit',
        listData : urlPrefix + 'role/listData',
        delById : urlPrefix + 'role/delById'
    }
}
export default api;