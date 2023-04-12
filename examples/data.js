// 静态表单
export const normal = [
  {
    type: 'AInput',
    label: '名称',
    key: 'hide',
    hide: true,
    rules: {
      initialValue: '隐藏的表单'
    }
  },
  {
    type: 'AInput',
    label: '名称',
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
    label: '数量',
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
    label: '选择',
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
    label: '开关',
    key: 'switch',
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'ARadioGroup',
    label: '单选框',
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
    label: '复选框',
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
    label: '滑块',
    key: 'slider',
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'ARate',
    label: '评分',
    key: 'rate',
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
  {
    type: 'ATimePicker',
    label: '时间',
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
    label: '日期',
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
    label: '年份',
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
    label: '树',
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
    label: '级联',
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
    label: '文本域',
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
    label: '文件上传',
    key: 'upload',
    props: {
      accept: 'xlsx',
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
    label: '选择',
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
    label: '复选框',
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
    label: '年份',
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

// 测试数据
const arr = []
for(let i = 0; i < 1000; i ++){
  arr.push({
    label: `测试${i}`,
    value: `test${i}`
  })
}

export const options = arr
export const virtual = [
  {
    type: 'KSelect',
    label: '选择',
    key: 'k-select',
    props: {
      mode: 'multiple',
      placeholder: '请选择',
      options: arr
    },
    rules: {
      rules: [{ required: false, message: '请选择' }] 
    }
  },
]