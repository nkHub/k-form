
const types = {
  'Boolean': 'ASwitch',
  'String': 'AInput',
  'Number': 'AInputNumber'
}
// label名称
const names = {
  // 通用部分
  key: 'ID',
  tips: '提示',
  hide: '隐藏',
  // formItem
  label: '标签名称',
  labelCol: '标签宽度',
  wrapperCol: '表单组件宽度',
  help: '帮助信息',
  extra: '额外信息',
  required: '必填',
  // hasFeedback: '存在反馈',
  // input
  showSearch: '支持搜索',
  allowClear: '允许清空',
  autoFocus: '自动获取焦点',
  maxLength: '最大长度',
  readOnly: '只读',
  defaultValue: '默认值',
  // type: '类型',
  disabled: '禁用',
  addonBefore: '前置',
  addonAfter: '后置',
  // number
  min: '最小值',
  max: '最大值',
  decimalSeparator: '小数点符号',
  precision: '数值精度(保留小数位数)',
  // switch
  defaultChecked: '默认选中',
  // select
  mode: '模式',
  defaultActiveFirstOption: '默认高亮第一个选项',
  maxTagCount: '最大显示个数',
  maxTagTextLength: 'tag文本最大长度',
  autoClearSearchValue: '选中后清理',
  // date
  format: '格式',
  placeholder: '默认提示文字',
  use12Hours: '12小时制',
  hourStep: '时步长',
  minuteStep: '分步长',
  secondStep: '秒步长',
  allowEmpty: '允许空',
  valueFormat: '提交值格式',
  showToday: '显示今天',
  // slider
  reverse: '翻转',
  range: '双滑块模式',
  step: '步长',
  dots: '只能拖拽到刻度上',
  // rate
  count: '星个数',
  allowHalf: '允许半星',
  // tree
  multiple: '多选',
  searchPlaceholder: '搜索框默认文字',
  treeDefaultExpandAll: '默认展开所有树节点',
  // cascader
  changeOnSelect: '点选每级菜单选项值都会发生变化',
  // upload
  directory: '支持上传文件夹',
  accept: '文件类型'
}

export const commonKeys = ['key','hide','tips','label','labelCol','wrapperCol','help','extra','hasFeedback', 'required']

// 提示信息表单部分（这个是自定义部分）
const normal = {
  key: {
    type: String,
    required: true
  },
  hide: {
    type: Boolean,
    default: false
  },
  tips: {
    type: String
  }
}

const normalTips = {
  labelCol: '默认不配置为表单配置宽度',
  wrapperCol: '默认不配置为表单配置宽度',
}

// props转表单form
export function props2form(props, item){
  const temp = []
  for(let k in props){
    const { type, default: defVal, required } = props[k] || {}
    const dataTypes = Array.isArray(type) ? type : [type];
    const dataNames = dataTypes.map(v => v && v.name).filter(Boolean)
    const name = dataNames[0]
    const curKey = k
    const tmpItem = {
      label: names[curKey] || curKey,
      key: curKey,
      rules: {
        rules: [
          {
            required: false
          }
        ]
      }
    }
    if(normalTips[curKey]) tmpItem.tips = normalTips[curKey]
    // 初始化默认值
    // 默认值
    let initialValue = item.props && item.props[curKey] || item[curKey] || defVal;
    // 存在默认值
    if(['defaultValue', 'defaultChecked'].includes(curKey) && item.rules && item.rules.initialValue){
      initialValue = item.rules.initialValue
    }
    if(initialValue) tmpItem.rules.initialValue = initialValue
    // 必填部分
    if(required) tmpItem.rules.rules[0].required = required
    // 设置特殊的配置
    const hasKey = Object.keys(names).includes(curKey)
    if(hasKey){
      // 初始化表单类型
      tmpItem.type = types[name] || (tmpItem.label.match('度') !== null ? 'AInputNumber' : 'AInput')
      if(['AInput', 'AInputNumber'].includes(tmpItem.type)){
        const placeholder = '请输入' + tmpItem.label
        tmpItem.props = { placeholder }
        tmpItem.rules.rules[0].message = placeholder
        if(tmpItem.type === 'AInputNumber'){
          tmpItem.style = {
            width: '100%'
          }
        }
      }
      temp.push(tmpItem)
    }else{
      // console.log('name', k, dataNames, dataTypes)
    }
  }
  
  return temp
}

// 多组件合并props转表单form
export function mergeProps2form(value, item, props){
  const temp = []
  temp.push(...props2form(normal, value))
  temp.push(...props2form(item, value))
  temp.push(...props2form(props, value))
  console.log('mergeProps2form', temp)
  return temp
}

// 简单复制
export function clone(data){
  return JSON.parse(JSON.stringify(data))
}

// 获取随机字符串
export function getRandomStr(prefix = ''){
  const s = Math.random().toString(36).slice(-8)
  if(prefix) return `${prefix}_${s}`
  return s
}