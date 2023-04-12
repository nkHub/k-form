// 默认的组件类型
export const types = [
  {
    name: '基础组件',
    children: [
      {
        name: '输入框',
        type: 'AInput',
        config: {
          key: 'input'
        }
      },
      {
        name: '数字输入框',
        type: 'AInputNumber',
        config: {
          key: 'number',
          style: {
            width: '100%'
          }
        }
      },
      {
        name: '单选',
        type: 'ARadioGroup',
        config: {
          key: 'radio',
          props: {
            options: [
              {
                label: '测试',
                value: 'test'
              }
            ]
          }
        }
      },
      {
        name: '多选',
        type: 'ACheckboxGroup',
        config: {
          key: 'checkbox',
          props: {
            options: [
              {
                label: '测试',
                value: 'test'
              }
            ]
          }
        }
      },
      {
        name: '开关',
        type: 'ASwitch',
        config: {
          key: 'switch'
        }
      },
      {
        name: '下拉选择',
        type: 'ASelect',
        config: {
          key: 'select',
          props: {
            options: [
              {
                label: '测试',
                value: 'test'
              }
            ]
          }
        }
      },
      {
        name: '时间选择器',
        type: 'ATimePicker',
        config: {
          key: 'time',
          style: {
            width: '100%'
          }
        }
      },
      {
        name: '年选择器',
        type: 'KYearPicker',
        config: {
          key: 'year',
          style: {
            width: '100%'
          }
        }
      },
      {
        name: '日期选择器',
        type: 'ADatePicker',
        config: {
          key: 'date',
          style: {
            width: '100%'
          }
        }
      },
      {
        name: '文本域',
        type: 'ATextarea',
        config: {
          key: 'textarea'
        }
      },
    ]
  },
  {
    name: '高级组件',
    children: [
      {
        name: '滑块',
        type: 'ASlider',
        config: {
          key: 'slider'
        }
      },
      {
        name: '评星',
        type: 'ARate',
        config: {
          key: 'rate'
        }
      },
      {
        name: '虚拟下拉',
        type: 'KSelect',
        config: {
          key: 'vselect',
          props: {
            options: [
              {
                label: '测试',
                value: 'test'
              }
            ]
          }
        }
      },
      {
        name: '树选择',
        type: 'ATreeSelect',
        config: {
          key: 'tree',
          props: {
            options: [
              {
                label: '测试',
                value: 'test'
              }
            ]
          }
        }
      },
      {
        name: '层级选择',
        type: 'ACascader',
        config: {
          key: 'cascader',
          props: {
            options: [
              {
                label: '测试',
                value: 'test'
              }
            ]
          }
        }
      },
      {
        name: '文件上传',
        type: 'KUpload',
        config: {
          key: 'upload'
        }
      },
    ]
  },
  {
    name: '模版',
    children: [
      {
        name: '测试',
        type: 'Test',
        config: {
          key: 'template_test'
        }
      }
    ]
  },
]

// 默认配置
export const config = {
  layout: 'horizontal',
  layoutCol: 24,
  labelCol: 5,
  wrapperCol: 18,
  formGap: 10,
  selfUpdate: false,
  showSubmit: true
}

// 默认展示的表单
export const form = [
  {
    id: 'test',
    type: "AInput",
    label: "名称",
    key: "input",
    props: {
      placeholder: "请填写名称",
    }
  },
]

// 表单配置表单
export const formConfig = [
  {
    type: 'ASelect',
    label: '布局方式',
    key: 'layout',
    props: {
      placeholder: '请选择布局方式',
      options: [
        {
          label: '水平',
          value: 'horizontal'
        },
        {
          label: '垂直',
          value: 'vertical'
        },
        // {
        //   label: '内联',
        //   value: 'inline'
        // },
      ]
    },
    rules: {
      initialValue: config.layout,
      rules: [{ required: false, message: '请选择布局方式' }] 
    }
  },
  {
    type: "AInputNumber",
    label: "行宽",
    key: "layoutCol",
    style: {
      width: '100%'
    },
    props: {
      min: 1,
      max: 24,
      placeholder: "请填写行宽",
    },
    rules: {
      initialValue: config.layoutCol,
      rules: [{ required: false, message: "请填写行宽" }],
    },
  },
  {
    type: "AInputNumber",
    label: "行文字宽",
    key: "labelCol",
    style: {
      width: '100%'
    },
    props: {
      min: 1,
      max: 24,
      placeholder: "请填写行文字宽",
    },
    rules: {
      initialValue: config.labelCol,
      rules: [{ required: false, message: "请填写行文字宽" }],
    },
  },
  {
    type: "AInputNumber",
    label: "行表单宽",
    key: "wrapperCol",
    style: {
      width: '100%'
    },
    props: {
      min: 1,
      max: 24,
      placeholder: "请填写行表单宽",
    },
    rules: {
      initialValue: config.wrapperCol,
      rules: [{ required: false, message: "请填写行表单宽" }],
    },
  },
  {
    type: "AInputNumber",
    label: "表单间距",
    key: "formGap",
    style: {
      width: '100%'
    },
    props: {
      min: 0,
      placeholder: "请填写表单间距",
    },
    rules: {
      initialValue: config.formGap,
      rules: [{ required: false, message: "请填写表单间距" }],
    },
  },
]