export default {
    state : {
        menu : [],
        currentMenu : {},
        tabsList : [
            {
                url : '/welcome',
                name : '首页'
            }
        ]
    },
    /*mutations [异步]处理菜单数据的功能,也就是使用vuex保存数据再通过vuex把数据传播出去*/
    mutations : {
        selectMenu(state,provider){
            if(provider.url !== '/welcome'){
                state.currentMenu = provider;
                let result = state.tabsList.findIndex(item => item.url === provider.url);
                if(result === -1){
                    state.tabsList.push(provider);
                }
            }else{
                state.currentMenu = {};
            }
        },
        refreshPage(state){
            state.tabsList = [{url : '/welcome',name : '首页'}];//刷新时加载首页
        },
        closeTab(state,provider){
            let result = state.tabsList.findIndex(item => item.url === provider.url);
            state.tabsList.splice(result,1);
        },
        /*清除菜单,用于退出登录或防止二次登录*/
        clearMenu (state){
            state.menu = [];
            sessionStorage.clear();
        }
    },
    actions: {}
}
