// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import moment from 'moment'
import qs from 'qs'
import VCharts from 'v-charts'
import _ from 'lodash'
import store from './store/index'
import com from './assets/common'
import constant from './assets/constant'
import rules from './assets/rules'
import './assets/filter'
import 'v-charts/lib/style.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'



Vue.prototype.$loadsh = _
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment
Vue.prototype.$com = com
Vue.prototype.$qs = qs
Vue.prototype.$constant = constant
Vue.prototype.$rules = rules
Vue.use(VCharts)
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
