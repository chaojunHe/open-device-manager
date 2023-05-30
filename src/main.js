import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Search, Button, Popup, RadioGroup, Radio, Row, Col, Form, Field, Toast, Icon } from 'vant'
Vue.use(Search)
Vue.use(Button)
Vue.use(Popup)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
