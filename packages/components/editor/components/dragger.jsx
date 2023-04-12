import { Col, Space, Icon } from "ant-design-vue";
import { KEditorDraggerProps } from "../props";

export default {
  name: "k-editor-dragger",
  props: KEditorDraggerProps,
  inject: ['focus', 'editor'],
  computed: {
    selected(){
      return this.focus() === this.formKey
    }
  },
  methods: {
    // 选中操作
    handleSelect(e){
      e.stopPropagation()
      const { formKey } = this
      // 设置焦点key, provide不会自动更新
      // const focus = this.editor.focus
      // const update = focus === formKey ? '' : formKey
      this.editor.handleFocus(formKey)
    },
    // 删除操作
    handleDelete(e){
      e.preventDefault()
      e.stopPropagation()
      this.editor.handleDelete(this.formKey)
    },
    // 复制操作
    handleCopy(e){
      e.preventDefault()
      e.stopPropagation()
      this.editor.handleCopy(this.formKey)
    }
  },
  render(){
    const { handleSelect, handleDelete, handleCopy, selected } = this
    const { class: className, key, span } = this.outter
    className['k-editor-dragger-item'] = true
    className['active'] = selected
    return (
      <Col span={span} key={key} class={className} onClick={handleSelect}>
        <Icon class="k-editor-dragger-item-drag" type="drag" />
        <span class="k-editor-dragger-item-key">{key}</span>
        {this.$slots.default}
        <Space size={10} class="k-editor-dragger-item-tool">
          <Icon type="delete" onClick={handleDelete}/>
          <Icon type="copy" onClick={handleCopy}/>
        </Space>
      </Col>
    )
  }
}