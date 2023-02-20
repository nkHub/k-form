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
    name: '选择',
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

const source = []
for(let i = 0; i < 1000; i ++){
  source.push({
    sex: '男',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  })
}

export const data = source
export const columns = [
  {
    label: '序号',
    key: '$$index',
    type: 'index',
    width: 60,
    fixed: 'left',
    align: 'center'
  },
  {
    label: '名字',
    key: 'name',
    queryField: 'name',
    queryComponent: 'query-checkbox',
    queryAttrs: {
      list: [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' },
        { value: '3', label: '选项3' },
      ]
    },
    fixed: 'left',
    width: 100,
  },
  {
    label: '年龄',
    key: 'age',
    width: 70,
    sortable: true,
  },
  {
    label: '地址',
    key: 'address',
    width: 180
  },
  {
    label: '名字2',
    key: 'name2',
    width: 120,
  },
  {
    label: '年龄2',
    key: 'age2',
    width: 120,
    sortable: true,
  },
  {
    label: '地址2',
    key: 'address2',
    width: 120
  },
  {
    label: '名字3',
    key: 'name3',
    width: 120,
    sortable: true,
  },
  {
    label: '年龄3',
    key: 'age3',
    width: 120,
    sortable: true,
  },
  {
    label: '地址3',
    key: 'address3',
    fixed: 'right',
    width: 120
  },
]
