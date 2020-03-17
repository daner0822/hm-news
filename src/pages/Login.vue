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
    <div class="go-register">
      没有账号？去
      <router-link class="link" to="/register">注册</router-link>
    </div>
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
        // console.log(res)

        const { statusCode, data, message } = res.data
        // 根据后台的响应数据进行处理
        if (statusCode === 200) {
          //登录成功
          //在登录成功的时候 保存token信息(登陆成功,浏览器自动生成一个token)
          // localStorage.setItem('token', res.data.data.token)
          // localStorage.setItem('user_id', res.data.data.user.id)
          // 解构
          localStorage.setItem('token', data.token)
          localStorage.setItem('user_id', data.user.id)
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
  },
  //数据已修改完成 就直接获取
  created() {
    //通过this.$route.params来获取参数, 注册完成 直接获取到注册的用户名和密码并渲染出来
    this.username = this.$route.params.username
    this.password = this.$route.params.password
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
