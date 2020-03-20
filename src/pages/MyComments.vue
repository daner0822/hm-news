<template>
  <div class="my-comments">
    <hm-header>我的跟帖</hm-header>
    <div class="list">
      <div class="item">
        <div class="time">2020-02-02</div>
        <!-- 父评论的内容 -->
        <div class="parent-comment">
          <div class="parent-name">回复： 火星彩票研究员</div>
          <div class="parent-content">
            啊信是张信哲吗？张信哲是不是的张学友弟弟？
          </div>
        </div>
        <div class="content">啊信是张信哲吗？张信哲是不是的张学友弟弟？</div>
        <div class="link">
          <div class="title one-txt-cut">
            原文：阿信分享《说好不哭》幕后故事：只听幕后故事：只听
          </div>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //跟帖
      list: []
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  .time {
    font-size: 14px;
    color: #999;
    height: 30px;
    line-height: 30px;
  }
  .content {
    font-size: 16px;
    padding: 10px 0;
  }
  .link {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
    .title {
      flex: 1;
    }
    span {
      width: 40px;
      text-align: right;
    }
  }
  .parent-content {
    background-color: #ddd;
    padding: 10px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    color: #999;
    .parent-name {
      font-size: 12px;
    }
  }
}
</style>
