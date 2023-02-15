import Vue from 'vue'
import { Drawer } from 'ant-design-vue'
import { mergeProps } from '~/utils/util'
import KFormList from '~/form'

Vue.use(Drawer)
export default {
  name: 'KFormDrawer',
  components: {
    Drawer
  },
  props: mergeProps(Drawer.props, KFormList.props),
  methods: {
    handleSubmit(){
      this.$emit('submit', this.$refs.form, this.handleCancel)
    },
    handleCancel(){
      this.$emit('update:visible', false)
    }
  },
  render(){
    const { title, formList, width, visible, handleSubmit, handleCancel } = this
    return (
      <Drawer
        title={title}
        width={width}
        destroyOnClose={true}
        visible={visible}
        onClose={handleCancel}
      >
        <KFormList ref="form" form-list={formList} onSubmit={handleSubmit}/>
      </Drawer>
    )
  }
}