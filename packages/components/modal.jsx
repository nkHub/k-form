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
  props: mergeProps(
    Modal.props,
    {
      formList: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    ["visible"]
  ),
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.$refs.form, this.handleCancel);
    },
    handleCancel() {
      this.visible = false;
    },
    afterModalClose() {
      this.$emit("close");
    },
  },
  render() {
    const {
      title,
      formList,
      visible,
      handleSubmit,
      handleCancel,
      afterModalClose,
    } = this;
    return (
      <Modal
        title={title}
        destroyOnClose={true}
        visible={visible}
        afterClose={afterModalClose}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <KFormList ref="form" form-list={formList} show-submit={false} />
      </Modal>
    );
  },
};
