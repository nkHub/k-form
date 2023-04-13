import { Row, Col } from "ant-design-vue";
import KEditorRender from './components/render';
import KEditorAttrs from './components/attrs';
import { types, config, form } from "./utils/editor.default";
import { KEditorProps } from "./props";
import { clone, getRandomStr } from "./utils/util";
import "./styles/index.less";

export default {
  name: "KEditor",
  props: KEditorProps,
  data() {
    return {
      focus: '',
      form: [ ...form ],
      config: { ...config }
    };
  },
  // 向子组件暴露：焦点表单、表单实例和编辑器实例
  provide(){
    return {
      focus: () => this.focus,
      form: this.form,
      editor: this
    }
  },
  methods: {
    // 渲染可选择的表单列表
    renderTypes() {
      const { handleAdd } = this
      return types.map((v) => {
        return [
          <div class="type-name">{v.name}</div>,
          <Row class="type-list" gutter={[6, 6]}>
            {v.children.map((c) => (
              <Col span={12}>
                <div class="type-item" onClick={() => handleAdd(c)}>{c.name}</div>
              </Col>
            ))}
          </Row>,
        ];
      });
    },
    // 更新表单配置渲染
    handleUpdate(data){
      const tmp = { ...this.config }
      for(let k in data){
        if(data[k] !== ''){
          tmp[k] = data[k]
        }
      }
      this.config = tmp
    },
    // 更新表单组件配置渲染
    handleFormUpdate(values){
      const { key, type, data } = values
      const index = this.form.findIndex(v => v.id === key)
      if(index === -1) return
      // 复制组件
      const copyItem = clone(this.form[index])
      if(!copyItem.props) copyItem.props = {}
      if(!copyItem.rules) copyItem.rules = {}
      const { placeholder } = copyItem.props
      // 是否应该更新其他属性，正常都是单属性更新
      let shouldUpdate = true
      // 默认值的设置
      if('defaultChecked' in data || 'defaultValue' in data){
        const key = 'defaultChecked' in data ? 'defaultChecked' : 'defaultValue'
        const old = data[key]
        delete data[key]
        copyItem.rules.initialValue = old
      }
       // 修改必填
      if('required' in data){
        shouldUpdate = false
        if(!copyItem.rules.rules){
          copyItem.rules.rules = [{ required: data.required }]
        }else{
          copyItem.rules.rules[0].required = data.required
        }
        copyItem.rules.rules[0].message = placeholder
      }
      // 修改默认提示文字
      if('placeholder' in data && copyItem.rules.rules){
        copyItem.rules.rules[0].message = data.placeholder || placeholder
      }
      // 其他属性
      if(shouldUpdate){
        const target = type ? copyItem[type] : copyItem
        // 更新属性覆盖
        for(let k in data){
          target[k] = data[k]
        }
      }
      this.$set(this.form, index, copyItem)
    },
    // 通过focus获取组件
    getFormKeyItem(key){
      return this.form.find(v => v.id === key)
    },
    // 设置焦点实例
    handleFocus(key){
      console.log('handleFocus', key)
      this.focus = key
    },
    // 添加表单
    handleAdd(item){
      const { type, name, config } = item
      const cur = {
        id: getRandomStr(),
        type, label: name,
        ...config
      }
      // 如果已经添加过了这种类型的表单
      const prev = this.form.find(v => v.key === cur.key)
      if(prev){
        if(!cur.origin_key) cur.origin_key = cur.key
        cur.key = getRandomStr(cur.origin_key)
      }
      this.handleFocus(cur.id)
      this.form.push(cur)
    },
    // 删除表单
    handleDelete(key){
      const keyIndex = this.form.findIndex(v => v.id === key)
      const prev = this.form[keyIndex - 1]
      this.handleFocus(prev ? prev.id : '')
      if(keyIndex !== -1) this.form.splice(keyIndex, 1)
    },
    // 复制表单
    handleCopy(key){
      const keyIndex = this.form.findIndex(v => v.id === key)
      const copyItem = clone(this.form[keyIndex])
      copyItem.id = getRandomStr()
      // 设置原始key
      if(!copyItem.origin_key) copyItem.origin_key = copyItem.key
      copyItem.key = getRandomStr(copyItem.origin_key)
      this.handleFocus(copyItem.id)
      this.form.splice(keyIndex + 1, 0, copyItem)
    },
    // 预览表单
    handlePreview(){
      console.log('preview')
    },
    // 清空表单
    handleClear(){
      this.handleFocus('')
      this.form = []
    },
    // 导入表单
    handleImport(){
      console.log('import')
    },
    // 导出表单
    handleExport(){
      const { form, config } = this
      console.log('export', JSON.stringify({ form, config }))
    }
  },
  render() {
    const { height, renderTypes, form, config, handleUpdate, handleFormUpdate } = this;
    // 渲染参数
    const renderProps = { formList: form, ...config }
    console.log('EditorConfig', config)
    return (
      <div class="k-editor" style={{ height }}>
        <Row type="flex" gutter={10}>
          {/* 栏目渲染器 */}
          <Col span={6} class="k-list">
            {renderTypes()}
          </Col>
          {/* 内容渲染器 */}
          <Col span={12} class="k-board">
            <KEditorRender
              key={JSON.stringify(renderProps)}
              { ...{ props: renderProps } }
            />
          </Col>
          {/* 属性渲染器 */}
          <Col span={6} class="k-attrs">
            <KEditorAttrs
              config={config}
              form-list={form}
              onChange={handleUpdate}
              onComponentChange={handleFormUpdate}
            />
          </Col>
        </Row>
      </div>
    );
  },
};
