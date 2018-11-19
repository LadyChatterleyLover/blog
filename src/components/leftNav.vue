<template>
  <div class="leftNav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#344055"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="selectMenu">
      <el-menu-item index="1" @click="goTo('/')">
        <i class="el-icon-location"></i>
        <span slot="title">已发表</span>
      </el-menu-item>
      <el-menu-item index="2" @click="goTo('/statistics')">
        <i class="el-icon-menu"></i>
        <span slot="title">统计</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">留言箱</span>
      </el-menu-item>
      <el-menu-item index="4" @click="goTo('/create')">
        <i class="el-icon-check"></i>
        <span slot="title">发表文章</span>
      </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-message"></i>
          <span slot="title">文章评论</span>
      </el-menu-item>
      <el-menu-item index="6" @click="goTo('/visitor')">
        <i class="el-icon-setting" ></i>
        <span slot="title">您的访客</span>
      </el-menu-item>
      <el-menu-item index="7" @click="goTo('/logout')">
        <i class="el-icon-delete"></i>
        <span slot="title">退出系统</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'leftNav',
    data() {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      selectMenu (index) {
        this.activeIndex = index
      },
      goTo (path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped lang="scss">
  .leftNav {
    position: fixed;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 200px;
    background: #344055;
    color: #fff;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 1200px;
    }
  }
</style>
