<template>
  <div class="app">
    <Card title="表单测试">
      <k-form-list
        ref="form"
        :form-list="list"
        @submit="handleSubmit"
      />
    </Card>
  </div>
</template>

<script>
import { Card } from 'ant-design-vue'
import formList from './data'
export default {
  name: 'App',
  components: {
    Card
  },
  data(){
    return {
      list: formList
    }
  },
  methods: {
    handleSubmit(){
      this.$refs.form.validateFields((err, values) => {
        console.log('handleSubmit', err, values)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .app{
    padding: 10px;
  }
</style>
