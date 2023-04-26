import { Space, Button } from "ant-design-vue";
import { KEditorRenderProps } from "../props";
import KEditorDragger from './dragger';
import KFormList from "~/form";
import Sortable from "sortablejs";

export default{
  name: "k-editor-render",
  props: KEditorRenderProps,
  inject: ['editor'],
  methods: {
    // 清空选中
    handleSelect(e){
      const isSelf = e.target.classList.contains('k-editor-render-form')
      if(isSelf) this.editor.handleFocus('')
    },
    handleEditor(key){
      const type = key[0].toUpperCase() + key.slice(1)
      this.editor[`handle${type}`]()
    },
    // 初始化可拖拽
    initSortableObj(){
      // 拖拽管理
      const that = this
      if(this.$st) this.$st.destroy()
      const row = this.$refs.form.querySelector('.k-form-list>.ant-row')
      this.$st = new Sortable(row, {
        group: {
          name: 'render',
          put: true
        },
        handle: '.k-editor-dragger-item-drag',
        draggable: '.k-editor-dragger-item',
        ghostClass: '.hide',
        animation: 150,
        onAdd(evt){
          const { dataTransfer } = evt.originalEvent
          const item = JSON.parse(dataTransfer.getData('type'))
          evt.item.parentNode.removeChild(evt.item)
          dataTransfer.clearData()
          that.editor.handleAdd(item)
        },
        onEnd(evt){
          const { oldIndex, newIndex } = evt
          that.editor.handleMove(oldIndex, newIndex)
        }
      })
    }
  },
  watch: {
    formList: {
      handler(){
        // 拖拽管理
        this.$nextTick(() => {
          this.initSortableObj()
        })
      },
      immediate: true
    }
  },
  beforeDestroy(){
    if(this.$st) this.$st.destroy()
  },
  render(){
    const { handleSelect, handleEditor } = this
    const { propsData } = this.$options
    const temp = { ...propsData, showSubmit: false }
    // 手动处理渲染部分拖拽
    if(Array.isArray(propsData.formList)){
      temp.formList = temp.formList.map(v => {
        return {
          ...v,
          customOutterRender: (item, props, baseRender) => {
            return (
              <KEditorDragger formKey={item.id} outter={props}>
                {baseRender(item)}
              </KEditorDragger>
            )
          }
        }
      })
    }
    const isEmpty = temp.formList.length == 0
    return(
      <div class={ 'k-editor-render ' + (isEmpty ? 'empty' : '') }>
        <div class="k-editor-render-btns">
          <Space align="end">
            <Button type="primary" onClick={() => handleEditor('preview')}>预览</Button>
            <Button type="danger" onClick={() => handleEditor('clear')}>清空</Button>
            <Button onClick={() => handleEditor('import')}>导入</Button>
            <Button type="primary" onClick={() => handleEditor('export')}>导出Schema</Button>
          </Space>
        </div>
        <div ref="form" class="k-editor-render-form" onClick={handleSelect}>
          <KFormList { ...{ props: temp } }/>
        </div>
      </div>
    )
  }
}