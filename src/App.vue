<template>
  <div>
    <!-- 路由占位符 -->
    <router-view></router-view>
    <!-- Tabbar 区域 -->
    <van-tabbar route>
    <van-tabbar-item to="/home" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="less" scoped>

</style>
