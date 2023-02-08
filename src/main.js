import Vue from 'vue'
import store from './store'
import { Button, Message, Row, Col, Container, Main, Header, Aside, Input } from 'element-ui'
import { Table, TableColumn, Dialog, Form, FormItem, Tooltip, Checkbox } from 'element-ui'
import router from './router'
import App from './App.vue'
import '../theme/index.css'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Table)
Vue.use(Input)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tooltip)
Vue.use(Checkbox)
Vue.prototype.$message = Message;
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
