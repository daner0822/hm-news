<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input
          type="text"
          placeholder="请输入搜索内容"
          v-model="keyword"
          @keyup.enter="search"
          @input="recommend"
        />
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>

    <!-- 推荐列表 -->
    <div class="recommend" v-if="recommendList.length > 0">
      <div
        class="item one-txt-cut"
        v-for="item in recommendList"
        :key="item.id"
        @click="history_search(item.title)"
      >
        {{ item.title }}
      </div>
    </div>

    <!-- 根据搜索结果渲染文章列表 -->
    <div class="post-list" v-else-if="postList.length > 0">
      <hm-post v-for="post in postList" :key="post.id" :post="post"></hm-post>
    </div>
    <div class="content" v-else>
      <h3>历史记录</h3>
      <div class="list">
        <div
          class="item"
          v-for="item in history"
          :key="item"
          @click="history_search(item)"
        >
          {{ item }}
        </div>
      </div>
      <h3>热门搜索</h3>
      <div class="list">
        <div
          class="item"
          v-for="item in hotList"
          :key="item.id"
          @click="history_search(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//函数防抖 借助lodash库
import _ from 'lodash'
export default {
  data() {
    return {
      //输入的搜索关键字
      keyword: '',
      // 存放文章的搜索结果
      postList: [],
      //历史记录
      history: [],
      //热搜列表
      hotList: [],
      // 推荐列表
      recommendList: []
    }
  },
  // 页面一加载，从缓存中获取历史记录
  created() {
    const history = localStorage.getItem('history')
    if (history) {
      this.history = JSON.parse(history)
    }
    this.hotList = ['情火', '亲爱的', '新冠肺炎', '复工']
  },
  methods: {
    //获取搜索结果
    async search() {
      // 搜索时，关闭推荐
      this.recommendList = []
      // 判断历史记录中是否有这个历史记录,如果有，直接先删除掉
      this.history = this.history.filter(item => item !== this.keyword)
      // 把搜索的keyword添加到历史记录中
      this.history.unshift(this.keyword)
      // 把搜索的keyword保存到缓存中
      localStorage.setItem('history', JSON.stringify(this.history))
      // console.log(this.history)

      // 发送ajax请求获取搜索结果
      const res = await this.$axios.get('post_search', {
        params: {
          keyword: this.keyword
        }
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        //文章搜索结果
        this.postList = data
        // console.log(this.postList)
      }
    },
    // 使用lodash的防抖  只有在输入结束的时候才会执行
    //获取推荐数据
    recommend: _.debounce(async function() {
      // 如果输入的内容是空，不推荐
      if (!this.keyword) return
      //发送请求
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword
        }
      })
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommendList = data
        // console.log(this.recommendList)
      }
    }, 500),
    history_search(item) {
      // console.log(item)
      // 重新输入关键字
      this.keyword = item
      // 重新搜索
      this.search()
    },
    back() {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.go(-1)
      }
    }
  },
  watch: {
    // 如果keyword为空，我们就让搜索结果为空,显示历史记录和推荐
    keyword(value) {
      if (!value) {
        // 如果没有输入任何的内容，搜索结果清空
        this.postList = []
        //推荐列表为空
        this.recommendList = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    display: flex;
    align-items: center;
    .center {
      flex: 1;
      padding: 0 10px;
      position: relative;
      display: flex;
      input {
        flex: 1;
        height: 34px;
        line-height: 34px;
        border-radius: 17px;
        border: none;
        outline: none;
        border: 1px solid #ccc;
        padding-left: 30px;
        font-size: 12px;
      }
      .iconfont {
        position: absolute;
        top: 2px;
        left: 20px;
        line-height: 34px;
      }
    }
    .right {
      font-size: 14px;
    }
  }
  .content {
    padding: 20px;
    h3 {
      padding: 10px 0;
      font-size: 20px;
    }
    .list {
      overflow: hidden;
      .item {
        font-size: 14px;
        border: 1px solid #ccc;
        background-color: #ddd;
        padding: 5px 10px;
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }
  .recommend {
    position: absolute;
    z-index: 999;
    background-color: #fff;
    width: 100%;
    .item {
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
