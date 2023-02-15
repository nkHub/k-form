// 静态表单
export const normal = [
  {
    type: 'AInput',
    name: '名称',
    key: 'hide',
    hide: true,
    rules: {
      initialValue: '隐藏的表单'
    }
  },
  {
    type: 'AInput',
    name: '名称',
    key: 'input',
    props: {
      placeholder: '请输入名称',
    },
    tips: '提示信息',
    rules: {
      rules: [{ required: false, message: '请输入名称' }] 
    }
  },
  {
    type: 'AInputNumber',
    name: '数量',
    key: 'number',
    style: {
      width: '100%'
    },
    props: {
      placeholder: '请输入数量',
    },
    rules: {
      rules: [{ required: false, message: '请输入数量' }] 
    }
  },
  {
    type: 'ASelect',
    name: '选择',
    key: 'select',
    props: {
      placeholder: '请选择',
      options: [
      {
          label: '测试1',
          value: 'test1'
        },
        {
          label: '测试2',
          value: 'test2'
        },
      ]
    },
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'ASwitch',
    name: '开关',
    key: 'switch',
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'ARadioGroup',
    name: '单选框',
    key: 'radiobox',
    props: {
      options: [
        {
          label: '测试1',
          value: 'test1'
        },
        {
          label: '测试2',
          value: 'test2'
        },
      ]
    },
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'ACheckboxGroup',
    name: '复选框',
    key: 'checkbox',
    props: {
      options: [
        {
          label: '测试1',
          value: 'test1'
        },
        {
          label: '测试2',
          value: 'test2'
        },
      ]
    },
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'ASlider',
    name: '滑块',
    key: 'slider',
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'ARate',
    name: '评分',
    key: 'rate',
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'ATimePicker',
    name: '时间',
    key: 'time',
    props: {
      valueFormat: 'HH:mm:ss',
      placeholder: '请选择'
    },
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'ADatePicker',
    name: '日期',
    key: 'date',
    props: {
      valueFormat: 'YYYY-MM-DD',
      format: 'YYYY-MM-DD',
      placeholder: '请选择'
    },
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'KYearPicker',
    name: '年份',
    key: 'year',
    props: {
      valueFormat: 'YYYY',
      format: 'YYYY',
      placeholder: '请选择'
    },
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'ATreeSelect',
    name: '树',
    key: 'tree',
    props: {
      treeData: [
        {
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              value: '0-0-1',
              key: '0-0-1',
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
              key: '0-0-2',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
          key: '0-1',
        },
      ],
      placeholder: '请选择'
    },
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'ACascader',
    name: '级联',
    key: 'cascader',
    props: {
      expandTrigger: "hover",
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
      placeholder: '请选择'
    },
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'ATextarea',
    name: '文本域',
    key: 'textarea',
    props: {
      placeholder: '请输入'
    },
    rules: {
      rules: [{ required: false, message: '请输入' }] 
    }
  },
  {
    type: 'KUpload',
    name: '文件上传',
    key: 'upload',
    props: {
      message: '请选择文件'
    },
    rules: {
      rules: [{ required: false, message: '请选择文件' }] 
    }
  },
]
// 动态表单
export const dynamic = [
  {
    type: 'ASelect',
    name: '选择',
    key: 'select',
    props: {
      placeholder: '请选择',
      options: [
      {
          label: '测试1',
          value: 'test1'
        },
        {
          label: '测试2',
          value: 'test2'
        },
      ]
    },
    rules: {
      initialValue: 'test1',
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'ACheckboxGroup',
    name: '复选框',
    key: 'checkbox',
    props: {
      options: [
        {
          label: '测试1',
          value: 'test1'
        },
        {
          label: '测试2',
          value: 'test2'
        },
      ]
    },
    show: "form.select === 'test1'",
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'KYearPicker',
    name: '年份',
    key: 'year',
    props: {
      valueFormat: 'YYYY',
      format: 'YYYY',
      placeholder: '请选择'
    },
    rules: {
      rules: [{ required: true, message: '请选择' }] 
    },
    show: "form.checkbox.includes('test1')",
  },
]