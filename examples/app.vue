<template>
  <div class="app">
    <h1>KForm</h1>
    <Space direction="vertical">
      <Card title="静态表单" size="small">
        <k-form-list ref="form1" :form-list="normal" @change="formChange" @submit="handleSubmit('form1')" />
      </Card>
      <Card title="动态表单" size="small">
        <k-form-list ref="form2" :form-list="dynamic" @change="formChange" @submit="handleSubmit('form2')" />
      </Card>
      <Card title="弹窗抽屉表单" size="small">
        <Space>
          <Button type="primary" @click="showModalForm">弹窗</Button>
          <Button type="primary" @click="showDrawerForm">抽屉</Button>
        </Space>
      </Card>
      <Card title="虚拟列表下拉选择" size="small">
        <Card size="small" :bordered="false">
          <Space>
            单独使用：
            <k-select style="width: 180px" :options="options" placeholder="请选择"/>
          </Space>
        </Card>
        <k-form-list ref="form3" :form-list="virtual" @change="formChange" @submit="handleSubmit('form3')" />
      </Card>
      <!-- <Card title="Canvas表格" size="small">
        <k-table/>
      </Card> -->
      <div></div>
    </Space>
    <ConfigProvider :locale="locale">
      <k-form-modal title="弹窗表单" width="500px" :visible.sync="mVisible" :form-list="dynamic" @submit="handleMSubmit" />
    </ConfigProvider>
    <k-form-drawer title="抽屉表单" width="500px" :visible.sync="dVisible" :form-list="dynamic" @submit="handleMSubmit" />
  </div>
</template>

<script>
import { Card, Space, Button, ConfigProvider } from 'ant-design-vue'
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { normal, dynamic, virtual, options } from './data'
export default {
  name: 'App',
  components: {
    Card, Space, Button, ConfigProvider
  },
  data() {
    return {
      locale: zhCN,
      normal, dynamic, virtual,
      mVisible: false,
      dVisible: false,
      options
    }
  },
  methods: {
    formChange() {
      // console.log('formChange', e)
    },
    handleSubmit(key) {
      this.$refs[key].validateFields((err, values) => {
        if (err) {
          console.log('handleSubmit error', err)
        } else {
          console.log('handleSubmit', values)
        }
      })
    },
    handleMSubmit(modal, close) {
      modal.form.validateFields((err, values) => {
        if (err) {
          console.log('handleMSubmit error', err)
        } else {
          console.log('handleMSubmit', values)
          close()
        }
      })
    },
    showModalForm() {
      this.mVisible = true
    },
    showDrawerForm() {
      this.dVisible = true
    }
  }
}
</script>

<style lang="less">
[v-cloak] {
  display: none;
}

.app {
  padding: 10px 10px 30px;
  h1{
    margin: 0;
  }
  .ant-space-vertical{
    flex-direction: column-reverse;
  }
}
</style>
