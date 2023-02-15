import Vue from 'vue'
import 'ant-design-vue/dist/antd.less'
import KFormList from '~'
import App from './app.vue'

Vue.config.productionTip = false

Vue.use(KFormList)

new Vue({
  render: h => h(App),
}).$mount('#app')
