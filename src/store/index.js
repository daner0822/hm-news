import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 需要被keep-alive缓存的一个数组
    cacheList: []
  },
  mutations: {
    // 缓存组件
    // name是需要缓存的组件的名字
    cache(state, name) {
      // 如果缓存列表中没有这个name,就添加
      if (!state.cacheList.includes(name)) {
        state.cacheList.push(name)
      }
    },
    //不缓存
    uncache(state, name) {
      // 如果缓存列表中有这个name,就添加
      if (state.cacheList.includes(name)) {
        //删除这个组件的缓存
        state.cacheList = state.cacheList.filter(item => item !== name)
      }
    }
  }
})

export default store
