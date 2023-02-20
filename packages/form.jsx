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
  TreeSelect,
} from "ant-design-vue";
import { assign, getPropsExtends, registerAuto } from "~/utils/util";
import { KUpload, KYearPicker, KSelect } from "~/components";
import "~/styles/index.less";

const FormItem = Form.Item;
// 动态表单组件
export default {
  name: "k-form-list",
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
      // 表单值的缓存
      cache: {}
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
      KSelect,
      TreeSelect,
      Cascader,
      KUpload,
      KYearPicker
    ];
    registerAuto(this.register, ...list);
  },
  watch:{
    formList:{
      handler(v){
        // 循环初始化默认值
        this.recursive(v)
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 静态表单部分
     * */ 
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
    onValuesChange(_props, values) {
      const { cache } = this
      if (values instanceof Object && Object.keys(values).length === 1) {
        this.$emit("change", values);
        // 存储缓存，并清楚关联的数据
        this.cache = { ...cache, ...values }
      }
    },
    /**
     * 外部方法部分
    */
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
      // 需要重置缓存
      this.cache = {}
      this.recursive(this.formList)
    },
    validateFields(callback) {
      this.form.validateFields(callback);
    },
    /**
     * 渲染部分
    */
    // 渲染表单项基础猎狗
    renderFormItemBase(item, content) {
      const { labelCol, wrapperCol } = this;
      // 不显示返回的表单类型(会和清除icon冲突)
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
    },
    // 渲染单个表单
    renderItem(item) {
      const { layoutCol, renderFormItemBase, items: formItems } = this;
      const className = {
        hide: item.hide,
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
      // 切换渲染器
      const switchRender = (item) => {
        let row = null;
        switch (item.type) {
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
    /**
     * 动态表单部分
     * */ 
    // 循环收集默认值
    recursive(v){
      for(let i = 0; i < v.length; i++){
        const item = v[i]
        if(
          item.rules && item.rules.initialValue !== undefined &&
          this.cache[item.key] === undefined
        ){
          this.cache[item.key] = item.rules.initialValue
        }
      }
    },
    // 构建表单
    buildForm(){
      const that = this
      const { formList, cache } = this
      // 处理显示
      const list = formList.filter(item => {
        if(item.show === undefined) return true
        let show = false
        // 可能会存在报错的问题
        try{
          const fn = new Function('form', 'return ' + item.show)
          // 拦截修改
          show = fn(new Proxy(cache, {
            set(_target, key, value){
              console.warn('表达式内不支持设置', key, value)
              return false
            }
          }))
        }catch(e){
          console.debug('处理显示出错', item.key, e)
        }
        // 不显示了自动清空缓存值
        if(!show)that.$set(that.cache, item.key, undefined)
        return show
      })
      return list
    }
  },
  render() {
    const that = this;
    const {
      form,
      layout,
      buildForm,
      reset,
      labelCol,
      wrapperCol,
      formGap,
      renderItem,
      selfUpdate,
      showSubmit,
    } = that;

    // 保留动态构建表单
    const formListTmp = buildForm();

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
        {/* 表单列 */}
        <Row gutter={formGap}>
          {Array.isArray(formListTmp) ? formListTmp.map(renderItem) : null}
        </Row>
        {/* 是否显示提交重置部分 */}
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
