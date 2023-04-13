import { DatePicker } from "ant-design-vue";
import { mergeDefaultProps } from "~/utils/util";

export default {
  name: "KYearPicker",
  model: {
    prop: "value",
    event: "change",
  },
  props: mergeDefaultProps(DatePicker.props, {}, ["open", "mode"]),
  data() {
    return {
      isOpen: false,
    };
  },
  watch: {
    value(v){
      console.log('value', v)
    }
  },
  methods: {
    toggleVisible() {
      this.isOpen = !this.isOpen;
    },
    panelChange() {
      this.$emit("change", ...arguments);
      this.toggleVisible();
    },
    visibleChange(visible) {
      if (visible) return;
      this.isOpen = visible;
    },
  },
  render() {
    const { isOpen, toggleVisible, panelChange, visibleChange } = this;
    const props = {
      ...this.$options.propsData,
      open: isOpen,
      mode: "year"
    };
    return (
      <DatePicker
        {...{ props, scopedSlots: this.$scopedSlots }}
        nativeOnClick={toggleVisible}
        onpanelChange={panelChange}
        onopenChange={visibleChange}
      />
    );
  },
};
