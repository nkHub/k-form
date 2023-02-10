import { Upload, Button, Icon } from "ant-design-vue";
import { getPropsExtends } from '../utils/util';
export default {
  name: "KUpload",
  props: Object.assign({}, Upload.props, {
    disabled: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "点击上传文件",
    },
    api: {
      type: [Function, undefined],
      default: undefined,
    },
  }),
  model: {
    prop: "value",
    event: 'change'
  },
  render() {
    const { disabled, message } = this;
    const props = getPropsExtends(Upload.props, this);
    return (
      <Upload {...{ props }}>
        <Button disabled={disabled}>
          <Icon type="upload" />
          {message}
        </Button>
      </Upload>
    );
  },
};
