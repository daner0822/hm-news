<template>
  <div class="hm-post" @click="$router.push(`/post-detail/${post.id}`)">
    <!-- 视频格式 -->
    <div class="video-post" v-if="post.type === 2">
      <div class="title">{{ post.title }}</div>
      <div class="video">
        <img :src="fixedUrl(post.cover[0].url)" alt />
        <div class="play">
          <span class="iconfont iconshipin"></span>
        </div>
      </div>
      <div class="bottom">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comment_length }}跟帖</span>
      </div>
    </div>
    <!-- 单图片格式 -->
    <div class="single-img-post" v-if="post.cover.length < 3">
      <div class="info">
        <div class="title">{{ post.title }}</div>
        <div class="bottom">
          <span>{{ post.user.nickname }}</span>
          <span>{{ post.comment_length }}跟帖</span>
        </div>
      </div>
      <img :src="fixedUrl(post.cover[0].url)" alt />
    </div>
    <!-- 多图片格式 -->
    <div class="mutiple-img-post" v-else>
      <div class="title">{{ post.title }}</div>
      <div class="imgs">
        <img :src="fixedUrl(post.cover[0].url)" alt />
        <img :src="fixedUrl(post.cover[1].url)" alt />
        <img :src="fixedUrl(post.cover[2].url)" alt />
      </div>
      <div class="bottom">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comment_length }}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  },
  methods: {
    //修复图片路径
    fixedUrl(url) {
      //图片的地址有网络图片，也有本地上传的图片
      //判断图片是否是完整的路径
      //以http开头的路径就是完整路径就直接返回,不是完整路径就拼接上基础路径
      if (url.startsWith('http')) {
        return url
      } else {
        return this.$axios.defaults.baseURL + url
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
.single-img-post {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  img {
    width: 121px;
    height: 75px;
    display: block;
    // 让图片等比例缩放 取值cover: 上下裁剪  contain 左右留白
    object-fit: cover;
  }
}
.mutiple-img-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .imgs {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    img {
      width: 112px;
      height: 74px;
      object-fit: cover;
    }
  }
}
.video-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .video {
    padding: 10px 0;
    position: relative;
    img {
      width: 340px;
      height: 170px;
      object-fit: cover;
      display: block;
    }
    .play {
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.5);
      text-align: center;
      span {
        color: #fff;
        font-size: 32px;
      }
    }
  }
}
</style>
