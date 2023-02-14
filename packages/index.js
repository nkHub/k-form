import FormList from './form'
import { KUpload, KYearPicker } from './components'

FormList.install = function (Vue) {
  Vue.component(FormList.name, FormList)
  Vue.component(KUpload.name, KUpload)
  Vue.component(KYearPicker.name, KYearPicker)
}
export default FormList