import { Tabs, Form } from "ant-design-vue"
import { KEditorAttrsProps } from "../props"
import { formConfig } from "../utils/editor.default"
import { mergeProps2form, commonKeys } from "../utils/util"
import components from "~/utils/components"
import KFormList from "~/form"

export default{
  name: "k-editor-attrs",
  props: KEditorAttrsProps,
  inject: ['focus', 'editor'],
  data(){
    return {
      tab: 'global', // component/global
    }
  },
  computed: {
    focusKey(){
      return this.focus()
    },
    hasFocus(){
      return Boolean(this.focusKey)
    }
  },
  watch: {
    hasFocus(v){
      this.tab = v ? 'component' : 'global'
    }
  },
  methods: {
    handleChange(tab){
      this.tab = tab
    },
    getFormListByKey(){
      const item = this.editor.getFormKeyItem(this.focus())
      if(!item) return []
      const target = components.find(v => v.name === item.type)
      return mergeProps2form(item, Form.Item.props, target.props)
    },
    // 表单的属性变动
    handleFormChange(data){
      const values = {}
      if('layout' in data){
        if(data.layout === 'vertical'){
          values.labelCol = 24
          values.wrapperCol = 24
        }else{
          values.labelCol = 4
          values.wrapperCol = 18
        }
        this.$refs.global.setFieldsValue(values)
      }
      this.$emit('change', { ...data, ...values })
    },
    // 组件变动
    handleComponentChange(data){
      const temp = {
        key: this.focus(),
        data
      }
      const active = Object.keys(data)[0]
      if(!commonKeys.includes(active)) temp.type = 'props'
      console.log('handleComponentChange', temp)
      this.$emit('componentChange', temp)
    }
  },
  render(){
    const {
      tab, hasFocus, focusKey, handleChange,
      handleFormChange, handleComponentChange,
      getFormListByKey
    } = this
    const formOtherConfig = {
      layoutCol: 24,
      labelCol: 24,
      wrapperCol: 24,
      formGap: 10,
      showSubmit: false
    }
    // 动态生成表单
    const formList = getFormListByKey()
    return(
      <div class="k-editor-attrs">
        <Tabs type="card" size="small" activeKey={tab} onChange={handleChange}>
          {/* 组件配置 */}
          {
            hasFocus ? (
              <Tabs.TabPane key="component" tab="组件配置">
                <div class="k-editor-attrs-form-box">
                  <KFormList
                    ref="component"
                    key={focusKey}
                    form-list={formList}
                    { ...{ props: formOtherConfig } }
                    onChange={handleComponentChange}
                  />
                </div>
              </Tabs.TabPane>
            ) : null
          }
          {/* 表单配置 */}
          <Tabs.TabPane key="global" tab="表单配置" forceRender>
            <div class="k-editor-attrs-form-box">
              <KFormList
                ref="global"
                form-list={formConfig}
                { ...{ props: formOtherConfig } }
                onChange={handleFormChange}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}