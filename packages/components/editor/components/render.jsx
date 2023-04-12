import { Space, Button } from "ant-design-vue";
import { KEditorRenderProps } from "../props";
import KEditorDragger from './dragger';
import KFormList from "~/form";


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
    }
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
    console.log('render', temp.formList)
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
        <div class="k-editor-render-form" onClick={handleSelect}>
          <KFormList { ...{ props: temp } }/>
        </div>
      </div>
    )
  }
}