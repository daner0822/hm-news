<template>
  <div class="post-detail">
    <!-- 头部导航 -->
    <div class="header">
      <div class="left">
        <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div
          class="followed"
          v-if="detail.has_follow"
          @click="followed(detail.user.id)"
        >
          已关注
        </div>
        <div class="follow" v-else @click="follow(detail.user.id)">关注</div>
      </div>
    </div>
    <!-- 标题 -->
    <div class="title">{{ detail.title }}</div>
    <!-- 作者和创建时间 -->
    <div class="user">
      <span>{{ detail.user.nickname }}</span>
      <span>{{ detail.created_date | date }}</span>
    </div>
    <!-- 新闻内容 -->
    <div class="content" v-if="detail.type === 1" v-html="detail.content"></div>
    <video v-else :src="detail.content" controls autoplay muted></video>
    <!-- 点赞分享 -->
    <div class="btns">
      <div class="like btn" @click="like" :class="{ active: detail.has_like }">
        <span class="iconfont icondianzan"></span>
        <span>{{ detail.like_length }}</span>
      </div>
      <div class="share btn">
        <span class="iconfont iconweixin"></span>
        <span>微信</span>
      </div>
    </div>
    <!-- 评论列表 -->
    <div class="comment-list">
      <div class="title">精彩跟帖</div>
      <hm-comment
        v-for="item in commentList"
        :key="item.id"
        :comment="item"
        @reply="reply"
      ></hm-comment>
    </div>
    <!-- 文章底部 -->
    <div class="footer">
      <!-- input框 -->
      <div class="input" v-if="!isShow">
        <input type="text" placeholder="写跟帖" @focus="handleFocus" />
        <span class="iconfont iconpinglun-">
          <span>{{ detail.comment_length }}</span>
        </span>
        <span
          class="iconfont iconshoucang"
          @click="star"
          :class="{ active: detail.has_star }"
        ></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
      <!-- textarea框 -->
      <div class="textarea" v-else>
        <textarea
          :placeholder="'回复:' + replyNickname"
          @blur="handelBlur"
          ref="textarea"
          v-model="content"
        ></textarea>
        <div class="send" @click="addComment">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用于存放文章详情
      detail: {
        //一进来刚刷新可能访问不到user,要先存放一个
        user: {}
      },
      // 控制textarea的显示
      isShow: false,
      //存放平路列表
      commentList: [],
      //回复的内容
      content: '',
      //回复的昵称
      replyNickname: '',
      //回复的id
      replyId: ''
    }
  },
  created() {
    console.log('详情页组件创建')
    this.getDetail()
    this.getComments()

    //组建一创建,就给bus注册一个事件
    this.$bus.$on('reply', async (id, nickname) => {
      // 获取到了input框的焦点, 需要显示textarea
      this.isShow = true
      //刚修改完数据，DOM不会立即更新的。
      //使用nextTick 等待DOM更新完成
      await this.$nextTick()
      //需要让textarea有焦点
      this.$refs.textarea.focus()

      // 把接受到的id和nickname存储起来
      this.replyId = id
      this.replyNickname = nickname
    })
  },
  methods: {
    //获取文章详情
    async getDetail() {
      //通过params获取路由参数
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.detail = data
        // console.log(this.detail)
      }
    },
    // 获取评论
    async getComments() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      // console.log(res)
      const { statusCode, data } = res.data
      this.commentList = data
      // console.log(this.commentList)
    },
    //关注功能
    async follow(id) {
      //思路1: 先判断是否登录了,如果登录了就发送请求,没登录就跳转到登录
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          //添加参数 需要使用命名路由
          name: 'login',
          //在需要跳转到登录页面的时候，如果需要回跳，添加一个params:{back:true}
          params: { back: true }
        })
        this.$toast('请先登录')
        return
      }
      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('关注成功')
        // this.detail.has_follow = true
        //重新渲染
        this.getDetail()
      }
    },
    //取消关注
    async followed(id) {
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('取关成功')
        // this.detail.has_follow = false
        //重新渲染
        this.getDetail()
      }
    },
    //点赞与取消点赞功能
    async like() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          //添加参数 需要使用命名路由
          name: 'login',
          //在需要跳转到登录页面的时候，如果需要回跳，添加一个params:{back:true}
          params: { back: true }
        })
        this.$toast('请先登录')
        return
      }
      //发送请求
      const res = await this.$axios.get(`/post_like/${this.detail.id}`)
      const { statusCode, message } = res.data
      // console.log(res.data)
      if (statusCode === 200) {
        //提示信息
        this.$toast.success(message)
        //重新渲染
        this.getDetail()
      }
    },
    //收藏与取消收藏功能
    async star() {
      // console.log('哈哈')

      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          //添加参数 需要使用命名路由
          name: 'login',
          //在需要跳转到登录页面的时候，如果需要回跳，添加一个params:{back:true}
          params: { back: true }
        })
        this.$toast('请先登录')
        return
      }
      //发送请求
      const res = await this.$axios.get(`/post_star/${this.detail.id}`)
      const { statusCode, message } = res.data
      // console.log(res.data)
      if (statusCode === 200) {
        //提示信息
        this.$toast.success(message)
        //重新渲染
        this.getDetail()
      }
    },
    // input框获取到焦点，应该显示成textarea框
    async handleFocus() {
      // 获取到了input框的焦点, 需要显示textarea
      this.isShow = true
      //刚修改完数据，DOM不会立即更新的。
      //使用nextTick 等待DOM更新完成
      await this.$nextTick()
      //需要让textarea有焦点
      this.$refs.textarea.focus()
    },
    //失去焦点
    handelBlur() {
      // 当textarea框没有焦点，重新显示input框
      if (!this.content) {
        this.isShow = false
        //取消回复
        this.replyNickname = ''
        this.replyId = ''
      }
    },
    async reply(id, nickname) {
      // 父组件需要把子组件的id存起来，因为发送请求有需要
      this.replyId = id
      this.replyNickname = nickname
      //显示textarea框
      this.isShow = true
      //获取焦点
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    //添加评论
    async addComment() {
      //发送请求 添加评论
      const res = await this.$axios({
        method: 'post',
        url: `/post_comment/${this.detail.id}`,
        data: {
          content: this.content,
          parent_id: this.replyId
        }
      })
      // console.log(res)
      const { statusCode, message } = res.data
      this.$toast.success(message)
      //清空输入框的内容
      this.content = ''
      //隐藏输入框
      this.isShow = false
      //清空回复的id
      this.replyId = ''
      this.replyNickname = ''
      this.replyId = ''
      //重新渲染评论
      this.getComments()
      //重新渲染文章
      this.getDetail()
    }
  }
}
</script>

<style lang="less" scoped>
.post-detail {
  padding-bottom: 150px;
}
.header {
  height: 50px;
  line-height: 50px;
  display: flex;
  padding: 0 20px;
  border: 1px solid #ccc;
  align-items: center;
  .center {
    height: 30px;
    line-height: 30px;
    flex: 1;
    padding-left: 5px;
    .iconnew {
      font-size: 40px;
    }
  }
  .followed {
    height: 30px;
    line-height: 30px;
    border: 1px solid #ddd;
    border-radius: 15px;
    padding: 0 10px;
  }
  .follow {
    height: 30px;
    line-height: 30px;
    border: 1px solid #ddd;
    border-radius: 15px;
    padding: 0 10px;
    border-color: #ff0000;
    background-color: #ff0000;
    color: #fff;
  }
}
.title {
  font-weight: 700;
  font-size: 20px;
  padding: 10px 20px;
}
.user {
  padding: 0 20px;
  span {
    color: #999;
    margin-right: 5px;
  }
}
video {
  width: 100%;
}
/deep/ img {
  display: block;
  width: 100%;
}
.content {
  padding: 20px;
}
.btns {
  display: flex;
  padding: 10px 20px;
  justify-content: space-around;

  .btn {
    width: 80px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 15px;
    text-align: center;
    span {
      font-size: 16px;
      margin-left: 5px;
    }
    .iconweixin {
      color: springgreen;
    }
    &.active {
      border-color: red;
      color: red;
    }
  }
}
.footer {
  padding: 10px 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  .input {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ccc;
    input {
      height: 30px;
      width: 180px;
      background-color: #ddd;
      outline: none;
      border: none;
      border-radius: 15px;
      padding-left: 20px;
    }
    .iconfont {
      font-size: 22px;
    }
    .active {
      color: red;
    }
    .iconpinglun- {
      position: relative;
      span {
        position: absolute;
        top: -6px;
        left: 9px;
        border-radius: 5px;
        background-color: red;
        font-size: 12px;
        color: #fff;
        padding: 0 5px;
      }
    }
  }
  .textarea {
    border-top: 1px solid #ccc;
    display: flex;
    height: 100px;
    align-items: flex-end;
    padding: 20px;
    textarea {
      flex: 1;
      height: 80px;
      background-color: #ddd;
      border-radius: 10px;
      padding: 10px;
      border: none;
      outline: none;
    }
    .send {
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      border-radius: 15px;
      background-color: red;
      color: #fff;
      margin-left: 10px;
    }
  }
}
</style>
