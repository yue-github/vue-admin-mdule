// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import '../public/awe/css/font-awesome.min.css'
import axios from 'axios'
import qs from 'qs'
axios.defaults.headers.post['Content-type'] = 'application/json'
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
// post请求
Vue.prototype.$post = function (api, data) {
  // 後端缺陷，登陸不能携帶accessToken
  if (api !== 'login') data.accessToken = localStorage.accessToken ? localStorage.accessToken : ''
  var ox = axios.post('/apis/' + api, data)
  return ox
}
// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')
Vue.prototype.baseUrl = 'http://data-visualization.bayou-tech.cn/web/';
//上传跨域问题
// Vue.prototype.$upload = function (url, q){
//   let Fromdata=new FormData()
//   Fromdata.append('file',q.file)
//   // console.log(q.file);
//   let config = {
//       headers:{
//           'Content-Type' : 'multipart/form-data'
//       }
//   }
//   // console.log(Fromdata);
//   // console.log(url);
//   let upload = axios.post(url, Fromdata, config)
//   return upload
// }
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
