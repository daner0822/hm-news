<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="center" @click="$router.push('/search')">
        <span class="iconfont iconsearch"></span>
        <span class="text">搜索新闻</span>
      </div>
      <div class="right" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- 
      tab栏目
      sticky: 粘性布局，到顶部会自动吸附
      animated: 切换的时候内容有转场动画
      swipeable： 支持滑动切换tab
    -->
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
        <!-- 
          @refresh: 下拉会触发的refresh事件
          refreshing： 控制下拉状态
         -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <!-- 包裹文章分页内容 -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多数据了"
            @load="onLoad"
            :immediate-check="false"
            :offset="50"
          >
            <hm-post
              v-for="post in postList"
              :key="post.id"
              :post="post"
            ></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      // 分类列表的数据
      tabList: [],
      // 激活的tab的下标
      active: 1,
      //文章列表的数据
      postList: [],
      // 控制加载状态
      loading: false,
      // 控制是否还有更多数据
      finished: false,
      // 当前页
      pageIndex: 1,
      // 每页的条数
      pageSize: 5,
      // 控制下拉状态
      // 下拉的时候refreshing回变成true, 需要加载后，把refreshing改成false
      refreshing: false
    }
  },
  async created() {
    const activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
    if (activeTabs) {
      this.tabList = activeTabs
      //发送请求,获取文章列表的数据
      this.getPostList(this.tabList[this.activeTabs])
      return
    }
    // 如果缓存中没有activeTabs，就发送请求，加载所有的栏目
    const res = await this.$axios.get('category')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      //获取所有的分类数据
      this.tabList = data
      //获取文章数据,传入当前选中的栏目分类的id
      this.getPostList(this.tabList[this.active].id)
    }

    //获取栏目列表
    // this.getTabLIst()
  },
  methods: {
    async getTabLIst() {
      //发送请求 获取栏目数据
      const res = await this.$axios.get('/category')
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        //获取分类列表
        this.tabList = data
        // console.log(this.tabList)
        // 获取文章数据,传入当前选中的栏目分类的id
        this.getPostList(this.tabList[this.active].id)
      }
    },
    // 用于获取某个分类下的文章列表数据
    // id 分类的id
    async getPostList(id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        //如果频繁的切换，会导致数据清空不及时
        // 判断页码是1并且还有数据的时候再次清空
        if (this.postList.length > 0 && this.pageIndex === 1) {
          this.postList = []
        }
        // 数据不能替换，只能追加
        this.postList = [...this.postList, ...data]
        // console.log(this.postList)
        // 数据加载完成，把loading改成false 触发onload
        this.loading = false
        // 判断是否还有更多数据
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      console.log('触底了')
      const id = this.tabList[this.active].id
      setTimeout(() => {
        //分页+1
        this.pageIndex++
        //重新渲染
        this.getPostList(id)
      }, 1000)
    },
    onRefresh() {
      // 重新加载所有的数据
      this.pageIndex = 1
      this.postList = []
      this.loading = true
      this.finished = false
      // 下拉的时候refreshing回变成true, 需要加载后，把refreshing改成false
      this.refreshing = false
      setTimeout(() => {
        const id = this.tabList[this.active].id
        this.getPostList(id)
      }, 1000)
    }
  },
  watch: {
    //监听active变化 当切换分类的时候,重新获取文章数据
    active(value) {
      // 切换栏目的时候，需要初始化所有的状态
      this.postList = []
      this.pageIndex = 1
      this.finished = false
      // loading不应该是false，应该是true，这样可以保证切换的时候不去触发onload事件
      this.loading = true
      setTimeout(() => {
        // 获取变化的分类的id
        const id = this.tabList[value].id
        //重新获取文章数据
        this.getPostList(id)
      }, 1000)
      //重新渲染
      // this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
// 加了scoped 当前组件不会影响其他组件的样式
// scoped的原理： 一旦给组件添加了scoped属性，scoped会做两件事情  data-v-xxxxxx
// 1. 会给当前组件中所有的样式的选择器添加一个额外的属性选择器
// 2. 会给当前组件的模板的所有的标签都添加一个 额外的属性选择器
.header {
  height: 50px;
  line-height: 50px;
  background-color: #ff0000;
  display: flex;
  padding-left: 10px;
  align-items: center;
  color: #fff;
  .left,
  .right {
    width: 60px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .iconnew {
    font-size: 50px;
  }
  .iconwode {
    font-size: 20px;
  }
  .center {
    flex: 1;
    height: 34px;
    line-height: 34px;
    background-color: rgba(255, 255, 255, 0.5);
    text-align: center;
    border-radius: 17px;
  }
}
// 覆盖tab栏的样式(需要覆盖组件原有的样式) 使用深度选择器
// 深度作用选择器： 保证样式能够在子组件中也生效
// css中   >>>
// less中  /deep/
// scss中  ::v-deep

/deep/ .van-tabs__nav {
  background-color: #ddd;
}
</style>
