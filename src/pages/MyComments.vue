<template>
  <div class="my-comments">
    <hm-header>我的跟帖</hm-header>
    <div class="list">
      <van-list
        @load="onload"
        v-model="loading"
        :immediate-check="false"
        :offet="50"
        :finished="finished"
        finished-text="没有更多数据了"
      >
        <!-- 
          @load="onload" 当list到底部了就会触发
          v-model="loading"  用于指定加载状态 true代表加载中,load事件不会重复触发,false代表加载好了,load事件就会触发
          当滚动到底部会触发load事件，并且自动把loading改成true，  等到数据加载完成，需要把loading在改成false
          :immediate-check="false"  关闭页面一加载就触发load事件
          :finished="finished" finished: 指定所有数据是否加载完成（是否还有更多数据) 如果finished为true，会显示没有更多数据了
          finished-text="没有更多了":  没有更多数据的文本提示
          使用:offset="50"指定触发的距离 
        
        -->
        <div class="item" v-for="item in list" :key="item.id">
          <div class="time">{{item.create_date|date('YYYY-MM-DD HH:mm')}}</div>
          <!-- 父评论的内容 -->
          <div class="parent-comment" v-if="item.parent">
            <div class="parent-name">回复： {{item.parent.user.nickname}}</div>
            <div class="parent-content">{{item.parent.content}}</div>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="link">
            <div class="title one-txt-cut">原文：{{item.post.title}}</div>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //跟帖
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1, //当前页
      pageSize: 10 //每页的条数
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      //发送请求获取数据
      const res = await this.$axios({
        method: 'get',
        url: '/user_comments',
        //get请求携带的参数，需要放到params中
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 因为涉及到分页，不能简单的把响应的data把list数据给覆盖了，而应该是追加
        // 相当于合并数组 把之前的加上重新加载的
        this.list = [...this.list, ...data]
        console.log(this.list)

        //数据加载完成,让loading改成false,无法触发下次加载
        this.loading = false
        // 显示没有更多数据,如果这一页的数据小于这一页的条数
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onload() {
      console.log('到底部了')
      setTimeout(() => {
        //加载更多数据,让页码+1
        this.pageIndex++
        //重新发送请求渲染
        this.getCommentList()
      }, 1000)
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
