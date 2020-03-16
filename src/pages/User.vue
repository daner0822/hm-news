<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <div class="info">
      <div class="left">
        <img src="../images/1.jpg" alt />
      </div>
      <div class="center">
        <div class="name">
          <span class="iconfont iconxingbienan"></span>
          <span>蛋儿呀</span>
        </div>
        <div class="time">2020-02-02</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>

    <!-- 导航条 -->
    <hm-navbar title="我的关注" content="关注的用户"></hm-navbar>
    <hm-navbar title="我的跟帖" content="跟帖/回复"></hm-navbar>
    <hm-navbar title="我的收藏" content="文章/视频"></hm-navbar>
    <hm-navbar title="设置"></hm-navbar>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.info {
  display: flex;
  height: 100px;
  border-bottom: 3px solid #ccc;
  align-items: center;
  padding: 0 20px;
  .left {
    width: 70px;
    img {
      width: 70px;
      height: 70px;
      display: block;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    padding-left: 10px;
    .name {
      span {
        font-size: 18px;
      }
    }
    .time {
      font-size: 14px;
      color: #999;
    }
  }
  .right {
    width: 40px;
    text-align: right;
  }
}
</style>