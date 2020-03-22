<template>
  <div class="my-star">
    <hm-header>我的收藏</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="bottom">
            <span>{{ item.user.nickname }}</span>
            <span>{{ item.comments.length }}</span>
          </div>
        </div>
        <img :src="item.cover[0].url" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  async created() {
    //发送请求 获取数据
    // const res = await this.$axios({
    //   method: 'get',
    //   url: '/user_star'
    // })
    // axios({method: 'get', url: url}) 可以写简写为  axios.get(url),调用get方法
    const res = await this.$axios.get('/user_star')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      // console.log(res.data)
      this.list = data
      console.log(this.list)
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 16px;
    }
    .bottom {
      font-size: 12px;
      color: #999;
      span {
        margin-left: 5px;
      }
    }
  }
  img {
    width: 121px;
    height: 75px;
    display: block;
    // 让图片等比例缩放 取值cover: 上下裁剪  contain 左右留白
    object-fit: cover;
  }
}
</style>
