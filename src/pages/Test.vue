<template>
  <div class="test">
    <!-- 
      img: 用于指定裁剪哪张图片
      outputSize: 指定裁剪的图片质量 0-1
      outputType: 指定裁剪出来的图片的格式  jpeg | png | webp
      autoCrop: 是否生成裁剪框   默认false
      info: 是否显示裁剪框的信息 默认true
      autoCropWidth: 指定默认生成裁剪框的宽度
      autoCropHeight: 指定默认生成裁剪框的宽度
      fixed: 是否开启截图框宽高固定比例 是否宽高等比例缩放
      fixedNumber: 指定宽高比例  默认 [1,1]
      canMove: 上传图片是否可以移动
     -->
    <vue-cropper
      ref="cropper"
      img="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2286551820,2259135433&fm=15&gp=0.jpg"
      :outputSize="1"
      outputType="jpeg"
      :autoCrop="true"
      info
      :autoCropWidth="150"
      :autoCropHeight="150"
      :canMove="true"
    ></vue-cropper>
    <van-button class="crop" type="primary" @click="crop">裁剪</van-button>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  methods: {
    crop() {
      //this.$refs.getCropData(data=>{}) 获取的是图片的base64数据 直接展示的图片 不是图片的文件信息
      //裁剪图片,获取图片的数据,需要先给图片一个ref
      this.$refs.cropper.getCropBlob(data => {
        // data是图片的base64编码
        console.log(data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 头像裁剪的高度是继承了父盒子的高度,要保证父盒子有高度
.test {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.crop {
  position: absolute;
  bottom: 0;
}
</style>
