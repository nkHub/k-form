export default [
  {
    type: 'AInput',
    name: '名称',
    key: 'input',
    props: {
      placeholder: '请输入名称',
    },
    rules: {
      rules: [{ required: true, message: '请输入名称' }] 
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
      rules: [{ required: true, message: '请输入数量' }] 
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
      rules: [{ required: true, message: '请选择' }] 
    }
  },
  {
    type: 'ASwitch',
    name: '开关',
    key: 'switch',
    rules: {
      rules: [{ required: true, message: '请选择' }] 
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
      rules: [{ required: true, message: '请选择' }] 
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
      rules: [{ required: true, message: '请选择' }] 
    }
  },
  {
    type: 'ADatePicker',
    name: '时间',
    key: 'date',
    props: {
      valueFormat: 'YYYY-MM-DD',
      format: 'YYYY-MM-DD',
      placeholder: '请选择'
    },
    rules: {
      rules: [{ required: true, message: '请选择' }] 
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
      rules: [{ required: true, message: '请输入' }] 
    }
  },
  {
    type: 'KUpload',
    name: '文本域',
    key: 'upload',
    props: {
      placeholder: '请输入'
    },
    rules: {
      rules: [{ required: true, message: '请输入' }] 
    }
  },
]