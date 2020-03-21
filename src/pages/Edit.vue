<template>
  <div>
    <hm-header>编辑资料</hm-header>
    <!-- avatar: 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <!-- 上传头像的组件 -->
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>
    <hm-navbar title="昵称" :content="info.nickname" @click="showNickname"></hm-navbar>
    <hm-navbar title="密码" :content="info.password.replace(/./g, '*')" @click="showPassword"></hm-navbar>
    <hm-navbar title="性别" :content="info.gender === 1 ? '男' : '女'" @click="showGender"></hm-navbar>

    <!-- 
      修改昵称的对话框
      v-model="show" 通过show的值来控制对话框的显示和隐藏
    -->
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="editNickname">
      <van-field v-model="nickname" placeholder="请输入用户昵称"></van-field>
    </van-dialog>
    <!-- 修改密码 -->
    <van-dialog v-model="show1" title="修改昵称" show-cancel-button @confirm="editPassword">
      <van-field v-model="password" placeholder="请输入密码"></van-field>
    </van-dialog>
    <!-- 修改性别 -->
    <van-dialog v-model="show2" title="修改性别" show-cancel-button @confirm="editGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>

    <div class="cropper-mask" v-show="showCropper">
      <vue-cropper
        ref="cropper"
        :img="img"
        :outputSize="1"
        outputType="jpeg"
        :autoCrop="true"
        info
        :fixed="true"
      ></vue-cropper>
      <van-button class="crop" type="primary" @click="crop">裁剪</van-button>
      <van-button class="cancel" type="info" @click="cancel">取消</van-button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  //  注册局部裁剪组件
  components: {
    VueCropper
  },
  // 发送ajax请求，获取详细信息的数据
  data() {
    return {
      //用于存放个人信息
      info: {
        //替换密码
        password: ''
      },
      show: false,
      show1: false,
      show2: false,
      //昵称
      nickname: '',
      password: '',
      gender: 1,
      img: '',
      showCropper: false
    }
  },
  //获取个人信息
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      //发送ajax请求 获取信息
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      const res = await this.$axios({
        method: 'get',
        url: `/user/${user_id}`
        //设置响应头
        // headers: {
        //   Authorization: token
        // }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
        console.log(this.info)
      }
    },
    // 点击出现弹框,信息回显
    showNickname() {
      //显示对话框
      this.show = true
      // 回显nickname
      this.nickname = this.info.nickname
    },
    showPassword() {
      this.show1 = true
      this.password = this.info.password
    },
    showGender() {
      this.show2 = true
      this.gender = this.info.gender
    },
    //修改用户信息封装函数
    async editUser(data) {
      // 发送请求，修改昵称
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      const res = await this.$axios({
        method: 'post',
        url: `/user_update/${user_id}`,
        data: data
        // headers: {
        //   Authorization: token
        // }
      })
      // console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 重新渲染
        this.getInfo()
        // 提示修改成功
        this.$toast.success(message)
      }
    },
    //修改昵称
    editNickname() {
      this.editUser({
        nickname: this.nickname
      })
    },
    //修改密码
    editPassword() {
      this.editUser({ password: this.password })
    },
    //修改性别
    editGender() {
      this.editUser({ gender: this.gender })
    },
    // 文件上传完毕后会触发after-read回调函数，获取到对应的文件的临时地
    afterRead(file) {
      // ajax通过formData异步上传文件
      // console.log('当选择完文件了，这个函数就会执行', file.file)
      // console.log(file)
      //显示裁剪框
      this.showCropper = true
      // 设置裁剪图片
      this.img = file.content
    },
    // before-read 事件可以在上传前进行校验
    beforeRead(file) {
      //控制文件大小不能超过200kb
      if (file.size / 1024 >= 200) {
        this.$toast.fail('文件大小不能超过200kb')
        return false
      }
      // 控制文件的格式 必须是jpg
      if (file.type != 'image/jpeg') {
        this.$toast.fail('上传的文件必须是jpg图片')
        return false
      }
      return true
    },
    //裁剪
    crop() {
      this.$refs.cropper.getCropBlob(data => {
        // data是图片的base64编码
        // console.log(data)
        const fd = new FormData()
        fd.append('file', data)
        this.$axios({
          method: 'post',
          url: 'upload',
          data: fd
        }).then(res => {
          const { statusCode, data } = res.data
          if (statusCode === 200) {
            // console.log(data.url)
            // 隐藏裁剪框
            this.showCropper = false
            // 把裁剪的图片地址清楚
            this.img = ''

            // 能够拿到上传的图片的地址了，还需要修改掉用户的头像
            this.editUser({
              head_img: data.url
            })
          }
        })
      })
    },
    // 取消裁剪
    cancel() {
      this.showCropper = false
      this.img = ''
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  position: relative;
  img {
    width: 70px;
    height: 70px;
    display: block;
    border-radius: 50%;
    margin: 30px auto;
  }
  .uploader {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
}
.van-dialog {
  padding: 0 10px;
}
.van-field {
  border: 1px solid #ccc;
  margin: 10px 0;
}
.cropper-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  .crop,
  .cancel {
    position: absolute;
    top: 0;
  }
  .crop {
    left: 0;
  }
  .cancel {
    right: 0;
  }
}
</style>
