import { config } from "./utils/editor.default";
import KFormList from '~/form'
// 编辑器props
export const KEditorProps = {
  height: {
    type: String|Number,
    default: '100%'
  }
}
// 渲染组件props
export const KEditorRenderProps = {
  ...KFormList.props
}
// 拖拽组件props
export const KEditorDraggerProps = {
  formKey: {
    type: String,
    default: ''
  },
  outter: {
    type: Object,
    default(){
      return {}
    }
  }
}

// 属性编辑props
export const KEditorAttrsProps = {
  instance: {
    type: Object,
    default(){
      return null
    },
  },
  config: {
    type: Object,
    default(){
      return {
        ...config
      }
    },
  },
}