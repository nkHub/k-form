<template>
  <div class="app">
    <Space direction="vertical">
      <h1>KForm</h1>
      <Card title="弹窗抽屉表单" size="small">
        <Space>
          <Button type="primary" @click="showModalForm">弹窗</Button>
          <Button type="primary" @click="showDrawerForm">抽屉</Button>
        </Space>
      </Card>
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
import { Card, Space, Button } from 'ant-design-vue'
import { normal, dynamic } from './data'
export default {
  name: 'App',
  components: {
    Card, Space, Button
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
    },
    showModalForm(){
      this.$kform.show({
        type: 'modal',
        title: '弹窗表单',
        formList: dynamic,
        onSubmit(form){
          console.log('form', form)
        }
      })
    },
    showDrawerForm(){
      this.$kform.show({
        type: 'drawer',
        title: '抽屉表单',
        formList: dynamic,
        onSubmit(form){
          console.log('form', form)
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
