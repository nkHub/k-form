<template>
  <div class="app">
    <h1>K-Form</h1>
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
        <Row style="padding-top: 20px">
          <Col :span="3" style="text-align: right;line-height: 32px;">单独使用：</Col>
          <Col :span="21">
            <k-select style="width: 180px" :options="options" placeholder="请选择"/>
          </Col>
        </Row>
        <k-form-list ref="form3" :form-list="virtual" @change="formChange" @submit="handleSubmit('form3')" />
      </Card>
      <Card title="Canvas表格" size="small">
        <k-table :data-source="data" :columns="columns" :max-height="300"/>
      </Card>
      <div></div>
    </Space>
    <!-- 弹窗 -->
    <ConfigProvider :locale="locale">
      <k-form-modal title="弹窗表单" width="500px" :visible.sync="mVisible" :form-list="dynamic" @submit="handleMSubmit" />
    </ConfigProvider>
    <k-form-drawer title="抽屉表单" width="500px" :visible.sync="dVisible" :form-list="dynamic" @submit="handleMSubmit" />
  </div>
</template>

<script>
import { Card, Space, Button, ConfigProvider, Row, Col } from 'ant-design-vue'
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { normal, dynamic, virtual, options, data, columns } from './data'
export default {
  name: 'App',
  components: {
    Card, Space, Button, ConfigProvider, Row, Col
  },
  data() {
    return {
      locale: zhCN,
      normal, dynamic, virtual,
      mVisible: false,
      dVisible: false,
      options,
      data, columns
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
