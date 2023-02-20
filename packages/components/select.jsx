import { Select } from "ant-design-vue";
import { mergeDefaultProps, getPropsData } from "~/utils/util";

const ITEM_HEIGHT_CFG = {
  small: 24,
  large: 40,
  default: 32,
};
const DROPDOWN_HEIGHT = 224;

export default {
  name: "KSelect",
  model: {
    prop: "value",
    event: "change",
  },
  props: mergeDefaultProps(Select.props, {
    buffer: {
      type: Number,
      default: 50,
    },
  }),
  data() {
    return {
      val: undefined,
      scrollTop: 0,
      timer: null,
      scrollEl: null,
    };
  },
  mounted() {
    const that = this;
    that.$once("destory", function () {
      that.removeListener();
    });
  },
  watch: {
    value: {
      handler(v) {
        this.val = v;
      },
      immediate: true,
    },
  },
  computed: {
    ITEM_HEIGHT() {
      const { size } = this;
      return ITEM_HEIGHT_CFG[size || "default"];
    },
    optionList() {
      return this.options;
    },
    enable() {
      return this.optionList.length > 200;
    },
  },
  methods: {
    // 添加滚动监听
    addListener() {
      if (!this.scrollEl) return;
      this.scrollEl.addEventListener("scroll", this.scroll, false);
    },
    removeListener() {
      if (this.scrollEl) return;
      this.scrollEl.removeListener("scroll", this.scroll);
    },
    // 滚动监听
    scroll(e) {
      this.scrollTop = e.target.scrollTop;
      this.$emit("popupScroll", e);
    },
    getStartAndEndIndex() {
      const { scrollTop, ITEM_HEIGHT, buffer } = this;
      const start = Math.floor(scrollTop / ITEM_HEIGHT);
      const startIndex = Math.max(0, start - buffer);
      const endIndex =
        start + Math.ceil(DROPDOWN_HEIGHT / ITEM_HEIGHT) + buffer;
      return { startIndex, endIndex };
    },
    // 列表渲染
    renderList(nodes, startIndex, endIndex) {
      const that = this;
      const { ITEM_HEIGHT } = this;
      const { propsData: props } = nodes.componentOptions;
      const menuItems = props.menuItems
        .slice(startIndex, endIndex)
        .map((v, i) => {
          const index = (startIndex || 0) + Number(i);
          v.data.style = Object.assign({}, v.data.style, {
            position: "absolute",
            top: ITEM_HEIGHT * index + "px",
            height: ITEM_HEIGHT + "px",
            width: "100%",
            transition: "0.16s",
          });
          if (v.key === "NOT_FOUND") {
            delete v.data.style.height;
          }
          return v;
        });
      nodes.componentOptions.propsData.menuItems = menuItems;
      // 获取滚动盒子
      if (!that.scrollEl) {
        that.$nextTick(function () {
          const dropdown = nodes.context.dropdownMenuRef;
          that.scrollEl = dropdown && dropdown.$el.parentNode;
          that.addListener();
        });
      }
      return nodes;
    },
  },
  render() {
    const that = this;
    const {
      val,
      enable,
      renderList,
      optionList,
      ITEM_HEIGHT,
      dropdownStyle,
      dropdownMenuStyle,
    } = this;
    const { startIndex, endIndex } = this.getStartAndEndIndex();
    const height = optionList.length * ITEM_HEIGHT || 100;
    const recycleProps = enable
      ? {
          dropdownRender(nodes) {
            return renderList(nodes, startIndex, endIndex);
          },
          dropdownStyle: {
            ...dropdownStyle,
            maxHeight: `${DROPDOWN_HEIGHT}px`,
            overflowY: "scroll",
          },
          dropdownMenuStyle: {
            ...dropdownMenuStyle,
            position: "relative",
            height: height + "px",
            maxHeight: height + "px",
            overflow: "hidden",
            transform: "translate3d(0,0,0)",
          },
          // open: true
        }
      : {};
    const props = {
      ...getPropsData(Select.props, this, recycleProps),
      value: val,
    };
    const on = {
      change: (e) => {
        that.val = e;
        that.$emit("change", e);
      },
      deselect: (e) => that.$emit("deselect", e),
      blur: (e) => that.$emit("blur", e),
      focus: (e) => that.$emit("focus", e),
      inputKeydown: (e) => that.$emit("inputKeydown", e),
      mouseenter: (e) => that.$emit("mouseenter", e),
      mouseleave: (e) => that.$emit("mouseleave", e),
      dropdownVisibleChange: (e) => that.$emit("dropdownVisibleChange", e),
      search: (e) => that.$emit("search", e),
      select: (e) => {
        that.$emit("select", e)
        // 未知原因导致单选隐藏失效
        if(!['multiple','tag'].includes(props.mode)){
          that.$refs.select.blur()
        }
      },
    };
    return <Select ref="select" {...{ props, on }}></Select>;
  },
};
