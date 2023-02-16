import Vue from "vue";
import { Drawer } from "ant-design-vue";
import { mergeProps } from "~/utils/util";
import KFormList from "~/form";

Vue.use(Drawer);
export default {
  name: "KFormDrawer",
  components: {
    Drawer,
  },
  props: mergeProps(Drawer.props, KFormList.props, ['destoryOnClose']),
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
    const drawerProps = {}, formProps = {};
    for (let k in Drawer.props) {
      drawerProps[k] = that[k];
    }
    for (let k in KFormList.props) {
      formProps[k] = that[k];
    }
    drawerProps.destoryOnClose = true
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
