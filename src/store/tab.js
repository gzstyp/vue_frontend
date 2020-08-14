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
        closeTab(state,provider){
            let result = state.tabsList.findIndex(item => item.url === provider.url);
            state.tabsList.splice(result,1);
        },
        /*保存菜单数据,用于页面刷新重新获取数据*/
        setMenu (state,provider){
            state.menu = provider;
            sessionStorage.removeItem('menus');
            sessionStorage.setItem('menus',JSON.stringify(provider));//序列化,使用sessionStorage获取或保存是防止用户页面刷新而导致数据丢失
        },
        /*清除菜单,用于退出登录或防止二次登录*/
        clearMenu (state){
            state.menu = [];
            sessionStorage.removeItem('menus');
            sessionStorage.clear();
        }
    },
    actions: {}
}
