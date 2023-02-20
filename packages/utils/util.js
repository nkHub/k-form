// 环境
export const isProd = process.env.NODE_ENV === 'production'

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
export function mergeDefaultProps(props, extend, filters = []) {
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

// 通过props生成参数
export function getPropsData(props, instance, defaultVal){
  const propsObj = {};
  for (let k in props) {
    propsObj[k] = instance[k];
  }
  return Object.assign({}, propsObj, defaultVal)
}