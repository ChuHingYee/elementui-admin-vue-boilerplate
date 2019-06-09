<template>
  <div class="layout" :style="computedPaddingStyle">
    <Sider class="layout-sider" ref="layoutSide"></Sider>
    <Header class="layout-header" :style="computedAbsoluteStyle"></Header>
    <el-breadcrumb separator="/" class="layout-nav" v-if="isShowNav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(nav,index) in currentNav" :key="nav+index">{{nav}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="layout-content">
      <div class="layout-content__main">
        <keep-alive :include="cacheRouters">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <Footer class="layout-footer" :style="computedAbsoluteStyle"></Footer>
  </div>
</template>
<script>
import Sider from './sider';
import Header from './header';
import Footer from './footer';
import { mapGetters } from 'vuex';
export default {
  name: 'BaseLayout',
  components: {
    Sider,
    Header,
    Footer
  },
  computed: {
    ...mapGetters(['isSiderCollapsed', 'cacheRouters']),
    computedAbsoluteStyle () {
      return {
        left: this.isSiderCollapsed ? '64px' : '200px'
      };
    },
    computedPaddingStyle () {
      return {
        paddingLeft: this.isSiderCollapsed ? '64px' : '200px'
      };
    },
    currentNav () {
      const { tree } = this.$route.meta;
      return tree.split('-');
    },
    isShowNav () {
      return this.$route.meta.showNav;
    }
  }
};
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
  flex-direction: column;
  padding-top: 60px;
  &-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    transition: all 0.2s;
    z-index: 88;
  }
  &-nav {
    padding: 0 20px;
    line-height: 40px;
    background: #fff;
    font-size: 13px;
  }
  &-content {
    transition: all 0.2s;
    padding: 20px;
    min-height: calc(100vh - 105px);
    &__main {
      background: #fff;
      padding: 20px;
    }
  }
}
</style>
