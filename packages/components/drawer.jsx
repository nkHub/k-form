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
  props: mergeProps(Drawer.props, {
    formList: {
      type: Array,
      default() {
        return [];
      },
    },
  }, ["visible"]),
  data(){
    return {
      visible: true
    }
  },
  methods: {
    handleSubmit(){
      this.$emit('submit', this.$refs.form, this.handleCancel)
    },
    handleCancel(){
      this.visible = false
    },
    afterChange(visible){
      if(!visible){
        this.$emit('close')
      }
    }
  },
  render(){
    const { title, formList, width, visible, handleSubmit, handleCancel, afterChange } = this
    return (
      <Drawer
        title={title}
        width={width}
        destroyOnClose={true}
        visible={visible}
        onClose={handleCancel}
        afterVisibleChange={afterChange}
      >
        <KFormList ref="form" form-list={formList} onSubmit={handleSubmit}/>
      </Drawer>
    )
  }
}