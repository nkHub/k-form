import { Upload, Button, Icon } from "ant-design-vue";
import { file2blob, mergeDefaultProps } from "~/utils/util";

export default {
  name: "KUpload",
  model: {
    prop: "fileList",
    event: "change",
  },
  props: mergeDefaultProps(
    Upload.props,
    {
      message: {
        type: String,
        default: "点击上传文件",
      },
      // 自动上传接口
      api: {
        type: [Function, undefined],
        default: undefined,
      },
      postData: {
        type: [Function, undefined],
        default: undefined,
      },
      params: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    ["disabled", "beforeUpload", "customRequest"]
  ),
  computed: {
    disabled() {
      const { multiple, fileList } = this;
      return !multiple && Array.isArray(fileList) && fileList.length > 0;
    },
  },
  methods: {
    beforeUpload() {
      return Boolean(this.api);
    },
    handleChange({ fileList }) {
      this.$emit("change", fileList);
    },
    // 自定义请求
    async customRequest(event) {
      const that = this;
      const { api, params, postData } = that;
      const { file } = event;
      if (!api) return Promise.reject("找不到上传api");
      // 上传参数处理
      const data = new FormData();
      if (params instanceof Object) {
        Object.keys(params).forEach((k) => {
          data.append(k, params[k]);
        });
      }
      data.append("file", file);
      const result = await api(data);
      // 文件添加额外的参数
      const query = postData ? postData(result) : {};
      const localUrl = await file2blob(file);
      const uploaded = {
        uid: file.uid,
        name: file.name,
        originFileObj: file,
        status: "done",
        url: localUrl,
        ...query,
      };
      // 替换上传的部分
      const fileList = [...that.fileList].map((v) => {
        return v.uid === uploaded.uid ? uploaded : v;
      });
      that.$emit("change", fileList);
      return fileList;
    },
  },
  render() {
    const { disabled, message, beforeUpload, customRequest, handleChange } =
      this;
    const props = {
      ...this.$options.propsData,
      beforeUpload,
      customRequest,
    };
    return (
      <Upload {...{ props }} onchange={handleChange}>
        <Button disabled={disabled}>
          <Icon type="upload" />
          {message}
        </Button>
      </Upload>
    );
  },
};
