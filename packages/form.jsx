import {
  Icon,
  Form,
  Tooltip,
  Row,
  Col,
  Input,
  InputNumber,
  Select,
  Button,
  Space,
  Checkbox,
  Radio,
  Switch,
  Slider,
  Rate,
  Cascader,
  DatePicker,
  TimePicker,
  TreeSelect
} from "ant-design-vue";
import { assign, getPropsExtends, registerAuto } from "./utils/util";
import { KUpload, KYearPicker } from "./components";
import checkor from "./mixins/checkor";
import "./styles/index.less";

const FormItem = Form.Item;
// 动态表单组件
export default {
  name: "k-form-list",
  mixins: [checkor],
  props: {
    // 表单列表
    formList: {
      type: Array,
      default() {
        return [];
      },
    },
    // 布局方式
    layout: {
      type: String,
      default: "horizontal",
    },
    // 表单项布局宽度
    layoutCol: {
      type: [Number, Object],
      default: 12,
    },
    // 表单项文字布局宽度
    labelCol: {
      type: [Number, Object],
      default: 6,
    },
    // 表单项表单布局宽度
    wrapperCol: {
      type: [Number, Object],
      default: 18,
    },
    // 表单项布局间隔
    formGap: {
      type: Number,
      default: 16,
    },
    // 是否自更新
    selfUpdate: {
      type: Boolean,
      default: true,
    },
    // 显示提交行
    showSubmit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const { onValuesChange } = this;
    return {
      // 匹配项
      items: {},
      // 表单对象
      form: this.$form.createForm(this, {
        name: "form-list",
        onValuesChange,
      }),
      // 自定义错误区
      errors: {},
    };
  },
  created() {
    // 自动加载内置的组件
    const list = [
      Input,
      InputNumber,
      Select,
      Input.TextArea,
      Checkbox.Group,
      Radio.Group,
      Switch,
      Slider,
      Rate,
      TimePicker,
      DatePicker,
      TreeSelect,
      Cascader,
      KUpload,
      KYearPicker,
    ];
    registerAuto(this.register, ...list);
  },
  methods: {
    // 注册组件
    register(component) {
      const render = (item, h) => {
        const props = {
          style: assign(item.style),
          props: getPropsExtends(component.props, item),
          directives: [
            {
              name: "decorator",
              value: [
                item.key,
                {
                  valuePropName: component.model.prop || "value",
                  validateTrigger: component.model.event || "change",
                  ...item.rules,
                },
              ],
            },
          ],
          slots: {},
          ref: `${component.name}-${item.key}`,
        };
        return h(component, props);
      };
      this.$set(this.items, component.name, render);
    },
    // 表单变动
    onValuesChange(props, values) {
      if (values instanceof Object && Object.keys(values).length === 1) {
        this.$emit("change", values);
      }
    },
    // 获取某个字段的值
    getFieldValue(key) {
      return this.form.getFieldValue(key);
    },
    // 设置某个字段的值
    setFieldsValue(data) {
      this.form.setFieldsValue(data);
    },
    // 重置表单
    reset() {
      this.form.resetFields();
    },
    validateFields(callback) {
      this.form.validateFields(callback);
    },
    // 渲染单个表单
    renderItem(item) {
      const { layoutCol, labelCol, wrapperCol, items: formItems } = this;
      const className = {
        hide: item.hide,
      };
      // 标题部分
      const renderTitle = (item) => {
        return (
          <div class="form-title">{item.title}</div>
        );
      };
      // 渲染表单项基础内容
      const renderFormItemBase = (item, content) => {
        // 不显示返回的表单类型
        const excludes = ["input", "number", "textarea", "date"];
        const tipsIconStyle = {
          margin: "0 2px",
        };
        return (
          <FormItem
            label-col={{ span: item.labelCol || labelCol }}
            wrapper-col={{ span: item.wrapperCol || wrapperCol }}
            hasFeedback={excludes.includes(item.type)}
            extra={item.extra}
            help={item.help}
          >
            <span slot="label">
              <span>{item.name}</span>
              {item.tips ? (
                <Tooltip>
                  <Icon style={tipsIconStyle} type="question-circle" />
                  <div slot="title" domPropsInnerHTML={item.tips}></div>
                </Tooltip>
              ) : null}
            </span>

            {/* 自定义内容部分 */}
            {content}
          </FormItem>
        );
      };
      // 渲染通用表单部分
      const renderFormItem = (item) => {
        const h = this.$createElement;
        const content =
          formItems[item.type] && formItems[item.type](item, h, this);
        return renderFormItemBase(item, content);
      };
      // 渲染自定义表单部分
      const renderManual = (item) => {
        const { customRender } = item;
        return renderFormItemBase(
          item,
          typeof customRender === "function" && customRender(item)
        );
      };
      const switchRender = (item) => {
        let row = null;
        switch (item.type) {
          case "block":
            row = renderTitle(item);
            break;
          case "manual":
            row = renderManual(item);
            break;
          default:
            row = renderFormItem(item);
        }
        return row;
      };

      return (
        <Col
          key={item.key}
          span={item.layoutCol || layoutCol}
          class={className}
        >
          {switchRender(item)}
        </Col>
      );
    },
  },
  render() {
    const that = this;
    const {
      form,
      layout,
      formList,
      buildFormList,
      reset,
      labelCol,
      wrapperCol,
      formGap,
      renderItem,
      selfUpdate,
      showSubmit,
    } = that;

    // 保留动态构建表单
    const formListTmp = buildFormList ? buildFormList(formList) : formList;

    // 事件
    const eventOn = {
      submit(e) {
        e.preventDefault();
        that.$emit("submit", e);
      },
    };

    return (
      <Form
        class="k-form-list"
        form={form}
        layout={layout}
        label-col={{ span: labelCol }}
        wrapper-col={{ span: wrapperCol }}
        selfUpdate={selfUpdate}
        on={eventOn}
      >
        <Row gutter={formGap}>
          {Array.isArray(formListTmp) ? formListTmp.map(renderItem) : null}
        </Row>
        {showSubmit ? (
          <Row type="flex" justify="end">
            <FormItem class="k-form-submit">
              <Space>
                <Button type="primary" html-type="submit">
                  提交
                </Button>
                <Button onClick={reset}>重置</Button>
              </Space>
            </FormItem>
          </Row>
        ) : null}
      </Form>
    );
  },
};
