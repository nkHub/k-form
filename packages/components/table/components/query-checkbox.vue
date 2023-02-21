<template>
  <div class="k-table-select">
    <div>
      <CheckboxGroup :value="value || []" @input="$emit('input', $event)">
        <Checkbox v-for="(item, index) in list" :key="index" v-on="item" :label="item.value" class="k-table-select-row">{{
          item.label }}</Checkbox>
      </CheckboxGroup>
    </div>
    <Space class="k-table-select-footer">
      <Button type="text" size="small" @click="onReset" :disabled="disabledReset">
        重 置
      </Button>
      <Button type="primary" size="small" @click="onConfirm">
        确 认
      </Button>
    </Space>
  </div>
</template>

<script>
import { Checkbox, Button, Space } from 'ant-design-vue'
import { isNull } from '../utils'
export default {
  components: { CheckboxGroup: Checkbox.Group, Checkbox, Button, Space },
  props: {
    list: Array,
    value: [Array]
  },
  data() {
    return {
      currentValue: this.value ? [...this.value] : []
    }
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
      this.$emit('input', [])
    }
  }
}
</script>

<style></style>
