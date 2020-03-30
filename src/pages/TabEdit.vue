<template>
  <div class="tab-edit">
    <hm-header>栏目管理</hm-header>
    <p class="title">点击删除以下频道(至少保留3个)</p>
    <div class="list">
      <div
        class="item"
        v-for="item in activeTabs"
        :key="item.id"
        @click="del(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
    <p class="title">点击添加以下频道</p>
    <div class="list">
      <div
        class="item"
        v-for="item in deactiveTabs"
        :key="item.id"
        @click="add(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 存放激活的栏目,默认栏目是激活的
      activeTabs: [],
      // 存放未激活的栏目,默认栏目是激活的
      deactiveTabs: []
    }
  },
  async created() {
    // 栏目管理一加载，应该先从缓存中获取数据，如果缓存中没有数据，才考虑发请求去获取所有的栏目
    const activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
    const deactiveTabs = JSON.parse(localStorage.getItem('deactiveTabs'))
    if (activeTabs && deactiveTabs) {
      this.activeTabs = activeTabs
      this.deactiveTabs = deactiveTabs
      return
    }
    //发送请求,获取所有的栏目数据
    const res = await this.$axios.get('/category')
    // console.log(res.data)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      // 把获取到的所有的栏目放到激活的栏目中
      this.activeTabs = data
      this.deactiveTabs = []
      // console.log(this.activeTabs)
    }
  },
  methods: {
    del(id) {
      // console.log(id)
      if (this.activeTabs.length <= 3) {
        this.$toast('请至少保留3个')
        return
      }
      // 根据id对应的栏目，并且删除，并且添加到未激活的栏目中
      const idx = this.activeTabs.findIndex(item => item.id === id)
      //添加到未激活的栏目中
      this.deactiveTabs.push(this.activeTabs[idx])
      //删除激活中点击的栏目
      this.activeTabs.splice(idx, 1)
    },
    add(id) {
      // 根据id找下标，并且删除，并且添加到激活的栏目中
      const idx = this.deactiveTabs.findIndex(item => item.id === id)
      //添加到激活的栏目中
      this.activeTabs.push(this.deactiveTabs[idx])
      //删除未激活中点击的栏目
      this.deactiveTabs.splice(idx, 1)
    }
  },
  watch: {
    //监听栏目的变化
    activeTabs: {
      deep: true,
      handler(value) {
        // 存储变化的栏目
        localStorage.setItem('activeTabs', JSON.stringify(this.activeTabs))
        localStorage.setItem('deactiveTabs', JSON.stringify(this.deactiveTabs))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tab-edit {
  padding: 20px;
  .title {
    padding: 10px 0;
    color: #999;
    font-size: 14px;
  }
  .list {
    overflow: hidden;
    .item {
      padding: 10px 20px;
      border: 1px solid #ccc;
      float: left;
      background-color: #ccc;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
