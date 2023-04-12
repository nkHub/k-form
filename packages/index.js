import { KUpload, KYearPicker, KSelect, KEditor, KFormModal, KFormDrawer } from './components'
import FormList from './form'
// 版本
const version = '1.0.0'

const install = function (Vue) {
  if (install.installed) return;
  install.installed = true
  // 组件注册
  Vue.component(FormList.name, FormList)
  Vue.component(KUpload.name, KUpload)
  Vue.component(KSelect.name, KSelect)
  Vue.component(KYearPicker.name, KYearPicker)
  Vue.component(KEditor.name, KEditor)
  Vue.component(KFormModal.name, KFormModal)
  Vue.component(KFormDrawer.name, KFormDrawer)
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  version,
  FormList,
  KUpload,
  KYearPicker
}