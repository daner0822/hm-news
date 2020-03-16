<template>
  <div class="register">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>

    <hm-input
      placeholder="用户名/手机号码"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式不对"
      ref="username"
    ></hm-input>

    <hm-input
      placeholder="昵称"
      v-model="nickname"
      :rule="/^[\u4e00-\u9fa5]{3,7}$/"
      message="昵称格式不对"
      ref="nickname"
    ></hm-input>

    <hm-input
      placeholder="密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="密码格式不对"
      ref="password"
    ></hm-input>

    <hm-button @click="register">注册</hm-button>
    <div class="go-register">
      已有账号？去
      <router-link class="link" to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      nickname: ''
    }
  },
  methods: {
    // 表单校验
    register() {
      console.log('哈哈')

      const status1 = this.$refs.username.validate(this.username)
      const status2 = this.$refs.nickname.validate(this.nickname)
      const status3 = this.$refs.password.validate(this.password)
      //只有三个框都通过了验证才发送请求
      if (!status1 || !status2 || !status3) {
        return
      }
      this.$axios({
        method: 'post',
        url: '/register',
        data: {
          username: this.username,
          password: this.password,
          nickname: this.nickname
        }
      }).then(res => {
        if (res.data.statusCode === 200) {
          //注册成功,跳转到登录页
          // 可以调用this.$toast进行提示
          this.$toast.success(res.data.message)
          //跳转到登录页面
          //路由跳转还可以传参 在目标组件中可以通过this.$route.query去获取到传递的参数
          //缺点：通过query方式传参，参数会拼接到url地址的后面。信息就暴漏不安全。
          // this.$router.push({
          //   path: '/login',
          //   query: { username: this.username, password: this.password }
          // })

          //推荐使用params传参   必须使用命名路由
          this.$router.push({
            // path: '/login',
            name: 'login',
            // 等价于this.$router.push({name: 'login'})
            params: { username: this.username, password: this.password }
          })
        } else {
          this.$toast.fail(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.go-register {
  padding: 0 20px;
  font-size: 14px;
  text-align: right;
  .link {
    color: orange;
  }
}
</style>
