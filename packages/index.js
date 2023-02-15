import { KUpload, KYearPicker, KFormModal, KFormDrawer } from './components'
import FormList from './form'
// 版本
const version = '1.0.0'
const preview = {}

preview.instance = (Vue, options) => {
  // 节点创建
  let previewEle = document.querySelector('body>div[type=form]')
  if (!previewEle) {
    previewEle = document.createElement('div')
    previewEle.setAttribute('type', 'form')
    previewEle.classList.add('form-wrapper')
    document.body.appendChild(previewEle)
  }
  const props = Object.assign({
    visible: false,
    type: 'modal',
    title: '',
    formList: [],
    width: '500px'
  }, options)
  const instance = new Vue({
    data() {
      return {
        ...props
      }
    },
    methods: {
      handleClose() {
        this.visible = false;
      },
      handleSubmit(){
        console.log('handleSubmit', arguments)
      }
    },
    render() {
      const { formList, title, type, width, handleClose, handleSubmit } = this;
      if (this.visible && ['modal', 'drawer'].includes(type)) {
        if (type === 'modal') {
          return (
            <KFormModal
              title={title}
              width={width}
              formList={formList}
              onclose={handleClose}
              onsubmit={handleSubmit}
            />
          )
        } else {
          return (
            <KFormDrawer
              title={title}
              width={width}
              formList={formList}
              onclose={handleClose}
              onsubmit={handleSubmit}
            />
          )
        }
      } else {
        return null
      }
    }
  }).$mount(previewEle)

  function update(config) {
    const { visible, formList, title, type, width } = { ...props, ...config }
    instance.$set(instance, 'type', type)
    instance.$set(instance, 'title', title)
    instance.$set(instance, 'width', width)
    instance.$set(instance, 'visible', visible)
    instance.$set(instance, 'formList', formList)
  }

  return {
    instance,
    update
  }
}

const api = {
  show: function (config) {
    this.instance.update({ visible: true, ...config })
  },
  hide: function () {
    this.instance.update({ visible: false })
  }
}

const install = function (Vue, options) {
  if (install.installed) return;
  install.installed = true
  api.instance = preview.instance(Vue, options)
  Vue.prototype.$kform = api
  // 组件注册
  Vue.component(FormList.name, FormList)
  Vue.component(KUpload.name, KUpload)
  Vue.component(KYearPicker.name, KYearPicker)
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