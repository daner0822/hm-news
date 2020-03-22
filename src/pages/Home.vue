<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="center">
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
        <p v-for="item in 40" :key="item.id">内容 1</p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabList: [],
      //激活的tab的下标
      active: 1
    }
  },
  created() {
    //获取栏目列表
    this.getTabLIst()
  },
  methods: {
    async getTabLIst() {
      //发送请求 获取栏目数据
      const res = await this.$axios.get('/category')
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        //获取分类列表,还需要获取分类列表下面的文章列表
        this.tabList = data
        // console.log(this.tabList)
        //通过tablist下标找到点击分类列表里面的id
        this.getPostList(this.tabList[this.active].id)
      }
    },
    // 用于获取某个分类下的文章列表数据
    async getPostList(id) {
      console.log('我需要获取分类的id', id, '下面的文章数据')
    }
  },
  watch: {
    active(value) {
      console.log(value)
      const id = this.tabList[value].id
      this.getPostList(id)
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