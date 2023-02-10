// 相对定位
export const getParentContainer = e => e.parentNode

// 简单的合并
export const assign = (obj, ...arr) => {
  let o = { ...(obj || {}) }
  if(Array.isArray(arr)){
    arr.forEach(v => {
      o = { ...o, ...v }
    })
  }
  return o
}

// 获取props参数
export const getPropsExtends = (props, data) => {
  const obj = {}
  for(let k in props){
    if(data.props && data.props[k] !== undefined){
      obj[k] = data.props[k]
    }
  }
  return obj
}

// 批量
export const registerAuto = (register, ...arr) => arr.map(c => register(c))