import { Select } from "ant-design-vue";
import { mergeDefaultProps, getPropsData } from "~/utils/util";
// const ITEM_ELEMENT_NUMBER = 30;
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
      default: 50
    }
  }),
  data() {
    return {
      scrollTop: 0,
      fix: 0
    };
  },
  mounted() {
    const that = this;
    that.$once("destory", function () {
      that.removeListener();
    });
  },
  computed: {
    ITEM_HEIGHT() {
      const { size } = this;
      return ITEM_HEIGHT_CFG[size || "default"];
    },
    optionList() {
      return this.options;
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
      this.fix = parseInt(e.target.scrollTop % this.ITEM_HEIGHT)
      this.$emit('popupScroll', e)
    },
    getStartAndEndIndex() {
      const { scrollTop, ITEM_HEIGHT, buffer } = this
      const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - buffer);
      const endIndex = startIndex + Math.floor(DROPDOWN_HEIGHT / ITEM_HEIGHT) + 30 + buffer;
      return { startIndex, endIndex };
    },
    // 列表渲染
    renderList(nodes) {
      const that = this
      const { ITEM_HEIGHT } = this;
      const { startIndex, endIndex } = this.getStartAndEndIndex();
      const { propsData: props } = nodes.componentOptions;
      // 渲染列表
      const menuItems = props.menuItems
        .slice(startIndex, endIndex)
        .map((v, i) => {
          const index = (startIndex || 0) + Number(i);
          v.data.style = Object.assign({}, v.data.style, {
            position: "absolute",
            top: ITEM_HEIGHT * index + "px",
            height: ITEM_HEIGHT + "px",
            width: "100%",
            transition: '0.16s'
          });
          if (v.key === "NOT_FOUND") {
            delete v.data.style.height;
          }
          return v;
        });
      nodes.componentOptions.propsData.menuItems = menuItems;
      // 获取滚动盒子
      that.$nextTick(function(){
        const dropdown = nodes.context.dropdownMenuRef
        that.scrollEl = dropdown && dropdown.$el.parentNode
        that.addListener()
      })
      return nodes;
    },
  },
  render() {
    const that = this;
    const {
      scrollClass,
      dropdownClassName,
      renderList,
      optionList,
      ITEM_HEIGHT,
      dropdownStyle,
      dropdownMenuStyle
    } = this;
    const height = optionList.length * ITEM_HEIGHT || 100;
    const props = getPropsData(Select.props, this, {
      dropdownClassName: `${scrollClass} ${dropdownClassName || ""}`,
      dropdownRender: renderList,
      dropdownStyle: {
        ...dropdownStyle,
        maxHeight: `${DROPDOWN_HEIGHT}px`,
        overflow: "auto"
      },
      dropdownMenuStyle: {
        ...dropdownMenuStyle,
        position: "relative",
        height: height + "px",
        maxHeight: height + "px",
        overflow: "hidden",
      },
      // open: true
    });
    const on = {
      change(e) {
        that.$emit("change", e);
      },
    };
    return <Select {...{ props, on }}></Select>;
  },
};
