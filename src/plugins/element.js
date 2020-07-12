import Vue from 'vue';
import { Button } from 'element-ui';/* 大括号表示按需导入 */
import {Form,FormItem,Input,Container,Header,Aside,Main,Footer,Row,Col,Message,Menu,Submenu,MenuItem,MenuItemGroup,Card} from 'element-ui';/* 大括号表示按需导入 */
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Card);
Vue.prototype.$message = Message;/*this.$message.info();*/
