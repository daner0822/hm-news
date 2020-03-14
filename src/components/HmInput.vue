<template>
  <div class="hm-input">
    <!-- 渲染的时候，不把type和placeholder写死 -->
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="inputFn"
      :class="{ success: status === 'success', error: status === 'error' }"
    />
    <div class="tips" v-show="status === 'error'">{{ message }}</div>
  </div>
</template>

<script>
export default {
  // 需要使用props来接收父组件传递过来的数据
  // props: ['type', 'placeholder']
  // 我们定义组件的时候，可以给接收的props添加类型的校验，保证接收到的数据的格式是正确的。
  props: {
    //接收type属性
    type: {
      //接收数据是字符串类型
      type: String,
      //默认是文本类型
      default: 'text'
    },
    placeholder: {
      type: String
    },
    value: String,
    //提供表单校验 正则和提示消息
    rule: RegExp,
    message: String
  },
  methods: {
    //把input框的值传给父组件通知父组件修改value
    inputFn(e) {
      //e.target.value获取触发事件的元素的value值
      // console.log(e.target.value)
      let value = e.target.value
      this.$emit('input', value)

      //需要在内容发生改变的时候，进行表单的校验
      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = 'success'
        } else {
          this.status = 'error'
        }
        console.log(this.status)
      }
    }
  },
  data() {
    return {
      status: ''
    }
  }
}
</script>

<style lang="less" scoped>
.hm-input {
  height: 50px;
  margin: 0 10px;
  input {
    height: 30px;
    line-height: 30px;
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    color: #666;
    width: 100%;
    &.success {
      border-color: green;
    }

    &.error {
      border-color: red;
    }
  }
  .tips {
    color: red;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
  }
}
</style>
