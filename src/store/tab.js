export default {
    state : {
        tabsList : [
            {
                url : '/welcome',
                name : '欢迎页'
            }
        ]
    },
    /*mutations [异步]处理菜单数据的功能,也就是使用vuex保存数据再通过vuex把数据传播出去*/
    mutations : {
        selectMenu(state,provider){
            if(provider.url !== '/welcome'){
                let result = state.tabsList.findIndex(item => item.url === provider.url);
                if(result === -1){
                    state.tabsList.push(provider);
                }
            }
        },
        closeTab(state,provider){
            let result = state.tabsList.findIndex(item => item.url === provider.url);
            state.tabsList.splice(result,1);
        },
        /*清除菜单,用于退出登录或防止二次登录*/
        clearMenu (state){
            sessionStorage.clear();
            state.tabsList = [{url : '/welcome',name : '欢迎页'}]
        }
    },
    actions: {}
}
