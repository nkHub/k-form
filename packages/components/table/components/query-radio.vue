<template>
  <div class="k-table-select">
    <div>
      <RadioGroup :value="value" @change="$emit('input', $event)">
        <Radio v-for="(item, index) in list" :key="index" v-on="item" :label="item.value" class="k-table-select-row">{{
          item.label }}</Radio>
      </RadioGroup>
    </div>
    <Space class="k-table-select-footer">
      <Button type="text" @click="onReset" size="small" :disabled="disabledReset">
        重 置
      </Button>
      <Button type="primary" size="small" @click="onConfirm">
        确 认
      </Button>
    </Space>
  </div>
</template>

<script>
import { Radio, Button, Space } from 'ant-design-vue'
import { isNull } from '../utils'
export default {
  components: { RadioGroup: Radio.Group, Radio, Button, Space },
  props: {
    list: Array,
    value: [Number, String]
  },
  computed: {
    disabledReset() {
      return isNull(this.value)
    }
  },
  methods: {
    onConfirm() {
      this.$emit('confirm')
    },
    onReset() {
      this.$emit('input', '')
    }
  }
}
</script>

<style></style>
