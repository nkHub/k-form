import Vue from "vue";
import { Modal } from "ant-design-vue";
import { mergeProps } from "~/utils/util";
import KFormList from "~/form";

Vue.use(Modal);
export default {
  name: "KFormModal",
  components: {
    Modal,
  },
  props: mergeProps(Modal.props, KFormList.props),
  methods: {
    handleSubmit() {
      this.$emit("submit", this.$refs.form, this.handleCancel);
    },
    handleCancel() {
      this.$emit('update:visible', false)
    }
  },
  render() {
    const {
      title,
      formList,
      visible,
      handleSubmit,
      handleCancel,
    } = this;
    return (
      <Modal
        title={title}
        destroyOnClose={true}
        visible={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <KFormList ref="form" form-list={formList} show-submit={false} />
      </Modal>
    );
  },
};
