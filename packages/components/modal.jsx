import Vue from "vue";
import { Modal } from "ant-design-vue";
import { mergeDefaultProps, getPropsData } from "~/utils/util";
import KFormList from "~/form";

Vue.use(Modal);
export default {
  name: "KFormModal",
  components: {
    Modal,
  },
  props: mergeDefaultProps(Modal.props, KFormList.props, ['destoryOnClose', 'parentContext']),
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
    const modalProps = getPropsData(Modal.props, that, {
      parentContext: that,
      destoryOnClose: true
    });
    const formProps = getPropsData(KFormList.props, that, {
      showSubmit: false
    });
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
