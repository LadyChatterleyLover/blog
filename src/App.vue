<template>
  <div id="app">
    <el-container v-if="$route.path !== '/login'">
      <el-header>
        <nav-header></nav-header>
      </el-header>
      <el-container>
        <el-aside width="200px" >
          <left-nav></left-nav>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
    <router-view v-else></router-view>
  </div>
</template>

<script>
  import navHeader from './components/headerNav'
  import leftNav from './components/leftNav'

  export default {
    name: 'App',
    components: {
      navHeader,
      leftNav
    }
  }
</script>

<style>
  @import "./sass/common.scss";
  .el-header {
    padding: 0;
  }
</style>
