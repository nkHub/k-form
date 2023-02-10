/**
 * 动态嵌套表单mixins
 * */
export default{
  data(){
    return {
      cache: {}
    }
  },
  watch:{
    formList:{
      handler(v){
        this.recursiveCheckor(v)
      },
      immediate: true
    }
  },
  created(){
    this.$on('change', this.onFormChange)
  },
  beforeDestroy() {
    this.$off('change', this.onFormChange)
  },
  methods:{
    // 循环
    recursiveCheckor(v){
      const that = this
      v.forEach(item => {
        // 只有cache里为空的和存在初始值的才会覆盖cache
        // 即第二次更新时不会再重复初始化
        if(
          item.rules && item.rules.initialValue !== undefined &&
          that.cache[item.key] === undefined
        ){
          that.cache[item.key] = item.rules.initialValue
        }
      })
      // 获取要监听的表单
      that.updateCheckor(v)
    },
    // 获取多级动态表单
    updateCheckor(list){
      const that = this
      list.forEach(v => {
        // 递归检查动态菜单
        if(Array.isArray(v.checkor) && v.checkor.length > 0){
          v.checkor.forEach(checkor => {
            checkor.key = v.key
            that.updateCheckor(checkor.children)
          })
        }
      })
    },
    // 重写表单变动
    onFormChange(values){
      this.cache = { ...this.cache, ...values }
    },
    // 默认的设置并不会触发动态变化
    setFieldsValueUpdate(data) {
      this.form.setFieldsValue(data)
      this.onFormChange(data)
    },
    // 循环添加表单
    recursiveFormList(curItem){
      const { checkIsContain, cache } = this
      let extend = []
      if(Array.isArray(curItem.checkor)){
        curItem.checkor.forEach(check => {
          if(checkIsContain(cache, check)){
            extend = extend.concat(...check.children.map(this.recursiveFormList))
          }
        })
      }
      return [curItem, ...extend]
    },
    // 动态构建表单
    buildFormList(list){
      let formList = []
      list.forEach(v => {
        formList = formList.concat(this.recursiveFormList(v))
      })
      return formList
    },
    // 检查当前的值是否符合动态条件
    checkIsContain(obj, check){
      const cache = obj || {}
      const checkValues = (typeof check.value === 'string') ? check.value.split(',') : [check.value]
      const cacheIsArr = Array.isArray(obj[check.key])
      const result = (
        !cacheIsArr && checkValues.includes(cache[check.key]) ||
        cacheIsArr && cache[check.key].includes(check.value)
      )
      // console.log('checkIsContain', cache, check, result)
      return result
    },
    // 循环初始化
    recursiveInit(list, record){
      const that = this
      const data = {}
      let checkors = []
      list.forEach(v => {
        data[v.key] = record[v.key]
        if(Array.isArray(v.checkor) && v.checkor.length > 0){
          const list = v.checkor.filter(item => {
            return that.checkIsContain(record, { key: v.key, value: item.value })
          }).map(v => v.children)
          checkors = checkors.concat(...list)
        }
      })
      that.$nextTick(function () {
        that.setFieldsValueUpdate(data)
        if(checkors.length > 0){
          // 再循环子表单
          that.recursiveInit(checkors, record)
        }
      })
    },
  }
}
