<template>
  <a @click="handleChange" type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']"><Icon :type="icon" :size="size" /></a>
</template>
<script>
export default {
  name: 'siderTrigger',
  props: {
    collapsed: Boolean,
    icon: {
      type: String,
      default: 'navicon-round'
    },
    size: {
      type: Number,
      default: 26
    }
  },
  methods: {
    handleChange () {
      console.log('这是sider-trigger.vue页面发出的 ')
      this.$emit('on-change', !this.collapsed)
    }
  }
}
</script>
<style lang="less">
@import './sider-trigger.less';
</style>
