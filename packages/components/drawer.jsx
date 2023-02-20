import Vue from "vue";
import { Drawer } from "ant-design-vue";
import { mergeDefaultProps, getPropsData } from "~/utils/util";
import KFormList from "~/form";

Vue.use(Drawer);
export default {
  name: "KFormDrawer",
  components: {
    Drawer,
  },
  props: mergeDefaultProps(Drawer.props, KFormList.props, ['destoryOnClose']),
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
    const { handleSubmit, handleCancel } = this;
    const drawerProps = getPropsData(Drawer.props, that, {
      destoryOnClose: true
    });
    const formProps = getPropsData(KFormList.props, that);
    return (
      <Drawer {...{ props: drawerProps }} onClose={handleCancel}>
        <KFormList
          ref="form"
          {...{ props: formProps }}
          onSubmit={handleSubmit}
        />
      </Drawer>
    );
  },
};
