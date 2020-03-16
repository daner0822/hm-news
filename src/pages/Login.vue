<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <!-- 父组件使用的时候，需要传递type和placeholder -->
    <hm-input
      type="text"
      placeholder="请输入用户名"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式错误"
      ref="username"
    ></hm-input>
    <hm-input
      type="password"
      placeholder="请输入密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="用户密码格式错误"
      ref="password"
    ></hm-input>
    <hm-button @click="login">登录</hm-button>
    <!-- <van-button type="primary">主要按钮</van-button> -->
  </div>
</template>

<script>
//导入axios
// import axios from 'axios'
export default {
  methods: {
    login() {
      // 点击登录按钮的时候，也让input进行校验
      // 获取用户名和密码表单的校验结果 返回true和false
      const result1 = this.$refs.username.validate(this.username)
      const result2 = this.$refs.password.validate(this.password)
      //如果用户名或者密码验证没通过 就return 不发送请求
      if (!result1 || !result2) {
        return
      }
      this.$axios({
        method: 'post',
        url: '/login',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        // console.log(res.data)
        // 根据后台的响应数据进行处理
        if (res.data.statusCode === 200) {
          //登录成功
          // 可以调用this.$toast进行提示
          this.$toast.success('登陆成功')
          //跳转到个人中心
          this.$router.push('/user')
        } else {
          this.$toast.fail('用户名或者密码错误')
        }
      })
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style></style>
