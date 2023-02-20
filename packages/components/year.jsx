import { DatePicker } from "ant-design-vue";
import { mergeDefaultProps } from "~/utils/util";

export default {
  name: "KYearPicker",
  model: {
    prop: "value",
    event: "panelChange",
  },
  props: mergeDefaultProps(DatePicker.props, {}, ["open", "mode"]),
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleVisible() {
      this.isOpen = !this.isOpen;
    },
    panelChange(value) {
      const { valueFormat } = this
      this.$emit("panelChange", value && (valueFormat ? value.format(valueFormat): value));
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
