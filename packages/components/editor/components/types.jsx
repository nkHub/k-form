import { Row, Col } from "ant-design-vue";
import Sortable from "sortablejs";

export default {
  name: 'k-editor-types',
  props: {
    data: {
      type: Object
    }
  },
  mounted(){
    const that = this
    const { name } = this.data || {}
    // 拖拽管理
    const typeList = this.$el.querySelector('.type-list')
    this.$st = new Sortable(typeList, {
      group: {
        name: 'types-' + name,
        pull: 'clone',
        put: false
      },
      sort: false,
      setData(dataTransfer, dragEl){
        const type = dragEl.dataset.type
        const item = that.data.children.find(v => v.type === type)
        dataTransfer.setData('type', JSON.stringify(item))
      },
      draggable: '.type-item-drag',
      animation: 150
    })
  },
  beforeDestroy(){
    if(this.$st) this.$st.destroy()
  },
  render(){
    const { data } = this
    const handleTap = c => this.$emit('tap', c)
    return (
      <div>
        <div class="type-name">{data.name}</div>
        <Row class="type-list" gutter={[6, 6]}>
          {
            data.children.map((c) => (
              <Col span={12} class="type-item-drag" data-type={c.type}>
                <div class="type-item" onClick={() => handleTap(c)}>{c.name}</div>
              </Col>
            ))
          }
        </Row>
      </div>
    )
  }
}