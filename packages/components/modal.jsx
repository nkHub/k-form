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
  props: mergeProps(Modal.props, KFormList.props, ['destoryOnClose', 'parentContext']),
  methods: {
    handleSubmit() {
      this.$emit("submit", this.$refs.form, this.handleCancel);
    },
    handleCancel() {
      this.$emit("update:visible", false);
    },
  },
  render() {
    const that = this;
    const { handleSubmit, handleCancel } = that;
    const modalProps = {}, formProps = {};
    for (let k in Modal.props) {
      modalProps[k] = that[k];
    }
    for (let k in KFormList.props) {
      formProps[k] = that[k];
    }
    modalProps.parentContext = that;
    modalProps.destoryOnClose = true
    formProps.showSubmit = false;
    return (
      <Modal
        {...{ props: modalProps }}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <KFormList ref="form" {...{ props: formProps }} />
      </Modal>
    );
  },
};
