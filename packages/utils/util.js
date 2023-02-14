// 相对定位
export const getParentContainer = e => e.parentNode

// 简单的合并
export const assign = (obj, ...arr) => {
  let o = { ...(obj || {}) }
  if (Array.isArray(arr)) {
    arr.forEach(v => {
      o = { ...o, ...v }
    })
  }
  return o
}

// 获取props参数
export const getPropsExtends = (props, data, key = 'props') => {
  const obj = {}
  for (let k in props) {
    if (data[key] && data[key][k] !== undefined) {
      obj[k] = data[key][k]
    }
  }
  return obj
}

// 批量
export const registerAuto = (register, ...arr) => arr.map(c => register(c))


// 转换文件对象至Blob对象(image|pdf)
export function file2blob(file) {
  // 链接则直接返回
  if (typeof file == 'string') return Promise.resolve(file);
  return new Promise((resolve, reject) => {
    let url = null;
    if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
      try {
        url = window.webkitURL.createObjectURL(file);
      } catch (error) {
        reject(error)
      }
    } else if (window.URL != undefined) { // mozilla(firefox)
      try {
        url = window.URL.createObjectURL(file);
      } catch (error) {
        reject(error)
      }
    }
    resolve(url);
  });
}

// 合并props
export function mergeProps(props, extend, filters = []) {
  if (Array.isArray(filters) && filters.length === 0) {
    return Object.assign({}, props, extend)
  }
  const newProps = { ...extend }
  for (let k in props) {
    if (!filters.includes(k)) {
      newProps[k] = props[k]
    }
  }
  return newProps;
}

// 是否包含
export function checkIsContain(obj, check){
  const cache = obj || {}
  // 字符串切割会存在字符串和数字的的问题
  const checkValues = (typeof check.value === 'string') ? check.value.split(',') : [check.value]
  const cacheIsArr = Array.isArray(obj[check.key])
  const result = (
    !cacheIsArr && checkValues.includes(cache[check.key]) ||
    cacheIsArr && cache[check.key].includes(check.value)
  )
  // console.log('checkIsContain', cache, check, result)
  return result
}