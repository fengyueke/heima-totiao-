<template>
  <div class="home-container">
    <van-nav-bar title="黑马头条" fixed safe-area-inset-top></van-nav-bar>

    <!-- 导入，注册，并使用 ArticleInfo 组件 -->
    <van-pull-refresh v-model="isLoading" :disabled="finished" @refresh="onRefresh">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
      <ArticleInfo
     v-for="item in artList"
     :key="item.art_id"
     :title="item.title"
     :author="item.aut_name"
     :count="item.comm_count"
     :date="item.pubdate"
     :id="item.art_id"
     :cover="item.cover"
       ></ArticleInfo>
    </van-list>
  </van-pull-refresh>
  </div>
</template>

<script >
import { getArticleAPI } from '@/api/articlesAPI'
import ArticleInfo from '@/components/article/articleInfo-vue.vue'

export default {
  data () {
    return {
      // 页码
      page: 1,
      // 每页数据
      limit: 10,
      // 文章数据
      artList: [],
      // 是否加载下一页数据 如果loading 为true 则不会反复触发loading事件
      // 当下一页数据请求回来，一定要把loading 的值改为 false
      loading: true,
      // 所有数据是否加载完毕，如果加载完毕，一定要改成true
      finished: false,
      // 是否下拉加载
      isLoading: false
    }
  },
  methods: {
    async initArticleList (isRefresh) {
      const { data: res } = await getArticleAPI(this.page, this.limit)

      if (isRefresh) {
        // 下拉刷新，新数据在前，旧数据在后
        this.artList = [...res, ...this.artList]
        this.isLoading = false
      } else {
        // 上拉加载时 旧数据在前，新数据在后
        this.artList = [...this.artList, ...res]
        this.loading = false
      }
      if (res.length === 0) {
        // 证明没有数据了，将finished 的值改为 true
        this.finished = true
      }
    },
    onLoad () {
      this.loading = true
      this.page++
      this.initArticleList()
    },
    onRefresh () {
      this.isLoading = true
      console.log('触发了 onRefresh 下拉刷新')
      this.page++
      this.initArticleList(true)
    }
  },
  created () {
    this.initArticleList()
  },
  components: {
    ArticleInfo
  }
}
</script>

<style lang="less" scoped>
.home-container{
  padding: 46px 0 50px 0;
  /deep/.van-nav-bar__content{
    background: pink;
  }
  /deep/.van-nav-bar__title{
    color: white;
  }
}
</style>
