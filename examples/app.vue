<template>
  <div class="app">
    <Space direction="vertical">
      <h1>KForm</h1>
      <Card title="动态表单" size="small">
        <k-form-list
          ref="form2"
          :form-list="dynamic"
          @change="formChange"
          @submit="handleSubmit('form2')"
        />
      </Card>
      <Card title="静态表单" size="small">
        <k-form-list
          ref="form1"
          :form-list="normal"
          @change="formChange"
          @submit="handleSubmit('form1')"
        />
      </Card>
    </Space>
  </div>
</template>

<script>
import { Card, Space } from 'ant-design-vue'
import { normal, dynamic } from './data'
export default {
  name: 'App',
  components: {
    Card, Space
  },
  data(){
    return {
      normal, dynamic
    }
  },
  methods: {
    formChange(){
      // console.log('formChange', e)
    },
    handleSubmit(key){
      this.$refs[key].validateFields((err, values) => {
        if(err){
          console.log('handleSubmit error', err)
        }else{
          console.log('handleSubmit', values)
        }
      })
    }
  }
}
</script>

<style lang="less">
  [v-cloak]{
    display: none;
  }
  .app{
    padding: 10px 10px 30px;
  }
</style>
