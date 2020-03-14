<template>
  <div class="hm-button" @click="clickfn">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    clickfn() {
      //子传父  通知父组件触发click事件
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.hm-button {
  height: 50px;
  line-height: 50px;
  margin: 10px;
  background-color: #cc3300;
  color: #fff;
  text-align: center;
  border-radius: 25px;
  font-size: 18px;
}
</style>
